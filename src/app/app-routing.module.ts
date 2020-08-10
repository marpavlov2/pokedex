import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllContactsComponent } from './all-contacts/all-contacts.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';


const routes: Routes = [
  { path: '', component: AllContactsComponent},
  { path: 'my-favorites', component: MyFavoritesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }