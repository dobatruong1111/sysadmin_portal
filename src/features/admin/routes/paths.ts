export enum AdminPaths {
    Base = '/',
    HospitalList = '/hospital-list',
    PacsDomain = '/pacs-domain',
    PacsConnectionAccount = '/pacs-connection-account',
    PropertiesForConfig = '/properties-for-config',
    UserAuthorization = '/role',
    ModalityTypeName = '/modalityTypeName',
    BodyPart = '/bodyPart',
    ConsumableType = '/consumableType',
    TypeOfStatisticalReport = '/type-of-statistical-report',
    ExtendedFunctionality = '/extended-functionality'
}

export const ROUTE_ADMIN = '/admin';
export const ROUTE_ADMIN_HOSPITAL_LIST = `${ROUTE_ADMIN}${AdminPaths.HospitalList}`;
export const ROUTE_ADMIN_PACS_DOMAIN = `${ROUTE_ADMIN}${AdminPaths.PacsDomain}`;
export const ROUTE_ADMIN_PACS_CONNECTION_ACCOUNT = `${ROUTE_ADMIN}${AdminPaths.PacsConnectionAccount}`;
export const ROUTE_ADMIN_PROPERTIES_FOR_CONFIG = `${ROUTE_ADMIN}${AdminPaths.PropertiesForConfig}`;
export const ROUTE_ADMIN_USER_AUTHORIZATION = `${ROUTE_ADMIN}${AdminPaths.UserAuthorization}`;
export const ROUTE_ADMIN_MODALITY_TYPE_NAME = `${ROUTE_ADMIN}${AdminPaths.ModalityTypeName}`;
export const ROUTE_ADMIN_BODY_PART = `${ROUTE_ADMIN}${AdminPaths.BodyPart}`;
export const ROUTE_ADMIN_CONSUMABLE_TYPE = `${ROUTE_ADMIN}${AdminPaths.ConsumableType}`;
export const ROUTE_ADMIN_TYPE_OF_STATISTICAL_REPORT = `${ROUTE_ADMIN}${AdminPaths.TypeOfStatisticalReport}`;
export const ROUTE_ADMIN_EXTENDED_FUNCTIONALITY = `${ROUTE_ADMIN}${AdminPaths.ExtendedFunctionality}`;