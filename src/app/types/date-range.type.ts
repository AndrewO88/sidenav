import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FieldArrayType} from '@ngx-formly/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'formly-interval-date-type',
  template: `
    <div class="formly-interval-date-type" id="test">
      <div class="alert alert-danger" role="alert" *ngIf="showError && formControl.errors">
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
      <mat-form-field class="mat-form-field" appearance="fill">
        <mat-placeholder class="pholder"></mat-placeholder>
        <mat-date-range-input [formGroup]="range" [rangePicker]="picker" >
          <input matStartDate formControlName="start" placeholder="Start date">
          <input matEndDate formControlName="end" placeholder="End date">
        </mat-date-range-input>
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-date-range-picker #picker disabled="false"></mat-date-range-picker>
        <mat-error *ngIf="range.controls.start.hasError('matStartDateInvalid')">{{ to?.attributes?.invalidStart }}</mat-error>
        <mat-error *ngIf="range.controls.end.hasError('matEndDateInvalid')">{{ to?.attributes?.invalidEnd }}</mat-error>
        <mat-hint>Enter time range</mat-hint>
      </mat-form-field>
    </div>
  `,
  styles: [
      `
      .mat-form-field {
        width: 100%;
      }
      #test {
        padding-top: 1.34375em;
      }
      .mat-form-field-appearance-fill .mat-form-field-subscript-wrapper {
        padding: 0 0 !important;
      }
      .mat-hint {
        color: rgba(0,0,0,.54) !important;
      }
      .mat-form-field-appearance-fill .mat-form-field-flex {
        background-color: transparent;
      }
      .mat-form-field-appearance-fill .mat-form-field-flex {
        padding: 0 0 0 0 !important;
      }
      .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex {
        background-color: transparent;
        border-bottom: solid rgba(0,0,0,.54) 1px;
      }
      pholder {
        color: rgba(0,0,0,.54) !important;
        font: 100 14px/20px Roboto, "Helvetica Neue", sans-serif;
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
