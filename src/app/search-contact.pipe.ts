import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchContact'
})
export class SearchContactPipe implements PipeTransform {

  transform(contacts: any[], searchTerm: string) {
    if (!searchTerm || !contacts) return contacts;

    return contacts.filter(contact =>
      contact.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  }

}
