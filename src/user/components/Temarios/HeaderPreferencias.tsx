import React from 'react';
import { Academia } from '../../interfaces/temario.interfaces';
import { FaChevronDown } from 'react-icons/fa';

interface HeaderPreferenciasProps {
  academiaSeleccionada: string;
  academias: Academia[];
  onAcademiaChange: (academia: string) => void;
}

export const HeaderPreferencias: React.FC<HeaderPreferenciasProps> = ({
  academiaSeleccionada,
  academias,
  onAcademiaChange
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {/* Título */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Preferencia de clases
        </h1>
      </div>

      {/* Selector de academia */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selecciona Academia
        </label>
        <div className="relative">
          <select
            value={academiaSeleccionada}
            onChange={(e) => onAcademiaChange(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary min-w-[180px] text-lg"
          >
            {academias.map((academia) => (
              <option key={academia.id} value={academia.id}>
                {academia.nombre}
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}; 