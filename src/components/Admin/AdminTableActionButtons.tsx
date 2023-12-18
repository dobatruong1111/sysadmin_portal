import { TableActionButtonsShell } from "../Table/TableActionButtonsShell";
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MyIconButtonWithTooltip } from "../Buttons/MyIconButtonWithTooltip";
import { useAdminFunctions } from "../../providers/admin/AdminProvider";

type AdminTableActionButtonsProps = {
    tableId: string;
    disabled: boolean;
    refetch?: () => void; 
}

export function AdminTableActionButtons(props: AdminTableActionButtonsProps) {
    const { 
        tableId,
        disabled,
        refetch
    } = props;
    const adminFunctions = useAdminFunctions();
    
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
                        disabled={disabled}
                        onClick={() => adminFunctions.openEditModal()}
                    >
                        <EditIcon />
                    </MyIconButtonWithTooltip>
                    <MyIconButtonWithTooltip
                        title="Xóa"
                        disabled={disabled}
                        onClick={() => adminFunctions.submitDelete()}
                    >
                        <DeleteIcon />
                    </MyIconButtonWithTooltip>
                </>
            }
        />
    )
}
