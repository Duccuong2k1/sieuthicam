import axios from "axios";
import { ClearValueLocalStorage, ClearValueToken, GetValueToken } from "../constants/get-value-storage";
import { GLOBAL } from "../constants/global";


const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});


axiosClient.interceptors.request.use(
  function (config) {
    const token = GetValueToken(GLOBAL.ACCESS_TOKEN);
    
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      ClearValueToken(GLOBAL.ACCESS_TOKEN);
      ClearValueLocalStorage(GLOBAL.ADMIN);
      ClearValueLocalStorage(GLOBAL.USER);
      
      // Redirect to login page
      if (typeof window !== 'undefined') {
        console.log("redirect to login")
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;