const mongoose = require("mongoose");

const attemptedQuiz = mongoose.Schema({
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quiz",
        required: true
    },
    quizTitle:{
        type:String,
        required:true
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
    },
    marks:{
        type:Number
    }
})
module.exports = mongoose.model("AttemptedQuiz",attemptedQuiz);