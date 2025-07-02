import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaArrowLeft, FaEllipsisV } from 'react-icons/fa';
import { ConversacionDetalle, Usuario, Mensaje, TipoMensaje } from '../../interfaces/mensaje.interfaces';

interface ChatConversacionProps {
  conversacionDetalle: ConversacionDetalle;
  usuarioActual: Usuario;
  onVolver: () => void;
  onEnviarMensaje: (contenido: string) => void;
  enviandoMensaje: boolean;
}

export const ChatConversacion: React.FC<ChatConversacionProps> = ({
  conversacionDetalle,
  usuarioActual,
  onVolver,
  onEnviarMensaje,
  enviandoMensaje
}) => {
  const [mensajeTexto, setMensajeTexto] = useState('');
  const mensajesRef = useRef<HTMLDivElement>(null);
  
  const { conversacion, mensajes } = conversacionDetalle;
  const otroParticipante = conversacion.participantes.find(p => p.id !== usuarioActual.id) || conversacion.participantes[0];

  // Auto scroll al final cuando hay nuevos mensajes
  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  }, [mensajes]);

  const handleEnviarMensaje = () => {
    if (mensajeTexto.trim() && !enviandoMensaje) {
      onEnviarMensaje(mensajeTexto.trim());
      setMensajeTexto('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEnviarMensaje();
    }
  };

  const formatearHoraMensaje = (fecha: string): string => {
    const fechaMensaje = new Date(fecha);
    return fechaMensaje.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const esMensajePropio = (mensaje: Mensaje): boolean => {
    return mensaje.autorId === usuarioActual.id;
  };

  const obtenerEstadoUsuario = (): string => {
    switch (otroParticipante.estado) {
      case 'online':
        return 'En línea';
      case 'ausente':
        return 'Ausente';
      case 'offline':
        return `Última vez ${new Date(otroParticipante.ultimaConexion || '').toLocaleDateString()}`;
      default:
        return 'Desconectado';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header del chat */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-4">
          {/* Botón volver */}
          <button
            onClick={onVolver}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaArrowLeft className="w-5 h-5 text-gray-600" />
          </button>

          {/* Info del usuario */}
          <div className="flex items-center space-x-3">
            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                {otroParticipante.avatar ? (
                  <img
                    src={otroParticipante.avatar}
                    alt={otroParticipante.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold text-sm">
                    {otroParticipante.nombre.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              {/* Indicador de estado */}
              {otroParticipante.estado === 'online' && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>

            {/* Nombre y estado */}
            <div>
              <h3 className="font-semibold text-gray-900">{otroParticipante.nombre}</h3>
              <p className="text-sm text-gray-500">{obtenerEstadoUsuario()}</p>
            </div>
          </div>
        </div>

        {/* Opciones */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <FaEllipsisV className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Área de mensajes */}
      <div 
        ref={mensajesRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        {mensajes.map((mensaje) => {
          const esPropio = esMensajePropio(mensaje);
          
          return (
            <div
              key={mensaje.id}
              className={`flex ${esPropio ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                esPropio 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{mensaje.contenido}</p>
                <p className={`text-xs mt-1 ${
                  esPropio ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatearHoraMensaje(mensaje.fechaEnvio)}
                </p>
              </div>
            </div>
          );
        })}

        {/* Indicador de carga */}
        {conversacionDetalle.cargandoMensajes && (
          <div className="flex justify-center">
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
              <span className="text-sm">Cargando mensajes...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input para enviar mensajes */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              value={mensajeTexto}
              onChange={(e) => setMensajeTexto(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje..."
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
              disabled={enviandoMensaje}
            />
          </div>
          
          <button
            onClick={handleEnviarMensaje}
            disabled={!mensajeTexto.trim() || enviandoMensaje}
            className={`p-3 rounded-full transition-colors ${
              mensajeTexto.trim() && !enviandoMensaje
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {enviandoMensaje ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
            ) : (
              <FaPaperPlane className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}; 