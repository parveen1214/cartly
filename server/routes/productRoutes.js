const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const { createProduct, getProducts, getProductById,updateProduct, 
  deleteProduct  } = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public route to get all products
router.get("/", getProducts);

// Admin-only route to create a product
router.post("/", protect, adminOnly, upload.array("media", 5), createProduct);
router.put("/:id", protect, adminOnly, updateProduct); // UPDATE
router.delete("/:id", protect, adminOnly, deleteProduct); // DELETE

// Public route to get single product by ID
router.get("/:id", getProductById);

module.exports = router;
