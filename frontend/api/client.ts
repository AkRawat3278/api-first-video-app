import axios from "axios";
import { getToken } from "../storage/auth";

const api = axios.create({
  baseURL: "http://192.168.1.9:5000", // YOUR IP
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  console.log("JWT FROM STORAGE:", token);

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export default api;
