import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonsService } from '../pokemons.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.scss']
})
export class MyFavoritesComponent implements OnInit {
  favoritePokemons: Pokemon[] = [];

  constructor(
    public router: Router,
    public pokemonsService: PokemonsService) { }

  async ngOnInit() {
    this.favoritePokemons = await this.pokemonsService.getPokemons();
    this.favoritePokemons = this.favoritePokemons.reduce((favoritePokemons, pokemon) => {
      const favoritePokemon = this.pokemonsService.favoritePokemons.some(id => id === pokemon.id);
      if (favoritePokemon) {
        pokemon.liked = true;
        favoritePokemons.push(pokemon)
      }
      return favoritePokemons;
    }, []);
  }

  onRemovePokemonFromList(pokemonId: string) {
    this.favoritePokemons = this.favoritePokemons.filter(pokemon => pokemon.id != pokemonId);
  }

  ngOnDestroy() {
    this.pokemonsService.searchTerm = undefined;
  }

}
