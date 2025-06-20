import { useState, useCallback } from 'react';
import { 
  BloqueDisponibilidad, 
  DiaSemana, 
  ConfiguracionCalendario,
  EstadisticasDisponibilidad 
} from '../interfaces/disponibilidad.interfaces';

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

  // Estado inicial con algunos bloques de disponibilidad predeterminados
  const [disponibilidad, setDisponibilidad] = useState<BloqueDisponibilidad[]>([
    // Lunes: 7:00-12:00, 14:00-19:00
    ...generarBloquesConsecutivos('lunes-manana', DiaSemana.LUNES, '07:00', '12:00'),
    ...generarBloquesConsecutivos('lunes-tarde', DiaSemana.LUNES, '14:00', '19:00'),
    
    // Miércoles: 9:00-16:00
    ...generarBloquesConsecutivos('miercoles', DiaSemana.MIERCOLES, '09:00', '16:00'),
    
    // Viernes: 9:00-20:00
    ...generarBloquesConsecutivos('viernes', DiaSemana.VIERNES, '09:00', '20:00'),
  ]);

  const [cicloSeleccionado, setCicloSeleccionado] = useState('1238');
  const [isLoading, setIsLoading] = useState(false);

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
  function generarBloquesConsecutivos(
    baseId: string, 
    dia: DiaSemana, 
    inicio: string, 
    fin: string
  ): BloqueDisponibilidad[] {
    return [{
      id: `${baseId}-${Date.now()}`,
      dia,
      horaInicio: inicio,
      horaFin: fin,
      disponible: true
    }];
  }

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

    // Datos computados
    horarios: generarHorarios(),
    estadisticas: calcularEstadisticas(),

    // Acciones
    estaDisponible,
    toggleDisponibilidad,
    arrastrarDisponibilidad,
    limpiarDisponibilidad,
    setCicloSeleccionado,
    setIsLoading
  };
}; 