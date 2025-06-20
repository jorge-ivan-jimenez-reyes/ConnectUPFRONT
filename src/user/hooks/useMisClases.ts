import { useState, useEffect } from 'react';
import { ClaseDetalle } from '../interfaces/clase.interfaces';

export const useMisClases = () => {
  const [clases, setClases] = useState<ClaseDetalle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cicloSeleccionado, setCicloSeleccionado] = useState('1238');

  // Mock data para las clases
  const mockClases: ClaseDetalle[] = [
    {
      id: '1',
      materia: 'Programación',
      codigo: 'PROG-101',
      profesor: 'Dr. García López',
      ciclo: '1238',
      horarios: [
        {
          dia: 'Lu',
          horaInicio: '16:00',
          horaFin: '18:30',
          aula: 'V_LAB_ADIG'
        },
        {
          dia: 'Ma',
          horaInicio: '16:00',
          horaFin: '18:30',
          aula: 'CDC_B'
        },
        {
          dia: 'Mi',
          horaInicio: '16:00',
          horaFin: '18:30',
          aula: 'R36'
        }
      ],
      estudiantes: 28,
      creditos: 4
    },
    {
      id: '2',
      materia: 'Matemáticas',
      codigo: 'MATH-201',
      profesor: 'Dra. María Rodríguez',
      ciclo: '1238',
      horarios: [
        {
          dia: 'Lu',
          horaInicio: '16:00',
          horaFin: '18:30',
          aula: 'V_LAB_ADIG'
        },
        {
          dia: 'Ma',
          horaInicio: '16:00',
          horaFin: '18:30',
          aula: 'CDC_B'
        }
      ],
      estudiantes: 32,
      creditos: 3
    },
    {
      id: '3',
      materia: 'Diseño',
      codigo: 'DIS-301',
      profesor: 'Mg. Carlos Mendoza',
      ciclo: '1238',
      horarios: [
        {
          dia: 'Lu',
          horaInicio: '16:00',
          horaFin: '18:30',
          aula: 'V_LAB_ADIG'
        },
        {
          dia: 'Ma',
          horaInicio: '16:00',
          horaFin: '18:30',
          aula: 'CDC_B'
        }
      ],
      estudiantes: 25,
      creditos: 3
    },
    {
      id: '4',
      materia: 'Historia',
      codigo: 'HIS-101',
      profesor: 'Dr. Ana Torres',
      ciclo: '1239',
      horarios: [
        {
          dia: 'Mi',
          horaInicio: '14:00',
          horaFin: '16:30',
          aula: 'AULA-201'
        },
        {
          dia: 'Vi',
          horaInicio: '14:00',
          horaFin: '16:30',
          aula: 'AULA-201'
        }
      ],
      estudiantes: 30,
      creditos: 3
    },
    {
      id: '5',
      materia: 'Inglés',
      codigo: 'ENG-102',
      profesor: 'Prof. John Smith',
      ciclo: '1239',
      horarios: [
        {
          dia: 'Lu',
          horaInicio: '10:00',
          horaFin: '12:00',
          aula: 'LANG-101'
        },
        {
          dia: 'Mi',
          horaInicio: '10:00',
          horaFin: '12:00',
          aula: 'LANG-101'
        }
      ],
      estudiantes: 22,
      creditos: 2
    }
  ];

  useEffect(() => {
    const loadClases = async () => {
      setIsLoading(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filtrar clases por ciclo seleccionado
      const clasesDelCiclo = mockClases.filter(clase => 
        clase.ciclo === cicloSeleccionado
      );
      
      setClases(clasesDelCiclo);
      setIsLoading(false);
    };

    loadClases();
  }, [cicloSeleccionado]);

  return {
    clases,
    isLoading,
    cicloSeleccionado,
    setCicloSeleccionado
  };
}; 