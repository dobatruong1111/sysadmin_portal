import { publicRoutes } from './public';
import { useRoutes } from 'react-router-dom';
import { protectedDesktopRoutes, desktopRoutes } from './protected';

export const AppRoutes = () => {
    const pacsRoutes = [...publicRoutes, ...desktopRoutes];
    const element = useRoutes([...pacsRoutes]);
    return <>{element}</>;
}