import { Navigate } from "react-router-dom"
import { ROUTE_ADMIN_USER_TYPE } from ".";

export const AdminMain = () => {
    return <Navigate to={ROUTE_ADMIN_USER_TYPE}/>
}