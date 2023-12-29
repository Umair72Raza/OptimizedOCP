const AttemptedQuiz = require("../models/attemptedQuiz");
const Quiz = require('../models/Quiz');
const Questions = require('../models/question');
const { quizByCourseId } = require("./Quiz");

const postAttemptedQuiz=  async(req,res)=>{
    try {
        const {quizId,quizTitle,studentId,courseId,marks} = req.body;
        const newAttempt = await new AttemptedQuiz({quizId,quizTitle,studentId,courseId,marks});
        await newAttempt.save();
        res.status(201).json({newAttempt});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

const getAttemptedQuiz = async (req, res) => {
    try {
      const { studentId, courseId } = req.params;
  
      const response = await AttemptedQuiz.find({
        studentId: studentId,
        courseId: courseId,
      });
  
      if (!response || response.length === 0) {
        return res.status(404).json({ message: "No attempted quizzes yet" });
      }
  
      res.status(200).json({ response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const correctOptionsWithQuizId =async(req,res)=>{
   const { courseId, quizId } = req.params;
  try {
    const response = await Questions.find({ quizId: quizId });
    if (!response) {
      return res.status(404).json({ message: "No Questions found with the provided quizId" });
    }

    const correctOptions = response.map((question)=>({
      _id:question._id,
      correctOption:question.correctOption
    }))

    console.log("correctOptions", correctOptions);
    res.status(200).json({quizId,courseId, correctOptions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  
}


const getAttemptedQuizByCourseId =async(req,res)=>{
  try {
    const {courseId} = req.params;
    const response = await AttemptedQuiz.find({courseId:courseId});
    if(!response)
    {
      return res.status(200).json({message: "No Quizzes are attempted!"});
    }
    return res.status(200).json({response});


  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

const deleteAllAttemptedQuizzes = async (req, res) => {
  try {
    // Delete all attempted quizzes
    await AttemptedQuiz.deleteMany();

    return res.status(200).json({ success: true, message: 'All attempted quizzes deleted successfully.' });
  } catch (error) {
    console.error('Error deleting attempted quizzes:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {getAttemptedQuiz,postAttemptedQuiz,correctOptionsWithQuizId,deleteAllAttemptedQuizzes,getAttemptedQuizByCourseId};