/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import StudentDetails from "../StudentDetails/StudentsDetails";

const Cards = (props) => {
  const { title, description, action, getStd } = props;
  const [showStd, setShowStd] = useState(false);
  const [stdData, setStdData] = useState([]);

  const getUserById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/loginSystem/getUserById/${title}`
      );
      console.log(response.data.response[0]);
      setStdData(response.data.response[0]);

      setShowStd(true);
    } catch (error) {
      console.log("error getting User with the id");
    }
  };

  return (
    <div className="card rounded border shadow ">
      <div className="card-body p-5">
        <a href="#">
          <h5 className="card-title mb-2 text-2xl font-bold  tracking-tight text-gray-900">
            {title}
          </h5>
        </a>
        <p className="card-text mb-3 font-normal text-gray-700">
          {description}
        </p>
      </div>
      {getStd ? (
        <>
          <button
            className="btn btn-success m-4 text-white px-4 py-2 rounded "
            onClick={getUserById}
          >
            {" "}
            {action}
          </button>
          {showStd ? (
            <>
              <StudentDetails {...stdData} />
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <div className="d-flex justify-content-center flex-column align-items-center quiz-headings text-black inline-flex items-center px-3 py-2 text-sm font-medium text-center mb-8 rounded">
            {action}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="40"
              fill="white"
              className="bi bi-arrow-right svgColor "
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

export default Cards;
