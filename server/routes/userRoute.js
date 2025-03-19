import express from "express";
import { loginUser, logoutUser, myProfile, signupUser } from "../controllers/userController.js";
import { loginValidation, signupValidation } from "../middlewares/authValidation.js";
import { isValidUser } from "../middlewares/isValidUser.js";

const router = express.Router();

router.post('/user/login', loginValidation, loginUser)
router.post('/user/signup', signupValidation, signupUser)
router.get('/user/me', isValidUser, myProfile)
router.post('/user/logout', logoutUser)



export default router;
