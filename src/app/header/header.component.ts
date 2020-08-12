import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchContactService } from '../search-contact.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public router: Router,
    public searchContact: SearchContactService) { }

  ngOnInit() {
  }

}
