import { ReactNode, useId, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

export interface SortableColumn<T> {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'string' | 'number';
  getSortValue?: (row: T) => string | number;
  render: (row: T) => ReactNode;
  align?: 'left' | 'right' | 'center';
}

interface SortableTableProps<T> {
  caption: string;
  rows: T[];
  getRowId: (row: T) => string;
  columns: SortableColumn<T>[];
  initialSortKey?: string;
  initialSortDir?: 'ascending' | 'descending';
  rowClassName?: (row: T) => string;
  emptyMessage?: string;
}

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

export function SortableTable<T>({
  caption,
  rows,
  getRowId,
  columns,
  initialSortKey,
  initialSortDir = 'ascending',
  rowClassName,
  emptyMessage = 'No matching records found.',
}: SortableTableProps<T>) {
  const captionId = useId();
  const [sortKey, setSortKey] = useState<string | null>(initialSortKey ?? null);
  const [sortDir, setSortDir] = useState<'ascending' | 'descending'>(initialSortDir);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSort = (col: SortableColumn<T>) => {
    const nextDir: 'ascending' | 'descending' =
      sortKey === col.key && sortDir === 'ascending' ? 'descending' : 'ascending';
    setSortKey(col.key);
    setSortDir(nextDir);
    setStatusMessage(`Sorted by ${col.label}, ${nextDir}, ${rows.length} rows`);
  };

  const sortedRows = useMemo(() => {
    if (!sortKey) return rows;
    const col = columns.find((c) => c.key === sortKey);
    if (!col || !col.getSortValue) return rows;

    const factor = sortDir === 'ascending' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const valA = col.getSortValue!(a);
      const valB = col.getSortValue!(b);
      if (col.type === 'number') {
        return factor * (Number(valA) - Number(valB));
      }
      return factor * collator.compare(String(valA), String(valB));
    });
  }, [rows, sortKey, sortDir, columns]);

  return (
    <div className="relative">
      <div role="status" className="tiq-sr-status">
        {statusMessage}
      </div>
      <div
        tabIndex={0}
        role="region"
        aria-labelledby={captionId}
        className="tiq-table-region border border-slate-200 bg-white"
      >
        <table className="tiq-table text-sm">
          <caption id={captionId} className="sr-only">
            {caption}
          </caption>
          <thead className="bg-[#F8FAFC] text-[11px] uppercase tracking-wider text-[#64748B] border-b border-slate-200">
            <tr>
              {columns.map((col) => {
                const isSorted = sortKey === col.key;
                const alignClass =
                  col.align === 'right'
                    ? 'text-right justify-end'
                    : col.align === 'center'
                    ? 'text-center justify-center'
                    : 'text-left justify-start';

                return (
                  <th
                    key={col.key}
                    scope="col"
                    aria-sort={isSorted ? sortDir : undefined}
                    className={`border-b border-slate-200 bg-[#F8FAFC] whitespace-nowrap ${
                      !col.sortable ? `px-3.5 py-2.5 font-semibold ${alignClass}` : ''
                    }`}
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => handleSort(col)}
                        className={`hover:text-[#0B1530] transition-colors ${alignClass}`}
                      >
                        <span>{col.label}</span>
                        <span aria-hidden="true" className="inline-flex items-center">
                          {isSorted && sortDir === 'ascending' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-[#1677E8]" />
                          ) : isSorted && sortDir === 'descending' ? (
                            <ArrowDown className="w-3.5 h-3.5 text-[#1677E8]" />
                          ) : (
                            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </span>
                      </button>
                    ) : (
                      col.label
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-sm text-[#7C899D]"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedRows.map((row) => (
                <tr
                  key={getRowId(row)}
                  className={`hover:bg-[#F8FAFC] transition-colors ${
                    rowClassName ? rowClassName(row) : ''
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-3.5 py-3 align-middle ${
                        col.align === 'right'
                          ? 'text-right'
                          : col.align === 'center'
                          ? 'text-center'
                          : 'text-left'
                      }`}
                    >
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

