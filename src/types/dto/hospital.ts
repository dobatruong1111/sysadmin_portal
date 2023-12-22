export type HospitalDTOBase = {
    id: string;
    name: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    enabled: boolean;
}

export type HospitalDTO = {
    logo: string;
    logoFull: string;
} & HospitalDTOBase;