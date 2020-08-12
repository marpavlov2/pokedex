import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contact: any = {liked: true}

  constructor(
    public router: Router, 
    private _location: Location) { }

  ngOnInit() {
  }

  addContactToFavorites() {}

  goToEditContact() {
    this.router.navigate(['/edit-contact']);
  }

  goBack() {
    this._location.back();
  }

}
