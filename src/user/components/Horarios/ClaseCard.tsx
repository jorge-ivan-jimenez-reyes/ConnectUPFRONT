import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { ClaseHorario } from '../../interfaces/horario.interfaces';
import { 
  FaCode, 
  FaLaptopCode, 
  FaTerminal, 
  FaDatabase, 
  FaPalette,
  FaUsers,
  FaMapMarkerAlt
} from 'react-icons/fa';

interface ClaseCardProps {
  clase: ClaseHorario;
  isDragging?: boolean;
  isInCalendar?: boolean;
  onClick?: () => void;
}

export const ClaseCard: React.FC<ClaseCardProps> = ({ 
  clase, 
  isDragging = false,
  isInCalendar = false,
  onClick 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging: isDrag,
  } = useDraggable({
    id: clase.id,
    disabled: isInCalendar
  });

  const getIconoClase = (icono: string) => {
    const iconos: Record<string, JSX.Element> = {
      'code': <FaCode size={20} color="white" />,
      'laptop-code': <FaLaptopCode size={20} color="white" />,
      'terminal': <FaTerminal size={20} color="white" />,
      'database': <FaDatabase size={20} color="white" />,
      'palette': <FaPalette size={20} color="white" />,
      'default': <FaCode size={20} color="white" />
    };
    return iconos[icono] || iconos.default;
  };

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`
        ${clase.color} text-white p-3 rounded-lg shadow-sm
        ${isDragging || isDrag ? 'opacity-50 shadow-xl scale-105' : 'hover:shadow-md'}
        ${isInCalendar ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'}
        ${isInCalendar ? 'w-full' : 'w-full'}
        transition-all duration-200
        select-none
      `}
    >
      <div className="flex items-start gap-3">
        {/* Icono */}
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
          {getIconoClase(clase.icono)}
        </div>
        
        {/* Contenido */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm leading-tight mb-1">
            {clase.nombre}
          </h3>
          <p className="text-xs text-white/80 mb-2">
            {clase.codigo}
          </p>
          
          {/* Info adicional */}
          <div className="flex items-center gap-3 text-xs text-white/70">
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt size={10} />
              <span>{clase.aula}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaUsers size={10} />
              <span>{clase.estudiantes}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicador de arrastre */}
      {!isInCalendar && (
        <div className="absolute top-2 right-2 text-white/60">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
          </svg>
        </div>
      )}
    </div>
  );
}; 