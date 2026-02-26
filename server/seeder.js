const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const products = [
  { name: "Laptop", description: "Gaming Laptop", price: 85000, stock: 5 },
  { name: "Headphones", description: "Noise-cancelling", price: 5000, stock: 15 },
  { name: "Smart Watch", description: "Fitness Tracker", price: 8000, stock: 20 },
  { name: "Camera", description: "DSLR Camera", price: 45000, stock: 7 },
];

const importData = async () => {
  try {
    await Product.deleteMany(); // optional: clear existing products
    await Product.insertMany(products);
    console.log("Products imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
