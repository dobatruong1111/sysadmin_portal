import { RouteObject, useRoutes } from 'react-router-dom';
import { AdminPaths } from './paths';
import { AdminMain } from './AdminMain';
import { NavBarLayout } from '../../../components/Layout';
import { AdminLayout } from '..';

const adminRoutes: RouteObject[] = [
    {
        path: AdminPaths.Base,
        element: <AdminMain />
    },
    {
        path: AdminPaths.HospitalList,
        element: <div>Hospital List</div>
    }
];

export const AdminRoutes = () => {
    const adminPages = useRoutes(adminRoutes);
    return (
        <NavBarLayout>
            <AdminLayout>{adminPages}</AdminLayout>
        </NavBarLayout>
    );
}

export * from './paths';
