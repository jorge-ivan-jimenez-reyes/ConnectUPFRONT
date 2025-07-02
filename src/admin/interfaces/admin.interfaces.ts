// Interfaces específicas para el panel de administración

import { Institution } from '../../shared/interfaces/institution.interfaces';

// Interface para estadísticas del dashboard
export interface AdminStats {
  profesores: number;
  facultades: number;
  planesEstudio: number;
  instituciones: number;
  usuariosActivos: number;
  reportesGenerados: number;
}

// Interface para la tabla de instituciones en el dashboard
export interface InstitutionTableRow {
  id: string;
  nombre: string;
  ubicacion: string;
  facultades: number;
  fechaCreacion: string;
  isActive: boolean;
}

// DTO para crear nueva institución desde admin
export interface AdminCreateInstitutionDTO {
  name: string;
  code: string;
  type: 'university' | 'institute' | 'college' | 'school' | 'research_center';
  country: string;
  state?: string;
  city: string;
  address?: string;
  website?: string;
  email?: string;
  phone?: string;
  description?: string;
}

// Interface para acciones de tabla
export interface TableAction {
  type: 'edit' | 'delete' | 'view' | 'more';
  label: string;
  icon: React.ReactNode;
  onClick: (id: string) => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

// Interfaces para la gestión de instituciones
export interface InstitutionStats {
  total: number;
  activas: number;
  pendientes: number;
  inactivas: number;
  totalUsuarios: number;
  totalFacultades: number;
}

export interface InstitutionManagementRow {
  id: string;
  nombre: string;
  tipo: string;
  ubicacion: string;
  usuarios: number;
  facultades: number;
  estado: 'activa' | 'inactiva' | 'pendiente';
  fechaCreacion: string;
  ultimaActividad?: string;
}

export interface InstitutionFilters {
  searchTerm: string;
  statusFilter: 'all' | 'activa' | 'inactiva' | 'pendiente';
  typeFilter: 'all' | 'universidad' | 'instituto' | 'colegio';
  sortBy: 'nombre' | 'fechaCreacion' | 'usuarios' | 'facultades';
  sortOrder: 'asc' | 'desc';
}

// DTOs para gestión de instituciones
export interface CreateInstitutionFormDTO {
  nombre: string;
  codigo: string;
  tipo: 'universidad' | 'instituto' | 'colegio' | 'centro_investigacion';
  pais: string;
  estado?: string;
  ciudad: string;
  direccion?: string;
  sitioWeb?: string;
  email: string;
  telefono?: string;
  descripcion?: string;
  adminEmail: string;
  adminNombre: string;
  adminApellido: string;
}

export interface UpdateInstitutionDTO {
  nombre?: string;
  tipo?: string;
  ubicacion?: string;
  descripcion?: string;
  sitioWeb?: string;
  email?: string;
  telefono?: string;
  estado?: 'activa' | 'inactiva' | 'pendiente';
}

// Interfaces para Facultades
export interface FacultyStats {
  total: number;
  totalCarreras: number;
}

export interface FacultyTableRow {
  id: string;
  nombre: string;
  institucion: string;
  carreras: number;
  fechaCreacion: string;
}

export interface FacultyFilters {
  searchTerm: string;
  institucionFilter: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface CreateFacultyFormDTO {
  nombre: string;
  institucion: string;
  descripcion?: string;
} 