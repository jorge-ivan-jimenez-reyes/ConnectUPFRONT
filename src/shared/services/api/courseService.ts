/**
 * Servicio de API para Cursos (Materias)
 */

import { httpClient } from '../http';
import { API_ENDPOINTS } from '../../config/endpoints';
import type {
  Course,
  CourseListResponse,
  CourseInput,
  CourseDropdown,
  CourseQueryParams,
  CourseInfo,
  CourseInfoListResponse,
  CourseInfoInput,
} from '../../interfaces/api';

class CourseService {
  /**
   * Obtener lista paginada de cursos
   */
  async getAll(params?: CourseQueryParams): Promise<CourseListResponse> {
    return httpClient.get<CourseListResponse>(API_ENDPOINTS.V2.COURSES, { params });
  }

  /**
   * Obtener un curso por ID
   */
  async getById(id: number | string): Promise<Course> {
    return httpClient.get<Course>(API_ENDPOINTS.V2.COURSE_BY_ID(id));
  }

  /**
   * Crear un nuevo curso
   */
  async create(data: CourseInput): Promise<Course> {
    return httpClient.post<Course>(API_ENDPOINTS.V2.COURSES, data);
  }

  /**
   * Actualizar un curso existente
   */
  async update(id: number | string, data: Partial<CourseInput>): Promise<Course> {
    return httpClient.patch<Course>(API_ENDPOINTS.V2.COURSE_BY_ID(id), data);
  }

  /**
   * Eliminar un curso
   */
  async delete(id: number | string): Promise<void> {
    return httpClient.delete<void>(API_ENDPOINTS.V2.COURSE_BY_ID(id));
  }

  /**
   * Obtener lista de cursos para dropdown
   */
  async getDropdown(): Promise<CourseDropdown[]> {
    return httpClient.get<CourseDropdown[]>(API_ENDPOINTS.V2.COURSES_DROPDOWN);
  }
}

class CourseInfoService {
  /**
   * Obtener lista de instancias de cursos
   */
  async getAll(params?: { cycle_id?: number; teacher_id?: number; page?: number }): Promise<CourseInfoListResponse> {
    return httpClient.get<CourseInfoListResponse>(API_ENDPOINTS.V2.COURSE_INFO, { params });
  }

  /**
   * Obtener una instancia de curso por ID
   */
  async getById(id: number | string): Promise<CourseInfo> {
    return httpClient.get<CourseInfo>(API_ENDPOINTS.V2.COURSE_INFO_BY_ID(id));
  }

  /**
   * Obtener mi horario de clases
   */
  async getMySchedule(params?: { cycle?: number }): Promise<CourseInfo[]> {
    return httpClient.get<CourseInfo[]>(API_ENDPOINTS.V2.COURSE_INFO_MY_SCHEDULE, { params });
  }

  /**
   * Crear una instancia de curso
   */
  async create(data: CourseInfoInput): Promise<CourseInfo> {
    return httpClient.post<CourseInfo>(API_ENDPOINTS.V2.COURSE_INFO, data);
  }

  /**
   * Actualizar una instancia de curso
   */
  async update(id: number | string, data: Partial<CourseInfoInput>): Promise<CourseInfo> {
    return httpClient.patch<CourseInfo>(API_ENDPOINTS.V2.COURSE_INFO_BY_ID(id), data);
  }

  /**
   * Eliminar una instancia de curso
   */
  async delete(id: number | string): Promise<void> {
    return httpClient.delete<void>(API_ENDPOINTS.V2.COURSE_INFO_BY_ID(id));
  }
}

export const courseService = new CourseService();
export const courseInfoService = new CourseInfoService();
export default courseService;
