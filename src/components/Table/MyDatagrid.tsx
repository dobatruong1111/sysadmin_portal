import { Row, Table, flexRender } from '@tanstack/react-table';
import { styled, darken, LinearProgress } from '@mui/material';
import { MouseEvent, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { TABLE_USER_AUTHOR } from '../../stores/table/tableInitialState';
import { Box } from '@mui/system';

const StyledDatagridContainer = styled('div')`
    overflow: auto;
    height: 100%;
    background-color: white;
    & > table {
        min-width: 100%;
        border-collapse: collapse;
        position: relative;
        width: 100%;
        & thead {
            background-color: #c8e3de;
        }
        & th {
            border: 1px solid darkgrey;
            font-size: 14px;
            font-weight: 500;
            padding: 4px;
            position: relative;
        }
    }
`;

const StyledTBody = styled('tbody')`
    & > tr {
        cursor: pointer;
        &:hover {
            background-color: ${(props) => darken(props.theme.palette.primary.contrastText, 0.1)};
        }
        & td {
            border: 1px solid darkgrey;
            padding: 4px;
            font-size: 13px;
            font-weight: 400;
        }
    }
`;

export type MyDatagridProps<T> = {
    tableId?: string;
    table: Table<T>;
    onRowClick?: (e: MouseEvent<HTMLTableRowElement>, row: Row<T>, table: Table<T>) => void;
    onRowDoubleClick?: (
        e: MouseEvent<HTMLTableRowElement>,
        row: Row<T>,
        table: Table<T>,
    ) => void;
    isLoading?: boolean
}

export function MyDatagrid<T>(props: MyDatagridProps<T>) {
    const { 
        tableId, 
        table, 
        onRowClick,
        onRowDoubleClick,
        isLoading
    } = props;
    const [rowIdSelected, SetRowIdSelected] = useState<string>('');
    const rowSelected = useSelector((state: any) => state.tableReducer);
    
    const rowLeftClickHandler = useCallback((e: MouseEvent<HTMLTableRowElement>, row: Row<T>) => {
        SetRowIdSelected(row.id);
        switch (e.detail) {
            case 1: {
                if (!row.getIsSelected() && !e.shiftKey) row.toggleSelected();
                onRowClick && onRowClick(e, row, table);
                break;
            }
            case 2: {
                onRowDoubleClick && onRowDoubleClick(e, row, table);
                break;
            }
        }
    }, [onRowClick, onRowDoubleClick, table]);

    return (
        <StyledDatagridContainer id={tableId}>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                    {isLoading && (
                        <tr>
                            <td style={{ padding: 0 }}>
                                <Box sx={{ width: '100%', position: 'absolute' }}>
                                    <LinearProgress />
                                </Box>
                            </td>
                        </tr>
                    )}
                </thead>
                <StyledTBody>
                    {table.getRowModel().rows.map((row) => (
                        <tr 
                            key={row.id}
                            className={row.getIsSelected() ? 'selected' : ''}
                            onClick={(e) => rowLeftClickHandler(e, row)}
                            style={{backgroundColor: row.id == rowIdSelected && rowSelected.data[TABLE_USER_AUTHOR].selection.selectedRow != null ? '#c8e3de' : 'white'}}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </StyledTBody>
            </table>
        </StyledDatagridContainer>
    )
}
