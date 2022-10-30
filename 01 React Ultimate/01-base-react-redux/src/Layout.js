import { Suspense } from "react";
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
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/Questions/Questions";
import PrivateRoute from "./routes/PrivateRoute";

function NotFound() {
  return (
    <div className="container my-5 alert alert-danger">Not found data with your current URL</div>
  );
}

function Layout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<PrivateRoute />}>
            <Route path="" element={<User />} />
          </Route>
          <Route path="/quiz/:id" element={<DetailQuiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<PrivateRoute roleAccept="admin" />}>
          <Route path="" element={<Admin />}>
            <Route index element={<DashBoard />} />
            <Route path="manage-users" element={<ManageUser />} />
            <Route path="manage-quizzes" element={<ManageQuiz />} />
            <Route path="manage-questions" element={<Questions />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
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
    </Suspense>
  );
}

export default Layout;
