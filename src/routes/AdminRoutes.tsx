// Rutas para administradores autenticados

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminDashboard } from '../admin/views/Dashboard';
import { ROUTES } from '../shared/config';

export const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Redirección por defecto al dashboard */}
      <Route path="/" element={<Navigate to={ROUTES.ADMIN.DASHBOARD} replace />} />
      
      {/* Dashboard principal */}
      <Route path="/dashboard" element={<AdminDashboard />} />
      
      {/* Gestión de Instituciones */}
      <Route 
        path="/instituciones" 
        element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Instituciones</h2>
              <p className="text-gray-600">En construcción...</p>
            </div>
          </div>
        } 
      />
      
      {/* Gestión de Usuarios */}
      <Route 
        path="/usuarios" 
        element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Usuarios</h2>
              <p className="text-gray-600">En construcción...</p>
            </div>
          </div>
        } 
      />
      
      {/* Reportes */}
      <Route 
        path="/reportes" 
        element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reportes y Estadísticas</h2>
              <p className="text-gray-600">En construcción...</p>
            </div>
          </div>
        } 
      />
      
      {/* Configuración */}
      <Route 
        path="/configuracion" 
        element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuración del Sistema</h2>
              <p className="text-gray-600">En construcción...</p>
            </div>
          </div>
        } 
      />
      
      {/* Ruta catch-all para rutas no encontradas */}
      <Route path="*" element={<Navigate to={ROUTES.ADMIN.DASHBOARD} replace />} />
    </Routes>
  );
}; 