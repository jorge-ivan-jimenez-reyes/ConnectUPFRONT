import React from 'react';
import { ClaseHorario } from './ClaseHorario';
import { useHorarioClases } from '../../hooks/useHorarioClases';
import { FaClock, FaChevronRight } from 'react-icons/fa';

export const HorarioClases: React.FC = () => {
  const { clasesHoy, isLoading } = useHorarioClases();

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="space-y-3">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Mi horario de clases</h2>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
          })}
        </div>
      </div>

      <div className="space-y-3">
        {clasesHoy.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaClock className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No tienes clases programadas para hoy</p>
          </div>
        ) : (
          clasesHoy.map((clase) => (
            <ClaseHorario key={clase.id} clase={clase} />
          ))
        )}
      </div>

      {/* Enlace para ver horario completo */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="text-brand-primary hover:text-brand-primary/80 text-sm font-medium flex items-center gap-2">
          Ver horario completo
          <FaChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}; 