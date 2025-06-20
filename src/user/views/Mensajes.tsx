import React from 'react';
import { useMensajes } from '../hooks/useMensajes';
import { FaSearch, FaCheck } from 'react-icons/fa';

export const Mensajes: React.FC = () => {
  const {
    estado,
    conversacionesFiltradas,
    actualizarFiltro,
    seleccionarConversacion,
    obtenerTiempoRelativo,
    obtenerOtroParticipante
  } = useMensajes();

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
              value={estado.filtroTexto}
              onChange={(e) => actualizarFiltro(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              placeholder="Buscar"
            />
          </div>
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header de la sección */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Sin Contestar</h2>
          </div>

          {/* Lista de conversaciones */}
          <div className="divide-y divide-gray-200">
            {conversacionesFiltradas.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No se encontraron conversaciones</p>
              </div>
            ) : (
              conversacionesFiltradas.map((conversacion) => {
                const otroParticipante = obtenerOtroParticipante(conversacion);
                const tiempoRelativo = obtenerTiempoRelativo(
                  conversacion.ultimoMensaje?.fechaEnvio || conversacion.fechaUltimaActividad
                );
                
                return (
                  <div
                    key={conversacion.id}
                    onClick={() => seleccionarConversacion(conversacion.id)}
                    className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      {/* Información del usuario */}
                      <div className="flex items-center space-x-4">
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
                        </div>

                        {/* Información del chat */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-900">
                              {otroParticipante.nombre}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                            {conversacion.ultimoMensaje?.contenido || 'Sin mensajes'}
                          </p>
                        </div>
                      </div>

                      {/* Tiempo y estado */}
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500">
                          {tiempoRelativo}
                        </span>
                        
                        {/* Indicador de mensaje leído */}
                        <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center">
                          <FaCheck className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Estado de carga */}
        {estado.cargando && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-primary"></div>
                <span className="text-gray-700">Cargando conversación...</span>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {estado.error && (
          <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
            {estado.error}
          </div>
        )}
      </div>
    </div>
  );
}; 