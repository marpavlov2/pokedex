import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Contact } from '../interfaces/contact';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { DeleteContactModalComponent } from '../modals/delete-contact-modal/delete-contact-modal.component';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
  @Input('contact')
  contact: Contact;
  @Input('page')
  page: string;
  @Output() contactRemoved = new EventEmitter<string>();
  contacts: Array<Contact> = [];
  modalRef: BsModalRef;

  constructor(
    private _modalService: BsModalService,
    public router: Router,
    public contactsService: ContactsService) { }

  ngOnInit() { }


  goToContactDetails(contactId: string) {
    this.router.navigate([`/contact-details/${contactId}`]);
  }

  markFavorite(contact: Contact) {
    contact.liked = !contact.liked;
    if (contact.liked) {
      this.contactsService.addContactToFavorites(contact);
    } else {
      this.contactsService.removeContactFromFavorites(contact)
      .then(() => {
        // Removes card from list only if page is MyFavorites
        if (this.page === 'MyFavorites') {
          this.contactRemoved.emit(this.contact.id);
        }
      });
    }
  }

  deleteContact(contactId: string) {
    this.modalRef = this._modalService.show(DeleteContactModalComponent, {  class: 'modal-dialog-centered' });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if (result) {
        this.contactsService.deleteContact(contactId)
        .then(() => {
          this.contactRemoved.emit(this.contact.id);
        });
      }
    })
  }
}
