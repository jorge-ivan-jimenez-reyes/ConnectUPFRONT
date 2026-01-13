/**
 * Hook para gestionar Mis Clases (horario del docente)
 * 
 * Conecta con el endpoint /v2/course-info/my-schedule/
 */

import { useState, useEffect, useCallback } from 'react';
import { myClassesService, cyclesUserService, CourseInfoAPI, CycleDropdownAPI } from '../services/userApiServices';
import { ClaseDetalle, HorarioClase } from '../interfaces/clase.interfaces';

// Mapeo de día numérico a código corto
const DAY_MAP: Record<number, string> = {
  1: 'Lu',
  2: 'Ma',
  3: 'Mi',
  4: 'Ju',
  5: 'Vi',
  6: 'Sa',
};

/**
 * Transforma los datos del backend al formato del frontend
 */
const transformCourseInfo = (course: CourseInfoAPI): ClaseDetalle => {
  const horarios: HorarioClase[] = course.schedule.map(s => ({
    dia: DAY_MAP[s.day] || s.day_field,
    horaInicio: s.start_hour.slice(0, 5), // "16:00:00" -> "16:00"
    horaFin: s.end_hour.slice(0, 5),
    aula: s.classroom || 'Sin asignar',
  }));

  return {
    id: String(course.id),
    materia: course.course_name || course.course_id?.name || 'Sin nombre',
    codigo: course.course_code || course.course_id?.code,
    profesor: course.user_name || undefined,
    ciclo: course.cycle_name || String(course.cycle_id),
    horarios,
    estudiantes: undefined, // No viene del backend
    creditos: undefined, // No viene del backend
  };
};

interface UseMisClasesResult {
  clases: ClaseDetalle[];
  isLoading: boolean;
  error: string | null;
  cicloSeleccionado: string;
  setCicloSeleccionado: (ciclo: string) => void;
  ciclosDisponibles: { id: string; nombre: string }[];
  refetch: () => void;
}

export const useMisClases = (): UseMisClasesResult => {
  const [clases, setClases] = useState<ClaseDetalle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cicloSeleccionado, setCicloSeleccionado] = useState<string>('');
  const [ciclosDisponibles, setCiclosDisponibles] = useState<{ id: string; nombre: string }[]>([]);

  // Cargar ciclos disponibles al iniciar
  useEffect(() => {
    const loadCycles = async () => {
      try {
        const cycles = await cyclesUserService.getCyclesDropdown();
        // El backend devuelve array con campo "cycle" no "name"
        const cyclesArray = Array.isArray(cycles) ? cycles : [];
        const ciclosFormateados = cyclesArray.map((c: CycleDropdownAPI) => ({
          id: String(c.id),
          nombre: c.cycle || c.name || `Ciclo ${c.id}`,
        }));
        setCiclosDisponibles(ciclosFormateados);

        // Intentar obtener el ciclo actual
        const currentCycle = await cyclesUserService.getCurrentCycle();
        if (currentCycle) {
          setCicloSeleccionado(String(currentCycle.id));
        } else if (ciclosFormateados.length > 0) {
          // Si no hay ciclo actual, usar el primero
          setCicloSeleccionado(ciclosFormateados[0].id);
        }
      } catch (err) {
        console.error('Error loading cycles:', err);
        // Si falla, usar un valor por defecto
        setCicloSeleccionado('');
      }
    };

    loadCycles();
  }, []);

  // Cargar clases cuando cambia el ciclo
  const loadClases = useCallback(async () => {
    if (!cicloSeleccionado) return;

    setIsLoading(true);
    setError(null);

    try {
      const cycleId = parseInt(cicloSeleccionado, 10);
      const response = await myClassesService.getMySchedule(cycleId);
      
      const clasesTransformadas = response.map(transformCourseInfo);
      setClases(clasesTransformadas);
    } catch (err: any) {
      console.error('Error loading classes:', err);
      setError(err.message || 'Error al cargar las clases');
      setClases([]);
    } finally {
      setIsLoading(false);
    }
  }, [cicloSeleccionado]);

  useEffect(() => {
    loadClases();
  }, [loadClases]);

  const refetch = useCallback(() => {
    loadClases();
  }, [loadClases]);

  return {
    clases,
    isLoading,
    error,
    cicloSeleccionado,
    setCicloSeleccionado,
    ciclosDisponibles,
    refetch,
  };
};
