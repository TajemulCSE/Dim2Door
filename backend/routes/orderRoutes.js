import express from "express";
import Order   from "../models/Order.js";

const router = express.Router();

// POST /api/orders — create a new order
router.post("/", async (req, res) => {
  try {
    const { userId, items, shippingAddress, paymentMethod, subtotal } = req.body;

    // Basic presence check
    if (
      !userId ||
      !Array.isArray(items) || items.length === 0 ||
      !shippingAddress?.fullName ||
      subtotal == null
    ) {
      return res.status(400).json({ message: "Missing required order data" });
    }

    // Map items.product → String(...) so even numeric IDs are stored as string
    const orderItems = items.map((i) => ({
      product:  String(i.product),
      quantity: Number(i.quantity),
      price:    Number(i.price),
    }));

    const order = new Order({
      user:            userId,
      items:           orderItems,
      shippingAddress,
      paymentMethod,
      subtotal:        Number(subtotal),
    });

    const saved = await order.save();
    return res
      .status(201)
      .json({ message: "Order placed", order: saved });
  } catch (err) {
    console.error("Order POST error:", err);
    return res
      .status(500)
      .json({ message: "Server error placing order" });
  }
});

export default router;
