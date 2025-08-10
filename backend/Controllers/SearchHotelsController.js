import { GoogleGenerativeAI } from "@google/generative-ai";
import { Response } from "../utils/ResponseHandler.js";
import { jsonrepair } from "jsonrepair";
import User from "../Models/UserModel.js";
import Recents from "../Models/RecentsModel.js";
import Favorites from "../Models/Favorites.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const SearchHotels = async (req, res) => {
  try {
    //  -  Image URL (must be a direct Unsplash link from images.unsplash.com; DO NOT modify the URL or add ".jpg" manually)
    const { destination, checkin, checkout, guests, rooms } = req.body;
    console.log("req.body",req.body)
    // ai compare hotels found throw many websites
    const prompt = `Suggest low to high or best deals hotels minimum 10 and maximum 20 in ${destination} for Check-in:${checkin}, Check-out:${checkout} for ${guests} guests and ${rooms} room For each hotel, include:
 - Name
Give me a real image URL of  hotel that can be used publicly.
 - Address
 - Description (2 lines)
 - Rating out of 5 and total reviews
 - Price per night (inr or usd)
 - amenties
 -  Booking deals from **Agoda, Booking.com, and Expedia** — include site name, price, and a working link.
 Give me only valid JSON array of hotel objects with No explanation, no markdown. 
 `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);

    if (!result || !result.response) {
      return Response(res, 400, "failed to get response from gemini");
    }
    const rawtext = result.response.text();
    console.log("Raw Gemini response:\n", rawtext);
    // remove markdown if exists
    const cleanText = rawtext.replace(/```(?:json)?/g,'').trim();
    let hotelsdata;
    try {
      const repaired = jsonrepair(cleanText);
      hotelsdata = JSON.parse(repaired)
    } catch (error) {
      console.error("json parse error:", error);
      return Response(res, 400, "ai response was not a valid json");
    }
    return Response(res, 200, "hotels found successfully", hotelsdata);
  } catch (error) {
    console.log("failed to search hotels", error);
    return Response(res, 400, "internal server error");
  }
};

export const AddFavorite= async(req,res)=>{
    try {
        const userId = req.user
        const {hotelname,address,image,description,ratings,pricepernight,amenties,BookingSources} = req.body

        const user = await User.findById(userId)
        if(!user){
            return Response(res,200,'please login to add favourite')
        }
         
        const exixts = await Favorites.findOne({userId,'Hotel.hotelname':hotelname});
        if(exixts){
          return Response(res,400,'Hotel already in favourites')
        }
        const addfavorite = await Favorites.create({
        userId:userId,
        Hotel:{
        hotelname:hotelname,
        image:image,
        address:address,
        description:description,
        ratings:ratings,
        pricepernight:pricepernight,
        amenties:amenties,
        BookingSources:BookingSources
            },
        })
        return Response(res,200,'Added to favourites',addfavorite)        
    } catch (error) {
      console.log("failed to add to favourite",error)
      return Response(res,400,'internal server error')
    }
}
export const EachUserFavorites = async(req,res)=>{
  try {
     const userId = req.user 
      const user = await User.findById(userId)
        if(!user){
            return Response(res,200,'please login to view favourites')
        }
    const favorites = await Favorites.find({userId}).sort({clickedAt:-1}) // latest first
    if(!favorites || !favorites.length === 0){
      return Response(res,400,'No favorites found',[])
    }
    return Response(res,200,'favorites found',favorites)
    
  } catch (error) {
     console.log("failed to fetch favorites",error)
    return Response(res,400,'internal server error') 
    
  }
}
export const AddtoRecent = async(req,res)=>{
  try {
    const userId = req.user
      const {hotelname,address,image,description,ratings,pricepernight,amenties,BookingSources} = req.body

        const user = await User.findById(userId)
        if(!user){
            return Response(res,200,'Unauthorized user')
        }
        const alreadyexixts = await Recents.findOne({userId,'Hotel.hotelname':hotelname});
        if(alreadyexixts){
          alreadyexixts.clickedAt = new Date();
          await alreadyexixts.save();
          return Response(res,200,'Recent Updated',alreadyexixts)
        }

        const newRecent = await Recents.create({
          userId:userId,
        Hotel:{
        hotelname:hotelname,
        image:image,
        address:address,
        description:description,
        ratings:ratings,
        pricepernight:pricepernight,
        amenties:amenties,
        BookingSources:BookingSources
            },
        })
        return Response(res,200,'Added to recents',newRecent)
  } catch (error) {
      console.log("failed to add to recent",error)
      return Response(res,400,'internal server error')
  }
}

export const getEachuserrecent = async(req,res)=>{
  try {
    const userId = req.user 
      const user = await User.findById(userId)
        if(!user){
            return Response(res,200,'please login to view recents')
        }
    const recents = await Recents.find({userId}).sort({clickedAt:-1}) // latest first
    if(!recents || !recents.length === 0){
      return Response(res,400,'No Recent activity found',[])
    }
    return Response(res,200,'recents found',recents)
  
  } catch (error) {
    console.log("failed to add to recent",error)
    return Response(res,400,'internal server error') 
  }
}