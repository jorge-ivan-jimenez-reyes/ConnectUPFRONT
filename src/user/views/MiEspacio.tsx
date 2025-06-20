// Vista Mi Espacio para usuarios/docentes

import React from 'react';
import { HorarioClases } from '../components/HorarioClases/HorarioClases';
import { BannerPromocional } from '../components/BannerPromocional/BannerPromocional';
import { StatsCards } from '../components/StatsCards/StatsCards';
import { AccionesRapidas } from '../components/AccionesRapidas/AccionesRapidas';

export const MiEspacio: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header con bienvenida */}
      <div className="bg-gradient-to-br from-brand-primary to-[#8B2635] rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">¡Bienvenido de vuelta!</h1>
        <p className="text-white/80">Aquí tienes un resumen de tu día académico</p>
      </div>

      {/* Estadísticas rápidas */}
      <StatsCards />

      {/* Layout principal: Horario + Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Horario de clases (lado izquierdo) */}
        <div className="lg:col-span-3">
          <HorarioClases />
        </div>

        {/* Banner promocional (lado derecho) */}
        <div className="lg:col-span-2">
          <BannerPromocional />
        </div>
      </div>

      {/* Acciones rápidas */}
      <AccionesRapidas />
    </div>
  );
}; 