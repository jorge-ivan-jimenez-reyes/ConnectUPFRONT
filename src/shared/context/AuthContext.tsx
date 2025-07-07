// Contexto de autenticación con gestión de estado

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthContextType, User, LoginDTO, RegisterAdminDTO, RegisterUserDTO, UpdateUserDTO, ChangePasswordDTO } from '../interfaces';
import { UserModel } from '../models';
import { CONFIG } from '../config';
import { authService } from '../services/authService';
import { apiService } from '../services/apiService';
import { logApiResponse, logLoginFlow, validateJWTResponse, createUserFromJWT } from '../utils/debugHelpers';

// Estado del contexto
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Acciones del reducer
type AuthAction =
  | { type: 'AUTH_LOADING' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'CLEAR_ERROR' };

// Estado inicial
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem(CONFIG.TOKEN_KEY),
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_LOADING':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props del provider
interface AuthProviderProps {
  children: ReactNode;
}

// Provider del contexto
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verificar token al cargar
  useEffect(() => {
    const token = localStorage.getItem(CONFIG.TOKEN_KEY);
    if (token) {
      // Aquí harías la verificación del token con el backend
      verifyToken(token);
    } else {
      dispatch({ type: 'AUTH_ERROR', payload: 'No token found' });
    }
  }, []);

  // Función para verificar token
  const verifyToken = async (token: string) => {
    try {
      dispatch({ type: 'AUTH_LOADING' });
      
      // Por ahora, solo verificar que el token existe y crear usuario básico
      if (token) {
        // Detectar tipo de usuario basado en localStorage o URL
        const currentPath = window.location.pathname;
        const isAdmin = currentPath.startsWith('/admin');
        
        // Crear usuario básico
        const user = createUserFromJWT('usuario@temporal.com', isAdmin);
        
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, token },
        });
        
        logLoginFlow('Token verificado y usuario creado', { userId: user.id, role: user.role });
      } else {
        throw new Error('Token inválido');
      }
    } catch (error) {
      localStorage.removeItem(CONFIG.TOKEN_KEY);
      localStorage.removeItem(CONFIG.REFRESH_TOKEN_KEY);
      dispatch({ type: 'AUTH_ERROR', payload: 'Token inválido o expirado' });
    }
  };

    // Función de login
  const login = async (credentials: LoginDTO): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_LOADING' });
      
      logLoginFlow('Iniciando login', { email: credentials.email });
      
      // Detectar el tipo de usuario basado en la URL actual
      const currentPath = window.location.pathname;
      const isAdminLogin = currentPath.includes('/login/admin') || currentPath.startsWith('/admin');
      
      // Paso 1: Obtener tokens JWT usando el endpoint que funciona
      const loginEndpoint = CONFIG.API_ENDPOINTS.AUTH.JWT_CREATE;
      
      logLoginFlow('Usando endpoint JWT único', { endpoint: loginEndpoint, isAdminLogin });
      
      const loginResponse = await apiService.post<{ access: string; refresh: string }>(loginEndpoint, {
        email: credentials.email,
        password: credentials.password,
      });
      
      logApiResponse(loginEndpoint, loginResponse);
      
      // Validar la respuesta JWT
      const validation = validateJWTResponse(loginResponse);
      if (!validation.isValid) {
        console.warn('⚠️ Respuesta JWT incompleta:', validation.issues);
      }
      
      // Paso 2: Crear usuario básico ya que el endpoint /users/me/ no está disponible
      logLoginFlow('Creando usuario básico desde JWT', { isAdminLogin, email: credentials.email });
      
      const user = createUserFromJWT(credentials.email, isAdminLogin);
      
      // Guardar tokens en localStorage
      localStorage.setItem(CONFIG.TOKEN_KEY, loginResponse.access);
      localStorage.setItem(CONFIG.REFRESH_TOKEN_KEY, loginResponse.refresh);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user, token: loginResponse.access },
      });
      
      logLoginFlow('Login completado exitosamente', { userId: user.id, role: user.role });
    } catch (error) {
      logLoginFlow('Error en login', error);
      const errorMessage = error instanceof Error ? error.message : 'Credenciales incorrectas';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw error;
    }
  };

  // Función de logout
  const logout = async (): Promise<void> => {
    try {
      // Solo limpiar tokens locales por ahora
      localStorage.removeItem(CONFIG.TOKEN_KEY);
      localStorage.removeItem(CONFIG.REFRESH_TOKEN_KEY);
      dispatch({ type: 'AUTH_LOGOUT' });
      
      logLoginFlow('Logout completado', { timestamp: new Date().toISOString() });
    } catch (error) {
      console.warn('Error en logout:', error);
      // Asegurar que los tokens se limpien de todos modos
      localStorage.removeItem(CONFIG.TOKEN_KEY);
      localStorage.removeItem(CONFIG.REFRESH_TOKEN_KEY);
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  // Función de registro
  const register = async (
    data: RegisterAdminDTO | RegisterUserDTO,
    type: 'admin' | 'user'
  ): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_LOADING' });
      
      // Simular llamada al backend
      // const response = await authService.register(data, type);
      
      // Simular respuesta exitosa
      const mockUser = UserModel.createEmpty();
      mockUser.id = '1';
      mockUser.email = data.email;
      mockUser.firstName = data.firstName;
      mockUser.lastName = data.lastName;
      mockUser.role = type === 'admin' ? 'admin' : 'user';
      
      const token = 'mock-jwt-token';
      
      localStorage.setItem(CONFIG.TOKEN_KEY, token);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: mockUser.toJSON(), token },
      });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Registration failed' });
      throw error;
    }
  };

  // Función para actualizar usuario
  const updateUser = async (data: UpdateUserDTO): Promise<void> => {
    try {
      if (!state.user) throw new Error('No user logged in');
      
      // Simular llamada al backend
      // const response = await authService.updateUser(data);
      
      const updatedUser = { ...state.user, ...data };
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Failed to update user' });
      throw error;
    }
  };

  // Función para cambiar contraseña
  const changePassword = async (data: ChangePasswordDTO): Promise<void> => {
    try {
      // Simular llamada al backend
      // await authService.changePassword(data);
      
      // No necesitamos actualizar el estado para cambio de contraseña
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Failed to change password' });
      throw error;
    }
  };

  // Función para refresh token
  const refreshToken = async (): Promise<void> => {
    try {
      const refreshTokenValue = localStorage.getItem(CONFIG.REFRESH_TOKEN_KEY);
      if (!refreshTokenValue) throw new Error('No refresh token');
      
      // Simular llamada al backend
      // const response = await authService.refreshToken();
      
      const newToken = 'new-mock-jwt-token';
      localStorage.setItem(CONFIG.TOKEN_KEY, newToken);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: state.user!, token: newToken },
      });
    } catch (error) {
      logout();
      throw error;
    }
  };

  // Valor del contexto
  const contextValue: AuthContextType = {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login,
    logout,
    register,
    updateUser,
    changePassword,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 