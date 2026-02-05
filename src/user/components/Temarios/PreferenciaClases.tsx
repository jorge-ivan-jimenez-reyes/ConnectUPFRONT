import React from 'react';
import { HeaderPreferencias } from './HeaderPreferencias';
import { TarjetaMateria } from './TarjetaMateria';
import { FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { Academia, Materia } from '../../interfaces/temario.interfaces';

interface PreferenciaClasesProps {
  // Estado
  academias: Academia[];
  materias: Materia[];
  academiaSeleccionada: string;
  isLoading: boolean;
  error: string | null;
  successMessage?: string | null;
  materiasAñadidas: Materia[];
  
  // Acciones
  onAcademiaChange: (academia: string) => void;
  onToggleMateriaEstado: (materiaId: string) => void;
  onVerTemario: (materiaId: string) => void;
  onGuardarPreferencias: () => void;
}

export const PreferenciaClases: React.FC<PreferenciaClasesProps> = ({
  // Estado
  academias,
  materias,
  academiaSeleccionada,
  isLoading,
  error,
  successMessage,
  materiasAñadidas,
  
  // Acciones
  onAcademiaChange,
  onToggleMateriaEstado,
  onVerTemario,
  onGuardarPreferencias
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <FaSpinner className="w-8 h-8 text-brand-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto relative">
      {/* Toast Notification */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
            <FaCheckCircle className="w-5 h-5" />
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Contenedor principal con borde azul */}
      <div className="border-2 border-blue-400 rounded-2xl p-8 bg-white">
        {/* Header */}
        <HeaderPreferencias
          academiaSeleccionada={academiaSeleccionada}
          academias={academias}
          onAcademiaChange={onAcademiaChange}
        />

        {/* Descripción */}
        <div className="mb-8">
          <p className="text-gray-700 text-lg">
            Selecciona que materias te gustaría impartir
          </p>
        </div>

        {/* Grid de materias */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {materias.map((materia) => (
            <TarjetaMateria
              key={materia.id}
              materia={materia}
              onToggle={() => onToggleMateriaEstado(materia.id)}
              onVerTemario={() => onVerTemario(materia.id)}
            />
          ))}
        </div>

        {/* Botón de acción */}
        <div className="text-center">
          <button
            onClick={onGuardarPreferencias}
            disabled={materiasAñadidas.length === 0}
            className="bg-brand-primary text-white px-12 py-4 rounded-xl text-lg font-medium hover:bg-brand-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[300px]"
          >
            Aceptar horario
          </button>
        </div>
      </div>
    </div>
  );
};
