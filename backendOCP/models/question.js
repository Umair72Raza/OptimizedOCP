const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    statement: {
        type: String,
        required: true
    },
    quizId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    options: {
        type: [String],
        required: true
    },
    correctOption: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Question", questionSchema);
