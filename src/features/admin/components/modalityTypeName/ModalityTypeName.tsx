import { useMemo } from 'react';
import { MyTable, TableField } from '../../../../components/Table/MyTable';
import { ModalityTypeNameDTO } from '../../../../types/dto/modalityTypeName';
import { TABLE_MODALITY_TYPE_NAME } from '../../../../stores/table/tableInitialState';
import { AdminTableActionButtons } from '../../../../components/Admin/AdminTableActionButtons';
import { useDispatch, useSelector } from 'react-redux';
import { useGetModalityTypeNameListQuery } from '../../api/apiModalityTypeName';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { useAdminFunctions } from '../../../../providers/admin/AdminProvider';

export const ModalityTypeName = () => {
  const dispatch = useDispatch();
  const query = useSelector(
    (state: any) => state.tableReducer.data[TABLE_MODALITY_TYPE_NAME].query
  );

  const adminFunctions = useAdminFunctions();

  const { data, isFetching, refetch } = useGetModalityTypeNameListQuery(query);

  const tableColumns = useMemo<TableField<ModalityTypeNameDTO>[]>(
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
        header: 'Tên loại ca',
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
      },
    ],
    []
  );

  return (
    <MyTable
      tableId={TABLE_MODALITY_TYPE_NAME}
      tableName="Tên loại ca chụp"
      data={data?.list}
      tableColumnsDescription={tableColumns}
      renderActionsButton={() => (
        <AdminTableActionButtons
          tableId={TABLE_MODALITY_TYPE_NAME}
          refetch={refetch}
        />
      )}
      myDatagridProps={{
        tableId: TABLE_MODALITY_TYPE_NAME,
        isLoading: isFetching,
        onRowClick: (_e, row, _table) => {
          dispatch(
            setSelectedRow({
              tableId: TABLE_MODALITY_TYPE_NAME,
              selectedRow: row.original,
            })
          );
        },
        onRowDoubleClick: (_e, row, _table) => {
          dispatch(
            setSelectedRow({
              tableId: TABLE_MODALITY_TYPE_NAME,
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
