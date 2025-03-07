import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv'; // Load environment variables

// Initialize environment variables
dotenv.config();

// Initialize Razorpay instance with your credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Your Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Your Razorpay Key Secret
});

// 🔹 Create a Razorpay Order
export const createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Validation for missing fields
    if (!amount || !currency) {
      return res.status(400).json({ success: false, message: 'Amount and currency are required' });
    }

    // Create the order options
    const options = {
      amount: amount * 100, // Convert to smallest currency unit (paise)
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // Auto-capture
    };

    // Create the Razorpay order
    const order = await razorpay.orders.create(options);

    // Send response with order details
    return res.status(201).json({ success: true, order });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// 🔹 Verify Razorpay Payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Validation for missing fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Missing required parameters' });
    }

    // Generate HMAC with the order and payment ID
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');

    // Check if the signature matches
    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    // Respond with success message
    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      payment_id: razorpay_payment_id,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// 🔹 Get Payment Details by Order ID
export const getPaymentDetailsByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Validation for missing orderId
    if (!orderId) {
      return res.status(400).json({ success: false, message: 'Order ID is required' });
    }

    // Fetch the order details from Razorpay
    const order = await razorpay.orders.fetch(orderId);

    // Respond with the order details
    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Error fetching payment details:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



