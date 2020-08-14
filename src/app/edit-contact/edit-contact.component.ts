import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../interfaces/contact';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  get id() { return this.editContactForm.get('id'); }
  get fullName() { return this.editContactForm.get('fullName'); }
  get email() { return this.editContactForm.get('email'); }
  get image() { return this.editContactForm.get('image'); }
  get numbers(): FormArray { return this.editContactForm.get('numbers') as FormArray; }

  editContactForm: FormGroup;
  contact: Contact;
  imgSrc: string = '/assets/img-placeholder.jpg';
  newImage: any = undefined;
  selectedImage: any = null;

  constructor(
    private _location: Location,
    private fb: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public contactsService: ContactsService) { }

  async ngOnInit() {
    let contactId = this.activatedRoute.snapshot.paramMap.get('contactId');

    this.editContactForm = this.fb.group({
      id: [''],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      liked: false,
      image: [''],
      numbers: this.fb.array([], [Validators.required]),
    });

    this.contact = await this.contactsService.getContact(contactId);

    let editContact: Contact = {
      id: this.contact.id,
      fullName: this.contact.fullName,
      email: this.contact.email,
      image: this.contact.image,
      liked: this.contact.liked,
      numbers: []
    }

    for (let i = 0; i < this.contact.numbers.length; i++) {
      const contactFormsArry = this.contact.numbers[i];
      this.numbers.push(this.createNumbersFormGroup());
      editContact.numbers.push(contactFormsArry)
    }

    this.editContactForm.patchValue(editContact);
  }

  createNumbersFormGroup(): FormGroup {
    return new FormGroup({
      'number': new FormControl('', Validators.required),
      'cell': new FormControl('', Validators.required)
    })
  }

  removeOrClearNumbers(i: number) {
    const numbers = this.editContactForm.get('numbers') as FormArray
    if (numbers.length > 1) {
      numbers.removeAt(i)
    } else {
      numbers.reset()
    }
  }

  addNumber() {
    this.numbers.push(this.createNumbersFormGroup());
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.image.setValue(e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img-placeholder.jpg';
      this.selectedImage = null;
    }
  }

  async updateContact() {
    const contact = this.editContactForm.value;
    if (this.selectedImage) {
      let filePath = `${this.selectedImage.name}`;
      this.contactsService.imageUpload(filePath, this.selectedImage)
        .then(url => {
          contact.image = url;
          this.contactsService.updateContact(contact);
        });
    } else {
      this.contactsService.updateContact(contact);
    }
  }

  deleteContact() { }

  goBack() {
    this._location.back();
  }

  register() { }

}
