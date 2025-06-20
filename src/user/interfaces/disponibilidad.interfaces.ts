// Interfaces para la disponibilidad de horarios de docentes
import { DiaSemana } from './horario.interfaces';

export interface BloqueDisponibilidad {
  id: string;
  dia: DiaSemana;
  horaInicio: string;
  horaFin: string;
  disponible: boolean;
}

export interface DisponibilidadSemanal {
  docenteId: string;
  ciclo: string;
  bloques: BloqueDisponibilidad[];
  fechaCreacion: string;
  fechaActualizacion: string;
}

// Configuración del calendario
export interface ConfiguracionCalendario {
  horaInicio: string;
  horaFin: string;
  intervaloHoras: number;
  diasSemana: DiaSemana[];
}

// Estado de una celda del calendario
export interface CeldaCalendario {
  dia: DiaSemana;
  hora: string;
  disponible: boolean;
  seleccionable: boolean;
}

// Datos para drag and drop
export interface DragDropData {
  type: 'disponibilidad';
  celda: CeldaCalendario;
}

// Estadísticas de disponibilidad
export interface EstadisticasDisponibilidad {
  totalHorasDisponibles: number;
  horasPorDia: Record<DiaSemana, number>;
  porcentajeDisponibilidad: number;
} 