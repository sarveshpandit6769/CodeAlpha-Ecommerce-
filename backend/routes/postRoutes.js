const express = require("express");
const router = express.Router();

// Placeholder post routes
router.get("/", (req, res) => {
  res.status(200).json({ message: "Posts route placeholder" });
});

module.exports = router;
