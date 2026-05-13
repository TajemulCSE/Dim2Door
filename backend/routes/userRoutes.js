import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/nid";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

// REGISTER
router.post("users/register", upload.single("nid"), async (req, res) => {
  try {
    const { username, email, password, role, address, phone,
            businessName, shopAddress, serviceArea,
            vehicleType, vehicleNumber } = req.body;

    // Duplicate email check
    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email already exists" });

    // Build user object
    const newUser = new User({
      username,
      email,
      password,
      role,
      phone,
      nidPath: req.file?.path || undefined,
      address: role === "Customer" ? address : undefined,
      businessName: role === "Retailer" ? businessName : undefined,
      shopAddress:  role === "Retailer" ? shopAddress : undefined,
      serviceArea:  ["Retailer","Delivery Personnel"].includes(role) ? serviceArea : undefined,
      vehicleType:  role === "Delivery Personnel" ? vehicleType : undefined,
      vehicleNumber: role === "Delivery Personnel" ? vehicleNumber : undefined
    });

    const saved = await newUser.save();
    const userObj = saved.toObject();
    delete userObj.password;

    res.status(201).json({ message: "Registration successful", user: userObj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const match = await user.matchPassword(password);
    if (!match) return res.json({ success: false, message: "Invalid password" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      role: user.role,
      userId: user._id,
      username: user.username
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
