import React from 'react';
import { ClaseHorario } from '../../interfaces/horario.interfaces';
import { ClaseCard } from './ClaseCard';
import { FaGripVertical } from 'react-icons/fa';

interface ListaClasesProps {
  clases: ClaseHorario[];
  onClaseClick?: (claseId: string) => void;
}

export const ListaClases: React.FC<ListaClasesProps> = ({ clases, onClaseClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border h-fit">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <FaGripVertical className="w-4 h-4 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900">
            Clases Disponibles
          </h2>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Arrastra las clases al calendario
        </p>
      </div>
      
      <div className="p-4 space-y-3">
        {clases.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No hay clases disponibles</p>
          </div>
        ) : (
          clases.map((clase) => (
            <ClaseCard
              key={clase.id}
              clase={clase}
              onClick={() => onClaseClick?.(clase.id)}
            />
          ))
        )}
      </div>
      
      {/* Tips de uso */}
      <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
        <p className="mb-1">💡 <strong>Tips:</strong></p>
        <ul className="space-y-1 ml-4">
          <li>• Arrastra las clases al calendario</li>
          <li>• Las clases se ajustan automáticamente</li>
          <li>• Haz clic para ver detalles</li>
        </ul>
      </div>
    </div>
  );
}; 