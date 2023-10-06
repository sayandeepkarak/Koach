import { Router } from "express";
import { verifyRefreshKey } from "../middleware/tokenVerify";
import generateTokens from "../controller/auth/accesstoken";

const authRoute = Router();

authRoute.get("/", verifyRefreshKey, generateTokens);

export default authRoute;
