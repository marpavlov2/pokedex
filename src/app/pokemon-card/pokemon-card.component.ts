import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PokemonsService } from '../pokemons.service';
import { Router } from '@angular/router';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input('pokemon')
  pokemon: Pokemon;
  @Input('page')
  page: string;
  @Output() pokemonRemoved = new EventEmitter<string>();
  pokemons: Pokemon[] = [];

  constructor(
    public router: Router,
    public pokemonsService: PokemonsService) { }

  ngOnInit() { }

  goToPokemontDetails() {
    this.router.navigate([`/pokemon-details/${this.pokemon.id}`]);
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
      // Removes card from list only if page is MyFavorites
      if (this.page === 'MyFavorites') {
        this.pokemonRemoved.emit(this.pokemon.id);
      }
    }
  }
}
