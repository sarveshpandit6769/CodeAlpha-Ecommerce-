const rateLimit = require("express-rate-limit");

// Global API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strong limiter for login/register
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 login/register attempts
  message: {
    success: false,
    message: "Too many login/register attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Product routes limiter
const productLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 80,
  message: {
    success: false,
    message: "Too many product requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Order routes limiter
const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  message: {
    success: false,
    message: "Too many order requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  apiLimiter,
  authLimiter,
  productLimiter,
  orderLimiter,
};