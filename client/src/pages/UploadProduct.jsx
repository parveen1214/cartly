import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function UploadProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", Number(price));
      formData.append("stock", Number(stock));
      formData.append("category", category);
      formData.append("brand", brand);

      // append files
      for (let i = 0; i < files.length; i++) {
        formData.append("media", files[i]); // must match backend upload.array("media")
      }

      await API.post("/products", formData);

      alert("Product uploaded successfully!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Upload Product
        </h2>

        <input
          type="text"
          placeholder="Product Name"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Stock"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Brand"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        {/* REAL FILE SELECTOR */}
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          className="w-full mb-6"
          onChange={(e) => setFiles(e.target.files)}
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
}