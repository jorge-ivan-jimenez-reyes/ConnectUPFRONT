import React from 'react';
import { useCVContext } from '../../context/CVContext';
import { SeccionesCV } from '../../interfaces/cv.interfaces';
import { NavegacionCV } from './NavegacionCV';
import { FormularioDatosBasicos } from './FormularioDatosBasicos';
import { FormularioFormacionAcademica } from './FormularioFormacionAcademica';
import { FormularioCapacitacionDocente } from './FormularioCapacitacionDocente';
import { FormularioGestionAcademica } from './FormularioGestionAcademica';
import { FormularioProductosAcademicos } from './FormularioProductosAcademicos';
import { FormularioExperienciaProfesional } from './FormularioExperienciaProfesional';
import { FormularioLogrosProfesionales } from './FormularioLogrosProfesionales';
import { FormularioParticipacionInstituciones } from './FormularioParticipacionInstituciones';
import { FormularioReconocimientos } from './FormularioReconocimientos';
import { FormularioAportacionesRelevantes } from './FormularioAportacionesRelevantes';

export const GestorCV: React.FC = () => {
  const { seccionActiva } = useCVContext();

  const renderizarSeccion = () => {
    switch (seccionActiva) {
      case SeccionesCV.DATOS_BASICOS:
        return <FormularioDatosBasicos />;
      
      case SeccionesCV.FORMACION_ACADEMICA:
        return <FormularioFormacionAcademica />;
        
      case SeccionesCV.CAPACITACION_DOCENTE:
        return <FormularioCapacitacionDocente />;
        
      case SeccionesCV.ACTUALIZACION_DISCIPLINAR:
        return <FormularioEnDesarrollo seccion="Actualización Disciplinar" />;
        
      case SeccionesCV.GESTION_ACADEMICA:
        return <FormularioGestionAcademica />;
        
      case SeccionesCV.PRODUCTOS_ACADEMICOS:
        return <FormularioProductosAcademicos />;
        
      case SeccionesCV.EXPERIENCIA_PROFESIONAL:
        return <FormularioExperienciaProfesional />;
        
      case SeccionesCV.LOGROS_PROFESIONALES:
        return <FormularioLogrosProfesionales />;
        
      case SeccionesCV.PARTICIPACION_INSTITUCIONES:
        return <FormularioParticipacionInstituciones />;
        
      case SeccionesCV.RECONOCIMIENTOS:
        return <FormularioReconocimientos />;
        
      case SeccionesCV.APORTACIONES_RELEVANTES:
        return <FormularioAportacionesRelevantes />;
        
      default:
        return <NavegacionCV />;
    }
  };

  // Si no hay sección activa, mostrar la navegación principal
  if (!seccionActiva) {
    return <NavegacionCV />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {renderizarSeccion()}
      </div>
    </div>
  );
};

// Componente temporal para secciones en desarrollo
const FormularioEnDesarrollo: React.FC<{ seccion: string }> = ({ seccion }) => {
  const handleVolver = () => {
    window.history.back();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={handleVolver}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          ←
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{seccion}</h1>
          <p className="text-gray-600 mt-2">Esta sección está en desarrollo</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Formulario en desarrollo
        </h3>
        <p className="text-gray-600 mb-6">
          El formulario para "{seccion}" estará disponible próximamente.
        </p>
        <button
          onClick={handleVolver}
          className="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary/90 transition-colors"
        >
          Volver al menú principal
        </button>
      </div>
    </div>
  );
}; 