import { ShoppingCart, Heart, User, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  // Temporary announcement (later fetch from backend)
  const [announcement] = useState({
    message: "🔥 Winter Sale – Up to 50% OFF | Shop Now",
    link: "/shop?discount=50",
    active: true,
  });

  const cartCount = 3; // Later connect to cart context

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">

      {/* Announcement Bar */}
      {announcement.active && (
        <div
          onClick={() => navigate(announcement.link)}
          className="bg-gradient-to-r from-orange-500 to-pink-600 text-white text-sm text-center py-2 cursor-pointer hover:brightness-110 transition duration-300"
        >
          {announcement.message}
        </div>
      )}

      {/* Main Header */}
      <div className="flex items-center justify-between px-6 md:px-16 py-4">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold tracking-wide cursor-pointer hover:scale-105 transition duration-300"
        >
          Cartly
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center w-1/2 relative">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full border border-gray-300 rounded-full py-2 px-5 focus:outline-none focus:ring-2 focus:ring-black transition"
          />
          <Search
            size={18}
            className="absolute right-4 text-gray-500 cursor-pointer"
          />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-6">

          {/* Account */}
          <div
            onClick={() => navigate("/login")}
            className="cursor-pointer hover:text-gray-600 transition"
          >
            <User size={22} />
          </div>

          {/* Wishlist */}
          <div
            onClick={() => navigate("/wishlist")}
            className="cursor-pointer hover:text-gray-600 transition"
          >
            <Heart size={22} />
          </div>

          {/* Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer hover:text-gray-600 transition"
          >
            <ShoppingCart size={22} />

            {/* Cart Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
