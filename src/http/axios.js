import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://0.0.0.0:3000/api',
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
export default axiosInstance;
