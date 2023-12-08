import { RouteObject, useRoutes } from 'react-router-dom';
import { AdminPaths } from './paths';
import { AdminMain } from './AdminMain';
import { NavBarLayout } from '../../../components/Layout';
import { AdminLayout } from '..';
import { HospitalList } from '../components/hospitalList/HospitalList';
import { PacsDomain } from '../components/pacsDomain/PacsDomain';
import { PacsConnectionAccount } from '../components/pacsConnectionAccount/PacsConnectionAccount';
import { PropertiesForConfig } from '../components/propertiesForConfig/PropertiesForConfig';
import { UserAuthorization } from '../components/userAuthorization/UserAuthorization';
import { TypeOfScan } from '../components/typeOfScan/TypeOfScan';
import { PartName } from '../components/partName/PartName';
import { TypeOfConsumables } from '../components/typeOfConsumables/TypeOfConsumables';
import { TypeOfStatisticalReport } from '../components/typeOfStatisticalReport/TypeOfStatisticalReport';
import { ExtendedFunctionality } from '../components/extendedFunctionality/ExtendedFunctionality';

const adminRoutes: RouteObject[] = [
    {
        path: AdminPaths.Base,
        element: <AdminMain />
    },
    {
        path: AdminPaths.HospitalList,
        element: <HospitalList />
    },
    {
        path: AdminPaths.PacsDomain,
        element: <PacsDomain />
    },
    {
        path: AdminPaths.PacsConnectionAccount,
        element: <PacsConnectionAccount />
    },
    {
        path: AdminPaths.PropertiesForConfig,
        element: <PropertiesForConfig />
    },
    {
        path: AdminPaths.UserAuthorization,
        element: <UserAuthorization />
    },
    {
        path: AdminPaths.TypeOfScan,
        element: <TypeOfScan />
    },
    {
        path: AdminPaths.PartName,
        element: <PartName />
    },
    {
        path: AdminPaths.TypeOfConsumables,
        element: <TypeOfConsumables />
    },
    {
        path: AdminPaths.TypeOfStatisticalReport,
        element: <TypeOfStatisticalReport />
    },
    {
        path: AdminPaths.ExtendedFunctionality,
        element: <ExtendedFunctionality />
    }
];

export const AdminRoutes = () => {
    const adminPages = useRoutes(adminRoutes);
    return (
        <NavBarLayout>
            <AdminLayout>{adminPages}</AdminLayout>
        </NavBarLayout>
    );
}

export * from './paths';
