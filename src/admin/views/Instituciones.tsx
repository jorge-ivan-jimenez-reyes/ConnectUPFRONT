// Vista Instituciones para administradores - Conectada al Backend

import React, { useState, useMemo } from 'react';
import { StatsCard, DataTable, FilterBar, CreateInstitutionModal } from '../components';
import type { TableColumn } from '../components/DataTable/DataTable';
import type { TableAction, InstitutionFilters } from '../interfaces';
import { useInstitutions } from '../hooks';
import type { InstitutionInput } from '../../shared/interfaces/api';

export const Instituciones: React.FC = () => {
  // Hook para obtener datos del backend
  const {
    institutions,
    total,
    totalPages,
    loading,
    error,
    currentPage,
    search,
    setSearch,
    setPage,
    create,
    update,
    remove,
    refetch,
  } = useInstitutions();

  // Estado para filtros locales (ordenamiento)
  const [filters, setFilters] = useState<InstitutionFilters>({
    searchTerm: '',
    statusFilter: 'all',
    typeFilter: 'all',
    sortBy: 'nombre',
    sortOrder: 'asc'
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  // Estado para el modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreatingInstitution, setIsCreatingInstitution] = useState(false);

  // Configuración de columnas
  const columns: TableColumn[] = [
    { key: 'name', title: 'Institución', width: 'w-1/3' },
    { key: 'location', title: 'Ubicación', width: 'w-1/3' },
    { key: 'num_faculties', title: 'Facultades', width: 'w-1/6', align: 'center' },
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
      onClick: handleViewInstitution,
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
      onClick: handleEditInstitution,
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
      onClick: handleDeleteInstitution,
      variant: 'danger'
    }
  ];

  // Procesar datos para mostrar en la tabla
  const processedData = useMemo(() => {
    return institutions.map(institution => ({
      id: String(institution.id),
      name: institution.name,
      location: institution.location,
      num_faculties: institution.num_faculties,
      status: (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
          Activa
        </span>
      )
    }));
  }, [institutions]);

  // Handlers
  function handleCreateInstitution() {
    setIsCreateModalOpen(true);
  }

  async function handleCreateInstitutionSubmit(data: { nombre: string; ciudad: string; adminNombre: string }) {
    setIsCreatingInstitution(true);
    
    try {
      // Mapear datos del formulario al formato del backend
      const institutionData: InstitutionInput = {
        name: data.nombre,
        location: data.ciudad,
      };
      
      await create(institutionData);
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error('Error creating institution:', err);
      alert(err instanceof Error ? err.message : 'Error al crear la institución');
    } finally {
      setIsCreatingInstitution(false);
    }
  }

  function handleViewInstitution(id: string) {
    console.log('Ver institución:', id);
    // TODO: Navegar a vista de detalle o abrir modal
  }

  function handleEditInstitution(id: string) {
    console.log('Editar institución:', id);
    // TODO: Abrir modal de edición
  }

  async function handleDeleteInstitution(id: string) {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta institución?')) {
      try {
        await remove(Number(id));
      } catch (err) {
        console.error('Error deleting institution:', err);
        alert(err instanceof Error ? err.message : 'Error al eliminar la institución');
      }
    }
  }

  // Manejar búsqueda con debounce
  const handleSearchChange = (term: string) => {
    setFilters(prev => ({ ...prev, searchTerm: term }));
    setSearch(term);
  };

  // Calcular estadísticas
  const totalFaculties = institutions.reduce((sum, inst) => sum + inst.num_faculties, 0);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Gestión de Instituciones</h1>
            <p className="text-slate-600 mt-2">Administra las instituciones registradas en el sistema</p>
          </div>
          <button 
            onClick={handleCreateInstitution}
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-[#202C59] text-white px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-[#2A3B6B] transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nueva Institución
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
            title="Instituciones"
            value={total}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-6 0h6" />
              </svg>
            }
            iconBgColor="bg-indigo-50"
            iconColor="text-indigo-600"
            valueColor="text-indigo-600"
          />

          <StatsCard
            title="Facultades"
            value={totalFaculties}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
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
          searchPlaceholder="Buscar instituciones..."
          filters={[
            {
              label: 'Estado',
              value: filters.statusFilter,
              options: [
                { value: 'all', label: 'Todos los estados' },
                { value: 'activa', label: 'Activas' },
                { value: 'pendiente', label: 'Pendientes' },
                { value: 'inactiva', label: 'Inactivas' }
              ],
              onChange: (value) => setFilters(prev => ({ ...prev, statusFilter: value as typeof filters.statusFilter }))
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
              <span className="text-slate-600">Cargando instituciones...</span>
            </div>
          </div>
        )}

        {/* Tabla */}
        {!loading && (
          <>
            <DataTable
              title={`Instituciones (${total})`}
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
            {!loading && institutions.length === 0 && !error && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-6 0h6" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-slate-900">No hay instituciones</h3>
                <p className="mt-2 text-slate-600">
                  {search ? 'No se encontraron instituciones con ese criterio de búsqueda.' : 'Comienza creando tu primera institución.'}
                </p>
                {!search && (
                  <button
                    onClick={handleCreateInstitution}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#202C59] rounded-lg hover:bg-[#2A3B6B]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Nueva Institución
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal para crear institución */}
      <CreateInstitutionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateInstitutionSubmit}
        isLoading={isCreatingInstitution}
      />
    </div>
  );
};
