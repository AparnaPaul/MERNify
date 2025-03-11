import express from "express";
import {addToCart, fetchCart, removeFromCart, updateCart} from "../controllers/cartController.js";
import { isValidUser } from "../middlewares/isValidUser.js";

const router = express.Router();

router.post("/cart/add", isValidUser, addToCart);
router.get("/cart/remove/:id", isValidUser, removeFromCart);
router.post("/cart/update", isValidUser, updateCart);
router.get("/cart/all", isValidUser, fetchCart);

export default router;