// Contrato del repositorio de Temarios - Preparado para implementación con API

import { 
  Materia, 
  TemarioDetalle, 
  PreferenciaClases, 
  Academia,
  CreatePreferenciaDTO,
  UpdatePreferenciaDTO,
  TemarioFilterDTO,
  EstadoMateria
} from '../interfaces/temario.interfaces';

export interface ITemarioRepository {
  // Academias
  getAcademias(): Promise<Academia[]>;
  getAcademiaById(id: string): Promise<Academia | null>;
  
  // Materias
  getMateriasByAcademia(academiaId: string): Promise<Materia[]>;
  getMateriaById(id: string): Promise<Materia | null>;
  updateMateriaEstado(materiaId: string, estado: EstadoMateria): Promise<void>;
  
  // Temarios
  getTemarioByMateria(materiaId: string): Promise<TemarioDetalle | null>;
  getTemariosByFilter(filter: TemarioFilterDTO): Promise<TemarioDetalle[]>;
  
  // Preferencias
  getPreferenciasUsuario(usuarioId: string): Promise<PreferenciaClases[]>;
  createPreferencia(usuarioId: string, data: CreatePreferenciaDTO): Promise<PreferenciaClases>;
  updatePreferencia(preferenciaId: string, data: UpdatePreferenciaDTO): Promise<PreferenciaClases>;
  deletePreferencia(preferenciaId: string): Promise<void>;
  
  // Búsqueda
  searchMaterias(query: string, academiaId?: string): Promise<Materia[]>;
  searchTemarios(query: string): Promise<TemarioDetalle[]>;
}

// Implementación Mock para desarrollo (se reemplazará por implementación real con API)
export class MockTemarioRepository implements ITemarioRepository {
  private academias: Academia[] = [];
  private materias: Materia[] = [];
  private temarios: TemarioDetalle[] = [];
  private preferencias: PreferenciaClases[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock data se inicializará en el servicio
  }

  async getAcademias(): Promise<Academia[]> {
    return this.academias;
  }

  async getAcademiaById(id: string): Promise<Academia | null> {
    return this.academias.find(a => a.id === id) || null;
  }

  async getMateriasByAcademia(academiaId: string): Promise<Materia[]> {
    return this.materias.filter(m => m.academia === academiaId);
  }

  async getMateriaById(id: string): Promise<Materia | null> {
    return this.materias.find(m => m.id === id) || null;
  }

  async updateMateriaEstado(materiaId: string, estado: EstadoMateria): Promise<void> {
    const materia = this.materias.find(m => m.id === materiaId);
    if (materia) {
      materia.estado = estado;
    }
  }

  async getTemarioByMateria(materiaId: string): Promise<TemarioDetalle | null> {
    return this.temarios.find(t => t.materiaId === materiaId) || null;
  }

  async getTemariosByFilter(filter: TemarioFilterDTO): Promise<TemarioDetalle[]> {
    let result = [...this.temarios];
    
    if (filter.materia) {
      result = result.filter(t => t.materiaId === filter.materia);
    }
    
    if (filter.busqueda) {
      const query = filter.busqueda.toLowerCase();
      result = result.filter(t => 
        t.denominacion.toLowerCase().includes(query) ||
        t.clave.toLowerCase().includes(query)
      );
    }
    
    return result;
  }

  async getPreferenciasUsuario(usuarioId: string): Promise<PreferenciaClases[]> {
    return this.preferencias.filter(p => p.usuarioId === usuarioId);
  }

  async createPreferencia(usuarioId: string, data: CreatePreferenciaDTO): Promise<PreferenciaClases> {
    const preferencia: PreferenciaClases = {
      id: Date.now().toString(),
      usuarioId,
      academia: data.academia,
      materiasSeleccionadas: data.materiasSeleccionadas,
      fechaSeleccion: new Date().toISOString(),
      activo: true
    };
    
    this.preferencias.push(preferencia);
    return preferencia;
  }

  async updatePreferencia(preferenciaId: string, data: UpdatePreferenciaDTO): Promise<PreferenciaClases> {
    const index = this.preferencias.findIndex(p => p.id === preferenciaId);
    if (index === -1) {
      throw new Error('Preferencia no encontrada');
    }
    
    this.preferencias[index] = {
      ...this.preferencias[index],
      ...data
    };
    
    return this.preferencias[index];
  }

  async deletePreferencia(preferenciaId: string): Promise<void> {
    const index = this.preferencias.findIndex(p => p.id === preferenciaId);
    if (index !== -1) {
      this.preferencias.splice(index, 1);
    }
  }

  async searchMaterias(query: string, academiaId?: string): Promise<Materia[]> {
    let result = [...this.materias];
    
    if (academiaId) {
      result = result.filter(m => m.academia === academiaId);
    }
    
    const searchQuery = query.toLowerCase();
    return result.filter(m => 
      m.nombre.toLowerCase().includes(searchQuery) ||
      m.descripcion.toLowerCase().includes(searchQuery) ||
      (m.codigo && m.codigo.toLowerCase().includes(searchQuery))
    );
  }

  async searchTemarios(query: string): Promise<TemarioDetalle[]> {
    const searchQuery = query.toLowerCase();
    return this.temarios.filter(t => 
      t.denominacion.toLowerCase().includes(searchQuery) ||
      t.clave.toLowerCase().includes(searchQuery) ||
      t.finesAprendizaje.toLowerCase().includes(searchQuery)
    );
  }

  // Métodos para inicializar mock data (usar en servicio)
  setMockData(academias: Academia[], materias: Materia[], temarios: TemarioDetalle[]) {
    this.academias = academias;
    this.materias = materias;
    this.temarios = temarios;
  }
} 