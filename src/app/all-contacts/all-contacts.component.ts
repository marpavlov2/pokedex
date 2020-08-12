import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit {
  contacts: Array<any> = [
    { name: 'Addie Hernande', liked: false },
    { name: 'Oscar Arnold', liked: true },
    { name: 'Isaiah McGuire', liked: true },
    { name: 'Ann Schneider', liked: false },
    { name: 'Agnes Terry', liked: false },
    { name: 'Rose Bush', liked: false },
    { name: 'Duane Reese', liked: true },
    { name: 'Mae Changled', liked: false },
    { name: 'Evelyn Weaver', liked: true },
    { name: 'Catherine Moore', liked: true },
    { name: 'Sam Manning', liked: false },
  ]

  constructor(
    public router: Router,
    public contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getPromotedProducers();
  }

  goToContactDetails() {
    this.router.navigate(['/contact-details']);
  }

  ngOnDestroy() {
    this.contactsService.searchTerm = undefined;
  }

}
