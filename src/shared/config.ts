// Configuración general de la aplicación
export const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  APP_NAME: 'ConnectUP',
  VERSION: '1.0.0',
  TOKEN_KEY: 'connectup_token',
  REFRESH_TOKEN_KEY: 'connectup_refresh_token',
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },
  TIMEOUTS: {
    API_TIMEOUT: 30000,
    AUTH_TIMEOUT: 5000,
  },
} as const;

export const ROUTES = {
  // Rutas públicas
  HOME: '/',
  LOGIN_ADMIN: '/login/admin',
  LOGIN_USER: '/login/user',
  REGISTER_ADMIN: '/register/admin',
  REGISTER_USER: '/register/user',
  
  // Rutas de administrador
  ADMIN: {
    MI_ESPACIO: '/admin/mi-espacio',
    INSTITUCIONES: '/admin/instituciones',
    FACULTADES: '/admin/facultades',
    REPORTES: '/admin/reportes',
    USUARIOS: '/admin/usuarios',
  },
  
  // Rutas de usuario/docente
  USER: {
    MI_ESPACIO: '/user/mi-espacio',
    MIS_CLASES: '/user/mis-clases',
    TEMARIOS: '/user/temarios',
    MIS_HORARIOS: '/user/mis-horarios',
    MI_CV: '/user/mi-cv',
    MI_PERFIL: '/user/mi-perfil',
  },
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  DOCENTE: 'docente',
} as const;

export const FORM_VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s-()]+$/,
} as const;

export const MESSAGES = {
  ERRORS: {
    GENERIC: 'Ha ocurrido un error. Por favor, intenta nuevamente.',
    NETWORK: 'Error de conexión. Verifica tu conexión a internet.',
    VALIDATION: 'Por favor, completa todos los campos requeridos.',
    AUTH_FAILED: 'Credenciales incorrectas.',
    UNAUTHORIZED: 'No tienes permisos para acceder a esta página.',
    SESSION_EXPIRED: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
  },
  SUCCESS: {
    LOGIN: 'Inicio de sesión exitoso.',
    REGISTER: 'Registro exitoso.',
    SAVE: 'Datos guardados correctamente.',
    DELETE: 'Elemento eliminado correctamente.',
  }
} as const; 