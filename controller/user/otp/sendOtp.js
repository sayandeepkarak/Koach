import { generateOtp } from "../../../service/Otp";
import bcrypt from "bcrypt";
import Jwt from "../../../service/Jwt";
import { SECRET_ACCESS_KEY } from "../../../config";
import OtpModel from "../../../schema/otpModel";
import { sendMail } from "../../../service/Mailer";
import UserModel from "../../../schema/userModel";
import CustomError from "../../../service/CustomError";

async function sendOtpToEmail(req, res, next) {
  const { userId } = req;
  try {
    const data = await UserModel.findById(userId);
    if (data.email.isVerified) {
      return next(
        CustomError.conflictData("This email id is already verified with us")
      );
    }
  } catch (error) {
    return next(error);
  }
  const otp = generateOtp(6);
  bcrypt.hash(otp, 10, async function (err, hash) {
    if (err) {
      return next(err.message);
    }
    try {
      const hashToken = Jwt.encrypt({ otp: hash }, "1d", SECRET_ACCESS_KEY);
      await OtpModel.deleteMany({ userId });
      const otpData = new OtpModel({ userId, otp: hashToken });
      await otpData.save();
      const message = `Your koach verification otp is - ${otp}\nDon't share this otp to anyone\nThis otp will expires in 3 minutes`;
      const data = await UserModel.findById(userId);
      await sendMail(data.email.emailValue, "Koach verification", message);
      res.status(200).json({
        data: {
          message: "Otp sent successfully",
        },
      });
    } catch (error) {
      next(error.message);
    }
  });
}

export default sendOtpToEmail;
