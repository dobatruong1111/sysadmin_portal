import {  useRoutes, RouteObject } from 'react-router-dom';
import { AuthRoutes, ROUTE_AUTH } from '../features/auth';
import { RedirectToLogin } from './RedirectToLogin';

export const AppRoutes = () => {
    const appRoutes: RouteObject[] = [
        {
            path: '/*',
            element: <RedirectToLogin />
        },
        {
            path: `${ROUTE_AUTH}/*`,
            element: <AuthRoutes />,
        }
    ];
    const element = useRoutes(appRoutes);
    return <>{element}</>;
}