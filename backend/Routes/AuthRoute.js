import express from "express"
import { Logout, RegisterUsingEmail, VerifyEmail } from "../Controllers/AuthController.js";
const router = express.Router();


router.post('/send-otp',RegisterUsingEmail)
router.post('/verify-otp',VerifyEmail)
router.get('/log-out',Logout)

export default router