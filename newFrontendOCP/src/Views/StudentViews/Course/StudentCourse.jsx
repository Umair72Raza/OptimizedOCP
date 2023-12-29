/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getTeacherofCourseId } from "../../../Apis/CourseApis";
import StudentDefaultLayout from "../../../components/Layouts/StudentDefaultLayout";

const StudentCourse = (props) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //console.log(currentUser.username)
  const studentName = currentUser.username;
  const [enrolled, setEnrolled] = useState(false);
  const location = useLocation();
  const id = location.state?.id;
  const title = location.state?.title;
  const navigate = useNavigate();

  useEffect(() => {
    checkEnrollment();
  }, []);

  const checkEnrollment = async () => {
    try {
      const isStudent = await fetch(
        `http://localhost:4000/courseSystem/checkEnrollment/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId: id, studentId: currentUser._id }),
        }
      );
      const result = await isStudent.json();
      console.log("result from enroll student api", result);
      if (result.isEnrolled) {
        setEnrolled(true);
      } else {
        setEnrolled(false);
      }
    } catch (error) {
      console.log("error in checking enrollment", error);
    }
  };

  const handleGetData = async (e) => {
    e.preventDefault();
    navigate("/StudentQuizList", {
      state: { courseId: id, studentId: currentUser._id, stdName: studentName },
    });
  };

  const enrollStudent = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/courseSystem/enroll",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId: id, studentId: currentUser._id }),
        }
      );
      const result = await response.json();
      console.log("result from enroll student api", result);
      setEnrolled(true);
    } catch (error) {
      console.log("errorrr", error);
    }
  };

  const getTeacherId = async () => {
    try {
      const data = await getTeacherofCourseId(id);
      return data.data.teacherId[0];
    } catch (error) {
      console.log(error);
    }
  };

  const handlStudentChat = async (e) => {
    e.preventDefault();
    const data = await getTeacherId();
    console.log(data);
    navigate("/studentChat", { state: { teacherId: data } });
  };

  return (
    <StudentDefaultLayout>
      <div className=" ">
        <div className="d-flex container justify-content-center negative-margin-top ">
          <div className="col-md-4 d-flex flex-column align-items-center justify-content-center fullScreen">
            <div
              style={{ backgroundColor: "#f5f4f2", borderRadius: "25px" }}
              className="card d-flex mt-4 align-items-center justify-content-center"
            >
              <div className="card-body text-center" style={{ margin: "25px" }}>
                <div className="d-flex flex-column">
                  <a href="#">
                    <h5 className="mb-4 text-2xl font-bold text-gray-900">
                      Course Name: {title}
                    </h5>
                  </a>
                  {enrolled ? (
                    <>
                      <button
                        style={{ border: "none", color: "whitesmoke" }}
                        onClick={handleGetData}
                        className="rounded  btnNavbarClr"
                      >
                        Get Course Data
                      </button>
                      <button
                        style={{ border: "none", color: "whitesmoke" }}
                        onClick={handlStudentChat}
                        className="rounded  btnNavbarClr mt-2"
                      >
                        Chat with the Teacher
                      </button>
                    </>
                  ) : (
                    <button
                      style={{ border: "none", color: "whitesmoke" }}
                      onClick={enrollStudent}
                      className="mb-4 rounded googleKalnia  btnNavbarClr"
                    >
                      Enroll
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentDefaultLayout>
  );
};

export default StudentCourse;
