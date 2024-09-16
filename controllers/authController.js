import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserModel.js";

import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customError.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const isFirstAccount = (await UserModel.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await UserModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User created" });
};

export const login = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  // check if password matches
  const isValidPassword = await comparePassword(
    req.body.password,
    user.password
  );
  if (!isValidPassword) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = createJWT({ userId: user._id, role: user.role });

  // Set token to user in db
  user.token = token;

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "User logged in", token });
};

export const logout = async (req, res) => {
  // get token from req if available
  const token = req.headers.authorization.split(" ")[1];
  // find user by token
  const user = await UserModel.findOne({ token });

  if (user) {
    user.token = "";
    await user.save();
  }
  // const user = await UserModel.findById(req.user.userId);

  // if (!user) return;

  // user.token = "";

  // await user.save();

  res.status(StatusCodes.OK).json({ msg: "User logged out" });
};
