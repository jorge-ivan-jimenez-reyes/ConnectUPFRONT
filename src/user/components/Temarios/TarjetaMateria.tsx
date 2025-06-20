import React from 'react';
import { Materia, EstadoMateria } from '../../interfaces/temario.interfaces';
import { 
  FaCode, 
  FaLaptopCode, 
  FaTerminal, 
  FaDatabase, 
  FaNetworkWired, 
  FaPalette,
  FaCheck
} from 'react-icons/fa';

interface TarjetaMateriaProps {
  materia: Materia;
  onToggle: () => void;
  onVerTemario: () => void;
}

export const TarjetaMateria: React.FC<TarjetaMateriaProps> = ({ materia, onToggle, onVerTemario }) => {
  console.log('🔄 Renderizando TarjetaMateria:', materia.nombre, 'Estado:', materia.estado);
  
  const handleToggle = () => {
    console.log('🎯 Click en toggle para materia:', materia.nombre, materia.id, 'Estado actual:', materia.estado);
    console.log('🔍 Función onToggle disponible:', typeof onToggle);
    onToggle();
  };

  const handleVerTemario = () => {
    console.log('👁️ Click en ver temario para materia:', materia.nombre, materia.id);
    console.log('🔍 Función onVerTemario disponible:', typeof onVerTemario);
    onVerTemario();
  };

  const getIconoMateria = (icono: string) => {
    const iconos: Record<string, JSX.Element> = {
      'code': <FaCode size={32} color="white" />,
      'laptop-code': <FaLaptopCode size={32} color="white" />,
      'terminal': <FaTerminal size={32} color="white" />,
      'database': <FaDatabase size={32} color="white" />,
      'network-wired': <FaNetworkWired size={32} color="white" />,
      'palette': <FaPalette size={32} color="white" />,
      'default': <FaCode size={32} color="white" />
    };
    return iconos[icono] || iconos.default;
  };

  const getEstadoButton = () => {
    switch (materia.estado) {
      case EstadoMateria.DISPONIBLE:
        return {
          texto: 'Seleccionar',
          estilo: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        };
      case EstadoMateria.AÑADIDA:
        return {
          texto: 'Quitar',
          estilo: 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700',
          icono: <FaCheck size={16} />
        };
      default:
        return {
          texto: 'Seleccionar',
          estilo: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        };
    }
  };

  const estadoButton = getEstadoButton();

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      {/* Icono y contenido */}
      <div className="flex items-center space-x-4">
        {/* Icono de la materia */}
        <div className={`w-16 h-16 ${materia.color} rounded-lg flex items-center justify-center`}>
          {getIconoMateria(materia.icono)}
        </div>
        
        {/* Información de la materia */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {materia.nombre}
          </h3>
          <p className="text-gray-600 text-sm">
            {materia.descripcion}
          </p>
          
          {/* Enlace Ver el temario */}
          <button
            onClick={handleVerTemario}
            className="text-blue-600 hover:underline text-sm mt-1"
          >
            Ver el temario
          </button>
        </div>
      </div>

      {/* Botón de estado */}
      <button
        onClick={handleToggle}
        className={`
          px-6 py-2 rounded-lg font-medium transition-colors
          flex items-center gap-2 min-w-[120px] justify-center
          ${estadoButton.estilo}
        `}
      >
        {estadoButton.icono}
        {estadoButton.texto}
      </button>
    </div>
  );
}; 