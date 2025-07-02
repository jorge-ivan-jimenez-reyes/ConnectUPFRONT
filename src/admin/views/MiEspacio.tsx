// Vista Mi Espacio para administradores

import React from 'react';
import { StatsCard, DataTable } from '../components';
import type { TableColumn, TableRow } from '../components/DataTable/DataTable';
import type { AdminStats, InstitutionTableRow, TableAction } from '../interfaces';

export const MiEspacio: React.FC = () => {
  // Estadísticas del dashboard
  const stats: AdminStats = {
    profesores: 0,
    facultades: 0,
    planesEstudio: 0,
    instituciones: 4,
    usuariosActivos: 2847,
    reportesGenerados: 156
  };

  // Configuración de columnas para la tabla de instituciones
  const institucionesColumns: TableColumn[] = [
    { key: 'nombre', title: 'Nombre', width: 'w-1/4' },
    { key: 'ubicacion', title: 'Ubicación', width: 'w-1/4' },
    { key: 'facultades', title: 'Facultades', width: 'w-1/4', align: 'center' },
    { key: 'fechaCreacion', title: 'Fecha de creación', width: 'w-1/4', align: 'center' }
  ];

  // Datos de ejemplo para la tabla de instituciones
  const institucionesData: InstitutionTableRow[] = [
    {
      id: '1',
      nombre: 'UP',
      ubicacion: 'CDMX',
      facultades: 0,
      fechaCreacion: '24.Ene.2021',
      isActive: true
    },
    {
      id: '2',
      nombre: 'UP AGS',
      ubicacion: 'AGS',
      facultades: 0,
      fechaCreacion: '12.Ene.2021',
      isActive: true
    },
    {
      id: '3',
      nombre: 'UP GDL',
      ubicacion: 'GDL',
      facultades: 0,
      fechaCreacion: '5.Ene.2021',
      isActive: true
    },
    {
      id: '4',
      nombre: 'IPADE',
      ubicacion: 'CDMX',
      facultades: 0,
      fechaCreacion: '7.Ene.2021',
      isActive: true
    }
  ];

  // Acciones disponibles para cada fila de la tabla
  const tableActions: TableAction[] = [
    {
      type: 'edit',
      label: 'Editar',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      onClick: handleEditInstitucion,
      variant: 'primary'
    },
    {
      type: 'delete',
      label: 'Eliminar',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      onClick: handleDeleteInstitucion,
      variant: 'danger'
    },
    {
      type: 'more',
      label: 'Más opciones',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01" />
        </svg>
      ),
      onClick: handleMoreOptions,
      variant: 'secondary'
    }
  ];

  // Handlers para las acciones
  function handleAgregarInstitucion() {
    console.log('Agregar nueva institución');
    // Aquí iría la lógica para agregar una nueva institución
  }

  function handleEditInstitucion(id: string) {
    console.log('Editar institución:', id);
    // Aquí iría la lógica para editar la institución
  }

  function handleDeleteInstitucion(id: string) {
    console.log('Eliminar institución:', id);
    // Aquí iría la lógica para eliminar la institución
  }

  function handleMoreOptions(id: string) {
    console.log('Más opciones para institución:', id);
    // Aquí iría la lógica para mostrar más opciones
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header con info del usuario */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <img 
              src="/src/assets/img/miranda.png" 
              alt="Miranda Smith" 
              className="w-16 h-16 rounded-full object-cover border-4 border-slate-100 shadow-sm"
            />
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Miranda Smith</h1>
              <p className="text-slate-600">Administrador del Sistema</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tabla de instituciones - Ocupa 3 columnas */}
          <div className="lg:col-span-3">
            <DataTable
              title="Instituciones creadas"
              columns={institucionesColumns}
              data={institucionesData}
              actions={tableActions}
              showAddButton={true}
              addButtonText="Agregar"
              onAdd={handleAgregarInstitucion}
            />
          </div>

          {/* Panel derecho con estadísticas - Ocupa 1 columna */}
          <div className="space-y-6">
            {/* Card de Profesores */}
            <StatsCard
              title="Profesores"
              value={stats.profesores}
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
              iconBgColor="bg-indigo-50"
              iconColor="text-indigo-600"
              valueColor="text-indigo-600"
            />

            {/* Card de Facultades */}
            <StatsCard
              title="Facultades"
              value={stats.facultades}
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

            {/* Card de Planes de estudio */}
            <StatsCard
              title="Planes de estudio"
              value={stats.planesEstudio}
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              iconBgColor="bg-violet-50"
              iconColor="text-violet-600"
              valueColor="text-violet-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 