/**
 * HttpClient unificado para ConnectUP
 * 
 * Cliente HTTP basado en Axios con:
 * - Interceptores de autenticación
 * - Manejo automático de refresh token
 * - Manejo centralizado de errores
 * - Tipado genérico
 */

import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosError,
  InternalAxiosRequestConfig 
} from 'axios';
import { CONFIG } from '../../config';

// Tipos de respuesta de API
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages?: number;
}

export interface ApiError {
  detail?: string;
  message?: string;
  errors?: Record<string, string[]>;
  non_field_errors?: string[];
}

class HttpClient {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
  }> = [];

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: CONFIG.API_BASE_URL,
      timeout: CONFIG.TIMEOUTS.API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - agregar token de autenticación
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(CONFIG.TOKEN_KEY);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - manejo de errores y refresh token
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Si el error es 401 y no es el endpoint de refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // Si ya estamos refrescando, encolar esta petición
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then(() => {
              return this.axiosInstance(originalRequest);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          const refreshToken = localStorage.getItem(CONFIG.REFRESH_TOKEN_KEY);
          
          if (refreshToken) {
            try {
              const response = await axios.post(
                `${CONFIG.API_BASE_URL}/auth/jwt/refresh/`,
                { refresh: refreshToken }
              );
              
              const { access } = response.data;
              localStorage.setItem(CONFIG.TOKEN_KEY, access);
              
              // Procesar cola de peticiones fallidas
              this.processQueue(null);
              
              // Reintentar la petición original
              return this.axiosInstance(originalRequest);
            } catch (refreshError) {
              // Si falla el refresh, limpiar tokens y redirigir
              this.processQueue(refreshError);
              this.clearTokensAndRedirect();
              return Promise.reject(refreshError);
            } finally {
              this.isRefreshing = false;
            }
          } else {
            // No hay refresh token, redirigir a login
            this.clearTokensAndRedirect();
          }
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  private processQueue(error: unknown): void {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve();
      }
    });
    this.failedQueue = [];
  }

  private clearTokensAndRedirect(): void {
    localStorage.removeItem(CONFIG.TOKEN_KEY);
    localStorage.removeItem(CONFIG.REFRESH_TOKEN_KEY);
    
    // Solo redirigir si no estamos ya en login
    const currentPath = window.location.pathname;
    if (!currentPath.includes('/login')) {
      window.location.href = '/login/admin';
    }
  }

  private handleError(error: AxiosError<ApiError>): Error {
    if (error.response?.data) {
      const { detail, message, errors, non_field_errors } = error.response.data;
      
      if (detail) return new Error(detail);
      if (message) return new Error(message);
      if (non_field_errors?.length) return new Error(non_field_errors[0]);
      if (errors) {
        const firstError = Object.values(errors)[0];
        if (firstError?.length) return new Error(firstError[0]);
      }
    }
    
    if (error.message === 'Network Error') {
      return new Error('Error de conexión. Verifica tu conexión a internet.');
    }
    
    return new Error(`Error ${error.response?.status || 'desconocido'}: ${error.message}`);
  }

  // Métodos HTTP genéricos
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  // Método para subir archivos
  async uploadFile<T>(
    url: string,
    file: File,
    additionalData?: Record<string, unknown>
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    const response = await this.axiosInstance.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }
}

// Exportar instancia singleton
export const httpClient = new HttpClient();
export default httpClient;
