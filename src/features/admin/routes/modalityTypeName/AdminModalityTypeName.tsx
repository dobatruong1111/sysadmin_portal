import { AdminProvider } from "../../../../providers/admin/AdminProvider"
import { ModalityTypeName } from "../../components/modalityTypeName/ModalityTypeName"
import { ConnectedModalityTypeNameCreateModal } from "../../components/modalityTypeName/ModalityTypeNameCreateModal"
import { ConnectedModalityTypeNameEditModal } from "../../components/modalityTypeName/ModalityTypeNameEditModal"

export const AdminModalityTypeName = () => {
    return (
        <AdminProvider>
            <ModalityTypeName />
            <ConnectedModalityTypeNameCreateModal />
            <ConnectedModalityTypeNameEditModal />
        </AdminProvider>
    )
}