import { SxProps } from '@mui/material';
import { 
  createColumnHelper, 
  useReactTable, 
  getCoreRowModel, 
  ColumnDef
} from '@tanstack/react-table';
import { useMemo } from 'react';

type MyTableProps<T> = {
  data?: T[];
  sx?: SxProps;
}

export function MyTable<T>(props: MyTableProps<T>) {
  const {
    data = [],
    sx
  } = props;
  const columnHelper = useMemo(() => createColumnHelper<T>(), []);
  const columns = useMemo(() => {
    const columns: ColumnDef<T>[] = [];
    
    return [];
  }, []);
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div>MyTable</div>
  )
}