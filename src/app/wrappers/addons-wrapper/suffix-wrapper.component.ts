import {AfterViewInit, Component, TemplateRef, ViewChild} from '@angular/core';
import {FieldWrapper} from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-suffix',
  template: `

    <ng-container #fieldComponent></ng-container>

    <ng-template #matSuffix>
    <span
      *ngIf="to.addonRight"
      [ngStyle]="{cursor: to.addonRight.onClick ? 'pointer' : 'inherit'}"
      (click)="addonRightClick($event)"
    >
      &nbsp;<mat-icon *ngIf="to.addonRight.icon">{{ to.addonRight.icon }}</mat-icon>
      &nbsp;<span *ngIf="to.addonRight.text">{{ to.addonRight.text }}</span>
    </span>
    </ng-template>
  `,
})
export class SuffixWrapperComponent extends FieldWrapper implements AfterViewInit {
  @ViewChild('matSuffix') matSuffix: TemplateRef<any>;

  ngAfterViewInit() {
    if (this.matSuffix) {
      Promise.resolve().then(() => this.to.suffix = this.matSuffix);
    }
  }

  addonRightClick($event: any) {
    if (this.to.addonRight.onClick) {
      this.to.addonRight.onClick(this.to, this, $event);
    }
  }

}
