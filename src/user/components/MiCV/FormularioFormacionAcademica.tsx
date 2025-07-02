import React from 'react';
import { useCV } from '../../hooks/useCV';
import { useCVContext } from '../../context/CVContext';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

interface FormacionAcademicaData {
  nivel: string;
  institucion: string;
  pais: string;
  anoObtencion: string;
  cedulaProfesional: string;
}

export const FormularioFormacionAcademica: React.FC = () => {
  const { volverAlMenu } = useCVContext();
  const { 
    cvData, 
    hasChanges,
    guardarCV,
    isLoading
  } = useCV();

  // Por ahora usamos un estado local para los datos de formación académica
  const [datos, setDatos] = React.useState<FormacionAcademicaData>({
    nivel: '',
    institucion: '',
    pais: '',
    anoObtencion: '',
    cedulaProfesional: ''
  });

  const handleInputChange = (campo: keyof FormacionAcademicaData, valor: string) => {
    setDatos(prev => ({ ...prev, [campo]: valor }));
  };

  const handleVolver = () => {
    volverAlMenu();
  };

  const handleGuardar = () => {
    // Aquí se guardarían los datos de formación académica
    console.log('Guardando formación académica:', datos);
    guardarCV();
  };

  const nivelesEducativos = [
    { value: 'especialidad', label: 'Especialidad' },
    { value: 'bachiller', label: 'Bachiller' },
    { value: 'tecnico', label: 'Técnico' },
    { value: 'pregrado', label: 'Pregrado' },
    { value: 'maestria', label: 'Maestría' },
    { value: 'doctorado', label: 'Doctorado' },
    { value: 'postdoctorado', label: 'Postdoctorado' }
  ];

  const paises = [
    { value: 'mexico', label: 'México' },
    { value: 'colombia', label: 'Colombia' },
    { value: 'argentina', label: 'Argentina' },
    { value: 'chile', label: 'Chile' },
    { value: 'peru', label: 'Perú' },
    { value: 'venezuela', label: 'Venezuela' },
    { value: 'ecuador', label: 'Ecuador' },
    { value: 'usa', label: 'Estados Unidos' },
    { value: 'espana', label: 'España' },
    { value: 'francia', label: 'Francia' }
  ];

  const anosObtencion = Array.from({ length: 50 }, (_, i) => {
    const ano = new Date().getFullYear() - i;
    return { value: ano.toString(), label: ano.toString() };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleVolver}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tu CV</h1>
            <p className="text-gray-600 mt-2">Formación Académica</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {hasChanges && (
            <span className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              Cambios sin guardar
            </span>
          )}
          <button
            onClick={handleGuardar}
            disabled={isLoading}
            className="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <FaSave size={16} />
            {isLoading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>

      {/* Formulario de Formación Académica */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Formación Académica (1)</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Nivel */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nivel
              </label>
              <select
                value={datos.nivel}
                onChange={(e) => handleInputChange('nivel', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white"
              >
                <option value="">Especialidad</option>
                {nivelesEducativos.map(nivel => (
                  <option key={nivel.value} value={nivel.value}>
                    {nivel.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Institución */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institución
              </label>
              <input
                type="text"
                value={datos.institucion}
                onChange={(e) => handleInputChange('institucion', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white"
                placeholder="Universidad Panamericana"
              />
            </div>

            {/* País */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                País
              </label>
              <select
                value={datos.pais}
                onChange={(e) => handleInputChange('pais', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white"
              >
                <option value="">Seleccionar</option>
                {paises.map(pais => (
                  <option key={pais.value} value={pais.value}>
                    {pais.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Año de obtención */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Año de obtención
              </label>
              <select
                value={datos.anoObtencion}
                onChange={(e) => handleInputChange('anoObtencion', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white"
              >
                <option value="">2023</option>
                {anosObtencion.map(ano => (
                  <option key={ano.value} value={ano.value}>
                    {ano.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Cédula Profesional */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cédula Profesional
              </label>
              <input
                type="text"
                value={datos.cedulaProfesional}
                onChange={(e) => handleInputChange('cedulaProfesional', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white"
                placeholder="En curso..."
              />
            </div>
          </div>

          {/* Botón para agregar más campos */}
          <div className="flex justify-center mt-6">
            <button className="group w-8 h-8 border-2 border-gray-300 text-gray-400 rounded-full flex items-center justify-center hover:border-brand-primary hover:text-brand-primary transition-all duration-200 hover:scale-105">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Información Registrada */}
      {(datos.nivel || datos.institucion || datos.pais || datos.anoObtencion || datos.cedulaProfesional) && (
        <div className="bg-brand-primary text-white rounded-xl">
          <div className="px-6 py-4 border-b border-white/20">
            <h3 className="text-lg font-semibold">Información Registrada</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-white/70 text-sm">Nivel</p>
                <p className="font-medium">
                  {datos.nivel ? nivelesEducativos.find(n => n.value === datos.nivel)?.label : 'Especialidad'}
                </p>
              </div>
              <div>
                <p className="text-white/70 text-sm">Institución</p>
                <p className="font-medium">{datos.institucion || 'Universidad Panamericana'}</p>
              </div>
              <div>
                <p className="text-white/70 text-sm">País</p>
                <p className="font-medium">
                  {datos.pais ? paises.find(p => p.value === datos.pais)?.label : 'México'}
                </p>
              </div>
              <div>
                <p className="text-white/70 text-sm">Año de obtención</p>
                <p className="font-medium">{datos.anoObtencion || '2023'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-white/70 text-sm">Cédula Profesional</p>
                <p className="font-medium">{datos.cedulaProfesional || 'En curso...'}</p>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botones de navegación */}
      <div className="flex justify-between">
        <button
          onClick={handleVolver}
          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Volver al menú principal
        </button>
        
        <button
          onClick={handleGuardar}
          disabled={isLoading}
          className="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary/90 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Guardando...' : 'Guardar información'}
        </button>
      </div>
    </div>
  );
}; 