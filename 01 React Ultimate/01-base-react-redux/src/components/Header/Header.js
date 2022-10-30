import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { postLogout } from "../../services/apiServices";
import { toast } from "react-toastify";
import Language from "./Language";
import Profile from "../User/Profile";

function Header() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const role = useSelector((state) => state.user.account.role);
  const [showModalProfileUser, setShowModalProfileUser] = useState(false);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  function handleLogin() {
    navigate("/login", { replace: true });
  }

  function handleRegister() {
    navigate("/register", { replace: true });
  }

  async function handleLogout() {
    const res = await postLogout(account.email, account.refresh_token);

    if (res && res.EC === 0) {
      // Clear redux store
      dispatch(doLogout());
      navigate("/login", { replace: true });
    } else {
      toast.error("Logout failed");
    }
  }

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <NavLink to="/" className="navbar-brand">
          Quiz Game
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            {role === "admin" ? (
              <NavLink to="/admin" className="nav-link">
                Admin
              </NavLink>
            ) : (
              <NavLink to="/users" className="nav-link">
                Users
              </NavLink>
            )}
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <>
                <button className="btn btn-mi-secondary" onClick={handleLogin}>
                  Log in
                </button>
                <button className="btn btn-mi-primary" onClick={handleRegister}>
                  Sign up
                </button>
              </>
            ) : (
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => setShowModalProfileUser(true)}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
            <Language />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Profile
        show={showModalProfileUser}
        setShow={setShowModalProfileUser}
        handleLogout={handleLogout}
      />
    </Container>
  );
}

export default Header;
