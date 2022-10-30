import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FiUpload } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postUpdateProfile, postChangePassword, getHistory } from "../../services/apiServices";

function Profile({ show, setShow, handleLogout }) {
  const email = useSelector((state) => state.user.account.email);
  const role = useSelector((state) => state.user.account.role);
  const initialUsername = useSelector((state) => state.user.account.username);
  const initialImage = useSelector((state) => state.user.account.image);
  const [username, setUsername] = useState(initialUsername);
  const [image, setImage] = useState(initialImage);
  const [imagePreview, setImagePreview] = useState(null);
  const [tabKey, setTabKey] = useState("profile");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (image) {
      setImagePreview(`data:image/jpeg;base64,${image}`);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, []);

  function handleCloseModal() {
    setShow(false);
  }

  function handleUploadImage(event) {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setImage(event.target.files[0]);
    }
  }

  async function fetchHistory() {
    const res = await getHistory();
    if (res && res.EC === 0) {
      let currentHistory;

      if (res.DT.data && res.DT.data.length > 8) {
        currentHistory = res.DT.data.slice(res.DT.data.length - 8, res.DT.data.length);
      } else {
        currentHistory = res.DT.data;
      }

      setHistory(currentHistory);
    }
  }

  async function handleUpdateProfile(event) {
    event.preventDefault();

    // Validate
    if (!username) {
      toast.error("Username is required");
      return;
    }

    const res = await postUpdateProfile(username, image);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleCloseModal();
    } else {
      toast.error(res.EM);
    }
  }

  async function handleChangePassword(event) {
    event.preventDefault();

    // Validate
    if (!currentPassword) {
      toast.error("Current password is required");
      return;
    }

    if (!newPassword) {
      toast.error("New password is required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Confirm password is not match");
      return;
    }

    const res = await postChangePassword(currentPassword, newPassword);

    if (res && res.EC === 0) {
      toast.success(res.EM + ". Please login again");
      await handleLogout();
      handleCloseModal();
    } else {
      toast.error(res.EM);
    }
  }

  return (
    <>
      <Modal size="lg" show={show} onHide={handleCloseModal} animation={false} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            activeKey={tabKey}
            onSelect={(k) => setTabKey(k)}
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="profile" title="Profile">
              <form className="row g-3" onSubmit={handleUpdateProfile} id="profile">
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
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
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
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <select id="role" name="role" className="form-select" value={role} disabled>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="col-12">
                  <p className="form-label">Avatar</p>
                  <label htmlFor="formFile" className="btn btn-primary file-label mb-2">
                    <FiUpload /> Change avartar
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
            </Tab>
            <Tab eventKey="password" title="Change password">
              <form className="row g-3" onSubmit={handleChangePassword} id="password">
                <div className="col-md-6">
                  <label htmlFor="currentPassword" className="form-label">
                    Current password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    name="password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="confirmNewPassword" className="form-label">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmNewPassword"
                    name="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </div>
              </form>
            </Tab>
            <Tab eventKey="history" title="History">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Quiz Name</th>
                    <th scope="col">Total Question</th>
                    <th scope="col">Total Correct</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {history &&
                    history.length > 0 &&
                    history.map((item, index) => (
                      <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.quizHistory.name}</td>
                        <td>{item.total_questions}</td>
                        <td>{item.total_correct}</td>
                        <td>
                          {new Intl.DateTimeFormat("en-GB", {
                            dateStyle: "short",
                            timeStyle: "short",
                          }).format(new Date(item.updatedAt))}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {tabKey === "profile" && (
            <Button variant="primary" type="submit" form="profile">
              Update
            </Button>
          )}
          {tabKey === "password" && (
            <Button variant="primary" type="submit" form="password">
              Update
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Profile;
