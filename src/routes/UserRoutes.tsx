// Rutas del área de usuarios/docentes

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserLayout } from '../user/components/Layout/UserLayout';
import { 
  MiEspacio, 
  MisClases, 
  Temarios, 
  MisHorarios, 
  MiCV,
  MiPerfil 
} from '../user/views';

export const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Navigate to="/user/mi-espacio" replace />} />
        <Route path="mi-espacio" element={<MiEspacio />} />
        <Route path="mis-clases" element={<MisClases />} />
        <Route path="temarios" element={<Temarios />} />
        <Route path="mis-horarios" element={<MisHorarios />} />
        <Route path="mi-cv" element={<MiCV />} />
        <Route path="mi-perfil" element={<MiPerfil />} />
      </Route>
    </Routes>
  );
}; 