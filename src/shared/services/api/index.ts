/**
 * Índice de servicios de API
 */

export { institutionService } from './institutionService';
export { facultyService } from './facultyService';
export { academyService } from './academyService';
export { programService } from './programService';
export { cycleService } from './cycleService';
export { courseService, courseInfoService } from './courseService';
export { availabilityService } from './availabilityService';
export type { AvailabilitySlotAPI, AvailabilityInput, SlotInput } from './availabilityService';
export { notificationService } from './notificationService';
export type { NotificationAPI, NotificationInput } from './notificationService';
export { userService } from './userService';
export type { 
  UserListAPI, 
  UserDetailAPI, 
  UpdateUserInput, 
  CreateUserInput,
  UserPermissionsAPI,
  UserListFilters,
  RoleAPI,
} from './userService';
