import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import _ from "lodash";

function ModalViewUser({ show, setShow, dataView }) {
  if (_.isEmpty(dataView)) {
    return null;
  }

  const { email, password, username, role, image } = dataView;

  function handleCloseModal() {
    setShow(false);
  }

  return (
    <Modal show={show} onHide={handleCloseModal} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>View user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3" id="userform">
          <div className="row g-3">
            <div className="col-md-6">
              <p className="fw-bold form-label">Email</p>
              <p>{email}</p>
            </div>
            <div className="col-md-6">
              <p className="fw-bold form-label">Password</p>
              <p>{password}</p>
            </div>
            <div className="col-md-6">
              <p className="fw-bold form-label">Username</p>
              <p>{username}</p>
            </div>
            <div className="col-md-6">
              <p className="fw-bold form-label">Role</p>
              <p>{role}</p>
            </div>
          </div>
          <div className="col-12">
            <p className="fw-bold form-label">Avatar</p>
            <div className="img-preview">
              {image ? (
                <img src={`data:image/jpeg;base64,${image}`} alt="avatar" />
              ) : (
                <span>No image</span>
              )}
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalViewUser;
