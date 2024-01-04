import { RootState } from "../redux";
export const selectToken = (state: RootState): string | undefined => {
    return state.auth.token?.accessToken!;
};
