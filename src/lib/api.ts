import { createApi  } from "@reduxjs/toolkit/query/react";
import { RESOURCES } from "../types/resources";
import { ITechBaseQueryWithReauth } from "./ITechBaseQuery";
import { API_URL_QA } from "../config";

// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'admin',
    refetchOnMountOrArgChange: 10,
    baseQuery: ITechBaseQueryWithReauth({ baseUrl: API_URL_QA }),
    tagTypes: Object.values(RESOURCES),
    endpoints: () => ({})
})