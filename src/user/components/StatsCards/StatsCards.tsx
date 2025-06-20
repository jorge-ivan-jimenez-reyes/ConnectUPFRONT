import React from 'react';
import { useHorarioClases } from '../../hooks/useHorarioClases';
import { FaCalendarDay, FaBook, FaClock, FaCheckCircle } from 'react-icons/fa';

export const StatsCards: React.FC = () => {
  const { estadisticas, proximaClase } = useHorarioClases();

  const stats = [
    {
      title: 'Clases Hoy',
      value: estadisticas?.clasesHoy || 0,
      icon: <FaCalendarDay className="w-5 h-5 text-blue-600" />,
      color: 'bg-blue-50 text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Materias',
      value: estadisticas?.totalClases || 0,
      icon: <FaBook className="w-5 h-5 text-green-600" />,
      color: 'bg-green-50 text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Próxima Clase',
      value: proximaClase?.horaInicio || 'Sin clases',
      icon: <FaClock className="w-5 h-5 text-purple-600" />,
      color: 'bg-purple-50 text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Completadas',
      value: estadisticas?.clasesCompletadas || 0,
      icon: <FaCheckCircle className="w-5 h-5 text-orange-600" />,
      color: 'bg-orange-50 text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
              {stat.icon}
            </div>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600">
              {stat.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}; 