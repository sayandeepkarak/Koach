import { SECRET_ACCESS_KEY } from "../../config";
import UserModel from "../../schema/userModel";
import Jwt from "../../service/Jwt";

async function generateTokens(req, res, next) {
  try {
    const { userId } = req;
    const newrefresh = Jwt.encrypt({ userId }, "15d");
    const newaccess = Jwt.encrypt({ userId }, "1m", SECRET_ACCESS_KEY);
    await UserModel.findByIdAndUpdate(userId, {
      $set: { refreshtoken: newrefresh },
    });
    res
      .status(200)
      .json({ data: { accesstoken: newaccess, refreshtoken: newrefresh } });
  } catch (error) {
    next(error);
  }
}

export default generateTokens;
