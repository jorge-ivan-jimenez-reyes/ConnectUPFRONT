// Servicio de Temarios con lógica de negocio

import { 
  ITemarioRepository, 
  MockTemarioRepository 
} from '../repositories/TemarioRepository';
import { 
  Academia, 
  Materia, 
  TemarioDetalle, 
  EstadoMateria,
  CreatePreferenciaDTO,
  UpdatePreferenciaDTO,
  ContenidoTematico,
  TipoEvaluacion,
  TipoBibliografia
} from '../interfaces/temario.interfaces';

export class TemarioService {
  constructor(private repository: ITemarioRepository = new MockTemarioRepository()) {
    this.initializeMockData();
  }

  private initializeMockData() {
    const academias: Academia[] = [
      {
        id: 'comping',
        nombre: 'COMPING',
        descripcion: 'Academia de Computación e Ingeniería',
        materias: [],
        activa: true
      },
      {
        id: 'empresariales',
        nombre: 'EMPRESARIALES',
        descripcion: 'Academia de Ciencias Empresariales',
        materias: [],
        activa: true
      }
    ];

    const materias: Materia[] = [
      {
        id: '1',
        nombre: 'Teoría de compiladores',
        descripcion: 'Fundamentos de compiladores y análisis léxico',
        icono: 'code',
        color: 'bg-blue-500',
        academia: 'comping',
        estado: EstadoMateria.DISPONIBLE,
        codigo: 'COMP401',
        creditos: 4
      },
      {
        id: '2',
        nombre: 'Programación Avanzada',
        descripcion: 'Técnicas avanzadas de programación',
        icono: 'laptop-code',
        color: 'bg-red-500',
        academia: 'comping',
        estado: EstadoMateria.AÑADIDA,
        codigo: 'PROG301',
        creditos: 4
      },
      {
        id: '3',
        nombre: 'Algoritmos',
        descripcion: 'Estructuras de datos y algoritmos',
        icono: 'terminal',
        color: 'bg-purple-500',
        academia: 'comping',
        estado: EstadoMateria.AÑADIDA,
        codigo: 'ALG201',
        creditos: 3
      },
      {
        id: '4',
        nombre: 'Intro a Base de datos',
        descripcion: 'Fundamentos de bases de datos relacionales',
        icono: 'database',
        color: 'bg-green-500',
        academia: 'comping',
        estado: EstadoMateria.AÑADIDA,
        codigo: 'DB101',
        creditos: 3
      },
      {
        id: '5',
        nombre: 'Telematica',
        descripcion: 'Redes y telecomunicaciones',
        icono: 'network-wired',
        color: 'bg-orange-500',
        academia: 'comping',
        estado: EstadoMateria.DISPONIBLE,
        codigo: 'TEL301',
        creditos: 3
      },
      {
        id: '6',
        nombre: 'DAC',
        descripcion: 'Diseño asistido por computadora',
        icono: 'palette',
        color: 'bg-pink-500',
        academia: 'comping',
        estado: EstadoMateria.DISPONIBLE,
        codigo: 'DAC201',
        creditos: 2
      }
    ];

    const temarios: TemarioDetalle[] = [
      {
        id: 'temario-1',
        materiaId: '2',
        denominacion: 'Programación Avanzada',
        clave: 'PROG301',
        cicloEscolar: 'Bloque disciplinario profesional',
        bloque: 'Fines de aprendizaje y formación',
        finesAprendizaje: 'Conocerá técnicas avanzadas de programación, incluyendo paradigmas modernos, patrones de diseño y optimización de código. Desarrollará habilidades para crear aplicaciones eficientes y mantenibles.',
        contenidoTematico: [
          {
            id: 'contenido-1',
            numero: 1,
            titulo: 'INTRODUCCIÓN A LOS MOTORES DE VIDEOJUEGOS',
            subtemas: [
              {
                id: 'subtema-1-1',
                numero: '1.1',
                titulo: 'Concepto de motor de videojuego',
                descripcion: 'Definición y características principales'
              },
              {
                id: 'subtema-1-2',
                numero: '1.2',
                titulo: 'Historia de los motores de videojuegos',
                descripcion: 'Evolución histórica y tendencias'
              },
              {
                id: 'subtema-1-3',
                numero: '1.3',
                titulo: 'Características generales de los motores de videojuegos',
                descripcion: 'Funcionalidades principales y capacidades'
              },
              {
                id: 'subtema-1-4',
                numero: '1.4',
                titulo: 'Panorama general de motores de videojuegos actuales',
                descripcion: 'Comparativa de motores modernos'
              },
              {
                id: 'subtema-1-5',
                numero: '1.5',
                titulo: 'Diferencias de los motores de videojuegos entre géneros',
                descripcion: 'Especializaciones por tipo de juego'
              }
            ]
          },
          {
            id: 'contenido-2',
            numero: 2,
            titulo: 'DESARROLLO DE EJEMPLOS DE VIDEOJUEGOS',
            subtemas: [
              {
                id: 'subtema-2-1',
                numero: '2.1',
                titulo: 'Desarrollo de un juego de acción en primera persona (FPS) con Uneal Engine',
                descripcion: 'Proyecto práctico con Unreal Engine'
              },
              {
                id: 'subtema-2-2',
                numero: '2.2',
                titulo: 'Desarrollo de un juego 2D con Unity',
                descripcion: 'Creación de juego 2D usando Unity'
              },
              {
                id: 'subtema-2-3',
                numero: '2.3',
                titulo: 'Desarrollo de un juego móvil',
                descripcion: 'Adaptación para plataformas móviles'
              }
            ]
          }
        ],
        objetivos: [
          'Conocer los diferentes tipos de motores de videojuegos',
          'Evaluar las ventajas y desventajas de cada motor',
          'Desarrollar videojuegos usando diferentes motores',
          'Optimizar el rendimiento según la plataforma objetivo'
        ],
        metodologia: [
          'Clases teóricas sobre conceptos fundamentales',
          'Talleres prácticos de desarrollo',
          'Proyectos individuales y grupales',
          'Análisis de casos de estudio'
        ],
        evaluacion: [
          {
            id: 'eval-1',
            tipo: TipoEvaluacion.PROYECTO,
            descripcion: 'Proyecto final de videojuego',
            porcentaje: 40
          },
          {
            id: 'eval-2',
            tipo: TipoEvaluacion.EXAMEN,
            descripcion: 'Exámenes parciales',
            porcentaje: 30
          },
          {
            id: 'eval-3',
            tipo: TipoEvaluacion.TAREA,
            descripcion: 'Tareas y ejercicios',
            porcentaje: 20
          },
          {
            id: 'eval-4',
            tipo: TipoEvaluacion.PARTICIPACION,
            descripcion: 'Participación en clase',
            porcentaje: 10
          }
        ],
        bibliografia: [
          {
            id: 'bib-1',
            tipo: TipoBibliografia.LIBRO,
            autor: 'Jason Gregory',
            titulo: 'Game Engine Architecture',
            editorial: 'CRC Press',
            año: 2019,
            isbn: '978-1138035454'
          },
          {
            id: 'bib-2',
            tipo: TipoBibliografia.WEB,
            autor: 'Unity Technologies',
            titulo: 'Unity Documentation',
            url: 'https://docs.unity3d.com/'
          },
          {
            id: 'bib-3',
            tipo: TipoBibliografia.WEB,
            autor: 'Epic Games',
            titulo: 'Unreal Engine Documentation',
            url: 'https://docs.unrealengine.com/'
          }
        ],
        profesor: 'Dr. Carlos Martínez',
        fechaActualizacion: '2024-01-15'
      },
      {
        id: 'temario-2',
        materiaId: '1',
        denominacion: 'Teoría de Compiladores',
        clave: 'COMP401',
        cicloEscolar: 'Bloque disciplinario profesional',
        bloque: 'Fines de aprendizaje y formación',
        finesAprendizaje: 'Comprenderá los principios fundamentales de la compilación, incluyendo análisis léxico, sintáctico y semántico. Desarrollará habilidades para diseñar e implementar compiladores básicos.',
        contenidoTematico: [
          {
            id: 'contenido-1',
            numero: 1,
            titulo: 'INTRODUCCIÓN A LOS COMPILADORES',
            subtemas: [
              {
                id: 'subtema-1-1',
                numero: '1.1',
                titulo: 'Conceptos básicos de compilación',
                descripcion: 'Definición y proceso de compilación'
              },
              {
                id: 'subtema-1-2',
                numero: '1.2',
                titulo: 'Fases del proceso de compilación',
                descripcion: 'Análisis léxico, sintáctico y semántico'
              }
            ]
          }
        ],
        objetivos: [
          'Entender el proceso de compilación',
          'Implementar analizadores léxicos y sintácticos'
        ],
        metodologia: [
          'Clases teóricas',
          'Proyectos prácticos'
        ],
        evaluacion: [
          {
            id: 'eval-1',
            tipo: TipoEvaluacion.PROYECTO,
            descripcion: 'Compilador final',
            porcentaje: 50
          },
          {
            id: 'eval-2',
            tipo: TipoEvaluacion.EXAMEN,
            descripcion: 'Exámenes parciales',
            porcentaje: 50
          }
        ],
        bibliografia: [
          {
            id: 'bib-1',
            tipo: TipoBibliografia.LIBRO,
            autor: 'Alfred V. Aho',
            titulo: 'Compilers: Principles, Techniques, and Tools',
            editorial: 'Pearson',
            año: 2006,
            isbn: '978-0321486813'
          }
        ],
        profesor: 'Dr. Ana García',
        fechaActualizacion: '2024-01-15'
      },
      {
        id: 'temario-3',
        materiaId: '3',
        denominacion: 'Algoritmos',
        clave: 'ALG201',
        cicloEscolar: 'Bloque disciplinario profesional',
        bloque: 'Fines de aprendizaje y formación',
        finesAprendizaje: 'Dominará estructuras de datos fundamentales y algoritmos eficientes. Desarrollará habilidades para analizar la complejidad temporal y espacial de algoritmos.',
        contenidoTematico: [
          {
            id: 'contenido-1',
            numero: 1,
            titulo: 'ESTRUCTURAS DE DATOS BÁSICAS',
            subtemas: [
              {
                id: 'subtema-1-1',
                numero: '1.1',
                titulo: 'Arrays y listas enlazadas',
                descripcion: 'Implementación y operaciones básicas'
              },
              {
                id: 'subtema-1-2',
                numero: '1.2',
                titulo: 'Pilas y colas',
                descripcion: 'Estructuras LIFO y FIFO'
              }
            ]
          }
        ],
        objetivos: [
          'Implementar estructuras de datos eficientes',
          'Analizar complejidad algorítmica'
        ],
        metodologia: [
          'Clases teóricas',
          'Laboratorios prácticos'
        ],
        evaluacion: [
          {
            id: 'eval-1',
            tipo: TipoEvaluacion.PROYECTO,
            descripcion: 'Proyecto de algoritmos',
            porcentaje: 40
          },
          {
            id: 'eval-2',
            tipo: TipoEvaluacion.EXAMEN,
            descripcion: 'Exámenes',
            porcentaje: 60
          }
        ],
        bibliografia: [
          {
            id: 'bib-1',
            tipo: TipoBibliografia.LIBRO,
            autor: 'Thomas H. Cormen',
            titulo: 'Introduction to Algorithms',
            editorial: 'MIT Press',
            año: 2009,
            isbn: '978-0262033848'
          }
        ],
        profesor: 'Dr. Luis Martínez',
        fechaActualizacion: '2024-01-15'
      }
    ];

    // Inicializar datos mock en el repositorio
    if (this.repository instanceof MockTemarioRepository) {
      this.repository.setMockData(academias, materias, temarios);
    }
  }

  // Métodos de Academia
  async getAcademias() {
    try {
      return await this.repository.getAcademias();
    } catch (error) {
      throw new Error('Error al obtener academias');
    }
  }

  // Métodos de Materias
  async getMateriasByAcademia(academiaId: string) {
    try {
      return await this.repository.getMateriasByAcademia(academiaId);
    } catch (error) {
      throw new Error('Error al obtener materias');
    }
  }

  async toggleMateriaEstado(materiaId: string) {
    try {
      console.log('🔧 Servicio - Toggleando estado para materia:', materiaId);
      const materia = await this.repository.getMateriaById(materiaId);
      console.log('🔍 Servicio - Materia encontrada:', materia);
      
      if (!materia) {
        throw new Error('Materia no encontrada');
      }

      // Lógica simplificada: toggle entre DISPONIBLE y AÑADIDA
      const nuevoEstado = materia.estado === EstadoMateria.AÑADIDA 
        ? EstadoMateria.DISPONIBLE 
        : EstadoMateria.AÑADIDA;

      console.log('🔄 Servicio - Cambiando de', materia.estado, 'a', nuevoEstado);

      await this.repository.updateMateriaEstado(materiaId, nuevoEstado);
      
      const materiaActualizada = await this.repository.getMateriaById(materiaId);
      console.log('✅ Servicio - Materia actualizada:', materiaActualizada);
      return materiaActualizada;
    } catch (error) {
      console.error('❌ Servicio - Error al actualizar estado:', error);
      throw new Error('Error al actualizar estado de materia');
    }
  }

  // Métodos de Temarios
  async getTemarioByMateria(materiaId: string) {
    try {
      console.log('🔧 Servicio - Buscando temario para materia:', materiaId);
      const temario = await this.repository.getTemarioByMateria(materiaId);
      console.log('📋 Servicio - Temario encontrado:', temario);
      return temario;
    } catch (error) {
      console.error('❌ Servicio - Error al obtener temario:', error);
      throw new Error('Error al obtener temario');
    }
  }

  // Métodos de Preferencias
  async guardarPreferencias(usuarioId: string, academia: string, materiasSeleccionadas: string[]) {
    try {
      const data: CreatePreferenciaDTO = {
        academia,
        materiasSeleccionadas
      };
      
      return await this.repository.createPreferencia(usuarioId, data);
    } catch (error) {
      throw new Error('Error al guardar preferencias');
    }
  }

  async getPreferenciasUsuario(usuarioId: string) {
    try {
      return await this.repository.getPreferenciasUsuario(usuarioId);
    } catch (error) {
      throw new Error('Error al obtener preferencias');
    }
  }
} 