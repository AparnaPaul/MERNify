import express from "express";
import { isValidUser } from "../middlewares/isValidUser.js";
import { createReview, getReviewsByProduct, updateReview, deleteReview} from "../controllers/reviewController.js"

const router = express.Router();

router.post('/review/add', isValidUser, createReview)
router.get('/review/:productId', isValidUser, getReviewsByProduct)
router.put('/review/:id', isValidUser, updateReview)
router.delete('/review/:id', isValidUser, deleteReview)


export default router;