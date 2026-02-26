const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

// ✅ Admin-only route
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});

module.exports = router;
