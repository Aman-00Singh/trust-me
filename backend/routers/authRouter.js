import express from "express";
import {
  signupController,
  loginCntroller,
  logoutController,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginCntroller);
router.post("/logout", logoutController);

export default router;
