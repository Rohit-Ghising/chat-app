import { catchAsyncError } from "../middleware/catchAsyncError.middleware";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt"
import { generateJWTToken } from "../utils/jwtToken";

export const signup = catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
  const {fullName,email,password}= req.body
  if(!fullName||!email||!password){
    return res.status(400).json({success:false,message:"please provide all required field"})

  }
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if(!emailRegex.test(email)){
   return res.status(400).json({success:false,message:"Invalid email format"})
 }

if (password.length<6){
  return res.status(400).json({success:false,message:"Password nust have 6 characters"})
  
}

const isEmailAlreadyUsed = await User.findOne({email})
 if (isEmailAlreadyUsed){
   return res.status(400).json({success:false,message:"email already registered"})
  
 }
const hashedPassword  = await bcrypt.hash(password,10)
const user = await User.create({
  fullName,email,password:hashedPassword,
  avatar:{
    public_id:"",
    url:""
  }
})
generateJWTToken(user,"User registered  succesfully",201,res)

})




 export const getUser  = catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{})
