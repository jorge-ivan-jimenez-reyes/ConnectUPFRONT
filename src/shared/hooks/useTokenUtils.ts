// Hook para utilidades de token

import { useCallback } from 'react';
import { CONFIG } from '../config';

export interface TokenUtils {
  getToken: () => string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
  getRefreshToken: () => string | null;
  setRefreshToken: (token: string) => void;
  removeRefreshToken: () => void;
  isTokenExpired: (token: string) => boolean;
  getTokenPayload: (token: string) => any;
  clearAllTokens: () => void;
}

export const useTokenUtils = (): TokenUtils => {
  // Obtener token de acceso
  const getToken = useCallback((): string | null => {
    return localStorage.getItem(CONFIG.TOKEN_KEY);
  }, []);

  // Establecer token de acceso
  const setToken = useCallback((token: string): void => {
    localStorage.setItem(CONFIG.TOKEN_KEY, token);
  }, []);

  // Remover token de acceso
  const removeToken = useCallback((): void => {
    localStorage.removeItem(CONFIG.TOKEN_KEY);
  }, []);

  // Obtener refresh token
  const getRefreshToken = useCallback((): string | null => {
    return localStorage.getItem(CONFIG.REFRESH_TOKEN_KEY);
  }, []);

  // Establecer refresh token
  const setRefreshToken = useCallback((token: string): void => {
    localStorage.setItem(CONFIG.REFRESH_TOKEN_KEY, token);
  }, []);

  // Remover refresh token
  const removeRefreshToken = useCallback((): void => {
    localStorage.removeItem(CONFIG.REFRESH_TOKEN_KEY);
  }, []);

  // Verificar si el token está expirado
  const isTokenExpired = useCallback((token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true; // Si no se puede decodificar, considerar como expirado
    }
  }, []);

  // Obtener payload del token
  const getTokenPayload = useCallback((token: string): any => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      return null;
    }
  }, []);

  // Limpiar todos los tokens
  const clearAllTokens = useCallback((): void => {
    localStorage.removeItem(CONFIG.TOKEN_KEY);
    localStorage.removeItem(CONFIG.REFRESH_TOKEN_KEY);
  }, []);

  return {
    getToken,
    setToken,
    removeToken,
    getRefreshToken,
    setRefreshToken,
    removeRefreshToken,
    isTokenExpired,
    getTokenPayload,
    clearAllTokens,
  };
}; 