import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

type IAuth = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    const accessToken: IAuth = JSON.parse(localStorage.getItem("token") || "");

    // If token is present add it to request's Authorization Header
    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = `Bearer ${accessToken?.access_token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  (error) => {
    // Handle response errors here
    if (error.response.status === 401) {
      toast.error("Unauthorized");
      localStorage.clear();
      window.location.href = "/";
    }
    toast.error("This didn't work");

    return Promise.reject(error);
  }
);

export default axiosInstance;
