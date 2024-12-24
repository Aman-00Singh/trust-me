import express from "express";
import { reviewController } from "../controllers/reviewController";

const router = express.Router();

router.post("/:product_id", reviewController);

export default router;
