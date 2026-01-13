/**
 * Hook para gestionar Temarios y Preferencias de Materias
 * 
 * Conecta con:
 * - /v2/academies/dropdown/ - para lista de academias
 * - /v2/preferences/?academy=xxx - para cursos con preferencias
 * - /v2/preferences/ POST - para toggle de preferencia
 * 
 * Nota: Los temarios detallados (syllabus) no están implementados en el backend,
 * por lo que se mantienen como mock por ahora.
 */

import { useState, useEffect, useCallback } from 'react';
import { preferencesService, academiesUserService, CourseWithPreferenceAPI } from '../services/userApiServices';
import { Academia, Materia, TemarioDetalle, EstadoMateria, TipoEvaluacion, TipoBibliografia } from '../interfaces/temario.interfaces';
import { useAuth } from '../../shared/context/AuthContext';

// Colores disponibles para materias
const COLORS = [
  'bg-blue-500',
  'bg-red-500',
  'bg-purple-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
];

/**
 * Transforma curso del backend al formato de Materia del frontend
 */
const transformCourseToMateria = (course: CourseWithPreferenceAPI, index: number): Materia => {
  return {
    id: String(course.id),
    nombre: course.name,
    descripcion: `Código: ${course.code}`,
    icono: course.style?.icon || 'book',
    color: COLORS[index % COLORS.length],
    academia: course.academy_name || course.academy || '',
    estado: course.is_selected === 'true' ? EstadoMateria.AÑADIDA : EstadoMateria.DISPONIBLE,
    codigo: course.code,
    creditos: undefined,
  };
};

// Mock de temarios detallados (hasta que el backend los implemente)
const MOCK_TEMARIOS: TemarioDetalle[] = [
  {
    id: 'temario-mock',
    materiaId: '',
    denominacion: '',
    clave: '',
    cicloEscolar: 'Bloque disciplinario profesional',
    bloque: 'Fines de aprendizaje y formación',
    finesAprendizaje: 'Objetivos de aprendizaje específicos de la materia.',
    contenidoTematico: [
      {
        id: 'contenido-1',
        numero: 1,
        titulo: 'INTRODUCCIÓN',
        subtemas: [
          { id: 'subtema-1-1', numero: '1.1', titulo: 'Conceptos básicos', descripcion: 'Fundamentos de la materia' },
          { id: 'subtema-1-2', numero: '1.2', titulo: 'Historia y evolución', descripcion: 'Contexto histórico' },
        ]
      },
      {
        id: 'contenido-2',
        numero: 2,
        titulo: 'DESARROLLO',
        subtemas: [
          { id: 'subtema-2-1', numero: '2.1', titulo: 'Tema principal', descripcion: 'Contenido central' },
          { id: 'subtema-2-2', numero: '2.2', titulo: 'Aplicaciones prácticas', descripcion: 'Casos de uso' },
        ]
      }
    ],
    objetivos: ['Conocer los fundamentos', 'Aplicar conceptos en casos prácticos'],
    metodologia: ['Clases teóricas', 'Talleres prácticos', 'Proyectos'],
    evaluacion: [
      { id: 'eval-1', tipo: TipoEvaluacion.PROYECTO, descripcion: 'Proyecto final', porcentaje: 40 },
      { id: 'eval-2', tipo: TipoEvaluacion.EXAMEN, descripcion: 'Exámenes parciales', porcentaje: 40 },
      { id: 'eval-3', tipo: TipoEvaluacion.PARTICIPACION, descripcion: 'Participación', porcentaje: 20 },
    ],
    bibliografia: [
      { id: 'bib-1', tipo: TipoBibliografia.LIBRO, autor: 'Autor', titulo: 'Libro de referencia', editorial: 'Editorial', año: 2024 },
    ],
    profesor: 'Por asignar',
    fechaActualizacion: new Date().toISOString().split('T')[0],
  }
];

export const useTemarios = () => {
  const { user } = useAuth();
  const [academias, setAcademias] = useState<Academia[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [academiaSeleccionada, setAcademiaSeleccionada] = useState<string>('');
  const [temarioSeleccionado, setTemarioSeleccionado] = useState<TemarioDetalle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTemario, setIsLoadingTemario] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar academias al inicializar
  useEffect(() => {
    loadAcademias();
  }, []);

  // Cargar materias cuando cambia la academia seleccionada
  useEffect(() => {
    if (academiaSeleccionada) {
      loadMaterias(academiaSeleccionada);
    }
  }, [academiaSeleccionada]);

  const loadAcademias = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const academiasData = await academiesUserService.getAcademiesDropdown();
      
      const academiasFormateadas: Academia[] = academiasData.map(a => ({
        id: String(a.id),
        nombre: a.name,
        descripcion: a.faculty_name || '',
        materias: [],
        activa: true,
      }));
      
      setAcademias(academiasFormateadas);
      
      // Seleccionar primera academia si hay
      if (academiasFormateadas.length > 0 && !academiaSeleccionada) {
        setAcademiaSeleccionada(academiasFormateadas[0].nombre);
      }
    } catch (err) {
      console.error('Error loading academias:', err);
      setError('Error al cargar academias');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMaterias = async (academiaName: string) => {
    try {
      console.log('📚 Cargando materias para academia:', academiaName);
      setIsLoading(true);
      setError(null);
      
      const coursesData = await preferencesService.getCoursesByAcademy(academiaName);
      
      const materiasFormateadas = coursesData.map((course, index) => 
        transformCourseToMateria(course, index)
      );
      
      console.log('📋 Materias cargadas:', materiasFormateadas);
      setMaterias(materiasFormateadas);
    } catch (err) {
      console.error('Error loading materias:', err);
      setError('Error al cargar materias');
      setMaterias([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMateriaEstado = async (materiaId: string) => {
    try {
      console.log('🔄 Toggleando estado de materia:', materiaId);
      
      // Llamar al backend para toggle
      const result = await preferencesService.togglePreference(parseInt(materiaId, 10));
      console.log('✅ Resultado toggle:', result);
      
      // Actualizar estado local
      setMaterias(prev => prev.map(materia => {
        if (materia.id === materiaId) {
          return {
            ...materia,
            estado: result.is_selected ? EstadoMateria.AÑADIDA : EstadoMateria.DISPONIBLE,
          };
        }
        return materia;
      }));
      
      return materias.find(m => m.id === materiaId);
    } catch (err) {
      console.error('❌ Error al actualizar estado de materia:', err);
      setError('Error al actualizar estado de materia');
      throw err;
    }
  };

  const loadTemario = async (materiaId: string) => {
    try {
      console.log('📖 Cargando temario para materia:', materiaId);
      setIsLoadingTemario(true);
      setError(null);
      
      // TODO: Cuando el backend implemente temarios, usar el servicio real
      // Por ahora, generar un temario mock basado en la materia
      const materia = materias.find(m => m.id === materiaId);
      
      if (materia) {
        const temarioGenerado: TemarioDetalle = {
          ...MOCK_TEMARIOS[0],
          id: `temario-${materiaId}`,
          materiaId: materiaId,
          denominacion: materia.nombre,
          clave: materia.codigo || 'SIN-CODIGO',
        };
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setTemarioSeleccionado(temarioGenerado);
        console.log('✅ Temario generado:', temarioGenerado);
      } else {
        setError('Materia no encontrada');
      }
    } catch (err) {
      console.error('❌ Error al cargar temario:', err);
      setError('Error al cargar temario');
    } finally {
      setIsLoadingTemario(false);
    }
  };

  const guardarPreferencias = async () => {
    if (!user) {
      setError('Usuario no autenticado');
      return;
    }

    try {
      const materiasSeleccionadas = materias
        .filter(materia => materia.estado === EstadoMateria.AÑADIDA)
        .map(materia => ({
          id: parseInt(materia.id, 10),
          is_selected: 'true' as const,
        }));

      const materiasNoSeleccionadas = materias
        .filter(materia => materia.estado === EstadoMateria.DISPONIBLE)
        .map(materia => ({
          id: parseInt(materia.id, 10),
          is_selected: 'false' as const,
        }));

      await preferencesService.savePreferences({
        [academiaSeleccionada]: [...materiasSeleccionadas, ...materiasNoSeleccionadas],
      });
      
      console.log('✅ Preferencias guardadas exitosamente');
    } catch (err) {
      console.error('Error saving preferences:', err);
      setError('Error al guardar preferencias');
    }
  };

  const clearError = () => setError(null);
  const clearTemarioSeleccionado = () => setTemarioSeleccionado(null);

  return {
    // Estado
    academias,
    materias,
    academiaSeleccionada,
    temarioSeleccionado,
    isLoading,
    isLoadingTemario,
    error,

    // Acciones
    setAcademiaSeleccionada,
    toggleMateriaEstado,
    loadTemario,
    guardarPreferencias,
    clearError,
    clearTemarioSeleccionado,
    
    // Utilidades
    materiasAñadidas: materias.filter(m => m.estado === EstadoMateria.AÑADIDA),
    materiasDisponibles: materias.filter(m => m.estado === EstadoMateria.DISPONIBLE),
    totalMaterias: materias.length
  };
};
