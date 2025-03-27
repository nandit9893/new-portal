import jwt from "jsonwebtoken";
// Ensure the path to admin.js is correct
import Admin from "../models/Admin"; // Update this path if necessary

export const protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await Admin.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: "Not authorized, token failed" });
      return; // Add return statement here
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: "Not authorized, no token" });
    return; // Add return statement here
  }
};
