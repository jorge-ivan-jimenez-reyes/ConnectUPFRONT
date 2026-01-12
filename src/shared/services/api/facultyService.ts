/**
 * Servicio de API para Facultades
 */

import { httpClient } from '../http';
import { API_ENDPOINTS } from '../../config/endpoints';
import type {
  Faculty,
  FacultyListResponse,
  FacultyInput,
  FacultyDropdown,
  FacultyQueryParams,
} from '../../interfaces/api';

class FacultyService {
  /**
   * Obtener lista paginada de facultades
   */
  async getAll(params?: FacultyQueryParams): Promise<FacultyListResponse> {
    return httpClient.get<FacultyListResponse>(API_ENDPOINTS.V2.FACULTIES, { params });
  }

  /**
   * Obtener una facultad por ID
   */
  async getById(id: number | string): Promise<Faculty> {
    return httpClient.get<Faculty>(API_ENDPOINTS.V2.FACULTY_BY_ID(id));
  }

  /**
   * Crear una nueva facultad
   */
  async create(data: FacultyInput): Promise<Faculty> {
    return httpClient.post<Faculty>(API_ENDPOINTS.V2.FACULTIES, data);
  }

  /**
   * Actualizar una facultad existente
   */
  async update(id: number | string, data: Partial<FacultyInput>): Promise<Faculty> {
    return httpClient.patch<Faculty>(API_ENDPOINTS.V2.FACULTY_BY_ID(id), data);
  }

  /**
   * Eliminar una facultad
   */
  async delete(id: number | string): Promise<void> {
    return httpClient.delete<void>(API_ENDPOINTS.V2.FACULTY_BY_ID(id));
  }

  /**
   * Obtener lista de facultades para dropdown
   */
  async getDropdown(institutionId?: number): Promise<FacultyDropdown[]> {
    return httpClient.get<FacultyDropdown[]>(API_ENDPOINTS.V2.FACULTIES_DROPDOWN, {
      params: institutionId ? { institution_id: institutionId } : undefined,
    });
  }
}

export const facultyService = new FacultyService();
export default facultyService;
