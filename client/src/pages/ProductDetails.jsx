import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loadingCart, setLoadingCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data.product);

        if (data.product.images?.length > 0) {
          setSelectedMedia({ type: "image", url: data.product.images[0] });
        } else if (data.product.videos?.length > 0) {
          setSelectedMedia({ type: "video", url: data.product.videos[0] });
        }
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  const handleAddToCart = async () => {
    try {
      setLoadingCart(true);

      // ✅ Send only product ID to backend
      await addToCart(product._id);

      alert("Product added to cart ✅");
    } catch (error) {
      console.log(error);
      alert("Please login to add to cart");
    } finally {
      setLoadingCart(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* LEFT - Media Section */}
      <div>
        <div className="border rounded p-4 mb-4">
          {selectedMedia?.type === "image" && (
            <img
              src={selectedMedia.url}
              alt={product.name}
              className="w-full h-96 object-contain"
            />
          )}

          {selectedMedia?.type === "video" && (
            <video
              src={selectedMedia.url}
              controls
              className="w-full h-96 object-contain"
            />
          )}
        </div>

        <div className="flex gap-3 flex-wrap">
          {product.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumb"
              className="w-20 h-20 object-cover border cursor-pointer"
              onClick={() =>
                setSelectedMedia({ type: "image", url: img })
              }
            />
          ))}

          {product.videos?.map((vid, index) => (
            <div
              key={index}
              className="w-20 h-20 border flex items-center justify-center cursor-pointer bg-gray-200 text-sm"
              onClick={() =>
                setSelectedMedia({ type: "video", url: vid })
              }
            >
              ▶ Video
            </div>
          ))}
        </div>
      </div>

      {/* MIDDLE - Product Info */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

        <p className="text-gray-500 mb-2">
          Brand: {product.brand || "N/A"}
        </p>

        <p className="text-gray-500 mb-4">
          Category: {product.category}
        </p>

        <p className="text-lg mb-4">{product.description}</p>

        <p className="text-3xl font-semibold mb-4">
          ${product.price}
        </p>

        <p className="mb-4">
          {product.stock > 0 ? (
            <span className="text-green-600 font-medium">
              In Stock
            </span>
          ) : (
            <span className="text-red-600 font-medium">
              Out of Stock
            </span>
          )}
        </p>
      </div>

      {/* RIGHT - Buy Box */}
      <div className="border rounded p-6 shadow-md h-fit">
        <p className="text-2xl font-bold mb-4">
          ${product.price}
        </p>

        <p className="mb-4">
          {product.stock > 0 ? "Available" : "Currently unavailable"}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || loadingCart}
          className={`w-full py-2 rounded mb-3 ${
            product.stock > 0
              ? "bg-yellow-400 hover:bg-yellow-500 text-black"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loadingCart ? "Adding..." : "Add to Cart"}
        </button>

        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded">
          Buy Now
        </button>
      </div>
    </div>
  );
}