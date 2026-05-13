// backend/routes/productRoutes.js
import express from "express";
import Product from "../models/Product.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: GET all products
router.get("/", async (req, res) => {
  const { category, subcategory, search } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (subcategory) filter.subcategory = subcategory;
  if (search) filter.name = { $regex: search, $options: "i" };

  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    console.error("GET /api/products error:", err);
    res.status(500).json({ error: "Server error fetching products" });
  }
});

// Public: GET single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("GET /api/products/:id error:", err);
    res.status(500).json({ error: "Server error fetching product" });
  }
});

// Protected: Create product — Admin & Retailer only
router.post(
  "/",
  protect,
  authorize("Admin", "Retailer"),
  async (req, res) => {
    try {
      const product = new Product(req.body);
      const saved = await product.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error("POST /api/products error:", err);
      res.status(400).json({ error: err.message });
    }
  }
);

// Protected: Update product — Admin & Retailer only
router.put(
  "/:id",
  protect,
  authorize("Admin", "Retailer"),
  async (req, res) => {
    try {
      const updated = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updated)
        return res.status(404).json({ error: "Product not found" });
      res.json(updated);
    } catch (err) {
      console.error("PUT /api/products/:id error:", err);
      res.status(400).json({ error: err.message });
    }
  }
);

// Protected: Delete product — Admin & Retailer only
router.delete(
  "/:id",
  protect,
  authorize("Admin", "Retailer"),
  async (req, res) => {
    try {
      const deleted = await Product.findByIdAndDelete(req.params.id);
      if (!deleted)
        return res.status(404).json({ error: "Product not found" });
      res.json({ message: "Product deleted successfully" });
    } catch (err) {
      console.error("DELETE /api/products/:id error:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
