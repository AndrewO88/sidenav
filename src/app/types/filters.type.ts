import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FieldArrayType} from '@ngx-formly/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'formly-filters-type',
  template: `
    <div class="formly-filters-type">
      <div class="alert alert-danger" role="alert" *ngIf="showError && formControl.errors">
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>

      <div *ngFor="let field of field.fieldGroup;let i = index;">
        <div *ngIf="!field.hide" class="row">
          <formly-field class="formly-field" [field]="field"></formly-field>
          <div class="buttons">
            <button (click)="remove(i)" mat-icon-button color="warn" [matTooltip]="'Remove filter'">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
          <mat-divider></mat-divider>
        </div>
      </div>

      <div fxLayout="row">
        <button (click)="add()" type="button" mat-icon-button color="primary" [matTooltip]="'Add filter'"
                [disabled]="canAdded$ | async"
        >
          <mat-icon>add</mat-icon>
        </button>
      </div>
    </div>

  `,
  styles: [
      `
      .formly-filters-type .row {
        display: flex;
        justify-content: left;
        flex: 1;
        background-color: #e8f9ff;
        padding: 7px 0 10px 10px;
        margin-bottom: 10px;
      }

      .formly-filters-type .row .buttons {
        flex: 1 40px;
      }

      .formly-filters-type .row .formly-field {
        width: 100%;
      }

      .formly-filters-type .row formly-group {
        display: flex;
        flex-wrap: wrap;
      }

      .formly-filters-type .row formly-group .mat-form-field-infix {
        min-width: 80px;
        width: 100%;
      }

      .formly-filters-type .row formly-group .left,
      .formly-filters-type .row formly-group .right {
        flex-grow: 1;
      }

      .formly-filters-type .row formly-group .center {
        flex-grow: 3;
      }

      .formly-filters-type .row formly-group .full {
        margin: 25px 0 10px;
        width: 100%;
      }

    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class FiltersTypeComponent extends FieldArrayType implements OnInit {

  _canAdded$: Observable<boolean>;
  get canAdded$() {
    return this._canAdded$;
  }

  set canAdded$(value) {
    this._canAdded$ = value;
  }

  ngOnInit(): void {
    this.canAdded$ = this._calculateButtonState();
  }

  private _calculateButtonState() {
    return this.field.form.statusChanges.pipe(
      map((s) => s === 'INVALID')
    );
  }

}
