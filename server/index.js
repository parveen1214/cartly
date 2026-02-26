require("dotenv").config();   // ✅ FIRST LINE

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userActionRoutes = require("./routes/userActionRoutes");

connectDB();

const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/user", userActionRoutes);
app.use("/api/cart", require("./routes/cartRoutes"));

app.get("/", (req, res) => {
  res.send("Multi Vendor E-commerce API Running");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});