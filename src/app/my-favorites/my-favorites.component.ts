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

  markFavorite(contact: Contact) {
    contact.liked = !contact.liked;
    if (contact.liked) {
      this.contactsService.addContactToFavorites(contact);
    } else {
      this.contactsService.removeContactFromFavorites(contact)
        .then(() => {
          this.favoriteContacts = this.favoriteContacts.filter((favoriteContact: Contact) => favoriteContact.id !== contact.id);
        });
    }
  }

  goToContactDetails(contactId: string) {
    this.router.navigate([`/contact-details/${contactId}`]);
  }

  deleteContact(contactId: string) {
    this.modalRef = this._modalService.show(DeleteContactModalComponent, {  class: 'modal-dialog-centered' });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if (result) {
        this.contactsService.deleteContact(contactId)
        .then(() => {
          this.favoriteContacts = this.favoriteContacts.filter(contact => contact.id != contactId);
        });
      }
    })
  }

  ngOnDestroy() {
    this.contactsService.searchTerm = undefined;
  }

}
