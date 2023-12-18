import { createApi  } from "@reduxjs/toolkit/query/react";
import { RESOURCES } from "../types/resources";
import { ITechBaseQueryWithReauth } from "./ITechBaseQuery";

// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'admin',
    refetchOnMountOrArgChange: 10,
    baseQuery: ITechBaseQueryWithReauth({ baseUrl: 'http://27.72.147.196:47878/sysadmin/ws/rest/v1' }),
    tagTypes: Object.values(RESOURCES),
    endpoints: () => ({})
})