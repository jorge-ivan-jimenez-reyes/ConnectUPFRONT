// Vista Reportes para administradores

import React, { useState } from 'react';

interface Report {
  id: string;
  title: string;
  type: 'users' | 'institutions' | 'activity' | 'performance';
  generatedBy: string;
  createdAt: string;
  status: 'completed' | 'processing' | 'failed';
  downloadUrl?: string;
}

export const Reportes: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month');
  const [selectedType, setSelectedType] = useState<string>('all');

  const reports: Report[] = [
    {
      id: '1',
      title: 'Reporte de Usuarios Activos - Noviembre 2024',
      type: 'users',
      generatedBy: 'Admin Sistema',
      createdAt: '2024-11-15T10:30:00Z',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Estadísticas de Instituciones - Q4 2024',
      type: 'institutions',
      generatedBy: 'Ana Torres',
      createdAt: '2024-11-10T14:20:00Z',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'Análisis de Actividad del Sistema',
      type: 'activity',
      generatedBy: 'Sistema Automático',
      createdAt: '2024-11-12T08:00:00Z',
      status: 'processing'
    },
    {
      id: '4',
      title: 'Reporte de Rendimiento - Octubre 2024',
      type: 'performance',
      generatedBy: 'Carlos Mendoza',
      createdAt: '2024-11-05T16:45:00Z',
      status: 'failed'
    }
  ];

  const getTypeText = (type: string) => {
    switch (type) {
      case 'users': return 'Usuarios';
      case 'institutions': return 'Instituciones';
      case 'activity': return 'Actividad';
      case 'performance': return 'Rendimiento';
      default: return 'Otro';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'users': return 'bg-blue-100 text-blue-800';
      case 'institutions': return 'bg-green-100 text-green-800';
      case 'activity': return 'bg-purple-100 text-purple-800';
      case 'performance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'processing': return 'Procesando';
      case 'failed': return 'Fallido';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reportes</h1>
          <p className="text-slate-600 mt-1">Genera y gestiona reportes del sistema</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-[#202C59] text-white px-4 py-2 rounded-lg hover:bg-[#2A3B6B] transition-colors">
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nuevo Reporte
          </span>
        </button>
      </div>

      {/* Estadísticas de reportes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Reportes</p>
              <p className="text-2xl font-bold text-[#202C59]">156</p>
            </div>
            <div className="p-3 bg-[#202C59]/10 rounded-lg">
              <svg className="w-6 h-6 text-[#202C59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Este Mes</p>
              <p className="text-2xl font-bold text-green-600">24</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Procesando</p>
              <p className="text-2xl font-bold text-yellow-600">3</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Automáticos</p>
              <p className="text-2xl font-bold text-purple-600">89</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Generadores de reportes rápidos */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Generar Reportes Rápidos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-[#202C59] hover:text-white transition-colors group">
            <div className="flex flex-col items-center text-center">
              <svg className="w-8 h-8 text-blue-600 group-hover:text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <h4 className="font-medium mb-1">Usuarios Activos</h4>
              <p className="text-xs text-slate-600 group-hover:text-white/80">Estadísticas de usuarios por período</p>
            </div>
          </button>

          <button className="p-4 border border-slate-200 rounded-lg hover:bg-[#202C59] hover:text-white transition-colors group">
            <div className="flex flex-col items-center text-center">
              <svg className="w-8 h-8 text-green-600 group-hover:text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-6 0h6" />
              </svg>
              <h4 className="font-medium mb-1">Instituciones</h4>
              <p className="text-xs text-slate-600 group-hover:text-white/80">Reporte de todas las instituciones</p>
            </div>
          </button>

          <button className="p-4 border border-slate-200 rounded-lg hover:bg-[#202C59] hover:text-white transition-colors group">
            <div className="flex flex-col items-center text-center">
              <svg className="w-8 h-8 text-purple-600 group-hover:text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h4 className="font-medium mb-1">Actividad Sistema</h4>
              <p className="text-xs text-slate-600 group-hover:text-white/80">Análisis de uso y actividad</p>
            </div>
          </button>

          <button className="p-4 border border-slate-200 rounded-lg hover:bg-[#202C59] hover:text-white transition-colors group">
            <div className="flex flex-col items-center text-center">
              <svg className="w-8 h-8 text-orange-600 group-hover:text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h4 className="font-medium mb-1">Rendimiento</h4>
              <p className="text-xs text-slate-600 group-hover:text-white/80">Métricas de performance</p>
            </div>
          </button>
        </div>

        <div className="mt-6 flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Período</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#202C59] focus:border-[#202C59]"
            >
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
              <option value="quarter">Último trimestre</option>
              <option value="year">Último año</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filtros para reportes existentes */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar reportes..."
                className="w-64 pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#202C59] focus:border-[#202C59]"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#202C59] focus:border-[#202C59]"
            >
              <option value="all">Todos los tipos</option>
              <option value="users">Usuarios</option>
              <option value="institutions">Instituciones</option>
              <option value="activity">Actividad</option>
              <option value="performance">Rendimiento</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de reportes */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Reporte</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Generado por</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-900">{report.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(report.type)}`}>
                      {getTypeText(report.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">{report.generatedBy}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                      {getStatusText(report.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-2">
                      {report.status === 'completed' && report.downloadUrl && (
                        <button className="text-[#202C59] hover:text-[#2A3B6B] transition-colors">
                          Descargar
                        </button>
                      )}
                      <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        Ver detalles
                      </button>
                      <button className="text-red-600 hover:text-red-700 transition-colors">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}; 