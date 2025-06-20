import React, { useState, useCallback } from 'react';

interface BloqueDisponible {
  dia: string;
  hora: string;
  disponible: boolean;
}

export const CalendarioSimple: React.FC = () => {
  // Estado para manejar la disponibilidad
  const [disponibilidad, setDisponibilidad] = useState<BloqueDisponible[]>([
    // Lunes
    { dia: 'lunes', hora: '7:00', disponible: true },
    { dia: 'lunes', hora: '8:00', disponible: true },
    { dia: 'lunes', hora: '9:00', disponible: true },
    { dia: 'lunes', hora: '10:00', disponible: true },
    { dia: 'lunes', hora: '11:00', disponible: true },
    { dia: 'lunes', hora: '12:00', disponible: true },
    { dia: 'lunes', hora: '14:00', disponible: true },
    { dia: 'lunes', hora: '15:00', disponible: true },
    { dia: 'lunes', hora: '16:00', disponible: true },
    { dia: 'lunes', hora: '17:00', disponible: true },
    { dia: 'lunes', hora: '18:00', disponible: true },
    { dia: 'lunes', hora: '19:00', disponible: true },
    
    // Miércoles
    { dia: 'miercoles', hora: '9:00', disponible: true },
    { dia: 'miercoles', hora: '10:00', disponible: true },
    { dia: 'miercoles', hora: '11:00', disponible: true },
    { dia: 'miercoles', hora: '12:00', disponible: true },
    { dia: 'miercoles', hora: '13:00', disponible: true },
    { dia: 'miercoles', hora: '14:00', disponible: true },
    { dia: 'miercoles', hora: '15:00', disponible: true },
    { dia: 'miercoles', hora: '16:00', disponible: true },
    { dia: 'miercoles', hora: '17:00', disponible: true },
    
    // Viernes
    { dia: 'viernes', hora: '9:00', disponible: true },
    { dia: 'viernes', hora: '10:00', disponible: true },
    { dia: 'viernes', hora: '11:00', disponible: true },
    { dia: 'viernes', hora: '12:00', disponible: true },
    { dia: 'viernes', hora: '13:00', disponible: true },
    { dia: 'viernes', hora: '14:00', disponible: true },
    { dia: 'viernes', hora: '15:00', disponible: true },
    { dia: 'viernes', hora: '16:00', disponible: true },
    { dia: 'viernes', hora: '17:00', disponible: true },
    { dia: 'viernes', hora: '18:00', disponible: true },
    { dia: 'viernes', hora: '19:00', disponible: true },
    { dia: 'viernes', hora: '20:00', disponible: true },
    { dia: 'viernes', hora: '21:00', disponible: true },
    { dia: 'viernes', hora: '22:00', disponible: true },
  ]);

  const [dragStarted, setDragStarted] = useState(false);
  const [dragMode, setDragMode] = useState<'add' | 'remove'>('add');

  // Usar IDs únicos para cada día, pero mostrar las etiquetas correctas
  const diasData = [
    { id: 'lunes', label: 'L' },
    { id: 'martes', label: 'M' },
    { id: 'miercoles', label: 'M' },
    { id: 'jueves', label: 'J' },
    { id: 'viernes', label: 'V' },
    { id: 'sabado', label: 'S' }
  ];
  
  const horas = [
    '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', 
    '21:00', '22:00'
  ];

  const estaDisponible = useCallback((diaId: string, hora: string) => {
    return disponibilidad.some(d => d.dia === diaId && d.hora === hora && d.disponible);
  }, [disponibilidad]);

  const toggleDisponibilidad = useCallback((diaId: string, hora: string) => {
    setDisponibilidad(prev => {
      const existe = prev.find(d => d.dia === diaId && d.hora === hora);
      
      if (existe) {
        return prev.map(d => 
          d.dia === diaId && d.hora === hora 
            ? { ...d, disponible: !d.disponible }
            : d
        );
      } else {
        return [...prev, { dia: diaId, hora, disponible: true }];
      }
    });
  }, []);

  const handleMouseDown = (diaId: string, hora: string) => {
    const disponible = estaDisponible(diaId, hora);
    setDragMode(disponible ? 'remove' : 'add');
    setDragStarted(true);
    toggleDisponibilidad(diaId, hora);
  };

  const handleMouseEnter = (diaId: string, hora: string) => {
    if (dragStarted) {
      const disponible = estaDisponible(diaId, hora);
      
      if (dragMode === 'add' && !disponible) {
        toggleDisponibilidad(diaId, hora);
      } else if (dragMode === 'remove' && disponible) {
        toggleDisponibilidad(diaId, hora);
      }
    }
  };

  const handleMouseUp = () => {
    setDragStarted(false);
  };

  // Prevenir selección de texto durante el drag
  const handleSelectStart = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      className="bg-white border-2 border-blue-500 rounded-lg overflow-hidden"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onSelectStart={handleSelectStart}
    >
      {/* Grid del calendario */}
      <div className="grid grid-cols-7 text-sm">
        {/* Header - espacio vacío */}
        <div className="bg-white h-12"></div>
        
        {/* Headers de días */}
        {diasData.map((diaInfo, index) => (
          <div 
            key={`${diaInfo.id}-${index}`}
            className="bg-white h-12 flex items-center justify-center font-medium text-gray-900 border-b border-gray-200"
          >
            {diaInfo.label}
          </div>
        ))}
        
        {/* Filas de horarios */}
        {horas.map(hora => (
          <React.Fragment key={hora}>
            {/* Columna de hora */}
            <div className="bg-white h-8 flex items-center justify-center text-xs text-gray-700 border-b border-gray-100">
              {hora}
            </div>
            
            {/* Celdas por día */}
            {diasData.map((diaInfo, index) => {
              const disponible = estaDisponible(diaInfo.id, hora);
              
              return (
                <div
                  key={`${diaInfo.id}-${hora}-${index}`}
                  className={`
                    h-8 border-b border-r border-gray-100 cursor-pointer select-none
                    ${disponible 
                      ? 'bg-green-200 hover:bg-green-300' 
                      : 'bg-white hover:bg-gray-50'
                    }
                    transition-colors duration-150
                  `}
                  onMouseDown={() => handleMouseDown(diaInfo.id, hora)}
                  onMouseEnter={() => handleMouseEnter(diaInfo.id, hora)}
                >
                  {disponible && (
                    <div className="w-full h-full bg-green-300 opacity-80"></div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}; 