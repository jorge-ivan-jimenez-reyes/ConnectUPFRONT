import React from 'react';
import { useMensajes } from '../hooks/useMensajes';
import { ChatConversacion, ListaConversaciones } from '../components/Mensajes';
import { TipoMensaje } from '../interfaces/mensaje.interfaces';

export const Mensajes: React.FC = () => {
  const {
    estado,
    conversacionesFiltradas,
    usuarioActual,
    actualizarFiltro,
    seleccionarConversacion,
    enviarMensaje,
    cerrarConversacion,
    obtenerTiempoRelativo,
    obtenerOtroParticipante
  } = useMensajes();

  const handleEnviarMensaje = (contenido: string) => {
    if (estado.conversacionActiva) {
      enviarMensaje({
        conversacionId: estado.conversacionActiva.conversacion.id,
        contenido,
        tipo: TipoMensaje.TEXTO
      });
    }
  };

  const handleVolver = () => {
    cerrarConversacion();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {estado.conversacionActiva ? (
        // Vista del chat
        <ChatConversacion
          conversacionDetalle={estado.conversacionActiva}
          usuarioActual={usuarioActual}
          onVolver={handleVolver}
          onEnviarMensaje={handleEnviarMensaje}
          enviandoMensaje={estado.enviandoMensaje}
        />
      ) : (
        // Lista de conversaciones
        <ListaConversaciones
          conversaciones={conversacionesFiltradas}
          filtroTexto={estado.filtroTexto}
          onFiltroChange={actualizarFiltro}
          onSeleccionarConversacion={seleccionarConversacion}
          obtenerOtroParticipante={obtenerOtroParticipante}
          obtenerTiempoRelativo={obtenerTiempoRelativo}
        />
      )}

      {/* Estado de carga */}
      {estado.cargando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
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
  );
}; 