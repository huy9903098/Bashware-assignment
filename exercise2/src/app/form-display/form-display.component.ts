import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-display',
  templateUrl: './form-display.component.html',
  styleUrls: ['./form-display.component.scss'],
})
export class FormDisplayComponent implements OnInit {
  constructor() {}
  form = new FormGroup({
    default: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    disabled: new FormControl('Lorem ipsum dolor sit amet'),
    readonly: new FormControl('Lorem ipsum dolor sit amet'),
  });
  ngOnInit(): void {}

  get email(): any {
    return this.form.get('email');
  }

  get default(): any {
    return this.form.get('default');
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
