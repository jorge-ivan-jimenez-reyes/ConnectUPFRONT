// Rutas para usuarios/docentes autenticados

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserDashboard } from '../user/views/Dashboard';
import { ROUTES } from '../shared/config';

export const UserRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Redirección por defecto al dashboard */}
      <Route path="/" element={<Navigate to={ROUTES.USER.DASHBOARD} replace />} />
      
      {/* Dashboard principal */}
      <Route path="/dashboard" element={<UserDashboard />} />
      
      {/* Mi CV */}
      <Route 
        path="/mi-cv" 
        element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mi CV</h2>
              <p className="text-gray-600">En construcción...</p>
            </div>
          </div>
        } 
      />
      
      {/* Mis Clases */}
      <Route 
        path="/mis-clases" 
        element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mis Clases</h2>
              <p className="text-gray-600">En construcción...</p>
            </div>
          </div>
        } 
      />
      
      {/* Mi Espacio */}
      <Route 
        path="/mi-espacio" 
        element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mi Espacio</h2>
              <p className="text-gray-600">En construcción...</p>
            </div>
          </div>
        } 
      />
      
      {/* Perfil */}
      <Route 
        path="/perfil" 
        element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mi Perfil</h2>
              <p className="text-gray-600">En construcción...</p>
            </div>
          </div>
        } 
      />
      
      {/* Ruta catch-all para rutas no encontradas */}
      <Route path="*" element={<Navigate to={ROUTES.USER.DASHBOARD} replace />} />
    </Routes>
  );
}; 