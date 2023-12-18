import { AdminProvider } from "../../../../providers/admin/AdminProvider";
import { UserAuthorization } from "../../components/userAuthorization/UserAuthorization";
import { ConnectedAuthorCreateModal } from "../../components/userAuthorization/UserAuthorCreateModal";
import { ConnectedUserAuthorEditModal } from "../../components/userAuthorization/UserAuthorEditModal";

export const AdminUserAuthor = () => {
  return (
    <AdminProvider>
      <UserAuthorization />
      <ConnectedAuthorCreateModal />
      <ConnectedUserAuthorEditModal />
    </AdminProvider>
  )
}
