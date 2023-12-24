export type DomainDTOBase = {
    id: string;
    hospitalID: string;
}

export type DomainDTO = {
    publicAddress: boolean;
    logo: string;
    logoFull: string;
    preferred: boolean;
} & DomainDTOBase;

export type DomainDTOCreate = {
    publicAddress: boolean;
} & DomainDTOBase;

export type DomainDTOUpdate = {
    publicAddress: boolean;
    preferred: boolean;
} & DomainDTOBase;

export type DomainDTODelete = {
    id: string
}