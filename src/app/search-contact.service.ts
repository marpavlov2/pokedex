import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchContactService {
  searchTerm: string;

  constructor() { }
}
