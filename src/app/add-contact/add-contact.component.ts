import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { ContactsService } from '../contacts.service';
import { finalize } from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  get fullName() { return this.contactForm.get('fullName'); }
  get email() { return this.contactForm.get('email'); }
  get numbers(): FormArray { return this.contactForm.get('numbers') as FormArray; }

  contactForm: FormGroup;
  imgSrc: string = '/assets/img-placeholder.jpg';
  selectedImage: any = null;
  image: any = undefined;

  constructor(
    private _location: Location,
    private fb: FormBuilder,
    public router: Router,
    public contactsService: ContactsService,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      numbers: this.fb.array([this.createNumbersFormGroup()], [Validators.required]),
      liked: false,
      image: ['']
    });
  }

  removeOrClearNumbers(i: number) {
    const numbers = this.contactForm.get('numbers') as FormArray
    if (numbers.length > 1) {
      numbers.removeAt(i)
    } else {
      numbers.reset()
    }
  }

  createNumbersFormGroup(): FormGroup {
    return new FormGroup({
      'number': new FormControl('', Validators.required),
      'cell': new FormControl('', Validators.required)
    })
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img-placeholder.jpg';
      this.selectedImage = null;
    }
  }

  goBack() {
    this._location.back();
  }

  async addContact() {
    const contact = this.contactForm.value;
    if (this.image && this.selectedImage) {
      let filePath = `${this.selectedImage.name}`;
      this.contactsService.imageUpload(filePath, this.selectedImage).then(url => {
        contact.image = url;
        this.contactsService.addContact(contact).then(() => {
          this.imgSrc = '/assets/img-placeholder.jpg';
          this.selectedImage = null;
          this.router.navigate(['/']);
        });
      });
    }
  }

  addNumber() {
    this.numbers.push(this.createNumbersFormGroup());
  }

}
