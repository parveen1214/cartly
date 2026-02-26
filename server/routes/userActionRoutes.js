const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  getCart,
} = require("../controllers/userActionController");

// Wishlist routes
router.post("/wishlist/:productId", protect, addToWishlist);
router.delete("/wishlist/:productId", protect, removeFromWishlist);
router.get("/wishlist", protect, getWishlist);

// Cart routes
router.post("/cart/:productId", protect, addToCart);
router.put("/cart/:productId", protect, updateCartQuantity);
router.delete("/cart/:productId", protect, removeFromCart);
router.get("/cart", protect, getCart);

module.exports = router;
