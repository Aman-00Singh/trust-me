import express from "express";
import {
  signupController,
  loginCntroller,
  logoutController,
  refreshAccessToken,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginCntroller);
router.post("/logout", logoutController);
router.get("/refresh", refreshAccessToken);

export default router;
