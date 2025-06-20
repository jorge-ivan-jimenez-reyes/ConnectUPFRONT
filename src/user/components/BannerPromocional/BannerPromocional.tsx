import React from 'react';
import { FaChevronRight, FaMapMarkerAlt } from 'react-icons/fa';

export const BannerPromocional: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl overflow-hidden h-fit">
      {/* Imagen de fondo */}
      <div className="relative h-64 bg-cover bg-center"
           style={{
             backgroundImage: 'url("/src/assets/img/smartcenter.png")',
             backgroundSize: 'cover',
             backgroundPosition: 'center'
           }}>
        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Contenido del banner */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-bold mb-2">
            Smart Center te invita a...
          </h3>
          <p className="text-sm text-white/90 mb-4">
            Descubre nuevas oportunidades de aprendizaje y conecta con la comunidad académica
          </p>
          
          <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors flex items-center gap-2">
            Ver más
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Información adicional */}
      <div className="p-4 bg-white">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Próximo evento</span>
          <span className="text-gray-900 font-medium">15 Nov, 2024</span>
        </div>
        <div className="mt-2 flex items-center text-xs text-gray-500">
          <FaMapMarkerAlt className="w-3 h-3 mr-1" />
          Auditorio Principal
        </div>
      </div>
    </div>
  );
}; 