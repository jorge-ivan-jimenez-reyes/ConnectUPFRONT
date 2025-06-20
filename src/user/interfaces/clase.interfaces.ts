export interface ClaseInfo {
  id: string;
  materia: string;
  tema: string;
  horaInicio: string;
  horaFin: string;
  aula: string;
  profesor?: string;
  dia: string;
  color?: string;
}

export interface HorarioClase {
  dia: string;
  horaInicio: string;
  horaFin: string;
  aula: string;
}

export interface ClaseDetalle {
  id: string;
  materia: string;
  codigo?: string;
  profesor?: string;
  horarios: HorarioClase[];
  estudiantes?: number;
  creditos?: number;
  ciclo: string;
}

export interface HorarioSemanal {
  [dia: string]: ClaseInfo[];
}

export interface EstadisticasClases {
  totalClases: number;
  clasesHoy: number;
  proximaClase?: ClaseInfo;
  clasesCompletadas: number;
} 