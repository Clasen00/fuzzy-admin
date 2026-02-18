import axios from "axios";

const API_BASE_URL = "https://dummyjson.com";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Предоставляем токен интерцептору
apiClient.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("accessToken") ?? sessionStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
