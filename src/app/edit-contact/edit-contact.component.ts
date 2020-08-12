import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  deleteContact() {}

  goBack() {
    this._location.back();
  }

  register() {}

}
