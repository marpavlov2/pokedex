import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { SearchContactService } from '../search-contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contact: any = {liked: true}

  constructor(
    public router: Router, 
    private _location: Location,
    private _searchContact: SearchContactService) { }

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
