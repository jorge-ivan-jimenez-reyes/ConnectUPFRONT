import React from 'react';
import { TemarioDetalle } from '../../interfaces/temario.interfaces';
import { FaArrowLeft, FaSpinner } from 'react-icons/fa';

interface DetalleTemarioProps {
  temario: TemarioDetalle;
  isLoading: boolean;
  onBack: () => void;
}

export const DetalleTemario: React.FC<DetalleTemarioProps> = ({ 
  temario, 
  isLoading, 
  onBack 
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <FaSpinner className="w-8 h-8 text-brand-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header con botón de regreso */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 mb-4"
        >
          <FaArrowLeft className="w-4 h-4" />
          Volver
        </button>
        
        {/* Información del usuario */}
        <div className="text-right text-sm text-gray-600 mb-4">
          Maderas y Textiles para el Diseño
        </div>
      </div>

      {/* Título principal */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          DENOMINACION DE LA ASIGNATURA O UNIDAD DE APRENDIZAJE
        </h1>
        <div className="border-t-2 border-gray-800 mx-auto w-64 mb-4"></div>
        <h2 className="text-xl font-bold text-gray-900 uppercase">
          {temario.denominacion}
        </h2>
        <div className="border-t-2 border-gray-800 mx-auto w-64 mt-4"></div>
      </div>

      {/* Información básica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Denominación de la asignatura o unidad de aprendizaje</span>
            <span>{temario.denominacion}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Clave de la asignatura</span>
            <span>{temario.clave}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Ciclo Escolar</span>
            <span>{temario.cicloEscolar}</span>
          </div>
        </div>
      </div>

      {/* Fines de aprendizaje */}
      <div className="mb-8">
        <h3 className="bg-orange-200 text-gray-900 p-3 font-bold text-lg">
          Fines de aprendizaje y formación
        </h3>
        <div className="p-4 border border-gray-200">
          <p className="text-gray-700 leading-relaxed">
            {temario.finesAprendizaje}
          </p>
        </div>
      </div>

      {/* Contenido temático */}
      <div className="mb-8">
        <h3 className="bg-orange-200 text-gray-900 p-3 font-bold text-lg">
          Contenido temático
        </h3>
        <div className="p-4 border border-gray-200">
          {temario.contenidoTematico.map((contenido) => (
            <div key={contenido.id} className="mb-6">
              <h4 className="font-bold text-gray-900 mb-3">
                {contenido.numero}. {contenido.titulo}
              </h4>
              
              {contenido.subtemas.map((subtema) => (
                <div key={subtema.id} className="ml-6 mb-2">
                  <div className="flex flex-col md:flex-row">
                    <span className="font-medium text-gray-900 md:w-20 flex-shrink-0">
                      {subtema.numero}.
                    </span>
                    <div className="flex-1">
                      <span className="text-gray-700">{subtema.titulo}</span>
                      {subtema.descripcion && (
                        <span className="text-gray-600 ml-2">({subtema.descripcion})</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Evaluación */}
      {temario.evaluacion && temario.evaluacion.length > 0 && (
        <div className="mb-8">
          <h3 className="bg-orange-200 text-gray-900 p-3 font-bold text-lg">
            Criterios de evaluación
          </h3>
          <div className="p-4 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {temario.evaluacion.map((criterio) => (
                <div key={criterio.id} className="flex justify-between">
                  <span>{criterio.descripcion}</span>
                  <span className="font-medium">{criterio.porcentaje}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bibliografía */}
      {temario.bibliografia && temario.bibliografia.length > 0 && (
        <div className="mb-8">
          <h3 className="bg-orange-200 text-gray-900 p-3 font-bold text-lg">
            Bibliografía
          </h3>
          <div className="p-4 border border-gray-200">
            <ul className="space-y-2">
              {temario.bibliografia.map((ref) => (
                <li key={ref.id} className="text-gray-700">
                  <span className="font-medium">{ref.autor}</span> ({ref.año}). 
                  <em className="mx-1">{ref.titulo}</em>. 
                  {ref.editorial && <span className="mx-1">{ref.editorial}</span>}
                  {ref.url && (
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:underline ml-1">
                      [Enlace]
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 mt-8">
        <p>Actualizado: {new Date(temario.fechaActualizacion).toLocaleDateString()}</p>
        {temario.profesor && <p>Profesor: {temario.profesor}</p>}
      </div>
    </div>
  );
}; 