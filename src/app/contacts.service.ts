import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private firestore: AngularFirestore,
    public spinner: SpinnerService,
    private toast: ToastrService) {}  

    async getPromotedProducers(): Promise<any> {
      return this.firestore.collection(`contacts`).get().toPromise()
        .then((producersCollection) => {
          return producersCollection.docs.map(doc => {
            let data = doc.data();
            console.log(data)
            return data;
          });
        })
    }
}
