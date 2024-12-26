import { generateToken } from "../lib/utils.js"; // Corrected spelling
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import cloudinary from "../lib/cloudinary.js"; // Correct default import

export const signup = async (req, res) => {

 
  const { email, password, fullname } = req.body;
  
  try {
    console.log("dslksdlkjlkjsdf")
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
      generateToken(newUser._id, res);
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

    generateToken(user._id, res);
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
    return res.status(200).json({ msg: "Logout success" });
  } catch (error) {
    console.log("error from logout", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};


export const updateprofile = async (req, res) => {
  try {
    const {profilePic} = req.body;
    const userId = req.User._id
    if(!profilePic) return res.status(400).json({msg: "Please provide a profile picture"})

  const uploadResponse =    await cloudinary.uploader.upload(profilePic);
  const updateuser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true});
  res.status(200).json(updateuser);
  } catch (error) {
    console.log("error from updateprofile", error.message);
    res.status(500).json({ msg: "Internal server error" });

  }
} 

export const checkAuth =  (req, res) => {
  try {
    res.status(200).json(req.User);
  } catch (error) {
    console.log("error from checkAuth", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
}