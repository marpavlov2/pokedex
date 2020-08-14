import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact } from '../interfaces/contact';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.scss']
})
export class MyFavoritesComponent implements OnInit {
  favoriteContacts: Array<Contact> = [];

  constructor(
    public router: Router,
    public contactsService: ContactsService) { }

  async ngOnInit() {
    this.favoriteContacts = await this.contactsService.getFavoriteContacts();
  }

  markFavorite(contact: Contact) {
    contact.liked = !contact.liked;
    if (contact.liked) {
      this.contactsService.addContactToFavorites(contact);
    } else {
      this.contactsService.removeContactFromFavorites(contact)
        .then(() => {
          this.favoriteContacts = this.favoriteContacts.filter((favoriteContact: Contact) => favoriteContact.id !== contact.id);
        });
    }
  }

  goToContactDetails(contactId: string) {
    this.router.navigate([`/contact-details/${contactId}`]);
  }

  ngOnDestroy() {
    this.contactsService.searchTerm = undefined;
  }

}
