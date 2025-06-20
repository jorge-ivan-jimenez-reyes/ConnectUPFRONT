import { useState, useEffect } from 'react';
import { ClaseInfo, EstadisticasClases } from '../interfaces/clase.interfaces';

export const useHorarioClases = () => {
  const [clasesHoy, setClasesHoy] = useState<ClaseInfo[]>([]);
  const [estadisticas, setEstadisticas] = useState<EstadisticasClases | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data para las clases
  const mockClases: ClaseInfo[] = [
    {
      id: '1',
      materia: 'Programación',
      tema: 'React Hooks Avanzados',
      horaInicio: '08:00',
      horaFin: '10:00',
      aula: 'LAB_A101',
      profesor: 'Dr. García',
      dia: 'lunes',
      color: '#3B82F6'
    },
    {
      id: '2',
      materia: 'Matemáticas',
      tema: 'Cálculo Diferencial',
      horaInicio: '10:30',
      horaFin: '12:00',
      aula: 'CDC_B',
      profesor: 'Dra. López',
      dia: 'lunes',
      color: '#10B981'
    },
    {
      id: '3',
      materia: 'Diseño',
      tema: 'UI/UX Principles',
      horaInicio: '14:00',
      horaFin: '16:00',
      aula: 'R36',
      profesor: 'Mg. Rodríguez',
      dia: 'lunes',
      color: '#8B5CF6'
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    const loadHorario = async () => {
      setIsLoading(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Obtener día actual
      const hoy = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
      const diaActual = hoy.toLowerCase();
      
      // Filtrar clases del día actual
      const clasesDelDia = mockClases.filter(clase => 
        clase.dia === diaActual || clase.dia === 'lunes' // Por defecto mostrar lunes para demo
      );
      
      setClasesHoy(clasesDelDia);
      
      // Calcular estadísticas
      const stats: EstadisticasClases = {
        totalClases: mockClases.length,
        clasesHoy: clasesDelDia.length,
        proximaClase: clasesDelDia[0],
        clasesCompletadas: 0
      };
      
      setEstadisticas(stats);
      setIsLoading(false);
    };

    loadHorario();
  }, []);

  const obtenerProximaClase = (): ClaseInfo | null => {
    const ahora = new Date();
    const clasesRestantes = clasesHoy.filter(clase => {
      const horaInicio = new Date(`${ahora.toDateString()} ${clase.horaInicio}`);
      return horaInicio > ahora;
    });
    
    return clasesRestantes.length > 0 ? clasesRestantes[0] : null;
  };

  return {
    clasesHoy,
    estadisticas,
    isLoading,
    proximaClase: obtenerProximaClase(),
    refetch: () => {
      // Función para recargar datos si es necesario
    }
  };
}; 