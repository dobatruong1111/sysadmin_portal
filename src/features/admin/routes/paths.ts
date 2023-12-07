export enum AdminPaths {
    Base = '/',
    HospitalList = '/hospital-list'
}
export const ROUTE_ADMIN = '/admin';
export const ROUTE_ADMIN_HOSPITAL_LIST = `${ROUTE_ADMIN}${AdminPaths.HospitalList}`;