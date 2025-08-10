import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import AuthRoute from "./Routes/AuthRoute.js"
import HotelsRoute from "./Routes/HotelsRoute.js"


dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

// middleware
app.use(express.json())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))




// routes 
app.use('/api/auth',AuthRoute)
app.use('/api/hotels',HotelsRoute)



// connect to db
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to db")
}).catch((error)=>{
    console.log("failed to connect to db",error)
})

// app.get("/",(req,res)=>{
//     res.send("Hello World")
// })

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})