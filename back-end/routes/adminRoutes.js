import express from 'express';
import { loginAdmin, registerAdmin, logoutAdmin,getAdminList, adminSignInSignUp, getAdminProfile} from '../controllers/adminController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin Authentication Routes
router.post('/login', loginAdmin);
router.post('/register', registerAdmin);
// router.post("/register", upload.single("profilePic"), registerAdmin);
router.post('/logout', protect, logoutAdmin);
router.get('/getAdminList', getAdminList);
router.post('/login/singup', adminSignInSignUp);
router.get("/profile", protect, getAdminProfile);

export default router;
