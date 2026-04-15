// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:8000/api"
// });

// api.interceptors.request.use(config => {
//     const token = localStorage.getItem("token");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
// });

// export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api",
// });

// // Automatically attach JWT token to every request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;



import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiry globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;



