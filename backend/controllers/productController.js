const Product = require("../models/Product");
const mongoose = require("mongoose");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create product (admin only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image,
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product (admin only)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const { name, description, price, category, stock, image } = req.body;
    const updateData = {};

    if (name !== undefined) {
      if (typeof name !== "string") {
        return res.status(400).json({ message: "Invalid name" });
      }
      updateData.name = name;
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        return res.status(400).json({ message: "Invalid description" });
      }
      updateData.description = description;
    }

    if (price !== undefined) {
      if (typeof price !== "number" || Number.isNaN(price)) {
        return res.status(400).json({ message: "Invalid price" });
      }
      updateData.price = price;
    }

    if (category !== undefined) {
      if (typeof category !== "string") {
        return res.status(400).json({ message: "Invalid category" });
      }
      updateData.category = category;
    }

    if (stock !== undefined) {
      if (typeof stock !== "number" || Number.isNaN(stock)) {
        return res.status(400).json({ message: "Invalid stock" });
      }
      updateData.stock = stock;
    }

    if (image !== undefined) {
      if (typeof image !== "string") {
        return res.status(400).json({ message: "Invalid image" });
      }
      updateData.image = image;
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product (admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
