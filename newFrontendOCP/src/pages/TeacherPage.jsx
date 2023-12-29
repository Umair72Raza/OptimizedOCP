/* eslint-disable no-unused-vars */
import Modal from 'react-modal';
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import Cards from '../components/Card/Cards';
import CourseCard from '../components/Card/CourseCard';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import Loading from '../components/Loading/Loading';

const TeacherPage = (props) => {
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const isAdmin = currentUser && currentUser.role === "Admin";
const teacherId = currentUser._id;
// const {amAdmin} = props;
// console.log("amAdmin",amAdmin);
const navigate = useNavigate();
const [coursesList,setCoursesList] = useState();
const [gotResponse,setGotResponse] = useState(false);
const [isModalOpen, setModalOpen] = useState(false);
const handleCourseClick =(e)=>{
    e.preventDefault();
    navigate('/createCourse');

}
useEffect(()=>{
  
try {
    axios.get(`http://localhost:4000/courseSystem/getCoursesofTeacher/${teacherId}`).then((response)=>{
    //console.log(response.data);    
    setCoursesList(response.data.response);
    setGotResponse(true);
    })
} catch (error) {
    console.log("error while getting courses",error)
}
},[]) 



useEffect(() => {
  Modal.setAppElement('#root'); 
}, []);
Modal.setAppElement('#root');

  return (
    <>
<DefaultLayout>
  
  {isAdmin ? (
    <>
    <div className="container text-center mt-4 ">
      <h1 className="display-4 mb-4">Welcome to the Teacher Dashboard</h1>
      <div className='d-flex flex-md-row  mb-4 justify-content-center '>
        <div onClick={handleCourseClick} className=" ">
          <Cards title={"Create a course"} description={"A new course can be created here"} action={"Create"} />
        </div>
      </div>


    <h1 className="display-4 mb-4 text-m">Your courses are:</h1>
    <div className='d-flex flex-wrap gap-8 m-4 justify-content-center'>
      {gotResponse ? (
        coursesList.map((course) => (
          <CourseCard key={course._id} title={course.Name} id={course._id} delCourse={true} />
        ))
      ) : (
        <div className='mt-4'><Loading /></div>
      )}
    </div>
  </div>
    </>
  ) : (
    <>
      <Loading />
    </>
  )}
  </DefaultLayout>
      </>
  )
}


export default TeacherPage