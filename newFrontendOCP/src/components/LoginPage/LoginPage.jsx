/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = ({ role, setDisplay, setLoginClicked }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  var Role = role;
  //console.log(Role);
  if (role === "Teacher") {
    Role = "Admin";
  }
  //console.log(Role);

  const handleLogIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/loginSystem/Login/",
        {
          email: email,
          password: password,
          role: Role,
        }
      );

      //console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem(
        "currentUser",
        JSON.stringify(response.data.userData)
      );
      const user = JSON.parse(localStorage.getItem("currentUser"));
      //console.log("User role", user.role);

      // Show success notification
      toast.success("Login successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      if(user.role == 'Admin')
      {setTimeout(() => navigate("/HomePage"), 1000);}
      else{
        {setTimeout(() => navigate("/studentHomePage"), 1000);}
      }
    } catch (error) {
      console.error(error);
      // Show error notification
      toast.error("Login failed. Please check your credentials.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogIn(email, password);
    //console.log("Login clicked:", email, password);
  };

  const back = (e) => {
    e.preventDefault();
    setLoginClicked(false);
    setDisplay(true);
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col col-md-8 col-sm-10 col-lg-6">
          <div className="card">
            <div className="card-body d-flex flex-column align-items-center mx-auto  bg-white rounded-md shadow-md">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Login as {role}
              </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 ">
                    <label htmlFor="email" className="form-label ">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control "
                      
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 ">
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
                  <button type="submit" className="btn btn-primary ">
                    Login
                  </button>
                </form>
              <button className="btn btn-danger mt-3" onClick={back}>
                Back
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
