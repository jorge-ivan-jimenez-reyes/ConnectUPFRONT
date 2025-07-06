import React, { useState } from 'react';
import { StatsCard } from '../components';

interface Carrera {
  id: string;
  nombre: string;
  codigo: string;
  facultad: string;
  academia: string;
  coordinador: string;
  duracion: number;
  modalidad: 'presencial' | 'virtual' | 'mixta';
  estado: 'activo' | 'inactivo';
  totalEstudiantes: number;
  totalMaterias: number;
  fechaCreacion: string;
}

export const Carreras: React.FC = () => {
  const [carreras, setCarreras] = useState<Carrera[]>([
    {
      id: '1',
      nombre: 'Ingeniería en Sistemas Computacionales',
      codigo: 'ISC',
      facultad: 'Facultad de Ingeniería',
      academia: 'Academia de Ingeniería de Software',
      coordinador: 'Dr. Juan Pérez',
      duracion: 9,
      modalidad: 'presencial',
      estado: 'activo',
      totalEstudiantes: 450,
      totalMaterias: 65,
      fechaCreacion: '2024-01-15'
    },
    {
      id: '2',
      nombre: 'Licenciatura en Matemáticas',
      codigo: 'LM',
      facultad: 'Facultad de Ciencias',
      academia: 'Academia de Matemáticas Aplicadas',
      coordinador: 'Dra. María González',
      duracion: 8,
      modalidad: 'presencial',
      estado: 'activo',
      totalEstudiantes: 120,
      totalMaterias: 48,
      fechaCreacion: '2024-02-10'
    },
    {
      id: '3',
      nombre: 'Diseño Gráfico Digital',
      codigo: 'DGD',
      facultad: 'Facultad de Artes',
      academia: 'Academia de Diseño Gráfico',
      coordinador: 'Mtro. Carlos López',
      duracion: 8,
      modalidad: 'mixta',
      estado: 'activo',
      totalEstudiantes: 200,
      totalMaterias: 52,
      fechaCreacion: '2024-03-05'
    }
  ]);

  const [filtros, setFiltros] = useState({
    busqueda: '',
    estado: '',
    modalidad: '',
    facultad: ''
  });

  const [showCreateModal, setShowCreateModal] = useState(false);

  const carrerasFiltradas = carreras.filter(carrera => {
    const matchBusqueda = carrera.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                         carrera.codigo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                         carrera.coordinador.toLowerCase().includes(filtros.busqueda.toLowerCase());
    const matchEstado = !filtros.estado || carrera.estado === filtros.estado;
    const matchModalidad = !filtros.modalidad || carrera.modalidad === filtros.modalidad;
    const matchFacultad = !filtros.facultad || carrera.facultad === filtros.facultad;
    
    return matchBusqueda && matchEstado && matchModalidad && matchFacultad;
  });

  const estadisticas = [
    {
      title: 'Total Carreras',
      value: carreras.length,
      icon: <span>🎓</span>,
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Carreras Activas',
      value: carreras.filter(c => c.estado === 'activo').length,
      icon: <span>✅</span>,
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Total Estudiantes',
      value: carreras.reduce((sum, c) => sum + c.totalEstudiantes, 0),
      icon: <span>👨‍🎓</span>,
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Total Materias',
      value: carreras.reduce((sum, c) => sum + c.totalMaterias, 0),
      icon: <span>📚</span>,
      iconBgColor: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  const handleEdit = (carrera: Carrera) => {
    console.log('Editar carrera:', carrera);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta carrera?')) {
      setCarreras(carreras.filter(c => c.id !== id));
    }
  };

  const handleCreateCarrera = () => {
    setShowCreateModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Carreras</h1>
          <p className="text-gray-600">Administra los programas académicos de la institución</p>
        </div>
        <button
          onClick={handleCreateCarrera}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nueva Carrera
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
              placeholder="Buscar por nombre, código o coordinador..."
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
              value={filtros.modalidad}
              onChange={(e) => setFiltros(prev => ({ ...prev, modalidad: e.target.value }))}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas las modalidades</option>
              <option value="presencial">Presencial</option>
              <option value="virtual">Virtual</option>
              <option value="mixta">Mixta</option>
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
                  Carrera
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Facultad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coordinador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duración
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modalidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estudiantes
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
              {carrerasFiltradas.map((carrera) => (
                <tr key={carrera.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{carrera.nombre}</div>
                      <div className="text-sm text-gray-500">Código: {carrera.codigo}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{carrera.facultad}</div>
                      <div className="text-sm text-gray-500">{carrera.academia}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {carrera.coordinador}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {carrera.duracion} semestres
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      carrera.modalidad === 'presencial' ? 'bg-green-100 text-green-800' :
                      carrera.modalidad === 'virtual' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {carrera.modalidad.charAt(0).toUpperCase() + carrera.modalidad.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {carrera.totalEstudiantes} estudiantes
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      carrera.estado === 'activo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {carrera.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(carrera)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(carrera.id)}
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
        
        {carrerasFiltradas.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🎓</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay carreras</h3>
            <p className="text-gray-500">No se encontraron carreras que coincidan con los filtros.</p>
          </div>
        )}
      </div>

      {/* Modal para crear carrera */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Nueva Carrera</h2>
            <p className="text-gray-600 mb-4">
              Funcionalidad en desarrollo. Aquí podrás crear nuevas carreras.
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