// Vista Temarios - Gestión de contenido académico

import React, { useState } from 'react';

interface Temario {
  id: string;
  titulo: string;
  clase: string;
  unidades: number;
  estado: 'borrador' | 'publicado' | 'archivado';
  fechaCreacion: string;
  fechaActualizacion: string;
  progreso: number;
}

export const Temarios: React.FC = () => {
  const [filtroClase, setFiltroClase] = useState<string>('todas');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');

  const temarios: Temario[] = [
    {
      id: '1',
      titulo: 'Fundamentos de React',
      clase: 'React Avanzado',
      unidades: 8,
      estado: 'publicado',
      fechaCreacion: '2024-01-10',
      fechaActualizacion: '2024-01-15',
      progreso: 100
    },
    {
      id: '2',
      titulo: 'HTML y CSS Moderno',
      clase: 'Desarrollo Web Frontend',
      unidades: 12,
      estado: 'publicado',
      fechaCreacion: '2024-01-05',
      fechaActualizacion: '2024-01-12',
      progreso: 100
    },
    {
      id: '3',
      titulo: 'Diseño de Bases de Datos',
      clase: 'Bases de Datos',
      unidades: 6,
      estado: 'borrador',
      fechaCreacion: '2024-01-20',
      fechaActualizacion: '2024-01-20',
      progreso: 60
    },
    {
      id: '4',
      titulo: 'JavaScript ES6+',
      clase: 'JavaScript Fundamentals',
      unidades: 10,
      estado: 'publicado',
      fechaCreacion: '2024-01-08',
      fechaActualizacion: '2024-01-18',
      progreso: 100
    }
  ];

  const clases = [...new Set(temarios.map(t => t.clase))];

  const temariosFiltrados = temarios.filter(temario => {
    const cumpleFiltroClase = filtroClase === 'todas' || temario.clase === filtroClase;
    const cumpleFiltroEstado = filtroEstado === 'todos' || temario.estado === filtroEstado;
    return cumpleFiltroClase && cumpleFiltroEstado;
  });

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'publicado': return 'bg-green-100 text-green-800';
      case 'borrador': return 'bg-yellow-100 text-yellow-800';
      case 'archivado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Temarios</h1>
          <p className="text-gray-600">Gestiona el contenido académico de tus clases</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-primary/90 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nuevo Temario
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            Importar
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Temarios</p>
              <p className="text-2xl font-bold text-gray-900">{temarios.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Publicados</p>
              <p className="text-2xl font-bold text-gray-900">
                {temarios.filter(t => t.estado === 'publicado').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En Borrador</p>
              <p className="text-2xl font-bold text-gray-900">
                {temarios.filter(t => t.estado === 'borrador').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Unidades</p>
              <p className="text-2xl font-bold text-gray-900">
                {temarios.reduce((total, t) => total + t.unidades, 0)}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Filtrar por clase:</label>
              <select 
                value={filtroClase}
                onChange={(e) => setFiltroClase(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              >
                <option value="todas">Todas las clases</option>
                {clases.map(clase => (
                  <option key={clase} value={clase}>{clase}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Estado:</label>
              <select 
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              >
                <option value="todos">Todos</option>
                <option value="publicado">Publicados</option>
                <option value="borrador">Borradores</option>
                <option value="archivado">Archivados</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:ml-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar temarios..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de temarios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {temariosFiltrados.map((temario) => (
          <div key={temario.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{temario.titulo}</h3>
                  <p className="text-sm text-gray-600">{temario.clase}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEstadoColor(temario.estado)}`}>
                  {temario.estado}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Unidades</span>
                  <span className="font-medium text-gray-900">{temario.unidades}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progreso</span>
                  <span className="font-medium text-gray-900">{temario.progreso}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-brand-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${temario.progreso}%` }}
                  />
                </div>

                <div className="text-xs text-gray-500">
                  <p>Creado: {new Date(temario.fechaCreacion).toLocaleDateString()}</p>
                  <p>Actualizado: {new Date(temario.fechaActualizacion).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 bg-brand-primary text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-brand-primary/90 transition-colors">
                  Editar
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Plantillas rápidas */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Plantillas Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { nombre: 'Plantilla Básica', descripcion: 'Temario estándar con 8 unidades', icono: '📚' },
            { nombre: 'Curso Intensivo', descripcion: 'Temario condensado para cursos cortos', icono: '⚡' },
            { nombre: 'Proyecto Final', descripcion: 'Estructura para cursos con proyecto final', icono: '🎯' }
          ].map((plantilla, index) => (
            <button key={index} className="text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{plantilla.icono}</span>
                <div>
                  <p className="font-medium text-gray-900">{plantilla.nombre}</p>
                  <p className="text-sm text-gray-500">{plantilla.descripcion}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 