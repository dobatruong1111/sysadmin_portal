import { RouteObject } from 'react-router-dom';
import { AuthPaths } from './paths';
import { Login } from './Login';
import { useRoutes } from 'react-router-dom';

const loginRoutes: RouteObject[] = [
    {
        path: AuthPaths.Login,
        element: <Login />
    }
];

export const AuthRoutes = () => {
    const elements = useRoutes(loginRoutes);
    return <>{elements}</>;
};

export * from './paths';
