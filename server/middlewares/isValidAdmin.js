import jwt from "jsonwebtoken";
import { Admin } from "../models/adminModel.js";

export const isValidAdmin = async (req, res, next) => {
  try {
    
    const { token } = req.headers;

   
    if (!token) {
      return res.status(403).json({
        message: "Access token is missing. Please login.",
      });
    }

   
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

   
    const admin = await Admin.findById(decodedData._id);

    
    if (!admin) {
      return res.status(401).json({
        message: "Not an admin. Access denied.",
      });
    }

   
    req.user = admin;

   
    next();
  } catch (error) {
 
    res.status(500).json({
      message: "Invalid or expired token. Please login again.",
    });
  }
};