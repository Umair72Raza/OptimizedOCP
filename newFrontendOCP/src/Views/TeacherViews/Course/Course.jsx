/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import quizpng from "./quiz.png";
import videopng from "./video.png";
import coursepng from "./online-course.png";
import studentspng from "./students.png";
import chatpng from "./chat.png";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
const Course = (props) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const location = useLocation();
  const id = location.state?.id;
  const title = location.state?.title;
  const navigate = useNavigate();

  const handleGetData = async (e) => {
    e.preventDefault();
    navigate("/QuizList", {
      state: { courseId: id, studentId: currentUser._id },
    });
  };
  const handlePostVid = (e) => {
    e.preventDefault();
  };
  const handlePostQuiz = (e) => {
    e.preventDefault();
    navigate("/Quiz", { state: { id: id, title: title } });
  };

  const handlStudentsData = async (e) => {
    e.preventDefault();
    navigate("/studentsOfCourse", { state: { courseId: id } });
  };

  return (
    <DefaultLayout>
<div className="d-flex justify-content-center align-items-center vh-100 overflow-y-auto position-relative mathBackground" style={{width:'100%'}}>
  <div className="container position-relative " style={{width:'100% !important',height:'100vh', top:'20% !important'}}>
    <div className="border position-relative top-20-precent mt-4" style={{width: '100% !important', top:'20% !important'}}>
      <div>
        <h5 className="text-center background mt-5">{title}</h5>
      </div>
      <div className="chat mt-5">
        <div className="m-1">
          <div className="rounded background p-3">
            <img
              src={quizpng}
              alt="..."
              style={{ height: "50px", width: "auto", margin: "10px" }}
            />
            <button
              onClick={handlePostQuiz}
              className="mb-4 w-100 btn btn-success"
            >
              Post a Quiz
            </button>
          </div>
        </div>

              <div className="m-1">
                <div className="rounded background p-3">
                  <img
                    src={videopng}
                    alt="video"
                    style={{ height: "50px", width: "auto", margin: "10px" }}
                  />
                  <button
                    onClick={handlePostVid}
                    className="mb-4 w-100 btn btn-info"
                  >
                    Post a Video
                  </button>
                </div>
              </div>

              <div className="m-1">
                <div className="rounded background p-3">
                  <img src={coursepng} alt="course" />
                  <button
                    onClick={handleGetData}
                    className="mb-4 w-100 btn btn-primary"
                  >
                    Get Course Data
                  </button>
                </div>
              </div>

              <div className="m-1">
                <div className="rounded background p-3">
                  <img src={studentspng} alt="students" />
                  <button
                    onClick={handlStudentsData}
                    className="mb-4 btn w-100 btn-primary"
                  >
                    Students Enrolled
                  </button>
                </div>
              </div>

              <div className="m-1">
                <div className="rounded background p-3">
                  <img src={chatpng} alt="chat" />
                  <button
                    onClick={() => navigate("/chat")}
                    className="mb-4 btn w-100 btn-primary"
                  >
                    Chat with Students
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Course;
