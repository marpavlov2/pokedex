import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  get fullName() { return this.editEmployeeForm.get('fullName'); }
  get email() { return this.editEmployeeForm.get('email'); }
  get numbers() { return this.editEmployeeForm.get('numbers'); }

  editEmployeeForm: FormGroup;

  constructor(
    private _location: Location,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.editEmployeeForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      numbers: ['', [Validators.required]],
    });
  }

  goBack() {
    this._location.back();
  }

  register() {}

}
