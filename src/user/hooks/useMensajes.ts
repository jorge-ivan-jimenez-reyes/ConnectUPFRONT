import { useState, useCallback, useEffect } from 'react';
import { 
  EstadoMensajes, 
  Conversacion, 
  Mensaje, 
  Usuario, 
  EstadoUsuario, 
  TipoMensaje,
  EnviarMensajeData,
  ConversacionDetalle 
} from '../interfaces/mensaje.interfaces';

export const useMensajes = () => {
  // Datos de ejemplo (mock data)
  const usuarioActual: Usuario = {
    id: 'user-1',
    nombre: 'Usuario Actual',
    avatar: '/src/assets/img/miranda.png',
    estado: EstadoUsuario.ONLINE
  };

  const conversacionesMock: Conversacion[] = [
    {
      id: 'conv-1',
      participantes: [
        usuarioActual,
        {
          id: 'user-2',
          nombre: 'Miranda Smith',
          avatar: '/src/assets/img/miranda.png',
          estado: EstadoUsuario.ONLINE,
          ultimaConexion: '2024-01-20T10:30:00Z'
        }
      ],
      ultimoMensaje: {
        id: 'msg-1',
        conversacionId: 'conv-1',
        autorId: 'user-2',
        contenido: 'Lorem ipsum',
        fechaEnvio: '2024-01-20T17:00:00Z',
        leido: true,
        tipo: TipoMensaje.TEXTO
      },
      mensajesNoLeidos: 0,
      fechaUltimaActividad: '2024-01-20T17:00:00Z',
      activa: true
    },
    {
      id: 'conv-2',
      participantes: [
        usuarioActual,
        {
          id: 'user-3',
          nombre: 'Miranda Smith',
          avatar: '/src/assets/img/miranda.png',
          estado: EstadoUsuario.ONLINE,
          ultimaConexion: '2024-01-18T15:45:00Z'
        }
      ],
      ultimoMensaje: {
        id: 'msg-2',
        conversacionId: 'conv-2',
        autorId: 'user-3',
        contenido: 'Lorem ipsum',
        fechaEnvio: '2024-01-18T15:45:00Z',
        leido: true,
        tipo: TipoMensaje.TEXTO
      },
      mensajesNoLeidos: 0,
      fechaUltimaActividad: '2024-01-18T15:45:00Z',
      activa: true
    },
    {
      id: 'conv-3',
      participantes: [
        usuarioActual,
        {
          id: 'user-4',
          nombre: 'Miranda Smith',
          avatar: '/src/assets/img/miranda.png',
          estado: EstadoUsuario.OFFLINE,
          ultimaConexion: '2024-01-01T12:00:00Z'
        }
      ],
      ultimoMensaje: {
        id: 'msg-3',
        conversacionId: 'conv-3',
        autorId: 'user-4',
        contenido: 'Lorem ipsum',
        fechaEnvio: '2024-01-01T12:00:00Z',
        leido: true,
        tipo: TipoMensaje.TEXTO
      },
      mensajesNoLeidos: 0,
      fechaUltimaActividad: '2024-01-01T12:00:00Z',
      activa: true
    },
    {
      id: 'conv-4',
      participantes: [
        usuarioActual,
        {
          id: 'user-5',
          nombre: 'Miranda Smith',
          avatar: '/src/assets/img/miranda.png',
          estado: EstadoUsuario.OFFLINE,
          ultimaConexion: '2023-12-15T09:30:00Z'
        }
      ],
      ultimoMensaje: {
        id: 'msg-4',
        conversacionId: 'conv-4',
        autorId: 'user-5',
        contenido: 'Lorem ipsum',
        fechaEnvio: '2023-12-15T09:30:00Z',
        leido: true,
        tipo: TipoMensaje.TEXTO
      },
      mensajesNoLeidos: 0,
      fechaUltimaActividad: '2023-12-15T09:30:00Z',
      activa: true
    }
  ];

  // Estado principal
  const [estado, setEstado] = useState<EstadoMensajes>({
    conversaciones: conversacionesMock,
    filtroTexto: '',
    cargando: false,
    enviandoMensaje: false
  });

  // Filtrar conversaciones basado en el texto de búsqueda
  const conversacionesFiltradas = estado.conversaciones.filter(conv => {
    if (!estado.filtroTexto) return true;
    
    const otroParticipante = conv.participantes.find(p => p.id !== usuarioActual.id);
    return otroParticipante?.nombre.toLowerCase().includes(estado.filtroTexto.toLowerCase()) ||
           conv.ultimoMensaje?.contenido.toLowerCase().includes(estado.filtroTexto.toLowerCase());
  });

  // Actualizar filtro de búsqueda
  const actualizarFiltro = useCallback((texto: string) => {
    setEstado(prev => ({
      ...prev,
      filtroTexto: texto
    }));
  }, []);

  // Seleccionar conversación
  const seleccionarConversacion = useCallback(async (conversacionId: string) => {
    const conversacion = estado.conversaciones.find(c => c.id === conversacionId);
    if (!conversacion) return;

    setEstado(prev => ({
      ...prev,
      cargando: true
    }));

    try {
      // Simular carga de mensajes
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mensajesMock: Mensaje[] = [
        {
          id: 'msg-detail-1',
          conversacionId,
          autorId: conversacion.participantes[1].id,
          contenido: 'Hola, ¿cómo estás?',
          fechaEnvio: '2024-01-20T16:30:00Z',
          leido: true,
          tipo: TipoMensaje.TEXTO
        },
        {
          id: 'msg-detail-2',
          conversacionId,
          autorId: usuarioActual.id,
          contenido: '¡Hola! Todo bien, gracias. ¿Y tú?',
          fechaEnvio: '2024-01-20T16:35:00Z',
          leido: true,
          tipo: TipoMensaje.TEXTO
        },
        {
          id: 'msg-detail-3',
          conversacionId,
          autorId: conversacion.participantes[1].id,
          contenido: 'Muy bien también. ¿Tienes tiempo para revisar el proyecto?',
          fechaEnvio: '2024-01-20T16:40:00Z',
          leido: true,
          tipo: TipoMensaje.TEXTO
        }
      ];

      const conversacionDetalle: ConversacionDetalle = {
        conversacion,
        mensajes: mensajesMock,
        cargandoMensajes: false,
        hayMasMensajes: false
      };

      setEstado(prev => ({
        ...prev,
        conversacionActiva: conversacionDetalle,
        cargando: false
      }));
    } catch (error) {
      setEstado(prev => ({
        ...prev,
        cargando: false,
        error: 'Error al cargar la conversación'
      }));
    }
  }, [estado.conversaciones, usuarioActual.id]);

  // Enviar mensaje
  const enviarMensaje = useCallback(async (data: EnviarMensajeData) => {
    if (!estado.conversacionActiva) return;

    setEstado(prev => ({
      ...prev,
      enviandoMensaje: true
    }));

    try {
      // Simular envío de mensaje
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const nuevoMensaje: Mensaje = {
        id: `msg-${Date.now()}`,
        conversacionId: data.conversacionId,
        autorId: usuarioActual.id,
        contenido: data.contenido,
        fechaEnvio: new Date().toISOString(),
        leido: true,
        tipo: data.tipo
      };

      setEstado(prev => ({
        ...prev,
        conversacionActiva: prev.conversacionActiva ? {
          ...prev.conversacionActiva,
          mensajes: [...prev.conversacionActiva.mensajes, nuevoMensaje]
        } : undefined,
        conversaciones: prev.conversaciones.map(conv =>
          conv.id === data.conversacionId
            ? { ...conv, ultimoMensaje: nuevoMensaje, fechaUltimaActividad: nuevoMensaje.fechaEnvio }
            : conv
        ),
        enviandoMensaje: false
      }));
    } catch (error) {
      setEstado(prev => ({
        ...prev,
        enviandoMensaje: false,
        error: 'Error al enviar mensaje'
      }));
    }
  }, [estado.conversacionActiva, usuarioActual.id]);

  // Marcar mensajes como leídos
  const marcarComoLeido = useCallback((conversacionId: string) => {
    setEstado(prev => ({
      ...prev,
      conversaciones: prev.conversaciones.map(conv =>
        conv.id === conversacionId ? { ...conv, mensajesNoLeidos: 0 } : conv
      )
    }));
  }, []);

  // Obtener tiempo relativo
  const obtenerTiempoRelativo = useCallback((fecha: string): string => {
    const ahora = new Date();
    const fechaMensaje = new Date(fecha);
    const diferencia = ahora.getTime() - fechaMensaje.getTime();

    const minutos = Math.floor(diferencia / (1000 * 60));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const semanas = Math.floor(dias / 7);
    const meses = Math.floor(dias / 30);

    if (minutos < 1) return 'ahora';
    if (minutos < 60) return `hace ${minutos} min`;
    if (horas < 24) return `hace ${horas} Hrs`;
    if (dias < 7) return `hace ${dias} días`;
    if (semanas < 4) return `hace ${semanas} semanas`;
    if (meses < 12) return `hace ${meses} meses`;
    
    return 'hace más de un año';
  }, []);

  // Obtener otro participante de la conversación
  const obtenerOtroParticipante = useCallback((conversacion: Conversacion): Usuario => {
    return conversacion.participantes.find(p => p.id !== usuarioActual.id) || conversacion.participantes[0];
  }, [usuarioActual.id]);

  return {
    // Estado
    estado,
    conversacionesFiltradas,
    usuarioActual,

    // Acciones
    actualizarFiltro,
    seleccionarConversacion,
    enviarMensaje,
    marcarComoLeido,

    // Utilidades
    obtenerTiempoRelativo,
    obtenerOtroParticipante
  };
}; 