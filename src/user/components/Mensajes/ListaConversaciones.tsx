import React from 'react';
import { FaSearch, FaCheck } from 'react-icons/fa';
import { Conversacion, Usuario } from '../../interfaces/mensaje.interfaces';

interface ListaConversacionesProps {
  conversaciones: Conversacion[];
  filtroTexto: string;
  onFiltroChange: (texto: string) => void;
  onSeleccionarConversacion: (conversacionId: string) => void;
  obtenerOtroParticipante: (conversacion: Conversacion) => Usuario;
  obtenerTiempoRelativo: (fecha: string) => string;
}

export const ListaConversaciones: React.FC<ListaConversacionesProps> = ({
  conversaciones,
  filtroTexto,
  onFiltroChange,
  onSeleccionarConversacion,
  obtenerOtroParticipante,
  obtenerTiempoRelativo
}) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mensajes</h1>
          
          {/* Barra de búsqueda */}
          <div className="relative w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={filtroTexto}
              onChange={(e) => onFiltroChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Buscar conversaciones..."
            />
          </div>
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header de la sección */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Conversaciones ({conversaciones.length})
            </h2>
          </div>

          {/* Lista de conversaciones */}
          <div className="divide-y divide-gray-200">
            {conversaciones.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-400 mb-3">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">No se encontraron conversaciones</p>
                <p className="text-gray-400 text-sm mt-1">
                  {filtroTexto ? 'Intenta con otros términos de búsqueda' : 'Aún no tienes conversaciones'}
                </p>
              </div>
            ) : (
              conversaciones.map((conversacion) => {
                const otroParticipante = obtenerOtroParticipante(conversacion);
                const tiempoRelativo = obtenerTiempoRelativo(
                  conversacion.ultimoMensaje?.fechaEnvio || conversacion.fechaUltimaActividad
                );
                
                return (
                  <div
                    key={conversacion.id}
                    onClick={() => onSeleccionarConversacion(conversacion.id)}
                    className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  >
                    <div className="flex items-center justify-between">
                      {/* Información del usuario */}
                      <div className="flex items-center space-x-4 flex-1">
                        {/* Avatar */}
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                            {otroParticipante.avatar ? (
                              <img
                                src={otroParticipante.avatar}
                                alt={otroParticipante.nombre}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold">
                                {otroParticipante.nombre.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          
                          {/* Indicador de estado */}
                          {otroParticipante.estado === 'online' && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>

                        {/* Información del chat */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-900 truncate">
                              {otroParticipante.nombre}
                            </h3>
                            
                            {/* Contador de mensajes no leídos */}
                            {conversacion.mensajesNoLeidos > 0 && (
                              <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full ml-2">
                                {conversacion.mensajesNoLeidos}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-gray-600 truncate pr-2">
                              {conversacion.ultimoMensaje?.contenido || 'Sin mensajes'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Tiempo y estado */}
                      <div className="flex flex-col items-end space-y-1 ml-3">
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {tiempoRelativo}
                        </span>
                        
                        {/* Indicador de mensaje leído */}
                        <div className="flex items-center">
                          {conversacion.ultimoMensaje?.leido ? (
                            <div className="w-4 h-4 border border-gray-400 rounded flex items-center justify-center">
                              <FaCheck className="w-2 h-2 text-gray-400" />
                            </div>
                          ) : (
                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 