import React from 'react';
import { FaFileAlt, FaCalendarAlt, FaBook, FaUser } from 'react-icons/fa';

export const AccionesRapidas: React.FC = () => {
  const acciones = [
    {
      title: 'Ver Mi CV',
      description: 'Actualiza tu currículum',
      icon: <FaFileAlt className="w-6 h-6" />,
      color: 'bg-blue-50 hover:bg-blue-100 text-blue-700',
      action: () => console.log('Ir a Mi CV')
    },
    {
      title: 'Mis Horarios',
      description: 'Consulta tu horario completo',
      icon: <FaCalendarAlt className="w-6 h-6" />,
      color: 'bg-green-50 hover:bg-green-100 text-green-700',
      action: () => console.log('Ir a Mis Horarios')
    },
    {
      title: 'Temarios',
      description: 'Revisa contenidos de clase',
      icon: <FaBook className="w-6 h-6" />,
      color: 'bg-purple-50 hover:bg-purple-100 text-purple-700',
      action: () => console.log('Ir a Temarios')
    },
    {
      title: 'Mi Perfil',
      description: 'Configura tu información',
      icon: <FaUser className="w-6 h-6" />,
      color: 'bg-orange-50 hover:bg-orange-100 text-orange-700',
      action: () => console.log('Ir a Mi Perfil')
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Acciones Rápidas</h2>
        <span className="text-sm text-gray-500">Accede a tus herramientas favoritas</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {acciones.map((accion, index) => (
          <button
            key={index}
            onClick={accion.action}
            className={`
              p-4 rounded-lg border border-gray-200 transition-all duration-200
              ${accion.color}
              hover:shadow-sm hover:scale-105
            `}
          >
            <div className="text-center">
              <div className="mb-2 flex justify-center">{accion.icon}</div>
              <h3 className="font-semibold text-sm mb-1">{accion.title}</h3>
              <p className="text-xs opacity-75">{accion.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}; 