export interface IPokemonQuery {
    name: string;
    url: string;
    abilities: [{ ability: { name: string, url: string }, is_hidden: boolean, slot: number }];
    moves: [{ move: { name: string, url: string }, version_group_details: [{ level_learned_at: number, move_learn_method: { name: string, url: string } }] }];
    sprites: { back_default: string, front_default: string }
    base_experience: number;
    forms: [{ name: string, url: string }];
    height: number;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    order: number;
    weight: number;
}

//TODO: create ability and moves interface
