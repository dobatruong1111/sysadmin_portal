export type UserAuthorDTOBase = {
    id: string;
    name: string;
    description: string;
};

export type UserAuthorDTO = UserAuthorDTOBase;

export type UserAuthorDTOCreate = UserAuthorDTOBase;

export type UserAuthorDTOUpdate = UserAuthorDTOBase;

export type UserAuthorDTODelete = {
    id: string;
}