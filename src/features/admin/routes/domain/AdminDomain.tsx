import { useEffect } from "react"
import { AdminProvider } from "../../../../providers/admin/AdminProvider"
import { Domain } from "../../components/Domain/Domain"
import { ConnectedDomainCreateModal } from "../../components/Domain/DomainCreateModal"
import { useDispatch } from "react-redux"
import { setSelectedRow } from "../../../../stores/table/tableSlice"
import { TABLE_DOMAIN } from "../../../../stores/table/tableInitialState"
import { ConnectedDomainEditModal } from "../../components/Domain/DomainEditModal"

export const AdminDomain = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Clean function
        return () => {
            dispatch(setSelectedRow({
                tableId: TABLE_DOMAIN,
                selectedRow: null
            }))
        }
    }, []);

    return (
        <AdminProvider>
            <Domain />
            <ConnectedDomainCreateModal />
            <ConnectedDomainEditModal />
        </AdminProvider>
    )
}
