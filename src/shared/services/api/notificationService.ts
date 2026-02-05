/**
 * Servicio de Notificaciones
 * 
 * Conecta con el backend para gestionar notificaciones.
 */

import { httpClient } from '../http/HttpClient';
import { API_ENDPOINTS } from '../../config/endpoints';

// ============================================================================
// TIPOS
// ============================================================================

/** Notificación del backend */
export interface NotificationAPI {
  id: number;
  user_id: number;
  text: string;
  timestamp: string;        // ISO date string
  origin_id: number | null;
  origin_name: string | null;
  is_system: boolean;
}

/** Input para crear notificación (admin) */
export interface NotificationInput {
  user_id: number;
  text: string;
}

/** Respuesta de conteo */
export interface NotificationCountResponse {
  count: number;
}

// ============================================================================
// SERVICIO
// ============================================================================

export const notificationService = {
  /**
   * Obtiene las notificaciones del usuario actual
   * @param limit - Límite de notificaciones (default: 50)
   */
  getMyNotifications: async (limit: number = 50): Promise<NotificationAPI[]> => {
    const params = { limit };
    const data = await httpClient.get<NotificationAPI[]>(
      API_ENDPOINTS.V2.NOTIFICATIONS,
      { params }
    );
    return Array.isArray(data) ? data : [];
  },

  /**
   * Obtiene el conteo de notificaciones no leídas
   */
  getUnreadCount: async (): Promise<number> => {
    const data = await httpClient.get<NotificationCountResponse>(
      API_ENDPOINTS.V2.NOTIFICATIONS_COUNT
    );
    return data.count ?? 0;
  },

  /**
   * Crea una notificación (admin)
   * @param input - Datos de la notificación
   */
  create: async (input: NotificationInput): Promise<NotificationAPI> => {
    const data = await httpClient.post<NotificationAPI>(
      API_ENDPOINTS.V2.NOTIFICATIONS,
      input
    );
    return data;
  },

  /**
   * Elimina una notificación (admin)
   * @param id - ID de la notificación
   */
  delete: async (id: number): Promise<void> => {
    await httpClient.delete(API_ENDPOINTS.V2.NOTIFICATION_BY_ID(id));
  },
};

export default notificationService;
