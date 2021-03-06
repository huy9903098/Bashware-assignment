import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
    disabled: new FormControl({
      value: 'Lorem ipsum dolor sit amet',
      disabled: true,
    }),
    readonly: new FormControl('Lorem ipsum dolor sit amet'),
  });
  ngOnInit(): void {}

  get email(): any {
    return this.form.get('email');
  }

  get default(): any {
    console.log(this.form.get('disabled'));
    return this.form.get('default');
  }

  getErrorMessage() {
    if (this.email.hasError('required') || this.email.value.length === 0) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
