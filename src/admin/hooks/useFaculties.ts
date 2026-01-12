/**
 * Hook para gestión de facultades
 */

import { useState, useEffect, useCallback } from 'react';
import { facultyService } from '../../shared/services/api';
import type {
  FacultyListItem,
  FacultyInput,
  Faculty,
  FacultyDropdown,
} from '../../shared/interfaces/api';

interface UseFacultiesOptions {
  institutionId?: number;
  initialSearch?: string;
  initialPage?: number;
  pageSize?: number;
  autoFetch?: boolean;
}

interface UseFacultiesReturn {
  faculties: FacultyListItem[];
  total: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  search: string;
  institutionId: number | undefined;
  
  setSearch: (term: string) => void;
  setPage: (page: number) => void;
  setInstitutionId: (id: number | undefined) => void;
  refetch: () => Promise<void>;
  
  create: (data: FacultyInput) => Promise<Faculty>;
  update: (id: number, data: Partial<FacultyInput>) => Promise<Faculty>;
  remove: (id: number) => Promise<void>;
  getById: (id: number) => Promise<Faculty>;
}

export function useFaculties(options: UseFacultiesOptions = {}): UseFacultiesReturn {
  const {
    institutionId: initialInstitutionId,
    initialSearch = '',
    initialPage = 1,
    pageSize = 20,
    autoFetch = true,
  } = options;

  const [faculties, setFaculties] = useState<FacultyListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [institutionId, setInstitutionId] = useState<number | undefined>(initialInstitutionId);

  const fetchFaculties = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await facultyService.getAll({
        institution_id: institutionId,
        search: search || undefined,
        page: currentPage,
        page_size: pageSize,
      });
      
      setFaculties(response.items);
      setTotal(response.total);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar facultades';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [search, currentPage, pageSize, institutionId]);

  useEffect(() => {
    if (autoFetch) {
      fetchFaculties();
    }
  }, [fetchFaculties, autoFetch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, institutionId]);

  const create = async (data: FacultyInput): Promise<Faculty> => {
    const newFaculty = await facultyService.create(data);
    await fetchFaculties();
    return newFaculty;
  };

  const update = async (id: number, data: Partial<FacultyInput>): Promise<Faculty> => {
    const updated = await facultyService.update(id, data);
    await fetchFaculties();
    return updated;
  };

  const remove = async (id: number): Promise<void> => {
    await facultyService.delete(id);
    await fetchFaculties();
  };

  const getById = async (id: number): Promise<Faculty> => {
    return facultyService.getById(id);
  };

  return {
    faculties,
    total,
    loading,
    error,
    currentPage,
    search,
    institutionId,
    setSearch,
    setPage: setCurrentPage,
    setInstitutionId,
    refetch: fetchFaculties,
    create,
    update,
    remove,
    getById,
  };
}

/**
 * Hook para dropdown de facultades
 */
export function useFacultiesDropdown(institutionId?: number) {
  const [faculties, setFaculties] = useState<FacultyDropdown[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await facultyService.getDropdown(institutionId);
      setFaculties(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar facultades';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [institutionId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { faculties, loading, error, refetch: fetch };
}

export default useFaculties;
