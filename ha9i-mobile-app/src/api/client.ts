import axios, { AxiosHeaders } from 'axios';
import { Platform } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

// The Backend services base URL (Django Rest Framework server)
const HOST_IP = '10.124.186.116';
const LOCAL_URL = process.env.EXPO_PUBLIC_API_URL || (Platform.OS === 'android'
  ? `http://${HOST_IP}:8000/api/v1`
  : `http://${HOST_IP}:8000/api/v1`);
const PROD_URL = 'https://api.ha9i.gov.dz/api/v1';

const BASE_URL = __DEV__ ? LOCAL_URL : PROD_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Attach the JWT token dynamically if logged in
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    const headers = new AxiosHeaders(config.headers);

    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    config.headers = headers;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle auth failure (401) globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Auto logout on token expiration
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
