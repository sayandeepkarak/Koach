import { Router } from "express";
import registerUser from "../controller/user/register";
import fileUpload from "express-fileupload";
import profileUpload from "../controller/user/profileUpload";
import { verifyAccessKey } from "../middleware/tokenVerify";
import sendOtpToEmail from "../controller/user/otp/sendOtp";
import verifyEmailOtp from "../controller/user/otp/verifyOtp";

const userRoute = Router();

userRoute.post("/", registerUser);
userRoute.patch("/", fileUpload(), verifyAccessKey, profileUpload);

userRoute.get("/otp", verifyAccessKey, sendOtpToEmail);
userRoute.post("/otp", verifyAccessKey, verifyEmailOtp);

export default userRoute;
