// Componente para rutas protegidas

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context';
import { UserRole } from '../../interfaces';
import { ROUTES } from '../../config';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
  redirectTo = ROUTES.LANDING,
  requireAuth = true,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Cargando...</div>
      </div>
    );
  }

  // Si requiere autenticación y no está autenticado, redirigir
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Si está autenticado pero no tiene el rol necesario, redirigir
  if (
    isAuthenticated &&
    user &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    const defaultRedirect = user.role === 'admin' 
      ? ROUTES.ADMIN.DASHBOARD 
      : ROUTES.USER.DASHBOARD;
    
    return <Navigate to={defaultRedirect} replace />;
  }

  // Si todo está bien, mostrar el componente
  return <>{children}</>;
}; 