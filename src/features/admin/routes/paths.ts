export enum AdminPaths {
    Base = '/',
    UserType = '/user-type'
}

export const ROUTE_ADMIN = '/admin';

export const ROUTE_ADMIN_USER_TYPE = `${ROUTE_ADMIN}${AdminPaths.UserType}`;
