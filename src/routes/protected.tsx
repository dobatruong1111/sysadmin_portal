import { Outlet, RouteObject } from "react-router-dom";
import { LoginGuard } from "../features/auth/components/LoginGuard";
import { Suspense } from "react";
import { FullPageSpinner } from "../components/Layout/FullPageSpinner";
import { AdminRoutes, ROUTE_ADMIN } from "../features/admin";

const App = () => {
    return (
        <LoginGuard>
            <Suspense fallback={<FullPageSpinner />}>
                <Outlet />
            </Suspense>
        </LoginGuard>
    )
}

const adminRoutes: RouteObject[] = [
    {
        path: `${ROUTE_ADMIN}/*`,
        element: <AdminRoutes />
    }
]

const mainRoute: RouteObject = {
    path: '/',
    element: <App />
}


export const protectedRoutes: RouteObject[] = [
    { ...mainRoute, children: adminRoutes },
]