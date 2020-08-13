import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { Location } from '@angular/common'
import { ContactsService } from '../contacts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contact: any = {liked: true}

  constructor(
    public router: Router, 
    public activatedRoute: ActivatedRoute,
    public contactsService: ContactsService,
    private _location: Location) { }

  async ngOnInit() {
    let contactId = this.activatedRoute.snapshot.paramMap.get('contactId');
    this.contactsService.contactDetails = await this.contactsService.getContact(contactId);
  }

  addContactToFavorites() {}

  goToEditContact() {
    this.router.navigate(['/edit-contact']);
  }

  goBack() {
    this._location.back();
  }

  ngOnDestroy() {
    this.contactsService.contactDetails = undefined;
  }

}
