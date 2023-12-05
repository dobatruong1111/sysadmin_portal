import { RouteObject, useRoutes } from 'react-router-dom';
import { AdminPaths } from './paths';
import { AdminMain } from './AdminMain';
import AdminLayout from '../components/AdminLayout';

const adminRoutes: RouteObject[] = [
    {
        path: AdminPaths.Base,
        element: <AdminMain />
    },
    {
        path: AdminPaths.UserType,
        element: <AdminLayout />
    }
];

export const AdminRoutes = () => {
    const adminPages = useRoutes(adminRoutes);
    return <>{adminPages}</>;
}

export * from './paths';
