// Vista Mis Clases - Gestión de clases del docente

import React, { useState } from 'react';

export const MisClases: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const clases = [
    {
      id: 1,
      nombre: 'Desarrollo Frontend',
      codigo: 'DEV-001',
      estudiantes: 28,
      horario: 'Lun/Mié 9:00-11:00',
      aula: 'Lab 301',
      estado: 'Activa',
      progreso: 75
    },
    {
      id: 2,
      nombre: 'React Avanzado',
      codigo: 'REA-002',
      estudiantes: 22,
      horario: 'Mar/Jue 14:00-16:00',
      aula: 'Lab 205',
      estado: 'Activa',
      progreso: 60
    },
    {
      id: 3,
      nombre: 'Base de Datos',
      codigo: 'DB-003',
      estudiantes: 35,
      horario: 'Vie 8:00-12:00',
      aula: 'Aula 101',
      estado: 'Pausada',
      progreso: 40
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Clases</h1>
          <p className="text-gray-600 mt-2">Gestiona todas tus clases activas</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Toggle de vista */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white text-brand-primary shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white text-brand-primary shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Lista
            </button>
          </div>
          
          <button className="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary/90 transition-colors">
            Nueva Clase
          </button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">3</div>
          <p className="text-gray-600 text-sm">Clases Activas</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">85</div>
          <p className="text-gray-600 text-sm">Total Estudiantes</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">12</div>
          <p className="text-gray-600 text-sm">Horas/Semana</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">58%</div>
          <p className="text-gray-600 text-sm">Progreso Promedio</p>
        </div>
      </div>

      {/* Lista/Grid de clases */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clases.map((clase) => (
            <div key={clase.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  clase.estado === 'Activa' 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-yellow-600 bg-yellow-50'
                }`}>
                  {clase.estado}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{clase.nombre}</h3>
              <p className="text-sm text-gray-600 mb-4">{clase.codigo}</p>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  {clase.estudiantes} estudiantes
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {clase.horario}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0h6" />
                  </svg>
                  {clase.aula}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Progreso</span>
                  <span className="font-medium">{clase.progreso}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-brand-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${clase.progreso}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Clase</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Código</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Estudiantes</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Horario</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Estado</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Progreso</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clases.map((clase) => (
                    <tr key={clase.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{clase.nombre}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{clase.codigo}</td>
                      <td className="py-4 px-4 text-gray-600">{clase.estudiantes}</td>
                      <td className="py-4 px-4 text-gray-600">{clase.horario}</td>
                      <td className="py-4 px-4">
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                          clase.estado === 'Activa' 
                            ? 'text-green-600 bg-green-50' 
                            : 'text-yellow-600 bg-yellow-50'
                        }`}>
                          {clase.estado}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-brand-primary h-2 rounded-full"
                              style={{ width: `${clase.progreso}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{clase.progreso}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 