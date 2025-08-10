import mongoose from "mongoose";


const RecentModel = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    Hotel:{
        hotelname:{type:String},
        image:{type:String,default:""},
        address:{type:String},
        description:{type:String},
        ratings:{type:String},
        pricepernight:{type:String},
        amenties:[{type:String}],
        BookingSources:[{Booking:String},{Agoda:String},{expedia:String}]
    },
    clickedAt:{type:Date,default:Date.now}
})
const Recents = mongoose.model("Recents",RecentModel)
export default Recents