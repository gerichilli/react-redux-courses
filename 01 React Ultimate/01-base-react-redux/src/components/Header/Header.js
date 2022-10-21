import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  let navigate = useNavigate();

  function handleLogin() {
    navigate("/login", { replace: true });
  }

  function handleRegister() {
    navigate("/register", { replace: true });
  }

  return (
    <Navbar bg="light" expand="lg" className="py-4">
      <Container>
        <NavLink to="/" className="navbar-brand">
          Quiz Game
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/users" className="nav-link">
              Users
            </NavLink>
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
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
                <NavDropdown.Item>Logout</NavDropdown.Item>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
