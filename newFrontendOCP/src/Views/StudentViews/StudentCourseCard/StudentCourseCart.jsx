/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Modal from "react-modal";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";

const StudentCourseCard = (props) => {
  const { title, id } = props;
  const navigate = useNavigate();
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  Modal.setAppElement("#root");

  const handleClick = (e) => {
    e.preventDefault();
    console.log("value", id);
    navigate("/studentCourse", { state: { id: id, title: title } });
  };
  return (
    <>
      <div style={{backgroundColor:"#fff"}} className="d-flex flex-column mb-4 justify-content-center align-items-center w-fit rounded shadow ">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold blueText ">{title}</h5>
          <a
            onClick={handleClick}
            className=" inline-flex align-items-center text-center text-white "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="40"
              fill="currentColor"
              className="bi bi-arrow-right btnNavbarClr rounded-5 "
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default StudentCourseCard;
