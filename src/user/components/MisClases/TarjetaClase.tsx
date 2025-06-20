import React from 'react';
import { ClaseDetalle } from '../../interfaces/clase.interfaces';
import { 
  FaCalculator, 
  FaLaptopCode, 
  FaAtom, 
  FaFlask, 
  FaBook, 
  FaBookOpen, 
  FaGlobe, 
  FaPalette, 
  FaEdit 
} from 'react-icons/fa';

interface TarjetaClaseProps {
  clase: ClaseDetalle;
}

export const TarjetaClase: React.FC<TarjetaClaseProps> = ({ clase }) => {
  const getIconoMateria = (materia: string) => {
    const iconosConfig: Record<string, { icon: JSX.Element; bgColor: string }> = {
      'Matemáticas': { 
        icon: <FaCalculator className="w-6 h-6 text-white" />, 
        bgColor: 'bg-blue-500' 
      },
      'Programación': { 
        icon: <FaLaptopCode className="w-6 h-6 text-white" />, 
        bgColor: 'bg-green-500' 
      },
      'Física': { 
        icon: <FaAtom className="w-6 h-6 text-white" />, 
        bgColor: 'bg-purple-500' 
      },
      'Química': { 
        icon: <FaFlask className="w-6 h-6 text-white" />, 
        bgColor: 'bg-orange-500' 
      },
      'Historia': { 
        icon: <FaBook className="w-6 h-6 text-white" />, 
        bgColor: 'bg-red-500' 
      },
      'Literatura': { 
        icon: <FaBookOpen className="w-6 h-6 text-white" />, 
        bgColor: 'bg-pink-500' 
      },
      'Inglés': { 
        icon: <FaGlobe className="w-6 h-6 text-white" />, 
        bgColor: 'bg-blue-600' 
      },
      'Diseño': { 
        icon: <FaPalette className="w-6 h-6 text-white" />, 
        bgColor: 'bg-purple-600' 
      },
      'default': { 
        icon: <FaEdit className="w-6 h-6 text-white" />, 
        bgColor: 'bg-gray-500' 
      }
    };
    return iconosConfig[materia] || iconosConfig.default;
  };

  const iconConfig = getIconoMateria(clase.materia);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-shadow">
      {/* Header con icono */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${iconConfig.bgColor} rounded-lg flex items-center justify-center`}>
          {iconConfig.icon}
        </div>
      </div>

      {/* Título de la materia */}
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        {clase.materia}
      </h3>

      {/* Horarios */}
      <div className="space-y-2">
        {clase.horarios.map((horario, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">{horario.dia}:</span>
              <span className="font-medium text-gray-900">
                {horario.horaInicio} - {horario.horaFin}
              </span>
            </div>
            <span className="text-gray-500 text-xs">
              {horario.aula}
            </span>
          </div>
        ))}
      </div>

      {/* Información adicional */}
      {clase.profesor && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Profesor: <span className="font-medium text-gray-700">{clase.profesor}</span>
          </p>
        </div>
      )}
    </div>
  );
}; 