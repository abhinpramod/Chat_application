import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import CookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(CookieParser());

app.use("/api/auth", authRoutes);
connectDB()
.then(() => {
  const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
}).catch((error) => console.log('data base connection error',error.message));
