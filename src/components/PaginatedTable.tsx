import { useMemo, useState } from 'react';

interface Column<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    render?: (item: T) => React.ReactNode;
    width?: string; // exemplo: '150px', '20%', etc.
}

interface PaginatedTableProps<T> {
    data: T[];
    columns: Column<T>[];
    searchKeys?: (keyof T)[];
    pageSize?: number;
}

export function PaginatedTable<T extends object>({
    data,
    columns,
    searchKeys = [],
    pageSize = 10,
}: PaginatedTableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState<keyof T | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const filteredData = useMemo(() => {
        return data.filter((item) =>
            searchKeys.some((key) =>
                String(item[key]).toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, data, searchKeys]);

    const sortedData = useMemo(() => {
        if (!sortKey) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];
            if (aVal === bVal) return 0;
            return (aVal > bVal ? 1 : -1) * (sortOrder === 'asc' ? 1 : -1);
        });
    }, [filteredData, sortKey, sortOrder]);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return sortedData.slice(start, start + pageSize);
    }, [sortedData, currentPage, pageSize]);

    const totalPages = Math.ceil(filteredData.length / pageSize);

    const handleSort = (key: keyof T) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 p-2 border rounded w-full max-w-sm"
            />

            <table className="w-full border table-auto">
                <thead>
                    <tr className="bg-gray-100">
                        {columns.map((col) => (
                            <th
                                key={String(col.key)}
                                className="p-2 border cursor-pointer"
                                onClick={() => col.sortable && handleSort(col.key as keyof T)}
                                style={col.width ? { width: col.width } : undefined}
                            >
                                {col.label}
                                {col.sortable && sortKey === col.key && (
                                    <span>{sortOrder === 'asc' ? ' ↑' : ' ↓'}</span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            {columns.map((col) => (
                                <td
                                    key={String(col.key)}
                                    className="p-2 border"
                                    style={col.width ? { width: col.width } : undefined}
                                >
                                    {col.render ? col.render(item) : String(item[col.key as keyof T])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4 flex-wrap gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                        return (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                        );
                    })
                    .reduce<(number | string)[]>((acc, page, idx, arr) => {
                        if (idx > 0 && typeof arr[idx - 1] === 'number' && page - (arr[idx - 1] as number) > 1) {
                            acc.push('...');
                        }
                        acc.push(page);
                        return acc;
                    }, [])
                    .map((item, index) =>
                        item === '...' ? (
                            <span key={index} className="px-3 py-1 text-gray-500 select-none">...</span>
                        ) : (
                            <button
                                key={item}
                                onClick={() => setCurrentPage(item as number)}
                                className={`px-3 py-1 rounded border ${currentPage === item
                                    ? 'bg-blue-600 text-white font-bold'
                                    : 'bg-white text-gray-800'
                                    }`}
                            >
                                {item}
                            </button>
                        )
                    )}
            </div>
        </div>
    );
}


