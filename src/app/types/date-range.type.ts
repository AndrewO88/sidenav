import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FieldArrayType} from '@ngx-formly/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'formly-interval-date-type',
  template: `
    <div class="formly-interval-date-type">
      <div class="alert alert-danger" role="alert" *ngIf="showError && formControl.errors">
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
      <mat-form-field appearance="fill">
        <mat-label>{{ to?.attributes?.label }}</mat-label>
        <mat-date-range-input [formGroup]="range" [rangePicker]="picker">
          <input matStartDate formControlName="start" placeholder="Start date">
          <input matEndDate formControlName="end" placeholder="End date">
        </mat-date-range-input>
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-date-range-picker #picker disabled="false"></mat-date-range-picker>

        <mat-error *ngIf="range.controls.start.hasError('matStartDateInvalid')">{{ to?.attributes?.invalidStart }}</mat-error>
        <mat-error *ngIf="range.controls.end.hasError('matEndDateInvalid')">{{ to?.attributes?.invalidEnd }}</mat-error>
      </mat-form-field>
    </div>
  `,
  styles: [
      `
      .formly-interval-date-type .mat-form-field-infix {
        width: 100%;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class DateRangeType extends FieldArrayType implements OnInit {
  range: FormGroup;

  ngOnInit() {

    const start: FormControl = this.formControl.controls[0] as FormControl;
    const end: FormControl = this.formControl.controls[1] as FormControl;
    start.disable();
    end.disable();
    start.setValidators([Validators.required]);
    end.setValidators([Validators.required]);
    start.updateValueAndValidity();
    start.updateValueAndValidity();

    this.range = new FormGroup({start, end});

  }

}
