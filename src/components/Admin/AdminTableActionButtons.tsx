import { TableActionButtonsShell } from "../Table/TableActionButtonsShell";
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MyIconButtonWithTooltip } from "../Buttons/MyIconButtonWithTooltip";
import { useAdminFunctions } from "../../providers/admin/AdminProvider";
import { useSelector } from "react-redux";

type AdminTableActionButtonsProps = {
    tableId: string;
    refetch?: () => void;
}

export function AdminTableActionButtons(props: AdminTableActionButtonsProps) {
    const { 
        tableId,
        refetch
    } = props;
    const adminFunctions = useAdminFunctions();
    const selectedRow = useSelector((state: any) => state.tableReducer.data[tableId].selection.selectedRow);
    
    return (
        <TableActionButtonsShell
            actionsButton={
                <>
                    {refetch && (
                        <MyIconButtonWithTooltip
                            title="Mới"
                            onClick={refetch}
                        >
                            <RefreshIcon />
                        </MyIconButtonWithTooltip>
                    )}
                    <MyIconButtonWithTooltip
                        title="Thêm"
                        onClick={() => adminFunctions.openCreateModal()}
                    >
                        <AddIcon />
                    </MyIconButtonWithTooltip>
                    <MyIconButtonWithTooltip
                        title="Sửa"
                        disabled={selectedRow === null}
                        onClick={() => adminFunctions.openEditModal()}
                    >
                        <EditIcon />
                    </MyIconButtonWithTooltip>
                    <MyIconButtonWithTooltip
                        title="Xóa"
                        disabled={selectedRow === null}
                        onClick={() => adminFunctions.submitDelete()}
                    >
                        <DeleteIcon />
                    </MyIconButtonWithTooltip>
                </>
            }
        />
    )
}
