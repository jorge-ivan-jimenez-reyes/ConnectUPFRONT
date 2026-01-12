/**
 * Índice de tipos de API
 */

// Instituciones
export type {
  Institution,
  InstitutionListItem,
  InstitutionDropdown,
  InstitutionInput,
  InstitutionListResponse,
  Faculty,
  FacultyListItem,
  FacultyDropdown,
  FacultyInput,
  FacultyListResponse,
  Academy,
  AcademyListItem,
  AcademyDropdown,
  AcademyInput,
  AcademyListResponse,
  Program,
  ProgramListItem,
  ProgramDropdown,
  ProgramInput,
  ProgramListResponse,
  Cycle,
  CycleListItem,
  CycleDropdown,
  CycleInput,
  CycleListResponse,
} from './institution.types';

// Usuarios
export type {
  User,
  UserRole,
  UserListItem,
  UserListResponse,
  UserInput,
  AssignRoleInput,
  UserPermissions,
} from './user.types';

// Cursos
export type {
  Course,
  CourseListItem,
  CourseDropdown,
  CourseInput,
  CourseListResponse,
  CourseInfo,
  CourseInfoListResponse,
  CourseInfoInput,
} from './course.types';

// Tipo genérico para respuestas paginadas
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages?: number;
}

// Parámetros comunes de query
export interface QueryParams {
  search?: string;
  page?: number;
  page_size?: number;
}

export interface InstitutionQueryParams extends QueryParams {}

export interface FacultyQueryParams extends QueryParams {
  institution_id?: number;
}

export interface AcademyQueryParams extends QueryParams {
  faculty_id?: number;
  institution_id?: number;
}

export interface ProgramQueryParams extends QueryParams {
  faculty_id?: number;
  institution_id?: number;
}

export interface CourseQueryParams extends QueryParams {
  academy_id?: number;
}
