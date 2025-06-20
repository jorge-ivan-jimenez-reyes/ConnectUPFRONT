// Interfaces para la funcionalidad de Temarios

export interface Materia {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  color: string;
  academia: string;
  estado: EstadoMateria;
  codigo?: string;
  creditos?: number;
  prerequisitos?: string[];
}

export interface TemarioDetalle {
  id: string;
  materiaId: string;
  denominacion: string;
  clave: string;
  cicloEscolar: string;
  bloque: string;
  finesAprendizaje: string;
  contenidoTematico: ContenidoTematico[];
  objetivos: string[];
  metodologia: string[];
  evaluacion: CriterioEvaluacion[];
  bibliografia: Bibliografia[];
  profesor?: string;
  fechaActualizacion: string;
}

export interface ContenidoTematico {
  id: string;
  numero: number;
  titulo: string;
  subtemas: Subtema[];
  duracion?: string;
  objetivosEspecificos?: string[];
}

export interface Subtema {
  id: string;
  numero: string;
  titulo: string;
  descripcion?: string;
  ejemplos?: string[];
  recursos?: string[];
}

export interface CriterioEvaluacion {
  id: string;
  tipo: TipoEvaluacion;
  descripcion: string;
  porcentaje: number;
  fechaEntrega?: string;
}

export interface Bibliografia {
  id: string;
  tipo: TipoBibliografia;
  autor: string;
  titulo: string;
  editorial?: string;
  año?: number;
  isbn?: string;
  url?: string;
}

export interface PreferenciaClases {
  id: string;
  usuarioId: string;
  academia: string;
  materiasSeleccionadas: string[];
  fechaSeleccion: string;
  activo: boolean;
}

export interface Academia {
  id: string;
  nombre: string;
  descripcion: string;
  materias: Materia[];
  activa: boolean;
}

// Enums
export enum EstadoMateria {
  DISPONIBLE = 'disponible',
  SELECCIONADA = 'seleccionada',
  AÑADIDA = 'añadida',
  COMPLETADA = 'completada'
}

export enum TipoEvaluacion {
  EXAMEN = 'examen',
  PROYECTO = 'proyecto',
  TAREA = 'tarea',
  PARTICIPACION = 'participacion',
  PRESENTACION = 'presentacion'
}

export enum TipoBibliografia {
  LIBRO = 'libro',
  ARTICULO = 'articulo',
  WEB = 'web',
  REVISTA = 'revista',
  TESIS = 'tesis'
}

// DTOs para API
export interface CreatePreferenciaDTO {
  academia: string;
  materiasSeleccionadas: string[];
}

export interface UpdatePreferenciaDTO {
  materiasSeleccionadas: string[];
}

export interface TemarioFilterDTO {
  academia?: string;
  materia?: string;
  estado?: EstadoMateria;
  busqueda?: string;
} 