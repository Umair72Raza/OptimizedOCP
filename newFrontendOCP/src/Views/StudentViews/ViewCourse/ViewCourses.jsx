/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import Cards from "../../../components/Card/Cards";
import StudentCourseCard from "../StudentCourseCard/StudentCourseCart";
import Loading from "../../../components/Loading/Loading";
import StudentDefaultLayout from "../../../components/Layouts/StudentDefaultLayout";

const ViewCourses = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser._id;
  const [coursesList, setCoursesList] = useState();
  const [gotResponse, setGotResponse] = useState(false);
  const [enrolCourses, setEnrolCourses] = useState();
  const [showEnrolCourse, setShowEnrolCourse] = useState(false);
  const allCoursesIds = [];
  const enrolledCoursesIds = [];
  useEffect(() => {
    getAllCourses();
    getEnrolledCourses();
  }, []);

  const getAllCourses = async () => {
    try {
      axios
        .get("http://localhost:4000/courseSystem/getAllTheCourses")
        .then((response) => {
          //console.log(response.data.response);
          const result = response.data.response;
          setCoursesList(response.data.response);
          result.map((course) => allCoursesIds.push(course._id));
          console.log("all course array", allCoursesIds);
          setGotResponse(true);
        });
    } catch (error) {
      console.log("error while getting courses", error);
    }
  };

  const getEnrolledCourses = async () => {
    try {
      const response = axios.get(
        `http://localhost:4000/courseSystem/getenrolledcourses/${userId}`
      );
      if (!response) {
        console.log("No enrolled courses");
      }
      const result = await response;
      const aray = result.data.courses;
      setEnrolCourses(aray);
      setShowEnrolCourse(true);
    } catch (error) {
      console.log("error getting enrolled courses due to: ", error);
    }
  };
  return (
    <StudentDefaultLayout>
      <div className="container mt-4 mb-4">
        {currentUser ? (
          <>
            <div>
              {showEnrolCourse ? (
                <div className="d-flex justify-content-center">
                  <div
                    style={{ backgroundColor: "#f7fafc" }}
                    className="d-flex flex-column  col-sm-10 col-md-6 col-lg-7 col-xl-5 p-2 shadow  rounded border-gray-200 mb-4 shadow"
                  >
                    <p className="font-bold  text-center">
                      The List of Your Enrolled courses are
                    </p>
                    {enrolCourses.map((course) => (
                      <div
                        key={course.courseId}
                        className=" bg-blue-200 m-4 w-auto rounded-md text-center "
                      >
                        <h5>{course.title}</h5>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="container">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-sm-10 col-md-6 col-lg-3 col-xl-3">
                      <Cards
                        title={"You haven't enrolled in any courses yet."}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="container">
              <h1 className="text-center fw-bold mb-4">All Courses</h1>

              <div className="d-flex align-items-center flex-column justify-content-center  flex-wrap">
                <div className="d-flex justify-content-center gap-4 flex-wrap">
                  {gotResponse ? (
                    coursesList.map((course) => (
                      <div
                        key={course._id}
                        className="col-12 col-md-6 col-lg-4 col-xl-3"
                      >
                        <StudentCourseCard
                          title={course.Name}
                          id={course._id}
                        />
                      </div>
                    ))
                  ) : (
                    <Loading />
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>You are not logged In!</div>
        )}
      </div>
    </StudentDefaultLayout>
  );
};

export default ViewCourses;
