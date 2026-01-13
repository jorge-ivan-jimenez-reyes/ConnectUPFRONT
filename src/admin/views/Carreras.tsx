// Vista Carreras/Programas para administradores - Conectada al Backend

import React, { useState, useMemo } from 'react';
import { StatsCard, DataTable, FilterBar } from '../components';
import type { TableColumn } from '../components/DataTable/DataTable';
import type { TableAction } from '../interfaces';
import { usePrograms, useAcademies } from '../hooks';
import type { ProgramInput } from '../../shared/interfaces/api';

export const Carreras: React.FC = () => {
  // Hooks para obtener datos del backend
  const {
    programs,
    total,
    totalPages,
    loading,
    error,
    currentPage,
    search,
    setSearch,
    setPage,
    create,
    remove,
    refetch,
  } = usePrograms();

  // Obtener academias para el selector
  const { academies } = useAcademies();

  // Estado para filtros locales
  const [filters, setFilters] = useState({
    searchTerm: '',
    academiaFilter: 'all',
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  // Estado para el modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Configuración de columnas
  const columns: TableColumn[] = [
    { key: 'name', title: 'Carrera', width: 'w-1/3' },
    { key: 'academy_name', title: 'Academia', width: 'w-1/4' },
    { key: 'num_cycles', title: 'Ciclos', width: 'w-1/6', align: 'center' },
    { key: 'status', title: 'Estado', width: 'w-1/6', align: 'center' }
  ];

  // Acciones de tabla
  const tableActions: TableAction[] = [
    {
      type: 'view',
      label: 'Ver detalles',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      onClick: handleView,
      variant: 'primary'
    },
    {
      type: 'edit',
      label: 'Editar',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      onClick: handleEdit,
      variant: 'secondary'
    },
    {
      type: 'delete',
      label: 'Eliminar',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      onClick: handleDelete,
      variant: 'danger'
    }
  ];

  // Procesar datos para mostrar en la tabla
  const processedData = useMemo(() => {
    return programs.map(program => ({
      id: String(program.id),
      name: program.name,
      academy_name: program.academy_name || 'Sin academia',
      num_cycles: program.num_cycles || 0,
      status: (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
          Activo
        </span>
      )
    }));
  }, [programs]);

  // Handlers
  function handleCreate() {
    setIsCreateModalOpen(true);
  }

  async function handleCreateSubmit(data: { nombre: string; academiaId: number }) {
    setIsCreating(true);
    
    try {
      const programData: ProgramInput = {
        name: data.nombre,
        academy: data.academiaId,
      };
      
      await create(programData);
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error('Error creating program:', err);
      alert(err instanceof Error ? err.message : 'Error al crear la carrera');
    } finally {
      setIsCreating(false);
    }
  }

  function handleView(id: string) {
    console.log('Ver carrera:', id);
  }

  function handleEdit(id: string) {
    console.log('Editar carrera:', id);
  }

  async function handleDelete(id: string) {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta carrera?')) {
      try {
        await remove(Number(id));
      } catch (err) {
        console.error('Error deleting program:', err);
        alert(err instanceof Error ? err.message : 'Error al eliminar la carrera');
      }
    }
  }

  // Manejar búsqueda
  const handleSearchChange = (term: string) => {
    setFilters(prev => ({ ...prev, searchTerm: term }));
    setSearch(term);
  };

  // Calcular estadísticas
  const totalCycles = programs.reduce((sum, prog) => sum + (prog.num_cycles || 0), 0);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Gestión de Carreras</h1>
            <p className="text-slate-600 mt-2">Administra los programas académicos de la institución</p>
          </div>
          <button 
            onClick={handleCreate}
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-[#202C59] text-white px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-[#2A3B6B] transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nueva Carrera
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700 text-sm">{error}</p>
            <button 
              onClick={() => refetch()}
              className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <StatsCard
            title="Carreras"
            value={total}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            }
            iconBgColor="bg-indigo-50"
            iconColor="text-indigo-600"
            valueColor="text-indigo-600"
          />

          <StatsCard
            title="Ciclos Totales"
            value={totalCycles}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            iconBgColor="bg-emerald-50"
            iconColor="text-emerald-600"
            valueColor="text-emerald-600"
          />
        </div>

        {/* Filtros */}
        <FilterBar
          searchTerm={filters.searchTerm}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Buscar carreras..."
          filters={[
            {
              label: 'Academia',
              value: filters.academiaFilter,
              options: [
                { value: 'all', label: 'Todas las academias' },
                ...academies.map(ac => ({ value: String(ac.id), label: ac.name }))
              ],
              onChange: (value) => setFilters(prev => ({ ...prev, academiaFilter: value }))
            }
          ]}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          showViewToggle={true}
        />

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <svg className="animate-spin h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-slate-600">Cargando carreras...</span>
            </div>
          </div>
        )}

        {/* Tabla */}
        {!loading && (
          <>
            <DataTable
              title={`Carreras (${total})`}
              columns={columns}
              data={processedData}
              actions={tableActions}
              showAddButton={false}
            />

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-lg">
                <div className="text-sm text-slate-600">
                  Página {currentPage} de {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && programs.length === 0 && !error && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-slate-900">No hay carreras</h3>
                <p className="mt-2 text-slate-600">
                  {search ? 'No se encontraron carreras con ese criterio de búsqueda.' : 'Comienza creando tu primera carrera.'}
                </p>
                {!search && (
                  <button
                    onClick={handleCreate}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#202C59] rounded-lg hover:bg-[#2A3B6B]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Nueva Carrera
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal para crear carrera */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Nueva Carrera</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleCreateSubmit({
                nombre: formData.get('nombre') as string,
                academiaId: Number(formData.get('academia'))
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    name="nombre"
                    type="text"
                    required
                    className="input-light w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    placeholder="Nombre de la carrera"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academia</label>
                  <select
                    name="academia"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="">Seleccionar academia</option>
                    {academies.map(ac => (
                      <option key={ac.id} value={ac.id}>{ac.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isCreating ? 'Creando...' : 'Crear Carrera'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
