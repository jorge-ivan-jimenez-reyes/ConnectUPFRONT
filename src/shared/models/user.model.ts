// Modelo de usuario con validaciones y métodos

import { User, UserRole, CVData } from '../interfaces';

export class UserModel implements User {
  public id: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public role: UserRole;
  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public lastLogin?: Date;
  public avatar?: string;

  constructor(data: User) {
    this.id = data.id;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.role = data.role;
    this.isActive = data.isActive;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.lastLogin = data.lastLogin;
    this.avatar = data.avatar;
  }

  // Computed properties
  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public get initials(): string {
    return `${this.firstName.charAt(0)}${this.lastName.charAt(0)}`.toUpperCase();
  }

  public get isAdmin(): boolean {
    return this.role === 'admin';
  }

  public get isUser(): boolean {
    return this.role === 'user' || this.role === 'docente';
  }

  public get isOnline(): boolean {
    if (!this.lastLogin) return false;
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return this.lastLogin > fiveMinutesAgo;
  }

  // Validation methods
  public validateEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  public validateName(): boolean {
    return this.firstName.length >= 2 && this.lastName.length >= 2;
  }

  // Business logic methods
  public updateLastLogin(): void {
    this.lastLogin = new Date();
    this.updatedAt = new Date();
  }

  public activate(): void {
    this.isActive = true;
    this.updatedAt = new Date();
  }

  public deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  // Serialization methods
  public toJSON(): User {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      lastLogin: this.lastLogin,
      avatar: this.avatar,
    };
  }

  public toPublicJSON(): Partial<User> {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      avatar: this.avatar,
    };
  }

  // Factory methods
  public static fromApiResponse(data: any): UserModel {
    return new UserModel({
      id: data.id,
      email: data.email,
      firstName: data.firstName || data.first_name,
      lastName: data.lastName || data.last_name,
      role: data.role,
      isActive: data.isActive ?? data.is_active ?? true,
      createdAt: new Date(data.createdAt || data.created_at),
      updatedAt: new Date(data.updatedAt || data.updated_at),
      lastLogin: data.lastLogin ? new Date(data.lastLogin) : undefined,
      avatar: data.avatar,
    });
  }

  public static createEmpty(): UserModel {
    return new UserModel({
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      role: 'user',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
} 