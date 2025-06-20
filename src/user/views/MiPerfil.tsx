// Vista Mi Perfil - Configuración del perfil del usuario

import React, { useState } from 'react';

export const MiPerfil: React.FC = () => {
  const [tabActiva, setTabActiva] = useState<'personal' | 'seguridad' | 'notificaciones'>('personal');
  const [modoEdicion, setModoEdicion] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
          <p className="text-gray-600 mt-2">Gestiona tu información personal y configuración</p>
        </div>
        <button 
          onClick={() => setModoEdicion(!modoEdicion)}
          className="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary/90 transition-colors"
        >
          {modoEdicion ? 'Guardar Cambios' : 'Editar Perfil'}
        </button>
      </div>

      {/* Header del perfil */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6 rounded-lg text-white">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-white">JD</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Juan Docente</h2>
            <p className="text-white/90">Profesor de Desarrollo Web</p>
            <p className="text-white/80 text-sm">Miembro desde Enero 2024</p>
          </div>
        </div>
      </div>

      {/* Navegación de tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'personal', nombre: 'Información Personal', icon: '👤' },
              { id: 'seguridad', nombre: 'Seguridad', icon: '🔒' },
              { id: 'notificaciones', nombre: 'Notificaciones', icon: '🔔' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTabActiva(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  tabActiva === tab.id
                    ? 'border-brand-primary text-brand-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.nombre}
              </button>
            ))}
          </nav>
        </div>

        {/* Contenido de las tabs */}
        <div className="p-6">
          {tabActiva === 'personal' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Información Personal</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    defaultValue="Juan"
                    disabled={!modoEdicion}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary disabled:bg-gray-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                  <input
                    type="text"
                    defaultValue="Docente"
                    disabled={!modoEdicion}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary disabled:bg-gray-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="juan.docente@universidad.edu"
                    disabled={!modoEdicion}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary disabled:bg-gray-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    disabled={!modoEdicion}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary disabled:bg-gray-50"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Especialidad</label>
                <input
                  type="text"
                  defaultValue="Desarrollo Web Full Stack"
                  disabled={!modoEdicion}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary disabled:bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Biografía</label>
                <textarea
                  rows={4}
                  defaultValue="Profesor con más de 5 años de experiencia en desarrollo web. Especializado en tecnologías modernas como React, Node.js y bases de datos."
                  disabled={!modoEdicion}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary disabled:bg-gray-50"
                />
              </div>
            </div>
          )}

          {tabActiva === 'seguridad' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Configuración de Seguridad</h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <svg className="w-5 h-5 text-yellow-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Última sesión</h4>
                    <p className="text-sm text-yellow-700 mt-1">Accediste por última vez el 20 de Enero, 2024 a las 14:30</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Cambiar Contraseña</h4>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Contraseña actual"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                    <input
                      type="password"
                      placeholder="Nueva contraseña"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                    <input
                      type="password"
                      placeholder="Confirmar nueva contraseña"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                  <button className="mt-3 bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-primary/90 transition-colors">
                    Actualizar Contraseña
                  </button>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Autenticación de Dos Factores</h4>
                  <p className="text-sm text-gray-600 mb-3">Añade una capa extra de seguridad a tu cuenta.</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Activar 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {tabActiva === 'notificaciones' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Preferencias de Notificaciones</h3>
              
              <div className="space-y-4">
                {[
                  { id: 'email', titulo: 'Notificaciones por Email', descripcion: 'Recibe notificaciones importantes por correo electrónico' },
                  { id: 'nuevos-estudiantes', titulo: 'Nuevos Estudiantes', descripcion: 'Notificar cuando un estudiante se inscribe en tus clases' },
                  { id: 'entregas', titulo: 'Entregas de Tareas', descripcion: 'Notificar cuando los estudiantes entregan tareas' },
                  { id: 'recordatorios', titulo: 'Recordatorios de Clases', descripcion: 'Recordatorios 30 minutos antes de cada clase' }
                ].map((notif) => (
                  <div key={notif.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{notif.titulo}</h4>
                      <p className="text-sm text-gray-600">{notif.descripcion}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 