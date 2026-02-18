import axios from "axios";

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000,
});
