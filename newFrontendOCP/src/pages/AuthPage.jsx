/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LoginPage from "../components/LoginPage/LoginPage";
import SignUp from "../components/SignUp/SignUp";

const AuthPage = ({ role, setRole }) => {
  const [loginClicked, setLoginClicked] = useState(false);
  const [signUpClicked, setSignUpClicked] = useState(false);
  const [display, setDisplay] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const openLogin = (e) => {
    e.preventDefault();
    setDisplay(false);
    setSignUpClicked(false);
    setLoginClicked(true);
  };

  const openSignUp = (e) => {
    e.preventDefault();
    setDisplay(false);
    setLoginClicked(false);
    setSignUpClicked(true);
  };

  const back = () => {
    setRole();
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-gradient-to-r from-purple-500 to-blue-500">
      {display ? (
        <div className="bg-white p-10 rounded-md shadow-md text-center">
          <h1 className="text-4xl font-bold mb-6 text-purple-800">Welcome!</h1>

          <Link className="text-decoration-none m-4">
            <button
              onClick={openLogin}
              className="btn btn-primary px-4 py-2 rounded-md mb-4"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
              Login
            </button>
          </Link>

          <Link className="text-decoration-none">
            <button
              onClick={openSignUp}
              className="btn btn-success px-4 py-2 rounded-md mb-4"
            >
              <FontAwesomeIcon icon={faUserPlus} className="me-2" />
              Sign Up
            </button>
          </Link>
          <br></br>
          <button
            onClick={back}
            className="btn btn-danger  px-4 py-2 rounded-md"
          >
            Back
          </button>
        </div>
      ) : null}

      {loginClicked ? (
        <LoginPage
          role={role}
          setDisplay={setDisplay}
          setLoginClicked={setLoginClicked}
        />
      ) : null}
      {signUpClicked ? (
        <SignUp
          role={role}
          setDisplay={setDisplay}
          setSignUpClicked={setSignUpClicked}
        />
      ) : null}
    </div>
  );
};

export default AuthPage;
