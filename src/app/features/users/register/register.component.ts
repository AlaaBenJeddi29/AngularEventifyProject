import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  user: User;
  formRegister: FormGroup;

  constructor() { }

  ngOnInit() {
    this.user = new User();

    this.formRegister = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]),
      address: new FormGroup({
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zip: new FormControl('', [Validators.required, Validators.pattern(/^\d{4,6}$/)])
      }),
      phones: new FormArray([
        new FormControl('', [Validators.required, Validators.pattern(/^[\d\s\-\+\(\)]{10,15}$/)])
      ])
    });
  }

  get phones(): FormArray {
    return this.formRegister.get('phones') as FormArray;
  }

  addPhone() {
    this.phones.push(new FormControl('', [Validators.required, Validators.pattern(/^[\d\s\-\+\(\)]{10,15}$/)]));
  }

  removePhone(index: number) {
    if (this.phones.length > 1) {
      this.phones.removeAt(index);
    }
  }

  save() {
    if (this.formRegister.valid) {
      this.user = this.formRegister.getRawValue();
      console.log(this.user);
    }
  }
}