import { useEffect } from "react"
import { AdminProvider } from "../../../../providers/admin/AdminProvider"
import { Domain } from "../../components/Domain/Domain"
import { ConnectedDomainCreateModal } from "../../components/Domain/DomainCreateModal"
import { useDispatch } from "react-redux"
import { setSelectedRow } from "../../../../stores/table/tableSlice"
import { TABLE_DOMAIN } from "../../../../stores/table/tableInitialState"

export const AdminDomain = () => {
    const dispatch = useDispatch();

    useEffect(() => {
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
        </AdminProvider>
    )
}
