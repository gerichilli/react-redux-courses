import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import { toast } from "react-toastify";
import { deleteUser } from "../../../services/apiServices";

function ModalDeleteUser({
  show,
  setShow,
  dataDelete,
  setDataDelete,
  setCurrentPage,
  fetchListUsers,
}) {
  if (_.isEmpty(dataDelete)) return null;

  const { id, email } = dataDelete;

  function handleCloseModal() {
    setShow(false);
    setDataDelete({});
  }

  async function handleConfirmDelete() {
    const data = await deleteUser(id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleCloseModal();
      setCurrentPage(1);
      await fetchListUsers(1);
    } else {
      toast.error(data.EM);
    }
  }
  return (
    <Modal show={show} onHide={handleCloseModal} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete User?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure to delete this user: <span className="text-danger">{email}</span>?
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

export default ModalDeleteUser;
