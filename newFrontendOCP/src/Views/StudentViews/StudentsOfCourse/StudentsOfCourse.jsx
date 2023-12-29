/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Cards from '../../../components/Card/Cards';
import StudentDefaultLayout from '../../../components/Layouts/StudentDefaultLayout';

const StudentsOfCourse = () => {
    const location = useLocation();
    const [courseId, setCourseId] = useState();
    const [buttonClicked,setButtonClicked] =useState(false);
    const [studentIds,setStudentIds] = useState([]);

    useEffect(()=>{
        setCourseId(location.state.courseId);
    },[location.state.courseId])

    


    const getStudentsOfCourse = async() =>{
        try {
            const response = await axios.get(`http://localhost:4000/courseSystem/getCoursebyId/${courseId}`);
            console.log('response', response.data.response[0].studentId);
            setStudentIds(response.data.response[0].studentId)
            console.log(studentIds)
            if(!response)
            {
                console.log("no response")
            }
        } catch (error) {
            console.log("error getting students ofcourse.", error)
        }
    }

    const getStudents =async(e)=>{
        e.preventDefault();
        setButtonClicked(!buttonClicked);
        await getStudentsOfCourse();
        
    }

  return (
    <div>
        <StudentDefaultLayout>
            <div className='position-relative d-flex flex-column align-items-center overflow-y-auto'>
        <div>
            <button className='greenButton m-4 text-white px-4 py-2 rounded hover:bg-yellow-500 mx-auto flex items-center'
             onClick={getStudents} >
                Get students
                </button>
        </div>
        <div style={{height:'50vh',paddingBottom:''}} className='d-flex d-sm-flex'>
            {buttonClicked?
                (studentIds.map((studentId)=> <Cards key={studentId} title={studentId} action={"Get Student Details"} getStd={true} />))
            :<></>}
        </div>
        </div>
        </StudentDefaultLayout>
    </div>
    
  )
}

export default StudentsOfCourse