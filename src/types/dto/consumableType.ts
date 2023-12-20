export type ConsumableTypeDTOBase = {
    id: string;
    name: string;
};

export type ConsumableTypeDTO = {
    description: string;
} & ConsumableTypeDTOBase;