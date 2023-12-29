/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  const goBack = (e) =>{
    e.preventDefault();
    navigate(-1);
}
  return (
    <button 
      className="btn btn-danger mt-2 mb-4 text-white px-4 py-2 rounded  hover:bg-green-700 mx-auto flex items-center"
      onClick={goBack}
    >

      Back
    </button>
  );
};

export default BackButton;
