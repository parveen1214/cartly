import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const { cart } = useCart();

  const totalItems =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-center gap-10 py-3 text-sm font-medium relative">

        {/* Home */}
        <div
          className="cursor-pointer hover:text-black text-gray-600 transition"
          onClick={() => navigate("/")}
        >
          Home
        </div>

        {/* Shop with Dropdown */}
        <div
          className="relative cursor-pointer text-gray-600 hover:text-black transition flex items-center gap-1"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          Shop <ChevronDown size={16} />

          {showDropdown && (
            <div className="absolute top-8 left-0 bg-white shadow-lg border border-gray-200 rounded-md py-2 w-40 z-50">
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/shop")}
              >
                All Products
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/shop?category=men")}
              >
                Men
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/shop?category=women")}
              >
                Women
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/shop?category=electronics")}
              >
                Electronics
              </div>
            </div>
          )}
        </div>

        {/* Direct Links */}
        <div
          className="cursor-pointer hover:text-black text-gray-600 transition"
          onClick={() => navigate("/shop?category=men")}
        >
          Men
        </div>

        <div
          className="cursor-pointer hover:text-black text-gray-600 transition"
          onClick={() => navigate("/shop?category=women")}
        >
          Women
        </div>

        <div
          className="cursor-pointer hover:text-black text-gray-600 transition"
          onClick={() => navigate("/shop?category=electronics")}
        >
          Electronics
        </div>

        <div
          className="cursor-pointer hover:text-red-500 text-gray-600 transition"
          onClick={() => navigate("/sale")}
        >
          Sale
        </div>

        {/* Upload Button */}
        <button
          onClick={() => navigate("/upload")}
          className="bg-black text-white px-3 py-1 rounded"
        >
          Upload
        </button>

        {/* Cart */}
        <Link to="/cart" className="relative text-gray-600 hover:text-black">
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
}