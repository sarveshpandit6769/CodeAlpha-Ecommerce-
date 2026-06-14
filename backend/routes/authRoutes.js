const express = require("express");
<<<<<<< HEAD
const router = express.Router();

const { authLimiter } = require("../middleware/rateLimitMiddleware");

const authController = require("../controllers/authController");
=======
const rateLimit = require("express-rate-limit");
const { register, login } = require("../controllers/authController");
const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});

// Register route
router.post("/register", authLimiter, register);

// Login route
router.post("/login", authLimiter, login);
>>>>>>> cc8074325ef8f61f30255657f3fd65c12da21abf

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