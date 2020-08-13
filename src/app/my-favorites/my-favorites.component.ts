import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.scss']
})
export class MyFavoritesComponent implements OnInit {

  constructor(
    public router: Router,
    public contactsService: ContactsService) { }

  async ngOnInit() {
    this.contactsService.favoriteContacts = await this.contactsService.getFavoriteContacts();
  }

  goToContactDetails(contactId: string) {
    this.router.navigate([`/contact-details/${contactId}`]);
  }

  ngOnDestroy() {
    this.contactsService.favoriteContacts = [];
    this.contactsService.searchTerm = undefined;
  }

}
