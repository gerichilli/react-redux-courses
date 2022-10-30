import { Outlet } from "react-router-dom";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { postLogout } from "../../services/apiServices";
import { toast } from "react-toastify";
import Language from "../Header/Language";

function Admin(props) {
  const [collapsed, setCollapsed] = useState(false);
  const account = useSelector((state) => state.user.account);

  let navigate = useNavigate();
  let dispatch = useDispatch();

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
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header ">
          <button className="sidebar-toggle-btn" onClick={() => setCollapsed(!collapsed)}>
            <FaBars />
          </button>
          <div className="ms-auto">
            <Nav>
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
              <Language />
            </Nav>
          </div>
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Admin;
