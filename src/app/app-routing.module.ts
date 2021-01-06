import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllPokemonsComponent } from './all-pokemons/all-pokemons.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';


const routes: Routes = [
  { path: '', component: AllPokemonsComponent},
  { path: 'my-favorites', component: MyFavoritesComponent},
  { path: 'pokemon-details/:pokemonId', component: PokemonDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }