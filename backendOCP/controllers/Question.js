const Question = require("../models/question");

const createQ = async(req,res)=>{
    try {
        const {statement,quizId,options,correctOption} = req.body;
        const newQ = new Question({statement,quizId,options,correctOption});
        await newQ.save();
        res.status(201).json({newQ})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const getQ = async(req,res)=>{
    try {
        const response =await Question.find();
        res.status(200).json({response})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const getQbyId =async(req,res)=>{
    try {
        const id = req.params.id;
        const response = await Question.findOne({_id:id});
        if(!response)
        {
            return res.status(404).json({error:"This id doesnt have a question"});

        }
        res.status(200).json({response})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getQuestionByQuizId =async(req,res)=>{
    try {
        const quizId = req.params.quizId;
        const response = await Question.find({quizId:quizId});
        if(!response){
            return res.status(404).json({message:"No Quizzes in this Course"});
        }
        res.status(200).json({response});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const getQuestionByQuizIdnoOptions =async(req,res)=>{
    try {
        const quizId = req.params.quizId;
        const response = await Question.find({quizId:quizId},'-correctOption');
        if(!response){
            return res.status(404).json({message:"No Quizzes in this Course"});
        }
        res.status(200).json({response});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}



const updateOptions = async (req, res) => {
  try {
    const { questionId, updatedOptions } = req.body;

    // Find the question by ID and update its options
    const question = await Question.findByIdAndUpdate(
      questionId,
      { options: updatedOptions },
      { new: true } // Return the updated document
    );

    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




module.exports = {getQ,createQ,getQbyId,getQuestionByQuizId,getQuestionByQuizIdnoOptions,updateOptions}