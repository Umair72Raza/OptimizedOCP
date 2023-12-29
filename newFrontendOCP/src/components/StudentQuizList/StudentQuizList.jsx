/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AttemptedQuizCard from "../Card/AttemptedQuizCard";
import Loading from "../Loading/Loading";
import DefaultLayout from "../Layouts/DefaultLayout";
import StudentQuizCard from "../Card/StudentQuizCard";
import StudentAttemptedQuizCard from "../Card/StudentAttemptedQuizCard";

const StudentQuizList = () => {
  const location = useLocation();
  const id = location.state?.courseId;
  //console.log("C id", id);
  const studentId = location.state.studentId;
  const name = location.state.stdName;
  //console.log(name)
  //console.log("std ID", studentId);
  const [quizlists, setQuizList] = useState([]);
  const [loaded, setIsLoaded] = useState(false);
  const [atmQuizLists, setAtmQuizLists] = useState([]);
  const [atmQuizLoad, setAtmQuizLoad] = useState(false);
  const [atmIdArray, setAtmIdArray] = useState([]);

  useEffect(() => {
    getQuizList();
    getAttemptedQuizList();
  }, []);

  const getQuizList = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/quizSystem/getQuizesbyCourseId/${id}`
      );
      const result = await response.json();
      console.log("result from get quiz api", result);
      setQuizList(result.response);
      setIsLoaded(true);
      const arrays = result.response;

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
      setAtmQuizLoad(true);
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
      <div className="container-fluid d-flex flex-column  align-items-center justify-content-center text-black ">
        <>
          <div
            className="lists text-center"
            style={{
              minHeight: "100vh",
              padding: "px",
            }}
          >
            <div className="w-fit p-4 m-4 rounded shadow">
              <h1 style={{ color: "#176B87" }} className=" ">
                Quiz List
              </h1>
              <div className=" d-flex flex-wrap justify-content-center gap-4 shadow-md p-4 bg-white ">
                {loaded ? (
                  quizlists?.map((quiz) => (
                    <StudentQuizCard
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

            <div className="w-fit p-4 m-4 rounded shadow ">
              <h1 className="text-black">Attempted Quiz List</h1>
              <div className="d-flex gap-4 justify-content-center text-center pt-4 flex-wrap">
                {atmQuizLoad ? (
                  atmQuizLists.map((quiz) => (
                    <StudentAttemptedQuizCard
                      key={quiz._id}
                      quiz={quiz}
                      name={name}
                    />
                  ))
                ) : (
                  <p className="text-white w-fit px-4 py-2">
                    No Quizzes attempted yet!
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      </div>
    </DefaultLayout>
  );
};

export default StudentQuizList;
