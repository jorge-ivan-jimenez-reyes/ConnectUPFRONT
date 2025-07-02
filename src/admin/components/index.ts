// Exportaciones de componentes de administrador
export * from './Layout/AdminLayout';
export * from './Sidebar/AdminSidebar';
export * from './StatsCard/StatsCard';
export * from './DataTable/DataTable';
export * from './FilterBar/FilterBar';
export * from './Modal/Modal';
export * from './CreateInstitutionModal/CreateInstitutionModal';
export * from './CreateFacultyModal/CreateFacultyModal';

// Re-exportar tipos
export type { TableColumn, TableRow, DataTableProps } from './DataTable/DataTable';
export type { StatsCardProps } from './StatsCard/StatsCard';
export type { FilterBarProps, FilterOption } from './FilterBar/FilterBar'; 