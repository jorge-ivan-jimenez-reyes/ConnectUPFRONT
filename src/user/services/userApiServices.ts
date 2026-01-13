/**
 * Servicios API para módulo de Usuario (Docente)
 * 
 * Conecta con el backend real usando el HttpClient unificado.
 */

import { httpClient } from '../../shared/services/http/HttpClient';
import { API_ENDPOINTS } from '../../shared/config/endpoints';

// ============================================================================
// TIPOS DE RESPUESTA DEL BACKEND
// ============================================================================

// Schedule del backend
export interface ScheduleAPI {
  id: number;
  day: number;
  day_field: string; // "Lun", "Mar", etc.
  start_hour: string;
  end_hour: string;
  classroom: string;
}

// Style del backend
export interface StyleAPI {
  id: number;
  icon: string;
  icon_color: string;
  opacity_color: string;
}

// CourseInfo del backend (respuesta de my-schedule)
export interface CourseInfoAPI {
  id: number;
  course_id: {
    id: number;
    name: string;
    code: string;
  };
  course_name: string;
  course_code: string;
  cycle_id: number;
  cycle_name: string;
  class_number: string;
  user_id: number;
  user_name: string;
  schedule: ScheduleAPI[];
  style: StyleAPI | null;
}

// Course con preferencia (respuesta de preferences)
export interface CourseWithPreferenceAPI {
  id: number;
  name: string;
  code: string;
  academy_name: string | null;
  academy: string | null;
  style: StyleAPI | null;
  style_id: number | null;
  is_selected: 'true' | 'false';
}

// CV del backend
export interface AcademicPathAPI {
  id: number;
  name: string | null;
  level_type: string;
  institution: string;
  country: string;
  complete_year: number;
  degree_certificate: string;
}

export interface EngineerDesignPathAPI {
  id: number;
  institution: string;
  amount_years: number;
  experience_level: string;
}

export interface AcademicExperienceAPI {
  id: number;
  name: string | null;
  institution: string;
  in_date: string;
  out_date: string;
}

export interface TrainingAPI {
  id: number;
  type: string;
  institution: string;
  country: string;
  complete_year: number;
  amount_time: number;
}

export interface SimpleNameAPI {
  id: number;
  name: string;
}

export interface CVAPI {
  id: number;
  user_id: number;
  user_name: string | null;
  user_email: string | null;
  birthdate: string;
  job_title: string;
  admission_date: string;
  initial_date_pe: string | null;
  years_of_service: number;
  highest_degree: string | null;
  academic_paths: AcademicPathAPI[];
  engineer_design_paths: EngineerDesignPathAPI[];
  academic_experiences: AcademicExperienceAPI[];
  trainings: TrainingAPI[];
  awards: SimpleNameAPI[];
  contributions: SimpleNameAPI[];
  professional_achievements: SimpleNameAPI[];
}

// Input para crear/actualizar CV
export interface CVInputAPI {
  birthdate: string;
  job_title: string;
  admission_date: string;
  initial_date_pe?: string;
}

// Academy del dropdown
export interface AcademyDropdownAPI {
  id: number;
  name: string;
  faculty_name?: string;
}

// ============================================================================
// SERVICIO DE MIS CLASES (CourseInfo/My Schedule)
// ============================================================================

export const myClassesService = {
  /**
   * Obtiene el horario del usuario actual
   * @param cycleId - ID del ciclo opcional
   */
  getMySchedule: async (cycleId?: number): Promise<CourseInfoAPI[]> => {
    const params = cycleId ? { cycle: cycleId } : {};
    const response = await httpClient.get<CourseInfoAPI[]>(
      API_ENDPOINTS.V2.COURSE_INFO_MY_SCHEDULE,
      { params }
    );
    return response.data;
  },
};

// ============================================================================
// SERVICIO DE PREFERENCIAS (Temarios/Cursos preferidos)
// ============================================================================

export const preferencesService = {
  /**
   * Obtiene cursos de una academia con marca de si están seleccionados
   */
  getCoursesByAcademy: async (academyName: string): Promise<CourseWithPreferenceAPI[]> => {
    const response = await httpClient.get<CourseWithPreferenceAPI[]>(
      API_ENDPOINTS.V2.PREFERENCES,
      { params: { academy: academyName } }
    );
    return response.data;
  },

  /**
   * Obtiene todos los cursos de las academias del usuario con preferencias
   */
  getMyCoursesWithPreferences: async (): Promise<CourseWithPreferenceAPI[]> => {
    const response = await httpClient.get<CourseWithPreferenceAPI[]>(
      API_ENDPOINTS.V2.PREFERENCES
    );
    return response.data;
  },

  /**
   * Obtiene mis preferencias guardadas
   */
  getMyPreferences: async (): Promise<any[]> => {
    const response = await httpClient.get<any[]>(
      API_ENDPOINTS.V2.PREFERENCES_MY
    );
    return response.data;
  },

  /**
   * Toggle preferencia individual
   */
  togglePreference: async (courseId: number): Promise<{ course_id: number; is_selected: boolean }> => {
    const response = await httpClient.post<{ course_id: number; is_selected: boolean }>(
      API_ENDPOINTS.V2.PREFERENCES,
      { course_id: courseId }
    );
    return response.data;
  },

  /**
   * Guardar preferencias en bulk (formato legacy)
   */
  savePreferences: async (preferences: Record<string, { id: number; is_selected: string }[]>): Promise<{ updated: number }> => {
    const response = await httpClient.patch<{ updated: number }>(
      API_ENDPOINTS.V2.PREFERENCES,
      preferences
    );
    return response.data;
  },
};

// ============================================================================
// SERVICIO DE CV
// ============================================================================

export const cvApiService = {
  /**
   * Obtiene el CV del usuario actual
   */
  getMyCV: async (): Promise<CVAPI | null> => {
    try {
      const response = await httpClient.get<CVAPI>(API_ENDPOINTS.V2.CV_ME);
      return response as unknown as CVAPI;
    } catch (error: any) {
      // El HttpClient transforma errores, verificar mensaje
      if (error.message?.includes('404') || error.response?.status === 404) {
        return null; // No tiene CV, es normal
      }
      throw error;
    }
  },

  /**
   * Obtiene CV por ID de usuario
   */
  getCVByUserId: async (userId: number): Promise<CVAPI | null> => {
    try {
      const response = await httpClient.get<CVAPI>(API_ENDPOINTS.V2.CV_BY_ID(userId));
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  /**
   * Crea un nuevo CV
   */
  createCV: async (data: CVInputAPI): Promise<CVAPI> => {
    const response = await httpClient.post<CVAPI>(API_ENDPOINTS.V2.CV, data);
    return response.data;
  },

  /**
   * Actualiza un CV existente
   */
  updateCV: async (cvId: number, data: Partial<CVInputAPI>): Promise<CVAPI> => {
    const response = await httpClient.put<CVAPI>(API_ENDPOINTS.V2.CV_BY_ID(cvId), data);
    return response.data;
  },
};

// ============================================================================
// SERVICIO DE ACADEMIAS (para dropdown de temarios)
// ============================================================================

export const academiesUserService = {
  /**
   * Obtiene lista de academias para dropdown
   */
  getAcademiesDropdown: async (): Promise<AcademyDropdownAPI[]> => {
    const response = await httpClient.get<AcademyDropdownAPI[]>(
      API_ENDPOINTS.V2.ACADEMIES_DROPDOWN
    );
    return response.data;
  },
};

// ============================================================================
// SERVICIO DE CICLOS (para selector de ciclo)
// ============================================================================

export interface CycleDropdownAPI {
  id: number;
  cycle: string;  // El backend usa "cycle" no "name"
  name?: string;  // Alias opcional
  is_active?: boolean;
}

export const cyclesUserService = {
  /**
   * Obtiene lista de ciclos disponibles
   */
  getCyclesDropdown: async (): Promise<CycleDropdownAPI[]> => {
    const response = await httpClient.get<CycleDropdownAPI[]>(
      API_ENDPOINTS.V2.CYCLES_DROPDOWN
    );
    return response.data;
  },

  /**
   * Obtiene el ciclo actual
   */
  getCurrentCycle: async (): Promise<CycleDropdownAPI | null> => {
    try {
      const response = await httpClient.get<CycleDropdownAPI>(
        API_ENDPOINTS.V2.CYCLE_CURRENT
      );
      return response.data;
    } catch {
      return null;
    }
  },
};
