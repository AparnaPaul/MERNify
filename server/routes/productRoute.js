import express from "express";
import { createProduct, getAllProducts, getSingleProduct, updateProduct, updateProductImage } from "../controllers/productController.js";
import uploadFiles from "../middlewares/multer.js";
import { isValidUser } from "../middlewares/isValidUser.js";

const router = express.Router();

router.post("/product/new", isValidUser, uploadFiles, createProduct)
router.get("/product/all", getAllProducts);
router.get("/product/:id", getSingleProduct)
router.put("/product/:id", isValidUser, updateProduct)
router.post("/product/:id", isValidUser, uploadFiles, updateProductImage)

export default router;