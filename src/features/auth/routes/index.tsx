import { RouteObject } from 'react-router-dom';
import { Login } from './Login';
import { useRoutes } from 'react-router-dom';
import { AuthPaths } from '..';

export const AuthRoutes = () => {
    const loginRoutes: RouteObject[] = [
        {
            path: AuthPaths.Login, 
            element: <Login />
        }
    ];
    const elements = useRoutes(loginRoutes);
    return <>{elements}</>;
};

export * from './paths';