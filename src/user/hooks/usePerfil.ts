import { useState, useCallback } from 'react';
import { PerfilUsuario, ActualizacionPerfil, ConfiguracionPerfil } from '../interfaces/perfil.interfaces';

export const usePerfil = () => {
  // Estado del perfil (datos de ejemplo)
  const [perfil, setPerfil] = useState<PerfilUsuario>({
    id: '1',
    nombreUsuario: 'Miranda Smith',
    fechaNacimiento: '1995-08-15',
    descripcion: 'Profesora de Matemáticas con experiencia en educación superior. Apasionada por la enseñanza y el desarrollo de nuevas metodologías educativas.',
    avatar: '/src/assets/img/miranda.png',
    informacionGestionAcademica: {
      correoInstitucional: 'ejemplo@up.edu.mx',
      correoPersonal: 'ejemplo@gmail.com',
      celular: '(+210) 55 1234 5678',
      telefono: '(+210) 55 8765 4321',
      region: 'Región Norte'
    },
    fechaCreacion: '2024-01-15',
    fechaActualizacion: '2024-01-20'
  });

  // Configuración del componente
  const [configuracion, setConfiguracion] = useState<ConfiguracionPerfil>({
    modoEdicion: false,
    guardandoCambios: false,
    errores: {}
  });

  // Habilitar/deshabilitar modo edición
  const toggleModoEdicion = useCallback(() => {
    setConfiguracion(prev => ({
      ...prev,
      modoEdicion: !prev.modoEdicion,
      errores: {}
    }));
  }, []);

  // Actualizar campo del perfil
  const actualizarCampo = useCallback((campo: keyof PerfilUsuario, valor: any) => {
    setPerfil(prev => ({
      ...prev,
      [campo]: valor,
      fechaActualizacion: new Date().toISOString()
    }));
    
    // Limpiar error del campo si existe
    setConfiguracion(prev => ({
      ...prev,
      errores: {
        ...prev.errores,
        [campo]: ''
      }
    }));
  }, []);

  // Actualizar información de gestión académica
  const actualizarGestionAcademica = useCallback((campo: string, valor: string) => {
    setPerfil(prev => ({
      ...prev,
      informacionGestionAcademica: {
        ...prev.informacionGestionAcademica,
        [campo]: valor
      },
      fechaActualizacion: new Date().toISOString()
    }));

    // Limpiar error del campo si existe
    setConfiguracion(prev => ({
      ...prev,
      errores: {
        ...prev.errores,
        [campo]: ''
      }
    }));
  }, []);

  // Validar perfil
  const validarPerfil = useCallback((): boolean => {
    const errores: Record<string, string> = {};

    if (!perfil.nombreUsuario.trim()) {
      errores.nombreUsuario = 'El nombre de usuario es requerido';
    }

    if (!perfil.fechaNacimiento) {
      errores.fechaNacimiento = 'La fecha de nacimiento es requerida';
    }

    if (!perfil.informacionGestionAcademica.correoInstitucional.trim()) {
      errores.correoInstitucional = 'El correo institucional es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(perfil.informacionGestionAcademica.correoInstitucional)) {
      errores.correoInstitucional = 'El correo institucional no es válido';
    }

    if (!perfil.informacionGestionAcademica.correoPersonal.trim()) {
      errores.correoPersonal = 'El correo personal es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(perfil.informacionGestionAcademica.correoPersonal)) {
      errores.correoPersonal = 'El correo personal no es válido';
    }

    if (!perfil.informacionGestionAcademica.celular.trim()) {
      errores.celular = 'El celular es requerido';
    }

    if (!perfil.informacionGestionAcademica.region.trim()) {
      errores.region = 'La región es requerida';
    }

    setConfiguracion(prev => ({
      ...prev,
      errores
    }));

    return Object.keys(errores).length === 0;
  }, [perfil]);

  // Guardar cambios
  const guardarCambios = useCallback(async () => {
    if (!validarPerfil()) {
      return false;
    }

    setConfiguracion(prev => ({
      ...prev,
      guardandoCambios: true
    }));

    try {
      // Aquí iría la llamada al API para guardar
      console.log('Guardando perfil:', perfil);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simular delay

      setConfiguracion(prev => ({
        ...prev,
        modoEdicion: false,
        guardandoCambios: false,
        errores: {}
      }));

      return true;
    } catch (error) {
      console.error('Error al guardar perfil:', error);
      setConfiguracion(prev => ({
        ...prev,
        guardandoCambios: false,
        errores: { general: 'Error al guardar los cambios. Inténtalo de nuevo.' }
      }));
      return false;
    }
  }, [perfil, validarPerfil]);

  // Cancelar edición
  const cancelarEdicion = useCallback(() => {
    // Aquí podrías revertir los cambios si fuera necesario
    setConfiguracion(prev => ({
      ...prev,
      modoEdicion: false,
      errores: {}
    }));
  }, []);

  // Actualizar avatar
  const actualizarAvatar = useCallback((archivo: File) => {
    // Aquí iría la lógica para subir el archivo
    const url = URL.createObjectURL(archivo);
    actualizarCampo('avatar', url);
  }, [actualizarCampo]);

  return {
    // Estado
    perfil,
    configuracion,

    // Acciones
    toggleModoEdicion,
    actualizarCampo,
    actualizarGestionAcademica,
    guardarCambios,
    cancelarEdicion,
    actualizarAvatar,
    validarPerfil
  };
}; 