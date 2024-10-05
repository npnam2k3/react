import React, { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { FaSpinner } from "react-icons/fa";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleLogin = async () => {
    // validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    if (!password.trim()) {
      toast.error("Invalid password");
      return;
    }
    setIsLoading(true);
    //submit
    let res = await postLogin(email, password);
    if (res && +res.EC === 0) {
      dispatch(doLogin(res));
      toast.success(res.EM);
      setIsLoading(false);
      navigate("/");
    }
    if (res && +res.EC !== 0) {
      toast.error(res.EM);
      setIsLoading(false);
    }
  };
  const handleClickBtnRegister = () => {
    navigate("/register");
  };
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
          <button
            className="login-btn"
            onClick={() => handleLogin()}
            disabled={isLoading}
          >
            {isLoading && <FaSpinner className="loaderIcon" />}
            <span>Login to website</span>
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
