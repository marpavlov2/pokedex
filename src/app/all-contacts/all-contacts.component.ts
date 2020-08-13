import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit {

  constructor(
    public router: Router,
    public contactsService: ContactsService) { }

  async ngOnInit() {
    this.contactsService.contacts = await this.contactsService.getContacts();
  }

  goToContactDetails(contactId: string) {
    this.router.navigate([`/contact-details/${contactId}`]);
  }

  addContactToFavorites(contact: any) {
    contact.liked = !contact.liked;
    this.contactsService.addContactToFavorites(contact);
  }

  ngOnDestroy() {
    this.contactsService.searchTerm = undefined;
  }

}
