/**
 * Servicio de API para Academias
 */

import { httpClient } from '../http';
import { API_ENDPOINTS } from '../../config/endpoints';
import type {
  Academy,
  AcademyListResponse,
  AcademyInput,
  AcademyDropdown,
  AcademyQueryParams,
} from '../../interfaces/api';

class AcademyService {
  /**
   * Obtener lista paginada de academias
   */
  async getAll(params?: AcademyQueryParams): Promise<AcademyListResponse> {
    return httpClient.get<AcademyListResponse>(API_ENDPOINTS.V2.ACADEMIES, { params });
  }

  /**
   * Obtener una academia por ID
   */
  async getById(id: number | string): Promise<Academy> {
    return httpClient.get<Academy>(API_ENDPOINTS.V2.ACADEMY_BY_ID(id));
  }

  /**
   * Crear una nueva academia
   */
  async create(data: AcademyInput): Promise<Academy> {
    return httpClient.post<Academy>(API_ENDPOINTS.V2.ACADEMIES, data);
  }

  /**
   * Actualizar una academia existente
   */
  async update(id: number | string, data: Partial<AcademyInput>): Promise<Academy> {
    return httpClient.patch<Academy>(API_ENDPOINTS.V2.ACADEMY_BY_ID(id), data);
  }

  /**
   * Eliminar una academia
   */
  async delete(id: number | string): Promise<void> {
    return httpClient.delete<void>(API_ENDPOINTS.V2.ACADEMY_BY_ID(id));
  }

  /**
   * Obtener lista de academias para dropdown
   */
  async getDropdown(facultyId?: number): Promise<AcademyDropdown[]> {
    return httpClient.get<AcademyDropdown[]>(API_ENDPOINTS.V2.ACADEMIES_DROPDOWN, {
      params: facultyId ? { faculty_id: facultyId } : undefined,
    });
  }
}

export const academyService = new AcademyService();
export default academyService;
