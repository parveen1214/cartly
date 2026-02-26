import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty 🛒</h2>
        <Link
          to="/"
          className="bg-black text-white px-6 py-2 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-8">
      
      {/* LEFT SIDE - CART ITEMS */}
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold mb-4">
          Shopping Cart ({cartItems.length})
        </h2>

        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center border rounded-lg p-4 shadow-sm"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />

            {/* Info */}
            <div className="flex-1 ml-6">
              <h3 className="font-semibold text-lg">
                {item.name}
              </h3>

              <p className="text-gray-600">
                ${item.price}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center mt-3 gap-3">
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="px-3 py-1 border rounded"
                >
                  -
                </button>

                <span className="font-medium">
                  {item.qty}
                </span>

                <button
                  onClick={() => increaseQty(item._id)}
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE - SUMMARY */}
      <div className="border rounded-lg p-6 shadow-md h-fit">
        <h3 className="text-xl font-bold mb-4">
          Order Summary
        </h3>

        <div className="flex justify-between mb-2">
          <span>Items:</span>
          <span>{cartItems.length}</span>
        </div>

        <div className="flex justify-between mb-4">
          <span>Total:</span>
          <span className="font-bold text-lg">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        <button className="w-full bg-black text-white py-2 rounded mb-3">
          Proceed to Checkout
        </button>

        <Link
          to="/"
          className="block text-center text-sm text-blue-600 hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}