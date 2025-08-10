import User from "../Models/UserModel.js";
import { Response } from "../utils/ResponseHandler.js";
import { SendVerificationCode, SendWelcomeEmail } from "./Email.js";
import jwt from "jsonwebtoken"




export const RegisterUsingEmail = async(req,res)=>{
    try {
        const {email,username} = req.body;
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        // 
        let user = await User.findOne({email})
        if(!user){
           user = await User.create({
            email,username,verificationCode
           })
        }else{
            user.verificationCode = verificationCode
            await user.save()
        }
        const SendOtp = await SendVerificationCode(email,verificationCode)
        return Response(res,200,'Otp send to your email',{user,SendOtp})
    } catch (error) {
        console.error("failed to send otp",error)
        return Response(res,400,'internal server error')
    }
}

export const VerifyEmail = async(req,res)=>{
    try {
        const {Code} = req.body;

        let user = await User.findOne({
            verificationCode:Code
        })
        if(!user){
            return Response(res,400,'invalid or expired otp')
        }
        user.verificationCode = null,
        await user.save()
        // send jwt
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
        res.cookie("token",token,{httpOnly:true,secure:true,sameSite:"none"})

        await SendWelcomeEmail(user.email,user.username)
        return Response(res,200,"login successful",{user,token})
        
    } catch (error) {
         console.error("failed to send otp",error)
        return Response(res,400,'internal server error')
    }
}

export const Logout = async(req,res)=>{
  try {
    res.clearCookie("token",{httpOnly:true,secure:true,sameSite:"none"});
    return Response(res, 200, "Logout successfull");
  } catch (error) {
    console.error(error);
    return Response(res, 500, "Internal server error");
  }
}




