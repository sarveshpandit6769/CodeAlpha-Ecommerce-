const express = require("express");
const {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Protected routes (user must be logged in)
router.post("/", authMiddleware, createOrder);
router.get("/user/orders", authMiddleware, getUserOrders);
router.get("/:id", authMiddleware, getOrder);
router.put("/:id/cancel", authMiddleware, cancelOrder);

// Admin only routes
router.put("/:id/status", authMiddleware, updateOrderStatus);

module.exports = router;
