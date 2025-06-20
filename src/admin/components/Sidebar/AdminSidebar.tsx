// Sidebar de navegación para administradores

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../shared/context';
import { ROUTES } from '../../../shared/config';

interface AdminSidebarProps {
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

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems: MenuItem[] = [
    {
      id: 'mi-espacio',
      title: 'Mi Espacio',
      path: ROUTES.ADMIN.MI_ESPACIO,
      description: 'Panel de control',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'instituciones',
      title: 'Instituciones',
      path: ROUTES.ADMIN.INSTITUCIONES,
      description: 'Gestión de instituciones',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'facultades',
      title: 'Facultades/Escuelas',
      path: ROUTES.ADMIN.FACULTADES,
      description: 'Organizaciones académicas',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    },
    {
      id: 'reportes',
      title: 'Reportes',
      path: ROUTES.ADMIN.REPORTES,
      description: 'Análisis y estadísticas',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 'usuarios',
      title: 'Usuarios',
      path: ROUTES.ADMIN.USUARIOS,
      description: 'Gestión de usuarios',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    }
  ];

  const isActiveRoute = (path: string): boolean => {
    if (path === ROUTES.ADMIN.MI_ESPACIO) {
      return location.pathname === '/admin/mi-espacio' || location.pathname === '/admin' || location.pathname === '/admin/';
    }
    return location.pathname.includes(path.replace('/admin', ''));
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
        fixed inset-y-0 left-0 z-50 w-64 bg-[#202C59] shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col
        lg:relative lg:translate-x-0 lg:shadow-lg
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header del sidebar */}
        <div className="flex items-center justify-between p-6 border-b border-[#2A3B6B] flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-bold">
                {user?.firstName?.charAt(0) || 'A'}{user?.lastName?.charAt(0) || 'D'}
              </span>
            </div>
            <div className="text-white">
              <p className="text-sm font-medium truncate">
                {user?.firstName || 'Admin'} {user?.lastName || 'Sistema'}
              </p>
              <p className="text-xs text-white/80">Administrador</p>
            </div>
          </div>
          
          {/* Botón cerrar en móvil */}
          <button
            onClick={onToggle}
            className="lg:hidden text-white hover:text-white/80 transition-colors"
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
                      ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <span className={`
                    mr-3 transition-colors duration-200
                    ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'}
                  `}>
                    {item.icon}
                  </span>
                  
                  <div className="flex-1">
                    <div className="font-medium">{item.title}</div>
                    <div className={`
                      text-xs mt-0.5
                      ${isActive ? 'text-white/80' : 'text-white/50 group-hover:text-white/70'}
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
        <div className="p-4 border-t border-[#2A3B6B] flex-shrink-0">
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-xs text-white/90 mb-2">ConnectUP Admin v1.0.0</p>
            <p className="text-xs text-white/70">
              Panel de administración
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}; 