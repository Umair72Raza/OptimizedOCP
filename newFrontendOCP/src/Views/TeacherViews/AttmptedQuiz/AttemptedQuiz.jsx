/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'

const AttemptedQuiz = () => {
  return (

    <div className="bg-white p-4 mb-4  shadow">
      <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
      <p>Quiz ID: {quiz._id}</p>
      <p>Course ID: {quiz.courseId}</p>
      </div>
   
  )
}

export default AttemptedQuiz