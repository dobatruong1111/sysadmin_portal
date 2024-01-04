export type ExtensionTypeDTOBase = {
    id: string;
    name: string;
    description: string;
}

export type ExtensionTypeDTO = ExtensionTypeDTOBase;

export type ExtensionTypeDTOCreate = ExtensionTypeDTOBase;

export type ExtensionTypeDTOUpdate = ExtensionTypeDTOBase;

export type ExtensionTypeDTODelete = {
    id: string;
}