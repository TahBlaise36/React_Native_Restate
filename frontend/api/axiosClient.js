import axios from "axios";
import * as SecureStore from "expo-secure-store";

const axiosClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL_DEVICE,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // ✅ Response interceptor
axiosClient.interceptors.response.use(
  (response) => response, // always return the JSON body
  (error) => {
    if (!error.response) {
      // Network or CORS issues
      return Promise.reject({
        statusCode: 500,
        message: "Network error: could not connect to server",
      });
    }
    // console.log("Full Axios error:", error.response);
    const backendResponse = error.response?.data;

    return Promise.reject(backendResponse);
  }
);

export default axiosClient;
