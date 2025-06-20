// Vista Mis Horarios - Gestión de horarios de clases

import React, { useState } from 'react';

export const MisHorarios: React.FC = () => {
  const [vistaActual, setVistaActual] = useState<'calendario' | 'lista'>('calendario');

  const horarios = [
    { dia: 'Lunes', hora: '09:00-11:00', clase: 'Desarrollo Frontend', aula: 'Lab 301', estudiantes: 28 },
    { dia: 'Martes', hora: '14:00-16:00', clase: 'React Avanzado', aula: 'Lab 205', estudiantes: 22 },
    { dia: 'Miércoles', hora: '09:00-11:00', clase: 'Desarrollo Frontend', aula: 'Lab 301', estudiantes: 28 },
    { dia: 'Jueves', hora: '14:00-16:00', clase: 'React Avanzado', aula: 'Lab 205', estudiantes: 22 },
    { dia: 'Viernes', hora: '08:00-12:00', clase: 'Base de Datos', aula: 'Aula 101', estudiantes: 35 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Horarios</h1>
          <p className="text-gray-600 mt-2">Gestiona tus horarios de clases</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Toggle de vista */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setVistaActual('calendario')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                vistaActual === 'calendario' 
                  ? 'bg-white text-brand-primary shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Calendario
            </button>
            <button
              onClick={() => setVistaActual('lista')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                vistaActual === 'lista' 
                  ? 'bg-white text-brand-primary shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Lista
            </button>
          </div>
          
          <button className="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary/90 transition-colors">
            Nuevo Horario
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">18</div>
          <p className="text-gray-600 text-sm">Horas/Semana</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">5</div>
          <p className="text-gray-600 text-sm">Clases Programadas</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">3</div>
          <p className="text-gray-600 text-sm">Aulas Utilizadas</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">85</div>
          <p className="text-gray-600 text-sm">Total Estudiantes</p>
        </div>
      </div>

      {vistaActual === 'calendario' ? (
        /* Vista de calendario semanal */
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Semana del 15 - 21 Enero 2024</h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-sm text-gray-600">Esta semana</span>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-6 gap-4">
              {/* Headers de días */}
              <div className="text-sm font-medium text-gray-600 text-center">Hora</div>
              {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map(dia => (
                <div key={dia} className="text-sm font-medium text-gray-900 text-center p-2 bg-gray-50 rounded-lg">
                  {dia}
                </div>
              ))}
              
              {/* Horarios */}
              {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map(hora => (
                <React.Fragment key={hora}>
                  <div className="text-sm text-gray-600 text-center py-4 border-t border-gray-100">
                    {hora}
                  </div>
                  {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map(dia => {
                    const claseEnHora = horarios.find(h => h.dia === dia && h.hora.includes(hora));
                    return (
                      <div key={`${dia}-${hora}`} className="py-4 border-t border-gray-100">
                        {claseEnHora && (
                          <div className="bg-brand-primary text-white p-2 rounded-lg text-xs">
                            <div className="font-medium">{claseEnHora.clase}</div>
                            <div className="text-white/80">{claseEnHora.aula}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Vista de lista */
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Día</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Horario</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Clase</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Aula</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Estudiantes</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {horarios.map((horario, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{horario.dia}</td>
                      <td className="py-4 px-4 text-gray-600">{horario.hora}</td>
                      <td className="py-4 px-4 text-gray-900">{horario.clase}</td>
                      <td className="py-4 px-4 text-gray-600">{horario.aula}</td>
                      <td className="py-4 px-4 text-gray-600">{horario.estudiantes}</td>
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

      {/* Próximas clases */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Próximas Clases</h2>
          <div className="space-y-3">
            {[
              { clase: 'Desarrollo Frontend', hora: '09:00', aula: 'Lab 301', tiempo: 'En 2 horas' },
              { clase: 'React Avanzado', hora: '14:00', aula: 'Lab 205', tiempo: 'Mañana' },
              { clase: 'Base de Datos', hora: '08:00', aula: 'Aula 101', tiempo: 'Viernes' }
            ].map((proxima, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{proxima.clase}</p>
                    <p className="text-sm text-gray-600">{proxima.hora} - {proxima.aula}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-brand-primary">{proxima.tiempo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 