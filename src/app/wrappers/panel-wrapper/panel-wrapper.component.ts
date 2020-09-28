import {Component, ViewEncapsulation} from '@angular/core';
import {FieldWrapper} from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-panel',
  template: `
    <mat-expansion-panel class="formly-wrapper-expansion-panel" expanded="true">
      <mat-expansion-panel-header>
        <mat-panel-title>
          <div class="title">
            <div class="label">{{to?.label || ''}}</div>
            <div class="icon">
              <mat-icon class="faq-icon" svgIcon="comment-question-outline" matTooltip="{{to?.description || ''}}"></mat-icon>
            </div>
          </div>
        </mat-panel-title>
        <mat-panel-description>
          <mat-icon svgIcon="{{to?.attributes?.icon || ''}}"></mat-icon>
        </mat-panel-description>
      </mat-expansion-panel-header>

      <ng-container #fieldComponent></ng-container>

    </mat-expansion-panel>
  `,
  styles: [
      `
      .formly-wrapper-expansion-panel .mat-expansion-panel-header-title {
        flex-grow: 10;
      }

      .formly-wrapper-expansion-panel .mat-expansion-panel-header-description {
        flex-grow: 1;
      }

      .formly-wrapper-expansion-panel .title {
        display: flex;
      }

      .formly-wrapper-expansion-panel .title .icon {
        margin-left: 1px;
      }

      .formly-wrapper-expansion-panel .faq-icon svg {
        height: 12px;
        width: 12px;
      }

      .formly-wrapper-expansion-panel .mat-expansion-panel-header-title,
      .formly-wrapper-expansion-panel .mat-expansion-panel-header-description {
        flex-basis: 0;
        align-items: center;
      }

      .formly-wrapper-expansion-panel .mat-expansion-panel-header-description {
        justify-content: space-between;
        align-items: center;
      }

      .formly-wrapper-expansion-panel .mat-expansion-panel-spacing {
        margin: 16px 0 !important;
      }

      .formly-wrapper-expansion-panel .mat-expansion-panel {
        border-radius: 0 !important;
      }

      .formly-wrapper-expansion-panel.mat-expansion-panel {
        border: none;
      }

      .formly-wrapper-expansion-panel .mat-accordion .mat-expansion-panel .mat-expansion-panel-header span.mat-content {
        font-weight: normal;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class PanelWrapperComponent extends FieldWrapper {
}

