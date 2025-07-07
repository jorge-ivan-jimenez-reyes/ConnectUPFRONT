// Interfaces para autenticación y autorización

import { BaseEntity } from './common.interfaces';

// User Interfaces
export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: Date;
  avatar?: string;
}

export interface Admin extends User {
  role: 'admin';
  permissions: Permission[];
  institutionId?: string;
}

export interface Docente extends User {
  role: 'user' | 'docente';
  institutionId: string;
  department?: string;
  specialization?: string;
  cvData?: CVData;
}

// Role and Permission Interfaces
export type UserRole = 'admin' | 'user' | 'docente';

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
}

// CV Data Interface
export interface CVData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  publications?: Publication[];
  awards?: Award[];
}

export interface PersonalInfo {
  phone?: string;
  address?: string;
  linkedin?: string;
  website?: string;
  biography?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  isActive: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  isActive: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}

export interface Publication {
  id: string;
  title: string;
  journal: string;
  year: number;
  authors: string[];
  doi?: string;
  url?: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: number;
  description?: string;
}

// Authentication DTOs
export interface LoginDTO {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterAdminDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  institutionName?: string;
}

export interface RegisterUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  institutionId: string;
  department?: string;
  specialization?: string;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  department?: string;
  specialization?: string;
  avatar?: string;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Authentication Response
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// Auth Context Interface
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginDTO) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterAdminDTO | RegisterUserDTO, type: 'admin' | 'user') => Promise<void>;
  updateUser: (data: UpdateUserDTO) => Promise<void>;
  changePassword: (data: ChangePasswordDTO) => Promise<void>;
  refreshToken: () => Promise<void>;
}

// Auth Service Interface
export interface IAuthService {
  login(credentials: LoginDTO): Promise<AuthResponse>;
  register(data: RegisterAdminDTO | RegisterUserDTO, type: 'admin' | 'user'): Promise<AuthResponse>;
  logout(): Promise<void>;
  refreshToken(): Promise<AuthResponse>;
  getCurrentUser(): Promise<User>;
  updateUser(data: UpdateUserDTO): Promise<User>;
  changePassword(data: ChangePasswordDTO): Promise<void>;
} 