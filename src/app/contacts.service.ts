import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators"
import { Contact } from './interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  searchTerm: string;

  constructor(
    private firestore: AngularFirestore,
    public spinner: SpinnerService,
    private toast: ToastrService,
    public storage: AngularFireStorage
  ) { }


  async getContact(contactId: string): Promise<Contact> {
    return this.firestore.collection(`contacts`).doc(contactId).get().toPromise()
      .then((doc) => {
        let user = doc.data();
        return user;
      })
      .catch(() => {
        this.toast.show(`Adding contact error`);
        return undefined;
      });
  }

  async addContact(contact: Contact): Promise<boolean> {
    this.spinner.showSpinner();
    return this.firestore.collection(`contacts`).add(contact)
      .then(async (doc) => {
        this.toast.show(`Added new contact`);
        await this.firestore.collection(`contacts`).doc(doc.id).update({ id: doc.id });
        return true;
      })
      .catch(() => {
        this.toast.show(`Adding contact error`);
        return false;
      })
      .finally(() => {
        this.spinner.hideSpinner();
      });
  }

  async updateContact(contact: Contact) {
    return this.firestore.collection(`contacts`).doc(contact.id).update({
      fullName: contact.fullName,
      email: contact.email,
      image: contact.image,
      numbers: contact.numbers
    })
      .then(() => {
        this.toast.show(`Contact updated`);
      })
      .catch(() => {
        this.toast.show(`Updating contact error`);
        return false;
      })
  }

  async deleteContact(contactId: string) {
    return this.firestore.collection(`contacts`).doc(contactId).delete()
      .then(() => {
        this.toast.show(`Contact deleted`);
        return true;
      })
      .catch(() => {
        this.toast.show(`Deleting contact error`);
        return false;
      })
  }

  async addContactToFavorites(contact: Contact) {
    return this.firestore.collection(`contacts`).doc(contact.id).update({
      liked: contact.liked
    })
      .then(() => {
        this.toast.show(`Added to favorites`);
        return true;
      })
      .catch(() => {
        this.toast.show(`Add to favorites error`);
        return false;
      });
  }

  async removeContactFromFavorites(contact: Contact) {
    return this.firestore.collection(`contacts`).doc(contact.id).update({
      liked: contact.liked
    })
      .then(() => {
        this.toast.show(`Removed from favorites`);
        return true;
      })
      .catch(() => {
        this.toast.show(`Remove from favorites error`);
        return false;
      });
  }

  async getContacts(): Promise<any> {
    return this.firestore.collection(`contacts`).get().toPromise()
      .then((producersCollection) => {
        return producersCollection.docs.map(doc => {
          let data = doc.data();
          return data;
        });
      })
  }

  async getFavoriteContacts(): Promise<any> {
    return this.firestore.collection(`contacts`, ref => ref.where('liked', '==', true)).get().toPromise()
      .then((producersCollection) => {
        return producersCollection.docs.map(doc => {
          let data = doc.data();
          return data;
        });
      })
  }

  public imageUpload(filePath, selectedImage) {
    this.spinner.showSpinner();
    const fileRef = this.storage.ref(filePath);
    return new Promise<any>((resolve, reject) => {
      this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
        finalize(() => {
          this.spinner.hideSpinner();
          fileRef.getDownloadURL().subscribe(
            res => resolve(res),
            err => reject(err));
        })
      ).subscribe();
    });
  }
}
