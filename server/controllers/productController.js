const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// ==========================
// CREATE PRODUCT
// ==========================
const createProduct = async (req, res) => {
  
  try {
    const { name, description, price, stock, category, brand } = req.body;

    let images = [];
    let videos = [];

    // Helper function to upload buffer to Cloudinary
    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    // Upload files if exist
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);

        if (result.resource_type === "image") {
          images.push(result.secure_url);
        } else if (result.resource_type === "video") {
          videos.push(result.secure_url);
        }
      }
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      brand,
      images,
      videos,
      createdBy: req.user.id
    });
console.log("REQ USER:", req.user);
    res.status(201).json({
      success: true,
      product,
    });

  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// GET ALL PRODUCTS
// ==========================
const getProducts = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, sort, category } = req.query;

    let query = {};

    // 🔎 Search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // 📂 Category filter
    if (category) {
      query.category = category;
    }

    // 🔀 Sorting
    let sortOption = {};
    if (sort === "price-asc") sortOption = { price: 1 };
    else if (sort === "price-desc") sortOption = { price: -1 };
    else if (sort === "name") sortOption = { name: 1 };
    else if (sort === "newest") sortOption = { createdAt: -1 };
    else if (sort === "oldest") sortOption = { createdAt: 1 };

    const products = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("createdBy", "name email");

    const total = await Product.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// GET SINGLE PRODUCT
// ==========================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// UPDATE PRODUCT
// ==========================
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      brand,
      images,
      videos,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (category !== undefined) product.category = category;
    if (brand !== undefined) product.brand = brand;
    if (images !== undefined) product.images = images;
    if (videos !== undefined) product.videos = videos;

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

// ==========================
// DELETE PRODUCT
// ==========================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};