import mongoose from "mongoose";

const FavoritesModel = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
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
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
const Favorites = mongoose.model("Favourites",FavoritesModel)
export default Favorites