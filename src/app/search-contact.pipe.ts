import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './interfaces/contact';

@Pipe({
  name: 'searchContact'
})
export class SearchContactPipe implements PipeTransform {

  transform(contacts: Contact[], searchTerm: string) {
    if (!searchTerm || !contacts) return contacts;

    return contacts.filter(contact =>
      contact.fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  }

}
