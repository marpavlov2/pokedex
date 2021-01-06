import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonsService } from '../pokemons.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-all-pokemons',
  templateUrl: './all-pokemons.component.html',
  styleUrls: ['./all-pokemons.component.scss']
})
export class AllPokemonsComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(
    public router: Router,
    public pokemonsService: PokemonsService) { }

  async ngOnInit() {
    this.pokemons = await this.pokemonsService.getPokemons();
    this.pokemons.map(pokemon => {
      const favoritePokemon = this.pokemonsService.favoritePokemons.some(id => id === pokemon.id);
      if (favoritePokemon) {
        pokemon.liked = true;
      }
    });
  }

  onRemovePokemonFromList(pokemonId: string) {
    this.pokemons = this.pokemons.filter(pokemon => pokemon.id !== pokemonId);
  }

  ngOnDestroy() {
    this.pokemonsService.searchTerm = undefined;
  }

}
