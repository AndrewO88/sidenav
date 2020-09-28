import {Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

@Component({
  selector: 'formly-object-type',
  template: `
    <mat-accordion class="example-headers-align" multi>
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title>
            <legend *ngIf="to.label">{{ to.label }}</legend>
          </mat-panel-title>
          <mat-panel-description>
            {{ to.description }}
            <mat-icon>account_circle</mat-icon>
          </mat-panel-description>
        </mat-expansion-panel-header>

        <div class="alert alert-danger" role="alert" *ngIf="showError && formControl.errors">
          <formly-validation-message [field]="field"></formly-validation-message>
        </div>

        <formly-field *ngFor="let f of field.fieldGroup" [field]="f"></formly-field>

      </mat-expansion-panel>
    </mat-accordion>
  `,
})
export class ObjectTypeComponent extends FieldType {
  defaultOptions = {
    defaultValue: {},
  };
}
