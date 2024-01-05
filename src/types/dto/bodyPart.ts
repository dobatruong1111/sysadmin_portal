export type BodyPartDTOBase = {
    id: string;
    name: string;
    description: string;
};

export type BodyPartDTO = BodyPartDTOBase;

export type BodyPartDTOCreate = BodyPartDTOBase;

export type BodyPartDTOUpdate = BodyPartDTOBase;

export type BodyPartDTODelete = {
    id: string;
}