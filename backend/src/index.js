import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import CookieParser from "cookie-parser";
import cors from "cors";
import {app,server} from "./lib/socket.js";
dotenv.config();
app.use(express.json());
app.use(CookieParser());
app.use(cors({  origin: "http://localhost:5173" , credentials: true}));


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
connectDB()
.then(() => {
  const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
}).catch((error) => console.log('data base connection error',error.message));
