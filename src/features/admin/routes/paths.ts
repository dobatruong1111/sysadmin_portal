export enum AdminPaths {
    Base = '/',
    HospitalList = '/hospital-list',
    PacsDomain = '/pacs-domain',
    PacsConnectionAccount = '/pacs-connection-account',
    PropertiesForConfig = '/properties-for-config',
    UserAuthorization = '/role',
    TypeOfScan = '/type-of-scan',
    PartName = '/part-name',
    TypeOfConsumables = '/type-of-consumables',
    TypeOfStatisticalReport = '/type-of-statistical-report',
    ExtendedFunctionality = '/extended-functionality'
}

export const ROUTE_ADMIN = '/admin';
export const ROUTE_ADMIN_HOSPITAL_LIST = `${ROUTE_ADMIN}${AdminPaths.HospitalList}`;
export const ROUTE_ADMIN_PACS_DOMAIN = `${ROUTE_ADMIN}${AdminPaths.PacsDomain}`;
export const ROUTE_ADMIN_PACS_CONNECTION_ACCOUNT = `${ROUTE_ADMIN}${AdminPaths.PacsConnectionAccount}`;
export const ROUTE_ADMIN_PROPERTIES_FOR_CONFIG = `${ROUTE_ADMIN}${AdminPaths.PropertiesForConfig}`;
export const ROUTE_ADMIN_USER_AUTHORIZATION = `${ROUTE_ADMIN}${AdminPaths.UserAuthorization}`;
export const ROUTE_ADMIN_TYPE_OF_SCAN = `${ROUTE_ADMIN}${AdminPaths.TypeOfScan}`;
export const ROUTE_ADMIN_PART_NAME = `${ROUTE_ADMIN}${AdminPaths.PartName}`;
export const ROUTE_ADMIN_TYPE_OF_CONSUMABLES = `${ROUTE_ADMIN}${AdminPaths.TypeOfConsumables}`;
export const ROUTE_ADMIN_TYPE_OF_STATISTICAL_REPORT = `${ROUTE_ADMIN}${AdminPaths.TypeOfStatisticalReport}`;
export const ROUTE_ADMIN_EXTENDED_FUNCTIONALITY = `${ROUTE_ADMIN}${AdminPaths.ExtendedFunctionality}`;