import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { IPokemonQuery } from './interfaces/pokemon.query.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPokemonPaginated } from './interfaces/pokemon-paginated.query.interface';
import { Pokemon } from './models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  searchTerm: string;

  get favoritePokemons(): string[] {
    return JSON.parse(localStorage.getItem('favoritePokemons')) || [];
  }

  constructor(
    private http: HttpClient,
    public spinner: SpinnerService
  ) { }

  async getPokemonDetailsByUrl(url: string): Promise<Pokemon> {
    return this.http.get<IPokemonQuery>(url).toPromise()
      .then(data => {
        return new Pokemon(data);
      });
  }

  async getPokemonDetailsById(id: string): Promise<Pokemon> {
    return this.http.get<IPokemonQuery>(`${environment.apiBaseUrl}/pokemon/${id}`).toPromise()
      .then(data => {
        return new Pokemon(data);
      });
  }

  async getPokemons(): Promise<Pokemon[]> {
    return this.http.get<IPokemonPaginated>(`${environment.apiBaseUrl}/pokemon`).toPromise()
      .then(async data => {
        let pokemonList: Pokemon[] = [];
        for (let i = 0; i < data.results.length; i++) {
          const pokemonData = data.results[i];
          const pokemon = await this.getPokemonDetailsByUrl(pokemonData.url);
          pokemonList.push(pokemon);
        }
        return pokemonList;
      });
  }
}
