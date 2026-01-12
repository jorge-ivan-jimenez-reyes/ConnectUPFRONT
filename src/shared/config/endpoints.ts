/**
 * Configuración centralizada de endpoints API
 * 
 * Estructura:
 * - AUTH: Endpoints de autenticación (legacy /api/auth/)
 * - V2: Nueva arquitectura (/api/v2/)
 */

export const API_ENDPOINTS = {
  // =========================================================================
  // AUTH (legacy - /api/auth/)
  // =========================================================================
  AUTH: {
    JWT_CREATE: '/auth/jwt/create/',
    JWT_REFRESH: '/auth/jwt/refresh/',
    JWT_VERIFY: '/auth/jwt/verify/',
    USER_PROFILE: '/auth/users/me/',
    REGISTER: '/auth/users/',
    LOGOUT: '/auth/logout/',
    CHANGE_PASSWORD: '/auth/users/set_password/',
    RESET_PASSWORD: '/auth/users/reset_password/',
    RESET_PASSWORD_CONFIRM: '/auth/users/reset_password_confirm/',
  },

  // =========================================================================
  // API V2 - Clean Architecture
  // =========================================================================
  V2: {
    // -----------------------------------------------------------------------
    // USUARIOS
    // -----------------------------------------------------------------------
    USERS: '/v2/users/',
    USER_BY_ID: (id: number | string) => `/v2/users/${id}/`,
    USER_ROLES: (id: number | string) => `/v2/users/${id}/assign-role/`,
    USER_PERMISSIONS: '/v2/users/me/permissions/',
    
    // Roles
    ROLES: '/v2/roles/',
    ROLES_ASSIGNABLE: '/v2/roles/assignable/',

    // -----------------------------------------------------------------------
    // INSTITUCIONES
    // -----------------------------------------------------------------------
    INSTITUTIONS: '/v2/institutions/',
    INSTITUTION_BY_ID: (id: number | string) => `/v2/institutions/${id}/`,
    INSTITUTIONS_DROPDOWN: '/v2/institutions/dropdown/',

    // -----------------------------------------------------------------------
    // FACULTADES
    // -----------------------------------------------------------------------
    FACULTIES: '/v2/faculties/',
    FACULTY_BY_ID: (id: number | string) => `/v2/faculties/${id}/`,
    FACULTIES_DROPDOWN: '/v2/faculties/dropdown/',

    // -----------------------------------------------------------------------
    // ACADEMIAS
    // -----------------------------------------------------------------------
    ACADEMIES: '/v2/academies/',
    ACADEMY_BY_ID: (id: number | string) => `/v2/academies/${id}/`,
    ACADEMIES_DROPDOWN: '/v2/academies/dropdown/',

    // -----------------------------------------------------------------------
    // PROGRAMAS (Carreras)
    // -----------------------------------------------------------------------
    PROGRAMS: '/v2/programs/',
    PROGRAM_BY_ID: (id: number | string) => `/v2/programs/${id}/`,
    PROGRAMS_DROPDOWN: '/v2/programs/dropdown/',

    // -----------------------------------------------------------------------
    // CICLOS
    // -----------------------------------------------------------------------
    CYCLES: '/v2/cycles/',
    CYCLE_BY_ID: (id: number | string) => `/v2/cycles/${id}/`,
    CYCLES_DROPDOWN: '/v2/cycles/dropdown/',
    CYCLE_CURRENT: '/v2/cycles/current/',

    // -----------------------------------------------------------------------
    // CURSOS (Materias)
    // -----------------------------------------------------------------------
    COURSES: '/v2/courses/',
    COURSE_BY_ID: (id: number | string) => `/v2/courses/${id}/`,
    COURSES_DROPDOWN: '/v2/courses/dropdown/',

    // -----------------------------------------------------------------------
    // INSTANCIAS DE CURSOS (Course Info)
    // -----------------------------------------------------------------------
    COURSE_INFO: '/v2/course-info/',
    COURSE_INFO_BY_ID: (id: number | string) => `/v2/course-info/${id}/`,
    COURSE_INFO_MY_SCHEDULE: '/v2/course-info/my-schedule/',

    // -----------------------------------------------------------------------
    // PREFERENCIAS
    // -----------------------------------------------------------------------
    PREFERENCES: '/v2/preferences/',
    PREFERENCES_MY: '/v2/preferences/my-preferences/',

    // -----------------------------------------------------------------------
    // ESTILOS
    // -----------------------------------------------------------------------
    STYLES: '/v2/styles/',

    // -----------------------------------------------------------------------
    // DISPONIBILIDAD
    // -----------------------------------------------------------------------
    AVAILABILITY: '/v2/availability/',
    AVAILABILITY_BY_ID: (id: number | string) => `/v2/availability/${id}/`,

    // -----------------------------------------------------------------------
    // NOTIFICACIONES
    // -----------------------------------------------------------------------
    NOTIFICATIONS: '/v2/notifications/',

    // -----------------------------------------------------------------------
    // CV
    // -----------------------------------------------------------------------
    CV: '/v2/cv/',
    CV_BY_ID: (id: number | string) => `/v2/cv/${id}/`,

    // -----------------------------------------------------------------------
    // ATRIBUTOS CACEI / BULLETS
    // -----------------------------------------------------------------------
    ATTRIBUTES: '/v2/attributes/',
    BULLETS: '/v2/bullets/',
  },
} as const;

export type ApiEndpoints = typeof API_ENDPOINTS;
