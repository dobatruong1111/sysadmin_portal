import { SxProps, Typography, styled } from '@mui/material';
import { 
  createColumnHelper, 
  useReactTable, 
  getCoreRowModel, 
  ColumnDef,
  ColumnHelper,
  CellContext,
  Table,
  TableState,
  RowSelectionState,
  getSortedRowModel,
  TableOptions,
  Updater
} from '@tanstack/react-table';
import { 
  useMemo, 
  ReactNode,
  useState,
  useCallback
} from 'react';
import { MyDatagrid } from './MyDatagrid';
import { MyDatagridProps } from './MyDatagrid';
import { TableFooterComponent } from './TableFooterComponent';
import { MyTablePaginationWrapper } from './MyTablePaginationWrapper';
import { TablePaginationControls, TablePaginationInfo, useTablePagination } from '../../hooks/useTablePagination';
import { MyTableOnRowPerPage } from './MyTableOnRowPerPage';

const StyledTableContainer = styled('div')`
  height: 92%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  margin: 10px;
  border: 1px solid darkgray;
  border-radius: 3px;
`;

const StyledLabel = styled(Typography)`
  width: 225px;
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
  color: black;
  border-bottom: 1px solid #0E8A72;
`;

const DEFAULT_TABLE_ID = 'noname-table';

type TableRecordField<T> = {
  name: keyof T;
  header: string;
  renderHeader?: (header: string) => ReactNode;
  renderCell?: (cell: CellContext<T, any>) => ReactNode;
  columnDefOptions?: Omit<ColumnDef<T>, 'header' | 'footer' | 'cell'>;
}

type TableArbitraryField<T> = {
  getColumnDef: (columnHelper: ColumnHelper<T>) => ColumnDef<T>;
}

export type TableField<T> = 
  | ({type: 'record'} & TableRecordField<T>) | ({type: 'custom'} & TableArbitraryField<T>);

type MyTableProps<T> = {
  tableId?: string,
  tableName: string;
  data?: T[];
  sx?: SxProps;
  tableColumnsDescription: TableField<T>[];
  renderActionsButton?: () => ReactNode;
  myDatagridProps?: Omit<MyDatagridProps<T>, 'table'>;
  showPagination?: boolean;
  renderPagination?: (paginationProps: TablePaginationInfo) => ReactNode;
  paginationControls?: TablePaginationControls;
  manualPagination?: boolean;
  selectedIds?: number[];
  /**
   * If enabled, the table will automatically select the first row
   */
  initialFirstRowSelected?: boolean;
  manualSorting?: boolean;
  TanstackTableOptions?: Omit<TableOptions<T>, 'columns' | 'data' | 'getCoreRowModel'>;
}

export function MyTable<T>(props: MyTableProps<T>) {
  const {
    tableId = DEFAULT_TABLE_ID,
    tableName,
    data = [],
    sx,
    tableColumnsDescription,
    renderActionsButton,
    myDatagridProps,
    showPagination = true,
    renderPagination,
    paginationControls = {},
    manualPagination = true,
    selectedIds = [],
    initialFirstRowSelected = false,
    manualSorting = true,
    TanstackTableOptions
  } = props;
  const columnHelper = useMemo(() => createColumnHelper<T>(), []);
  const columns = useMemo<ColumnDef<T>[]>(() => {
    const columns: ColumnDef<T>[] = [];
    tableColumnsDescription.forEach((item) => {
      const { type } = item;
      switch (type) {
        case 'custom':
          columns.push({...item.getColumnDef(columnHelper)});
          break;
        case 'record':
          columns.push({
            ...(columnHelper.accessor((row: T) => row[item.name], {
              id: item.name as string,
              header: () => item.renderHeader ? item.renderHeader(item.header) : item.header,
              cell: (props) => item.renderCell ? item.renderCell(props) : props.getValue()
            }) as ColumnDef<T>),
            ...item.columnDefOptions
          });
          break;
      }
    })
    return columns;
  }, [columnHelper, tableColumnsDescription]);
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      rowSelection: getInitialRowSelectedState({
        data,
        initialFirstRowSelected,
        selectedIds
      })
    },
    manualPagination,
    manualSorting,
    getRowId: getRowId,
    columnResizeMode: 'onChange',
    ...TanstackTableOptions
  });
  const { paginationProps } = useTableState({
    tableId,
    table,
    paginationControls,
    manualPagination,
    selectedIds
  })

  return (
    <>
      <StyledLabel>{tableName}</StyledLabel>
      <StyledTableContainer>
        <TableFooterComponent
          footerLeftComponent={renderActionsButton && renderActionsButton()}
          footerCenterComponent={
            <MyTablePaginationWrapper
              showPageChanger={showPagination}
              renderPagination={renderPagination}
              paginationProps={paginationProps}
            />
          }
          footerRightComponent={
            <>
              <Typography fontSize='14px' fontWeight='400'>
                Số hàng:
              </Typography>
              <MyTableOnRowPerPage
                rowsPerPage={paginationProps.rowsPerPage}
                onRowsPerPageChange={paginationProps.onRowsPerPageChange}
                rowsPerPageOptions={paginationProps.rowsPerPageOptions}
              />
            </>
          }
        />
        <MyDatagrid 
          tableId={tableId}
          table={table}
          {...myDatagridProps}
        />
      </StyledTableContainer>
    </>
  )
}

const getRowId = <T,>(original: T, index: number) => {
  const org = original as Record<string, unknown>;
  if (org && org.id) {
    return `${org.id}`;
  }
  return `${index}`;
}

const getInitialRowSelectedState = <T,>(options: {
  data: T[],
  initialFirstRowSelected: boolean,
  selectedIds: number[]
}): RowSelectionState => {
  const { data, initialFirstRowSelected, selectedIds } = options;
  if (data && data.length) {
    if (initialFirstRowSelected) {
      return { [getRowId(data[0], 0)]: true };
    }
  }
  return {};
}

const useTableState = <T,>(props: {
  tableId: string;
  table: Table<T>;
  paginationControls: TablePaginationControls;
  manualPagination?: boolean;
  selectedIds: number[]
}) => {
  const {
    tableId = DEFAULT_TABLE_ID,
    table,
    paginationControls,
    manualPagination,
    selectedIds
  } = props;
  const [state, setState] = useState<TableState>(table.initialState);
  const paginationProps = useTablePagination(tableId, paginationControls);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({
    ...table.initialState.rowSelection
  })

  const onRowSelectionChange = useCallback((updater: Updater<RowSelectionState>) => {
    setRowSelection((prevRowState) => {
      let newRowState: RowSelectionState;
      // Update new row state
      if (updater instanceof Function) {
        newRowState = updater(prevRowState);
      } else {
        newRowState = updater;
      }
      return newRowState;
    })
  }, []);

  table.setOptions((prev) => ({
    ...prev,
    state: {
      ...state,
      pagination: manualPagination ? {
        pageIndex: paginationProps.page,
        pageSize: paginationControls.pageSize || 0
      } : undefined,
      rowSelection
    },
    pageCount: paginationProps.pageCount,
    onStateChange: setState,
    onRowSelectionChange
  }))

  return {
    paginationProps
  }
}