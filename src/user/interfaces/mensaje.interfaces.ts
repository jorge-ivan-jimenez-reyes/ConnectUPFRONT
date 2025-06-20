// Interfaces para el sistema de mensajes

export interface Usuario {
  id: string;
  nombre: string;
  avatar?: string;
  estado: EstadoUsuario;
  ultimaConexion?: string;
}

export interface Mensaje {
  id: string;
  conversacionId: string;
  autorId: string;
  contenido: string;
  fechaEnvio: string;
  leido: boolean;
  tipo: TipoMensaje;
}

export interface Conversacion {
  id: string;
  participantes: Usuario[];
  ultimoMensaje?: Mensaje;
  mensajesNoLeidos: number;
  fechaUltimaActividad: string;
  activa: boolean;
}

export interface ConversacionDetalle {
  conversacion: Conversacion;
  mensajes: Mensaje[];
  cargandoMensajes: boolean;
  hayMasMensajes: boolean;
}

export interface EstadoMensajes {
  conversaciones: Conversacion[];
  conversacionActiva?: ConversacionDetalle;
  filtroTexto: string;
  cargando: boolean;
  enviandoMensaje: boolean;
  error?: string;
}

// Enums
export enum EstadoUsuario {
  ONLINE = 'online',
  OFFLINE = 'offline',
  AUSENTE = 'ausente'
}

export enum TipoMensaje {
  TEXTO = 'texto',
  IMAGEN = 'imagen',
  ARCHIVO = 'archivo',
  SISTEMA = 'sistema'
}

export enum FiltroConversaciones {
  TODAS = 'todas',
  NO_LEIDAS = 'no-leidas',
  ACTIVAS = 'activas'
}

// Tipos para acciones
export interface EnviarMensajeData {
  conversacionId: string;
  contenido: string;
  tipo: TipoMensaje;
}

export interface CrearConversacionData {
  participanteId: string;
  mensajeInicial?: string;
}

export interface ConfiguracionMensajes {
  notificacionesActivadas: boolean;
  sonidoActivado: boolean;
  mostrarVistaPreliminar: boolean;
} 