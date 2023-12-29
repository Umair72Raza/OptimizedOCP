const Quiz = require("../models/Quiz");

const creatQuiz = async(req,res)=>{
    try {
        const {title,courseId} = req.body;
        const newQuiz = new Quiz({
            title,
            courseId
        });
        await newQuiz.save();
        res.status(201).json({newQuiz});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

const getQuizzes =async(req,res)=>{
    try {
        const Quizzes = await Quiz.find();
        if(!Quizzes)
        {
            res.status(404).json({message:"No quizzes found yet"});
            return;
        }
        res.status(200).json({Quizzes});
    } catch (error) {
       res.status(500).json({erroe:error.message}) 
    }
}

const quizByCourseId = async(req,res)=>{
    try {
        const courseId = req.params.courseId;
        const response = await Quiz.find({courseId:courseId});
        if(!response){
            return res.status(404).json({message:"No Quizzes in this Course"});
        }
        res.status(200).json({response});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}




module.exports = {getQuizzes,creatQuiz,quizByCourseId};