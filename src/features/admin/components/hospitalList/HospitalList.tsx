import { useMemo, useState } from "react";
import { 
  createColumnHelper,
  useReactTable,
  flexRender,
  getCoreRowModel
} from "@tanstack/react-table";

type Departments = {
  name: string;
  code: string;
  under: string;
  status: boolean;
}

const columnHelper = createColumnHelper<Departments>();

export const HospitalList = () => {
  const [data, setData] = useState<Departments[]>([
    {
      name: 'Chẩn Đoán Hình Ảnh',
      code: 'CDHA',
      under: '',
      status: true
    },
    {
      name: 'Công Nghệ Thông Tin',
      code: 'CNTT',
      under: '',
      status: true
    }
  ]);
  const tableColumns = useMemo(() => [
    columnHelper.display({
      header: "ID",
      cell: props => props.row.index
    }),
    columnHelper.accessor('name', {
      header: 'Tên Khoa',
      cell: props => props.getValue()
    }),
    columnHelper.accessor('code', {
      header: 'Mã Khoa',
      cell: props => props.getValue()
    }),
    columnHelper.accessor('under', {
      header: 'Trực Thuộc',
      cell: props => props.getValue()
    }),
    columnHelper.accessor('status', {
      header: 'Trạng Thái',
      cell: props => props.getValue() ? 'Hoạt động' : 'Không hoạt động'
    })
  ], []);
  const table = useReactTable({
    data: data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}