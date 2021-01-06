import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllPokemonsComponent } from './all-pokemons/all-pokemons.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component'

import { SearchPokemonPipe } from './pipes/search-pokemon.pipe';
import { ToastrModule } from 'ngx-toastr';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllPokemonsComponent,
    MyFavoritesComponent,
    PokemonDetailsComponent,
    SearchPokemonPipe,
    PokemonCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
