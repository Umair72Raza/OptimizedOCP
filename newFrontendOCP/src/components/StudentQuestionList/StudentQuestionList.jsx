/* eslint-disable no-unused-vars */
import  { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useLocation, useNavigate } from 'react-router-dom'
import QuestionCard from '../Card/QuestionCard';
import axios from 'axios';
import Question from '../Question/Question';

const QuestionList = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isAdmin = currentUser && currentUser.role === "Admin";
  const location = useLocation();
  const navigate = useNavigate()
  const quizID = location.state.quizId;
  const QuizTitle = location.state.quizTitle;
  const courseId = location.state.courseID;
  const [rightOptions, setRightOptions] = useState([]);
  const [questions,setQuestions] =useState([]);
  const [loaded,setloaded] =useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [marks,setMarks] = useState(0);
  const [allSelectedOptions ,setAllSelectedOption] = useState([])


  Modal.setAppElement('#root');

  const selectedOptions = allSelectedOptions;

    
  useEffect(() => {
    getQuestions();
      getRightOptions();
    const handleBeforeUnload = (event) => {
      // Prevent the default behavior of the browser's back button
      event.preventDefault();

      // Replace the current history entry to prevent going back to quiz questions
      window.history.replaceState(null, null, window.location.pathname);

      // Navigate to the page where all quizzes are enlisted
      navigate('/QuizList', { state: { courseId: courseId, studentId: currentUser._id } });
    };

    // Attach the beforeunload event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [courseId, currentUser._id, navigate]);



    const getRightOptions = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/atmptQuizSystem/getCorrectOption/${courseId}/${quizID}`);
        setRightOptions(()=>response.data.correctOptions);
      } catch (error) {
        console.log("Error getting right options", error);
      }
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      navigate('/QuizList',{state:{courseId:courseId,studentId:currentUser._id}})
    };


    const getQuestions =async()=>{
      try {
        const response = await fetch(`http://localhost:4000/questionsSystem/getQbyQuizIdNoOptions/${quizID}`);
        const result = await response.json();
       // console.log('result from get questions api', result);
        setQuestions(result.response); // Update state with result.response
        
        setloaded(true);

      } catch (error) {
        console.log('Could not get all quizzes of the course');
      }
    }


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
        setMarks(newMarks);
        return newMarks;
      } catch (error) {
        console.log("error calculating marks")
      }
    }


  const submitQuiz = async(e) =>{
    e.preventDefault();
    await getRightOptions();
    const marks = await getMarks();
    try {
  const response = await axios.post("http://localhost:4000/atmptQuizSystem/postQuizResult/",{
    quizId: quizID,
    quizTitle:QuizTitle,
    courseId: courseId,
    studentId: currentUser._id,
    marks:marks
  })
  const result = response.data;
  console.log("response from submitting quiz",result);
  window.history.replaceState(null, null, '/viewCourse');
  navigate('/HomePage',{state:{courseId:courseId,studentId:currentUser._id}});
  setIsModalOpen(true);

  } catch (error) {
    console.log("error posting marks while submitting")
  }
    }
    
  return (

<>
    <div>
      <div className="text-center">
      <h2 className="text-4xl font-bold mb-4">Questions for {QuizTitle}</h2>
    </div>
    {loaded ? (
      <div className="flex flex-col justify-center items-center text-black px-4 py-6  rounded mt-4">
  {questions?.map((question) => (
    <QuestionCard key={question._id} question={question} marks={marks} setMarks={setMarks} allSelectedOptions={allSelectedOptions} setAllSelectedOption={setAllSelectedOption} />
  ))}
  <div className="d-flex justify-center items-center mt-4">
    <button className="mb-4 btn btn-primary px-4 py-2 rounded" onClick={submitQuiz}>
      <span className="mr-2">Submit</span>
      
    </button>
  </div>
  
  <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Quiz Submission Feedback"
  className="modal"
  overlayClassName="modal-overlay"

  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 1000,
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      borderRadius: '8px',
      padding: '20px',
      width: '100%',
      minHeight: '100vh',
    },
  }}
>
  <div className="text-center h-screen translate-x-1/4 translate-y-2/4">
    <h2 className="text-3xl font-bold text-green-500 mb-4">
      <i className="fas fa-check-circle" ></i> Quiz Submitted!
    </h2>
    <p className="text-gray-600 mb-4">Thank you for completing the quiz.</p>

  </div>
</Modal>


  </div>


    
    ) 
    
    : (
      <>
        <div>Loading</div>
      </>
    )}
    <button
    className="backButtonRed text-white px-4 py-2 rounded hover:bg-green-700"
     onClick={()=>navigate(-1)} >Back</button>
  </div>
    </>

 
);
};

export default QuestionList
