import axios from 'axios';
import { AuthContext } from '../context/AuthProvider'; // Update with correct path

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4001', // Update with your backend base URL
});

// Axios interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Token has expired, log out the user
      const { logOut } = useAuth(); // This won't work directly in this context
      
      // If you are using a React component or hook, you can use logOut here
      if (logOut) {
        logOut();
      } else {
        // Fallback if not in a React context
        console.error('Auth context not available');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;