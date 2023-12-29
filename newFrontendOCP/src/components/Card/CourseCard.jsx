/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";

const CourseCard = (props) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isAdmin = currentUser && currentUser.role === "Admin";
  const teacherId = currentUser._id;
  const { title, id } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const callDeleteCourse = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/courseSystem/deleteTeacherFromCourse/courseId/${id}`
      );
      console.log(response);
      setModalOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 0);
    } catch (error) {
      console.log("Couldnt delete the course due to: ", error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const deleteCourse = async (e) => {
    e.preventDefault();
    setModalOpen(true);
    //callDeleteCourse();
  };

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  Modal.setAppElement("#root");

  const handleClick = (e) => {
    e.preventDefault();
    //console.log("value", id);
    navigate("/Course", { state: { id: id, title: title } });
  };
  return (
    <>
      <div className="max-w-sm courseCard position-relative bg-white m-4 h-full thickBorder rounded-lg shadow">
        <IoMdCloseCircle
          onClick={deleteCourse}
          style={{ cursor: "pointer" }}
          className="text-danger position-absolute fs-2 negativebutton"
        />

        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Example Modal"
          style={{
            content: {
              width: "350px",
              height: "300px",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <div className="text-white text-center ">
            <h2 className="text-lg font-bold  text-black">Confirm Deletion</h2>
            <p className="m-4 text-black">Are you sure you want to delete?</p>

            {/* Buttons in the modal */}
            <button
              className="btn btn-danger mx-4 text-white rounded "
              onClick={callDeleteCourse}
            >
              Delete
            </button>
            <button
              className="btn btn-warning mx-4 text-gray-700 rounded"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </Modal>

        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700">{id}</p>
          <button
            onClick={handleClick}
            className="btn btn-primary inline-flex items-center font-medium text-center rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
