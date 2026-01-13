/**
 * Vista Mis Clases para usuarios/docentes
 * 
 * Muestra las clases asignadas al docente conectándose al backend real.
 */

import React from 'react';
import { HeaderMisClases } from '../components/MisClases/HeaderMisClases';
import { TarjetaClase } from '../components/MisClases/TarjetaClase';
import { useMisClases } from '../hooks/useMisClases';

export const MisClases: React.FC = () => {
  const { 
    clases, 
    isLoading, 
    error,
    cicloSeleccionado, 
    setCicloSeleccionado,
    ciclosDisponibles 
  } = useMisClases();

  // Estado de carga
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded mb-6 w-2/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="space-y-6">
        <HeaderMisClases 
          cicloSeleccionado={cicloSeleccionado}
          onCicloChange={setCicloSeleccionado}
          ciclosDisponibles={ciclosDisponibles}
        />
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-red-500">⚠️</span>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Obtener el nombre del ciclo seleccionado
  const cicloNombre = ciclosDisponibles.find(c => c.id === cicloSeleccionado)?.nombre || cicloSeleccionado;

  return (
    <div className="space-y-6">
      {/* Header con selector de ciclo */}
      <HeaderMisClases 
        cicloSeleccionado={cicloSeleccionado}
        onCicloChange={setCicloSeleccionado}
        ciclosDisponibles={ciclosDisponibles}
      />

      {/* Descripción */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-gray-700 text-sm">
          Estas son las materias y horarios que se te asignaron para el ciclo <strong>{cicloNombre}</strong>
        </p>
      </div>

      {/* Grid de clases */}
      {clases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clases.map((clase) => (
            <TarjetaClase key={clase.id} clase={clase} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sin clases asignadas</h3>
          <p className="text-gray-500">No tienes clases asignadas para el ciclo {cicloNombre}</p>
        </div>
      )}
    </div>
  );
};
