import React from 'react';
import { ClaseInfo } from '../../interfaces/clase.interfaces';
import { 
  FaCalculator, 
  FaLaptopCode, 
  FaAtom, 
  FaFlask, 
  FaBook, 
  FaBookOpen, 
  FaGlobe, 
  FaPalette, 
  FaEdit,
  FaClock,
  FaMapMarkerAlt
} from 'react-icons/fa';

interface ClaseHorarioProps {
  clase: ClaseInfo;
}

export const ClaseHorario: React.FC<ClaseHorarioProps> = ({ clase }) => {
  const ahora = new Date();
  const horaInicio = new Date(`${ahora.toDateString()} ${clase.horaInicio}`);
  const horaFin = new Date(`${ahora.toDateString()} ${clase.horaFin}`);
  
  const estaEnProgreso = ahora >= horaInicio && ahora <= horaFin;
  const yaTermino = ahora > horaFin;
  
  const getIconoMateria = (materia: string) => {
    const iconos: Record<string, JSX.Element> = {
      'Matemáticas': <FaCalculator className="text-blue-600" />,
      'Programación': <FaLaptopCode className="text-green-600" />,
      'Física': <FaAtom className="text-purple-600" />,
      'Química': <FaFlask className="text-orange-600" />,
      'Historia': <FaBook className="text-brown-600" />,
      'Literatura': <FaBookOpen className="text-pink-600" />,
      'Inglés': <FaGlobe className="text-blue-500" />,
      'Diseño': <FaPalette className="text-purple-500" />,
      'default': <FaEdit className="text-gray-600" />
    };
    return iconos[materia] || iconos.default;
  };

  const getColorClase = () => {
    if (yaTermino) return 'bg-gray-50 border-gray-200';
    if (estaEnProgreso) return 'bg-green-50 border-green-200';
    return 'bg-blue-50 border-blue-200';
  };

  const getEstadoClase = () => {
    if (yaTermino) return { texto: 'Finalizada', color: 'text-gray-500' };
    if (estaEnProgreso) return { texto: 'En progreso', color: 'text-green-600' };
    return { texto: 'Próxima', color: 'text-blue-600' };
  };

  const estado = getEstadoClase();

  return (
    <div className={`rounded-lg border p-4 transition-all hover:shadow-sm ${getColorClase()}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {/* Icono de la materia */}
          <div className="text-xl mt-1">{getIconoMateria(clase.materia)}</div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{clase.materia}</h3>
            <p className="text-sm text-gray-600 mb-1">{clase.tema}</p>
            <div className="flex items-center text-xs text-gray-500 space-x-4">
              <span className="flex items-center gap-1">
                <FaClock className="w-3 h-3" />
                {clase.horaInicio} - {clase.horaFin}
              </span>
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="w-3 h-3" />
                {clase.aula}
              </span>
            </div>
          </div>
        </div>

        {/* Estado de la clase */}
        <div className="text-right">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${estado.color} bg-current bg-opacity-10`}>
            {estado.texto}
          </span>
        </div>
      </div>
    </div>
  );
}; 