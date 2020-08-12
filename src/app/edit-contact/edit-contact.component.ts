import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
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

  deleteContact() {}

  goBack() {
    this._location.back();
  }

  register() {}

}
