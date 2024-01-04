export type ConsumableTypeDTOBase = {
    id: string;
    name: string;
    description: string;
};

export type ConsumableTypeDTO = ConsumableTypeDTOBase;

export type ConsumableTypeDTOCreate = ConsumableTypeDTOBase;

export type ConsumableTypeDTOUpdate = ConsumableTypeDTOBase;

export type ConsumableTypeDTODelete = {
    id: string;
}