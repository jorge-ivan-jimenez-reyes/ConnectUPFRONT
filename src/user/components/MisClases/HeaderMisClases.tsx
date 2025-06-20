import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface HeaderMisClasesProps {
  cicloSeleccionado: string;
  onCicloChange: (ciclo: string) => void;
}

export const HeaderMisClases: React.FC<HeaderMisClasesProps> = ({
  cicloSeleccionado,
  onCicloChange
}) => {
  const ciclosDisponibles = ['1238', '1239', '1240', '1241'];

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mis clases</h1>
      </div>

      {/* Selector de ciclo */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Selecciona Ciclo
        </label>
        <div className="relative">
          <select
            value={cicloSeleccionado}
            onChange={(e) => onCicloChange(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary min-w-[120px]"
          >
            {ciclosDisponibles.map((ciclo) => (
              <option key={ciclo} value={ciclo}>
                {ciclo}
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}; 