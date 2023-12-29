/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QuizCard from "../Card/QuizCard";
import axios from "axios";
import AttemptedQuizCard from "../Card/AttemptedQuizCard";
import Loading from "../Loading/Loading";
import BackButton from "../BackButton/BackButton";
import DefaultLayout from "../Layouts/DefaultLayout";

const QuizList = () => {
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const id = location.state?.courseId;
  const studentId = location.state.studentId;
  const [quizlists, setQuizList] = useState([]);
  const [loaded, setIsLoaded] = useState(false);
  const [atmQuizLists, setAtmQuizLists] = useState([]);
  const [atmQuizLoad, setAtmQuizLoad] = useState(false);
  const [idArray, setIdArray] = useState([]);
  const [atmIdArray, setAtmIdArray] = useState([]);
  const [teacherAtmpQuizList, setTeacherAtmpQuizList] = useState([]);
  const [teacherAtmptLoaded, setTeacherAtmptLoaded] = useState(false);
  useEffect(() => {
    getQuizList();
    getAttemptedQuizList();
  }, []);

  const atmptQuizforTeacher = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/atmptQuizSystem/getatmptQuizofCourse/${id}`
      );
      const result = await response.data;
      //console.log(result.response, " is the response from quizzes of teacher");
      setTeacherAtmpQuizList(result.response);

      return result.response;
    } catch (error) {
      console.log("failed attempt to get quizzes of teacher: ", error);
    }
  };

  const atmptTeachersQuizzes = async (e) => {
    e.preventDefault();
    setTeacherAtmptLoaded(!teacherAtmptLoaded);
    await atmptQuizforTeacher();
  };

  const getQuizList = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/quizSystem/getQuizesbyCourseId/${id}`
      );
      const result = await response.json();
      //console.log("result from get quiz api", result);
      setQuizList(result.response); // Fix: Use result.response to set the quiz list
      setIsLoaded(true); // Fix: Set the loaded state to true
      const arrays = result.response;
      const extractedIds = arrays.map((item) => item._id);
      setIdArray(extractedIds);

      return result;
    } catch (error) {
      console.log("error from course getter", error);
    }
  };

  const getAttemptedQuizList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/atmptQuizSystem/getAttemptedQuizzes/${studentId}/${id}`
      );
      const result = await response.data;
      console.log("result from get atm quiz list", result);
      setAtmQuizLists(result.response);
      setAtmQuizLoad(true); //check response and then render
      const atmArrays = result.response;
      const extractedAtmIds = atmArrays.map((item) => item.quizId);
      setAtmIdArray(extractedAtmIds);
      return result;
    } catch (error) {
      console.log("Error in getting attempted quizzes", error);
    }
  };

  return (
    <DefaultLayout>
      <div
        className="container-fluid d-flex flex-column align-items-center justify-content-center text-black "
        style={{ paddingTop: "50px", backgroundColor: "" }}
      >

          <>
            <div>
              <div className=" d-flex justify-content-center align-items-center w-fit h-fit p-8 p-4 mb-4  text-center">
                <div className="d-flex flex-wrap justify-content-center  pt-4 align-items-center gap-4 rounded ">
                  {loaded ? (
                    quizlists.map((quiz) => (
                      <QuizCard
                        key={quiz._id}
                        quiz={quiz}
                        atmArrays={atmIdArray}
                      />
                    ))
                  ) : (
                    <Loading />
                  )}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center mb-4 text-white ">
              <button
                onClick={atmptTeachersQuizzes}
                className="btn btn-purple font-bold rounded align-items-center p-3 br-md"
              >
                Show attempted quizzes of the Course
              </button>
            </div>

            <div className="d-flex text-center justify-content-center align-items-center w-fit h-fit mt-8 p-4 mb-4 rounded-3 shadow-lg">
              <div className="d-flex flex-wrap justify-content-center gap-4 flex-wrap">
                {teacherAtmptLoaded ? (
                  teacherAtmpQuizList.map((quiz) => (
                    <AttemptedQuizCard key={quiz._id} quiz={quiz} />
                  ))
                ) : (
                  <>
                    <p>
                      Click the button above to get the Attempted Quizzes of
                      Students
                    </p>
                  </>
                )}
              </div>
            </div>
          </>
      </div>
    </DefaultLayout>
  );
};

export default QuizList;
