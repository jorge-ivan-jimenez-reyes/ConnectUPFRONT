/**
 * Servicio de API para Instituciones
 */

import { httpClient } from '../http';
import { API_ENDPOINTS } from '../../config/endpoints';
import type {
  Institution,
  InstitutionListResponse,
  InstitutionInput,
  InstitutionDropdown,
  InstitutionQueryParams,
} from '../../interfaces/api';

class InstitutionService {
  /**
   * Obtener lista paginada de instituciones
   */
  async getAll(params?: InstitutionQueryParams): Promise<InstitutionListResponse> {
    return httpClient.get<InstitutionListResponse>(API_ENDPOINTS.V2.INSTITUTIONS, { params });
  }

  /**
   * Obtener una institución por ID
   */
  async getById(id: number | string, includeFaculties = false): Promise<Institution> {
    return httpClient.get<Institution>(API_ENDPOINTS.V2.INSTITUTION_BY_ID(id), {
      params: { include_faculties: includeFaculties },
    });
  }

  /**
   * Crear una nueva institución
   */
  async create(data: InstitutionInput): Promise<Institution> {
    return httpClient.post<Institution>(API_ENDPOINTS.V2.INSTITUTIONS, data);
  }

  /**
   * Actualizar una institución existente
   */
  async update(id: number | string, data: Partial<InstitutionInput>): Promise<Institution> {
    return httpClient.patch<Institution>(API_ENDPOINTS.V2.INSTITUTION_BY_ID(id), data);
  }

  /**
   * Actualizar completamente una institución
   */
  async replace(id: number | string, data: InstitutionInput): Promise<Institution> {
    return httpClient.put<Institution>(API_ENDPOINTS.V2.INSTITUTION_BY_ID(id), data);
  }

  /**
   * Eliminar una institución
   */
  async delete(id: number | string): Promise<void> {
    return httpClient.delete<void>(API_ENDPOINTS.V2.INSTITUTION_BY_ID(id));
  }

  /**
   * Obtener lista de instituciones para dropdown
   */
  async getDropdown(): Promise<InstitutionDropdown[]> {
    return httpClient.get<InstitutionDropdown[]>(API_ENDPOINTS.V2.INSTITUTIONS_DROPDOWN);
  }
}

export const institutionService = new InstitutionService();
export default institutionService;
