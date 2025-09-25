import React from "react";

interface SimpleTableColumn {
  key: string;
  label: string;
}

interface SimpleTableProps {
  title: string;
  data: Array<Record<string, any>>;
  columns: SimpleTableColumn[];
}

export function SimpleTable({ title, data, columns }: SimpleTableProps) {
  if (data.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{title}</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((item, index) => (
              <tr key={item.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                  >
                    {item[column.key] || <span className="text-gray-400">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}