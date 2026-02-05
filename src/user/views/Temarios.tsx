// Vista Temarios - Selección de materias y visualización de temarios

import React from 'react';
import { PreferenciaClases } from '../components/Temarios/PreferenciaClases';
import { DetalleTemario } from '../components/Temarios/DetalleTemario';
import { useTemarios } from '../hooks/useTemarios';

export const Temarios: React.FC = () => {
  const { 
    // Estado
    academias,
    materias,
    academiaSeleccionada,
    temarioSeleccionado, 
    isLoading,
    isLoadingTemario,
    error,
    successMessage,
    
    // Acciones
    setAcademiaSeleccionada,
    toggleMateriaEstado,
    loadTemario,
    guardarPreferencias,
    clearTemarioSeleccionado,
    
    // Utilidades
    materiasAñadidas
  } = useTemarios();

  // Si hay un temario seleccionado, mostrar la vista de detalle
  if (temarioSeleccionado) {
    return (
      <DetalleTemario 
        temario={temarioSeleccionado}
        isLoading={isLoadingTemario}
        onBack={clearTemarioSeleccionado}
      />
    );
  }

  // Por defecto mostrar la vista de preferencia de clases
  return (
    <PreferenciaClases 
      // Estado
      academias={academias}
      materias={materias}
      academiaSeleccionada={academiaSeleccionada}
      isLoading={isLoading}
      error={error}
      successMessage={successMessage}
      materiasAñadidas={materiasAñadidas}
      
      // Acciones
      onAcademiaChange={setAcademiaSeleccionada}
      onToggleMateriaEstado={toggleMateriaEstado}
      onVerTemario={loadTemario}
      onGuardarPreferencias={guardarPreferencias}
    />
  );
};
