import { Router } from "express";
import { verifyRefreshKey } from "../middleware/tokenVerify";
import generateTokens from "../controller/auth/accesstoken";
import { loginUser } from "../controller/auth/login";

const authRoute = Router();

authRoute.get("/", verifyRefreshKey, generateTokens);
authRoute.post("/", loginUser);

export default authRoute;
