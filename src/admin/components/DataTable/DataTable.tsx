import React from 'react';
import { TableAction } from '../../interfaces';

export interface TableColumn {
  key: string;
  title: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableRow {
  id: string;
  [key: string]: any;
}

export interface DataTableProps {
  title: string;
  columns: TableColumn[];
  data: TableRow[];
  actions?: TableAction[];
  onAdd?: () => void;
  showAddButton?: boolean;
  addButtonText?: string;
  isLoading?: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  data,
  actions = [],
  onAdd,
  showAddButton = false,
  addButtonText = "Agregar",
  isLoading = false
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        {showAddButton && onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-2 bg-[#202C59] text-white px-3 py-1.5 text-sm rounded-lg hover:bg-[#2A3B6B] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {addButtonText}
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-${column.align || 'left'} text-xs font-medium text-slate-500 uppercase tracking-wider ${column.width || ''}`}
                >
                  {column.title}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider w-24">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)} className="px-6 py-12 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#202C59]"></div>
                    <span className="ml-2 text-slate-500">Cargando...</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  {columns.map((column) => (
                    <td key={column.key} className={`px-6 py-4 text-sm text-slate-900 text-${column.align || 'left'}`}>
                      {row[column.key]}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={() => action.onClick(row.id)}
                            className={`p-1.5 rounded-md transition-colors ${
                              action.variant === 'danger'
                                ? 'text-red-600 hover:bg-red-50'
                                : action.variant === 'secondary'
                                ? 'text-slate-600 hover:bg-slate-100'
                                : 'text-[#202C59] hover:bg-blue-50'
                            }`}
                            title={action.label}
                          >
                            <div className="w-4 h-4">
                              {action.icon}
                            </div>
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="p-12 text-center">
          <div className="text-slate-400 text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No hay datos</h3>
          <p className="text-slate-500">No se encontraron registros para mostrar.</p>
        </div>
      )}
    </div>
  );
}; 