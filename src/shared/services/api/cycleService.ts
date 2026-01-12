/**
 * Servicio de API para Ciclos Académicos
 */

import { httpClient } from '../http';
import { API_ENDPOINTS } from '../../config/endpoints';
import type {
  Cycle,
  CycleListResponse,
  CycleInput,
  CycleDropdown,
  QueryParams,
} from '../../interfaces/api';

class CycleService {
  /**
   * Obtener lista paginada de ciclos
   */
  async getAll(params?: QueryParams): Promise<CycleListResponse> {
    return httpClient.get<CycleListResponse>(API_ENDPOINTS.V2.CYCLES, { params });
  }

  /**
   * Obtener un ciclo por ID
   */
  async getById(id: number | string): Promise<Cycle> {
    return httpClient.get<Cycle>(API_ENDPOINTS.V2.CYCLE_BY_ID(id));
  }

  /**
   * Obtener el ciclo actual activo
   */
  async getCurrent(): Promise<Cycle> {
    return httpClient.get<Cycle>(API_ENDPOINTS.V2.CYCLE_CURRENT);
  }

  /**
   * Crear un nuevo ciclo
   */
  async create(data: CycleInput): Promise<Cycle> {
    return httpClient.post<Cycle>(API_ENDPOINTS.V2.CYCLES, data);
  }

  /**
   * Actualizar un ciclo existente
   */
  async update(id: number | string, data: Partial<CycleInput>): Promise<Cycle> {
    return httpClient.patch<Cycle>(API_ENDPOINTS.V2.CYCLE_BY_ID(id), data);
  }

  /**
   * Eliminar un ciclo
   */
  async delete(id: number | string): Promise<void> {
    return httpClient.delete<void>(API_ENDPOINTS.V2.CYCLE_BY_ID(id));
  }

  /**
   * Obtener lista de ciclos para dropdown
   */
  async getDropdown(): Promise<CycleDropdown[]> {
    return httpClient.get<CycleDropdown[]>(API_ENDPOINTS.V2.CYCLES_DROPDOWN);
  }
}

export const cycleService = new CycleService();
export default cycleService;
