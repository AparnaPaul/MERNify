import express from "express";
import { loginValidation, signupValidation } from "../middlewares/authValidation.js";
import { isValidAdmin } from "../middlewares/isValidAdmin.js";
import { createAdmin, loginAdmin, logoutAdmin, myProfile } from "../controllers/adminController.js";

const router = express.Router();

router.post('/admin/login', loginValidation, loginAdmin)
router.post('/admin/signup', signupValidation, createAdmin)
router.get('/admin/me', isValidAdmin, myProfile)
router.get('/admin/logout', logoutAdmin)



export default router;
