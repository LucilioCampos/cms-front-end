import axios from 'axios';
import { getToken } from './auth'

const endpoint = process.env.NODE_ENV === "production" ? process.env.API_URL : "http://localhost:3000"

export const conn = axios.create({
  baseURL: endpoint
})

conn.interceptors.request.use(async config => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})