import axios from 'axios';
import { getToken } from './auth'

export const api = axios.create({ baseURL: 'https://rocketseat-node.herokuapp.com/api' })

export const conn = axios.create({
  baseURL: "http://localhost:3000/api/v1"
})

conn.interceptors.request.use(async config => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})