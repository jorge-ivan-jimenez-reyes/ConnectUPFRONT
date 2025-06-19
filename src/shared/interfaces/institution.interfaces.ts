// Interfaces para instituciones

import { BaseEntity } from './common.interfaces';

export interface Institution extends BaseEntity {
  name: string;
  code: string;
  type: InstitutionType;
  country: string;
  state?: string;
  city: string;
  address?: string;
  website?: string;
  email?: string;
  phone?: string;
  description?: string;
  isActive: boolean;
  logo?: string;
  departments: Department[];
  adminId?: string;
}

export type InstitutionType = 'university' | 'institute' | 'college' | 'school' | 'research_center';

export interface Department extends BaseEntity {
  name: string;
  code: string;
  institutionId: string;
  description?: string;
  headOfDepartment?: string;
  isActive: boolean;
}

// DTOs
export interface CreateInstitutionDTO {
  name: string;
  code: string;
  type: InstitutionType;
  country: string;
  state?: string;
  city: string;
  address?: string;
  website?: string;
  email?: string;
  phone?: string;
  description?: string;
  logo?: string;
}

export interface UpdateInstitutionDTO {
  name?: string;
  code?: string;
  type?: InstitutionType;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  website?: string;
  email?: string;
  phone?: string;
  description?: string;
  logo?: string;
  isActive?: boolean;
}

export interface CreateDepartmentDTO {
  name: string;
  code: string;
  institutionId: string;
  description?: string;
  headOfDepartment?: string;
}

export interface UpdateDepartmentDTO {
  name?: string;
  code?: string;
  description?: string;
  headOfDepartment?: string;
  isActive?: boolean;
}

// Service Interfaces
export interface IInstitutionService {
  getAll(params?: any): Promise<any>;
  getById(id: string): Promise<Institution>;
  create(data: CreateInstitutionDTO): Promise<Institution>;
  update(id: string, data: UpdateInstitutionDTO): Promise<Institution>;
  delete(id: string): Promise<void>;
  getDepartments(institutionId: string): Promise<Department[]>;
  addDepartment(institutionId: string, data: CreateDepartmentDTO): Promise<Department>;
  updateDepartment(institutionId: string, departmentId: string, data: UpdateDepartmentDTO): Promise<Department>;
  deleteDepartment(institutionId: string, departmentId: string): Promise<void>;
} 