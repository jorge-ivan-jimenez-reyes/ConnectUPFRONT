/**
 * Tipos de API para Usuarios
 */

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: string;
  last_login: string | null;
  roles: UserRole[];
}

export interface UserRole {
  id: number;
  name: string;
  display_name: string;
}

export interface UserListItem {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  is_active: boolean;
  roles: string[];
}

export interface UserListResponse {
  items: UserListItem[];
  total: number;
  page: number;
  page_size: number;
}

export interface UserInput {
  email: string;
  first_name: string;
  last_name: string;
  password?: string;
  is_active?: boolean;
}

export interface AssignRoleInput {
  role_id: number;
}

export interface UserPermissions {
  can_manage_users: boolean;
  can_manage_institutions: boolean;
  can_view_reports: boolean;
  // Agregar más según el backend
}
