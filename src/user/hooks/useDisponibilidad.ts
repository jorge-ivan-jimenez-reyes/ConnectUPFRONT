import { useState, useCallback, useEffect } from 'react';
import { 
  BloqueDisponibilidad, 
  DiaSemana, 
  ConfiguracionCalendario,
  EstadisticasDisponibilidad 
} from '../interfaces/disponibilidad.interfaces';
import { availabilityService, AvailabilitySlotAPI, SlotInput } from '../../shared/services/api';

// ============================================================================
// MAPEO ENTRE FRONTEND Y BACKEND
// ============================================================================

/** Mapeo de número de día (backend) a DiaSemana (frontend) */
const DAY_NUMBER_TO_DIA: Record<number, DiaSemana> = {
  1: DiaSemana.LUNES,
  2: DiaSemana.MARTES,
  3: DiaSemana.MIERCOLES,
  4: DiaSemana.JUEVES,
  5: DiaSemana.VIERNES,
  6: DiaSemana.SABADO,
};

/** Mapeo inverso: DiaSemana a número */
const DIA_TO_DAY_NUMBER: Record<DiaSemana, number> = {
  [DiaSemana.LUNES]: 1,
  [DiaSemana.MARTES]: 2,
  [DiaSemana.MIERCOLES]: 3,
  [DiaSemana.JUEVES]: 4,
  [DiaSemana.VIERNES]: 5,
  [DiaSemana.SABADO]: 6,
  [DiaSemana.DOMINGO]: 7, // No usado normalmente
};

/** Convierte slots del backend a bloques del frontend */
function slotsToBlocks(slots: AvailabilitySlotAPI[]): BloqueDisponibilidad[] {
  return slots.map(slot => {
    const hora = slot.time_slot.substring(0, 5); // "07:00:00" -> "07:00"
    const horaNum = parseInt(hora.split(':')[0]);
    
    return {
      id: `${slot.day_of_week}-${hora}-${slot.id}`,
      dia: DAY_NUMBER_TO_DIA[slot.day_of_week] || DiaSemana.LUNES,
      horaInicio: hora,
      horaFin: `${(horaNum + 1).toString().padStart(2, '0')}:00`,
      disponible: true,
    };
  });
}

/** Convierte bloques del frontend a slots para el backend */
function blocksToSlots(blocks: BloqueDisponibilidad[]): SlotInput[] {
  const slots: SlotInput[] = [];
  
  blocks.forEach(block => {
    if (!block.disponible) return;
    
    const dayNumber = DIA_TO_DAY_NUMBER[block.dia];
    const startHour = parseInt(block.horaInicio.split(':')[0]);
    const endHour = parseInt(block.horaFin.split(':')[0]);
    
    // Crear un slot por cada hora en el rango
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push({
        day_of_week: dayNumber,
        time_slot: `${hour.toString().padStart(2, '0')}:00`,
      });
    }
  });
  
  return slots;
}

// ============================================================================
// HOOK
// ============================================================================

export const useDisponibilidad = () => {
  // Configuración del calendario
  const configuracion: ConfiguracionCalendario = {
    horaInicio: '07:00',
    horaFin: '22:00',
    intervaloHoras: 1,
    diasSemana: [
      DiaSemana.LUNES,
      DiaSemana.MARTES, 
      DiaSemana.MIERCOLES,
      DiaSemana.JUEVES,
      DiaSemana.VIERNES,
      DiaSemana.SABADO
    ]
  };

  const [disponibilidad, setDisponibilidad] = useState<BloqueDisponibilidad[]>([]);
  const [cicloSeleccionado, setCicloSeleccionado] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // =========================================================================
  // CARGAR DISPONIBILIDAD DEL BACKEND
  // =========================================================================
  const cargarDisponibilidad = useCallback(async (cycleId?: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const slots = await availabilityService.getMyAvailability(cycleId);
      const bloques = slotsToBlocks(slots);
      setDisponibilidad(bloques);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar disponibilidad';
      setError(message);
      console.error('Error cargando disponibilidad:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cargar al montar o cambiar ciclo
  useEffect(() => {
    if (cicloSeleccionado) {
      cargarDisponibilidad(parseInt(cicloSeleccionado));
    }
  }, [cicloSeleccionado, cargarDisponibilidad]);

  // =========================================================================
  // GUARDAR DISPONIBILIDAD EN EL BACKEND
  // =========================================================================
  const guardarDisponibilidad = useCallback(async (): Promise<boolean> => {
    if (!cicloSeleccionado) {
      setError('Selecciona un ciclo primero');
      return false;
    }

    setIsSaving(true);
    setError(null);

    try {
      const slots = blocksToSlots(disponibilidad);
      await availabilityService.save({
        cycle_id: parseInt(cicloSeleccionado),
        slots,
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al guardar disponibilidad';
      setError(message);
      console.error('Error guardando disponibilidad:', err);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [cicloSeleccionado, disponibilidad]);

  // =========================================================================
  // FUNCIONES DE MANIPULACIÓN LOCAL
  // =========================================================================

  // Generar horarios disponibles
  const generarHorarios = useCallback(() => {
    const horarios = [];
    let horaActual = parseInt(configuracion.horaInicio.split(':')[0]);
    const horaFinal = parseInt(configuracion.horaFin.split(':')[0]);

    while (horaActual <= horaFinal) {
      horarios.push(`${horaActual.toString().padStart(2, '0')}:00`);
      horaActual += configuracion.intervaloHoras;
    }
    return horarios;
  }, [configuracion]);

  // Verificar si una hora está disponible
  const estaDisponible = useCallback((dia: DiaSemana, hora: string): boolean => {
    return disponibilidad.some(bloque => 
      bloque.dia === dia && 
      bloque.disponible && 
      hora >= bloque.horaInicio && 
      hora < bloque.horaFin
    );
  }, [disponibilidad]);

  // Toggle disponibilidad de una celda
  const toggleDisponibilidad = useCallback((dia: DiaSemana, hora: string) => {
    const disponible = estaDisponible(dia, hora);
    
    if (disponible) {
      // Remover disponibilidad
      setDisponibilidad(prev => 
        prev.filter(bloque => !(
          bloque.dia === dia && 
          hora >= bloque.horaInicio && 
          hora < bloque.horaFin
        ))
      );
    } else {
      // Agregar disponibilidad
      const nuevoBloque: BloqueDisponibilidad = {
        id: `${dia}-${hora}-${Date.now()}`,
        dia,
        horaInicio: hora,
        horaFin: calcularHoraSiguiente(hora),
        disponible: true
      };
      setDisponibilidad(prev => [...prev, nuevoBloque]);
    }
  }, [estaDisponible]);

  // Arrastrar para seleccionar/deseleccionar múltiples celdas
  const arrastrarDisponibilidad = useCallback((
    diaInicio: DiaSemana, 
    horaInicio: string,
    diaFin: DiaSemana,
    horaFin: string,
    hacerDisponible: boolean
  ) => {
    if (diaInicio !== diaFin) return; // Solo permitir arrastre en el mismo día

    const horarios = generarHorarios();
    const indexInicio = horarios.indexOf(horaInicio);
    const indexFin = horarios.indexOf(horaFin);
    
    if (indexInicio === -1 || indexFin === -1) return;

    const [inicio, fin] = indexInicio <= indexFin ? [indexInicio, indexFin] : [indexFin, indexInicio];
    
    if (hacerDisponible) {
      // Crear bloque continuo
      const nuevoBloque: BloqueDisponibilidad = {
        id: `${diaInicio}-${horaInicio}-${horaFin}-${Date.now()}`,
        dia: diaInicio,
        horaInicio: horarios[inicio],
        horaFin: calcularHoraSiguiente(horarios[fin]),
        disponible: true
      };
      
      // Remover bloques existentes en el rango
      setDisponibilidad(prev => {
        const sinConflictos = prev.filter(bloque => !(
          bloque.dia === diaInicio &&
          ((bloque.horaInicio >= horarios[inicio] && bloque.horaInicio <= horarios[fin]) ||
           (bloque.horaFin > horarios[inicio] && bloque.horaFin <= calcularHoraSiguiente(horarios[fin])))
        ));
        return [...sinConflictos, nuevoBloque];
      });
    } else {
      // Remover disponibilidad en el rango
      setDisponibilidad(prev => 
        prev.filter(bloque => !(
          bloque.dia === diaInicio &&
          ((bloque.horaInicio >= horarios[inicio] && bloque.horaInicio <= horarios[fin]) ||
           (bloque.horaFin > horarios[inicio] && bloque.horaFin <= calcularHoraSiguiente(horarios[fin])))
        ))
      );
    }
  }, [generarHorarios]);

  // Calcular estadísticas
  const calcularEstadisticas = useCallback((): EstadisticasDisponibilidad => {
    const totalHoras = generarHorarios().length * configuracion.diasSemana.length;
    let horasDisponibles = 0;
    const horasPorDia: Record<DiaSemana, number> = {
      [DiaSemana.LUNES]: 0,
      [DiaSemana.MARTES]: 0,
      [DiaSemana.MIERCOLES]: 0,
      [DiaSemana.JUEVES]: 0,
      [DiaSemana.VIERNES]: 0,
      [DiaSemana.SABADO]: 0
    };

    disponibilidad.forEach(bloque => {
      if (bloque.disponible) {
        const duracion = calcularDuracionBloque(bloque.horaInicio, bloque.horaFin);
        horasDisponibles += duracion;
        horasPorDia[bloque.dia] += duracion;
      }
    });

    return {
      totalHorasDisponibles: horasDisponibles,
      horasPorDia,
      porcentajeDisponibilidad: Math.round((horasDisponibles / totalHoras) * 100)
    };
  }, [disponibilidad, generarHorarios, configuracion]);

  // Limpiar toda la disponibilidad
  const limpiarDisponibilidad = useCallback(() => {
    setDisponibilidad([]);
  }, []);

  // Funciones auxiliares
  function calcularHoraSiguiente(hora: string): string {
    const [h] = hora.split(':');
    const siguienteHora = parseInt(h) + 1;
    return `${siguienteHora.toString().padStart(2, '0')}:00`;
  }

  function calcularDuracionBloque(inicio: string, fin: string): number {
    const [horaInicio] = inicio.split(':');
    const [horaFin] = fin.split(':');
    return parseInt(horaFin) - parseInt(horaInicio);
  }

  return {
    // Estado
    disponibilidad,
    cicloSeleccionado,
    configuracion,
    isLoading,
    isSaving,
    error,

    // Datos computados
    horarios: generarHorarios(),
    estadisticas: calcularEstadisticas(),

    // Acciones de backend
    cargarDisponibilidad,
    guardarDisponibilidad,

    // Acciones locales
    estaDisponible,
    toggleDisponibilidad,
    arrastrarDisponibilidad,
    limpiarDisponibilidad,
    setCicloSeleccionado,
    setIsLoading
  };
};
