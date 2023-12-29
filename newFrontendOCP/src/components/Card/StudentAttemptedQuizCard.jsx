/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const StudentAttemptedQuizCard = ({ quiz,name }) => {
  return (
    <div
      style={{
        color: "#fff",
        borderRadius: "1px", // Add rounded corners
        padding: "5px", // Add padding for spacing
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
      }}
      className="d-flex align-items-center atmptQuiz"
    >
      <div>
        <h2
          style={{
            fontSize: "24px", 
            marginBottom: "10px", 
            color: "#176B87",
          }}
          className="mb-2"
        >
          {quiz.quizTitle}
        </h2>
      </div>
      <div>
        <p
          style={{
            fontSize: "18px", 
            marginBottom: "5px",
          }}
          className="mb-0"
        >
          Marks: {quiz.marks}
        </p>
      </div>
      <div>
        <span style={{ fontSize: "16px" }}>
          <p
            style={{
              fontSize: "18px", // Adjust font size
              marginBottom: "10px", // Add margin at the bottom
            }}
            className="mb-0"
          >
            Student Name:
          </p>
          {name}
        </span>
      </div>
    </div>
  );
};

export default StudentAttemptedQuizCard;
