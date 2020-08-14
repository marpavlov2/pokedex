import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { ContactsService } from '../contacts.service';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../interfaces/contact';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contactDetails: any;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public contactsService: ContactsService,
    private _location: Location) { }

  async ngOnInit() {
    let contactId = this.activatedRoute.snapshot.paramMap.get('contactId');
    this.contactDetails = await this.contactsService.getContact(contactId);
  }

  markFavorite(contact: Contact) {
    contact.liked = !contact.liked;
    if (contact.liked) {
      this.contactsService.addContactToFavorites(contact);
    } else {
      this.contactsService.removeContactFromFavorites(contact);
    }
  }

  goBack() {
    this._location.back();
  }

}
