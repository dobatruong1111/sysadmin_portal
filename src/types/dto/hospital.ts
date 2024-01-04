export type HospitalDTOBase = {
    id: string;
    name: string;
    address: string;
    enabled: boolean;
}

export type HospitalDTO = {} & HospitalDTOBase;

export type HospitalDTOCreate = {
    phone: string;
    description: string;
    email: string;
    logo: string;
    logoFull: string;
} & HospitalDTOBase;

export type HospitalDTOUpdate = {
    id: string;
    name: string;
    address: string;
    enabled: boolean;
    phone: string;
    description: string;
    email: string;
    logo: string;
    logoFull: string;
};

export type HospitalDTODelete = {
    id: string;
}