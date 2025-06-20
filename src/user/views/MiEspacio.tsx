// Vista Mi Espacio - Espacio personal del docente

import React from 'react';

export const MiEspacio: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header de la página */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mi Espacio</h1>
          <p className="text-gray-600 mt-2">Tu espacio personal de trabajo</p>
        </div>
        <button className="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary/90 transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nuevo Contenido
        </button>
      </div>

      {/* Tarjetas de ejemplo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarjeta 1 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Activo</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Mis Documentos</h3>
          <p className="text-gray-600 text-sm mb-4">Gestiona todos tus archivos y documentos académicos</p>
          <div className="text-2xl font-bold text-gray-900">24</div>
          <p className="text-xs text-gray-500">Archivos totales</p>
        </div>

        {/* Tarjeta 2 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">En línea</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Estudiantes</h3>
          <p className="text-gray-600 text-sm mb-4">Total de estudiantes en todas tus clases</p>
          <div className="text-2xl font-bold text-gray-900">127</div>
          <p className="text-xs text-gray-500">Estudiantes activos</p>
        </div>

        {/* Tarjeta 3 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Hoy</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Próxima Clase</h3>
          <p className="text-gray-600 text-sm mb-4">React Avanzado - Lab 205</p>
          <div className="text-2xl font-bold text-gray-900">14:00</div>
          <p className="text-xs text-gray-500">En 2 horas</p>
        </div>
      </div>

      {/* Lista de actividades recientes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Actividad Reciente</h2>
          <div className="space-y-4">
            {[
              { action: 'Nuevo temario creado', item: 'JavaScript ES6+', time: 'Hace 2 horas', icon: '📚' },
              { action: 'Estudiante inscrito', item: 'María González', time: 'Hace 3 horas', icon: '👤' },
              { action: 'Clase completada', item: 'React Hooks', time: 'Hace 1 día', icon: '✅' },
              { action: 'Material subido', item: 'Ejercicios Prácticos', time: 'Hace 2 días', icon: '📁' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{activity.icon}</div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.item}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 