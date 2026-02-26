import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        console.log("Backend response:", data);

        setProducts(data.products || []);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
            >
              <div className="border p-4 rounded shadow hover:shadow-lg transition cursor-pointer">
                <h2 className="font-semibold text-lg mb-2">
                  {product.name}
                </h2>

                <p className="text-gray-600 mb-2 line-clamp-2">
                  {product.description}
                </p>

                <p className="font-bold mb-2">
                  ${product.price}
                </p>

                <p className="text-sm text-gray-500">
                  Stock: {product.stock}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}