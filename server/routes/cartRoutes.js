const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addToCart,
  getCart,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);

module.exports = router;