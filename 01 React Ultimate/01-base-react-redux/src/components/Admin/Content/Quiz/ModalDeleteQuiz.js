import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../services/apiServices";

function ModalDeleteQuiz({ show, setShow, dataDeleteQuiz, setDataDeleteQuiz, fecthAllQuiz }) {
  if (_.isEmpty(dataDeleteQuiz)) return null;

  const { id } = dataDeleteQuiz;

  function handleCloseModal() {
    setShow(false);
    setDataDeleteQuiz({});
  }

  async function handleConfirmDelete() {
    const data = await deleteQuiz(id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleCloseModal();
      await fecthAllQuiz();
    } else {
      toast.error(data.EM);
    }
  }
  return (
    <Modal show={show} onHide={handleCloseModal} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete Quiz?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure to delete this Quiz: <span className="text-danger">id={id}</span>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleteQuiz;
