import React from 'react';
import { useCV } from '../../hooks/useCV';
import { useCVContext } from '../../context/CVContext';
import { DatosBasicos } from '../../interfaces/cv.interfaces';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

export const FormularioDatosBasicos: React.FC = () => {
  const { volverAlMenu } = useCVContext();
  const { 
    cvData, 
    actualizarDatosBasicos, 
    navegarASeccion, 
    seccionesConfig,
    hasChanges,
    guardarCV,
    isLoading
  } = useCV();

  const datos = cvData.datosBasicos || {} as DatosBasicos;

  const handleInputChange = (campo: keyof DatosBasicos, valor: string) => {
    actualizarDatosBasicos({ [campo]: valor });
  };

  const handleVolver = () => {
    volverAlMenu();
  };

  const handleGuardar = () => {
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
            <p className="text-gray-600 mt-2">Datos básicos</p>
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

      {/* Formulario de Datos Básicos */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Datos Básicos</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fecha de nacimiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de nacimiento
              </label>
                             <input
                 type="date"
                 value={datos.fechaNacimiento || ''}
                 onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white"
               />
            </div>

            {/* Nombramiento actual */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombramiento actual
              </label>
                             <input
                 type="text"
                 value={datos.nombramientoActual || ''}
                 onChange={(e) => handleInputChange('nombramientoActual', e.target.value)}
                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white"
                 placeholder="Profesor Titular"
               />
            </div>

            {/* Fecha de ingreso a la Universidad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de ingreso a la Universidad
              </label>
                             <input
                 type="date"
                 value={datos.fechaIngresoUniversidad || ''}
                 onChange={(e) => handleInputChange('fechaIngresoUniversidad', e.target.value)}
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

             {/* Información Registrada */}
       {(datos.fechaNacimiento || datos.nombramientoActual || datos.fechaIngresoUniversidad) && (
         <div className="bg-brand-primary text-white rounded-xl">
                     <div className="px-6 py-4 border-b border-white/20">
            <h3 className="text-lg font-semibold">Información Registrada</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <div>
                 <p className="text-white/70 text-sm">Fecha de nacimiento</p>
                <p className="font-medium">
                  {datos.fechaNacimiento ? 
                    new Date(datos.fechaNacimiento).toLocaleDateString('es-ES') : 
                    '1/02/1972'
                  }
                </p>
              </div>
                             <div>
                 <p className="text-white/70 text-sm">Nombramiento actual</p>
                <p className="font-medium">{datos.nombramientoActual || 'Dr. Juan Glez'}</p>
              </div>
                             <div>
                 <p className="text-white/70 text-sm">Fecha de ingreso</p>
                <p className="font-medium">
                  {datos.fechaIngresoUniversidad ? 
                    new Date(datos.fechaIngresoUniversidad).toLocaleDateString('es-ES') : 
                    '1/08/2022'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar
              </button>
            </div>
          </div>
        </div>
      )}

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