// Interfaces para la funcionalidad de Horarios

export interface ClaseHorario {
  id: string;
  nombre: string;
  codigo: string;
  color: string;
  icono: string;
  aula: string;
  estudiantes: number;
  descripcion?: string;
  profesor?: string;
}

export interface HorarioBloque {
  id: string;
  claseId: string | null;
  dia: DiaSemana;
  horaInicio: string;
  horaFin: string;
  duracion: number; // en horas
}

export interface SemanaHorario {
  id: string;
  semana: string;
  fechaInicio: string;
  fechaFin: string;
  bloques: HorarioBloque[];
}

export interface DisponibilidadHorario {
  id: string;
  profesorId: string;
  dia: DiaSemana;
  horaInicio: string;
  horaFin: string;
  disponible: boolean;
  motivo?: string;
}

// Enums
export enum DiaSemana {
  LUNES = 'lunes',
  MARTES = 'martes',
  MIERCOLES = 'miercoles',
  JUEVES = 'jueves',
  VIERNES = 'viernes',
  SABADO = 'sabado',
  DOMINGO = 'domingo'
}

export enum TipoClase {
  TEORIA = 'teoria',
  LABORATORIO = 'laboratorio',
  PRACTICA = 'practica',
  SEMINARIO = 'seminario',
  TALLER = 'taller'
}

export enum EstadoHorario {
  BORRADOR = 'borrador',
  ACTIVO = 'activo',
  PAUSADO = 'pausado',
  ARCHIVADO = 'archivado'
}

// DTOs para drag and drop
export interface DragData {
  type: 'clase' | 'bloque';
  id: string;
  sourceContainer?: string;
}

export interface DropData {
  dia: DiaSemana;
  hora: string;
  bloqueId?: string;
}

// Utilidades para el calendario
export interface CalendarioConfig {
  horaInicio: string;
  horaFin: string;
  intervaloMinutos: number;
  diasSemana: DiaSemana[];
  mostrarFinSemana: boolean;
}

export interface EstadisticasHorario {
  totalHoras: number;
  clasesActivas: number;
  aulasUtilizadas: number;
  totalEstudiantes: number;
  promedioPorClase: number;
}

// Colores predefinidos para las materias (consistentes con la app)
export const COLORES_MATERIAS = {
  'programacion': 'bg-blue-500',
  'matematicas': 'bg-purple-500', 
  'diseno': 'bg-pink-500',
  'base-datos': 'bg-green-500',
  'redes': 'bg-orange-500',
  'algoritmos': 'bg-red-500',
  'ingles': 'bg-indigo-500',
  'fisica': 'bg-yellow-500',
  'default': 'bg-gray-500'
} as const;

export type ColorMateria = keyof typeof COLORES_MATERIAS; 