/**
 * Servicio de Usuarios
 * 
 * Conecta con el backend para gestionar usuarios y perfil.
 */

import { httpClient, PaginatedResponse } from '../http/HttpClient';
import { API_ENDPOINTS } from '../../config/endpoints';

// ============================================================================
// TIPOS
// ============================================================================

/** Usuario del backend (lista) */
export interface UserListAPI {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  last_name_m: string | null;
  full_name: string;
  institution_email: string | null;
  institution_id: string | null;
  phone: string | null;
  is_active: boolean;
  role_names: string[];
}

/** Usuario detalle del backend */
export interface UserDetailAPI extends UserListAPI {
  profile_picture: string | null;
  max_hours: number | null;
  is_staff: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
  role_assignments: RoleAssignmentAPI[];
  can_manage_institutions: number[];
  can_manage_faculties: number[];
  can_manage_programs: number[];
  can_manage_academies: number[];
}

/** Asignación de rol */
export interface RoleAssignmentAPI {
  role: RoleAPI;
  entity_id: number;
  entity_name: string;
  level: string;
}

/** Rol */
export interface RoleAPI {
  id: number;
  name: string;
  level: string;
  hierarchy_weight: number;
}

/** Input para actualizar usuario */
export interface UpdateUserInput {
  email?: string;
  first_name?: string;
  last_name?: string;
  last_name_m?: string;
  institution_email?: string;
  institution_id?: string;
  phone?: string;
  profile_picture?: string;
  max_hours?: number;
  is_active?: boolean;
  is_staff?: boolean;
  new_password?: string;
}

/** Input para crear usuario */
export interface CreateUserInput {
  email: string;
  password: string;
  re_password?: string;
  first_name: string;
  last_name: string;
  last_name_m?: string;
  institution_email?: string;
  institution_id?: string;
  phone?: string;
  max_hours?: number;
  is_staff?: boolean;
  roles?: RoleAssignmentInput[];
}

/** Input para asignar rol */
export interface RoleAssignmentInput {
  role_id: number;
  entity_id: number;
  level: 'institución' | 'facultad' | 'carrera' | 'academia';
}

/** Permisos del usuario */
export interface UserPermissionsAPI {
  can_manage_all: boolean;
  can_manage_institutions: number[];
  can_manage_faculties: number[];
  can_manage_programs: number[];
  can_manage_academies: number[];
  max_assignable_role_weight: number;
  roles: string[];
}

/** Filtros para lista de usuarios */
export interface UserListFilters {
  institution_id?: number;
  faculty_id?: number;
  program_id?: number;
  academy_id?: number;
  role_name?: string;
  is_active?: boolean;
  search?: string;
  sort_by?: 'email' | 'first_name' | 'last_name' | 'created_at' | 'updated_at';
  sort_order?: 'asc' | 'desc';
  page?: number;
  page_size?: number;
}

// ============================================================================
// SERVICIO
// ============================================================================

export const userService = {
  /**
   * Obtiene el perfil del usuario actual
   */
  getMe: async (): Promise<UserDetailAPI> => {
    return httpClient.get<UserDetailAPI>(API_ENDPOINTS.V2.USERS_ME);
  },

  /**
   * Actualiza el perfil del usuario actual
   */
  updateMe: async (data: UpdateUserInput): Promise<UserDetailAPI> => {
    return httpClient.patch<UserDetailAPI>(API_ENDPOINTS.V2.USERS_ME, data);
  },

  /**
   * Obtiene los permisos del usuario actual
   */
  getMyPermissions: async (): Promise<UserPermissionsAPI> => {
    return httpClient.get<UserPermissionsAPI>(API_ENDPOINTS.V2.USER_PERMISSIONS);
  },

  /**
   * Lista usuarios con filtros y paginación
   */
  getAll: async (filters?: UserListFilters): Promise<PaginatedResponse<UserListAPI>> => {
    return httpClient.get<PaginatedResponse<UserListAPI>>(
      API_ENDPOINTS.V2.USERS,
      { params: filters }
    );
  },

  /**
   * Obtiene un usuario por ID
   */
  getById: async (id: number): Promise<UserDetailAPI> => {
    return httpClient.get<UserDetailAPI>(API_ENDPOINTS.V2.USER_BY_ID(id));
  },

  /**
   * Crea un nuevo usuario
   */
  create: async (data: CreateUserInput): Promise<UserDetailAPI> => {
    return httpClient.post<UserDetailAPI>(API_ENDPOINTS.V2.USERS, data);
  },

  /**
   * Actualiza un usuario
   */
  update: async (id: number, data: UpdateUserInput): Promise<UserDetailAPI> => {
    return httpClient.patch<UserDetailAPI>(API_ENDPOINTS.V2.USER_BY_ID(id), data);
  },

  /**
   * Elimina un usuario
   */
  delete: async (id: number): Promise<void> => {
    await httpClient.delete(API_ENDPOINTS.V2.USER_BY_ID(id));
  },

  /**
   * Asigna un rol a un usuario
   */
  assignRole: async (userId: number, roleData: RoleAssignmentInput): Promise<UserDetailAPI> => {
    return httpClient.post<UserDetailAPI>(
      API_ENDPOINTS.V2.USER_ROLES(userId),
      roleData
    );
  },

  /**
   * Obtiene roles asignables
   */
  getAssignableRoles: async (): Promise<RoleAPI[]> => {
    return httpClient.get<RoleAPI[]>(API_ENDPOINTS.V2.ROLES_ASSIGNABLE);
  },

  /**
   * Obtiene todos los roles
   */
  getRoles: async (): Promise<RoleAPI[]> => {
    return httpClient.get<RoleAPI[]>(API_ENDPOINTS.V2.ROLES);
  },
};

export default userService;
