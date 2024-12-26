import { genarateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { email, password, fullname } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      fullname,
      password: hashPassword,
    });

    if (newUser) {
      genarateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ msg: " Invalid user data" });
    }
  } catch (error) {
    console.log("error from signup", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    genarateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,

      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error from login", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    // return res.sendStatus(200).json({ msg: "Logout success" });
  } catch (error) {
    console.log("error from logout", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};
