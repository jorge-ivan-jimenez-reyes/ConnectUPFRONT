import { useState, useCallback, useEffect } from 'react';
import { notificationService, NotificationAPI } from '../../shared/services/api';

// ============================================================================
// TIPOS
// ============================================================================

export interface Notificacion {
  id: number;
  texto: string;
  fecha: Date;
  origenId: number | null;
  origenNombre: string | null;
  esSistema: boolean;
  leida: boolean;
}

export interface EstadoNotificaciones {
  notificaciones: Notificacion[];
  noLeidas: number;
  cargando: boolean;
  error: string | null;
}

// ============================================================================
// MAPEO
// ============================================================================

function apiToNotificacion(api: NotificationAPI): Notificacion {
  return {
    id: api.id,
    texto: api.text,
    fecha: new Date(api.timestamp),
    origenId: api.origin_id,
    origenNombre: api.origin_name,
    esSistema: api.is_system,
    leida: false, // El backend no tiene campo de leída por ahora
  };
}

// ============================================================================
// HOOK
// ============================================================================

export const useNotificaciones = (autoFetch: boolean = true) => {
  const [estado, setEstado] = useState<EstadoNotificaciones>({
    notificaciones: [],
    noLeidas: 0,
    cargando: false,
    error: null,
  });

  // =========================================================================
  // CARGAR NOTIFICACIONES
  // =========================================================================
  const cargarNotificaciones = useCallback(async (limit: number = 50) => {
    setEstado(prev => ({ ...prev, cargando: true, error: null }));

    try {
      const [notificacionesApi, countResponse] = await Promise.all([
        notificationService.getMyNotifications(limit),
        notificationService.getUnreadCount(),
      ]);

      const notificaciones = notificacionesApi.map(apiToNotificacion);

      setEstado({
        notificaciones,
        noLeidas: countResponse,
        cargando: false,
        error: null,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar notificaciones';
      setEstado(prev => ({
        ...prev,
        cargando: false,
        error: message,
      }));
      console.error('Error cargando notificaciones:', err);
    }
  }, []);

  // Cargar al montar si autoFetch está activado
  useEffect(() => {
    if (autoFetch) {
      cargarNotificaciones();
    }
  }, [autoFetch, cargarNotificaciones]);

  // =========================================================================
  // ACTUALIZAR CONTEO
  // =========================================================================
  const actualizarConteo = useCallback(async () => {
    try {
      const count = await notificationService.getUnreadCount();
      setEstado(prev => ({ ...prev, noLeidas: count }));
    } catch (err) {
      console.error('Error actualizando conteo:', err);
    }
  }, []);

  // =========================================================================
  // MARCAR COMO LEÍDA (LOCAL)
  // =========================================================================
  const marcarComoLeida = useCallback((id: number) => {
    setEstado(prev => ({
      ...prev,
      notificaciones: prev.notificaciones.map(n =>
        n.id === id ? { ...n, leida: true } : n
      ),
      noLeidas: Math.max(0, prev.noLeidas - 1),
    }));
  }, []);

  // =========================================================================
  // MARCAR TODAS COMO LEÍDAS (LOCAL)
  // =========================================================================
  const marcarTodasComoLeidas = useCallback(() => {
    setEstado(prev => ({
      ...prev,
      notificaciones: prev.notificaciones.map(n => ({ ...n, leida: true })),
      noLeidas: 0,
    }));
  }, []);

  // =========================================================================
  // FORMATEAR TIEMPO RELATIVO
  // =========================================================================
  const formatearTiempoRelativo = useCallback((fecha: Date): string => {
    const ahora = new Date();
    const diferencia = ahora.getTime() - fecha.getTime();

    const minutos = Math.floor(diferencia / (1000 * 60));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    if (minutos < 1) return 'ahora';
    if (minutos < 60) return `hace ${minutos} min`;
    if (horas < 24) return `hace ${horas}h`;
    if (dias < 7) return `hace ${dias}d`;
    if (dias < 30) return `hace ${Math.floor(dias / 7)} sem`;
    
    return fecha.toLocaleDateString('es-MX', { 
      day: 'numeric', 
      month: 'short' 
    });
  }, []);

  return {
    // Estado
    ...estado,

    // Acciones
    cargarNotificaciones,
    actualizarConteo,
    marcarComoLeida,
    marcarTodasComoLeidas,

    // Utilidades
    formatearTiempoRelativo,
  };
};

export default useNotificaciones;
