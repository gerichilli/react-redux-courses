import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import { toast } from "react-toastify";
import { deleteUser } from "../../services/apiServices";

function ModalDeleteUser({
  show,
  setShow,
  dataDelete,
  currentPage,
  setCurrentPage,
  fetchListUsers,
}) {
  if (_.isEmpty(dataDelete)) return null;

  const { id, email } = dataDelete;

  function handleClose() {
    setShow(false);
  }

  async function handleConfirmDelete() {
    const data = await deleteUser(id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      setCurrentPage(1);
      await fetchListUsers(1);
    } else {
      toast.error(data.EM);
    }
  }
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete User?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure to delete this user: <span className="text-danger">{email}</span>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleteUser;
