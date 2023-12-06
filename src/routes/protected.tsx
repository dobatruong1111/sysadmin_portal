import { RouteObject, Navigate } from 'react-router-dom';
import { ROUTE_LOGIN } from '../features/auth';
import { ROUTE_ADMIN, AdminRoutes } from '../features/admin';

const App = () => {
    return <Navigate to={ROUTE_LOGIN} />;
}

const mainRoute: RouteObject = {
    path: '/',
    element: <App />
}

export const desktopRoutes: RouteObject[] = [
    {
        path: `${ROUTE_ADMIN}/*`,
        element: <AdminRoutes />
    }
]

export const protectedDesktopRoutes: RouteObject[] = [
    {
        ...mainRoute, 
        children: desktopRoutes
    }
]