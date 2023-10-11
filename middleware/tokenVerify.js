import { SECRET_ACCESS_KEY, SECRET_KEY } from "../config";
import UserModel from "../schema/userModel";
import CustomError from "../service/CustomError";
import Jwt from "../service/Jwt";

async function tokenVerify(req, res, next, isAccessKey = false) {
  const auth = req.headers.authorization;
  if (!auth) {
    return next(CustomError.invalidToken());
  }
  const token = auth.split(" ")[1];
  try {
    const { userId } = Jwt.verify(
      token,
      isAccessKey ? SECRET_ACCESS_KEY : SECRET_KEY
    );
    const query = { _id: userId };
    if (!isAccessKey) query.refreshtoken = token;
    const data = await UserModel.findOne(query);
    if (!userId || !data) {
      return next(CustomError.invalidToken());
    }
    req.userId = userId;
    next();
  } catch (error) {
    next(CustomError.invalidToken());
  }
}

async function verifyRefreshKey(req, res, next) {
  await tokenVerify(req, res, next);
}
async function verifyAccessKey(req, res, next) {
  await tokenVerify(req, res, next, true);
}

export { verifyRefreshKey, verifyAccessKey };
