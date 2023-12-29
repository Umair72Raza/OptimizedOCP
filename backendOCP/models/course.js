const mongoose = require("mongoose");

const course = mongoose.Schema({
    Name:{
        type: String,
        required:true
    },
    studentId:[{type:mongoose.Schema.ObjectId,
    ref:"User"}
    ],
    teacherId:[{type:mongoose.Schema.ObjectId,
        ref:"User"}],
})

module.exports = mongoose.model("Course",course);