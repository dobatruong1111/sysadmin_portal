import { RouteObject, Navigate } from 'react-router-dom';
import { ROUTE_LOGIN } from '../features/auth';

const App = () => {
    return <Navigate to={ROUTE_LOGIN} />;
}

export const mainRoute: RouteObject = {
    path: '/',
    element: <App />
}