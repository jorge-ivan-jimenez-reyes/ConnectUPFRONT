/**
 * Hook para gestionar cursos/materias en el panel de admin
 */

import { useState, useEffect, useCallback } from 'react';
import { courseService } from '../../shared/services';
import type { 
  Course,
  CourseInput,
  CourseDropdown,
  CourseQueryParams 
} from '../../shared/interfaces/api';

interface UseCoursesReturn {
  courses: Course[];
  total: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  search: string;
  setSearch: (term: string) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  create: (data: CourseInput) => Promise<Course>;
  update: (id: number, data: Partial<CourseInput>) => Promise<Course>;
  remove: (id: number) => Promise<void>;
  refetch: () => Promise<void>;
}

/**
 * Hook principal para gestionar cursos
 */
export function useCourses(initialParams?: Partial<CourseQueryParams>): UseCoursesReturn {
  const [courses, setCourses] = useState<Course[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialParams?.page || 1);
  const [pageSize, setPageSize] = useState(initialParams?.page_size || 10);
  const [search, setSearch] = useState(initialParams?.search || '');

  // Función para cargar cursos
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params: CourseQueryParams = {
        page: currentPage,
        page_size: pageSize,
        ...(search && { search }),
      };
      
      const response = await courseService.getAll(params);
      
      setCourses(response.results);
      setTotal(response.count);
      setTotalPages(Math.ceil(response.count / pageSize));
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar los cursos');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, search]);

  // Cargar cursos al montar y cuando cambien los parámetros
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Crear curso
  const create = useCallback(async (data: CourseInput): Promise<Course> => {
    const newCourse = await courseService.create(data);
    await fetchCourses();
    return newCourse;
  }, [fetchCourses]);

  // Actualizar curso
  const update = useCallback(async (id: number, data: Partial<CourseInput>): Promise<Course> => {
    const updated = await courseService.update(id, data);
    await fetchCourses();
    return updated;
  }, [fetchCourses]);

  // Eliminar curso
  const remove = useCallback(async (id: number): Promise<void> => {
    await courseService.delete(id);
    await fetchCourses();
  }, [fetchCourses]);

  // Setters con reset de página
  const handleSetSearch = useCallback((term: string) => {
    setSearch(term);
    setCurrentPage(1);
  }, []);

  const handleSetPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSetPageSize = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  return {
    courses,
    total,
    totalPages,
    loading,
    error,
    currentPage,
    pageSize,
    search,
    setSearch: handleSetSearch,
    setPage: handleSetPage,
    setPageSize: handleSetPageSize,
    create,
    update,
    remove,
    refetch: fetchCourses,
  };
}

/**
 * Hook para obtener cursos para dropdown (selector)
 */
export function useCoursesDropdown(): {
  courses: CourseDropdown[];
  loading: boolean;
  error: string | null;
} {
  const [courses, setCourses] = useState<CourseDropdown[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getDropdown();
        setCourses(data);
      } catch (err) {
        console.error('Error fetching courses dropdown:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar cursos');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
}
