import { Outlet } from "react-router-dom";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

function Admin(props) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <button className="sidebar-toggle-btn" onClick={() => setCollapsed(!collapsed)}>
            <FaBars />
          </button>
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Admin;
