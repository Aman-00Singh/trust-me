import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import mainRouter from "./routers/mainRouter.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", mainRouter);

app.post("api/signup", (req, res) => {
  const { websiteUrl, companyName, email, password } = req.body;
});

// Server Port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
