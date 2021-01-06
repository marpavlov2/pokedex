import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { PokemonsService } from '../pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: Pokemon;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public pokemonsService: PokemonsService,
    private _location: Location) { }

  async ngOnInit() {
    const pokemonId = this.activatedRoute.snapshot.paramMap.get('pokemonId');
    this.pokemon = await this.pokemonsService.getPokemonDetailsById(pokemonId);
    const favoritePokemon = this.pokemonsService.favoritePokemons.some(id => id === this.pokemon.id);
    if (favoritePokemon) {
      this.pokemon.liked = true;
    }
  }

  markFavorite(pokemon: Pokemon) {
    pokemon.liked = !pokemon.liked;
    if (pokemon.liked) {
      let favoritePokemons = this.pokemonsService.favoritePokemons;
      favoritePokemons.push(pokemon.id);
      localStorage.setItem('favoritePokemons', JSON.stringify(favoritePokemons));
    } else {
      const favoritePokemons = this.pokemonsService.favoritePokemons.filter(pokemonId => pokemon.id !== pokemonId);
      localStorage.setItem('favoritePokemons', JSON.stringify(favoritePokemons));
    }
  }

  goBack() {
    this._location.back();
  }

}
