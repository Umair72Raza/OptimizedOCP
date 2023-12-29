/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";

const StudentQuizCard = ({ quiz, atmArrays }) => {
  const isDisabled = atmArrays.includes(quiz._id);
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
  return (
    <>
      <div className="d-flex p-3 rounded justify-content-between container atmptQuiz ">
        <div>
          <h2
            style={{ color: "#176B87" }}
            className="text-l w-auto font-bold mb-2 "
          >
            {quiz.title}
          </h2>
        </div>
        <div>
          <button
            className={`px-4 py-2 rounded ${
              isDisabled ? "disabled" : ""
            } custom-button`}
            onClick={goToQuestions}
            disabled={isDisabled}
          >
            {"Start Quiz >"}
          </button>
        </div>
      </div>
    </>
  );
};

export default StudentQuizCard;
