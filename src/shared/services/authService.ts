import { LoginDTO, RegisterAdminDTO, RegisterUserDTO, User } from '../interfaces';
import { apiService } from './apiService';

// Tipos de respuesta de la API
interface LoginResponse {
  access: string;
  refresh: string;
  user?: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    is_active: boolean;
    date_joined: string;
  };
}

// Respuesta simple de JWT (solo tokens)
interface JWTResponse {
  access: string;
  refresh: string;
}

class AuthService {

  // Login con JWT - endpoint específico
  async login(credentials: LoginDTO, isAdmin: boolean = false): Promise<LoginResponse> {
    const endpoint = isAdmin ? '/auth/admin/login/' : '/auth/users/login/';
    
    const response = await apiService.post<JWTResponse>(endpoint, {
      email: credentials.email,
      password: credentials.password,
    });

    // Si la respuesta no incluye user, obtenemos la información por separado
    let userInfo;
    try {
      userInfo = await this.getCurrentUser(response.access);
    } catch (error) {
      console.warn('No se pudo obtener información del usuario:', error);
      // Crear usuario básico basado en el email
      userInfo = {
        id: '0',
        email: credentials.email,
        firstName: isAdmin ? 'Admin' : 'Usuario',
        lastName: 'Temporal',
        role: isAdmin ? 'admin' as const : 'user' as const,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    return {
      access: response.access,
      refresh: response.refresh,
      user: {
        id: parseInt(userInfo.id),
        email: userInfo.email,
        first_name: userInfo.firstName,
        last_name: userInfo.lastName,
        role: userInfo.role,
        is_active: userInfo.isActive,
        date_joined: userInfo.createdAt.toISOString(),
      },
    };
  }

  // Login directo con endpoint específico (método alternativo)
  async loginAdmin(credentials: LoginDTO): Promise<LoginResponse> {
    return this.login(credentials, true);
  }

  async loginUser(credentials: LoginDTO): Promise<LoginResponse> {
    return this.login(credentials, false);
  }

  // Verificar token
  async verifyToken(token: string): Promise<{ valid: boolean }> {
    try {
      await apiService.post('/auth/jwt/verify/', { token });
      return { valid: true };
    } catch {
      return { valid: false };
    }
  }

  // Refrescar token
  async refreshToken(refreshToken: string): Promise<{ access: string }> {
    const response = await apiService.post<{ access: string }>('/auth/jwt/refresh/', {
      refresh: refreshToken,
    });

    return response;
  }

  // Obtener perfil del usuario
  async getCurrentUser(token: string): Promise<User> {
    const response = await apiService.get<LoginResponse['user']>('/auth/users/me/', true);

    // Convertir la respuesta de la API al formato de User
    return {
      id: response.id.toString(),
      email: response.email,
      firstName: response.first_name,
      lastName: response.last_name,
      role: response.role as 'admin' | 'user' | 'docente',
      isActive: response.is_active,
      createdAt: new Date(response.date_joined),
      updatedAt: new Date(response.date_joined),
    };
  }

  // Registro de usuario
  async registerUser(data: RegisterUserDTO, confirmPassword: string): Promise<LoginResponse> {
    const response = await apiService.post<LoginResponse>('/auth/users/', {
      email: data.email,
      password: data.password,
      re_password: confirmPassword,
      first_name: data.firstName,
      last_name: data.lastName,
      role: 'user',
    });

    return response;
  }

  // Registro de administrador
  async registerAdmin(data: RegisterAdminDTO, confirmPassword: string): Promise<LoginResponse> {
    const response = await apiService.post<LoginResponse>('/auth/users/', {
      email: data.email,
      password: data.password,
      re_password: confirmPassword,
      first_name: data.firstName,
      last_name: data.lastName,
      role: 'admin',
    });

    return response;
  }

  // Cerrar sesión
  async logout(refreshToken: string): Promise<void> {
    await apiService.post('/auth/logout/', { refresh: refreshToken });
  }

  // Cambiar contraseña
  async changePassword(currentPassword: string, newPassword: string, token: string): Promise<void> {
    await apiService.post('/auth/users/set_password/', {
      current_password: currentPassword,
      new_password: newPassword,
      re_new_password: newPassword,
    }, true);
  }

  // Solicitar restablecimiento de contraseña
  async requestPasswordReset(email: string): Promise<void> {
    await apiService.post('/auth/users/reset_password/', { email });
  }

  // Confirmar restablecimiento de contraseña
  async confirmPasswordReset(uid: string, token: string, newPassword: string): Promise<void> {
    await apiService.post('/auth/users/reset_password_confirm/', {
      uid,
      token,
      new_password: newPassword,
      re_new_password: newPassword,
    });
  }
}

export const authService = new AuthService();
export default authService; 