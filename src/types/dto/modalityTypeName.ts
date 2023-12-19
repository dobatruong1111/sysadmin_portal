export type ModalityTypeNameDTOBase = {
    id: string;
    name: string;
};

export type ModalityTypeNameDTO = {
    description: string;
} & ModalityTypeNameDTOBase;