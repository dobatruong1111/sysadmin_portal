import { publicRoutes } from './public';
import { useRoutes } from 'react-router-dom';
import { mainRoute } from './protected';

export const AppRoutes = () => {
    const pacsRoutes = [mainRoute, ...publicRoutes];
    const element = useRoutes([...pacsRoutes]);
    return <>{element}</>;
}