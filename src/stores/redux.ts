import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tableReducer, TABLE_REDUCER } from "./table/tableSlice";
import { api } from "../lib/api";

const rootReducers = combineReducers({
    [TABLE_REDUCER]: tableReducer,
    [api.reducerPath]: api.reducer
})

export const store = configureStore({
    reducer: {
        tableReducer: tableReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof rootReducers>;