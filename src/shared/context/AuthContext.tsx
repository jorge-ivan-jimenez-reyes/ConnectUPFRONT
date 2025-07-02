// Contexto de autenticación con gestión de estado

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthContextType, User, LoginDTO, RegisterAdminDTO, RegisterUserDTO, UpdateUserDTO, ChangePasswordDTO } from '../interfaces';
import { UserModel } from '../models';
import { CONFIG } from '../config';

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
      
      // Simular llamada al backend
      // const response = await authService.verifyToken(token);
      // const user = UserModel.fromApiResponse(response.data.user);
      
      // Detectar el tipo de usuario basado en la URL actual
      const currentPath = window.location.pathname;
      const isAdminPath = currentPath.startsWith('/admin');
      
      // Por ahora, simular usuario válido
      const mockUser = UserModel.createEmpty();
      mockUser.id = '1';
      mockUser.email = isAdminPath ? 'admin@sistema.com' : 'usuario@sistema.com';
      mockUser.firstName = isAdminPath ? 'Admin' : 'Usuario';
      mockUser.lastName = isAdminPath ? 'Sistema' : 'Docente';
      mockUser.role = isAdminPath ? 'admin' : 'user';
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: mockUser.toJSON(), token },
      });
    } catch (error) {
      localStorage.removeItem(CONFIG.TOKEN_KEY);
      localStorage.removeItem(CONFIG.REFRESH_TOKEN_KEY);
      dispatch({ type: 'AUTH_ERROR', payload: 'Invalid token' });
    }
  };

  // Función de login
  const login = async (credentials: LoginDTO): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_LOADING' });
      
      // Simular llamada al backend
      // const response = await authService.login(credentials);
      
      // Detectar si es login de admin basado en la URL actual
      const isAdminLogin = window.location.pathname.includes('/login/admin');
      
      // Simular respuesta exitosa
      const mockUser = UserModel.createEmpty();
      mockUser.id = '1';
      mockUser.email = credentials.email;
      mockUser.firstName = isAdminLogin ? 'Admin' : 'Usuario';
      mockUser.lastName = isAdminLogin ? 'Sistema' : 'Docente';
      mockUser.role = isAdminLogin ? 'admin' : 'user';
      
      const token = 'mock-jwt-token';
      
      // Guardar token en localStorage
      localStorage.setItem(CONFIG.TOKEN_KEY, token);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: mockUser.toJSON(), token },
      });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Invalid credentials' });
      throw error;
    }
  };

  // Función de logout
  const logout = (): void => {
    localStorage.removeItem(CONFIG.TOKEN_KEY);
    localStorage.removeItem(CONFIG.REFRESH_TOKEN_KEY);
    dispatch({ type: 'AUTH_LOGOUT' });
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