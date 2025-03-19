import express from "express";
import { createProduct, getAllProducts, getSingleProduct, updateProduct, updateProductImage } from "../controllers/productController.js";
import uploadFiles from "../middlewares/multer.js";
import { isValidUser } from "../middlewares/isValidUser.js";
import { isValidAdmin } from "../middlewares/isValidAdmin.js";

const router = express.Router();

router.post("/product/new", isValidAdmin , uploadFiles, createProduct)
router.get("/product/all", getAllProducts);
router.get("/product/:id", getSingleProduct)
router.put("/product/:id", isValidAdmin, updateProduct)
router.post("/product/:id", isValidAdmin, uploadFiles, updateProductImage)

export default router;