import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    verificationCode:{type:Number,default:null},
    favourites:[{type:mongoose.Schema.Types.ObjectId,ref:"Favourites",default:[]}],
    recents:[{type:mongoose.Schema.Types.ObjectId,ref:"Recents",default:[]}],
},{Timestamp:true})

const User = mongoose.model("User",UserModel)
export default User
