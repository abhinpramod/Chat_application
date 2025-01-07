import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JwT_SECRET);
    if (!decoded) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    req.User = user;
    next();
  } catch (error) {
    console.log("error from protectRoute", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};
