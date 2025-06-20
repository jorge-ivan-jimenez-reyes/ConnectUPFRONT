import { useState, useCallback } from 'react';
import { SeccionesCV, SeccionConfig, CVCompleto, DatosBasicos } from '../interfaces/cv.interfaces';

export const useCV = () => {
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
      descripción: 'Participación en organizaciones e instituciones',
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
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Estado del CV (inicialización con datos por defecto)
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

  // Navegación entre secciones
  const navegarASeccion = useCallback((seccion: SeccionesCV) => {
    setSeccionActiva(seccion);
  }, []);

  const obtenerSeccionActual = useCallback(() => {
    return seccionesConfig.find(s => s.id === seccionActiva);
  }, [seccionActiva, seccionesConfig]);

  const obtenerSeccionSiguiente = useCallback(() => {
    const indexActual = seccionesConfig.findIndex(s => s.id === seccionActiva);
    if (indexActual < seccionesConfig.length - 1) {
      return seccionesConfig[indexActual + 1];
    }
    return null;
  }, [seccionActiva, seccionesConfig]);

  const obtenerSeccionAnterior = useCallback(() => {
    const indexActual = seccionesConfig.findIndex(s => s.id === seccionActiva);
    if (indexActual > 0) {
      return seccionesConfig[indexActual - 1];
    }
    return null;
  }, [seccionActiva, seccionesConfig]);

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
    setIsLoading(true);
    try {
      // Aquí iría la llamada al API para guardar
      console.log('Guardando CV:', cvData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      setHasChanges(false);
    } catch (error) {
      console.error('Error al guardar CV:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cvData]);

  const exportarPDF = useCallback(async () => {
    setIsLoading(true);
    try {
      // Aquí iría la lógica para exportar a PDF
      console.log('Exportando CV a PDF');
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simular delay
    } catch (error) {
      console.error('Error al exportar PDF:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Validaciones
  const validarSeccion = useCallback((seccion: SeccionesCV): boolean => {
    switch (seccion) {
      case SeccionesCV.DATOS_BASICOS:
        const datos = cvData.datosBasicos;
        return !!(datos?.nombres && datos?.apellidos && datos?.email && datos?.telefono);
      default:
        return true;
    }
  }, [cvData]);

  const obtenerProgreso = useCallback((): number => {
    const seccionesCompletas = seccionesConfig.filter(s => validarSeccion(s.id)).length;
    return Math.round((seccionesCompletas / seccionesConfig.length) * 100);
  }, [seccionesConfig, validarSeccion]);

  return {
    // Estado
    seccionesConfig,
    seccionActiva,
    isLoading,
    hasChanges,
    cvData,

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