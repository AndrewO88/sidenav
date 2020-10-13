import {Component, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {SchemaHelpersService} from '../services/schema-helpers';


interface FormlySchema {
  tabs: Tab[];
}

export interface Tab {
  label: string;
  disabled: boolean;
  fields: FormlyFieldConfig[];
}

@Component({
  selector: 'app-formly',
  template: `
    <div *ngIf="form" class="param-manager">
      <ng-content></ng-content>

      <form [formGroup]="castFormGroup(form)">
        <mat-tab-group animationDuration="0ms">
          <mat-tab *ngFor="let tab of schema?.tabs;let index = index;">
            <!--        [disabled]="index !== 0 && !form.at(index - 1)?.valid"-->

            <ng-template mat-tab-label>
              <span>{{tab?.label}}</span>
            </ng-template>
            <button (click)="onClick()">ЖМЫХ</button>
            <formly-form (modelChange)="onChange(model)" [fields]="tab?.fields" [form]="castFormGroup(form.at(index))" [model]="model"
                         [options]="options[index]">
            </formly-form>
          </mat-tab>
        </mat-tab-group>
      </form>

    </div>
  `,
  styles: [
      `
      .param-manager {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }

      .param-manager form > .mat-tab-group > .mat-tab-header .mat-tab-label,
      .param-manager form > .mat-tab-group > .mat-tab-header .mat-tab-label-active {
        min-width: 0;
      }
    `
  ], encapsulation: ViewEncapsulation.None
})

export class FormlyComponent {
  _translate = {
    instant: (value: string) => value
  };

  form: FormArray = new FormArray([]);
  model = {
    query: {
      titles: [
        {
          text: 'Столбчатый'
        }
      ],
      dataSource: undefined,
      dimensions: undefined,
      dateInterval: [new Date(), new Date()],
      metrics: undefined,
      granularity: {'type': 'all'},
      aggregation: [],
      postAggregations: [],
      stack: {
        current: 0,
        levels: [
          {
            type: 'true',
            dimension: undefined,
            value: undefined
          }
        ]
      }
    },
    chart: {
      valueAxes: [
        {
          renderer: {
            labels: {
              template: {
                disabled: false
              }
            }
          }
        }
      ],
      bullets: {
        disabled: false,
        numberFormatter: '#,###.'
      }
    },
    filters: [],
    colors: null,
  };


  options: FormlyFormOptions = {};
  schema: FormlySchema = {
    tabs: [
      {
        label: 'Параметры',
        disabled: false,
        fields: [
          {
            key: 'query',
            type: 'tabset',
            templateOptions: {
              tabs: [
                {
                  label: 'Titles',
                  icon: 'brightness_auto'
                },
                {
                  label: 'Query',
                  icon: 'brightness_low'
                }
              ]
            },
            fieldGroup: [
              this._helper.CHART_TITLES,
              this._helper.DATE_INTERVAL,
              this._helper.DATA_SOURCE,
              this._helper.DIMENSIONS,
              this._helper.AGGREGATIONS,
              this._helper.METRICS,
              // this._helper.STACK
            ]
          }
        ]
      },
      {
        label: 'Настройки',
        disabled: false,
        fields: [
          {
            key: 'gridsterConfig',
            type: 'tabset',
            templateOptions: {
              tabs: [
                {
                  label: 'Grid sizes',
                  icon: 'brightness_auto',
                  disabled : false,
                },
                {
                  label: 'Drag&Drop',
                  icon: 'brightness_low',
                  disabled : false,
                },
                {
                  label: 'Push',
                  icon: 'brightness_auto',
                  disabled : false,
                },
                {
                  label: 'Resize&Add',
                  icon: 'brightness_low'
                },
                {
                  label: 'Grid Types',
                  icon: 'brightness_auto'
                },
                {
                  label: 'View',
                  icon: 'brightness_low'
                },
                {
                  label: 'Margins',
                  icon: 'brightness_auto'
                },
                {
                  label: 'Scroll',
                  icon: 'brightness_low'
                },
              ]
            },
            fieldGroup: [
              this._helper.MAX_COLS,
              this._helper.MAX_ROWS,
              this._helper.MIN_COLS,
              this._helper.MIN_ROWS,
              this._helper.MAX_ITEM_COLS,
              this._helper.MIN_ITEM_COLS,
              this._helper.MAX_ITEM_ROWS,
              this._helper.MIN_ITEM_ROWS,
              this._helper.MIN_ITEM_AREA,
              this._helper.MAX_ITEM_AREA,
              this._helper.DRAGGABLE_ENABLED,
              this._helper.DRAGGABLE_IGNORE_CONTENT_CLASS,
              this._helper.RESIZABLE_ENABLED,
              this._helper.DRAGGABLE_DROP_OVER_ITEMS,
              this._helper.SWAP,
              this._helper.PUSH_ITEMS,
              this._helper.DISABLE_PUSH_ON_DRAG,
              this._helper.DISABLE_PUSH_ON_RESIZE,
              this._helper.PUSH_RESIZE_ITEMS,
              this._helper.ENABLE_EMPTY_CELL_CLICK,
              this._helper.ENABLE_EMPTY_CELL_DRAG,
              this._helper.ENABLE_EMPTY_CELL_DROP,
              this._helper.ENABLE_OCCUPITED_CELL_DROP,
              this._helper.ENABLE_EMPTY_CELL_CONTEXT_MENU,
              this._helper.EMPTY_CELL_DRAG_MAX_COLS,
              this._helper.EMPTY_CELL_DRAG_MAX_ROWS,
              this._helper.GRID_TYPE,
              this._helper.FIXED_COL_WIDTH,
              this._helper.FIXED_ROW_HEIGHT,
              this._helper.KEEP_FIXED_WIDTH_IN_MOBILE,
              this._helper.KEEP_FIXED_HEIGHT_IN_MOBILE,
              this._helper.MOBILE_BREAK_POINT,
              this._helper.COMPACT_TYPE,
              this._helper.DISPLAY_GRID,
              this._helper.MARGIN,
              this._helper.OUTER_MARGIN,
              this._helper.OUTER_MARGIN_TOP,
              this._helper.OUTER_MARGIN_RIGHT,
              this._helper.OUTER_MARGIN_BOTTOM,
              this._helper.OUTER_MARGIN_LEFT,
              this._helper.DISABLE_SCROLL_HORIZONTAL,
              this._helper.DISABLE_SCROLL_VERTICAL,
            ]
          }
        ]
      },
      {
        label: 'Отображение',
        disabled: false,
        fields: [
          {
            key: 'chart',
            type: 'tabset',
            fieldGroup: [
              this._helper.LEGEND,
              this._helper.VALUE_AXES,
              this._helper.BULLETS
            ]
          }
        ]
      },
      this._helper.COLORS,
    ]
  };

  constructor(private _helper: SchemaHelpersService) {
  }

  castFormGroup(value: AbstractControl): FormGroup {
    return value as FormGroup;
  }

  onChange(model: any) {
    console.log(model);
  }

  onClick() {
    console.log(this.model);
  }
}
