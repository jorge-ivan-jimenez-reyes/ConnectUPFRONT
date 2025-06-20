// Vista Facultades/Escuelas para administradores

import React, { useState } from 'react';

interface Faculty {
  id: string;
  name: string;
  institution: string;
  type: 'faculty' | 'school';
  dean: string;
  students: number;
  programs: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export const Facultades: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [institutionFilter, setInstitutionFilter] = useState<string>('all');

  const faculties: Faculty[] = [
    {
      id: '1',
      name: 'Facultad de Ingeniería',
      institution: 'Universidad de Lima',
      type: 'faculty',
      dean: 'Dr. Carlos Mendoza',
      students: 1250,
      programs: 8,
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Escuela de Negocios',
      institution: 'Universidad Católica del Perú',
      type: 'school',
      dean: 'Dra. Ana Torres',
      students: 890,
      programs: 5,
      status: 'active',
      createdAt: '2024-02-10'
    },
    {
      id: '3',
      name: 'Facultad de Medicina',
      institution: 'Universidad San Martín de Porres',
      type: 'faculty',
      dean: 'Dr. Roberto Silva',
      students: 650,
      programs: 3,
      status: 'active',
      createdAt: '2024-03-05'
    },
    {
      id: '4',
      name: 'Escuela de Diseño',
      institution: 'Instituto Tecnológico de Monterrey',
      type: 'school',
      dean: 'Mg. Patricia López',
      students: 320,
      programs: 4,
      status: 'active',
      createdAt: '2024-04-12'
    }
  ];

  const getTypeText = (type: string) => {
    return type === 'faculty' ? 'Facultad' : 'Escuela';
  };

  const getTypeColor = (type: string) => {
    return type === 'faculty' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  const institutions = Array.from(new Set(faculties.map(f => f.institution)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Facultades y Escuelas</h1>
          <p className="text-slate-600 mt-1">Gestiona las facultades y escuelas de las instituciones</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-[#202C59] text-white px-4 py-2 rounded-lg hover:bg-[#2A3B6B] transition-colors">
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nueva Facultad/Escuela
          </span>
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total</p>
              <p className="text-2xl font-bold text-[#202C59]">4</p>
            </div>
            <div className="p-3 bg-[#202C59]/10 rounded-lg">
              <svg className="w-6 h-6 text-[#202C59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Facultades</p>
              <p className="text-2xl font-bold text-blue-600">2</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-6 0h6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Escuelas</p>
              <p className="text-2xl font-bold text-purple-600">2</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Estudiantes</p>
              <p className="text-2xl font-bold text-green-600">3,110</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Búsqueda */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar facultades/escuelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#202C59] focus:border-[#202C59]"
            />
            <svg className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Filtro por tipo */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#202C59] focus:border-[#202C59]"
          >
            <option value="all">Todos los tipos</option>
            <option value="faculty">Facultades</option>
            <option value="school">Escuelas</option>
          </select>

          {/* Filtro por institución */}
          <select
            value={institutionFilter}
            onChange={(e) => setInstitutionFilter(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#202C59] focus:border-[#202C59]"
          >
            <option value="all">Todas las instituciones</option>
            {institutions.map((institution) => (
              <option key={institution} value={institution}>{institution}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de facultades/escuelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {faculties.map((faculty) => (
          <div key={faculty.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">{faculty.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(faculty.type)}`}>
                    {getTypeText(faculty.type)}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{faculty.institution}</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-slate-400 hover:text-[#202C59] transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-slate-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Decano/Director: <span className="font-medium text-slate-900 ml-1">{faculty.dean}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-lg font-bold text-[#202C59]">{faculty.students}</p>
                  <p className="text-xs text-slate-600">Estudiantes</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-lg font-bold text-[#202C59]">{faculty.programs}</p>
                  <p className="text-xs text-slate-600">Programas</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Creado: {new Date(faculty.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-xs text-green-600 font-medium">Activa</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 