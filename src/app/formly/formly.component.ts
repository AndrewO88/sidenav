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

            <formly-form [fields]="tab?.fields" [form]="castFormGroup(form.at(index))" [model]="model"
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
        width: 500px;
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
      granularity: { 'type': 'all' },
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
            fieldGroup: [
              this._helper.CHART_TITLES,
              this._helper.DATE_INTERVAL,
              this._helper.DATA_SOURCE,
              this._helper.DIMENSIONS,
              this._helper.AGGREGATIONS,
              this._helper.METRICS,
              {
                key: 'stack',
                wrappers: ['mat-expansion-panel'],
                templateOptions: {
                  label: this._translate.instant('Data drilling'),
                  description: this._translate.instant('Data drilling parameters'),
                  attributes: {
                    icon: null
                  },
                },
                fieldGroup: [
                  {
                    key: 'levels',
                    type: 'stack',
                    templateOptions: {
                      label: this._translate.instant('Detail levels'),
                      description: this._translate.instant('Data drilling parameters'),
                      labels: [
                        this._translate.instant('Category'),
                        this._translate.instant('Drilldown(Level 1)'),
                        this._translate.instant('Drilldown(Level 2)'),
                        this._translate.instant('Drilldown(Level 3)'),
                        this._translate.instant('Drilldown(Level 4)'),
                        this._translate.instant('Drilldown(Level 5)')
                      ]
                    },
                    fieldArray: this._helper.STACK_FIELD_ARRAY
                  }
                ]
              },
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
      this._helper.COLORS
    ]
  };

  constructor(private _helper: SchemaHelpersService) {
  }

  castFormGroup(value: AbstractControl): FormGroup {
    return value as FormGroup;
  }
}
