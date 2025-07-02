// Vista Instituciones para administradores

import React, { useState, useMemo } from 'react';
import { StatsCard, DataTable, FilterBar, CreateInstitutionModal } from '../components';
import type { TableColumn } from '../components/DataTable/DataTable';
import type { 
  InstitutionStats, 
  InstitutionManagementRow, 
  InstitutionFilters, 
  TableAction,
  CreateInstitutionFormDTO 
} from '../interfaces';

export const Instituciones: React.FC = () => {
  // Estado para filtros
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

  // Estadísticas de instituciones
  const stats: InstitutionStats = {
    total: 4,
    activas: 2,
    pendientes: 1,
    inactivas: 1,
    totalUsuarios: 2495,
    totalFacultades: 28
  };

  // Datos de ejemplo para instituciones
  const institutionsData: InstitutionManagementRow[] = [
    {
      id: '1',
      nombre: 'Universidad Panamericana',
      tipo: 'Universidad Privada',
      ubicacion: 'Ciudad de México, México',
      usuarios: 850,
      facultades: 8,
      estado: 'activa',
      fechaCreacion: '24.Ene.2021',
      ultimaActividad: '2 horas'
    },
    {
      id: '2',
      nombre: 'Universidad Panamericana AGS',
      tipo: 'Universidad Privada',
      ubicacion: 'Aguascalientes, México',
      usuarios: 620,
      facultades: 6,
      estado: 'activa',
      fechaCreacion: '12.Ene.2021',
      ultimaActividad: '1 día'
    },
    {
      id: '3',
      nombre: 'Universidad Panamericana GDL',
      tipo: 'Universidad Privada',
      ubicacion: 'Guadalajara, México',
      usuarios: 750,
      facultades: 7,
      estado: 'pendiente',
      fechaCreacion: '5.Ene.2021',
      ultimaActividad: '3 días'
    },
    {
      id: '4',
      nombre: 'IPADE Business School',
      tipo: 'Instituto de Negocios',
      ubicacion: 'Ciudad de México, México',
      usuarios: 275,
      facultades: 7,
      estado: 'inactiva',
      fechaCreacion: '7.Ene.2021',
      ultimaActividad: '2 semanas'
    }
  ];

  // Configuración de columnas
  const columns: TableColumn[] = [
    { key: 'nombre', title: 'Institución', width: 'w-1/4' },
    { key: 'tipo', title: 'Tipo', width: 'w-1/6' },
    { key: 'ubicacion', title: 'Ubicación', width: 'w-1/4' },
    { key: 'usuarios', title: 'Usuarios', width: 'w-1/12', align: 'center' },
    { key: 'facultades', title: 'Facultades', width: 'w-1/12', align: 'center' },
    { key: 'estado', title: 'Estado', width: 'w-1/12', align: 'center' },
    { key: 'fechaCreacion', title: 'Creación', width: 'w-1/8', align: 'center' }
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

  // Filtrar y ordenar datos
  const filteredData = useMemo(() => {
    let filtered = institutionsData.filter((institution) => {
      const matchesSearch = institution.nombre.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           institution.ubicacion.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesStatus = filters.statusFilter === 'all' || institution.estado === filters.statusFilter;
      const matchesType = filters.typeFilter === 'all' || 
                         institution.tipo.toLowerCase().includes(filters.typeFilter.toLowerCase());
      
      return matchesSearch && matchesStatus && matchesType;
    });

    // Ordenar
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy as keyof InstitutionManagementRow];
      const bValue = b[filters.sortBy as keyof InstitutionManagementRow];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return filters.sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return filters.sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    return filtered;
  }, [institutionsData, filters]);

  // Procesar datos para mostrar en la tabla
  const processedData = filteredData.map(institution => ({
    ...institution,
    estado: (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(institution.estado)}`}>
        {getStatusText(institution.estado)}
      </span>
    )
  }));

  // Handlers
  function handleCreateInstitution() {
    setIsCreateModalOpen(true);
  }

  function handleCreateInstitutionSubmit(data: CreateInstitutionFormDTO) {
    setIsCreatingInstitution(true);
    
    // Simular API call
    setTimeout(() => {
      console.log('Nueva institución creada:', data);
      
      // Aquí agregarías la nueva institución a tu estado/API
      // Por ahora solo simulamos el éxito
      
      setIsCreatingInstitution(false);
      setIsCreateModalOpen(false);
      
      // Opcional: Mostrar notificación de éxito
      alert(`Institución "${data.nombre}" creada exitosamente`);
    }, 2000);
  }

  function handleViewInstitution(id: string) {
    console.log('Ver institución:', id);
  }

  function handleEditInstitution(id: string) {
    console.log('Editar institución:', id);
  }

  function handleDeleteInstitution(id: string) {
    console.log('Eliminar institución:', id);
  }

  // Helpers
  function getStatusStyles(status: string): string {
    switch (status) {
      case 'activa': return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'inactiva': return 'bg-red-100 text-red-700 border border-red-200';
      case 'pendiente': return 'bg-amber-100 text-amber-700 border border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  }

  function getStatusText(status: string): string {
    switch (status) {
      case 'activa': return 'Activa';
      case 'inactiva': return 'Inactiva';
      case 'pendiente': return 'Pendiente';
      default: return 'Desconocido';
    }
  }

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

        {/* Estadísticas - Solo Instituciones y Facultades */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <StatsCard
            title="Instituciones"
            value={stats.total}
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
            value={stats.totalFacultades}
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
          onSearchChange={(term) => setFilters(prev => ({ ...prev, searchTerm: term }))}
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
              onChange: (value) => setFilters(prev => ({ ...prev, statusFilter: value as any }))
            },
            {
              label: 'Tipo',
              value: filters.typeFilter,
              options: [
                { value: 'all', label: 'Todos los tipos' },
                { value: 'universidad', label: 'Universidades' },
                { value: 'instituto', label: 'Institutos' },
                { value: 'colegio', label: 'Colegios' }
              ],
              onChange: (value) => setFilters(prev => ({ ...prev, typeFilter: value as any }))
            }
          ]}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          showViewToggle={true}
        />

        {/* Tabla */}
        <DataTable
          title={`Instituciones (${filteredData.length})`}
          columns={columns}
          data={processedData}
          actions={tableActions}
          showAddButton={false}
        />
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