import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact } from '../interfaces/contact';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteContactModalComponent } from '../modals/delete-contact-modal/delete-contact-modal.component';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.scss']
})
export class MyFavoritesComponent implements OnInit {
  favoriteContacts: Array<Contact> = [];
  modalRef: BsModalRef;

  constructor(
    private _modalService: BsModalService,
    public router: Router,
    public contactsService: ContactsService) { }

  async ngOnInit() {
    this.favoriteContacts = await this.contactsService.getFavoriteContacts();
  }

  ngOnDestroy() {
    this.contactsService.searchTerm = undefined;
  }

}
