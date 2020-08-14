import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact } from '../interfaces/contact';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteContactModalComponent } from '../modals/delete-contact-modal/delete-contact-modal.component';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit {
  contacts: Array<Contact> = [];
  modalRef: BsModalRef;

  constructor(
    private _modalService: BsModalService,
    public router: Router,
    public contactsService: ContactsService) { }

  async ngOnInit() {
    this.contacts = await this.contactsService.getContacts();
  }

  goToContactDetails(contactId: string) {
    this.router.navigate([`/contact-details/${contactId}`]);
  }

  markFavorite(contact: Contact) {
    contact.liked = !contact.liked;
    if (contact.liked) {
      this.contactsService.addContactToFavorites(contact);
    } else {
      this.contactsService.removeContactFromFavorites(contact);
    }
  }

  deleteContact(contactId: string) {
    this.modalRef = this._modalService.show(DeleteContactModalComponent, {  class: 'modal-dialog-centered' });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if (result) {
        this.contactsService.deleteContact(contactId)
        .then(() => {
          this.contacts = this.contacts.filter(contact => contact.id != contactId);
        });
      }
    })
  }

  ngOnDestroy() {
    this.contactsService.searchTerm = undefined;
  }

}
