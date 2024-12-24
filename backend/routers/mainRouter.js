import express from "express";
import authRouter from "./authRouter.js";
import ratingRouter from "./ratingRouter.js";
import reviewRouter from "./reviewRouter.js";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/rating", ratingRouter);
router.use("/review", reviewRouter);

export default router;
