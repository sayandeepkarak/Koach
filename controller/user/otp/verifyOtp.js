import Joi from "joi";
import CustomError from "../../../service/CustomError";
import OtpModel from "../../../schema/otpModel";
import Jwt from "../../../service/Jwt";
import { SECRET_ACCESS_KEY } from "../../../config";
import bcrypt from "bcrypt";
import UserModel from "../../../schema/userModel";
import { sendMail } from "../../../service/Mailer";

async function verifyEmailOtp(req, res, next) {
  const bodySchema = Joi.object({
    otp: Joi.string()
      .pattern(/^([1-9]){6}$/)
      .required(),
  });
  const { error } = bodySchema.validate(req.body);
  if (error) {
    return next(CustomError.invalidData());
  }
  try {
    const data = await OtpModel.findOne({ userId: req.userId });
    if (!data) {
      return next(CustomError.unauthorized("Unauthorized otp"));
    }
    const tokenData = Jwt.verify(data.otp, SECRET_ACCESS_KEY);
    if (!tokenData) {
      return next(CustomError.forbidden("Otp has expired"));
    }
    const isCorrectOtp = await bcrypt.compare(req.body.otp, tokenData.otp);
    if (!isCorrectOtp) {
      return next(CustomError.invalidData("Invalid otp"));
    }
    const { email, fullName } = await UserModel.findByIdAndUpdate(
      req.userId,
      {
        $set: { "email.isVerified": true },
      },
      { new: true }
    );
    await OtpModel.findByIdAndDelete(data._id);
    const message = `Dear ${fullName},\nYour email verification in Koach was successfull.`;
    await sendMail(email.emailValue, "Verification Successful", message);
    res.status(202).json({ data: { message: "Otp validation successfull" } });
  } catch (error) {
    next(error);
  }
}

export default verifyEmailOtp;
