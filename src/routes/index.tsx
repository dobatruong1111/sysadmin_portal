import {  useRoutes, RouteObject } from 'react-router-dom';
import { AuthRoutes, ROUTE_AUTH } from '../features/auth';
import { AdminRoutes, ROUTE_ADMIN } from '../features/admin';
import { RedirectToLogin } from './RedirectToLogin';

export const AppRoutes = () => {
    const appRoutes: RouteObject[] = [
        {
            path: '/*',
            element: <RedirectToLogin />
        },
        {
            path: `${ROUTE_AUTH}/*`,
            element: <AuthRoutes/>,
        },
        {
            path: `${ROUTE_ADMIN}/*`,
            element: <AdminRoutes />
        }
    ];
    const element = useRoutes(appRoutes);
    return <>{element}</>;
}