import { useState, useEffect } from 'react';
import { TemarioService } from '../services/TemarioService';
import { Academia, Materia, TemarioDetalle, EstadoMateria } from '../interfaces/temario.interfaces';
import { useAuth } from '../../shared/context/AuthContext';

export const useTemarios = () => {
  const { user } = useAuth();
  const [academias, setAcademias] = useState<Academia[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [academiaSeleccionada, setAcademiaSeleccionada] = useState<string>('comping');
  const [temarioSeleccionado, setTemarioSeleccionado] = useState<TemarioDetalle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTemario, setIsLoadingTemario] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const temarioService = new TemarioService();

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
      const academiasData = await temarioService.getAcademias();
      setAcademias(academiasData);
    } catch (err) {
      setError('Error al cargar academias');
      console.error('Error loading academias:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMaterias = async (academiaId: string) => {
    try {
      console.log('📚 Cargando materias para academia:', academiaId);
      setIsLoading(true);
      setError(null);
      const materiasData = await temarioService.getMateriasByAcademia(academiaId);
      console.log('📋 Materias cargadas:', materiasData);
      setMaterias(materiasData);
    } catch (err) {
      setError('Error al cargar materias');
      console.error('Error loading materias:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMateriaEstado = async (materiaId: string) => {
    try {
      console.log('🔄 Toggleando estado de materia:', materiaId);
      const materiaActualizada = await temarioService.toggleMateriaEstado(materiaId);
      console.log('✅ Materia actualizada:', materiaActualizada);
      
      if (materiaActualizada) {
        setMaterias(prev => {
          const nuevasMaterias = prev.map(materia => 
            materia.id === materiaId ? materiaActualizada : materia
          );
          console.log('📝 Nuevas materias state:', nuevasMaterias);
          return nuevasMaterias;
        });
      }
    } catch (err) {
      console.error('❌ Error al actualizar estado de materia:', err);
      setError('Error al actualizar estado de materia');
    }
  };

  const loadTemario = async (materiaId: string) => {
    try {
      console.log('📖 Cargando temario para materia:', materiaId);
      setIsLoadingTemario(true);
      setError(null);
      const temario = await temarioService.getTemarioByMateria(materiaId);
      console.log('�� Temario cargado:', temario);
      
      if (temario) {
        setTemarioSeleccionado(temario);
        console.log('✅ Temario seleccionado actualizado');
      } else {
        console.log('⚠️ No se encontró temario para esta materia');
        setError('No se encontró temario disponible para esta materia');
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
        .map(materia => materia.id);

      await temarioService.guardarPreferencias(
        user.id, 
        academiaSeleccionada, 
        materiasSeleccionadas
      );
      
      // Mostrar mensaje de éxito o navegar
      console.log('Preferencias guardadas exitosamente');
    } catch (err) {
      setError('Error al guardar preferencias');
      console.error('Error saving preferences:', err);
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