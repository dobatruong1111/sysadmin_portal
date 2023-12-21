export type ExtensionTypeDTOBase = {
    id: string;
    name: string;
}

export type ExtensionTypeDTO = {
    description: string;
} & ExtensionTypeDTOBase;