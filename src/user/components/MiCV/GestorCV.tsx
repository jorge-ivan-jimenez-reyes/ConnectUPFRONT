import React from 'react';
import { useCVContext } from '../../context/CVContext';
import { SeccionesCV } from '../../interfaces/cv.interfaces';
import { NavegacionCV } from './NavegacionCV';
import { FormularioDatosBasicos } from './FormularioDatosBasicos';

export const GestorCV: React.FC = () => {
  const { seccionActiva } = useCVContext();

  const renderizarSeccion = () => {
    switch (seccionActiva) {
      case SeccionesCV.DATOS_BASICOS:
        return <FormularioDatosBasicos />;
      
      case SeccionesCV.FORMACION_ACADEMICA:
        return <FormularioEnDesarrollo seccion="Formación académica" />;
        
      case SeccionesCV.CAPACITACION_DOCENTE:
        return <FormularioEnDesarrollo seccion="Capacitación docente" />;
        
      case SeccionesCV.ACTUALIZACION_DISCIPLINAR:
        return <FormularioEnDesarrollo seccion="Actualización disciplinar" />;
        
      case SeccionesCV.GESTION_ACADEMICA:
        return <FormularioEnDesarrollo seccion="Gestión académica" />;
        
      case SeccionesCV.PRODUCTOS_ACADEMICOS:
        return <FormularioEnDesarrollo seccion="Productos académicos" />;
        
      case SeccionesCV.EXPERIENCIA_PROFESIONAL:
        return <FormularioEnDesarrollo seccion="Experiencia profesional no académica" />;
        
      case SeccionesCV.LOGROS_PROFESIONALES:
        return <FormularioEnDesarrollo seccion="Logros profesionales" />;
        
      case SeccionesCV.PARTICIPACION_INSTITUCIONES:
        return <FormularioEnDesarrollo seccion="Participación en instituciones" />;
        
      case SeccionesCV.RECONOCIMIENTOS:
        return <FormularioEnDesarrollo seccion="Reconocimientos obtenidos" />;
        
      case SeccionesCV.APORTACIONES_RELEVANTES:
        return <FormularioEnDesarrollo seccion="Aportaciones relevantes" />;
        
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