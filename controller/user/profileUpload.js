import Joi from "joi";
import CustomError from "../../service/CustomError";
import path from "path";
import UserModel from "../../schema/userModel";
import { createWriteStream } from "fs";

async function profileUpload(req, res, next) {
  try {
    const data = await UserModel.findById(req.userId);
    if (!data) {
      return next(CustomError.notFoundError("No user exist"));
    }
    if (!req.files || !req.files.profile) {
      return next(CustomError.invalidData("No image provided"));
    }
    const { data: buffer, mimetype } = req.files.profile;
    const ext = mimetype.split("/")[1];
    const imgName = data._id + "." + ext;
    const uploadPath = path.join("./upload/", imgName);
    const imageCreator = createWriteStream(uploadPath);
    let isResSent = false;

    imageCreator.write(buffer, (err) => {
      !err && imageCreator.close();
    });
    imageCreator.on("error", (err) => {
      if (!isResSent) {
        next();
        isResSent = !isResSent;
      }
    });
    imageCreator.on("close", async () => {
      if (!isResSent) {
        await UserModel.findByIdAndUpdate(data._id, {
          $set: { imageUrl: imgName },
        });
        res.status(200).json({
          data: {
            message: "Profile picture uploaded successfully",
          },
        });
        isResSent = !isResSent;
      }
    });
  } catch (error) {
    next(error);
  }
}

export default profileUpload;
