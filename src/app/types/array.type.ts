import {Component, ViewEncapsulation} from '@angular/core';
import {FieldArrayType} from '@ngx-formly/core';

@Component({
  selector: 'formly-array-type',
  template: `
    <div class="formly-array-type">
      <div class="alert alert-danger" role="alert" *ngIf="showError && formControl.errors">
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>

      <div *ngFor="let field of field.fieldGroup;let i = index;" class="array-container">
        <div *ngIf="!field.hide" [style.background-color]="to?.backgroundColor || '#e8f9ff'" class="row">
          <formly-field class="formly-field" [field]="field"></formly-field>
        </div>
        <div *ngIf="!to.single" class="buttons">
          <button (click)="remove(i)" mat-icon-button color="warn" [matTooltip]="'Remove'">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>

      <div *ngIf="!to.single" fxLayout="row">
        <button (click)="add()" type="button" mat-icon-button color="primary" [matTooltip]="'Add'">
          <mat-icon>add</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [
      `
      .formly-array-type .row {
        display: flex;
        flex-direction: column;
        padding: 7px 10px 10px 10px;
        margin-bottom: 10px;
      }

      .formly-array-type .array-container {
        display: flex;
        flex-direction: row;
        flex: 1;
      }

      .formly-array-type .buttons {
        flex: 1 40px;
      }

      .formly-array-type .row .formly-field {
        width: 100%;
      }

      .formly-array-type .row formly-group {
        /*display: flex;*/
        /*flex-wrap: wrap;*/
      }

      .formly-array-type .row formly-group .mat-form-field-infix {
        min-width: 80px;
        width: 100%;
      }

    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class ArrayTypeComponent extends FieldArrayType {
}
