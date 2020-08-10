import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllContactsComponent } from './all-contacts/all-contacts.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllContactsComponent,
    MyFavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
