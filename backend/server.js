// backend/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectDB } from "./config/db.js";

// Import routes
import userRoutes    from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes   from "./routes/orderRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
ConnectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users",    userRoutes);    // User auth & registration
app.use("/api/products", productRoutes); // Product CRUD
app.use("/api/orders",   orderRoutes);   // Order routes (place & fetch orders)
app.use("/api/wishlist", wishlistRoutes);// Wishlist routes

// Health check
app.get("/", (req, res) => {
  res.send("✅ Dim2Door backend is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
