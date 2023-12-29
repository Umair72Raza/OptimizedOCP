/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuizCard from '../QuizCard/QuizCard';

const Quiz = () => {
  const location = useLocation();
  const Cid = location.state?.id;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isAdmin = currentUser && currentUser.role === "Admin";

  const navigate = useNavigate();
  let newQId;
  const [quiz, setQuiz] = useState({
    title: '',
    courseId: Cid,
    questions: [],
  });
  const [quizzes,setQuizzes] = useState([]);
  useEffect(() => {
    getAllQuizzes();
  }, []);

  const goToDashboard = (e) =>{
    e.preventDefault();
    navigate(-1)
  }

  const getAllQuizzes = async () => {
    try {
      const response = await fetch(`http://localhost:4000/quizSystem/getQuizesbyCourseId/${Cid}`);
      const result = await response.json();
      //console.log('result from get quizzes api', result);
      setQuizzes(result.response); 
    } catch (error) {
      console.log('Could not get all quizzes of the course');
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/quizSystem/addQuiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quiz),
      });

      const result = await response.json();
      //console.log('result from create quiz api', result.newQuiz._id);
      newQId = result.newQuiz._id;
      //console.log('new q id', newQId);
    } catch (error) {
      console.log('error from course getter', error);
    }
  
    newQId ? navigate('/question', { state: { Quizid: newQId } }) : console.log('no newQId');
  };

  
  return (
    <div className='d-flex flex-column '>
      <div className="container-fluid  d-flex flex-column align-items-center justify-content-center "style={{ marginTop: '200px' }}>
        {isAdmin ? (
          <div className="max-w-md  bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Create Empty Quiz</h2>
  
            <div className="mb-3">
              <label className="form-label text-gray-700">Quiz Title</label>
              <input
                className="form-control"
                type="text"
                value={quiz.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              />
            </div>
  
            <div>
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Create Empty Quiz
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl inline-flex font-bold mb-4">Quizzes List</h1>
            {quizzes?.map((quiz) => (
              //console.log("in map", quiz),
              <QuizCard key={quiz._id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
  
      <div className="text-center" style={{marginTop:'50px'}}>
        <button className="btn backButtonRed text-white px-3" onClick={goToDashboard}>
          Back
        </button>
      </div>
    </div>
  );
  
};

export default Quiz;
