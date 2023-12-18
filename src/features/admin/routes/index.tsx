import { RouteObject, useRoutes } from 'react-router-dom';
import { AdminPaths } from './paths';
import { AdminMain } from './AdminMain';
import { NavBarLayout } from '../../../components/Layout';
import { AdminLayout } from '..';
import { HospitalList } from '../components/hospitalList/HospitalList';
import { PacsDomain } from '../components/pacsDomain/PacsDomain';
import { PacsConnectionAccount } from '../components/pacsConnectionAccount/PacsConnectionAccount';
import { PropertiesForConfig } from '../components/propertiesForConfig/PropertiesForConfig';
import { TypeOfScan } from '../components/typeOfScan/TypeOfScan';
import { PartName } from '../components/partName/PartName';
import { TypeOfConsumables } from '../components/typeOfConsumables/TypeOfConsumables';
import { TypeOfStatisticalReport } from '../components/typeOfStatisticalReport/TypeOfStatisticalReport';
import { ExtendedFunctionality } from '../components/extendedFunctionality/ExtendedFunctionality';
import { Page } from '../../../components/Page';
import { AdminUserAuthor } from './AdminUserAuthor';

const adminRoutes: RouteObject[] = [
    {
        path: AdminPaths.Base,
        element: <AdminMain />
    },
    {
        path: AdminPaths.HospitalList,
        element: <Page title='Danh sách Bệnh viện'><HospitalList /></Page>
    },
    {
        path: AdminPaths.PacsDomain,
        element: <Page title='Tên miền PACS'><PacsDomain /></Page>
    },
    {
        path: AdminPaths.PacsConnectionAccount,
        element: <Page title='Tài khoản kết nối PACS'><PacsConnectionAccount /></Page>
    },
    {
        path: AdminPaths.PropertiesForConfig,
        element: <Page title='Thuộc tính cho cấu hình'><PropertiesForConfig /></Page>
    },
    {
        path: AdminPaths.UserAuthorization,
        element: <Page title='Phân quyền người dùng'><AdminUserAuthor /></Page>
    },
    {
        path: AdminPaths.TypeOfScan,
        element: <Page title='Tên loại ca chụp'><TypeOfScan /></Page>
    },
    {
        path: AdminPaths.PartName,
        element: <Page title='Tên bộ phận chụp'><PartName /></Page>
    },
    {
        path: AdminPaths.TypeOfConsumables,
        element: <Page title='Loại vật tư tiêu hao'><TypeOfConsumables /></Page>
    },
    {
        path: AdminPaths.TypeOfStatisticalReport,
        element: <Page title='Loại báo cáo thống kê'><TypeOfStatisticalReport /></Page>
    },
    {
        path: AdminPaths.ExtendedFunctionality,
        element: <Page title='Chức năng mở rộng'><ExtendedFunctionality /></Page>
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
