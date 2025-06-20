import { useState, useCallback } from 'react';
import { 
  ClaseHorario, 
  HorarioBloque, 
  DiaSemana, 
  EstadisticasHorario,
  COLORES_MATERIAS 
} from '../interfaces/horario.interfaces';

export const useHorarios = () => {
  // Estados
  const [clasesDisponibles, setClasesDisponibles] = useState<ClaseHorario[]>([
    {
      id: 'clase-1',
      nombre: 'Desarrollo Frontend',
      codigo: 'WEB301',
      color: COLORES_MATERIAS.programacion,
      icono: 'laptop-code',
      aula: 'Lab 301',
      estudiantes: 28,
      descripcion: 'Desarrollo de aplicaciones web modernas'
    },
    {
      id: 'clase-2',
      nombre: 'React Avanzado',
      codigo: 'REACT401',
      color: COLORES_MATERIAS.programacion,
      icono: 'code',
      aula: 'Lab 205',
      estudiantes: 22,
      descripcion: 'Conceptos avanzados de React y hooks'
    },
    {
      id: 'clase-3',
      nombre: 'Base de Datos',
      codigo: 'DB201',
      color: COLORES_MATERIAS['base-datos'],
      icono: 'database',
      aula: 'Aula 101',
      estudiantes: 35,
      descripcion: 'Fundamentos de bases de datos relacionales'
    },
    {
      id: 'clase-4',
      nombre: 'Diseño UX/UI',
      codigo: 'DES301',
      color: COLORES_MATERIAS.diseno,
      icono: 'palette',
      aula: 'Aula 205',
      estudiantes: 25,
      descripcion: 'Principios de diseño de interfaces'
    },
    {
      id: 'clase-5',
      nombre: 'Algoritmos',
      codigo: 'ALG201',
      color: COLORES_MATERIAS.algoritmos,
      icono: 'terminal',
      aula: 'Lab 102',
      estudiantes: 30,
      descripcion: 'Estructuras de datos y algoritmos'
    }
  ]);

  const [horarioSemanal, setHorarioSemanal] = useState<HorarioBloque[]>([
    {
      id: 'bloque-1',
      claseId: 'clase-1',
      dia: DiaSemana.LUNES,
      horaInicio: '09:00',
      horaFin: '11:00',
      duracion: 2
    },
    {
      id: 'bloque-2',
      claseId: 'clase-2',
      dia: DiaSemana.MARTES,
      horaInicio: '14:00',
      horaFin: '16:00',
      duracion: 2
    },
    {
      id: 'bloque-3',
      claseId: 'clase-1',
      dia: DiaSemana.MIERCOLES,
      horaInicio: '09:00',
      horaFin: '11:00',
      duracion: 2
    },
    {
      id: 'bloque-4',
      claseId: 'clase-2',
      dia: DiaSemana.JUEVES,
      horaInicio: '14:00',
      horaFin: '16:00',
      duracion: 2
    },
    {
      id: 'bloque-5',
      claseId: 'clase-3',
      dia: DiaSemana.VIERNES,
      horaInicio: '08:00',
      horaFin: '12:00',
      duracion: 4
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Configuración del calendario
  const calendarioConfig = {
    horaInicio: '07:00',
    horaFin: '22:00',
    intervaloMinutos: 60,
    diasSemana: [
      DiaSemana.LUNES, 
      DiaSemana.MARTES, 
      DiaSemana.MIERCOLES, 
      DiaSemana.JUEVES, 
      DiaSemana.VIERNES
    ],
    mostrarFinSemana: false
  };

  // Generar horarios del calendario
  const generarHorarios = useCallback(() => {
    const horarios = [];
    let horaActual = parseInt(calendarioConfig.horaInicio.split(':')[0]);
    const horaFinal = parseInt(calendarioConfig.horaFin.split(':')[0]);

    while (horaActual <= horaFinal) {
      horarios.push(`${horaActual.toString().padStart(2, '0')}:00`);
      horaActual++;
    }
    return horarios;
  }, [calendarioConfig]);

  // Obtener clase por ID
  const getClasePorId = useCallback((claseId: string) => {
    return clasesDisponibles.find(clase => clase.id === claseId);
  }, [clasesDisponibles]);

  // Obtener bloques por día y hora
  const getBloqueEnHora = useCallback((dia: DiaSemana, hora: string) => {
    return horarioSemanal.find(bloque => 
      bloque.dia === dia && 
      hora >= bloque.horaInicio && 
      hora < bloque.horaFin
    );
  }, [horarioSemanal]);

  // Mover clase en el calendario
  const moverClase = useCallback((
    claseId: string, 
    nuevoDia: DiaSemana, 
    nuevaHora: string,
    duracion: number = 2
  ) => {
    setHorarioSemanal(prev => {
      // Remover el bloque anterior de esta clase
      const sinBloqueAnterior = prev.filter(bloque => bloque.claseId !== claseId);
      
      // Crear nuevo bloque
      const nuevoBloque: HorarioBloque = {
        id: `bloque-${Date.now()}`,
        claseId,
        dia: nuevoDia,
        horaInicio: nuevaHora,
        horaFin: calcularHoraFin(nuevaHora, duracion),
        duracion
      };

      return [...sinBloqueAnterior, nuevoBloque];
    });
  }, []);

  // Remover clase del calendario
  const removerClase = useCallback((claseId: string) => {
    setHorarioSemanal(prev => prev.filter(bloque => bloque.claseId !== claseId));
  }, []);

  // Calcular hora fin
  const calcularHoraFin = (horaInicio: string, duracion: number): string => {
    const [hora] = horaInicio.split(':');
    const horaFin = parseInt(hora) + duracion;
    return `${horaFin.toString().padStart(2, '0')}:00`;
  };

  // Calcular estadísticas
  const calcularEstadisticas = useCallback((): EstadisticasHorario => {
    const clasesConHorario = horarioSemanal.filter(bloque => bloque.claseId);
    const clasesUnicas = new Set(clasesConHorario.map(b => b.claseId));
    const aulasUnicas = new Set();
    let totalEstudiantes = 0;
    let totalHoras = 0;

    clasesConHorario.forEach(bloque => {
      if (bloque.claseId) {
        const clase = getClasePorId(bloque.claseId);
        if (clase) {
          aulasUnicas.add(clase.aula);
          totalEstudiantes += clase.estudiantes;
          totalHoras += bloque.duracion;
        }
      }
    });

    return {
      totalHoras,
      clasesActivas: clasesUnicas.size,
      aulasUtilizadas: aulasUnicas.size,
      totalEstudiantes,
      promedioPorClase: clasesUnicas.size > 0 ? Math.round(totalEstudiantes / clasesUnicas.size) : 0
    };
  }, [horarioSemanal, getClasePorId]);

  // Validar conflictos de horario
  const validarConflicto = useCallback((
    dia: DiaSemana, 
    horaInicio: string, 
    horaFin: string,
    excludeClaseId?: string
  ): boolean => {
    return horarioSemanal.some(bloque => {
      if (excludeClaseId && bloque.claseId === excludeClaseId) return false;
      
      return bloque.dia === dia && (
        (horaInicio >= bloque.horaInicio && horaInicio < bloque.horaFin) ||
        (horaFin > bloque.horaInicio && horaFin <= bloque.horaFin) ||
        (horaInicio <= bloque.horaInicio && horaFin >= bloque.horaFin)
      );
    });
  }, [horarioSemanal]);

  return {
    // Estado
    clasesDisponibles,
    horarioSemanal,
    isLoading,
    error,
    calendarioConfig,

    // Datos computados
    horarios: generarHorarios(),
    estadisticas: calcularEstadisticas(),

    // Acciones
    moverClase,
    removerClase,
    getClasePorId,
    getBloqueEnHora,
    validarConflicto,

    // Utilidades
    setError,
    setIsLoading
  };
}; 