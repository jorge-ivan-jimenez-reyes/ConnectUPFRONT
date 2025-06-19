// Componente Layout principal

import React from 'react';
import { BaseComponentProps } from '../../interfaces';
import './Layout.css';

interface LayoutProps extends BaseComponentProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  showSidebar?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  header,
  sidebar,
  footer,
  showSidebar = false,
  className = '',
  testId = 'layout'
}) => {
  return (
    <div className={`layout ${className}`} data-testid={testId}>
      {header && (
        <header className="layout__header">
          {header}
        </header>
      )}
      
      <div className="layout__content">
        {showSidebar && sidebar && (
          <aside className="layout__sidebar">
            {sidebar}
          </aside>
        )}
        
        <main className="layout__main">
          {children}
        </main>
      </div>
      
      {footer && (
        <footer className="layout__footer">
          {footer}
        </footer>
      )}
    </div>
  );
}; 