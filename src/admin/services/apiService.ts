// Servicio API base para administradores

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IHttpClient, ApiResponse } from '../../shared/interfaces';
import { CONFIG } from '../../shared/config';

// Implementación concreta del HTTP Client (Dependency Inversion Principle)
export class HttpClient implements IHttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string = CONFIG.API_BASE_URL) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: CONFIG.TIMEOUTS.API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor para agregar token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(CONFIG.TOKEN_KEY);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor para manejo de errores
    this.axiosInstance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          // Token expirado, limpiar storage y redirigir
          localStorage.removeItem(CONFIG.TOKEN_KEY);
          localStorage.removeItem(CONFIG.REFRESH_TOKEN_KEY);
          window.location.href = '/admin/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.axiosInstance.get(url, config);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.axiosInstance.post(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.axiosInstance.put(url, data, config);
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.axiosInstance.patch(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.axiosInstance.delete(url, config);
  }
}

// Instancia singleton del HTTP Client
export const apiClient = new HttpClient(); 