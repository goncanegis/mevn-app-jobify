import { StatusCodes } from "http-status-codes";
import JobModel from "../models/JobModel.js";
import UserModel from "../models/UserModel.js";
import cloudinary from "cloudinary";
import { formatImage } from "../middleware/multerMiddleware.js";

export const getCurrentUser = async (req, res) => {
  const user = await UserModel.findById(req.user.userId);
  const userWithNoPassword = user.toJSON();
  res
    .status(StatusCodes.OK)
    .json({ msg: "get current user", userWithNoPassword });
};
export const getApplicationStatus = async (req, res) => {
  const users = await UserModel.countDocuments();
  const jobs = await JobModel.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  delete newUser.role;

  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);

    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.userId,
    newUser
  );

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: "update user", user: updatedUser });
};
