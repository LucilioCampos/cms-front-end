import axios from 'axios';
import { getToken } from './auth'

export const api = axios.create({ baseURL: 'https://rocketseat-node.herokuapp.com/api' })

export const conn = axios.create({
  baseURL: process.env.NODE_ENV['production'] ? "https://sales-cms-backend.herokuapp.com" : "http://localhost:3000"
})

conn.interceptors.request.use(async config => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})