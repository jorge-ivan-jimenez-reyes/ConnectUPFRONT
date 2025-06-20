import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SeccionesCV } from '../interfaces/cv.interfaces';

interface CVContextType {
  seccionActiva: SeccionesCV | null;
  navegarASeccion: (seccion: SeccionesCV) => void;
  volverAlMenu: () => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

interface CVProviderProps {
  children: ReactNode;
}

export const CVProvider: React.FC<CVProviderProps> = ({ children }) => {
  const [seccionActiva, setSeccionActiva] = useState<SeccionesCV | null>(null);

  const navegarASeccion = (seccion: SeccionesCV) => {
    setSeccionActiva(seccion);
  };

  const volverAlMenu = () => {
    setSeccionActiva(null);
  };

  const value: CVContextType = {
    seccionActiva,
    navegarASeccion,
    volverAlMenu
  };

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
};

export const useCVContext = () => {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error('useCVContext debe usarse dentro de un CVProvider');
  }
  return context;
}; 