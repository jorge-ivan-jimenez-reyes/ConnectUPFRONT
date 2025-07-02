import React, { useState } from 'react';
import { useCV } from '../../hooks/useCV';
import { useCVContext } from '../../context/CVContext';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

interface ParticipacionInstitucionesData {
  organismo: string;
  periodoAnos: string;
  nivelParticipacion: string;
}

export const FormularioParticipacionInstituciones: React.FC = () => {
  const { volverAlMenu } = useCVContext();
  const { 
    hasChanges,
    guardarCV,
    isLoading
  } = useCV();
  
  const [datos, setDatos] = useState<ParticipacionInstitucionesData>({
    organismo: '',
    periodoAnos: '',
    nivelParticipacion: ''
  });

  const handleInputChange = (campo: keyof ParticipacionInstitucionesData, valor: string) => {
    setDatos(prev => ({ ...prev, [campo]: valor }));
  };

  const handleVolver = () => {
    volverAlMenu();
  };

  const handleGuardar = () => {
    console.log('Guardando participación en instituciones:', datos);
    guardarCV();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleVolver}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tu CV</h1>
            <p className="text-gray-600 mt-2">Participación en Instituciones</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {hasChanges && (
            <span className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              Cambios sin guardar
            </span>
          )}
          <button
            onClick={handleGuardar}
            disabled={isLoading}
            className="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <FaSave size={16} />
            {isLoading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>

      {/* Formulario de Participación en Instituciones */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Participación en Instituciones</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Organismo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organismo
              </label>
              <input
                type="text"
                value={datos.organismo}
                onChange={(e) => handleInputChange('organismo', e.target.value)}
                placeholder="Nombre del organismo"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white"
              />
            </div>

            {/* Período años */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Período años
              </label>
              <input
                type="text"
                value={datos.periodoAnos}
                onChange={(e) => handleInputChange('periodoAnos', e.target.value)}
                placeholder="2020-2023"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white"
              />
            </div>

            {/* Nivel de participación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nivel de participación
              </label>
              <input
                type="text"
                value={datos.nivelParticipacion}
                onChange={(e) => handleInputChange('nivelParticipacion', e.target.value)}
                placeholder="Nivel de participación"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white"
              />
            </div>
          </div>

          {/* Botón para agregar más campos */}
          <div className="flex justify-center mt-6">
            <button className="group w-8 h-8 border-2 border-gray-300 text-gray-400 rounded-full flex items-center justify-center hover:border-brand-primary hover:text-brand-primary transition-all duration-200 hover:scale-105">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="flex justify-between">
        <button
          onClick={handleVolver}
          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Volver al menú principal
        </button>
        
        <button
          onClick={handleGuardar}
          disabled={isLoading}
          className="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary/90 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Guardando...' : 'Guardar información'}
        </button>
      </div>
    </div>
  );
}; 