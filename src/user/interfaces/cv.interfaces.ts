// Interfaces para el sistema de CV

export interface DatosBasicos {
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  fechaNacimiento: string;
  nombramientoActual?: string;
  fechaIngresoUniversidad?: string;
  genero: string;
  estadoCivil: string;
  nacionalidad: string;
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
  pais: string;
  codigoPostal: string;
  sitioWeb?: string;
  linkedin?: string;
  github?: string;
}

export interface FormacionAcademica {
  id: string;
  nivelEducativo: string;
  tituloObtenido: string;
  institucion: string;
  pais: string;
  ciudad: string;
  fechaInicio: string;
  fechaFin: string;
  enCurso: boolean;
  promedio?: string;
  descripcion?: string;
}

export interface CapacitacionDocente {
  id: string;
  nombreCapacitacion: string;
  tipoCapacitacion: string;
  institucionOrganizadora: string;
  modalidad: string;
  fechaInicio: string;
  fechaFin: string;
  duracionHoras: number;
  certificado: boolean;
  descripcion?: string;
}

export interface ActualizacionDisciplinar {
  id: string;
  tema: string;
  tipoActividad: string;
  institucion: string;
  fechaRealizacion: string;
  duracionHoras: number;
  certificadoObtenido: boolean;
  relevanciaAcademica: string;
}

export interface GestionAcademica {
  id: string;
  cargo: string;
  dependencia: string;
  institucion: string;
  fechaInicio: string;
  fechaFin: string;
  enEjercicio: boolean;
  responsabilidades: string[];
  logrosObtenidos?: string;
}

export interface ProductosAcademicos {
  id: string;
  tipoProducto: string;
  titulo: string;
  descripcion: string;
  fechaPublicacion: string;
  editorial?: string;
  isbn?: string;
  doi?: string;
  coautores?: string[];
  estado: string;
}

export interface ExperienciaProfesionalNoAcademica {
  id: string;
  cargo: string;
  empresa: string;
  sector: string;
  tipoContrato: string;
  fechaInicio: string;
  fechaFin: string;
  enEjercicio: boolean;
  responsabilidades: string[];
  logrosObtenidos?: string;
  referenciaContacto?: string;
}

export interface LogrosProfesionales {
  id: string;
  tipoLogro: string;
  titulo: string;
  descripcion: string;
  institucionOtorgante: string;
  fechaObtencion: string;
  vigencia?: string;
  documentoSoporte?: string;
}

export interface ParticipacionInstituciones {
  id: string;
  tipoParticipacion: string;
  nombreInstitucion: string;
  cargo?: string;
  fechaInicio: string;
  fechaFin: string;
  activo: boolean;
  actividades: string[];
  aportes?: string;
}

export interface ReconocimientosObtenidos {
  id: string;
  tipoReconocimiento: string;
  titulo: string;
  descripcion: string;
  institucionOtorgante: string;
  fechaObtencion: string;
  categoria: string;
  documentoSoporte?: string;
}

export interface AportacionesRelevantes {
  id: string;
  tipoAportacion: string;
  titulo: string;
  descripcion: string;
  fechaRealizacion: string;
  beneficiarios?: string;
  impacto?: string;
  evidencias?: string[];
}

// Tipos de enums
export enum SeccionesCV {
  DATOS_BASICOS = 'datos-basicos',
  FORMACION_ACADEMICA = 'formacion-academica',
  CAPACITACION_DOCENTE = 'capacitacion-docente',
  ACTUALIZACION_DISCIPLINAR = 'actualizacion-disciplinar',
  GESTION_ACADEMICA = 'gestion-academica',
  PRODUCTOS_ACADEMICOS = 'productos-academicos',
  EXPERIENCIA_PROFESIONAL = 'experiencia-profesional',
  LOGROS_PROFESIONALES = 'logros-profesionales',
  PARTICIPACION_INSTITUCIONES = 'participacion-instituciones',
  RECONOCIMIENTOS = 'reconocimientos',
  APORTACIONES_RELEVANTES = 'aportaciones-relevantes'
}

export enum TipoDocumento {
  CEDULA = 'cedula',
  PASAPORTE = 'pasaporte',
  TARJETA_IDENTIDAD = 'tarjeta-identidad'
}

export enum NivelEducativo {
  BACHILLER = 'bachiller',
  TECNICO = 'tecnico',
  PREGRADO = 'pregrado',
  ESPECIALIZACION = 'especializacion',
  MAESTRIA = 'maestria',
  DOCTORADO = 'doctorado',
  POSTDOCTORADO = 'postdoctorado'
}

// Interfaz principal del CV
export interface CVCompleto {
  id: string;
  usuarioId: string;
  datosBasicos: DatosBasicos;
  formacionAcademica: FormacionAcademica[];
  capacitacionDocente: CapacitacionDocente[];
  actualizacionDisciplinar: ActualizacionDisciplinar[];
  gestionAcademica: GestionAcademica[];
  productosAcademicos: ProductosAcademicos[];
  experienciaProfesional: ExperienciaProfesionalNoAcademica[];
  logrosProfesionales: LogrosProfesionales[];
  participacionInstituciones: ParticipacionInstituciones[];
  reconocimientosObtenidos: ReconocimientosObtenidos[];
  aportacionesRelevantes: AportacionesRelevantes[];
  fechaCreacion: string;
  fechaActualizacion: string;
}

// Configuración de las secciones
export interface SeccionConfig {
  id: SeccionesCV;
  titulo: string;
  icono: string;
  descripcion: string;
  activa: boolean;
} 