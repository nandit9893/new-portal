import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return next("Please provide all fields");
  }

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) return next("Invalid email or password");

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return next("Invalid email or password");

    // Generate JWT token
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      admin: {
        username: admin.username,
        email: admin.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const registerAdmin = async (req, res, next) => {
  const { username, email, password, position, salary, name, mobile_number } =
    req.body;

  // Validate input
  if (!username) return next("Username is required");
  if (!email) return next("Email is required");
  if (!password || password.length < 6)
    return next("Password is required and must be at least 6 characters");
  if (!name) return next("Name is required");
  if (!mobile_number) return next("Mobile number is required");

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return next("Email already registered. Please login");

    // Create new admin with the provided fields, including optional position and salary
    const newAdmin = new Admin({
      username,
      email,
      password,
      position: position || "Not Specified", // Default value if not provided
      salary: salary || 0, // Default value if not provided
      name,
      mobile_number,
    });

    await newAdmin.save();

    // Generate JWT token
    const token = jwt.sign({ adminId: newAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: {
        username: newAdmin.username,
        email: newAdmin.email,
        position: newAdmin.position,
        salary: newAdmin.salary,
        name: newAdmin.name,
        mobile_number: newAdmin.mobile_number,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Logout API
export const logoutAdmin = async (req, res) => {
  try {
    // ✅ Option 1: Send a success response (For stateless JWT authentication)
    res.status(200).json({
      success: true,
      message: "Admin logged out successfully!",
    });

    // ✅ Option 2: Clear the token from cookies (if using cookies)
    // res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "Strict" });

    // ✅ Option 3: If using token blacklisting, store the token in a blacklist (Optional)
    // await TokenBlacklist.create({ token: req.token });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};

// Get Admin List
export const getAdminList = async (req, res, next) => {
  try {
    // Fetch only the required fields: name, position, salary, and mobile_number
    const admins = await Admin.find({}, "name position salary mobile_number");

    res.status(200).json({
      success: true,
      admins,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in getAdminProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const adminSignInSignUp = async (req, res) => {
  const { name, email } = req.body;
  try {
    const existedUser = await Admin.findOne({ email });

    if (existedUser) {
      const token = jwt.sign(
        { adminId: existedUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      return res.status(200).json({
        success: true,
        message: "Login Successfully",
        user: existedUser,
        token,
      });
    }
    const generatedPassword = Math.random().toString(36).slice(-8);
    const genertedUserName =
      name.split(" ").join("").toLowerCase() +
      Math.random().toString(36).slice(-4);
    const newAdmin = await Admin.create({
      password: generatedPassword,
      name,
      email,
      username: genertedUserName,
    });
    const token = jwt.sign({ adminId: newAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(201).json({
      success: true,
      message: "Admin Created Successfully",
      user: newAdmin,
      token,
      password: generatedPassword,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while registering the Admin",
      error: error.message,
    });
  }
};
