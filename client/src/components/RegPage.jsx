import React from "react";
import Navbar from "./Navbar";
import "../css/page.css";
import "../css/style.css";
import "../css/LoginPage.css";
import Layout from "./Layout";
import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useCurrentUser } from "./userState";
import { connect } from "react-redux";
import { login, registerUser } from "../actions/auth";
import { checkAuthenticated, loadUser } from "../actions/auth";
// import { PASSWORD_ERROR, EMAIL_ERROR } from "../actions/types";
import { useDispatch, useSelector } from "react-redux";

const LOCALHOST = `${API_URL}`;

const client = axios.create({
  baseURL: `${LOCALHOST}`,
});

const RegPage = ({ registerUser, isAuthenticated, errorMessage, successMessage }) => {
  let invalid = false;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",

    is_student: true,
    is_teacher: false,
  });
  const { username, email, password, re_password } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const [isRegistered, setIsRegistered] = useState(false);

  // const dispatch = useDispatch();
  // const emailError = useSelector((state) => state.auth.emailError);
  // const passwordError = useSelector((state) => state.auth.passwordError);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [MatchError, setMatchError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setMatchError("");
    registerUser(username, email, password, re_password, setEmailError, setPasswordError, isRegistered);
    navigate(`/signup/complete/${formData.name}/`);

    console.log("formData: ", formData);
  };

  if (isRegistered) {
    // return <Navigate to={`/signup/complete/${formData.name}/`} />;
    navigate(`/signup/complete/${formData.name}/`);
  }
  return (
    <>
      <Layout>
        {/* <button className="btn btn-gradient" onClick={() => setCurrentUser(true)}>
          sds
        </button> */}
        <div className="container mt-5 login-pc-block">
          <div className="row">
            <div className="col-md-5 col-12">
              <img src="/assets/images/login-banner.png" className="danceImg" alt="" width="500" />
            </div>
            <div className="col-md-5 col-12 pcontainer login-pc-v">
              <form className="login-form" onSubmit={(e) => onSubmit(e)}>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {successMessage && <div class="alert alert-success">{successMessage}</div>}
                <input name="email" type="email" className="login-field" placeholder="Email" value={email} onChange={(e) => onChange(e)} />
                <input name="username" type="text" className="login-field" placeholder="Username" value={username} onChange={(e) => onChange(e)} />
                <input name="password" type="password" className="login-field" placeholder="Password" value={password} onChange={(e) => onChange(e)} />
                <input name="re_password" type="password" className="login-field" placeholder="Retype Password" value={re_password} onChange={(e) => onChange(e)} />

                <button type="submit" className="login-button">
                  Register
                </button>
              </form>
              <div className=" mt-4">
                New to Gradubt?{" "}
                <Link className="text-success" to="/signup">
                  Create an account
                </Link>
                {/* <Link to="/signup/complete/test-name/test-sid/test-dept">Complete Registration</Link> */}
              </div>
            </div>
          </div>
        </div>

        <div className="mbl-container login-mbl-block">
          <div className="pcontainer login-pc-v">
            <form className="login-form" onSubmit={(e) => onSubmit(e)}>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              {successMessage && <div class="alert alert-success">{successMessage}</div>}
              <input name="email" type="email" className="login-field" placeholder="Email" value={email} onChange={(e) => onChange(e)} />
              <input name="username" type="text" className="login-field" placeholder="Username" value={username} onChange={(e) => onChange(e)} />
              <input name="password" type="password" className="login-field" placeholder="Password" value={password} onChange={(e) => onChange(e)} />
              <input name="re_password" type="password" className="login-field" placeholder="Retype Password" value={re_password} onChange={(e) => onChange(e)} />

              <button type="submit" className="login-button">
                Register
              </button>
            </form>
            <div className=" mt-4">
              New to Gradubt?{" "}
              <Link className="text-success" to="/signup">
                Create an account
              </Link>
              <Link to="/signup/complete/test-name/test-sid/test-dept">Complete Registration</Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage,
  successMessage: state.auth.successMessage,
});

export default connect(mapStateToProps, { registerUser })(RegPage);
