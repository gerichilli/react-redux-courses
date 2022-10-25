import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import Select from "react-select";
import { quizDifficultyOptions } from "../../../../utils/selectOptions";
import { putUpdateQuiz } from "../../../../services/apiServices";
import _ from "lodash";

function ModalUpdateQuiz({ show, setShow, dataUpdateQuiz, setDataUpdateQuiz, fecthAllQuiz }) {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState(quizDifficultyOptions[0]);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (_.isEmpty(dataUpdateQuiz)) return;

    // Update state
    setDescription(dataUpdateQuiz.description);
    setName(dataUpdateQuiz.name);
    const [difficultyOption] = quizDifficultyOptions.filter(
      (item) => item.value === dataUpdateQuiz.difficulty
    );

    if (difficultyOption && difficultyOption.value) {
      setDifficulty(difficultyOption);
    }

    if (dataUpdateQuiz.image) {
      setImagePreview(`data:image/jpeg;base64,${dataUpdateQuiz.image}`);
    } else {
      setImagePreview(null);
    }
  }, [dataUpdateQuiz]);

  async function handleSubmit(event) {
    event.preventDefault();

    // Validate form
    if (!name || !description) {
      toast.error("Name and description are required");
      return;
    }

    // Send data to server
    const res = await putUpdateQuiz(dataUpdateQuiz.id, name, description, difficulty.value, image);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleCloseModal();
      await fecthAllQuiz();
    } else {
      toast.error(res.EM);
    }
  }

  function handleCloseModal() {
    setShow(false);
    setDataUpdateQuiz({});
  }

  function handleUploadImage(event) {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setImage(event.target.files[0]);
    }
  }

  return (
    <Modal show={show} onHide={handleCloseModal} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Update quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3" onSubmit={handleSubmit} id="userform">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="difficulty" className="form-label">
              Difficulty
            </label>
            <Select
              id="difficulty"
              options={quizDifficultyOptions}
              placeholder="Quiz difficulty"
              defaultValue={difficulty}
              value={difficulty}
              onChange={setDifficulty}
            />
          </div>
          <div className="col-12">
            <p className="form-label">Image</p>
            <label htmlFor="formFile" className="btn btn-primary file-label mb-2">
              <FiUpload /> Upload image
            </label>
            <div className="img-preview">
              {imagePreview ? <img src={imagePreview} alt="avatar" /> : <span>Preview</span>}
            </div>
            <input
              className="file-control"
              type="file"
              id="formFile"
              onChange={handleUploadImage}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" type="submit" form="userform">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalUpdateQuiz;
