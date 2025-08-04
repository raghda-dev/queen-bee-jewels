// client/app/(main)/lib/axios/axios.ts


import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default axiosInstance;

