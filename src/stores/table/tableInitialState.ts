import { DEFAULT_QUERY } from "../../lib/dataHelper/apiHelper";
import { RESOURCES } from "../../types/resources";
import { ReduxTableState } from "./tableSlice";

type TableStore = {
    expiredTime: number;
    data: Record<string, ReduxTableState>
}

export const TABLE_USER_AUTHOR = RESOURCES.USER_AUTHOR;
export const TABLE_MODALITY_TYPE_NAME = RESOURCES.MODALITY_TYPE_NAME;
export const TABLE_CONSUMABLE_TYPE = RESOURCES.CONSUMABLE_TYPE;
export const TABLE_BODY_PART = RESOURCES.BODY_PART;
export const TABLE_EXTENSION_TYPE = RESOURCES.EXTENSION_TYPE;

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
        },
        [TABLE_CONSUMABLE_TYPE]: {
            query: DEFAULT_QUERY,
            selection: {
                selectedRow: null
            }
        },
        [TABLE_BODY_PART]: {
            query: DEFAULT_QUERY,
            selection: {
                selectedRow: null
            }
        },
        [TABLE_EXTENSION_TYPE]: {
            query: DEFAULT_QUERY,
            selection: {
                selectedRow: null
            }
        }
    }
}