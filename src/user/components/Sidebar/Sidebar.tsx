// Sidebar de navegación para usuarios/docentes

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../shared/context';
import { ROUTES } from '../../../shared/config';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface MenuItem {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
  description: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems: MenuItem[] = [
    {
      id: 'mi-espacio',
      title: 'Mi Espacio',
      path: ROUTES.USER.MI_ESPACIO,
      description: 'Espacio personal',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'mis-clases',
      title: 'Mis Clases',
      path: ROUTES.USER.MIS_CLASES,
      description: 'Gestionar clases',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 'temarios',
      title: 'Temarios',
      path: ROUTES.USER.TEMARIOS,
      description: 'Contenido académico',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'mis-horarios',
      title: 'Mis Horarios',
      path: ROUTES.USER.MIS_HORARIOS,
      description: 'Horarios de clases',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'mensajes',
      title: 'Mensajes',
      path: ROUTES.USER.MENSAJES,
      description: 'Chat y comunicación',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      id: 'mi-cv',
      title: 'Mi CV',
      path: ROUTES.USER.MI_CV,
      description: 'Currículum vitae',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'mi-perfil',
      title: 'Mi Perfil',
      path: ROUTES.USER.MI_PERFIL,
      description: 'Configuración personal',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  const isActiveRoute = (path: string): boolean => {
    if (path === ROUTES.USER.MI_ESPACIO) {
      return location.pathname === '/user/mi-espacio' || location.pathname === '/user' || location.pathname === '/user/';
    }
    return location.pathname.includes(path.replace('/user', ''));
  };

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col
        lg:relative lg:translate-x-0 lg:shadow-lg
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header del sidebar */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-bold">
                {user?.firstName?.charAt(0) || 'U'}{user?.lastName?.charAt(0) || 'S'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.firstName || 'Usuario'} {user?.lastName || 'Sistema'}
              </p>
              <p className="text-xs text-gray-500">Docente</p>
            </div>
          </div>
          
          {/* Botón cerrar en móvil */}
          <button
            onClick={onToggle}
            className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navegación - ocupa el espacio restante */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const isActive = isActiveRoute(item.path);
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && onToggle()}
                  className={`
                    group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-brand-primary text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-brand-primary'
                    }
                  `}
                >
                  <span className={`
                    mr-3 transition-colors duration-200
                    ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-brand-primary'}
                  `}>
                    {item.icon}
                  </span>
                  
                  <div className="flex-1">
                    <div className="font-medium">{item.title}</div>
                    <div className={`
                      text-xs mt-0.5
                      ${isActive ? 'text-white/80' : 'text-gray-500 group-hover:text-brand-primary/70'}
                    `}>
                      {item.description}
                    </div>
                  </div>

                  {isActive && (
                    <div className="w-1 h-8 bg-white rounded-full ml-2" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer del sidebar */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-2">ConnectUP v1.0.0</p>
            <p className="text-xs text-gray-500">
              Plataforma educativa integral
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}; 