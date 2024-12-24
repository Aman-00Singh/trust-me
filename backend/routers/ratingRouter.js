import express from "express";
import { ratingController } from "../controllers/ratingController";

const router = express.Router();

router.get("/", ratingController);

export default router;
