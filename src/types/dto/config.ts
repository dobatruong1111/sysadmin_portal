import { ConfigAttributeDTO } from "./configAttribute";

export type ConfigDTO = {
    id: number;
    attributeID: string;
    attribute: ConfigAttributeDTO;
    attributeValue: string;
    preferred: boolean;
    hospitalID: string;
} 

export type ConfigDTOCreate = {
    attributeID: string;
    attributeValue: string;
    preferred: boolean;
}

export type ConfigDTOUpdate = {
    id: number;
    attributeValue: string;
    preferred: boolean;
}

export type ConfigDTODelete = {
    id: string;
}
