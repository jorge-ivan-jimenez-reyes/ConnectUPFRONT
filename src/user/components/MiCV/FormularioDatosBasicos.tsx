import React from 'react';
import { useCV } from '../../hooks/useCV';
import { DatosBasicos } from '../../interfaces/cv.interfaces';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

export const FormularioDatosBasicos: React.FC = () => {
  const { 
    cvData, 
    actualizarDatosBasicos, 
    navegarASeccion, 
    seccionesConfig,
    hasChanges,
    guardarCV,
    isLoading
  } = useCV();

  const datos = cvData.datosBasicos || {};

  const handleInputChange = (campo: keyof DatosBasicos, valor: string) => {
    actualizarDatosBasicos({ [campo]: valor });
  };

  const handleVolver = () => {
    // Volver a la vista principal del CV
    window.history.back();
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
            <h1 className="text-3xl font-bold text-gray-900">Datos básicos</h1>
            <p className="text-gray-600 mt-2">Información personal y de contacto</p>
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

      {/* Formulario */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombres */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombres <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={datos.nombres || ''}
                onChange={(e) => handleInputChange('nombres', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                placeholder="Ingresa tus nombres"
              />
            </div>

            {/* Apellidos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apellidos <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={datos.apellidos || ''}
                onChange={(e) => handleInputChange('apellidos', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                placeholder="Ingresa tus apellidos"
              />
            </div>

            {/* Tipo de documento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de documento <span className="text-red-500">*</span>
              </label>
              <select
                value={datos.tipoDocumento || ''}
                onChange={(e) => handleInputChange('tipoDocumento', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              >
                <option value="">Selecciona el tipo</option>
                <option value="cedula">Cédula de ciudadanía</option>
                <option value="pasaporte">Pasaporte</option>
                <option value="tarjeta-identidad">Tarjeta de identidad</option>
              </select>
            </div>

            {/* Número de documento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de documento <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={datos.numeroDocumento || ''}
                onChange={(e) => handleInputChange('numeroDocumento', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                placeholder="Número de identificación"
              />
            </div>

            {/* Fecha de nacimiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de nacimiento <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={datos.fechaNacimiento || ''}
                onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              />
            </div>

            {/* Género */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Género
              </label>
              <select
                value={datos.genero || ''}
                onChange={(e) => handleInputChange('genero', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              >
                <option value="">Selecciona el género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
                <option value="prefiero-no-decir">Prefiero no decir</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={datos.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                placeholder="correo@ejemplo.com"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={datos.telefono || ''}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                placeholder="+57 300 123 4567"
              />
            </div>

            {/* Dirección */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección
              </label>
              <input
                type="text"
                value={datos.direccion || ''}
                onChange={(e) => handleInputChange('direccion', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                placeholder="Calle 123 #45-67"
              />
            </div>

            {/* Ciudad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad
              </label>
              <input
                type="text"
                value={datos.ciudad || ''}
                onChange={(e) => handleInputChange('ciudad', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                placeholder="Ciudad de residencia"
              />
            </div>

            {/* País */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                País
              </label>
              <input
                type="text"
                value={datos.pais || ''}
                onChange={(e) => handleInputChange('pais', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                placeholder="País de residencia"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn (opcional)
              </label>
              <input
                type="url"
                value={datos.linkedin || ''}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                placeholder="https://linkedin.com/in/usuario"
              />
            </div>

            {/* Sitio web */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sitio web (opcional)
              </label>
              <input
                type="url"
                value={datos.sitioWeb || ''}
                onChange={(e) => handleInputChange('sitioWeb', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                placeholder="https://miportfolio.com"
              />
            </div>
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
          {isLoading ? 'Guardando...' : 'Guardar y continuar'}
        </button>
      </div>
    </div>
  );
}; 