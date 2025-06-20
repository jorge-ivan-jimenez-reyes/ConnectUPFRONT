// Vista Mi CV - Gestión del currículum vitae

import React from 'react';
import { CVProvider } from '../context/CVContext';
import { GestorCV } from '../components/MiCV';

export const MiCV: React.FC = () => {
  return (
    <CVProvider>
      <GestorCV />
    </CVProvider>
  );
}; 