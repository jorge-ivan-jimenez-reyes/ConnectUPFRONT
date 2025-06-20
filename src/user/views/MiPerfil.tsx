// Vista Mi Perfil - Configuración del perfil del usuario

import React, { useRef } from 'react';
import { usePerfil } from '../hooks/usePerfil';
import { FaCamera, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

export const MiPerfil: React.FC = () => {
  const {
    perfil,
    configuracion,
    toggleModoEdicion,
    actualizarCampo,
    actualizarGestionAcademica,
    guardarCambios,
    cancelarEdicion,
    actualizarAvatar
  } = usePerfil();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    if (configuracion.modoEdicion) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      actualizarAvatar(file);
    }
  };

  const handleGuardar = async () => {
    const success = await guardarCambios();
    if (success) {
      // Mostrar notificación de éxito si es necesario
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
          <p className="text-gray-600">Gestiona tu información personal y configuración académica</p>
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Sección del avatar y información básica */}
          <div className="p-8">
            <div className="flex items-start gap-8">
              {/* Avatar */}
              <div className="relative">
                <div 
                  className={`w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg ${
                    configuracion.modoEdicion ? 'cursor-pointer hover:opacity-80' : ''
                  }`}
                  onClick={handleAvatarClick}
                >
                  {perfil.avatar ? (
                    <img 
                      src={perfil.avatar} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-3xl font-bold">
                      {perfil.nombreUsuario.charAt(0).toUpperCase()}
                    </div>
                  )}
                  
                  {configuracion.modoEdicion && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity">
                      <FaCamera className="text-white text-xl" />
                    </div>
                  )}
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Información básica */}
              <div className="flex-1 space-y-6">
                {/* Nombre de Usuario */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de Usuario
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={perfil.nombreUsuario}
                      onChange={(e) => actualizarCampo('nombreUsuario', e.target.value)}
                      disabled={!configuracion.modoEdicion}
                      className={`w-full px-4 py-3 border rounded-xl text-lg font-medium transition-colors ${
                        configuracion.modoEdicion 
                          ? 'border-gray-300 bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary' 
                          : 'border-gray-200 bg-gray-50 text-gray-900'
                      } ${configuracion.errores.nombreUsuario ? 'border-red-300' : ''}`}
                      placeholder="Ingresa tu nombre completo"
                    />
                    {configuracion.errores.nombreUsuario && (
                      <p className="text-red-500 text-sm mt-1">{configuracion.errores.nombreUsuario}</p>
                    )}
                  </div>
                </div>

                {/* Fecha de Nacimiento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de Nacimiento
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={perfil.fechaNacimiento}
                      onChange={(e) => actualizarCampo('fechaNacimiento', e.target.value)}
                      disabled={!configuracion.modoEdicion}
                      className={`w-full px-4 py-3 border rounded-xl transition-colors ${
                        configuracion.modoEdicion 
                          ? 'border-gray-300 bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary' 
                          : 'border-gray-200 bg-gray-50 text-gray-600'
                      } ${configuracion.errores.fechaNacimiento ? 'border-red-300' : ''}`}
                    />
                    {configuracion.errores.fechaNacimiento && (
                      <p className="text-red-500 text-sm mt-1">{configuracion.errores.fechaNacimiento}</p>
                    )}
                  </div>
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <div className="relative">
                    <textarea
                      value={perfil.descripcion}
                      onChange={(e) => actualizarCampo('descripcion', e.target.value)}
                      disabled={!configuracion.modoEdicion}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-xl transition-colors resize-none ${
                        configuracion.modoEdicion 
                          ? 'border-gray-300 bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary' 
                          : 'border-gray-200 bg-gray-50 text-gray-600'
                      }`}
                      placeholder="Describe tu experiencia y especialidades..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Separador */}
          <div className="border-t border-gray-200"></div>

          {/* Sección de Tu Información - Gestión Académica */}
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu Información</h2>
              <div className="inline-block px-4 py-2 bg-gray-100 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Gestión Académica</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Correo Institucional */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Institucional
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={perfil.informacionGestionAcademica.correoInstitucional}
                    onChange={(e) => actualizarGestionAcademica('correoInstitucional', e.target.value)}
                    disabled={!configuracion.modoEdicion}
                    className={`w-full px-4 py-3 border rounded-xl transition-colors ${
                      configuracion.modoEdicion 
                        ? 'border-gray-300 bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary' 
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    } ${configuracion.errores.correoInstitucional ? 'border-red-300' : ''}`}
                    placeholder="ejemplo@up.edu.mx"
                  />
                  {configuracion.errores.correoInstitucional && (
                    <p className="text-red-500 text-sm mt-1">{configuracion.errores.correoInstitucional}</p>
                  )}
                </div>
              </div>

              {/* Correo Personal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Personal
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={perfil.informacionGestionAcademica.correoPersonal}
                    onChange={(e) => actualizarGestionAcademica('correoPersonal', e.target.value)}
                    disabled={!configuracion.modoEdicion}
                    className={`w-full px-4 py-3 border rounded-xl transition-colors ${
                      configuracion.modoEdicion 
                        ? 'border-gray-300 bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary' 
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    } ${configuracion.errores.correoPersonal ? 'border-red-300' : ''}`}
                    placeholder="ejemplo@gmail.com"
                  />
                  {configuracion.errores.correoPersonal && (
                    <p className="text-red-500 text-sm mt-1">{configuracion.errores.correoPersonal}</p>
                  )}
                </div>
              </div>

              {/* Celular */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Celular
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={perfil.informacionGestionAcademica.celular}
                    onChange={(e) => actualizarGestionAcademica('celular', e.target.value)}
                    disabled={!configuracion.modoEdicion}
                    className={`w-full px-4 py-3 border rounded-xl transition-colors ${
                      configuracion.modoEdicion 
                        ? 'border-gray-300 bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary' 
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    } ${configuracion.errores.celular ? 'border-red-300' : ''}`}
                    placeholder="(+210) 55 1234 5678"
                  />
                  {configuracion.errores.celular && (
                    <p className="text-red-500 text-sm mt-1">{configuracion.errores.celular}</p>
                  )}
                </div>
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={perfil.informacionGestionAcademica.telefono || ''}
                    onChange={(e) => actualizarGestionAcademica('telefono', e.target.value)}
                    disabled={!configuracion.modoEdicion}
                    className={`w-full px-4 py-3 border rounded-xl transition-colors ${
                      configuracion.modoEdicion 
                        ? 'border-gray-300 bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary' 
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                    placeholder="Región"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botón de acción */}
          <div className="px-8 pb-8">
            <div className="flex justify-end">
              {!configuracion.modoEdicion ? (
                <button
                  onClick={toggleModoEdicion}
                  className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 font-medium"
                >
                  <FaEdit size={16} />
                  Editar Perfil
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={cancelarEdicion}
                    disabled={configuracion.guardandoCambios}
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 font-medium disabled:opacity-50"
                  >
                    <FaTimes size={16} />
                    Cancelar
                  </button>
                  <button
                    onClick={handleGuardar}
                    disabled={configuracion.guardandoCambios}
                    className="bg-red-700 text-white px-8 py-3 rounded-xl hover:bg-red-800 transition-colors flex items-center gap-2 font-medium disabled:opacity-50"
                  >
                    <FaSave size={16} />
                    {configuracion.guardandoCambios ? 'Actualizando...' : 'Actualizar Datos'}
                  </button>
                </div>
              )}
            </div>

            {/* Error general */}
            {configuracion.errores.general && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{configuracion.errores.general}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 