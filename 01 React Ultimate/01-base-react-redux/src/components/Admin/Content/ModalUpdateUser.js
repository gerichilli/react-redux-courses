import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../services/apiServices";
import _ from "lodash";

function ModalUpdateUser({
  show,
  setShow,
  dataUpdate,
  resetUpdateData,
  currentPage,
  fetchListUsers,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (_.isEmpty(dataUpdate)) return;

    // Update state
    setEmail(dataUpdate.email);
    setUsername(dataUpdate.username);
    setRole(dataUpdate.role);
    if (dataUpdate.image) {
      setImagePreview(`data:image/jpeg;base64,${dataUpdate.image}`);
    } else {
      setImagePreview(null);
    }
  }, [dataUpdate]);

  function handleCloseModal() {
    setShow(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Validate form
    if (!username) {
      toast.error("Username is required");
      return;
    }

    // Send data to server
    const res = await putUpdateUser(dataUpdate.id, username, role, image);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      await fetchListUsers(currentPage);
    } else {
      toast.error(res.EM);
    }
  }

  function handleClose() {
    handleCloseModal();
    resetUpdateData();
  }

  function handleInputChange(event) {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "username":
        setUsername(event.target.value);
        break;
      case "role":
        setRole(event.target.value);
        break;
      default:
        break;
    }
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
        <Modal.Title>Update user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3" onSubmit={handleSubmit} id="userform">
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              disabled
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              disabled
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="form-select"
              value={role}
              onChange={handleInputChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="col-12">
            <p className="form-label">Avatar</p>
            <label htmlFor="formFile" className="btn btn-primary file-label mb-2">
              <FiUpload /> Upload avatar
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

export default ModalUpdateUser;
