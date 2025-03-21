import { Admin } from "../models/adminModel.js";
import tryCatch from "../utils/tryCatch.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const createAdmin = tryCatch(async (req, res) => {
    const { username, email, password, mobile } = req.body;


    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        return res.status(409).json({
            message: "Admin already exists",
            success: false
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const admin = new Admin({
        username,
        email,
        password: hashedPassword,
        mobile
    });


    await admin.save();


    const jwtToken = jwt.sign(
        { email: admin.email, _id: admin._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );

    // Store token in cookie
    res.cookie('token', jwtToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Remove password from the response
    const adminResponse = { ...admin._doc };
    delete adminResponse.password;

    res.status(201).json({
        message: "Admin created successfully",
        success: true,
        admin: adminResponse
    });
});


export const loginAdmin = tryCatch(async (req, res) => {
    const { email, password } = req.body;


    const admin = await Admin.findOne({ email });
    const errorMsg = "Authentication failed: Email or password is incorrect.";
    if (!admin) {
        return res.status(403).json({
            message: errorMsg,
            success: false
        });
    }


    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
        return res.status(403).json({
            message: errorMsg,
            success: false
        });
    }


    const jwtToken = jwt.sign(
        { email: admin.email, _id: admin._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );

    // Store token in cookie
    res.cookie('token', jwtToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Remove password from the response
    const adminResponse = { ...admin._doc };
    delete adminResponse.password;

    res.status(200).json({
        message: "Login successful",
        success: true,
        admin: adminResponse
    });
});

export const myProfile = tryCatch(async (req, res) => {
    const admin = await Admin.findById(req.admin._id);

    // Remove password from the response
    const adminResponse = { ...admin._doc };
    delete adminResponse.password;

    res.json(adminResponse);
});

export const logoutAdmin = tryCatch(async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: "Admin logged out successfully",
        success: true
    });
});

export const updateAdminProfile = tryCatch(async (req, res) => {
    const { username, mobile } = req.body;
    const admin = await Admin.findByIdAndUpdate(req.admin._id, { username, mobile }, { new: true });

    // Remove password from the response
    const adminResponse = { ...admin._doc };
    delete adminResponse.password;

    res.status(200).json({
        message: "Admin profile updated successfully",
        success: true,
        admin: adminResponse
    });
});


export const deactivateAdminAccount = tryCatch(async (req, res) => {
    await Admin.findByIdAndDelete(req.admin._id);
    res.clearCookie('token');
    res.status(200).json({
        message: "Admin account deactivated successfully",
        success: true
    });
});