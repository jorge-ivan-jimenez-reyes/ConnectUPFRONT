import React, { useState } from 'react';
import { StatsCard } from '../components';

interface Materia {
  id: string;
  nombre: string;
  codigo: string;
  carrera: string;
  semestre: number;
  creditos: number;
  horasTeoricas: number;
  horasPracticas: number;
  profesor: string;
  estado: 'activo' | 'inactivo';
  totalEstudiantes: number;
}

export const Materias: React.FC = () => {
  const [materias, setMaterias] = useState<Materia[]>([
    {
      id: '1',
      nombre: 'Programación Orientada a Objetos',
      codigo: 'POO-301',
      carrera: 'Ingeniería en Sistemas Computacionales',
      semestre: 3,
      creditos: 8,
      horasTeoricas: 4,
      horasPracticas: 4,
      profesor: 'Dr. Juan Pérez',
      estado: 'activo',
      totalEstudiantes: 45
    },
    {
      id: '2',
      nombre: 'Cálculo Diferencial',
      codigo: 'CAL-101',
      carrera: 'Licenciatura en Matemáticas',
      semestre: 1,
      creditos: 6,
      horasTeoricas: 4,
      horasPracticas: 2,
      profesor: 'Dra. María González',
      estado: 'activo',
      totalEstudiantes: 30
    },
    {
      id: '3',
      nombre: 'Diseño Digital Avanzado',
      codigo: 'DDA-401',
      carrera: 'Diseño Gráfico Digital',
      semestre: 4,
      creditos: 7,
      horasTeoricas: 3,
      horasPracticas: 4,
      profesor: 'Mtro. Carlos López',
      estado: 'activo',
      totalEstudiantes: 25
    }
  ]);

  const [filtros, setFiltros] = useState({
    busqueda: '',
    estado: '',
    carrera: '',
    semestre: ''
  });

  const [showCreateModal, setShowCreateModal] = useState(false);

  const materiasFiltradas = materias.filter(materia => {
    const matchBusqueda = materia.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                         materia.codigo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                         materia.profesor.toLowerCase().includes(filtros.busqueda.toLowerCase());
    const matchEstado = !filtros.estado || materia.estado === filtros.estado;
    const matchCarrera = !filtros.carrera || materia.carrera === filtros.carrera;
    const matchSemestre = !filtros.semestre || materia.semestre.toString() === filtros.semestre;
    
    return matchBusqueda && matchEstado && matchCarrera && matchSemestre;
  });

  const estadisticas = [
    {
      title: 'Total Materias',
      value: materias.length,
      icon: <span>📚</span>,
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Materias Activas',
      value: materias.filter(m => m.estado === 'activo').length,
      icon: <span>✅</span>,
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Total Estudiantes',
      value: materias.reduce((sum, m) => sum + m.totalEstudiantes, 0),
      icon: <span>👨‍🎓</span>,
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Total Créditos',
      value: materias.reduce((sum, m) => sum + m.creditos, 0),
      icon: <span>🎯</span>,
      iconBgColor: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  const handleEdit = (materia: Materia) => {
    console.log('Editar materia:', materia);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta materia?')) {
      setMaterias(materias.filter(m => m.id !== id));
    }
  };

  const handleCreateMateria = () => {
    setShowCreateModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Materias</h1>
          <p className="text-gray-600">Administra las materias del plan de estudios</p>
        </div>
        <button
          onClick={handleCreateMateria}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nueva Materia
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
              placeholder="Buscar por nombre, código o profesor..."
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
              value={filtros.carrera}
              onChange={(e) => setFiltros(prev => ({ ...prev, carrera: e.target.value }))}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas las carreras</option>
              <option value="Ingeniería en Sistemas Computacionales">Ingeniería en Sistemas</option>
              <option value="Licenciatura en Matemáticas">Licenciatura en Matemáticas</option>
              <option value="Diseño Gráfico Digital">Diseño Gráfico Digital</option>
            </select>
            
            <select
              value={filtros.semestre}
              onChange={(e) => setFiltros(prev => ({ ...prev, semestre: e.target.value }))}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los semestres</option>
              {[1,2,3,4,5,6,7,8,9].map(sem => (
                <option key={sem} value={sem.toString()}>{sem}° Semestre</option>
              ))}
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
                  Materia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Carrera
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semestre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Créditos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profesor
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
              {materiasFiltradas.map((materia) => (
                <tr key={materia.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{materia.nombre}</div>
                      <div className="text-sm text-gray-500">Código: {materia.codigo}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {materia.carrera}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {materia.semestre}° Semestre
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {materia.creditos} créditos
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div>T: {materia.horasTeoricas}h</div>
                      <div>P: {materia.horasPracticas}h</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{materia.profesor}</div>
                      <div className="text-sm text-gray-500">{materia.totalEstudiantes} estudiantes</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      materia.estado === 'activo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {materia.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(materia)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(materia.id)}
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
        
        {materiasFiltradas.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay materias</h3>
            <p className="text-gray-500">No se encontraron materias que coincidan con los filtros.</p>
          </div>
        )}
      </div>

      {/* Modal para crear materia */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Nueva Materia</h2>
            <p className="text-gray-600 mb-4">
              Funcionalidad en desarrollo. Aquí podrás crear nuevas materias.
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