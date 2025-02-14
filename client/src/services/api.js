// src/api.js

// Importaciones
import axios from 'axios';

// Obtiene la URL de la API desde las variables de entorno
export const API_URL = process.env.REACT_APP_API_URL;

console.log(API_URL);

// Obtiene el token de localStorage
const getToken = () => localStorage.getItem('token');

// Crea una instancia de axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'x-access-token': getToken(),
  },
});

// Interceptor para agregar el token a las solicitudes
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Función genérica para manejar peticiones
const handleRequest = async (method, url, data = null) => {
  try {
    const response = await api[method](url, data);
    return response;
  } catch (error) {
    console.error("API request error:", error);
    throw error; // Re-lanza el error para que pueda ser manejado donde se llame
  }
};

// Funciones de usuario
export const userApi = {
  login: (email, password) => handleRequest('post', '/user/login', { email, password }),
  signup: (username, email, password) => handleRequest('post', '/user', { username, email, password }),
  fetchUsers: () => handleRequest('get', '/user'),
  deleteUser: (id) => handleRequest('delete', `/user/${id}`),
  updateUserRole: (_id, role) => handleRequest('patch', `/user/${_id}`, { role }),
  requestPasswordReset: (data) => handleRequest('post', '/user/request-password-reset', data),
  fetchApiDocs: () => handleRequest('get', '/api-docs'),
};



