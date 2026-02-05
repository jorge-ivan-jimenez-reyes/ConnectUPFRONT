// Vista Landing - Página principal

import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, CONFIG } from '../shared/config';
import backgroundSvg from '../assets/icons/background.svg';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-brand-primary">{CONFIG.APP_NAME}</h1>
            </div>
            <div className="flex space-x-4">
              <Link 
                to={ROUTES.LOGIN_ADMIN} 
                className="text-gray-700 hover:text-brand-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login Admin
              </Link>
              <Link 
                to={ROUTES.LOGIN_USER} 
                className="bg-brand-primary text-white hover:bg-wine-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login Usuario
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section con Background SVG */}
        <section 
          className="relative min-h-[80vh] flex items-center justify-center text-white overflow-hidden"
          style={{
            backgroundImage: `url(${backgroundSvg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Overlay para mejorar legibilidad */}
          <div className="absolute inset-0 bg-brand-primary/20"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center animate-fade-in">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-shadow-lg">
                Conecta con tu <br />
                <span className="text-brand-secondary">Institución Educativa</span>
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto text-shadow">
                Plataforma integral para la gestión de instituciones educativas,
                conectando administradores, docentes y estudiantes en un solo lugar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to={ROUTES.REGISTER_ADMIN} 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-white text-brand-primary hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Registrar Institución
                </Link>
                <Link 
                  to={ROUTES.REGISTER_USER} 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg border-2 border-white text-white hover:bg-white hover:text-brand-primary transform hover:scale-105 transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Registrarse como Docente
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
                Características Principales
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Herramientas poderosas para una gestión educativa eficiente
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-brand-primary to-wine-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-brand-primary mb-4">
                    Gestión de Instituciones
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Administra múltiples instituciones desde un panel centralizado con herramientas avanzadas de control.
                  </p>
                </div>
              </div>

              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-brand-secondary to-gold-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-brand-primary mb-4">
                    Perfiles de Docentes
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    CVs completos con experiencia, educación y logros académicos en un formato profesional.
                  </p>
                </div>
              </div>

              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-navy-600 to-navy-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-brand-primary mb-4">
                    Gestión de Clases
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Organiza y administra clases, horarios y materiales educativos de manera intuitiva.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{CONFIG.APP_NAME}</h3>
              <p className="text-wine-200">
                Conectando el futuro de la educación con tecnología innovadora.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-wine-200">
                <li><Link to={ROUTES.LOGIN_ADMIN} className="hover:text-white transition-colors">Portal Admin</Link></li>
                <li><Link to={ROUTES.LOGIN_USER} className="hover:text-white transition-colors">Portal Docente</Link></li>
                <li><Link to={ROUTES.REGISTER_ADMIN} className="hover:text-white transition-colors">Registro</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <p className="text-wine-200">
                © 2024 {CONFIG.APP_NAME}. <br />
                Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}; 