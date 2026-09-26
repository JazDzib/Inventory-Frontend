import axios from "axios";

const api = axios.create({
    baseURL: '/api',
    headers: {"Content-Type": "application/json"}, 
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||           
      `Error ${error.response?.status ?? "de red"}`;
    return Promise.reject(new Error(message));
  }
);

export default api;