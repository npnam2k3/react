import React, { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    // validate

    //submit
    let res = await postLogin(email, password);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
      navigate("/");
    }
    if (res && +res.EC !== 0) {
      toast.error(res.EM);
    }
  };
  const handleClickBtnRegister = () => {};
  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button className="regis-btn" onClick={() => handleClickBtnRegister()}>
          Sign up
        </button>
      </div>
      <div className="title col-4 my-2 mx-auto text-center">Login</div>
      <div className="welcome col-4 mx-auto text-center">
        Hello, who's this?
      </div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button className="login-btn" onClick={() => handleLogin()}>
            Login to website
          </button>
        </div>
        <div className="back">
          <span onClick={() => navigate("/")}>&#60;&#60; Go to Homepage</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
