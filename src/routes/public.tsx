import { RouteObject } from 'react-router-dom';
import { ROUTE_AUTH } from '../features/auth';
import { AuthRoutes } from '../features/auth';

export const publicRoutes: RouteObject[] = [
    {
        path: `${ROUTE_AUTH}/*`,
        element: <AuthRoutes/>,
    }
];