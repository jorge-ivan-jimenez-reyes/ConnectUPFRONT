// Servicio API para usuarios/docentes

import { HttpClient } from '../../admin/services/apiService';
import { 
  User, 
  CVData, 
  UpdateUserDTO, 
  Education, 
  Experience, 
  Skill,
  IService,
  PaginatedResponse,
  FilterParams,
  PaginationParams
} from '../../shared/interfaces';

// Servicio específico para usuarios (Single Responsibility Principle)
export class UserService implements IService<User, any, UpdateUserDTO> {
  constructor(private httpClient: HttpClient) {}

  // Métodos básicos del CRUD
  async getAll(params?: FilterParams & PaginationParams): Promise<PaginatedResponse<User>> {
    const response = await this.httpClient.get<PaginatedResponse<User>>('/users', { params });
    return response.data!;
  }

  async getById(id: string): Promise<User> {
    const response = await this.httpClient.get<User>(`/users/${id}`);
    return response.data!;
  }

  async create(data: any): Promise<User> {
    const response = await this.httpClient.post<User>('/users', data);
    return response.data!;
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    const response = await this.httpClient.put<User>(`/users/${id}`, data);
    return response.data!;
  }

  async delete(id: string): Promise<void> {
    await this.httpClient.delete(`/users/${id}`);
  }

  // Métodos específicos para el perfil del usuario
  async getProfile(): Promise<User> {
    const response = await this.httpClient.get<User>('/users/profile');
    return response.data!;
  }

  async updateProfile(data: UpdateUserDTO): Promise<User> {
    const response = await this.httpClient.put<User>('/users/profile', data);
    return response.data!;
  }

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await this.httpClient.post<{ avatarUrl: string }>(
      '/users/profile/avatar', 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data!;
  }
}

// Servicio para gestión del CV (Single Responsibility Principle)
export class CVService {
  constructor(private httpClient: HttpClient) {}

  // CV completo
  async getCV(): Promise<CVData> {
    const response = await this.httpClient.get<CVData>('/users/cv');
    return response.data!;
  }

  async updateCV(data: Partial<CVData>): Promise<CVData> {
    const response = await this.httpClient.put<CVData>('/users/cv', data);
    return response.data!;
  }

  // Educación
  async getEducation(): Promise<Education[]> {
    const response = await this.httpClient.get<Education[]>('/users/cv/education');
    return response.data!;
  }

  async addEducation(data: Omit<Education, 'id'>): Promise<Education> {
    const response = await this.httpClient.post<Education>('/users/cv/education', data);
    return response.data!;
  }

  async updateEducation(id: string, data: Partial<Education>): Promise<Education> {
    const response = await this.httpClient.put<Education>(`/users/cv/education/${id}`, data);
    return response.data!;
  }

  async deleteEducation(id: string): Promise<void> {
    await this.httpClient.delete(`/users/cv/education/${id}`);
  }

  // Experiencia
  async getExperience(): Promise<Experience[]> {
    const response = await this.httpClient.get<Experience[]>('/users/cv/experience');
    return response.data!;
  }

  async addExperience(data: Omit<Experience, 'id'>): Promise<Experience> {
    const response = await this.httpClient.post<Experience>('/users/cv/experience', data);
    return response.data!;
  }

  async updateExperience(id: string, data: Partial<Experience>): Promise<Experience> {
    const response = await this.httpClient.put<Experience>(`/users/cv/experience/${id}`, data);
    return response.data!;
  }

  async deleteExperience(id: string): Promise<void> {
    await this.httpClient.delete(`/users/cv/experience/${id}`);
  }

  // Habilidades
  async getSkills(): Promise<Skill[]> {
    const response = await this.httpClient.get<Skill[]>('/users/cv/skills');
    return response.data!;
  }

  async addSkill(data: Omit<Skill, 'id'>): Promise<Skill> {
    const response = await this.httpClient.post<Skill>('/users/cv/skills', data);
    return response.data!;
  }

  async updateSkill(id: string, data: Partial<Skill>): Promise<Skill> {
    const response = await this.httpClient.put<Skill>(`/users/cv/skills/${id}`, data);
    return response.data!;
  }

  async deleteSkill(id: string): Promise<void> {
    await this.httpClient.delete(`/users/cv/skills/${id}`);
  }
}

// Factory para crear instancias de servicios (Factory Pattern)
export class UserServiceFactory {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  createUserService(): UserService {
    return new UserService(this.httpClient);
  }

  createCVService(): CVService {
    return new CVService(this.httpClient);
  }
}

// Instancias singleton de los servicios
const serviceFactory = new UserServiceFactory();
export const userService = serviceFactory.createUserService();
export const cvService = serviceFactory.createCVService(); 