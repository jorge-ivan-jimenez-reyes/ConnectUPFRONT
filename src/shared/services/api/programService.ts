/**
 * Servicio de API para Programas (Carreras)
 */

import { httpClient } from '../http';
import { API_ENDPOINTS } from '../../config/endpoints';
import type {
  Program,
  ProgramListResponse,
  ProgramInput,
  ProgramDropdown,
  ProgramQueryParams,
} from '../../interfaces/api';

class ProgramService {
  /**
   * Obtener lista paginada de programas
   */
  async getAll(params?: ProgramQueryParams): Promise<ProgramListResponse> {
    return httpClient.get<ProgramListResponse>(API_ENDPOINTS.V2.PROGRAMS, { params });
  }

  /**
   * Obtener un programa por ID
   */
  async getById(id: number | string): Promise<Program> {
    return httpClient.get<Program>(API_ENDPOINTS.V2.PROGRAM_BY_ID(id));
  }

  /**
   * Crear un nuevo programa
   */
  async create(data: ProgramInput): Promise<Program> {
    return httpClient.post<Program>(API_ENDPOINTS.V2.PROGRAMS, data);
  }

  /**
   * Actualizar un programa existente
   */
  async update(id: number | string, data: Partial<ProgramInput>): Promise<Program> {
    return httpClient.patch<Program>(API_ENDPOINTS.V2.PROGRAM_BY_ID(id), data);
  }

  /**
   * Eliminar un programa
   */
  async delete(id: number | string): Promise<void> {
    return httpClient.delete<void>(API_ENDPOINTS.V2.PROGRAM_BY_ID(id));
  }

  /**
   * Obtener lista de programas para dropdown
   */
  async getDropdown(facultyId?: number): Promise<ProgramDropdown[]> {
    return httpClient.get<ProgramDropdown[]>(API_ENDPOINTS.V2.PROGRAMS_DROPDOWN, {
      params: facultyId ? { faculty_id: facultyId } : undefined,
    });
  }
}

export const programService = new ProgramService();
export default programService;
