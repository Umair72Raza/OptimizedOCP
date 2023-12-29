/* eslint-disable no-unused-vars */
import React from 'react';
import Teach from './Teach.jpg';
import Study from './Study.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Banner = (props) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const isAdmin = currentUser && currentUser.role === 'Admin';
  
  const navigate = useNavigate();

  const getCourses = (e) => {
    e.preventDefault();
    if (currentUser) {
      navigate('/viewCourse');
    }
  };

  const createCourses = async (e) => {
    e.preventDefault();
    if (currentUser) {
      navigate('/Teacher');
    }
  };
  const SRC = isAdmin ? Teach : Study;

  //console.log(SRC);

  return (
<div className="container-fluid" style={{ height: '100vh' }}>
  <div
    className="position-relative d-flex align-items-center justify-content-center"
    style={{
      backgroundImage: `url(${SRC})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
    }}
  >
    <div
      className="position-absolute col-lg-5 col-md-8 col-sm-10 col-12 start-50 text-center w-fit translate-middle-x"
      style={{ marginTop: '' }}
    >
      <div style={{backgroundColor:'whitesmoke'}} className="text-white rounded mb-2">
        <h1  className="text-4xl text-primary  font-bold">Welcome to Online Learning Platform</h1>
        <p  className="text-lg btnNavbarClr">Empowering Minds, Transforming Lives</p>
      </div>

        <button style={{border:'none'}} onClick={createCourses} className="btnNavbarClr rounded p-3 btn-lg">
          Create Courses
        </button>
 
    </div>
  </div>
</div>

  );
};

export default Banner;
