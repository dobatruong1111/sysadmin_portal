export type StatisticsTypeDTO = {
    id: string;
    name: string;
    description: string;
    config: string;
    filterParams: Array<string>;
    outputSchema: string;
}

export type StatisticsTypeDTOCreate = StatisticsTypeDTO;

export type StatisticsTypeDTOUpdate = StatisticsTypeDTO;

export type StatisticsTypeDTODelete = {
    id: string;
}