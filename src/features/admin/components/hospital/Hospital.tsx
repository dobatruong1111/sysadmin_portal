import { useDispatch, useSelector } from "react-redux"
import { TABLE_HOSPITAL } from "../../../../stores/table/tableInitialState";
import { useGetHospitalListQuery } from "../../api/apiHospital";
import { skipToken } from "@reduxjs/toolkit/query";
import { useMemo } from "react";
import { MyTable, TableField } from "../../../../components/Table/MyTable";
import { HospitalDTO, HospitalDTOBase } from "../../../../types/dto/hospital";
import { AdminTableActionButtons } from "../../../../components/Admin/AdminTableActionButtons";
import { setSelectedRow } from "../../../../stores/table/tableSlice";

export const Hospital = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: any) => state.tableReducer.data[TABLE_HOSPITAL].query);
  const { data, isFetching, refetch } = useGetHospitalListQuery(query || skipToken);

  const tableColumns = useMemo<TableField<HospitalDTO>[]>(() => [
    {
      type: 'custom',
      getColumnDef: (columnHelper) => columnHelper.display({
        id: 'stt',
        header: 'STT',
        cell: (props) => <div style={{textAlign: 'center'}}>{props.row.index + 1}</div>,
        size: 50
      })
    },
    {
      type: 'record',
      name: 'id',
      header: 'ID',
      renderHeader: (header) => <div>{header}</div>,
      renderCell: (cell) => <div>{cell.getValue()}</div>,
      columnDefOptions: {
        size: 50
      }
    },
    {
      type: 'record',
      name: 'name',
      header: 'Tên bệnh viện',
      renderHeader: (header) => <div>{header}</div>,
      renderCell: (cell) => <div style={{textAlign: 'center'}}>{cell.getValue()}</div>,
      columnDefOptions: {
        size: 300
      }
    },
    {
      type: 'record',
      name: 'description',
      header: 'Mô tả',
      renderHeader: (header) => <div>{header}</div>,
      renderCell: (cell) => <div>{cell.getValue()}</div>,
      columnDefOptions: {
        size: 300
      }
    },
    {
      type: 'record',
      name: 'phone',
      header: 'Số điện thoại',
      renderHeader: (header) => <div>{header}</div>,
      renderCell: (cell) => <div>{cell.getValue()}</div>,
      columnDefOptions: {
        size: 300
      }
    },
    {
      type: 'record',
      name: 'email',
      header: 'Địa chỉ email',
      renderHeader: (header) => <div>{header}</div>,
      renderCell: (cell) => <div>{cell.getValue()}</div>,
      columnDefOptions: {
        size: 300
      }
    },
    {
      type: 'record',
      name: 'address',
      header: 'Địa chỉ',
      renderHeader: (header) => <div>{header}</div>,
      renderCell: (cell) => <div>{cell.getValue()}</div>,
      columnDefOptions: {
        size: 300
      }
    },
    {
      type: 'record',
      name: 'enabled',
      header: 'Ưu tiên',
      renderHeader: (header) => <div>{header}</div>,
      renderCell: (cell) => <div style={{textAlign: 'center'}}>{cell.getValue() ? 'Ưu tiên' : 'Không'}</div>,
      columnDefOptions: {
        size: 300
      }
    }
  ], []);

  return (
    <MyTable
      tableId={TABLE_HOSPITAL}
      tableName="Danh sách bệnh viện"
      data={data?.list}
      tableColumnsDescription={tableColumns}
      renderActionsButton={() => (
        <AdminTableActionButtons
          tableId={TABLE_HOSPITAL}
          refetch={refetch}
        />
      )}
      myDatagridProps={{
        tableId: TABLE_HOSPITAL,
        isLoading: isFetching,
        onRowClick: (e, row, table) => {
          dispatch(setSelectedRow({
            tableId: TABLE_HOSPITAL,
            selectedRow: row.original
          }))
        }
      }}
      paginationControls={{
        totalRecords: data?.meta.totalRecords,
        pageSize: data?.list.length
      }}
      TanstackTableOptions={{
        enableRowSelection: true,
        enableMultiRowSelection: false
      }}
    />
  )
}
