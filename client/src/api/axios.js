import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

// 🔥 Attach token automatically to every request
API.interceptors.request.use(
  (config) => {
    const storedData = localStorage.getItem("cartlyUser");

    if (storedData) {
      const user = JSON.parse(storedData);

      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;