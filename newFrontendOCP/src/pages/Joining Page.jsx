/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import AuthPage from './AuthPage';

const JoiningPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');

    if (token) {
      // If the token exists, clear it to log the user out
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    }
  }, []);

  const [role, setRole] = useState(null);

  const handleTeacherClick = (e) => {
    e.preventDefault();
    setRole('Teacher');
    //console.log('You clicked "You are a teacher?"');
  };

  const handleStudentClick = (e) => {
    e.preventDefault();
    setRole('Student');
    //console.log('You clicked "You are a student?"');
  };

  return (
    <>
      {role ? (
        <AuthPage role={role} setRole={setRole} />
      ) : (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
          <h1 className="text-4xl font-bold mb-6">Choose your role:</h1>

          <div className="d-flex gap-3">
            <button
              className="btn btn-primary"
              onClick={handleTeacherClick}
            >
              <FontAwesomeIcon icon={faChalkboardTeacher} className="text-xl me-2" />
              You are a teacher?
            </button>

            <button
              className="btn btn-success"
              onClick={handleStudentClick}
            >
              <FontAwesomeIcon icon={faUserGraduate} className="text-xl me-2" />
              You are a student?
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default JoiningPage;
