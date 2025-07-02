import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import type { CreateFacultyFormDTO } from '../../interfaces';

export interface CreateFacultyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateFacultyFormDTO) => void;
  isLoading?: boolean;
}

export const CreateFacultyModal: React.FC<CreateFacultyModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<CreateFacultyFormDTO>({
    nombre: '',
    institucion: '',
    descripcion: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.institucion.trim()) newErrors.institucion = 'La institución es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    setFormData({
      nombre: '',
      institucion: '',
      descripcion: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      title="Añadir una nueva facultad"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre de la facultad */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-slate-700 mb-2">
            Nombre de la facultad
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Lorem Ipsum"
            className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white ${
              errors.nombre ? 'border-red-300' : 'border-slate-300'
            }`}
          />
          {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
        </div>

        {/* Institución */}
        <div>
          <label htmlFor="institucion" className="block text-sm font-medium text-slate-700 mb-2">
            Institución
          </label>
          <select
            id="institucion"
            name="institucion"
            value={formData.institucion}
            onChange={handleInputChange}
            className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white ${
              errors.institucion ? 'border-red-300' : 'border-slate-300'
            }`}
          >
            <option value="">Seleccionar institución</option>
            <option value="UP MX">UP MX</option>
            <option value="UP AGS">UP AGS</option>
            <option value="UP GDL">UP GDL</option>
            <option value="IPADE">IPADE</option>
          </select>
          {errors.institucion && <p className="mt-1 text-sm text-red-600">{errors.institucion}</p>}
        </div>

        {/* Descripción (opcional) */}
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-slate-700 mb-2">
            Descripción (opcional)
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            rows={3}
            placeholder="Lorem Ipsum"
            className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white resize-none"
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4 pt-8 mt-8 border-t border-slate-100">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="px-6 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 text-sm font-medium text-white bg-[#202C59] border border-transparent rounded-lg hover:bg-[#2A3B6B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#202C59] disabled:opacity-50 flex items-center transition-colors"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creando...
              </>
            ) : (
              'Añadir Facultad'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}; 