import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isValidUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token)
      return res.status(403).json({
        message: "Sorry you does not have an account as user, Please Sign up",
      });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData._id);

    next();
  } catch (error) {
    res.status(500).json({
      message: "Please Signup",
    });
  }
};