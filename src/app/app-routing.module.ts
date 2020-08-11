import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllContactsComponent } from './all-contacts/all-contacts.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';


const routes: Routes = [
  { path: '', component: AllContactsComponent},
  { path: 'my-favorites', component: MyFavoritesComponent},
  { path: 'edit-contact', component: EditContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }