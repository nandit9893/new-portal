import express from "express";
import {
  loginController,
  loginWithGoogleMail,
  registerController,
} from "../controllers/authController.js";
import { requestPasswordReset, resetPassword, logoutUser, verifyToken } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
// import { googleAuth, googleAuthCallback } from "../controllers/authController.js";
import passport from "passport";

import rateLimit from "express-rate-limit";

//ip limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false, // Disable the X-RateLimit-* headers
});
//router object
const router = express.Router();
// REGISTER || POPST
router.post("/register", limiter, registerController);


// LOGIN || POST
router.post("/login", limiter, loginController);

// Request Password Reset (POST)
router.post('/request-password-reset', requestPasswordReset);

// Reset Password (POST)
router.post('/reset-password', resetPassword);

router.post('/logout', limiter, logoutUser); // Protect logout route

// ⬇️ Initiate Google OAuth Login
// router.get("/google", googleAuth);

// Google Authentication Route
// router.get('/google', passport.authenticate('google', {
//   scope: ['profile', 'email']
// }));

router.post('/sign/with/google', loginWithGoogleMail);

// Google Authentication Callback Route
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
      res.json({ success: true, message: 'Login successful', user: req.user });
  }
);



//export
export default router;