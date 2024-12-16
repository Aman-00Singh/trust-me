import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Server Port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
