import { DEFAULT_QUERY } from "../../lib/dataHelper/apiHelper";
import { RESOURCES } from "../../types/resources";
import { ReduxTableState } from "./tableSlice";

type TableStore = {
    expiredTime: number;
    data: Record<string, ReduxTableState>
}

export const TABLE_USER_AUTHOR = RESOURCES.USER_AUTHOR;
export const TABLE_MODALITY_TYPE_NAME = RESOURCES.MODALITY_TYPE_NAME;

export const initialState: TableStore = {
    expiredTime: 0,
    data: {
        [TABLE_USER_AUTHOR]: {
            query: DEFAULT_QUERY,
            selection: {
                selectedRow: null
            }
        },
        [TABLE_MODALITY_TYPE_NAME]: {
            query: DEFAULT_QUERY,
            selection: {
                selectedRow: null
            }
        }
    }
}