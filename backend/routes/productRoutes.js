const express = require("express");
const router = express.Router();

const { productLimiter } = require("../middleware/rateLimitMiddleware");
const productController = require("../controllers/productController");

const getHandler = (...names) => {
  for (const name of names) {
    if (typeof productController[name] === "function") {
      return productController[name];
    }
  }

  return (req, res) => {
    res.status(500).json({
      success: false,
      message: `Product controller function missing. Checked: ${names.join(", ")}`,
      availableFunctions: Object.keys(productController),
    });
  };
};

const getProducts = getHandler(
  "getProducts",
  "getAllProducts",
  "getAllProduct",
  "getProductList"
);

const getProductById = getHandler(
  "getProductById",
  "getSingleProduct",
  "getProduct"
);

const createProduct = getHandler(
  "createProduct",
  "addProduct"
);

const updateProduct = getHandler(
  "updateProduct",
  "editProduct"
);

const deleteProduct = getHandler(
  "deleteProduct",
  "removeProduct"
);

router.get("/", productLimiter, getProducts);
router.get("/:id", productLimiter, getProductById);
router.post("/", productLimiter, createProduct);
router.put("/:id", productLimiter, updateProduct);
router.delete("/:id", productLimiter, deleteProduct);

module.exports = router;