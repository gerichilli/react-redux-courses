import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../services/apiServices";
import { validateEmail } from "../utils/validate";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./Auth.scss";

function Register(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    // validate
    let isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      toast.error("Email is not valid");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    // submit
    const res = await postRegister(email, username, password);
    if (res.EC === 0) {
      toast.success(res.EM);
      handleLogin();
    } else {
      toast.error(res.EM);
    }
  }

  function handleBackHome() {
    navigate("/");
  }

  function handleLogin() {
    navigate("/login");
  }

  function handleToggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="auth-container">
      <h1 className="text-center">Quiz</h1>
      <p className="text-center fs-5">Start your journey</p>
      <form className="mt-4" onSubmit={handleLogin}>
        <div className="form-group mb-2">
          <label htmlFor="exampleInputEmail1" className="fw-medium">
            Email (*)
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="username" className="fw-medium">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="usernameHelp"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group mb-4 position-relative">
          <label htmlFor="exampleInputPassword1" className="fw-medium">
            Password (*)
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="password-button" type="button" onClick={handleToggleShowPassword}>
            {showPassword ? (
              <AiOutlineEyeInvisible aria-label="hide password" />
            ) : (
              <AiOutlineEye aria-label="show password" />
            )}
          </button>
          <p className="text-secondary fs-6 mt-1">Forgot password?</p>
        </div>
        <button type="submit" className="btn btn-primary w-100" onClick={handleRegister}>
          Sign up to Quiz
        </button>
        <div className="text-center mt-4">
          <span className="fs-6 me-2 text-secondary">Already have an account?</span>
          <button className="btn btn-secondary btn-sm" onClick={handleLogin}>
            Login
          </button>
        </div>
        <div className="mt-3 text-center">
          <button className="btn btn-link" type="button" onClick={handleBackHome}>
            &#60; Back to homepage
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
