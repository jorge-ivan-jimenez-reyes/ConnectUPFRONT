import { useState, useCallback, useEffect } from 'react';
import { PerfilUsuario, ActualizacionPerfil, ConfiguracionPerfil } from '../interfaces/perfil.interfaces';
import { userService, UserDetailAPI, UpdateUserInput } from '../../shared/services/api';

// ============================================================================
// MAPEO ENTRE BACKEND Y FRONTEND
// ============================================================================

/** Convierte UserDetailAPI del backend a PerfilUsuario del frontend */
function apiToPerfilUsuario(api: UserDetailAPI): PerfilUsuario {
  return {
    id: String(api.id),
    nombreUsuario: api.full_name || `${api.first_name} ${api.last_name}`,
    fechaNacimiento: '', // El backend no tiene este campo directamente
    descripcion: '', // El backend no tiene este campo
    avatar: api.profile_picture || undefined,
    informacionGestionAcademica: {
      correoInstitucional: api.institution_email || '',
      correoPersonal: api.email,
      celular: api.phone || '',
      telefono: '',
      region: '', // El backend no tiene este campo
    },
    fechaCreacion: api.created_at,
    fechaActualizacion: api.updated_at,
  };
}

/** Convierte datos del frontend a UpdateUserInput para el backend */
function perfilToUpdateInput(perfil: PerfilUsuario): UpdateUserInput {
  const [firstName, ...lastNameParts] = perfil.nombreUsuario.split(' ');
  const lastName = lastNameParts.join(' ') || '';
  
  return {
    first_name: firstName,
    last_name: lastName,
    email: perfil.informacionGestionAcademica.correoPersonal,
    institution_email: perfil.informacionGestionAcademica.correoInstitucional || undefined,
    phone: perfil.informacionGestionAcademica.celular || undefined,
    profile_picture: perfil.avatar || undefined,
  };
}

// ============================================================================
// HOOK
// ============================================================================

export const usePerfil = () => {
  // Estado del perfil
  const [perfil, setPerfil] = useState<PerfilUsuario>({
    id: '',
    nombreUsuario: '',
    fechaNacimiento: '',
    descripcion: '',
    avatar: undefined,
    informacionGestionAcademica: {
      correoInstitucional: '',
      correoPersonal: '',
      celular: '',
      telefono: '',
      region: ''
    },
    fechaCreacion: '',
    fechaActualizacion: ''
  });

  // Configuración del componente
  const [configuracion, setConfiguracion] = useState<ConfiguracionPerfil>({
    modoEdicion: false,
    guardandoCambios: false,
    errores: {}
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // =========================================================================
  // CARGAR PERFIL DEL BACKEND
  // =========================================================================
  const cargarPerfil = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userDetail = await userService.getMe();
      const perfilData = apiToPerfilUsuario(userDetail);
      setPerfil(perfilData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar perfil';
      setError(message);
      console.error('Error cargando perfil:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cargar al montar
  useEffect(() => {
    cargarPerfil();
  }, [cargarPerfil]);

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

    if (!perfil.informacionGestionAcademica.correoPersonal.trim()) {
      errores.correoPersonal = 'El correo personal es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(perfil.informacionGestionAcademica.correoPersonal)) {
      errores.correoPersonal = 'El correo personal no es válido';
    }

    if (perfil.informacionGestionAcademica.correoInstitucional && 
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(perfil.informacionGestionAcademica.correoInstitucional)) {
      errores.correoInstitucional = 'El correo institucional no es válido';
    }

    setConfiguracion(prev => ({
      ...prev,
      errores
    }));

    return Object.keys(errores).length === 0;
  }, [perfil]);

  // Guardar cambios en el backend
  const guardarCambios = useCallback(async (): Promise<boolean> => {
    if (!validarPerfil()) {
      return false;
    }

    setConfiguracion(prev => ({
      ...prev,
      guardandoCambios: true
    }));

    try {
      const updateData = perfilToUpdateInput(perfil);
      const updatedUser = await userService.updateMe(updateData);
      
      // Actualizar perfil local con la respuesta
      const perfilActualizado = apiToPerfilUsuario(updatedUser);
      setPerfil(perfilActualizado);

      setConfiguracion(prev => ({
        ...prev,
        modoEdicion: false,
        guardandoCambios: false,
        errores: {}
      }));

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al guardar cambios';
      console.error('Error al guardar perfil:', err);
      setConfiguracion(prev => ({
        ...prev,
        guardandoCambios: false,
        errores: { general: message }
      }));
      return false;
    }
  }, [perfil, validarPerfil]);

  // Cancelar edición
  const cancelarEdicion = useCallback(() => {
    // Recargar perfil del servidor para descartar cambios
    cargarPerfil();
    setConfiguracion(prev => ({
      ...prev,
      modoEdicion: false,
      errores: {}
    }));
  }, [cargarPerfil]);

  // Actualizar avatar
  const actualizarAvatar = useCallback((archivo: File) => {
    // TODO: Implementar subida de archivo al servidor
    // Por ahora solo actualizamos localmente
    const url = URL.createObjectURL(archivo);
    actualizarCampo('avatar', url);
  }, [actualizarCampo]);

  return {
    // Estado
    perfil,
    configuracion,
    isLoading,
    error,

    // Acciones
    cargarPerfil,
    toggleModoEdicion,
    actualizarCampo,
    actualizarGestionAcademica,
    guardarCambios,
    cancelarEdicion,
    actualizarAvatar,
    validarPerfil
  };
};
