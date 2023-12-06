import { RouteObject, useRoutes } from 'react-router-dom';
import { AdminPaths } from './paths';
import { AdminMain } from './AdminMain';
import { NavBarLayout } from '../../../components/Layout';

const adminRoutes: RouteObject[] = [
    {
        path: AdminPaths.Base,
        element: <AdminMain />
    },
    {
        path: AdminPaths.UserType,
        element: <></>
    }
];

export const AdminRoutes = () => {
    const adminPages = useRoutes(adminRoutes);
    return (
        <NavBarLayout>
            {adminPages}
        </NavBarLayout>
    );
}

export * from './paths';
