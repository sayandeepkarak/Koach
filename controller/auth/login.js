import Joi from "joi";
import UserModel from "../../schema/userModel";
import CustomError from "../../service/CustomError";
import { compare } from "bcrypt";
import Jwt from "../../service/Jwt";

export async function loginUser(req, res, next) {
  const reqBody = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = reqBody.validate(req.body);
  if (error) {
    return next(CustomError.invalidData(error.message));
  }
  const { email, password } = req.body;
  try {
    const userData = await UserModel.findOne({ "email.emailValue": email });
    if (!userData) {
      return next(CustomError.unauthorized("Wrong credentials"));
    }
    const correctPassword = await compare(password, userData.password);
    if (!correctPassword) {
      return next(CustomError.unauthorized("Wrong credentials"));
    }
    if (!userData.adminApproval) {
      return res.status(202).json({
        message:
          "Your account registration has been received. It will be approved by an admin before you can log in.",
      });
    }
    const refresh_token = Jwt.encrypt({ userId: userData._id }, "15d");
    userData.refreshtoken = refresh_token;
    await userData.save();
    res
      .status(200)
      .json({ message: "Login successfully", refreshtoken: refresh_token });
  } catch (error) {
    next(error);
  }
}
