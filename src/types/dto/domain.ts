export type DomainDTOBase = {
    id: string;
    hospitalID: string;
}

export type DomainDTO = {
    logo: string;
    logoFull: string;
} & DomainDTOBase;

export type DomainDTOCreate = {
    publicAddress: boolean;
} & DomainDTOBase;

export type DomainDTOUpdate = {
    publicAddress: boolean;
} & DomainDTOBase;

export type DomainDTODelete = {
    id: string
}