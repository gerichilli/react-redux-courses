import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import _ from "lodash";
import "./DetailQuiz.scss";
import { getDataQuizById, postSubmitQuiz } from "../../services/apiServices";
import Question from "./Question";
import ModalResult from "./ModalResult";

function DetailQuiz(props) {
  const params = useParams();
  const location = useLocation();

  const id = params.id;

  const [dataQuiz, setDataQuiz] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    getQuizData();
  }, [id]);

  async function getQuizData() {
    const res = await getDataQuizById(id);

    if (res && res.EC === 0) {
      const rawData = res.DT;
      const data = _.chain(rawData)
        // Group the elements of Array based on `id` property
        .groupBy("id")
        // `key` is group's name (quizId), `data` is the array of objects
        .map((value, key) => {
          let questionDescription,
            image = null;
          let answers = [];
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });

          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setDataQuiz(data);
    }
  }

  function handlePrev() {
    if (questionIndex - 1 < 0) return;
    setQuestionIndex(questionIndex - 1);
  }

  function handleNext() {
    if (dataQuiz.length - 1 > questionIndex) {
      setQuestionIndex(questionIndex + 1);
    }
  }

  function handleCheckbox(answerId, questionId) {
    const dataClone = _.cloneDeep(dataQuiz);
    let question = dataClone.find((item) => +item.questionId === +questionId);

    if (question && question.answers) {
      question.answers = question.answers.map((a) => {
        if (+a.id === +answerId) {
          a.isSelected = !a.isSelected;
        }
        return a;
      });
    }

    let index = dataClone.findIndex((item) => +item.questionId === +questionId);

    if (index > -1) {
      // dataClone[index] = question;
      setDataQuiz(dataClone);
    }
  }

  async function handleFinishQuiz() {
    let payload = {
      quizId: +id,
      answers: [],
    };

    if (dataQuiz && dataQuiz.length) {
      payload.answers = dataQuiz.map((item) => {
        let questionId = +item.questionId;
        let userAnswerId = [];

        item.answers.forEach((a) => {
          if (a.isSelected) {
            userAnswerId.push(+a.id);
          }
        });

        return { questionId, userAnswerId };
      });

      // Submit quiz
      const res = await postSubmitQuiz(payload);
      if (res && res.EC === 0) {
        setIsShowModalResult(true);
        setDataModalResult(res.DT);
      } else {
        console.log(res.EM);
      }
    }
  }

  if (dataQuiz.length === 0)
    return <div className="container py-4 alert alert-danger">Not found data for the quiz</div>;

  return (
    <div className="container py-4">
      <div className="row gx-4">
        <div className="col-12 col-md-8">
          <h1 className="fw-bold fs-3 mb-4 text-primary">
            Quiz {id} - {location?.state?.quizTitle}
          </h1>
          <div className="border border-1 rounded-3 p-4">
            <div className="mt-4">
              <Question
                index={questionIndex}
                data={dataQuiz.length && dataQuiz.length > 0 ? dataQuiz[questionIndex] : null}
                handleCheckbox={handleCheckbox}
              />
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <button
                className="btn btn-secondary me-3"
                onClick={handlePrev}
                disabled={questionIndex === 0}
              >
                Prev
              </button>
              <button
                className="btn btn-primary me-3"
                onClick={handleNext}
                disabled={dataQuiz.length && dataQuiz.length - 1 === questionIndex}
              >
                Next
              </button>
              <button className="btn btn-warning" onClick={handleFinishQuiz}>
                Finish
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">count down and answer check</div>
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  );
}

export default DetailQuiz;
