const User = require("../models/User");
const Product = require("../models/Product");

// ====== WISHLIST ======
const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const productId = req.params.productId;

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    res.status(200).json({ message: "Added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const productId = req.params.productId;

    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();

    res.status(200).json({ message: "Removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ====== CART ======
const addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const productId = req.params.productId;
    const { quantity } = req.body;

    const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);
    if (cartItemIndex > -1) {
      // Update quantity if already in cart
      user.cart[cartItemIndex].quantity += quantity || 1;
    } else {
      user.cart.push({ product: productId, quantity: quantity || 1 });
    }

    await user.save();
    res.status(200).json({ message: "Added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const productId = req.params.productId;
    const { quantity } = req.body;

    const cartItem = user.cart.find(item => item.product.toString() === productId);
    if (!cartItem) return res.status(404).json({ message: "Product not in cart" });

    cartItem.quantity = quantity;
    await user.save();

    res.status(200).json({ message: "Cart updated", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const productId = req.params.productId;

    user.cart = user.cart.filter(item => item.product.toString() !== productId);
    await user.save();

    res.status(200).json({ message: "Removed from cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  getCart,
};
