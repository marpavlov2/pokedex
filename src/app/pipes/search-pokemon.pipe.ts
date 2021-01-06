import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Pipe({
  name: 'searchPokemon'
})
export class SearchPokemonPipe implements PipeTransform {

  transform(pokemons: Pokemon[], searchTerm: string) {
    if (!searchTerm || !pokemons) return pokemons;

    return pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  }

}
