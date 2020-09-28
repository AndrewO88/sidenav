import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FieldType} from '@ngx-formly/material';
import {isEqual, sortBy} from 'lodash';
import {Observable} from 'rxjs';


@Component({
  selector: 'formly-autocomplete-type',
  template: `
    <mat-select-autocomplete
      [placeholder]="to.placeholder"
      [showErrorMsg]="showError"
      [options]="options$ | async"
      [display]="to.labelProp"
      [value]="to.valueProp"
      [multiple]="to.multiple"
      [displaySelectAll]="to.displaySelectAll | async"
      [labelCount]="2"
      [selectedOptions]="value || []"
      [selectPlaceholder]="to?.selectPlaceholder"
      [submitButton]="to.submitButton"
      (selectionChange)="getSelectedOptions($event)"
      (submit)="onSubmit(field)"
    >
    </mat-select-autocomplete>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleAutocompleteTypeComponent extends FieldType {
  options$: Observable<any[]>;

  ngOnInit() {
    super.ngOnInit();
    this.options$ = this.to.options as Observable<any[]>;
  }

  getSelectedOptions(selected: any[]) {
    if (!isEqual(sortBy(this.formControl.value), sortBy(selected))) {
      this.formControl.setValue(selected);
    }
  }

  onSubmit(field) {
    if (this.to.onClick) {
      this.to.onClick(field);
    }
  }

}
