/**
 * Tipos de API para Instituciones
 * Coinciden con los serializers del backend
 */

// =============================================================================
// INSTITUTION
// =============================================================================

/** Institución completa (detalle) */
export interface Institution {
  id: number;
  name: string;
  location: string;
  num_faculties: number;
  created_at: string;
  updated_at: string;
  is_disabled: boolean;
  is_deleted: boolean;
}

/** Institución en lista (compacta) */
export interface InstitutionListItem {
  id: number;
  name: string;
  location: string;
  num_faculties: number;
}

/** Institución para dropdown */
export interface InstitutionDropdown {
  id: number;
  name: string;
}

/** DTO para crear/actualizar institución */
export interface InstitutionInput {
  name: string;
  location: string;
  created_at?: string;
  is_disabled?: boolean;
}

/** Respuesta paginada de instituciones */
export interface InstitutionListResponse {
  items: InstitutionListItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages?: number;
}

// =============================================================================
// FACULTY
// =============================================================================

/** Facultad completa (detalle) */
export interface Faculty {
  id: number;
  name: string;
  institution_id: number;
  institution_name: string;
  num_academies: number;
  num_programs: number;
  created_at: string;
  updated_at: string;
  is_disabled: boolean;
  is_deleted: boolean;
}

/** Facultad en lista */
export interface FacultyListItem {
  id: number;
  name: string;
  institution_name: string;
  num_academies: number;
  num_programs: number;
}

/** Facultad para dropdown */
export interface FacultyDropdown {
  id: number;
  name: string;
  display_name: string;
}

/** DTO para crear/actualizar facultad */
export interface FacultyInput {
  name: string;
  institution_id?: number;
  created_at?: string;
  is_disabled?: boolean;
}

/** Respuesta paginada de facultades */
export interface FacultyListResponse {
  items: FacultyListItem[];
  total: number;
  page: number;
  page_size: number;
}

// =============================================================================
// ACADEMY
// =============================================================================

/** Academia completa (detalle) */
export interface Academy {
  id: number;
  name: string;
  faculty_id: number;
  faculty_name: string;
  institution_name: string | null;
  created_at: string | null;
  updated_at: string | null;
  is_disabled: boolean;
  is_deleted: boolean;
}

/** Academia en lista */
export interface AcademyListItem {
  id: number;
  name: string;
  faculty_name: string;
}

/** Academia para dropdown */
export interface AcademyDropdown {
  id: number;
  name: string;
}

/** DTO para crear/actualizar academia */
export interface AcademyInput {
  name: string;
  faculty_id?: number;
  created_at?: string;
  is_disabled?: boolean;
}

/** Respuesta paginada de academias */
export interface AcademyListResponse {
  items: AcademyListItem[];
  total: number;
  page: number;
  page_size: number;
}

// =============================================================================
// PROGRAM (Carreras)
// =============================================================================

/** Programa completo (detalle) */
export interface Program {
  id: number;
  name: string;
  code: string;
  year: number;
  faculty_id: number;
  faculty_name: string;
  institution_name: string | null;
  full_name: string;
  display_name: string;
  created_at: string;
  updated_at: string;
  is_disabled: boolean;
  is_deleted: boolean;
}

/** Programa en lista */
export interface ProgramListItem {
  id: number;
  name: string;
  code: string;
  year: number;
  faculty_name: string;
}

/** Programa para dropdown */
export interface ProgramDropdown {
  id: number;
  name: string;
  display_name: string;
}

/** DTO para crear/actualizar programa */
export interface ProgramInput {
  name: string;
  code: string;
  year: number;
  faculty_id?: number;
  created_at?: string;
  is_disabled?: boolean;
}

/** Respuesta paginada de programas */
export interface ProgramListResponse {
  items: ProgramListItem[];
  total: number;
  page: number;
  page_size: number;
}

// =============================================================================
// CYCLE
// =============================================================================

/** Ciclo completo (detalle) */
export interface Cycle {
  id: number;
  cycle: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  is_future: boolean;
  is_past: boolean;
  is_deleted: boolean;
}

/** Ciclo en lista */
export interface CycleListItem {
  id: number;
  cycle: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

/** Ciclo para dropdown */
export interface CycleDropdown {
  id: number;
  cycle: string;
}

/** DTO para crear/actualizar ciclo */
export interface CycleInput {
  cycle: string;
  start_date: string;
  end_date: string;
}

/** Respuesta paginada de ciclos */
export interface CycleListResponse {
  items: CycleListItem[];
  total: number;
  page: number;
  page_size: number;
}
