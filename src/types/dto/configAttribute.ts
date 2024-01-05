export type ConfigAttributeDTOBase = {
    id: string;
    name: string;
    datatype: string;
    minOccurs: number;
    maxOccurs: number;
    description: string;
    datatypeConfig: string;
}

export type ConfigAttributeDTO = ConfigAttributeDTOBase;

export type ConfigAttributeDTOCreate = ConfigAttributeDTOBase

export type ConfigAttributeDTOUpdate = ConfigAttributeDTOBase;

export type ConfigAttributeDTODelete = {
    id: string;
}