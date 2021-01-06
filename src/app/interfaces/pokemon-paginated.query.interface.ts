import { IPokemonQuery } from "./pokemon.query.interface";

export interface IPokemonPaginated {
    results: IPokemonQuery[];
    count: number;
    next: string;
    previous: string;
}
