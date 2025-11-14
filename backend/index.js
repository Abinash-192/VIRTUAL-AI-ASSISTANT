import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routers/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routers/userRoutes.js";
import geminiResponse from "./gemini.js";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);
const PORT = process.env.PORT || 4999;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// app.get("/", async (req, res) => {
//   let prompt = req.query.prompt;
//   let data = await geminiResponse(prompt);
//   res.json(data);
// });

// app.get("/", (req, res) => {
//   res.send("Hello Wold!");
// });

app.listen(PORT, (req, res) => {
  connectDB();
  console.log(`Server running on ${PORT}`);
});
