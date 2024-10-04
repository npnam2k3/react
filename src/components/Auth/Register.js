import React, { useState } from "react";
import "./register.scss";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiServices";
import { toast } from "react-toastify";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickBtnLogin = () => {
    navigate("/login");
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleRegister = async () => {
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
    // submit
    let res = await postRegister(email, password, username.trim());
    if (res && +res.EC === 0) {
      toast.success(res.EM);
      navigate("/login");
    }
    if (res && +res.EC !== 0) {
      toast.error(res.EM);
    }
  };
  const handleShowPassword = (e) => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="regis-container">
        <div className="header">
          <span>If you have an account</span>
          <button className="regis-btn" onClick={() => handleClickBtnLogin()}>
            Login
          </button>
        </div>
        <div className="title col-4 my-2 mx-auto text-center">Register</div>

        <div className="content-form col-4 mx-auto">
          <div className="form-group">
            <label>
              Email <span style={{ color: "red" }}>(*)</span>
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group password">
            <label>
              Password <span style={{ color: "red" }}>(*)</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!showPassword ? (
              <VscEye
                className="icon-eye"
                onClick={(e) => handleShowPassword(e)}
              />
            ) : (
              <VscEyeClosed
                className="icon-eye"
                onClick={(e) => handleShowPassword(e)}
              />
            )}
          </div>
          <div>
            <button className="regis-btn" onClick={() => handleRegister()}>
              Register new account
            </button>
          </div>
          <div className="back">
            <span onClick={() => navigate("/")}>&#60;&#60; Go to Homepage</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
