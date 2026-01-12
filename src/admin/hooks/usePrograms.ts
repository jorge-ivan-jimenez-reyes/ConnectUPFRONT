/**
 * Hook para gestión de programas (carreras)
 */

import { useState, useEffect, useCallback } from 'react';
import { programService } from '../../shared/services/api';
import type {
  ProgramListItem,
  ProgramInput,
  Program,
  ProgramDropdown,
} from '../../shared/interfaces/api';

interface UseProgramsOptions {
  facultyId?: number;
  institutionId?: number;
  initialSearch?: string;
  initialPage?: number;
  pageSize?: number;
  autoFetch?: boolean;
}

interface UseProgramsReturn {
  programs: ProgramListItem[];
  total: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  search: string;
  
  setSearch: (term: string) => void;
  setPage: (page: number) => void;
  refetch: () => Promise<void>;
  
  create: (data: ProgramInput) => Promise<Program>;
  update: (id: number, data: Partial<ProgramInput>) => Promise<Program>;
  remove: (id: number) => Promise<void>;
  getById: (id: number) => Promise<Program>;
}

export function usePrograms(options: UseProgramsOptions = {}): UseProgramsReturn {
  const {
    facultyId,
    institutionId,
    initialSearch = '',
    initialPage = 1,
    pageSize = 20,
    autoFetch = true,
  } = options;

  const [programs, setPrograms] = useState<ProgramListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);

  const fetchPrograms = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await programService.getAll({
        faculty_id: facultyId,
        institution_id: institutionId,
        search: search || undefined,
        page: currentPage,
        page_size: pageSize,
      });
      
      setPrograms(response.items);
      setTotal(response.total);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar programas';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [search, currentPage, pageSize, facultyId, institutionId]);

  useEffect(() => {
    if (autoFetch) {
      fetchPrograms();
    }
  }, [fetchPrograms, autoFetch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const create = async (data: ProgramInput): Promise<Program> => {
    const newProgram = await programService.create(data);
    await fetchPrograms();
    return newProgram;
  };

  const update = async (id: number, data: Partial<ProgramInput>): Promise<Program> => {
    const updated = await programService.update(id, data);
    await fetchPrograms();
    return updated;
  };

  const remove = async (id: number): Promise<void> => {
    await programService.delete(id);
    await fetchPrograms();
  };

  const getById = async (id: number): Promise<Program> => {
    return programService.getById(id);
  };

  return {
    programs,
    total,
    loading,
    error,
    currentPage,
    search,
    setSearch,
    setPage: setCurrentPage,
    refetch: fetchPrograms,
    create,
    update,
    remove,
    getById,
  };
}

/**
 * Hook para dropdown de programas
 */
export function useProgramsDropdown(facultyId?: number) {
  const [programs, setPrograms] = useState<ProgramDropdown[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await programService.getDropdown(facultyId);
      setPrograms(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar programas';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [facultyId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { programs, loading, error, refetch: fetch };
}

export default usePrograms;
