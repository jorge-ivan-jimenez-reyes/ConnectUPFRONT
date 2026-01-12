/**
 * Hook para gestión de ciclos académicos
 */

import { useState, useEffect, useCallback } from 'react';
import { cycleService } from '../../shared/services/api';
import type {
  CycleListItem,
  CycleInput,
  Cycle,
  CycleDropdown,
} from '../../shared/interfaces/api';

interface UseCyclesOptions {
  initialPage?: number;
  pageSize?: number;
  autoFetch?: boolean;
}

interface UseCyclesReturn {
  cycles: CycleListItem[];
  currentCycle: Cycle | null;
  total: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  
  setPage: (page: number) => void;
  refetch: () => Promise<void>;
  fetchCurrentCycle: () => Promise<Cycle | null>;
  
  create: (data: CycleInput) => Promise<Cycle>;
  update: (id: number, data: Partial<CycleInput>) => Promise<Cycle>;
  remove: (id: number) => Promise<void>;
  getById: (id: number) => Promise<Cycle>;
}

export function useCycles(options: UseCyclesOptions = {}): UseCyclesReturn {
  const {
    initialPage = 1,
    pageSize = 20,
    autoFetch = true,
  } = options;

  const [cycles, setCycles] = useState<CycleListItem[]>([]);
  const [currentCycle, setCurrentCycle] = useState<Cycle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const fetchCycles = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await cycleService.getAll({
        page: currentPage,
        page_size: pageSize,
      });
      
      setCycles(response.items);
      setTotal(response.total);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar ciclos';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  const fetchCurrentCycle = useCallback(async (): Promise<Cycle | null> => {
    try {
      const cycle = await cycleService.getCurrent();
      setCurrentCycle(cycle);
      return cycle;
    } catch (err) {
      // Es normal que no haya ciclo actual
      setCurrentCycle(null);
      return null;
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchCycles();
      fetchCurrentCycle();
    }
  }, [fetchCycles, fetchCurrentCycle, autoFetch]);

  const create = async (data: CycleInput): Promise<Cycle> => {
    const newCycle = await cycleService.create(data);
    await fetchCycles();
    return newCycle;
  };

  const update = async (id: number, data: Partial<CycleInput>): Promise<Cycle> => {
    const updated = await cycleService.update(id, data);
    await fetchCycles();
    return updated;
  };

  const remove = async (id: number): Promise<void> => {
    await cycleService.delete(id);
    await fetchCycles();
  };

  const getById = async (id: number): Promise<Cycle> => {
    return cycleService.getById(id);
  };

  return {
    cycles,
    currentCycle,
    total,
    loading,
    error,
    currentPage,
    setPage: setCurrentPage,
    refetch: fetchCycles,
    fetchCurrentCycle,
    create,
    update,
    remove,
    getById,
  };
}

/**
 * Hook para dropdown de ciclos
 */
export function useCyclesDropdown() {
  const [cycles, setCycles] = useState<CycleDropdown[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await cycleService.getDropdown();
      setCycles(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar ciclos';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { cycles, loading, error, refetch: fetch };
}

export default useCycles;
