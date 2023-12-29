import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cards from './Cards';

export const ResultCard = () => {
  const location = useLocation();
  const [marks, setMarks] = useState(0);
  const quizTitle = location.state.QuizTitle;
  const result = location.state.result;
  const [rightOptions, setRightOptions] = useState([]);
  const quizId = location.state.result.newAttempt.quizId;
  const courseId = location.state.result.newAttempt.courseId;
  const selectedOptions = location.state.result.newAttempt.allSelectedOptions;
  const [askResult,setAskResult] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getRightOptions();
  }, []); 

  const backToHome = (e)=>{
    e.preventDefault();
    navigate("/")
  }
  const getRightOptions = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/atmptQuizSystem/getCorrectOption/${courseId}/${quizId}`);
      setRightOptions(response.data.correctOptions);
      // console.log(rightOptions,"right optioons")
    } catch (error) {
      console.log("Error getting right options", error);
    }
  };

  const goToQuizzes = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const getMarks = async()=>{
    try {
      const newMarks = selectedOptions.reduce((totalMarks, selectedOption) => {
        const correctOption = rightOptions.find((correctOption) => correctOption._id === selectedOption.questionId);

        if (correctOption && correctOption.correctOption === selectedOption.selectedValue) {
           return totalMarks + 1;
        } else {
          return totalMarks;
        }
      }, 0);

      // Update the marks state
      setMarks(newMarks);
      setAskResult(true);
      console.log(newMarks)
    } catch (error) {
      console.log("error calculating marks")
    }
  }


  return (
    <div className="bg-white p-4 mb-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-2">{quizTitle}</h2>
      <div>
        <button className="bg-blue-500 w-fit text-white px-4 py-2 rounded hover:bg-blue-700" onClick={getMarks}>Show Result</button>
      </div>
      {
      askResult?(
      <>
      {/* <p className="text-xl font-bold mb-2" >Obtained Marks {marks}</p> */}
      <Cards title={"You scored"} description={marks}  />
      </>):(<>

      </>)}
      <button onClick={goToQuizzes}>
      <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Back To Home
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor"  d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </div>
      </button>
    </div>
  );
};

export default ResultCard;
