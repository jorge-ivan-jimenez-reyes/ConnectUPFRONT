/**
 * Hook para gestión de academias
 */

import { useState, useEffect, useCallback } from 'react';
import { academyService } from '../../shared/services/api';
import type {
  AcademyListItem,
  AcademyInput,
  Academy,
  AcademyDropdown,
} from '../../shared/interfaces/api';

interface UseAcademiesOptions {
  facultyId?: number;
  institutionId?: number;
  initialSearch?: string;
  initialPage?: number;
  pageSize?: number;
  autoFetch?: boolean;
}

interface UseAcademiesReturn {
  academies: AcademyListItem[];
  total: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  search: string;
  
  setSearch: (term: string) => void;
  setPage: (page: number) => void;
  refetch: () => Promise<void>;
  
  create: (data: AcademyInput) => Promise<Academy>;
  update: (id: number, data: Partial<AcademyInput>) => Promise<Academy>;
  remove: (id: number) => Promise<void>;
  getById: (id: number) => Promise<Academy>;
}

export function useAcademies(options: UseAcademiesOptions = {}): UseAcademiesReturn {
  const {
    facultyId,
    institutionId,
    initialSearch = '',
    initialPage = 1,
    pageSize = 20,
    autoFetch = true,
  } = options;

  const [academies, setAcademies] = useState<AcademyListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);

  const fetchAcademies = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await academyService.getAll({
        faculty_id: facultyId,
        institution_id: institutionId,
        search: search || undefined,
        page: currentPage,
        page_size: pageSize,
      });
      
      setAcademies(response.items);
      setTotal(response.total);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar academias';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [search, currentPage, pageSize, facultyId, institutionId]);

  useEffect(() => {
    if (autoFetch) {
      fetchAcademies();
    }
  }, [fetchAcademies, autoFetch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const create = async (data: AcademyInput): Promise<Academy> => {
    const newAcademy = await academyService.create(data);
    await fetchAcademies();
    return newAcademy;
  };

  const update = async (id: number, data: Partial<AcademyInput>): Promise<Academy> => {
    const updated = await academyService.update(id, data);
    await fetchAcademies();
    return updated;
  };

  const remove = async (id: number): Promise<void> => {
    await academyService.delete(id);
    await fetchAcademies();
  };

  const getById = async (id: number): Promise<Academy> => {
    return academyService.getById(id);
  };

  return {
    academies,
    total,
    loading,
    error,
    currentPage,
    search,
    setSearch,
    setPage: setCurrentPage,
    refetch: fetchAcademies,
    create,
    update,
    remove,
    getById,
  };
}

/**
 * Hook para dropdown de academias
 */
export function useAcademiesDropdown(facultyId?: number) {
  const [academies, setAcademies] = useState<AcademyDropdown[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await academyService.getDropdown(facultyId);
      setAcademies(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar academias';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [facultyId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { academies, loading, error, refetch: fetch };
}

export default useAcademies;
