/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import Banner from '../Banner/Banner';

export const HomePage = () => {
  const user = localStorage.getItem('currentUser');
  const navigate = useNavigate();
  
  return user ? (
    <>
      <div>
        <DefaultLayout>
          <Banner />
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

export default HomePage;
