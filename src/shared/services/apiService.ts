import { CONFIG } from '../config';

// Tipos para el servicio API
interface ApiError {
  detail?: string;
  non_field_errors?: string[];
  [key: string]: any;
}

interface RequestConfig extends RequestInit {
  requiresAuth?: boolean;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = CONFIG.API_BASE_URL;
  }

  // Función auxiliar para obtener el token
  private getAuthToken(): string | null {
    return localStorage.getItem(CONFIG.TOKEN_KEY);
  }

  // Función para hacer peticiones HTTP
  async makeRequest<T>(
    endpoint: string,
    options: RequestConfig = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const { requiresAuth = false, ...fetchOptions } = options;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((fetchOptions.headers as Record<string, string>) || {}),
    };

    // Agregar token de autenticación si es requerido
    if (requiresAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const config: RequestInit = {
      ...fetchOptions,
      headers,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({}));
        const errorMessage = 
          errorData.detail || 
          errorData.non_field_errors?.[0] || 
          `Error ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      // Si la respuesta es 204 No Content, retornar objeto vacío
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error de conexión con el servidor');
    }
  }

  // Métodos convenientes para diferentes tipos de peticiones
  async get<T>(endpoint: string, requiresAuth = false): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'GET',
      requiresAuth,
    });
  }

  async post<T>(endpoint: string, data?: any, requiresAuth = false): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      requiresAuth,
    });
  }

  async put<T>(endpoint: string, data?: any, requiresAuth = false): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      requiresAuth,
    });
  }

  async patch<T>(endpoint: string, data?: any, requiresAuth = false): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      requiresAuth,
    });
  }

  async delete<T>(endpoint: string, requiresAuth = false): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'DELETE',
      requiresAuth,
    });
  }

  // Método para subir archivos
  async uploadFile<T>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, any>,
    requiresAuth = true
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const headers: Record<string, string> = {};

    if (requiresAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({}));
        const errorMessage = 
          errorData.detail || 
          errorData.non_field_errors?.[0] || 
          `Error ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error al subir el archivo');
    }
  }

  // Método para manejar refresh de token automáticamente
  async makeAuthenticatedRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      return await this.makeRequest<T>(endpoint, {
        ...options,
        requiresAuth: true,
      });
    } catch (error) {
      // Si el error es 401 (token expirado), intentar refresh
      if (error instanceof Error && error.message.includes('401')) {
        const refreshToken = localStorage.getItem(CONFIG.REFRESH_TOKEN_KEY);
        if (refreshToken) {
          try {
            // Intentar refrescar el token
            const response = await this.post<{ access: string }>('/auth/jwt/refresh/', {
              refresh: refreshToken,
            });
            
            // Actualizar el token en localStorage
            localStorage.setItem(CONFIG.TOKEN_KEY, response.access);
            
            // Reintentar la petición original
            return await this.makeRequest<T>(endpoint, {
              ...options,
              requiresAuth: true,
            });
          } catch (refreshError) {
            // Si falla el refresh, limpiar tokens y reautenticar
            localStorage.removeItem(CONFIG.TOKEN_KEY);
            localStorage.removeItem(CONFIG.REFRESH_TOKEN_KEY);
            throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
          }
        }
      }
      throw error;
    }
  }
}

export const apiService = new ApiService();
export default apiService; 