import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { DiaSemana } from '../../interfaces/horario.interfaces';
import { useHorarios } from '../../hooks/useHorarios';
import { CalendarioGrid } from './CalendarioGrid';
import { ClaseCard } from './ClaseCard';
import { ListaClases } from './ListaClases';

interface CalendarioHorariosProps {
  onClaseClick?: (claseId: string) => void;
}

export const CalendarioHorarios: React.FC<CalendarioHorariosProps> = ({ onClaseClick }) => {
  const {
    clasesDisponibles,
    horarios,
    calendarioConfig,
    moverClase,
    getClasePorId,
    getBloqueEnHora,
    validarConflicto
  } = useHorarios();

  const [activeClase, setActiveClase] = React.useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveClase(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveClase(null);
      return;
    }

    const claseId = active.id as string;
    const dropData = JSON.parse(over.id as string);
    
    if (dropData.type === 'calendar-cell') {
      const { dia, hora } = dropData;
      
      // Validar que no haya conflicto
      const horaFin = calcularHoraFin(hora, 2); // Asumir 2 horas por defecto
      const hayConflicto = validarConflicto(dia, hora, horaFin, claseId);
      
      if (!hayConflicto) {
        moverClase(claseId, dia, hora, 2);
      } else {
        console.warn('Conflicto de horario detectado');
        // Aquí podrías mostrar un toast o mensaje de error
      }
    }
    
    setActiveClase(null);
  };

  const calcularHoraFin = (horaInicio: string, duracion: number): string => {
    const [hora] = horaInicio.split(':');
    const horaFin = parseInt(hora) + duracion;
    return `${horaFin.toString().padStart(2, '0')}:00`;
  };

  const activeClaseData = activeClase ? getClasePorId(activeClase) : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6">
        {/* Lista de clases disponibles */}
        <div className="w-80 flex-shrink-0">
          <ListaClases 
            clases={clasesDisponibles}
            onClaseClick={onClaseClick}
          />
        </div>

        {/* Calendario principal */}
        <div className="flex-1">
          <CalendarioGrid
            horarios={horarios}
            diasSemana={calendarioConfig.diasSemana}
            getBloqueEnHora={getBloqueEnHora}
            getClasePorId={getClasePorId}
            onClaseClick={onClaseClick}
          />
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeClaseData && (
          <ClaseCard 
            clase={activeClaseData}
            isDragging={true}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}; 