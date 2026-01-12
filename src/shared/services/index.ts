/**
 * Índice principal de servicios
 */

// HTTP Client
export { httpClient } from './http';
export type { ApiResponse, PaginatedResponse, ApiError } from './http';

// API Services
export {
  institutionService,
  facultyService,
  academyService,
  programService,
  cycleService,
  courseService,
  courseInfoService,
} from './api';

// Legacy (mantener por compatibilidad)
export { apiService } from './apiService';
export { authService } from './authService';
