import React, { useState, useRef } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { DiaSemana } from '../../interfaces/disponibilidad.interfaces';
import { useDisponibilidad } from '../../hooks/useDisponibilidad';
import { CeldaDisponibilidad } from './CeldaDisponibilidad';

export const CalendarioDisponibilidad: React.FC = () => {
  const {
    horarios,
    configuracion,
    estaDisponible,
    toggleDisponibilidad,
    arrastrarDisponibilidad
  } = useDisponibilidad();

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{dia: DiaSemana, hora: string} | null>(null);
  const [dragMode, setDragMode] = useState<'select' | 'deselect'>('select');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const diasLabels = {
    [DiaSemana.LUNES]: 'L',
    [DiaSemana.MARTES]: 'M',
    [DiaSemana.MIERCOLES]: 'M',
    [DiaSemana.JUEVES]: 'J',
    [DiaSemana.VIERNES]: 'V',
    [DiaSemana.SABADO]: 'S'
  };

  const handleDragStart = (event: DragStartEvent) => {
    const [dia, hora] = (event.active.id as string).split('-');
    const diaEnum = dia as DiaSemana;
    
    setDragStart({ dia: diaEnum, hora });
    setDragMode(estaDisponible(diaEnum, hora) ? 'deselect' : 'select');
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    
    if (over && dragStart) {
      const [diaFin, horaFin] = (over.id as string).split('-');
      const diaFinEnum = diaFin as DiaSemana;
      
      arrastrarDisponibilidad(
        dragStart.dia,
        dragStart.hora,
        diaFinEnum,
        horaFin,
        dragMode === 'select'
      );
    }
    
    setIsDragging(false);
    setDragStart(null);
  };

  const handleCeldaClick = (dia: DiaSemana, hora: string) => {
    if (!isDragging) {
      toggleDisponibilidad(dia, hora);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {/* Grid del calendario */}
        <div className="overflow-auto">
          <div className="grid grid-cols-7 min-w-[800px]">
            {/* Header - espacio vacío para la columna de horas */}
            <div className="bg-gray-50 border-b border-gray-200"></div>
            
            {/* Headers de días */}
            {configuracion.diasSemana.map(dia => (
              <div 
                key={dia} 
                className="text-sm font-medium text-gray-900 text-center py-3 bg-gray-50 border-b border-l border-gray-200"
              >
                {diasLabels[dia]}
              </div>
            ))}
            
            {/* Filas de horarios */}
            {horarios.map(hora => (
              <React.Fragment key={hora}>
                {/* Columna de hora */}
                <div className="text-xs text-gray-600 text-center py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-center">
                  {hora}
                </div>
                
                {/* Celdas de disponibilidad */}
                {configuracion.diasSemana.map(dia => (
                  <CeldaDisponibilidad
                    key={`${dia}-${hora}`}
                    dia={dia}
                    hora={hora}
                    disponible={estaDisponible(dia, hora)}
                    onClick={() => handleCeldaClick(dia, hora)}
                    isDragMode={dragMode}
                    isDragging={isDragging}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
}; 