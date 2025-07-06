import React, { useState } from 'react';
import { StatsCard } from '../components';

interface CicloAcademico {
  id: string;
  nombre: string;
  codigo: string;
  fechaInicio: string;
  fechaFin: string;
  fechaInscripcion: string;
  fechaFinInscripcion: string;
  estado: 'activo' | 'inactivo' | 'planificado' | 'finalizado';
  totalEstudiantes: number;
  totalMaterias: number;
  tipo: 'semestral' | 'cuatrimestral' | 'anual';
}

export const CicloAcademico: React.FC = () => {
  const [ciclos, setCiclos] = useState<CicloAcademico[]>([
    {
      id: '1',
      nombre: 'Semestre Enero-Junio 2024',
      codigo: 'SEM-2024-1',
      fechaInicio: '2024-01-15',
      fechaFin: '2024-06-15',
      fechaInscripcion: '2023-12-01',
      fechaFinInscripcion: '2024-01-10',
      estado: 'activo',
      totalEstudiantes: 1200,
      totalMaterias: 85,
      tipo: 'semestral'
    },
    {
      id: '2',
      nombre: 'Semestre Agosto-Diciembre 2024',
      codigo: 'SEM-2024-2',
      fechaInicio: '2024-08-15',
      fechaFin: '2024-12-15',
      fechaInscripcion: '2024-07-01',
      fechaFinInscripcion: '2024-08-10',
      estado: 'planificado',
      totalEstudiantes: 0,
      totalMaterias: 90,
      tipo: 'semestral'
    },
    {
      id: '3',
      nombre: 'Curso de Verano 2024',
      codigo: 'VER-2024',
      fechaInicio: '2024-07-01',
      fechaFin: '2024-07-31',
      fechaInscripcion: '2024-06-01',
      fechaFinInscripcion: '2024-06-25',
      estado: 'planificado',
      totalEstudiantes: 0,
      totalMaterias: 15,
      tipo: 'cuatrimestral'
    }
  ]);

  const [filtros, setFiltros] = useState({
    busqueda: '',
    estado: '',
    tipo: ''
  });

  const [showCreateModal, setShowCreateModal] = useState(false);

  const ciclosFiltrados = ciclos.filter(ciclo => {
    const matchBusqueda = ciclo.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                         ciclo.codigo.toLowerCase().includes(filtros.busqueda.toLowerCase());
    const matchEstado = !filtros.estado || ciclo.estado === filtros.estado;
    const matchTipo = !filtros.tipo || ciclo.tipo === filtros.tipo;
    
    return matchBusqueda && matchEstado && matchTipo;
  });

  const estadisticas = [
    {
      title: 'Total Ciclos',
      value: ciclos.length,
      icon: <span>📅</span>,
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Ciclos Activos',
      value: ciclos.filter(c => c.estado === 'activo').length,
      icon: <span>✅</span>,
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Total Estudiantes',
      value: ciclos.reduce((sum, c) => sum + c.totalEstudiantes, 0),
      icon: <span>👨‍🎓</span>,
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Total Materias',
      value: ciclos.reduce((sum, c) => sum + c.totalMaterias, 0),
      icon: <span>📚</span>,
      iconBgColor: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  const handleEdit = (ciclo: CicloAcademico) => {
    console.log('Editar ciclo:', ciclo);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este ciclo académico?')) {
      setCiclos(ciclos.filter(c => c.id !== id));
    }
  };

  const handleCreateCiclo = () => {
    setShowCreateModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activo': return 'bg-green-100 text-green-800';
      case 'planificado': return 'bg-blue-100 text-blue-800';
      case 'finalizado': return 'bg-gray-100 text-gray-800';
      case 'inactivo': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Ciclos Académicos</h1>
          <p className="text-gray-600">Administra los períodos académicos de la institución</p>
        </div>
        <button
          onClick={handleCreateCiclo}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nuevo Ciclo
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {estadisticas.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Buscar por nombre o código..."
              value={filtros.busqueda}
              onChange={(e) => setFiltros(prev => ({ ...prev, busqueda: e.target.value }))}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={filtros.estado}
              onChange={(e) => setFiltros(prev => ({ ...prev, estado: e.target.value }))}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="activo">Activo</option>
              <option value="planificado">Planificado</option>
              <option value="finalizado">Finalizado</option>
              <option value="inactivo">Inactivo</option>
            </select>
            
            <select
              value={filtros.tipo}
              onChange={(e) => setFiltros(prev => ({ ...prev, tipo: e.target.value }))}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los tipos</option>
              <option value="semestral">Semestral</option>
              <option value="cuatrimestral">Cuatrimestral</option>
              <option value="anual">Anual</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ciclo Académico
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fechas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inscripciones
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estudiantes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Materias
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ciclosFiltrados.map((ciclo) => (
                <tr key={ciclo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{ciclo.nombre}</div>
                      <div className="text-sm text-gray-500">Código: {ciclo.codigo}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">Inicio: {formatDate(ciclo.fechaInicio)}</div>
                      <div className="text-gray-500">Fin: {formatDate(ciclo.fechaFin)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">Del {formatDate(ciclo.fechaInscripcion)}</div>
                      <div className="text-gray-500">al {formatDate(ciclo.fechaFinInscripcion)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {ciclo.tipo.charAt(0).toUpperCase() + ciclo.tipo.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {ciclo.totalEstudiantes} estudiantes
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {ciclo.totalMaterias} materias
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(ciclo.estado)}`}>
                      {ciclo.estado.charAt(0).toUpperCase() + ciclo.estado.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(ciclo)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(ciclo.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {ciclosFiltrados.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay ciclos académicos</h3>
            <p className="text-gray-500">No se encontraron ciclos que coincidan con los filtros.</p>
          </div>
        )}
      </div>

      {/* Modal para crear ciclo */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Nuevo Ciclo Académico</h2>
            <p className="text-gray-600 mb-4">
              Funcionalidad en desarrollo. Aquí podrás crear nuevos ciclos académicos.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 