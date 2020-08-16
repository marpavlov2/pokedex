import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact } from '../interfaces/contact';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.scss']
})
export class MyFavoritesComponent implements OnInit {
  favoriteContacts: Array<Contact> = [];
  modalRef: BsModalRef;

  constructor(
    public router: Router,
    public contactsService: ContactsService) { }

  async ngOnInit() {
    this.favoriteContacts = await this.contactsService.getFavoriteContacts();
  }

  onRemoveContactFromList(contactId: string) {
    this.favoriteContacts = this.favoriteContacts.filter(contact => contact.id != contactId);
  }

  ngOnDestroy() {
    this.contactsService.searchTerm = undefined;
  }

}
