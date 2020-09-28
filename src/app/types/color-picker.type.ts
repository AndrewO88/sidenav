import {Component} from '@angular/core';
import {FieldType} from '@ngx-formly/material/form-field';

@Component({
  selector: 'formly-color-picker-type',
  template: `
    <div fxLayout="row" fxLayoutAlign="flex-start center" fxLayoutGap="10px" class="color-picker-container"
         [style.margin-bottom]="to.height || 'auto'">
      <p-colorPicker [(ngModel)]="field.defaultValue" (ngModelChange)="onChange()"></p-colorPicker>
      <div *ngIf="to?.label" class="description">{{ to.label }} </div>
    </div>
  `
})

export class ColorPickerTypeComponent extends FieldType {
  onChange() {
    this.formControl.setValue(this.field.defaultValue);
  }
}
