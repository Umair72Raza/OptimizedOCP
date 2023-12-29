/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const AttemptedQuizCard = ({ quiz }) => {
  return (
    <div
      style={{ backgroundColor: "#f0f0f0 " }}
      className="d-flex w-auto flex-column fw-bold align-items-center rounded-3 shadow"
    >
      <h2 style={{ color: "blue" }} className="text-xl  mb-2">
        {quiz.quizTitle}
      </h2>
      <p className="">Marks: {quiz.marks}</p>
      <span>
        <p>Student ID: </p>
          {quiz.studentId}
      </span>
    </div>
  );
};

export default AttemptedQuizCard;
