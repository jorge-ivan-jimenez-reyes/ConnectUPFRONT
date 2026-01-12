/**
 * Tipos de API para Cursos/Materias
 */

export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  academy_id: number;
  academy_name: string;
  is_disabled: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseListItem {
  id: number;
  name: string;
  code: string;
  credits: number;
  academy_name: string;
}

export interface CourseDropdown {
  id: number;
  name: string;
  code: string;
}

export interface CourseInput {
  name: string;
  code: string;
  credits: number;
  academy_id?: number;
  is_disabled?: boolean;
}

export interface CourseListResponse {
  items: CourseListItem[];
  total: number;
  page: number;
  page_size: number;
}

// Course Info (instancias de cursos)
export interface CourseInfo {
  id: number;
  course_id: number;
  course_name: string;
  cycle_id: number;
  cycle_name: string;
  teacher_id: number | null;
  teacher_name: string | null;
  group: string;
  schedule: string | null;
  classroom: string | null;
}

export interface CourseInfoListResponse {
  items: CourseInfo[];
  total: number;
  page: number;
  page_size: number;
}

export interface CourseInfoInput {
  course_id: number;
  cycle_id: number;
  teacher_id?: number;
  group: string;
  schedule?: string;
  classroom?: string;
}
