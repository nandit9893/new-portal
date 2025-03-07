import express from 'express';
import { createOrder, verifyPayment, getPaymentDetailsByOrderId } from '../controllers/paymentController.js'; // Named imports
import { authMiddleware, userAuth, protectAdmin, protectUser, authenticateUser } from '../middlewares/authMiddleware.js'; // Importing auth middleware

const router = express.Router();

// 🔹 Create a Razorpay order (Protected Route)
router.post('/create-order', authMiddleware, createOrder); // Ensure createOrder is a function

// 🔹 Verify Razorpay payment (Public Route)
router.post('/verify-payment', verifyPayment); // Ensure verifyPayment is a function

// 🔹 Get Payment Details by Order ID (Protected Route)
router.get('/payment-details/:orderId', authMiddleware, getPaymentDetailsByOrderId); // Ensure getPaymentDetailsByOrderId is a function

export default router;


