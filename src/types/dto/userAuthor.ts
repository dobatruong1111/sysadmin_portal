export type UserAuthorDTOBase = {
    id: string;
    name: string;
};

export type UserAuthorDTO = {
    description: string;
} & UserAuthorDTOBase;