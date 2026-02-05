/**
 * Servicio de Disponibilidad
 * 
 * Conecta con el backend para gestionar la disponibilidad de usuarios.
 */

import { httpClient } from '../http/HttpClient';
import { API_ENDPOINTS } from '../../config/endpoints';

// ============================================================================
// TIPOS
// ============================================================================

/** Slot de disponibilidad del backend */
export interface AvailabilitySlotAPI {
  id: number;
  user_id: number;
  cycle_id: number;
  day_of_week: number;  // 1=Lun, 2=Mar, 3=Mie, 4=Jue, 5=Vie, 6=Sab
  day_name: string;     // "Lunes", "Martes", etc.
  time_slot: string;    // "07:00:00"
}

/** Input para guardar un slot */
export interface SlotInput {
  day_of_week: number;
  time_slot: string;  // "HH:MM" o "HH:MM:SS"
}

/** Input para guardar disponibilidad */
export interface AvailabilityInput {
  cycle_id: number;
  slots: SlotInput[];
}

// ============================================================================
// SERVICIO
// ============================================================================

export const availabilityService = {
  /**
   * Obtiene la disponibilidad del usuario actual
   * @param cycleId - ID del ciclo opcional
   */
  getMyAvailability: async (cycleId?: number): Promise<AvailabilitySlotAPI[]> => {
    const params = cycleId ? { cycle: cycleId } : {};
    const data = await httpClient.get<AvailabilitySlotAPI[]>(
      API_ENDPOINTS.V2.AVAILABILITY_MY,
      { params }
    );
    return Array.isArray(data) ? data : [];
  },

  /**
   * Obtiene la disponibilidad de un usuario específico
   * @param userId - ID del usuario
   * @param cycleId - ID del ciclo opcional
   */
  getUserAvailability: async (userId: number, cycleId?: number): Promise<AvailabilitySlotAPI[]> => {
    const params: Record<string, number> = { user: userId };
    if (cycleId) params.cycle = cycleId;
    
    const data = await httpClient.get<AvailabilitySlotAPI[]>(
      API_ENDPOINTS.V2.AVAILABILITY,
      { params }
    );
    return Array.isArray(data) ? data : [];
  },

  /**
   * Obtiene disponibilidad por ciclo
   * @param cycleId - ID del ciclo
   */
  getByCycle: async (cycleId: number): Promise<AvailabilitySlotAPI[]> => {
    const data = await httpClient.get<AvailabilitySlotAPI[]>(
      API_ENDPOINTS.V2.AVAILABILITY_BY_CYCLE(cycleId)
    );
    return Array.isArray(data) ? data : [];
  },

  /**
   * Guarda la disponibilidad del usuario
   * @param input - Datos de disponibilidad
   */
  save: async (input: AvailabilityInput): Promise<AvailabilitySlotAPI[]> => {
    const data = await httpClient.post<AvailabilitySlotAPI[]>(
      API_ENDPOINTS.V2.AVAILABILITY,
      input
    );
    return Array.isArray(data) ? data : [];
  },

  /**
   * Limpia la disponibilidad del usuario para un ciclo
   * @param cycleId - ID del ciclo
   */
  clear: async (cycleId: number): Promise<AvailabilitySlotAPI[]> => {
    // Enviar array vacío para limpiar
    return availabilityService.save({ cycle_id: cycleId, slots: [] });
  },
};

export default availabilityService;
