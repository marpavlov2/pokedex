import { IPokemonQuery } from "../interfaces/pokemon.query.interface";

export class Pokemon {
    id: string;
    name: string;
    url: string;
    abilities: [{ ability: { name: string, url: string }, is_hidden: boolean, slot: number }];
    moves: [{ move: { name: string, url: string }, version_group_details: [{ level_learned_at: number, move_learn_method: { name: string, url: string } }] }];
    sprites: { backDefault: string, frontDefault: string } = {backDefault: '', frontDefault: ''};
    liked: boolean;
    front_default: string
    baseExperience: number;
    forms: [{ name: string, url: string }];
    height: number;
    isDefault: boolean;
    locationAreaEncounters: string;
    order: number;
    weight: number;

    constructor(query: IPokemonQuery) {
        this.id = query.id.toString();
        this.name = query.name;
        this.url = query.url;
        this.abilities = query.abilities;
        this.moves = query.moves;
        this.baseExperience = query.base_experience;
        this.forms = query.forms;
        this.height = query.height;
        this.isDefault = query.is_default;
        this.locationAreaEncounters = query.location_area_encounters;
        this.order = query.order;
        this.weight = query.weight;
        this.liked = false;
        if (query.sprites) {
            this.sprites.backDefault = query.sprites.back_default;
            this.sprites.frontDefault = query.sprites.front_default;
        }
    }
}
