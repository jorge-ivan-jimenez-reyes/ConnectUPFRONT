import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { DiaSemana } from '../../interfaces/disponibilidad.interfaces';

interface CeldaDisponibilidadProps {
  dia: DiaSemana;
  hora: string;
  disponible: boolean;
  onClick: () => void;
  isDragMode: 'select' | 'deselect';
  isDragging: boolean;
}

export const CeldaDisponibilidad: React.FC<CeldaDisponibilidadProps> = ({
  dia,
  hora,
  disponible,
  onClick,
  isDragMode,
  isDragging
}) => {
  const celdaId = `${dia}-${hora}`;
  
  const {
    attributes: dragAttributes,
    listeners: dragListeners,
    setNodeRef: setDragRef,
    transform,
    isDragging: isDragActive,
  } = useDraggable({
    id: celdaId,
  });

  const {
    isOver,
    setNodeRef: setDropRef,
  } = useDroppable({
    id: celdaId,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  // Combinar las referencias
  const setNodeRef = (node: HTMLElement | null) => {
    setDragRef(node);
    setDropRef(node);
  };

  // Determinar la clase CSS basada en el estado
  const getCeldaClass = () => {
    let baseClass = "h-8 border-t border-l border-gray-100 cursor-pointer transition-all duration-150 relative ";
    
    if (disponible) {
      baseClass += "bg-green-200 hover:bg-green-300 ";
    } else {
      baseClass += "bg-white hover:bg-gray-50 ";
    }
    
    if (isOver && isDragging) {
      if (isDragMode === 'select') {
        baseClass += "bg-green-100 border-green-300 ";
      } else {
        baseClass += "bg-red-100 border-red-300 ";
      }
    }
    
    if (isDragActive) {
      baseClass += "opacity-50 scale-95 ";
    }
    
    return baseClass;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={getCeldaClass()}
      onClick={onClick}
      {...dragAttributes}
      {...dragListeners}
    >
      {/* Indicador visual para celdas disponibles */}
      {disponible && (
        <div className="absolute inset-1 bg-green-400 rounded-sm opacity-70"></div>
      )}
      
      {/* Indicador de hover durante el drag */}
      {isOver && isDragging && (
        <div className={`absolute inset-0 border-2 border-dashed ${
          isDragMode === 'select' ? 'border-green-500' : 'border-red-500'
        }`}></div>
      )}
    </div>
  );
}; 