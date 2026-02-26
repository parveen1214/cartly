const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    images: [
  {
    type: String,
  },
],

category: {
  type: String,
  required: true,
},

brand: {
  type: String,
},

rating: {
  type: Number,
  default: 0,
},

numReviews: {
  type: Number,
  default: 0,
},
videos: [
  {
    type: String,
  },
],
reviews: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    rating: Number,
    comment: String,
  },
],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links product to admin user
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
