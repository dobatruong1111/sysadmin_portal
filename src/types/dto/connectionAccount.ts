export type ConnectionAccountDTOBase = {
    id: string;
    type: string;
    ipAllowed: Array<string>;
    authorities: Array<string>;
    hospitalID: string;
}

export type ConnectionAccountDTO = ConnectionAccountDTOBase;

export type ConnectionAccountDTOCreate = {
    secret: string;
} & ConnectionAccountDTOBase;

export type ConnectionAccountDTOFormCreate = Omit<ConnectionAccountDTOCreate, "ipAllowed"> & {
    ipAllowed: string;
};

export type ConnectionAccountDTOUpdate = Omit<ConnectionAccountDTOCreate, "hospitalID">;

export type ConnectionAccountDTOFormUpdate = Omit<ConnectionAccountDTOCreate, "ipAllowed"> & {
    ipAllowed: string;
};

export type ConnectionAccountDTODelete = {
    id: string;
}