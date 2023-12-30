/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./App.css";
import Question from "./components/Question/Question";

import QuestionList from "./components/QuestionList/QuestionList";
import { jwtDecode } from "jwt-decode";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import JoiningPage from "./pages/Joining Page";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUp from "./components/SignUp/SignUp";
import AuthPage from "./pages/AuthPage";
import Chat from "./Views/TeacherViews/Chat/Chat";
import StudentChat from "./Views/StudentViews/StudentChat/StudentChat";
import StudentCourse from "./Views/StudentViews/Course/StudentCourse";
import HomePage from "./Views/TeacherViews/HomePage/HomePage";
import Course from "./Views/TeacherViews/Course/Course";
import CreateCourse from "./Views/TeacherViews/forms/CreateCourse";
import ViewCourses from "./Views/StudentViews/ViewCourse/ViewCourses";
import StudentsOfCourse from "./Views/TeacherViews/StudentsOfCourse/StudentsOfCourse";
import StudentQuizList from "./Views/StudentViews/StudentQuizList/StudentQuizList";
import Quiz from "./Views/TeacherViews/Quiz/Quiz";
import QuizList from "./Views/TeacherViews/QuizList/QuizList";
import TeacherPage from "./Views/TeacherViews/ViewCourse/TeacherPage";
import StudentDefaultLayout from "./components/Layouts/StudentDefaultLayout";
import StudentHomePage from "./Views/StudentViews/StudentHomePage/StudentHomePage";
import MainBar from "./Views/TeacherViews/Mainbar/Mainbar";

function App(props) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const theAdmin = currentUser && currentUser.role === "Admin";
    //console.log("theAdmin", theAdmin);
    if (theAdmin) {
      adminSetter();
    }
  }, [isAdmin]); // Empty dependency array to ensure it runs only once on mount

  const adminSetter = () => {
    //console.log("Only runs when admin");
    setIsAdmin(true);
  };

  useEffect(() => {
    adminSetter();
  }, [isAdmin]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/AuthPage" element={<AuthPage />} />
          <Route path="/DefaultLayout" element={<DefaultLayout />} />
          <Route path="/studentDefaultLayout" element={<StudentDefaultLayout />} />
          <Route path="/" element={<JoiningPage />} />
          <Route path="/viewCourse" element={<ViewCourses />} />

          <Route element={<Layout />}>
            <Route path="/studentCourse" element={<StudentCourse />} />
            <Route path="/StudentQuizList" element={<StudentQuizList />} />
            <Route path="/studentHomePage" element={<StudentHomePage />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/Quiz" element={<Quiz />} />
            <Route path="/Mainbar" element={<MainBar />} />
            <Route path="/Course" element={<Course />} />
            <Route path="/QuizList" element={<QuizList />} />
            <Route path="/QuestionList" element={<QuestionList />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/studentChat" element={<StudentChat />} />
            {isAdmin ? (
              <>
                ({/* {console.log("I admin ran ", isAdmin)} */}
                <Route path="/Teacher" element={<TeacherPage />} />
                <Route path="/question" element={<Question />} />
                <Route path="/createCourse" element={<CreateCourse />} />
                <Route
                  path="/studentsOfCourse"
                  element={<StudentsOfCourse />}
                />
                )
              </>
            ) : (
              <></>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Layout(props) {
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkAdmin = () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const isAdmin = currentUser.role === "Admin";
    };
    const checkTokenValidity = () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            localStorage.removeItem("token");
            window.location.replace("/login");
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else {
        window.location.replace("/");
      }
    };

    checkTokenValidity();
    checkAdmin();
  }, [token]);

  if (!token) {
    return <Navigate to="/" />;
  }

  const decodedToken = jwtDecode(token);
  // console.log(token);

  const checkTokenExpiration = () => {
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      window.location.href = "/";
    }
  };
  checkTokenExpiration();

  if (!localStorage.getItem("token")) {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.href = "/";
    return null;
  }

  return <Outlet />;
}

export default App;
