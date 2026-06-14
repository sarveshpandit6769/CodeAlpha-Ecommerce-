const express = require("express");
const router = express.Router();

const { orderLimiter } = require("../middleware/rateLimitMiddleware");
const orderController = require("../controllers/orderController");

const getHandler = (...names) => {
  for (const name of names) {
    if (typeof orderController[name] === "function") {
      return orderController[name];
    }
  }

  return (req, res) => {
    res.status(500).json({
      success: false,
      message: `Order controller function missing. Checked: ${names.join(", ")}`,
      availableFunctions: Object.keys(orderController),
    });
  };
};

const createOrder = getHandler(
  "createOrder",
  "addOrder",
  "placeOrder"
);

const getMyOrders = getHandler(
  "getMyOrders",
  "getUserOrders",
  "myOrders"
);

const getOrderById = getHandler(
  "getOrderById",
  "getSingleOrder",
  "getOrder"
);

const getAllOrders = getHandler(
  "getAllOrders",
  "getOrders",
  "getAllOrder"
);

const updateOrderStatus = getHandler(
  "updateOrderStatus",
  "updateOrder",
  "changeOrderStatus"
);

const deleteOrder = getHandler(
  "deleteOrder",
  "removeOrder"
);

router.post("/", orderLimiter, createOrder);
router.get("/my-orders", orderLimiter, getMyOrders);
router.get("/", orderLimiter, getAllOrders);
router.get("/:id", orderLimiter, getOrderById);
router.put("/:id/status", orderLimiter, updateOrderStatus);
router.delete("/:id", orderLimiter, deleteOrder);

module.exports = router;