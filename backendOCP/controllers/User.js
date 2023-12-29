const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/user");
const dotenv = require("dotenv");

dotenv.config();

const JWT = process.env.JWT_SECRET;

const signUpUser =async(req,res)=>{
    try {
        //console.log("req body blah blah",req.body)
        const {username,email,password,role} = req.body
        const hashedPass = await bcrypt.hash(password,10);
        const newUser = new UserSchema({
            username,
            email,
            password: hashedPass,
            role
        })
        await newUser.save();
        res.status(201).json({user: newUser})

    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message})     
    }

}

const LoginUser = async(req,res)=>{
    try {
        console.log("req body of login",req.body)
        const {email,password,role} = req.body;
        const user = await UserSchema.findOne({email:email});
        console.log("userData",user,user.password);
        if(user && (await bcrypt.compare(password,user.password)))
        {
            const token = jwt.sign({_id:user._id,role:user.role},JWT,{expiresIn:"1hr"});
            if(user.role===role)
            {
                console.log(user.role)
            }
            else{
                console.log(user.role,"You are trying to login from a wrong nterface try the other interface");
                return res.status(404).json({error:"You are trying to login from a wrong nterface try the other interface"})
            }
            res.status(200).json({
                message:"Login Successfull",
                accessToken: token,
                userData: user
            })
        }
        else{
            res.status(400).json({message:"Could not find this email. Sign up first!"});

        }


    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

const getUserById = async(req,res)=>{
    try {
        const {id} = req.params;
        const response = await UserSchema.find({_id:id },'-password');
        if(!response)
        {
            return res.status(404).json({message: "No user found with this Id"});

        }
        return res.status(200).json({response})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports = {signUpUser,LoginUser,getUserById};