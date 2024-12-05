import axios from "axios";

// Create an Axios instance
const client = axios.create({
  baseURL: "http://localhost:4001", // Replace with your server's base URL
});

// Request interceptor to add JWT token to headers if it's available in localStorage
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (token) {
      // If a token exists, add it to the Authorization header
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { client as httpClient };
