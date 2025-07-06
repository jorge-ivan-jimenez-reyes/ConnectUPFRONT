// Rutas protegidas para administradores

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '../admin/components';
import { 
  MiEspacio, 
  Instituciones, 
  Facultades, 
  Academias, 
  Carreras, 
  Materias, 
  CicloAcademico, 
  Reportes, 
  Usuarios 
} from '../admin/views';

export const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        {/* Redirigir /admin a Mi Espacio */}
        <Route index element={<Navigate to="/admin/mi-espacio" replace />} />
        
        {/* Rutas específicas de admin */}
        <Route path="mi-espacio" element={<MiEspacio />} />
        <Route path="instituciones" element={<Instituciones />} />
        <Route path="facultades" element={<Facultades />} />
        <Route path="academias" element={<Academias />} />
        <Route path="carreras" element={<Carreras />} />
        <Route path="materias" element={<Materias />} />
        <Route path="ciclo-academico" element={<CicloAcademico />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="usuarios" element={<Usuarios />} />
        
        {/* Ruta por defecto - redirigir a Mi Espacio */}
        <Route path="*" element={<Navigate to="/admin/mi-espacio" replace />} />
      </Route>
    </Routes>
  );
}; 