// Vista Mis Horarios - Selección de disponibilidad de horarios para docentes

import React, { useState } from 'react';
import { CalendarioSimple } from '../components/Disponibilidad/CalendarioSimple';

export const MisHorarios: React.FC = () => {
  const [cicloSeleccionado, setCicloSeleccionado] = useState('1238');

  const handleGuardarHorarios = () => {
    console.log('Guardando horarios...');
    // Aquí iría la lógica para guardar en el backend
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Disponibilidad de horarios</h1>
          <p className="text-gray-600 mt-2">Selecciona tus horarios disponibles</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Selector de ciclo */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Selecciona Ciclo</label>
            <select 
              value={cicloSeleccionado}
              onChange={(e) => setCicloSeleccionado(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
            >
              <option value="1238">1238</option>
              <option value="1239">1239</option>
            </select>
          </div>
        </div>
      </div>

      {/* Calendario principal */}
      <CalendarioSimple />

      {/* Botón de guardar horarios */}
      <div className="flex justify-center">
        <button 
          onClick={handleGuardarHorarios}
          className="bg-red-900 text-white px-12 py-4 rounded-xl text-lg font-medium hover:bg-red-800 transition-colors min-w-[300px]"
        >
          Guardar horarios
        </button>
      </div>
    </div>
  );
}; 