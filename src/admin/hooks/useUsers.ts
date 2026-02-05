/**
 * Hook para gestión de usuarios (Admin)
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  userService, 
  UserListAPI, 
  UserDetailAPI,
  CreateUserInput,
  UpdateUserInput,
  UserListFilters,
  RoleAPI,
} from '../../shared/services/api';

interface UseUsersOptions {
  initialFilters?: UserListFilters;
  autoFetch?: boolean;
}

interface UseUsersReturn {
  // Data
  users: UserListAPI[];
  total: number;
  totalPages: number;
  
  // State
  loading: boolean;
  error: string | null;
  currentPage: number;
  filters: UserListFilters;
  
  // Actions
  setFilters: (filters: Partial<UserListFilters>) => void;
  setPage: (page: number) => void;
  setSearch: (term: string) => void;
  refetch: () => Promise<void>;
  
  // CRUD
  create: (data: CreateUserInput) => Promise<UserDetailAPI>;
  update: (id: number, data: UpdateUserInput) => Promise<UserDetailAPI>;
  remove: (id: number) => Promise<void>;
  getById: (id: number) => Promise<UserDetailAPI>;
}

export function useUsers(options: UseUsersOptions = {}): UseUsersReturn {
  const {
    initialFilters = { page: 1, page_size: 20 },
    autoFetch = true,
  } = options;

  // Estado
  const [users, setUsers] = useState<UserListAPI[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFiltersState] = useState<UserListFilters>(initialFilters);

  // Fetch de usuarios
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await userService.getAll(filters);
      
      setUsers(response.items);
      setTotal(response.total);
      setTotalPages(response.total_pages || Math.ceil(response.total / (filters.page_size || 20)));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar usuarios';
      setError(message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Efecto para fetch automático
  useEffect(() => {
    if (autoFetch) {
      fetchUsers();
    }
  }, [fetchUsers, autoFetch]);

  // Actualizar filtros
  const setFilters = useCallback((newFilters: Partial<UserListFilters>) => {
    setFiltersState(prev => ({
      ...prev,
      ...newFilters,
      // Reset page when filters change (except page itself)
      page: newFilters.page !== undefined ? newFilters.page : 1,
    }));
  }, []);

  // Cambiar página
  const setPage = useCallback((page: number) => {
    setFiltersState(prev => ({ ...prev, page }));
  }, []);

  // Cambiar búsqueda
  const setSearch = useCallback((search: string) => {
    setFiltersState(prev => ({ ...prev, search, page: 1 }));
  }, []);

  // CRUD Operations
  const create = async (data: CreateUserInput): Promise<UserDetailAPI> => {
    const newUser = await userService.create(data);
    await fetchUsers();
    return newUser;
  };

  const update = async (id: number, data: UpdateUserInput): Promise<UserDetailAPI> => {
    const updated = await userService.update(id, data);
    await fetchUsers();
    return updated;
  };

  const remove = async (id: number): Promise<void> => {
    await userService.delete(id);
    await fetchUsers();
  };

  const getById = async (id: number): Promise<UserDetailAPI> => {
    return userService.getById(id);
  };

  return {
    users,
    total,
    totalPages,
    loading,
    error,
    currentPage: filters.page || 1,
    filters,
    setFilters,
    setPage,
    setSearch,
    refetch: fetchUsers,
    create,
    update,
    remove,
    getById,
  };
}

/**
 * Hook para obtener roles
 */
export function useRoles() {
  const [roles, setRoles] = useState<RoleAPI[]>([]);
  const [assignableRoles, setAssignableRoles] = useState<RoleAPI[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [allRoles, assignable] = await Promise.all([
        userService.getRoles(),
        userService.getAssignableRoles(),
      ]);
      
      setRoles(allRoles);
      setAssignableRoles(assignable);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar roles';
      setError(message);
      console.error('Error fetching roles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return { 
    roles, 
    assignableRoles, 
    loading, 
    error, 
    refetch: fetchRoles 
  };
}

/**
 * Hook para un usuario específico
 */
export function useUser(userId: number | null) {
  const [user, setUser] = useState<UserDetailAPI | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    if (!userId) {
      setUser(null);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const userData = await userService.getById(userId);
      setUser(userData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar usuario';
      setError(message);
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const update = async (data: UpdateUserInput): Promise<UserDetailAPI | null> => {
    if (!userId) return null;
    
    const updated = await userService.update(userId, data);
    setUser(updated);
    return updated;
  };

  return { 
    user, 
    loading, 
    error, 
    refetch: fetchUser,
    update,
  };
}

export default useUsers;
