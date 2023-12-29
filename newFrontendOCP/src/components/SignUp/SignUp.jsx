/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ role, setDisplay, setSignUpClicked }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  let Role = role;
  let signUpRole = "";
  if (role === "Teacher") {
    role = "Admin";
  }
  //console.log(role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle signup logic
    handleSignUp();
    //console.log("Signup clicked:", username, email, password, role);
  };

  const handleSignUp = async () => {
    try {
      //console.log(username, email, password, role);
      let reqbody = { username, email, password, role };

      await axios
        .post("http://localhost:4000/loginSystem/signUp", reqbody)
        .then((response) => {
          console.log(response);
        });

      //console.log(role);

      await axios
        .post("http://localhost:4000/loginSystem/Login/", {
          email: email,
          password: password,
          role: role,
        })
        .then((response) => {
          //console.log(response);
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem(
            "currentUser",
            JSON.stringify(response.data.userData)
          );
          signUpRole = response.data.userData.role;
        });

      // signUpRole =  localStorage.getItem("currentUser") ;
      //console.log(signUpRole, "sign up role");
      if (signUpRole === "Admin") {
        navigate("/HomePage");
      } else {
        navigate('/studentHomePage')
      }

      setEmail("");
      setPassword("");
      setUsername("");
    } catch (error) {
      console.log(error);
    }
  };

  const back = (e) => {
    e.preventDefault();
    setSignUpClicked(false);
    setDisplay(true);
  };

  return (
    <div className="container d-flex g-4  ">
      <div className="row col-sm-10 col-md-8 col-lg-10">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="container-md mx-auto p-5 bg-white rounded-md shadow-md">
                <h2 className="text-3xl font-bold mb-4 text-center">
                  Sign Up as {role}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100">
                    Sign Up
                  </button>
                </form>
                <button className="btn btn-danger mt-3" onClick={back}>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
