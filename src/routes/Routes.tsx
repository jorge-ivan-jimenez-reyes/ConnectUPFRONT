// Router principal de la aplicación

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../shared/context';
import { ProtectedRoute } from '../shared/components';
import { ROUTES } from '../shared/config';

// Importar componentes de vistas (se crearán después)
import { Landing } from '../views/Landing';
import { LoginAdmin } from '../views/loginAdmin';
import { LoginUser } from '../views/loginUser';
import { RegisterAdmin } from '../views/registerAdmin';
import { RegisterUser } from '../views/registerUser';

// Importar rutas específicas
import { AdminRoutes } from './AdminRoutes';
import { UserRoutes } from './UserRoutes';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path={ROUTES.HOME} element={<Landing />} />
          <Route path={ROUTES.LOGIN_ADMIN} element={<LoginAdmin />} />
          <Route path={ROUTES.LOGIN_USER} element={<LoginUser />} />
          <Route path={ROUTES.REGISTER_ADMIN} element={<RegisterAdmin />} />
          <Route path={ROUTES.REGISTER_USER} element={<RegisterUser />} />

          {/* Rutas de administrador */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminRoutes />
              </ProtectedRoute>
            }
          />

          {/* Rutas de usuario */}
          <Route
            path="/user/*"
            element={
              <ProtectedRoute allowedRoles={['user', 'docente']}>
                <UserRoutes />
              </ProtectedRoute>
            }
          />

          {/* Ruta de fallback */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}; 