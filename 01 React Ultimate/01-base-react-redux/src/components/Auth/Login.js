import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../services/apiServices";
import { toast } from "react-toastify";
import "./Auth.scss";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    // validate

    // submit
    const res = await postLogin(email, password);
    if (res.DT && res.EC === 0) {
      toast.success(res.EM);
      handleBackHome();
    } else {
      toast.error(res.EM);
    }
  }

  function handleBackHome() {
    navigate("/");
  }

  function handleRegister() {
    navigate("/register");
  }

  return (
    <div className="auth-container">
      <h1 className="text-center">Quiz</h1>
      <p className="text-center fs-5">Hello, who's this?</p>
      <form className="mt-4" onSubmit={handleLogin}>
        <div className="form-group mb-2">
          <label htmlFor="exampleInputEmail1" className="fw-medium">
            Email
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
        <div className="form-group mb-4">
          <label htmlFor="exampleInputPassword1" className="fw-medium">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-secondary fs-6 mt-1">Forgot password?</p>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Log in to Quiz
        </button>
        <div className="text-center mt-4">
          <span className="fs-6 me-2 text-secondary">Don't have an account yet?</span>
          <button className="btn btn-secondary btn-sm" onClick={handleRegister}>
            Sign up
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

export default Login;
