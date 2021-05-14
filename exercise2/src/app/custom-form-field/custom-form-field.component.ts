import { FocusMonitor } from '@angular/cdk/a11y';
import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Observable, Subject } from 'rxjs';

export interface FormFieldValue {
  text: string;
  disable: boolean;
}

@Component({
  selector: 'custom-form-field',
  templateUrl: './custom-form-field.component.html',
  styleUrls: ['./custom-form-field.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CustomFormFieldComponent,
    },
  ],
})
export class CustomFormFieldComponent
  implements OnInit, OnDestroy, MatFormFieldControl<FormFieldValue>
{
  static nextId = 0;
  @ViewChild(MatInput, { read: ElementRef, static: true })
  input!: ElementRef;
  @Input()
  set value(value: FormFieldValue) {
    this._value = value;
    this.stateChanges.next();
  }
  get value() {
    return this._value;
  }
  private _value!: FormFieldValue;

  stateChanges = new Subject<void>();

  @HostBinding()
  id = `custom-form-field-id-${CustomFormFieldComponent.nextId++}`;

  @Input()
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  get placeholder() {
    return this._placeholder;
  }
  private _placeholder!: string;

  ngControl!: NgControl | null;
  focused!: boolean;
  empty!: boolean;
  shouldLabelFloat: boolean = true;
  required!: boolean;
  disabled!: boolean;
  errorState!: boolean;
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;

  constructor(private focusMonitor: FocusMonitor) {}

  setDescribedByIds(ids: string[]): void {
    //throw new Error('Method not implemented.');
  }
  onContainerClick(event: MouseEvent): void {
    //throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.focusMonitor.monitor(this.input).subscribe((focused) => {
      this.focused = !!focused;
      this.stateChanges.next();
    });
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.input);
    this.stateChanges.complete();
  }
}
