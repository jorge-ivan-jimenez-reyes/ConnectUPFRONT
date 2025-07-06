import React, { useState } from 'react';
import { StatsCard } from '../components';

interface Academia {
  id: string;
  nombre: string;
  facultad: string;
  coordinador: string;
  email: string;
  telefono: string;
  estado: 'activo' | 'inactivo';
  fechaCreacion: string;
  totalProfesores: number;
  totalMaterias: number;
}

export const Academias: React.FC = () => {
  const [academias, setAcademias] = useState<Academia[]>([
    {
      id: '1',
      nombre: 'Academia de Ingeniería de Software',
      facultad: 'Facultad de Ingeniería',
      coordinador: 'Dr. Juan Pérez',
      email: 'software@universidad.edu',
      telefono: '+52 555 123 4567',
      estado: 'activo',
      fechaCreacion: '2024-01-15',
      totalProfesores: 12,
      totalMaterias: 8
    },
    {
      id: '2',
      nombre: 'Academia de Matemáticas Aplicadas',
      facultad: 'Facultad de Ciencias',
      coordinador: 'Dra. María González',
      email: 'matematicas@universidad.edu',
      telefono: '+52 555 234 5678',
      estado: 'activo',
      fechaCreacion: '2024-02-10',
      totalProfesores: 15,
      totalMaterias: 10
    },
    {
      id: '3',
      nombre: 'Academia de Diseño Gráfico',
      facultad: 'Facultad de Artes',
      coordinador: 'Mtro. Carlos López',
      email: 'diseno@universidad.edu',
      telefono: '+52 555 345 6789',
      estado: 'inactivo',
      fechaCreacion: '2024-03-05',
      totalProfesores: 8,
      totalMaterias: 6
    }
  ]);

  const [filtros, setFiltros] = useState({
    busqueda: '',
    estado: '',
    facultad: ''
  });

  const [showCreateModal, setShowCreateModal] = useState(false);

  const academiasFiltradas = academias.filter(academia => {
    const matchBusqueda = academia.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                         academia.coordinador.toLowerCase().includes(filtros.busqueda.toLowerCase());
    const matchEstado = !filtros.estado || academia.estado === filtros.estado;
    const matchFacultad = !filtros.facultad || academia.facultad === filtros.facultad;
    
    return matchBusqueda && matchEstado && matchFacultad;
  });

  const estadisticas = [
    {
      title: 'Total Academias',
      value: academias.length,
      icon: <span>🏛️</span>,
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Academias Activas',
      value: academias.filter(a => a.estado === 'activo').length,
      icon: <span>✅</span>,
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Total Profesores',
      value: academias.reduce((sum, a) => sum + a.totalProfesores, 0),
      icon: <span>👨‍🏫</span>,
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Total Materias',
      value: academias.reduce((sum, a) => sum + a.totalMaterias, 0),
      icon: <span>📚</span>,
      iconBgColor: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];



  const handleEdit = (academia: Academia) => {
    console.log('Editar academia:', academia);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta academia?')) {
      setAcademias(academias.filter(a => a.id !== id));
    }
  };

  const handleCreateAcademia = () => {
    setShowCreateModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Academias</h1>
          <p className="text-gray-600">Administra las academias de la institución</p>
        </div>
        <button
          onClick={handleCreateAcademia}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nueva Academia
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
              placeholder="Buscar por nombre o coordinador..."
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
              <option value="inactivo">Inactivo</option>
            </select>
            
            <select
              value={filtros.facultad}
              onChange={(e) => setFiltros(prev => ({ ...prev, facultad: e.target.value }))}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas las facultades</option>
              <option value="Facultad de Ingeniería">Facultad de Ingeniería</option>
              <option value="Facultad de Ciencias">Facultad de Ciencias</option>
              <option value="Facultad de Artes">Facultad de Artes</option>
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
                  Academia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Facultad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coordinador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profesores
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
              {academiasFiltradas.map((academia) => (
                <tr key={academia.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{academia.nombre}</div>
                      <div className="text-sm text-gray-500">{academia.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {academia.facultad}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{academia.coordinador}</div>
                      <div className="text-sm text-gray-500">{academia.telefono}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {academia.totalProfesores} profesores
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {academia.totalMaterias} materias
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      academia.estado === 'activo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {academia.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(academia)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(academia.id)}
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
        
        {academiasFiltradas.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🏛️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay academias</h3>
            <p className="text-gray-500">No se encontraron academias que coincidan con los filtros.</p>
          </div>
        )}
      </div>

      {/* Modal para crear academia */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Nueva Academia</h2>
            <p className="text-gray-600 mb-4">
              Funcionalidad en desarrollo. Aquí podrás crear nuevas academias.
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