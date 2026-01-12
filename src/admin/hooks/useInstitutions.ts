/**
 * Hook para gestión de instituciones
 */

import { useState, useEffect, useCallback } from 'react';
import { institutionService } from '../../shared/services/api';
import type {
  InstitutionListItem,
  InstitutionInput,
  Institution,
  InstitutionDropdown,
} from '../../shared/interfaces/api';

interface UseInstitutionsOptions {
  initialSearch?: string;
  initialPage?: number;
  pageSize?: number;
  autoFetch?: boolean;
}

interface UseInstitutionsReturn {
  // Data
  institutions: InstitutionListItem[];
  total: number;
  totalPages: number;
  
  // State
  loading: boolean;
  error: string | null;
  currentPage: number;
  search: string;
  
  // Actions
  setSearch: (term: string) => void;
  setPage: (page: number) => void;
  refetch: () => Promise<void>;
  
  // CRUD
  create: (data: InstitutionInput) => Promise<Institution>;
  update: (id: number, data: Partial<InstitutionInput>) => Promise<Institution>;
  remove: (id: number) => Promise<void>;
  getById: (id: number) => Promise<Institution>;
}

export function useInstitutions(options: UseInstitutionsOptions = {}): UseInstitutionsReturn {
  const {
    initialSearch = '',
    initialPage = 1,
    pageSize = 20,
    autoFetch = true,
  } = options;

  // Estado
  const [institutions, setInstitutions] = useState<InstitutionListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);

  // Fetch de instituciones
  const fetchInstitutions = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await institutionService.getAll({
        search: search || undefined,
        page: currentPage,
        page_size: pageSize,
      });
      
      setInstitutions(response.items);
      setTotal(response.total);
      setTotalPages(response.total_pages || Math.ceil(response.total / pageSize));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar instituciones';
      setError(message);
      console.error('Error fetching institutions:', err);
    } finally {
      setLoading(false);
    }
  }, [search, currentPage, pageSize]);

  // Efecto para fetch automático
  useEffect(() => {
    if (autoFetch) {
      fetchInstitutions();
    }
  }, [fetchInstitutions, autoFetch]);

  // Reset a página 1 cuando cambia el search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // CRUD Operations
  const create = async (data: InstitutionInput): Promise<Institution> => {
    const newInstitution = await institutionService.create(data);
    await fetchInstitutions();
    return newInstitution;
  };

  const update = async (id: number, data: Partial<InstitutionInput>): Promise<Institution> => {
    const updated = await institutionService.update(id, data);
    await fetchInstitutions();
    return updated;
  };

  const remove = async (id: number): Promise<void> => {
    await institutionService.delete(id);
    await fetchInstitutions();
  };

  const getById = async (id: number): Promise<Institution> => {
    return institutionService.getById(id);
  };

  return {
    institutions,
    total,
    totalPages,
    loading,
    error,
    currentPage,
    search,
    setSearch,
    setPage: setCurrentPage,
    refetch: fetchInstitutions,
    create,
    update,
    remove,
    getById,
  };
}

/**
 * Hook para dropdown de instituciones
 */
export function useInstitutionsDropdown() {
  const [institutions, setInstitutions] = useState<InstitutionDropdown[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await institutionService.getDropdown();
      setInstitutions(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar instituciones';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { institutions, loading, error, refetch: fetch };
}

export default useInstitutions;
