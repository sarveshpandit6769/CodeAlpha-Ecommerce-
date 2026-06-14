const express = require("express");
const router = express.Router();

const { authLimiter } = require("../middleware/rateLimitMiddleware");

const authController = require("../controllers/authController");

router.post(
  "/register",
  authLimiter,
  authController.registerUser || authController.register
);

router.post(
  "/login",
  authLimiter,
  authController.loginUser || authController.login
);

module.exports = router;