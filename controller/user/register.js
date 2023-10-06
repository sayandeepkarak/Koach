import Joi from "joi";
import CustomError from "../../service/CustomError";
import Jwt from "../../service/Jwt";
import UserModel from "../../schema/userModel";
import { sendMail } from "../../service/Mailer";

async function registerUser(req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string()
      .regex(/^[6-9]([0-9]){9}$/)
      .required(),
    userType: Joi.string().valid("teacher", "student").required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string()
        .regex(/^[1-9]([0-9]){5}$/)
        .required(),
    }).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return next(CustomError.invalidData(error.message));
  }

  const {
    firstName,
    lastName,
    email: emailValue,
    mobile,
    password,
    address,
    userType,
  } = req.body;
  const { street, city, state, zip } = address;

  try {
    const findData = await UserModel.find({
      $or: [{ "email.emailValue": emailValue }, { mobile }],
    });
    if (findData.length) {
      return next(CustomError.conflictData("User already exist"));
    }

    const user = new UserModel({
      fullName: firstName + " " + lastName,
      email: { emailValue },
      mobile,
      password,
      userType,
      address: { street, city, state, zip },
    });
    const userData = await user.save();
    const ref_token = Jwt.encrypt({ userId: userData._id }, "15d");
    userData.refreshtoken = ref_token;
    await userData.save();
    const message = `Congratulations, ${firstName} ${lastName}\nYou are successfully registered as a ${userType} in Koach Training Center.\nThank you for joining us.`;
    await sendMail(emailValue, "Registration Successfull", message);
    res.status(200).json({
      data: {
        refreshtoken: ref_token,
        message: "Registration successfull",
      },
    });
  } catch (error) {
    next(error);
  }
}

export default registerUser;
