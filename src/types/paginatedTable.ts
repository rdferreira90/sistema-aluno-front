export interface Column<T> {
    key: keyof T;
    label: string;
    render?: (item: T) => React.ReactNode;
  }
  
  export interface PaginatedTableProps<T> {
    data: T[];
    columns: Column<T>[];
    pageSize?: number;
    filterPlaceholder?: string;
  }
  