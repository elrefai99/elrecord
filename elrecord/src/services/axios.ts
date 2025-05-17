// src/services/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000/api', // غيّر الرابط حسب مشروعك
  withCredentials: true,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

export default axiosInstance;
