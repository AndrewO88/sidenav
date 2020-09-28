import {AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'mat-select-autocomplete',
  template: `
    <mat-select
      #selectElem
      [placeholder]="placeholder"
      [formControl]="formControl"
      [multiple]="multiple"
      [(ngModel)]="selectedValue"
      (selectionChange)="onSelectionChange($event)"
    >
      <div class="top-row">
        <div class="box-search">
          <mat-checkbox
            *ngIf="displaySelectAll"
            color="primary"
            class="box-select-all"
            [(ngModel)]="selectAllChecked"
            (change)="toggleSelectAll($event)"
          ></mat-checkbox>
          <input
            #searchInput
            type="text"
            [ngClass]="{ 'pl-1': !multiple }"
            (input)="filterItem(searchInput.value)"
            [placeholder]="selectPlaceholder"
          />
          <div
            class="box-search-icon"
            (click)="filterItem(''); searchInput.value = ''"
          >
            <button mat-icon-button class="search-button">
              <mat-icon class="mat-24" aria-label="Search icon">clear</mat-icon>
            </button>
          </div>
        </div>
        <div *ngIf="submitButton"
             class="top-row-submit-icon"
        >
          <button (click)="onSubmit()" [disabled]="!selectedValue.length" mat-icon-button class="submit-button">
            <mat-icon svgIcon="checkbox-marked-outline" aria-hidden="false" aria-label="Submit icon"></mat-icon>
          </button>
        </div>
      </div>
      <mat-select-trigger>
        {{ onDisplayString() }}
      </mat-select-trigger>
      <mat-option
        *ngFor="let option of options; trackBy: trackByFn"
        [disabled]="option.disabled"
        [value]="option[value]"
        [style.display]="hideOption(option) ? 'none' : 'flex'"
      >{{ option[display] }}
      </mat-option>
    </mat-select>
    <mat-hint style="color:#ff0000" *ngIf="showErrorMsg">{{ errorMsg }}</mat-hint>
  `,
  styles: [
      `
      .top-row {
        display: flex;
        align-items: center;
      }

      .top-row-submit-icon {
        margin-left: auto;
      }

      .box-search {
        margin: 8px 0 8px 8px;
        border-radius: 2px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16),
        0 0 0 1px rgba(0, 0, 0, 0.08);
        transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        flex-grow: 1;
      }

      .box-search input {
        flex: 1;
        border: none;
        outline: none;
      }

      .box-select-all {
        width: 36px;
        line-height: 33px;
        color: #808080;
        text-align: center;
      }

      .search-button, .submit-button {
        width: 36px;
        height: 36px;
        line-height: 33px;
        color: #808080;
      }

      .submit-button:hover:enabled {
        color: #2f802f;
      }

      .pl-1 {
        padding-left: 1rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectAutocompleteComponent implements OnChanges, DoCheck, AfterViewInit {
  @Input() selectPlaceholder: string = 'search...';
  @Input() placeholder: string;
  @Input() options;
  @Input() disabled = false;
  @Input() display = 'display';
  @Input() value = 'value';
  @Input() formControl: FormControl = new FormControl();
  @Input() errorMsg: string = 'Field is required';
  @Input() showErrorMsg = false;
  @Input() selectedOptions;
  @Input() multiple = true;
  @Input() displaySelectAll = false;
  @Input() submitButton = false;

  // New Options
  @Input() labelCount: number = 1;
  @Input() appearance: 'standard' | 'fill' | 'outline' = 'standard';

  @Output()
  selectionChange: EventEmitter<any> = new EventEmitter();

  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('selectElem') selectElem: MatSelect;

  filteredOptions: Array<any> = [];
  selectedValue: Array<any> = [];
  selectAllChecked = false;
  displayString = '';

  ngAfterViewInit() {
    this.selectElem.openedChange.subscribe((opened) => {
      if (!opened) {
        this.submit.emit(true);
      }
    });
  }

  ngOnChanges() {
    if (this.disabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
    this.filteredOptions = this.options;
    if (this.selectedOptions) {
      this.selectedValue = this.selectedOptions;
    } else if (this.formControl.value) {
      this.selectedValue = this.formControl.value;
    }
  }

  ngDoCheck() {
    if (!this.selectedValue.length) {
      this.selectionChange.emit(this.selectedValue);
    }
  }

  toggleDropdown() {
    this.selectElem.toggle();
  }

  toggleSelectAll(val) {
    if (val.checked) {
      this.filteredOptions.forEach(option => {
        if (!this.selectedValue.includes(option[this.value])) {
          this.selectedValue = this.selectedValue.concat([option[this.value]]);
        }
      });
    } else {
      const filteredValues = this.getFilteredOptionsValues();
      this.selectedValue = this.selectedValue.filter(
        item => !filteredValues.includes(item)
      );
    }
    this.selectionChange.emit(this.selectedValue);
  }

  filterItem(value) {
    this.filteredOptions = this.options.filter(
      item => item[this.display].toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    this.selectAllChecked = true;
    this.filteredOptions.forEach(item => {
      if (!this.selectedValue.includes(item[this.value])) {
        this.selectAllChecked = false;
      }
    });
    if (!this.filteredOptions.length) {
      this.selectAllChecked = false;
    }
  }

  hideOption(option) {
    return !(this.filteredOptions.indexOf(option) > -1);
  }

  // Returns plain strings array of filtered values
  getFilteredOptionsValues() {
    const filteredValues = [];
    this.filteredOptions.forEach(option => {
      filteredValues.push(option.value);
    });
    return filteredValues;
  }

  onDisplayString() {
    this.displayString = '';
    if (!!this.options) {

      if (this.selectedValue && this.selectedValue.length) {
        let displayOption = [];
        if (this.multiple) {
          // Multi select display
          for (let i = 0; i < this.labelCount; i++) {
            displayOption[i] = this.options.filter(
              option => option[this.value] === this.selectedValue[i]
            )[0];
          }
          if (displayOption.length) {
            for (let i = 0; i < displayOption.length; i++) {
              if (displayOption[i] && displayOption[i][this.display]) {
                this.displayString += displayOption[i][this.display] + ',';
              }
            }
            this.displayString = this.displayString.slice(0, -1);
            if (
              this.selectedValue.length > 1 &&
              this.selectedValue.length > this.labelCount
            ) {
              this.displayString += ` (+${this.selectedValue.length -
              this.labelCount} ещё)`;
            }
          }
        } else {
          // Single select display
          displayOption = this.options.filter(
            option => option[this.value] === this.selectedValue
          );
          if (displayOption.length) {
            this.displayString = displayOption[0][this.display];
          }
        }
      }
    }
    return this.displayString;
  }

  onSelectionChange(val) {
    const filteredValues = this.getFilteredOptionsValues();
    let count = 0;
    if (this.multiple) {
      this.selectedValue.filter(item => {
        if (filteredValues.includes(item)) {
          count++;
        }
      });
      this.selectAllChecked = count === this.filteredOptions.length;
    }
    this.selectedValue = val.value;
    this.selectionChange.emit(this.selectedValue);
  }

  public trackByFn(index, item) {
    return item.value;
  }

  onSubmit() {
    this.selectElem.close();
  }

}
