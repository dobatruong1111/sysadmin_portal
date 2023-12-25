import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { AdminPaths } from './paths';
import { AdminMain } from './AdminMain';
import { NavBarLayout } from '../../../components/Layout';
import { AdminLayout } from '..';
import { PacsConnectionAccount } from '../components/pacsConnectionAccount/PacsConnectionAccount';
import { Page } from '../../../components/Page';
import { AdminUserAuthor } from './userAuthor/AdminUserAuthor';
import { AdminModalityTypeName } from './modalityTypeName/AdminModalityTypeName';
import { AdminConsumableType } from './consumableType/AdminConsumableType';
import { AdminBodyPart } from './bodyPart/AdminBodyPart';
import { AdminExtensionType } from './extensionType/AdminExtensionType';
import { AdminHospital } from './hospital/AdminHospital';
import { AdminDomain } from './domain/AdminDomain';
import { AdminConfigAttribute } from './configAttribute/AdminConfigAttribute';
import { ROUTE_LOGIN } from '../../auth';
import { AdminStatisticsType } from './statisticsType/AdminStatisticsType';

const adminRoutes: RouteObject[] = [
    {
        path: AdminPaths.Base,
        element: <AdminMain />
    },
    {
        path: AdminPaths.Hospital,
        element: <Page title='Danh sách Bệnh viện'><AdminHospital /></Page>
    },
    {
        path: AdminPaths.Domain,
        element: <Page title='Tên miền PACS'><AdminDomain /></Page>
    },
    {
        path: AdminPaths.ConnectionAccount,
        element: <Page title='Tài khoản kết nối PACS'><PacsConnectionAccount /></Page>
    },
    {
        path: AdminPaths.ConfigAttribute,
        element: <Page title='Thuộc tính cho cấu hình'><AdminConfigAttribute /></Page>
    },
    {
        path: AdminPaths.UserAuthorization,
        element: <Page title='Phân quyền người dùng'><AdminUserAuthor /></Page>
    },
    {
        path: AdminPaths.ModalityTypeName,
        element: <Page title='Tên loại ca chụp'><AdminModalityTypeName /></Page>
    },
    {
        path: AdminPaths.BodyPart,
        element: <Page title='Tên bộ phận chụp'><AdminBodyPart /></Page>
    },
    {
        path: AdminPaths.ConsumableType,
        element: <Page title='Loại vật tư tiêu hao'><AdminConsumableType /></Page>
    },
    {
        path: AdminPaths.StatisticsType,
        element: <Page title='Loại báo cáo thống kê'><AdminStatisticsType /></Page>
    },
    {
        path: AdminPaths.ExtensionType,
        element: <Page title='Chức năng mở rộng'><AdminExtensionType /></Page>
    }
];

export const AdminRoutes = () => {
    const storedUsername = localStorage.getItem('username');
    const adminPages = useRoutes(adminRoutes);
    return storedUsername ? (
        <NavBarLayout>
            <AdminLayout>
                {adminPages}
            </AdminLayout>
        </NavBarLayout>
    ) : (
        <Navigate to={ROUTE_LOGIN} />
    );
}

export * from './paths';
