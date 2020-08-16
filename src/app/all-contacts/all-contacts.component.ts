import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact } from '../interfaces/contact';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit {
  contacts: Array<Contact> = [];

  constructor(
    public router: Router,
    public contactsService: ContactsService) { }

  async ngOnInit() {
    this.contacts = await this.contactsService.getContacts();
  }

  onRemoveContactFromList(contactId: string) {
    this.contacts = this.contacts.filter(contact => contact.id != contactId);
  }

  ngOnDestroy() {
    this.contactsService.searchTerm = undefined;
  }

}
