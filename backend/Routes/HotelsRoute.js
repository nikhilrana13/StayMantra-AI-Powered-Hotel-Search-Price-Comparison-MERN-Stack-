import express from "express"
import { SearchHotels } from "../Controllers/SearchHotelsController.js"
const router = express.Router()


router.post('/search-hotel',SearchHotels)

export default router