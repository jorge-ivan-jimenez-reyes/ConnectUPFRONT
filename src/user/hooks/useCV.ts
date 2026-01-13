/**
 * Hook para gestionar el CV del docente
 * 
 * Conecta con:
 * - /v2/cv/me/ - para obtener el CV del usuario actual
 * - /v2/cv/ POST - para crear CV
 * - /v2/cv/{id}/ PUT - para actualizar CV
 */

import { useState, useCallback, useEffect } from 'react';
import { cvApiService, CVAPI } from '../services/userApiServices';
import { SeccionesCV, SeccionConfig, CVCompleto, DatosBasicos } from '../interfaces/cv.interfaces';
import { useAuth } from '../../shared/context/AuthContext';

/**
 * Transforma datos del backend al formato del frontend
 */
const transformCVFromAPI = (cvApi: CVAPI): Partial<CVCompleto> => {
  const nombres = cvApi.user_name?.split(' ') || ['', ''];
  
  return {
    id: String(cvApi.id),
    usuarioId: String(cvApi.user_id),
    datosBasicos: {
      nombres: nombres[0] || '',
      apellidos: nombres.slice(1).join(' ') || '',
      tipoDocumento: 'cedula',
      numeroDocumento: '',
      fechaNacimiento: cvApi.birthdate || '',
      nombramientoActual: cvApi.job_title || '',
      fechaIngresoUniversidad: cvApi.admission_date || '',
      genero: '',
      estadoCivil: '',
      nacionalidad: '',
      telefono: '',
      email: cvApi.user_email || '',
      direccion: '',
      ciudad: '',
      pais: '',
      codigoPostal: '',
      sitioWeb: '',
      linkedin: '',
      github: '',
    },
    formacionAcademica: cvApi.academic_paths.map(ap => ({
      id: String(ap.id),
      nivelEducativo: ap.level_type || '',
      tituloObtenido: ap.name || '',
      institucion: ap.institution || '',
      pais: ap.country || '',
      ciudad: '',
      fechaInicio: '',
      fechaFin: String(ap.complete_year),
      enCurso: false,
      promedio: '',
      descripcion: ap.degree_certificate || '',
    })),
    capacitacionDocente: cvApi.trainings.map(t => ({
      id: String(t.id),
      nombreCapacitacion: t.type || '',
      tipoCapacitacion: t.type,
      institucionOrganizadora: t.institution || '',
      modalidad: '',
      fechaInicio: '',
      fechaFin: String(t.complete_year),
      duracionHoras: t.amount_time * 8, // Convertir días a horas aproximado
      certificado: true,
      descripcion: `${t.country}`,
    })),
    actualizacionDisciplinar: [],
    gestionAcademica: cvApi.academic_experiences.map(ae => ({
      id: String(ae.id),
      cargo: ae.name || '',
      dependencia: '',
      institucion: ae.institution || '',
      fechaInicio: ae.in_date || '',
      fechaFin: ae.out_date || '',
      enEjercicio: false,
      responsabilidades: [],
      logrosObtenidos: '',
    })),
    productosAcademicos: [],
    experienciaProfesional: cvApi.engineer_design_paths.map(edp => ({
      id: String(edp.id),
      cargo: edp.experience_level || '',
      empresa: edp.institution || '',
      sector: 'Ingeniería',
      tipoContrato: 'Tiempo completo',
      fechaInicio: '',
      fechaFin: '',
      enEjercicio: false,
      responsabilidades: [],
      logrosObtenidos: `${edp.amount_years} años de experiencia`,
    })),
    logrosProfesionales: cvApi.professional_achievements.map(pa => ({
      id: String(pa.id),
      tipoLogro: 'logro',
      titulo: pa.name,
      descripcion: '',
      institucionOtorgante: '',
      fechaObtencion: '',
      vigencia: '',
      documentoSoporte: '',
    })),
    participacionInstituciones: [],
    reconocimientosObtenidos: cvApi.awards.map(a => ({
      id: String(a.id),
      tipoReconocimiento: 'premio',
      titulo: a.name,
      descripcion: '',
      institucionOtorgante: '',
      fechaObtencion: '',
      categoria: '',
      documentoSoporte: '',
    })),
    aportacionesRelevantes: cvApi.contributions.map(c => ({
      id: String(c.id),
      tipoAportacion: 'contribucion',
      titulo: c.name,
      descripcion: '',
      fechaRealizacion: '',
      beneficiarios: '',
      impacto: '',
      evidencias: [],
    })),
    fechaCreacion: '',
    fechaActualizacion: '',
  };
};

export const useCV = () => {
  const { user } = useAuth();
  
  // Configuración de las secciones del CV
  const seccionesConfig: SeccionConfig[] = [
    {
      id: SeccionesCV.DATOS_BASICOS,
      titulo: 'Datos básicos',
      icono: 'user',
      descripcion: 'Información personal y de contacto',
      activa: true
    },
    {
      id: SeccionesCV.FORMACION_ACADEMICA,
      titulo: 'Formación académica',
      icono: 'graduation-cap',
      descripcion: 'Estudios realizados y títulos obtenidos',
      activa: false
    },
    {
      id: SeccionesCV.CAPACITACION_DOCENTE,
      titulo: 'Capacitación docente',
      icono: 'chalkboard-teacher',
      descripcion: 'Cursos y capacitaciones en docencia',
      activa: false
    },
    {
      id: SeccionesCV.ACTUALIZACION_DISCIPLINAR,
      titulo: 'Actualización disciplinar',
      icono: 'sync-alt',
      descripcion: 'Actividades de actualización profesional',
      activa: false
    },
    {
      id: SeccionesCV.GESTION_ACADEMICA,
      titulo: 'Gestión académica',
      icono: 'users-cog',
      descripcion: 'Cargos y responsabilidades administrativas',
      activa: false
    },
    {
      id: SeccionesCV.PRODUCTOS_ACADEMICOS,
      titulo: 'Productos académicos',
      icono: 'file-alt',
      descripcion: 'Publicaciones y trabajos académicos',
      activa: false
    },
    {
      id: SeccionesCV.EXPERIENCIA_PROFESIONAL,
      titulo: 'Exp. profesional no académica',
      icono: 'briefcase',
      descripcion: 'Experiencia laboral fuera del ámbito académico',
      activa: false
    },
    {
      id: SeccionesCV.LOGROS_PROFESIONALES,
      titulo: 'Logros profesionales',
      icono: 'trophy',
      descripcion: 'Logros y destacados profesionales',
      activa: false
    },
    {
      id: SeccionesCV.PARTICIPACION_INSTITUCIONES,
      titulo: 'Participación en instituciones',
      icono: 'building',
      descripcion: 'Participación en organizaciones e instituciones',
      activa: false
    },
    {
      id: SeccionesCV.RECONOCIMIENTOS,
      titulo: 'Reconocimientos obtenidos',
      icono: 'medal',
      descripcion: 'Premios y reconocimientos recibidos',
      activa: false
    },
    {
      id: SeccionesCV.APORTACIONES_RELEVANTES,
      titulo: 'Aportaciones relevantes',
      icono: 'lightbulb',
      descripcion: 'Contribuciones significativas al área',
      activa: false
    }
  ];

  // Estados
  const [seccionActiva, setSeccionActiva] = useState<SeccionesCV>(SeccionesCV.DATOS_BASICOS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cvId, setCvId] = useState<number | null>(null);

  // Estado del CV
  const [cvData, setCvData] = useState<Partial<CVCompleto>>({
    datosBasicos: {
      nombres: '',
      apellidos: '',
      tipoDocumento: 'cedula',
      numeroDocumento: '',
      fechaNacimiento: '',
      genero: '',
      estadoCivil: '',
      nacionalidad: '',
      telefono: '',
      email: '',
      direccion: '',
      ciudad: '',
      pais: '',
      codigoPostal: '',
      sitioWeb: '',
      linkedin: '',
      github: ''
    },
    formacionAcademica: [],
    capacitacionDocente: [],
    actualizacionDisciplinar: [],
    gestionAcademica: [],
    productosAcademicos: [],
    experienciaProfesional: [],
    logrosProfesionales: [],
    participacionInstituciones: [],
    reconocimientosObtenidos: [],
    aportacionesRelevantes: []
  });

  // Cargar CV al iniciar
  useEffect(() => {
    const loadCV = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const cv = await cvApiService.getMyCV();
        
        if (cv) {
          setCvId(cv.id);
          const transformedData = transformCVFromAPI(cv);
          setCvData(transformedData);
        }
      } catch (err: any) {
        // Si es 404, no es error, simplemente no tiene CV aún
        const is404 = err.message?.includes('404') || err.response?.status === 404;
        if (!is404) {
          console.error('Error loading CV:', err);
          setError('Error al cargar el CV');
        }
        // Si es 404, silenciosamente ignorar - el usuario puede crear su CV
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadCV();
    }
  }, [user]);

  // Navegación entre secciones
  const navegarASeccion = useCallback((seccion: SeccionesCV) => {
    setSeccionActiva(seccion);
  }, []);

  const obtenerSeccionActual = useCallback(() => {
    return seccionesConfig.find(s => s.id === seccionActiva);
  }, [seccionActiva]);

  const obtenerSeccionSiguiente = useCallback(() => {
    const indexActual = seccionesConfig.findIndex(s => s.id === seccionActiva);
    if (indexActual < seccionesConfig.length - 1) {
      return seccionesConfig[indexActual + 1];
    }
    return null;
  }, [seccionActiva]);

  const obtenerSeccionAnterior = useCallback(() => {
    const indexActual = seccionesConfig.findIndex(s => s.id === seccionActiva);
    if (indexActual > 0) {
      return seccionesConfig[indexActual - 1];
    }
    return null;
  }, [seccionActiva]);

  // Gestión de datos
  const actualizarDatosBasicos = useCallback((datos: Partial<DatosBasicos>) => {
    setCvData(prev => ({
      ...prev,
      datosBasicos: {
        ...prev.datosBasicos!,
        ...datos
      }
    }));
    setHasChanges(true);
  }, []);

  const agregarElementoSeccion = useCallback((seccion: keyof CVCompleto, elemento: any) => {
    setCvData(prev => ({
      ...prev,
      [seccion]: [
        ...(prev[seccion] as any[] || []),
        { ...elemento, id: Date.now().toString() }
      ]
    }));
    setHasChanges(true);
  }, []);

  const editarElementoSeccion = useCallback((seccion: keyof CVCompleto, elementoId: string, datos: any) => {
    setCvData(prev => ({
      ...prev,
      [seccion]: (prev[seccion] as any[] || []).map(item =>
        item.id === elementoId ? { ...item, ...datos } : item
      )
    }));
    setHasChanges(true);
  }, []);

  const eliminarElementoSeccion = useCallback((seccion: keyof CVCompleto, elementoId: string) => {
    setCvData(prev => ({
      ...prev,
      [seccion]: (prev[seccion] as any[] || []).filter(item => item.id !== elementoId)
    }));
    setHasChanges(true);
  }, []);

  // Persistencia
  const guardarCV = useCallback(async () => {
    if (!cvData.datosBasicos) return;
    
    setIsSaving(true);
    setError(null);
    
    try {
      const cvInput = {
        birthdate: cvData.datosBasicos.fechaNacimiento || new Date().toISOString().split('T')[0],
        job_title: cvData.datosBasicos.nombramientoActual || 'Docente',
        admission_date: cvData.datosBasicos.fechaIngresoUniversidad || new Date().toISOString().split('T')[0],
        initial_date_pe: undefined,
      };

      if (cvId) {
        // Actualizar CV existente
        await cvApiService.updateCV(cvId, cvInput);
      } else {
        // Crear nuevo CV
        const newCV = await cvApiService.createCV(cvInput);
        setCvId(newCV.id);
      }

      setHasChanges(false);
      console.log('✅ CV guardado exitosamente');
    } catch (err) {
      console.error('Error al guardar CV:', err);
      setError('Error al guardar el CV');
    } finally {
      setIsSaving(false);
    }
  }, [cvData, cvId]);

  const exportarPDF = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Implementar exportación a PDF cuando el backend lo soporte
      console.log('Exportando CV a PDF');
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Funcionalidad de exportar PDF próximamente disponible');
    } catch (err) {
      console.error('Error al exportar PDF:', err);
      setError('Error al exportar PDF');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Validaciones
  const validarSeccion = useCallback((seccion: SeccionesCV): boolean => {
    switch (seccion) {
      case SeccionesCV.DATOS_BASICOS:
        const datos = cvData.datosBasicos;
        return !!(datos?.nombres && datos?.apellidos && datos?.email);
      default:
        return true;
    }
  }, [cvData]);

  const obtenerProgreso = useCallback((): number => {
    const seccionesCompletas = seccionesConfig.filter(s => validarSeccion(s.id)).length;
    return Math.round((seccionesCompletas / seccionesConfig.length) * 100);
  }, [validarSeccion]);

  return {
    // Estado
    seccionesConfig,
    seccionActiva,
    isLoading,
    isSaving,
    hasChanges,
    cvData,
    error,

    // Navegación
    navegarASeccion,
    obtenerSeccionActual,
    obtenerSeccionSiguiente,
    obtenerSeccionAnterior,

    // Gestión de datos
    actualizarDatosBasicos,
    agregarElementoSeccion,
    editarElementoSeccion,
    eliminarElementoSeccion,

    // Persistencia
    guardarCV,
    exportarPDF,

    // Utilidades
    validarSeccion,
    obtenerProgreso
  };
};
