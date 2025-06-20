// Vista Mi CV - Gestión del currículum vitae

import React from 'react';

export const MiCV: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mi CV</h1>
          <p className="text-gray-600 mt-2">Gestiona tu currículum vitae</p>
        </div>
        <div className="flex space-x-4">
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            Vista Previa
          </button>
          <button className="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary/90 transition-colors">
            Descargar PDF
          </button>
        </div>
      </div>

      {/* Información personal */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Información Personal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
            <input
              type="text"
              defaultValue="Juan Docente Pérez"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Título Profesional</label>
            <input
              type="text"
              defaultValue="Ingeniero en Sistemas - Especialista en Desarrollo Web"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue="juan.docente@universidad.edu"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
            />
          </div>
        </div>
      </div>

      {/* Experiencia Laboral */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Experiencia Laboral</h2>
          <button className="text-brand-primary hover:text-brand-primary/80 text-sm font-medium">
            + Agregar Experiencia
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            {
              puesto: 'Profesor de Desarrollo Web',
              empresa: 'Universidad Tecnológica',
              periodo: '2022 - Presente',
              descripcion: 'Enseñanza de tecnologías web modernas incluyendo React, Node.js y bases de datos.'
            },
            {
              puesto: 'Desarrollador Full Stack Senior',
              empresa: 'TechCorp Solutions',
              periodo: '2019 - 2022',
              descripcion: 'Desarrollo de aplicaciones web escalables utilizando tecnologías modernas.'
            },
            {
              puesto: 'Desarrollador Frontend',
              empresa: 'StartupXYZ',
              periodo: '2017 - 2019',
              descripcion: 'Creación de interfaces de usuario interactivas con React y TypeScript.'
            }
          ].map((exp, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{exp.puesto}</h3>
                  <p className="text-brand-primary font-medium">{exp.empresa}</p>
                  <p className="text-sm text-gray-600 mb-2">{exp.periodo}</p>
                  <p className="text-gray-700 text-sm">{exp.descripcion}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educación */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Educación</h2>
          <button className="text-brand-primary hover:text-brand-primary/80 text-sm font-medium">
            + Agregar Educación
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            {
              titulo: 'Maestría en Ingeniería de Software',
              institucion: 'Universidad Nacional',
              año: '2016 - 2018',
              descripcion: 'Especialización en arquitectura de software y metodologías ágiles.'
            },
            {
              titulo: 'Ingeniería en Sistemas Computacionales',
              institucion: 'Instituto Tecnológico',
              año: '2012 - 2016',
              descripcion: 'Graduado con honores. Proyecto de tesis sobre aplicaciones web.'
            }
          ].map((edu, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{edu.titulo}</h3>
                  <p className="text-brand-primary font-medium">{edu.institucion}</p>
                  <p className="text-sm text-gray-600 mb-2">{edu.año}</p>
                  <p className="text-gray-700 text-sm">{edu.descripcion}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Habilidades */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Habilidades Técnicas</h2>
          <button className="text-brand-primary hover:text-brand-primary/80 text-sm font-medium">
            + Agregar Habilidad
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { categoria: 'Frontend', skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
            { categoria: 'Backend', skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'] },
            { categoria: 'Herramientas', skills: ['Git', 'Docker', 'AWS', 'Figma'] }
          ].map((grupo, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">{grupo.categoria}</h3>
              <div className="space-y-2">
                {grupo.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{skill}</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificaciones */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Certificaciones</h2>
          <button className="text-brand-primary hover:text-brand-primary/80 text-sm font-medium">
            + Agregar Certificación
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { nombre: 'AWS Certified Solutions Architect', emisor: 'Amazon Web Services', año: '2023' },
            { nombre: 'React Professional Certificate', emisor: 'Meta', año: '2022' },
            { nombre: 'MongoDB Certified Developer', emisor: 'MongoDB University', año: '2021' },
            { nombre: 'Certified Scrum Master', emisor: 'Scrum Alliance', año: '2020' }
          ].map((cert, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{cert.nombre}</h3>
                  <p className="text-brand-primary font-medium">{cert.emisor}</p>
                  <p className="text-sm text-gray-600">{cert.año}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 