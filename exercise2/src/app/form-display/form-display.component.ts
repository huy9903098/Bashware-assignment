import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-display',
  templateUrl: './form-display.component.html',
  styleUrls: ['./form-display.component.scss'],
})
export class FormDisplayComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
