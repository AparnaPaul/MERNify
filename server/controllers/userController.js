import { User } from "../models/userModel.js";
import tryCatch from "../utils/tryCatch.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginUser = tryCatch(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    const errorMsg = "Auth failed email or password is wrong"
    if (!user) {
        return res.status(403).json({
            message: errorMsg,
            success: false
        })
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
        return res.status(403).json({
            message: errorMsg,
            success: false
        })
    }

    const jwtToken = jwt.sign({ email: user.email, _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    )

    res.status(200).json({
        message: "Login success",
        success: true,
        jwtToken,
        email,
        name: user.username
    })
})

export const signupUser = tryCatch(async (req, res) => {
    const { username, email, password, mobile } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        return res.status(409).json({
            message: "User already exist, you can login"
        })
    }
    const userModel = new User({ username, email, password, mobile });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
        message: "Signup success",
        success: true
    })
})

export const myProfile = tryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);

    res.json(user);
});

export const logoutUser = tryCatch(async (req, res) => {
    res.status(200).json({
        message: "Logged out successfully",
        success: true
    })
})