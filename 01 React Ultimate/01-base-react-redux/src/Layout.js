import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import Admin from "./components/Admin/Admin";
import User from "./components/User/User";
import Home from "./components/Home/Home";
import ManageUser from "./components/Admin/Content/ManageUser";
import DashBoard from "./components/Admin/Content/DashBoard";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function Layout() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<User />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Layout;
