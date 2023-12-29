const mongoose = require("mongoose");

const quizzesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required:true
    },
    description:{
        type:String,
    },

});

module.exports = mongoose.model("Quiz", quizzesSchema);
