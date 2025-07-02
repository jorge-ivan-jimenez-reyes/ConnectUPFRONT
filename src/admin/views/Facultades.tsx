// Vista Facultades/Escuelas para administradores

import React, { useState, useMemo } from 'react';
import { StatsCard, DataTable, FilterBar, CreateFacultyModal } from '../components';
import type { TableColumn } from '../components/DataTable/DataTable';
import type { 
  FacultyStats, 
  FacultyTableRow, 
  FacultyFilters, 
  TableAction,
  CreateFacultyFormDTO 
} from '../interfaces';

interface Faculty {
  id: string;
  name: string;
  institution: string;
  type: 'faculty' | 'school';
  dean: string;
  students: number;
  programs: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export const Facultades: React.FC = () => {
  // Estado para filtros
  const [filters, setFilters] = useState<FacultyFilters>({
    searchTerm: '',
    institucionFilter: 'all',
    sortBy: 'nombre',
    sortOrder: 'asc'
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  // Estado para el modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreatingFaculty, setIsCreatingFaculty] = useState(false);

  // Estadísticas de facultades
  const stats: FacultyStats = {
    total: 4,
    totalCarreras: 20
  };

  // Datos de ejemplo para facultades
  const facultiesData: FacultyTableRow[] = [
    {
      id: '1',
      nombre: 'Fac. Ingeniería',
      institucion: 'UP MX',
      carreras: 8,
      fechaCreacion: '24.Ene.2021'
    },
    {
      id: '2',
      nombre: 'Fac. Pedagogía',
      institucion: 'UP MX',
      carreras: 5,
      fechaCreacion: '12.Ene.2021'
    },
    {
      id: '3',
      nombre: 'Esc. ESDAI',
      institucion: 'UP MX',
      carreras: 4,
      fechaCreacion: '5.Ene.2021'
    },
    {
      id: '4',
      nombre: 'Esc. Comunicación',
      institucion: 'UP MX',
      carreras: 3,
      fechaCreacion: '7.Ene.2021'
    }
  ];

  // Configuración de columnas
  const columns: TableColumn[] = [
    { key: 'nombre', title: 'Nombre', width: 'w-1/3' },
    { key: 'institucion', title: 'Institución', width: 'w-1/4' },
    { key: 'carreras', title: 'Carreras', width: 'w-1/6', align: 'center' },
    { key: 'fechaCreacion', title: 'Fecha de creación', width: 'w-1/4', align: 'center' }
  ];

  // Acciones de tabla
  const tableActions: TableAction[] = [
    {
      type: 'edit',
      label: 'Editar',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      onClick: handleEditFaculty,
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
      onClick: handleDeleteFaculty,
      variant: 'danger'
    }
  ];

  // Filtrar y ordenar datos
  const filteredData = useMemo(() => {
    let filtered = facultiesData.filter((faculty) => {
      const matchesSearch = faculty.nombre.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           faculty.institucion.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesInstitution = filters.institucionFilter === 'all' || faculty.institucion === filters.institucionFilter;
      
      return matchesSearch && matchesInstitution;
    });

    // Ordenar
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy as keyof FacultyTableRow];
      const bValue = b[filters.sortBy as keyof FacultyTableRow];
      
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
  }, [facultiesData, filters]);

  // Handlers
  function handleCreateFaculty() {
    setIsCreateModalOpen(true);
  }

  function handleCreateFacultySubmit(data: CreateFacultyFormDTO) {
    setIsCreatingFaculty(true);
    
    // Simular API call
    setTimeout(() => {
      console.log('Nueva facultad creada:', data);
      
      setIsCreatingFaculty(false);
      setIsCreateModalOpen(false);
      
      // Opcional: Mostrar notificación de éxito
      alert(`Facultad "${data.nombre}" creada exitosamente`);
    }, 2000);
  }

  function handleEditFaculty(id: string) {
    console.log('Editar facultad:', id);
  }

  function handleDeleteFaculty(id: string) {
    console.log('Eliminar facultad:', id);
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Facultades | Escuelas creadas</h1>
            <p className="text-slate-600 mt-2">Administra las facultades y escuelas del sistema</p>
          </div>
          <button 
            onClick={handleCreateFaculty}
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-[#202C59] text-white px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-[#2A3B6B] transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Agregar nueva facultad
          </button>
        </div>

        {/* Estadísticas - Facultades y Carreras */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <StatsCard
            title="Facultades"
            value={stats.total}
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
            title="Carreras"
            value={stats.totalCarreras}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
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
          searchPlaceholder="Buscar facultades..."
          filters={[
            {
              label: 'Institución',
              value: filters.institucionFilter,
              options: [
                { value: 'all', label: 'Todas las instituciones' },
                { value: 'UP MX', label: 'UP MX' },
                { value: 'UP AGS', label: 'UP AGS' },
                { value: 'UP GDL', label: 'UP GDL' },
                { value: 'IPADE', label: 'IPADE' }
              ],
              onChange: (value) => setFilters(prev => ({ ...prev, institucionFilter: value }))
            }
          ]}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          showViewToggle={true}
        />

        {/* Tabla */}
        <DataTable
          title={`Facultades (${filteredData.length})`}
          columns={columns}
          data={filteredData}
          actions={tableActions}
          showAddButton={false}
        />
      </div>

      {/* Modal para crear facultad */}
      <CreateFacultyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateFacultySubmit}
        isLoading={isCreatingFaculty}
      />
    </div>
  );
}; 