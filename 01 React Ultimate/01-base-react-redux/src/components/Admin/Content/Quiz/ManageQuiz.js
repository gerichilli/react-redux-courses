import { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import Accordion from "react-bootstrap/Accordion";
import { postCreateNewQuiz, getAllQuizForAdmin } from "../../../../services/apiServices";
import { quizDifficultyOptions } from "../../../../utils/selectOptions";
import TableQuiz from "./TableQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";

function ManageQuiz(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState(quizDifficultyOptions[0]);
  const [image, setImage] = useState(null);
  const [listQuiz, setListQuiz] = useState([]);
  const [dataUpdateQuiz, setDataUpdateQuiz] = useState({});
  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [dataDeleteQuiz, setDataDeleteQuiz] = useState({});
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);

  useEffect(() => {
    fecthAllQuiz();
  }, []);

  async function fecthAllQuiz() {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  }

  async function handleSubmitQuiz() {
    // validate
    if (!name || !description) {
      toast.error("Name and description are required");
      return;
    }
    const res = await postCreateNewQuiz(name, description, difficulty.value, image);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      // reset form
      setName("");
      setDescription("");
      setDifficulty(quizDifficultyOptions[0]);
      setImage(null);
      // update list quiz
      fecthAllQuiz();
    } else {
      toast.error(res.EM);
    }
  }

  function handleChangeFile(event) {
    if (event.target && event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  }

  function handleClickBtnUpdateQuiz(quiz) {
    setShowModalUpdateQuiz(true);
    setDataUpdateQuiz(quiz);
  }

  function handleClickBtnDeleteQuiz(quiz) {
    setShowModalDeleteQuiz(true);
    setDataDeleteQuiz(quiz);
  }

  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quizzes</Accordion.Header>
          <Accordion.Body>
            <div className="col-xl-6">
              <fieldset className="border border-1 rounded-2 p-3 mt-4">
                <legend className="float-none px-3 w-auto fs-6 fw-bold">Add new quiz</legend>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your quiz name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label>Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                  <label>Description</label>
                </div>
                <div className="mb-3">
                  <Select
                    options={quizDifficultyOptions}
                    placeholder="Quiz difficulty"
                    defaultValue={difficulty}
                    value={difficulty}
                    onChange={setDifficulty}
                  />
                </div>
                <label className="d-block mb-2">
                  <span className="me-2">Upload image</span>
                  <input type="file" className="form-control" onChange={handleChangeFile} />
                </label>
                <div className="mt-3">
                  <button className="btn btn-warning px-5" onClick={handleSubmitQuiz}>
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
            <div className="mt-5">
              <TableQuiz
                listQuiz={listQuiz}
                handleClickBtnUpdateQuiz={handleClickBtnUpdateQuiz}
                handleClickBtnDeleteQuiz={handleClickBtnDeleteQuiz}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Update Question/Answers</Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Assign Quiz</Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <ModalUpdateQuiz
        show={showModalUpdateQuiz}
        setShow={setShowModalUpdateQuiz}
        dataUpdateQuiz={dataUpdateQuiz}
        setDataUpdateQuiz={setDataUpdateQuiz}
        fecthAllQuiz={fecthAllQuiz}
      />
      <ModalDeleteQuiz
        show={showModalDeleteQuiz}
        setShow={setShowModalDeleteQuiz}
        dataDeleteQuiz={dataDeleteQuiz}
        setDataDeleteQuiz={setDataDeleteQuiz}
        fecthAllQuiz={fecthAllQuiz}
      />
    </div>
  );
}

export default ManageQuiz;
