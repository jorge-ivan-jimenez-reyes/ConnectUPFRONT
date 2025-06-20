import React from 'react';
import { SeccionesCV } from '../../interfaces/cv.interfaces';
import { useCVContext } from '../../context/CVContext';
import { useCV } from '../../hooks/useCV';
import { 
  FaUser, 
  FaGraduationCap, 
  FaChalkboardTeacher, 
  FaSyncAlt, 
  FaUsersCog,
  FaFileAlt, 
  FaBriefcase, 
  FaTrophy, 
  FaBuilding, 
  FaMedal, 
  FaLightbulb,
  FaChevronRight
} from 'react-icons/fa';

export const NavegacionCV: React.FC = () => {
  const { navegarASeccion } = useCVContext();
  const { seccionesConfig } = useCV();

  const obtenerIcono = (icono: string) => {
    const iconos: Record<string, JSX.Element> = {
      'user': <FaUser size={20} className="text-gray-600" />,
      'graduation-cap': <FaGraduationCap size={20} className="text-gray-600" />,
      'chalkboard-teacher': <FaChalkboardTeacher size={20} className="text-gray-600" />,
      'sync-alt': <FaSyncAlt size={20} className="text-gray-600" />,
      'users-cog': <FaUsersCog size={20} className="text-gray-600" />,
      'file-alt': <FaFileAlt size={20} className="text-gray-600" />,
      'briefcase': <FaBriefcase size={20} className="text-gray-600" />,
      'trophy': <FaTrophy size={20} className="text-gray-600" />,
      'building': <FaBuilding size={20} className="text-gray-600" />,
      'medal': <FaMedal size={20} className="text-gray-600" />,
      'lightbulb': <FaLightbulb size={20} className="text-gray-600" />
    };
    return iconos[icono] || iconos['user'];
  };

  const handleSeccionClick = (seccionId: SeccionesCV) => {
    navegarASeccion(seccionId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tu CV</h1>
        <p className="text-gray-600 mt-2">Completa la información de tu CV</p>
      </div>

      {/* Grid de secciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {seccionesConfig.map((seccion) => (
          <button
            key={seccion.id}
            onClick={() => handleSeccionClick(seccion.id)}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Icono */}
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  {obtenerIcono(seccion.icono)}
                </div>
                
                {/* Contenido */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-primary transition-colors">
                    {seccion.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {seccion.descripcion}
                  </p>
                </div>
              </div>
              
              {/* Flecha */}
              <FaChevronRight 
                size={16} 
                className="text-gray-400 group-hover:text-brand-primary transition-colors" 
              />
            </div>
          </button>
        ))}
      </div>

      {/* Botones de acción */}
      <div className="flex justify-center space-x-4 pt-6">
        <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
          Vista Previa
        </button>
        <button className="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary/90 transition-colors">
          Descargar PDF
        </button>
      </div>
    </div>
  );
}; 