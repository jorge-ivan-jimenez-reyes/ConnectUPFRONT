// Interfaces comunes para toda la aplicación

// Base Entity Interface (DRY principle)
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  meta?: {
    total?: number;
    page?: number;
    pageSize?: number;
    totalPages?: number;
  };
}

// Error Interface
export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: any;
}

// Pagination Interface
export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

// Filter Interface
export interface FilterParams {
  [key: string]: any;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

// Form State Interface
export interface FormState<T> {
  data: T;
  errors: Record<keyof T, string>;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
}

// Loading State Interface
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

// Generic Repository Interface (Interface Segregation Principle)
export interface IRepository<T, CreateDTO, UpdateDTO> {
  getAll(params?: FilterParams & PaginationParams): Promise<PaginatedResponse<T>>;
  getById(id: string): Promise<T>;
  create(data: CreateDTO): Promise<T>;
  update(id: string, data: UpdateDTO): Promise<T>;
  delete(id: string): Promise<void>;
}

// Generic Service Interface (Dependency Inversion Principle)
export interface IService<T, CreateDTO, UpdateDTO> {
  getAll(params?: FilterParams & PaginationParams): Promise<PaginatedResponse<T>>;
  getById(id: string): Promise<T>;
  create(data: CreateDTO): Promise<T>;
  update(id: string, data: UpdateDTO): Promise<T>;
  delete(id: string): Promise<void>;
}

// HTTP Client Interface (Dependency Inversion Principle)
export interface IHttpClient {
  get<T>(url: string, config?: any): Promise<ApiResponse<T>>;
  post<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>>;
  put<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>>;
  patch<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>>;
  delete<T>(url: string, config?: any): Promise<ApiResponse<T>>;
}

// Storage Interface (Interface Segregation Principle)
export interface IStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

// Event Bus Interface (Observer Pattern)
export interface IEventBus {
  emit(event: string, data?: any): void;
  on(event: string, callback: (data: any) => void): void;
  off(event: string, callback: (data: any) => void): void;
}

// Validation Interface
export interface IValidator<T> {
  validate(data: T): ValidationResult;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Component Props Base Interface
export interface BaseComponentProps {
  className?: string;
  testId?: string;
  children?: React.ReactNode;
} 