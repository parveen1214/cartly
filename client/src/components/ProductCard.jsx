const ProductCard = ({ product }) => {
  return (
    <div class="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img src={product.image} alt={product.name} class="w-full h-48 object-cover rounded" />
      <h3 class="text-lg font-semibold mt-2">{product.name}</h3>
      <p class="text-gray-500 mt-1">${product.price}</p>
      <button class="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
