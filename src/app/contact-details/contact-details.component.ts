import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contact: any = {liked: true}

  constructor(public router: Router) { }

  ngOnInit() {
  }

  addContactToFavorites() {}

  goToEditContact() {
    this.router.navigate(['/edit-contact']);
  }

}
