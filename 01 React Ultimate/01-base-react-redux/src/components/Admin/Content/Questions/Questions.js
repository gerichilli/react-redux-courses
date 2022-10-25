import { useEffect, useState } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import { FiMinus, FiPlus } from "react-icons/fi";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { Lightbox } from "react-modal-image";
import { toast } from "react-toastify";
import {
  postCreateNewQuestion,
  postCreateNewAnswer,
  getAllQuizForAdmin,
} from "../../../../services/apiServices";
import { formatFileQuestionName } from "../../../../utils/helpers";
import _ from "lodash";

function Questions() {
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      isValid: true,
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
          isValid: true,
        },
      ],
    },
  ];
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questions, setQuestions] = useState(initQuestions);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    fetchAllQuiz();
  }, []);

  async function fetchAllQuiz() {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newListQuiz = res.DT.map((item) => {
        return { value: item.id, label: item.name };
      });
      setListQuiz(newListQuiz);
    }
  }

  function handleCloseLightbox() {
    setShowLightbox(false);
    setLightboxImage(null);
  }

  function handleShowLightBox(imgData) {
    if (!imgData) return;

    setShowLightbox(true);
    const fileUrl = URL.createObjectURL(imgData);
    setLightboxImage(fileUrl);
  }

  function handleAddRemoveQuestion(type, questionId) {
    let cloneQuestions = _.cloneDeep(questions);

    if (type === "ADD") {
      cloneQuestions.push({
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        isValid: true,
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
            isValid: true,
          },
        ],
      });
      setQuestions(cloneQuestions);
    } else if (type === "REMOVE") {
      cloneQuestions = cloneQuestions.filter((question) => question.id !== questionId);
      setQuestions(cloneQuestions);
    }
  }

  function handleAddRemoveAnswer(type, questionId, answerId) {
    const cloneQuestions = _.cloneDeep(questions);
    if (type === "ADD") {
      let questionIndex = cloneQuestions.findIndex((question) => question.id === questionId);

      if (questionIndex > -1) {
        cloneQuestions[questionIndex].answers.push({
          id: uuidv4(),
          description: "",
          isCorrect: false,
          isValid: true,
        });

        setQuestions(cloneQuestions);
      }
    } else if (type === "REMOVE") {
      let questionIndex = cloneQuestions.findIndex((question) => question.id === questionId);

      if (questionIndex > -1) {
        cloneQuestions[questionIndex].answers = cloneQuestions[questionIndex].answers.filter(
          (answer) => answer.id !== answerId
        );
        setQuestions(cloneQuestions);
      }
    }
  }

  function handleOnChange(type, questionId, value) {
    if (type === "QUESTION") {
      let cloneQuestions = _.cloneDeep(questions);
      let questionIndex = cloneQuestions.findIndex((question) => question.id === questionId);

      if (questionIndex > -1) {
        cloneQuestions[questionIndex].description = value;

        if (value.trim()) {
          cloneQuestions[questionIndex].isValid = true;
        }

        setQuestions(cloneQuestions);
      }
    }
  }

  function handleOnChangeFileQuestion(questionId, event) {
    let cloneQuestions = _.cloneDeep(questions);
    let questionIndex = cloneQuestions.findIndex((question) => question.id === questionId);

    if (questionIndex > -1 && event.target && event.target.files && event.target.files.length > 0) {
      cloneQuestions[questionIndex].imageFile = event.target.files[0];
      cloneQuestions[questionIndex].imageName = event.target.files[0].name;
      setQuestions(cloneQuestions);
    }
  }

  function handleOnChangeAnswer(type, questionId, answerId, value) {
    let cloneQuestions = _.cloneDeep(questions);
    let questionIndex = cloneQuestions.findIndex((question) => question.id === questionId);
    if (questionIndex > -1) {
      cloneQuestions[questionIndex].answers = cloneQuestions[questionIndex].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;

              if (value) answer.isValid = true;
            } else if (type === "INPUT") {
              answer.description = value;

              if (value.trim()) answer.isValid = true;
            }
          }

          return answer;
        }
      );

      setQuestions(cloneQuestions);
    }
  }

  async function handleSubmitQuestionsForQuiz() {
    let cloneQuestions = _.cloneDeep(questions);
    // Validate
    // 1. Check if quiz is selected
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please select quiz");
      return;
    }

    // 2. Check if questions/answers is empty
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description.trim()) {
        toast.error(`Please input question description for question ${i + 1}`);
        cloneQuestions[i].isValid = false;
        setQuestions(cloneQuestions);
        return;
      }

      let isCorrectAnswerProvided = false;

      for (let j = 0; j < questions[i].answers.length; j++) {
        const answer = questions[i].answers[j];
        if (!answer.description.trim()) {
          toast.error(`Please input answer description for  answer ${j + 1} - question ${i + 1}`);
          cloneQuestions[i].answers[j].isValid = false;
          setQuestions(cloneQuestions);
          return;
        }

        if (answer.isCorrect) {
          isCorrectAnswerProvided = true;
        }
      }

      if (!isCorrectAnswerProvided) {
        toast.error(`Please provide correct answer for question ${i + 1}`);
        cloneQuestions[i].isValid = false;
        setQuestions(cloneQuestions);
        return;
      } else {
        cloneQuestions[i].isValid = true;
        setQuestions(cloneQuestions);
      }
    }

    let submitSuccess = true;

    for (const question of questions) {
      // Submit questions for quiz
      const newQuestionRes = await postCreateNewQuestion(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );

      // Submit answers for question
      if (newQuestionRes && newQuestionRes.EC === 0) {
        for (const answer of question.answers) {
          const newAnswerRes = await postCreateNewAnswer(
            answer.description,
            answer.isCorrect,
            newQuestionRes.DT.id
          );

          if (newAnswerRes && newAnswerRes.EC === 0) {
            submitSuccess = true;
          } else {
            submitSuccess = false;
            break;
          }
        }
      }
    }

    if (submitSuccess) {
      toast.success("Submit questions successfully");
      setQuestions(initQuestions);
    }
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="fs-4 fw-bold">Manage Questions</h1>
      </div>
      <div className="col-xl-6 mb-4">
        <label className="fs-6 fw-bold">Select Quiz:</label>
        <Select options={listQuiz} defaultValue={selectedQuiz} onChange={setSelectedQuiz} />
      </div>
      <div>
        <h2 className="fs-6 fw-bold">Add questions:</h2>
        <ul>
          {questions &&
            questions.length > 0 &&
            questions.map((question, index) => (
              <li key={question.id} className="mb-4">
                <div className="question row gx-3 align-items-center">
                  <div className="col-6">
                    <div className="form-floating">
                      <textarea
                        type="text"
                        className={`form-control ${question.isValid ? "" : "is-invalid"}`}
                        placeholder="Description"
                        value={question.description}
                        onChange={(event) =>
                          handleOnChange("QUESTION", question.id, event.target.value)
                        }
                        style={{ height: "100px" }}
                      />
                      <label>Question {index + 1} description</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <div className="d-flex align-items-center">
                        <label className="file-label" htmlFor={`question-${question.id}-img`}>
                          <RiImageAddFill
                            aria-label="Upload Image"
                            size="1.5em"
                            color="var(--bs-indigo)"
                          />
                        </label>
                        <button
                          className="btn btn-transparent px-0 border-0"
                          onClick={() => handleShowLightBox(question.imageFile)}
                        >
                          {question.imageName
                            ? formatFileQuestionName(question.imageName)
                            : "No file selected"}
                        </button>
                        <input
                          type="file"
                          className="file-control"
                          id={`question-${question.id}-img`}
                          onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-outline-primary px-2 me-2"
                      onClick={() => handleAddRemoveQuestion("ADD", "")}
                    >
                      <FiPlus aria-label="Add" size="1.25em" />
                    </button>
                    {questions.length > 1 && (
                      <button
                        className="btn btn-outline-warning px-2"
                        onClick={() => handleAddRemoveQuestion("REMOVE", question.id)}
                      >
                        <FiMinus aria-label="Remove" size="1.25em" />
                      </button>
                    )}
                  </div>
                </div>
                <ul>
                  {question.answers &&
                    question.answers.length > 0 &&
                    question.answers.map((answer, index) => (
                      <li className="answer mt-2 ms-2 row gx-3 align-items-center" key={answer.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={(event) =>
                            handleOnChangeAnswer(
                              "CHECKBOX",
                              question.id,
                              answer.id,
                              event.target.checked
                            )
                          }
                        />
                        <div className="col-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className={`form-control ${answer.isValid ? "" : "is-invalid"}`}
                              placeholder="Answer"
                              value={answer.description}
                              onChange={(event) =>
                                handleOnChangeAnswer(
                                  "INPUT",
                                  question.id,
                                  answer.id,
                                  event.target.value
                                )
                              }
                            />
                            <label>Answer {index + 1} description</label>
                          </div>
                        </div>
                        <div className="col">
                          <button
                            className="btn px-0 border-0 text-primary me-2"
                            onClick={() => handleAddRemoveAnswer("ADD", question.id)}
                          >
                            <AiFillPlusCircle aria-label="Add" size="2em" />
                          </button>
                          {question.answers.length > 1 && (
                            <button
                              className="btn px-0 border-0 text-warning"
                              onClick={() =>
                                handleAddRemoveAnswer("REMOVE", question.id, answer.id)
                              }
                            >
                              <AiFillMinusCircle aria-label="Remove" size="2em" />
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
      <div className="d-flex justify-content-center">
        {questions && questions.length > 0 && (
          <button className="btn btn-primary btn-lg" onClick={handleSubmitQuestionsForQuiz}>
            Submit questions
          </button>
        )}
      </div>
      {showLightbox && (
        <Lightbox
          medium={lightboxImage}
          large={lightboxImage}
          alt="Question Image"
          onClose={handleCloseLightbox}
        />
      )}
    </div>
  );
}

export default Questions;
