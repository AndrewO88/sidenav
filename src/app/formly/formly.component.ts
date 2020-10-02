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
      dateInterval: ['10-10-2020', '10-20-2020'],
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
        label: 'Фильтры',
        disabled: false,
        fields: [
          {
            type: 'tabset',
            fieldGroup: [
              this._helper.USER_FILTERS,
              this._helper.CROSS_FILTER
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
}
