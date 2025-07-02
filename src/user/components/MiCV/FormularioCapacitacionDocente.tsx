import React, { useState } from 'react';
import { useCV } from '../../hooks/useCV';
import { useCVContext } from '../../context/CVContext';
import { CapacitacionDocente } from '../../interfaces/cv.interfaces';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

interface CapacitacionDocenteData {
  tipoCapacitacion: string;
  institucionOrganizadora: string;
  fechaFin: string;
  duracionHoras: string;
}

export const FormularioCapacitacionDocente: React.FC = () => {
  const { volverAlMenu } = useCVContext();
  const { 
    hasChanges,
    guardarCV,
    isLoading
  } = useCV();
  
  const [datos, setDatos] = useState<CapacitacionDocenteData>({
    tipoCapacitacion: '',
    institucionOrganizadora: '',
    fechaFin: '',
    duracionHoras: ''
  });

  const handleInputChange = (campo: keyof CapacitacionDocenteData, valor: string) => {
    setDatos(prev => ({ ...prev, [campo]: valor }));
  };

  const handleVolver = () => {
    volverAlMenu();
  };

  const handleGuardar = () => {
    console.log('Guardando capacitación docente:', datos);
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
            <p className="text-gray-600 mt-2">Capacitación Docente</p>
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

      {/* Formulario de Capacitación Docente */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Capacitación Docente</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipo de capacitación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de capacitación
              </label>
              <input
                type="text"
                value={datos.tipoCapacitacion}
                onChange={(e) => handleInputChange('tipoCapacitacion', e.target.value)}
                placeholder="Lorem ipsum dolor"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white"
              />
            </div>

            {/* Institución y país */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institución y país
              </label>
              <input
                type="text"
                value={datos.institucionOrganizadora}
                onChange={(e) => handleInputChange('institucionOrganizadora', e.target.value)}
                placeholder="Lorem ipsum"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white"
              />
            </div>

            {/* Año de obtención */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Año de obtención
              </label>
              <input
                type="text"
                value={datos.fechaFin}
                onChange={(e) => handleInputChange('fechaFin', e.target.value)}
                placeholder="dd/mm/aaaa"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white"
              />
            </div>

            {/* Horas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horas
              </label>
              <input
                type="text"
                value={datos.duracionHoras}
                onChange={(e) => handleInputChange('duracionHoras', e.target.value)}
                placeholder="00"
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