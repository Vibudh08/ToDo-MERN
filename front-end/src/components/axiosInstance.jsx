import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:3400",
  withCredentials: true,
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response && err.response.status === 401) {
      // Auto logout on token expiry
      localStorage.removeItem("login"); // clear login state

      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      alert("Session expired. Please log in again.");
      window.location.href = "/"; // redirect to login
    }
    return Promise.reject(err);
  }
);

export default api;
