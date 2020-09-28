import {Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

@Component({
  selector: 'formly-field-button',
  template: `
    <div>
      <button (click)="onClick(field)" [type]="to.type || 'button'" [ngClass]="to.class || ''" mat-icon-button>
        <mat-icon>{{ to.icon || 'delete' }}</mat-icon>
        {{ to.text || '' }}
      </button>
    </div>
  `,
})
export class FormlyButtonTypeComponent extends FieldType {
  onClick(field) {
    if (this.to.onClick) {
      this.to.onClick(field);
    }
  }
}
