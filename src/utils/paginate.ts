import { FindManyOptions } from 'typeorm';

export type PaginatedData<T> = {
    data: T[];
    count: number;
    currentPage: number;
    lastPage: number;
    itemsPerPage: number;
}

export const generatePaginatedOptions = <T>(page = 1, perPage = 10, options: FindManyOptions<T>): FindManyOptions<T> => {
    const offset = perPage * (page - 1);
    const generated: FindManyOptions<T> = { take: perPage, skip: offset };
    
    return {...options, ...generated};
}

export const paginate = async <T>(page = 1, options: FindManyOptions<T>, query: (options: FindManyOptions<T>) => Promise<[T[], number]>): Promise<PaginatedData<T>> => {

    const perPage = 10;

    const generatedQuery = generatePaginatedOptions(page, perPage, options);
    const [ data, count ] = await query(generatedQuery);

    return {
        data,
        count,
        currentPage: page,
        lastPage: Math.ceil(count / perPage),
        itemsPerPage: perPage
    };
};