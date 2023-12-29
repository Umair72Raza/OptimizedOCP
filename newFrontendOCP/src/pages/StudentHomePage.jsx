/* eslint-disable no-unused-vars */
import React from 'react';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { useNavigate } from 'react-router';
import StudentBanner from '../components/Banner/StudentBanner';

export const StudentHomePage = () => {
  const user = localStorage.getItem('currentUser');
  const navigate = useNavigate();
  
  return user ? (
    <>
      <div>
        <DefaultLayout>
          <StudentBanner />
        </DefaultLayout>
      </div>
    </>
  ) : (
    <>
      <button className="btn btn-dark" onClick={() => navigate('/Login')}>
        Go back to login
      </button>
    </>
  );
};

export default StudentHomePage;
