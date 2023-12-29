/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ quiz, atmArrays }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isAdmin = currentUser && currentUser.role === "Admin";
  const isDisabled = atmArrays.includes(quiz._id);
  //console.log("isDisabled",isDisabled)
  const navigate = useNavigate();
  const goToQuestions = (e) => {
    e.preventDefault();
    navigate("/QuestionList", {
      state: {
        quizId: quiz._id,
        quizTitle: quiz.title,
        courseID: quiz.courseId,
      },
    });
  };

  const adminClick = (e) => {
    e.preventDefault();
    navigate("/QuestionList", {
      state: {
        quizId: quiz._id,
        quizTitle: quiz.title,
        courseID: quiz.courseId,
      },
    });
  };
  return (
    <>

        <div
          className="container w-auto p-3 mb-4 rounded shadow "
          style={{
            overflowX: "auto",
            overflowY: "auto",
            backgroundColor: "#f0f0f0 ",
          }}
        >
          <h2 className="text-l font-bold mb-2">{quiz.title}</h2>
          <p>Quiz ID: {quiz._id}</p>
          <p>Course ID: {quiz.courseId}</p>
          <button
            onClick={adminClick}
            className="btn btn-primary w-fit px-4 py-2 rounded"
          >
            See Questions of Quiz
          </button>
        </div>
    </>
  );
};

export default QuizCard;
