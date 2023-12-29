const mongoose = require("mongoose");
const {isEmail,isIn} = require("validator");

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        trim: true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        // validate:{
        //     validator: isEmail,
        //     message: "Invalid Email Address"
        // }
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    role:{
        type:String,
    },
    marks:{
        type:Number
    }
});
module.exports = mongoose.model("UserSchema",userSchema)