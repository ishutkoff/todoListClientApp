import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("jwt")}`;
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const status = error.response?.status;
    if (status === 401 && !originalRequest._retry) {
      localStorage.removeItem("jwt");
      // window.location.href = "/sign-in/";
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
