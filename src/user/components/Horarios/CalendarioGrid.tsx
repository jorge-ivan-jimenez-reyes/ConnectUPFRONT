import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { DiaSemana, ClaseHorario, HorarioBloque } from '../../interfaces/horario.interfaces';
import { ClaseCard } from './ClaseCard';

interface CalendarioGridProps {
  horarios: string[];
  diasSemana: DiaSemana[];
  getBloqueEnHora: (dia: DiaSemana, hora: string) => HorarioBloque | undefined;
  getClasePorId: (claseId: string) => ClaseHorario | undefined;
  onClaseClick?: (claseId: string) => void;
}

interface CalendarCellProps {
  dia: DiaSemana;
  hora: string;
  children?: React.ReactNode;
}

const CalendarCell: React.FC<CalendarCellProps> = ({ dia, hora, children }) => {
  const dropId = JSON.stringify({ type: 'calendar-cell', dia, hora });
  
  const { isOver, setNodeRef } = useDroppable({
    id: dropId,
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        min-h-[60px] border-t border-gray-100 p-1 relative
        ${isOver ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}
        transition-colors duration-200
      `}
    >
      {children}
    </div>
  );
};

export const CalendarioGrid: React.FC<CalendarioGridProps> = ({
  horarios,
  diasSemana,
  getBloqueEnHora,
  getClasePorId,
  onClaseClick
}) => {
  const diasLabels = {
    [DiaSemana.LUNES]: 'Lunes',
    [DiaSemana.MARTES]: 'Martes',
    [DiaSemana.MIERCOLES]: 'Miércoles',
    [DiaSemana.JUEVES]: 'Jueves',
    [DiaSemana.VIERNES]: 'Viernes',
    [DiaSemana.SABADO]: 'Sábado',
    [DiaSemana.DOMINGO]: 'Domingo'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Header del calendario */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Calendario Semanal
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Arrastra las clases para organizarlas
        </p>
      </div>

      {/* Grid del calendario */}
      <div className="overflow-auto">
        <div className="grid grid-cols-6 min-w-[800px]">
          {/* Header de columnas */}
          <div className="text-sm font-medium text-gray-600 text-center py-3 bg-gray-50 border-b">
            Hora
          </div>
          {diasSemana.map(dia => (
            <div key={dia} className="text-sm font-medium text-gray-900 text-center py-3 bg-gray-50 border-b border-l border-gray-200">
              {diasLabels[dia]}
            </div>
          ))}
          
          {/* Filas de horarios */}
          {horarios.map(hora => (
            <React.Fragment key={hora}>
              {/* Columna de hora */}
              <div className="text-sm text-gray-600 text-center py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-center">
                {hora}
              </div>
              
              {/* Celdas de días */}
              {diasSemana.map(dia => {
                const bloque = getBloqueEnHora(dia, hora);
                const clase = bloque?.claseId ? getClasePorId(bloque.claseId) : null;
                
                return (
                  <CalendarCell key={`${dia}-${hora}`} dia={dia} hora={hora}>
                    {clase && bloque && (
                      <div className="h-full">
                        <ClaseCard
                          clase={clase}
                          isInCalendar={true}
                          onClick={() => onClaseClick?.(clase.id)}
                        />
                      </div>
                    )}
                  </CalendarCell>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Footer con instrucciones */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>💡 Arrastra clases desde la lista hacia las celdas del calendario</span>
          <span>🔄 Las clases pueden moverse entre diferentes horarios</span>
        </div>
      </div>
    </div>
  );
}; 