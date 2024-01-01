import { FC } from "react";
import { TABLE_HOSPITAL } from "../../../../stores/table/tableInitialState";
import { useSelector } from "react-redux";
import { CloseableCollapsiblePanel } from "../../../../components/Surfaces/CollapsiblePanel";
import { ConfigAttribute } from "../configAttribute/ConfigAttribute";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import { AdminConfigAttribute } from "../../routes/configAttribute/AdminConfigAttribute";

export const HospitalContributePanel: FC = () => {
    const selectedRow = useSelector(
        (state: any) =>
            state.tableReducer.data[TABLE_HOSPITAL].selection.selectedRow
    );
    const { isOpen, open, close } = useDisclosure(true);

    if (!selectedRow) return <></>;
    return (
        <CloseableCollapsiblePanel
            initialExpanded={isOpen}
            onExpand={open}
            onCollapse={close}
            onClose={close}
            title={selectedRow?.name}
        >
            <AdminConfigAttribute />
        </CloseableCollapsiblePanel>
    )
}