import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalResult({ show, setShow, dataModalResult, handleShowAnswer }) {
  function handleClose() {
    setShow(false);
  }

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Your result</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Total questions: <b>{dataModalResult.countTotal}</b>
        </p>
        <p>
          Total correct answers: <b>{dataModalResult.countCorrect}</b>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleShowAnswer}>
          Show answers
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalResult;
