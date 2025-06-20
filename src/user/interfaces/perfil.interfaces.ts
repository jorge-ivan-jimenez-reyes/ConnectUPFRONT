// Interfaces para el perfil de usuario

export interface PerfilUsuario {
  id: string;
  nombreUsuario: string;
  fechaNacimiento: string;
  descripcion: string;
  avatar?: string;
  informacionGestionAcademica: InformacionGestionAcademica;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface InformacionGestionAcademica {
  correoInstitucional: string;
  correoPersonal: string;
  celular: string;
  telefono?: string;
  region: string;
}

export interface ActualizacionPerfil {
  nombreUsuario?: string;
  fechaNacimiento?: string;
  descripcion?: string;
  avatar?: File | string;
  informacionGestionAcademica?: Partial<InformacionGestionAcademica>;
}

export interface ConfiguracionPerfil {
  modoEdicion: boolean;
  guardandoCambios: boolean;
  errores: Record<string, string>;
} 