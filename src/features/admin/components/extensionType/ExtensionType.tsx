import { useDispatch, useSelector } from 'react-redux';
import { TABLE_EXTENSION_TYPE } from '../../../../stores/table/tableInitialState';
import { useGetExtensionTypeListQuery } from '../../api/apiExtensionType';
import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';
import { MyTable, TableField } from '../../../../components/Table/MyTable';
import { ExtensionTypeDTO } from '../../../../types/dto/extensionType';
import { AdminTableActionButtons } from '../../../../components/Admin/AdminTableActionButtons';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { useAdminFunctions } from '../../../../providers/admin/AdminProvider';

export const ExtensionType = () => {
  const dispatch = useDispatch();
  const query = useSelector(
    (state: any) => state.tableReducer.data[TABLE_EXTENSION_TYPE].query
  );
  const { data, isFetching, refetch } = useGetExtensionTypeListQuery(
    query || skipToken
  );

  const adminFunctions = useAdminFunctions();

  const tableColumns = useMemo<TableField<ExtensionTypeDTO>[]>(
    () => [
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'stt',
            header: 'STT',
            cell: (props) => (
              <div style={{ textAlign: 'center' }}>{props.row.index + 1}</div>
            ),
            minSize: 50,
            maxSize: 50,
          }),
      },
      {
        type: 'record',
        name: 'id',
        header: 'ID',
        renderHeader: (header) => <div>{header}</div>,
        renderCell: (cell) => (
          <div style={{ textAlign: 'center' }}>{cell.getValue()}</div>
        ),
        columnDefOptions: {
          size: 250,
        },
      },
      {
        type: 'record',
        name: 'name',
        header: 'Tên chức năng mở rộng',
        renderHeader: (header) => <div>{header}</div>,
        renderCell: (cell) => (
          <div style={{ textAlign: 'center' }}>{cell.getValue()}</div>
        ),
        columnDefOptions: {
          size: 300,
        },
      },
      {
        type: 'record',
        name: 'description',
        header: 'Mô tả',
        renderHeader: (header) => <div>{header}</div>,
        renderCell: (cell) => (
          <div style={{ textAlign: 'center' }}>{cell.getValue()}</div>
        ),
        columnDefOptions: {
          size: 460,
        },
      }
    ],
    []
  );

  return (
    <MyTable
      tableId={TABLE_EXTENSION_TYPE}
      tableName="Chức năng mở rộng"
      data={data?.list}
      tableColumnsDescription={tableColumns}
      renderActionsButton={() => (
        <AdminTableActionButtons
          tableId={TABLE_EXTENSION_TYPE}
          refetch={refetch}
        />
      )}
      myDatagridProps={{
        tableId: TABLE_EXTENSION_TYPE,
        isLoading: isFetching,
        onRowClick: (_e, row, _table) => {
          dispatch(
            setSelectedRow({
              tableId: TABLE_EXTENSION_TYPE,
              selectedRow: row.original,
            })
          );
        },
        onRowDoubleClick: (_e, row, _table) => {
          dispatch(
            setSelectedRow({
              tableId: TABLE_EXTENSION_TYPE,
              selectedRow: row.original,
            })
          );
          adminFunctions.openEditModal();
        },
      }}
      paginationControls={{
        totalRecords: data?.meta.totalRecords,
        pageSize: data?.list.length,
      }}
      TanstackTableOptions={{
        enableRowSelection: true,
        enableMultiRowSelection: false,
      }}
    />
  );
};
