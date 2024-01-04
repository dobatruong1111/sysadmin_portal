export type DomainDTOBase = {
    id: string;
    hospitalID: string;
}

export type DomainDTO = {} & DomainDTOBase;

export type DomainDTOCreate = {
    publicAddress: boolean;
} & DomainDTOBase;

export type DomainDTODelete = {
    id: string
}

export type DomainDTOGet = {
    logo: string;
    logoFull: string;
} & DomainDTOBase;