import {Injectable} from '@angular/core';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {combineLatest, Observable, of} from 'rxjs';
import {filter, map, startWith, switchMap, tap} from 'rxjs/operators';
import {Tab} from '../formly/formly.component';
import {FormArray} from '@angular/forms';


export interface FormlyOption {
  name: string;
  value: string;
  disabled?: boolean;
}

export interface IStackLevel {
  type: StackLevelType;
  value?: string;
  dimension?: Dimension;
}

export interface IFilter {
  l: string;
  oper: string;
  r: string[];
  ds: string;
  dv?: 'Ко всем детализациям' | 'К некоторым (выбрать)';
  chd?: any;
  interval: [Date, Date];
  hidden?: boolean;
  panel?: boolean;
  cross?: string;
  targets?: string[];
  widget?: boolean;
}

export type Dimension = string;
export type StackLevelType = 'selector' | 'true' | 'and';

@Injectable({
  providedIn: 'root'
})
export class SchemaHelpersService {
  _translate = {
    instant: (value: string) => value
  };

  CHART_TITLES: FormlyFieldConfig = {
    key: 'titles',
    wrappers: ['mat-expansion-panel'],
    type: 'array',
    templateOptions: {
      label: this._translate.instant('Titles'),
      description: this._translate.instant('Top and bottom titles parameters'),
      attributes: {
        icon: null,
      }
    },
    fieldArray: {
      fieldGroup: [
        {
          key: 'text',
          type: 'string',
          templateOptions: {
            label: this._translate.instant('Title text')
          }
        },
        {
          key: 'color',
          type: 'color-picker',
          defaultValue: '#000000',
          templateOptions: {
            label: this._translate.instant('Text color'),
          },
        },
        {
          key: 'marginBottom',
          type: 'number',
          wrappers: ['suffix', 'form-field'],
          templateOptions: {
            label: this._translate.instant('Margin bottom'),
            addonRight: {
              text: 'px'
            }
          }
        },
        {
          key: 'marginTop',
          type: 'number',
          wrappers: ['suffix', 'form-field'],
          templateOptions: {
            label: this._translate.instant('Margin top'),
            addonRight: {
              text: 'px'
            }
          }
        },
        {
          key: 'align',
          type: 'select',
          templateOptions: {
            label: this._translate.instant('Horizontal alignment'),
            options: [
              {value: 'right', label: this._translate.instant('Right')},
              {value: 'center', label: this._translate.instant('Center')},
              {value: 'left', label: this._translate.instant('Left')},
            ]
          }
        },
        {
          key: 'valign',
          type: 'select',
          templateOptions: {
            label: this._translate.instant('Vertical location'),
            options: [
              {value: 'top', label: this._translate.instant('Top')},
              {value: 'bottom', label: this._translate.instant('Bottom')}
            ]
          }
        },
        {
          key: 'format',
          type: 'select',
          templateOptions: {
            label: this._translate.instant('Text format'),
            options: [
              {value: 'bold', label: this._translate.instant('Bold')},
              {value: 'italic', label: this._translate.instant('Italic')},
              {value: 'line-through', label: this._translate.instant('Line-through')},
              {value: 'underline', label: this._translate.instant('Underline')}
            ]
          }
        }
      ]
    }
  };
  DATE_INTERVAL: FormlyFieldConfig = {
    key: 'dateInterval',
    wrappers: ['mat-expansion-panel'],
    type: 'date-range',
    templateOptions: {
      label: this._translate.instant('Period'),
      description: this._translate.instant('Period parameters'),
      attributes: {
        icon: null,
        label: this._translate.instant('Enter a date range'),
        invalidStart: this._translate.instant('Invalid start date'),
        invalidEnd: this._translate.instant('Invalid end date'),
      }
    }
  };
  DATA_SOURCE: FormlyFieldConfig = {
    key: 'dataSource',
    wrappers: ['mat-expansion-panel', 'form-field'],
    type: 'select',
    templateOptions: {
      label: this._translate.instant('Data source'),
      description: this._translate.instant('Select data source'),
      attributes: {
        icon: null

      },
      options: [],
      valueProp: 'value',
      labelProp: 'name',
      required: true
    },
    hooks: {
      onInit: (field) => {
        field.templateOptions.options = of([]);
      }
    }
  };
  AGGREGATIONS = {
    key: 'aggregation',
    wrappers: ['mat-expansion-panel', 'form-field'],
    type: 'select',
    templateOptions: {
      label: this._translate.instant('Aggregation'),
      description: this._translate.instant('Select aggregation function'),
      attributes: {
        icon: null
      },
      options: [],
      multiple: true,
      valueProp: 'value',
      labelProp: 'name',
      required: true
    },
    hooks: {
      onInit: (field) => {
        field.templateOptions.options = of([]);
      }
    }
  };
  DIMENSIONS = {
    key: 'dimensions',
    wrappers: ['mat-expansion-panel', 'form-field'],
    type: 'select',
    templateOptions: {
      label: this._translate.instant('Dimension'),
      description: this._translate.instant('Select a dimension. Dimension selection is available after selecting Data source'),
      attributes: {
        icon: null
      },
      multiple: true,
      options: [],
      valueProp: 'value',
      labelProp: 'name',
    },
    hooks: {
      onInit: (field) => {
        field.templateOptions.options = of([]);
      }
    }
  };
  METRICS = {
    key: 'metrics',
    wrappers: ['mat-expansion-panel', 'form-field'],
    type: 'select',
    templateOptions: {
      label: this._translate.instant('Metric'),
      description: this._translate.instant('Select a metric. Metric selection is available after selecting Data source'),
      attributes: {
        icon: null
      },
      multiple: true,
      options: [],
      valueProp: 'value',
      labelProp: 'name',
      required: true
    },
    hooks: {
      onInit: (field) => {
        field.templateOptions.options = of([]);
      }
    }
  };
  VALUE_AXES: FormlyFieldConfig = {
    key: 'valueAxes',
    wrappers: ['mat-expansion-panel'],
    type: 'array',
    templateOptions: {
      label: this._translate.instant('Value axis'),
      description: this._translate.instant('Value axis parameters'),
      attributes: {
        icon: null
      },
      single: true,
      backgroundColor: '#FFFFFF'
    },
    fieldArray: {
      fieldGroup: [
        {
          key: 'renderer',
          fieldGroup: [
            {
              key: 'labels',
              fieldGroup: [
                {
                  key: 'template',
                  fieldGroup: [
                    {
                      key: 'disabled',
                      type: 'boolean',
                      templateOptions: {
                        label: this._translate.instant('Hide labels'),
                      }
                    },
                  ]
                }
              ]
            }
          ]
        },
        {
          key: 'min',
          type: 'number',
          templateOptions: {
            label: this._translate.instant('Minimum value'),
          },
          hideExpression: model => !!model?.renderer?.labels?.template?.disabled
        },
        {
          key: 'max',
          type: 'number',
          templateOptions: {
            label: this._translate.instant('Maximum value'),
          },
          hideExpression: model => !!model?.renderer?.labels?.template?.disabled
        }
      ]
    }
  };
  BULLETS: FormlyFieldConfig = {
    key: 'bullets',
    wrappers: ['mat-expansion-panel'],
    templateOptions: {
      label: this._translate.instant('Labels'),
      description: this._translate.instant('Parameters of labels on series'),
      attributes: {
        icon: null
      }
    },
    fieldGroup: [
      {
        key: 'disabled',
        type: 'boolean',
        templateOptions: {
          label: this._translate.instant('Hide labels'),
        }
      },
      {
        key: 'color',
        type: 'color-picker',
        defaultValue: '',
        templateOptions: {
          label: this._translate.instant('Color'),
          height: '55px'
        },
        hideExpression: (model) => model.disabled
      },
      {
        key: 'numberFormatter',
        type: 'select',
        templateOptions: {
          label: this._translate.instant('Value format'),
          options: [
            {value: '#,###.', label: this._translate.instant('Integer')},
            {value: '#,###.0', label: '.0'},
            {value: '#,###.00', label: '.00'},
            {value: '#,###.000', label: '.000'},
            {value: '#,###.%', label: '%'},
            {value: '#,###.0%', label: '.0%'},
            {value: '#,###.00%', label: '.00%'},
            {value: '#,###.##', label: '.##'}
          ]
        },
        hideExpression: (model) => model.disabled
      },
      {
        key: 'format',
        type: 'select',
        templateOptions: {
          label: this._translate.instant('Text format'),
          options: [
            {value: 'bold', label: this._translate.instant('Bold')},
            {value: 'italic', label: this._translate.instant('Italic')},
            {value: 'line-through', label: this._translate.instant('Line-through')},
            {value: 'underline', label: this._translate.instant('Underline')}
          ]
        },
        hideExpression: (model) => model.disabled
      }
    ]
  };
  LEGEND: FormlyFieldConfig = {
    key: 'legend',
    wrappers: ['mat-expansion-panel'],
    templateOptions: {
      label: this._translate.instant('Legend'),
      description: this._translate.instant('Legend parameters'),
      attributes: {
        icon: null,
        faq: this._translate.instant('Legend parameters'),
      }
    },
    fieldGroup: [
      {
        key: 'disabled',
        type: 'boolean',
        templateOptions: {
          label: this._translate.instant('Turn off legend'),
        }
      },
      {
        key: 'position',
        type: 'select',
        templateOptions: {
          label: this._translate.instant('Legend position'),
          options: [
            {value: 'top', label: this._translate.instant('Top')},
            {value: 'right', label: this._translate.instant('Right')},
            {value: 'bottom', label: this._translate.instant('Bottom')},
            {value: 'left', label: this._translate.instant('Left')}
          ]
        },
        hideExpression: (legend) => {
          return legend.disabled;
        }
      },
      {
        key: 'contentAlign',
        type: 'select',
        templateOptions: {
          label: this._translate.instant('Horizontal alignment'),
          options: [
            {value: 'right', label: this._translate.instant('Right')},
            {value: 'center', label: this._translate.instant('Center')},
            {value: 'left', label: this._translate.instant('Left')},
          ]
        },
        hideExpression: (legend) => {
          return legend.disabled;
        }
      },
      {
        key: 'valign',
        type: 'select',
        templateOptions: {
          label: this._translate.instant('Vertical alignment'),
          options: [
            {value: 'top', label: this._translate.instant('Top')},
            {value: 'bottom', label: this._translate.instant('Bottom')}
          ]
        },
        hideExpression: (legend) => {
          return legend.disabled;
        }
      }
    ]

  };
  COLORS: Tab = {
    label: this._translate.instant('Design'),
    disabled: false,
    fields: [
      {
        type: 'tabset',
        fieldGroup: [
          {
            key: 'colors',
            type: 'colors',
            wrappers: ['mat-expansion-panel'],
            templateOptions: {
              label: this._translate.instant('Color sets for charts'),
              description: this._translate.instant('Color sets for charts'),
              attributes: {
                icon: null
              }
            },
          }
        ]
      }
    ]
  };
  STACK_FIELD_ARRAY: FormlyFieldConfig = {
    fieldGroup: [
      {
        key: 'type',
        defaultValue: 'selector',
        hideExpression: true
      },
      {
        key: 'value',
        defaultValue: '',
        hideExpression: true
      },
      {
        key: 'dimension',
        type: 'select',
        templateOptions: {
          options: [],
          valueProp: 'value',
          labelProp: 'name',
          required: true
        },
        hooks: {
          onInit: (field) => {
            field.templateOptions.label = field.parent.parent.templateOptions.labels[field.parent.key as number];

            const dsControl = field.parent.parent.parent.parent.formControl.get('dataSource');
            const stackControl = field.parent.parent.formControl;
            const dimensions$ = dsControl.valueChanges.pipe(
              startWith(dsControl.value as string),
              filter(ds => !!ds),
              switchMap((ds) => of([]))
            );
            const selectedDimensions$ = stackControl.valueChanges.pipe(
              startWith(stackControl.value as Partial<IStackLevel>[]),
              map<Partial<IStackLevel>[], string[]>((levels) =>
                levels.filter((level) => level.dimension)
                  .map<string>((level) => level.dimension)),
            );

            field.templateOptions.options = combineLatest([dimensions$, selectedDimensions$]).pipe(
              map<[string[], string[]], FormlyOption[]>((d) => {
                return [
                  ...d[0].map((dimension) => d[1].indexOf(dimension) === -1
                    ? {value: dimension, name: dimension}
                    : {value: dimension, name: dimension, disabled: true})
                ];
              })
            );
          }
        }
      },
    ]
  };
  USER_FILTERS: FormlyFieldConfig = {
    key: 'filters',
    type: 'filters',
    wrappers: ['mat-expansion-panel'],
    templateOptions: {
      label: this._translate.instant('Filters'),
      description: this._translate.instant('Filters parameters'),
      attributes: {
        icon: null
      },
      panel: false
    },
    fieldArray: {
      hideExpression: (model) => model.hasOwnProperty('panel') || model.hasOwnProperty('cross') || model.hasOwnProperty('widget'),
      fieldGroup: [
        {
          key: 'l',
          type: 'select',
          className: 'left',
          templateOptions: {
            label: this._translate.instant('Field'),
            description: this._translate.instant('Available after selecting a data source'),
            options: [],
            valueProp: 'value',
            labelProp: 'name',
            required: true,
            change: field => {
              if (field.parent.model.r) {
                field.parent.formControl.get('r').setValue(null);
              }
            }
          },
          hooks: {
            onInit: (field) => {
              const dsControl = (field.formControl.parent.parent.parent.parent as FormArray).at(0).get('query').get('dataSource');

              const metricsOptions$ = dsControl.valueChanges.pipe(
                startWith(dsControl.value as string),
                filter(ds => !!ds),
                switchMap((ds) => of([])),
                map<string[], FormlyOption[]>((ds) => ds.map(i => ({value: i, name: i})))
              );

              const dimensionsOptions$ = dsControl.valueChanges.pipe(
                startWith(dsControl.value as string),
                filter(ds => !!ds),
                switchMap((ds) => of([])),
                map<string[], FormlyOption[]>((ds) => ds.map(i => ({value: i, name: i}))),
              );

              field.templateOptions.options = combineLatest([dimensionsOptions$, metricsOptions$]).pipe(
                map(([dimensions, metrics]) => {
                  return [].concat(dimensions).concat(metrics);
                })
              );

            }
          }
        },
        {
          key: 'oper',
          type: 'select',
          className: 'center',
          templateOptions: {
            label: this._translate.instant('Operators'),
            options: [],
            valueProp: 'value',
            labelProp: 'name',
            required: true,
            change: field => {
              if (field.parent.model.r) {
                field.parent.formControl.get('r').setValue(null);
              }
            }
          }
        },
        {
          key: 'r',
          type: 'multiple-autocomplete',
          wrappers: ['form-field'],
          className: 'right',
          templateOptions: {
            label: this._translate.instant('Value'),
            options: [],
            valueProp: 'value',
            labelProp: 'name',
            required: true,
            multiple: true,
            displaySelectAll: undefined,
            selectPlaceholder: this._translate.instant('search')
          },
          hideExpression: (model) => !model.l || !model.oper,
          hooks: {
            onInit: (field) => {
              const lControl = field.parent.formControl.get('l');
              const operControl = field.parent.formControl.get('oper');
              const d: string = field.parent.parent.parent.parent.model.query.dataSource;
              const i: [Date, Date] = field.parent.parent.parent.parent.model.query.dateInterval;
              const filters: IFilter[] = [];

              field.templateOptions.options = lControl.valueChanges.pipe(
                startWith(lControl.value as string || ''),
                switchMap<string, Observable<string[]>>((l) => of([])),
                switchMap((options) => operControl.valueChanges.pipe(startWith(operControl.value as string), map(oper => [options, oper]))),
                switchMap(([options, oper]) => field.formControl.valueChanges.pipe(startWith([]), map((selected) => [options, selected, oper]))),
                map(([options, selected, oper]) => options.map((opt) => ({
                  name: opt,
                  value: opt,
                  disabled: (oper === '\u2209' || oper === '\u2208') ? false : (Array.isArray(selected) && selected.length > 0 && !selected.includes(opt))
                })))
              );

              field.templateOptions.displaySelectAll = operControl.valueChanges.pipe(
                startWith(operControl.value as string),
                map((oper) => oper === '\u2209' || oper === '\u2208')
              );

            }
          }
        },
        {
          key: 'targets',
          type: 'select',
          className: 'full',
          templateOptions: {
            multiple: true,
            selectAllOption: this._translate.instant('Select all'),
            label: this._translate.instant('Apply to'),
            description: this._translate.instant('Detail levels'),
            required: true,
            options: [],
            valueProp: 'value',
            labelProp: 'name'
          },
          hooks: {
            onInit: (field) => {
              const levelsControl = (field.formControl.parent.parent.parent.parent as FormArray).at(0).get('query').get('stack').get('levels');
              const mapLevelsToTargets = (level: Partial<IStackLevel>) => ({
                name: level.dimension,
                value: level.dimension
              });
              const filterLevels = (level: Partial<IStackLevel>) => level.dimension;
              const initValue = field.formControl.value;

              field.templateOptions.options = levelsControl.valueChanges.pipe(
                startWith(levelsControl.value as string[]),
                filter((x) => x.length),
                map((levels: Partial<IStackLevel>[]) => levels.filter(filterLevels).map(mapLevelsToTargets)),
                tap((l) => field.formControl.setValue(initValue || l.map(({value}) => value)))
              );
            }
          }
        },
      ]
    }
  };
  CROSS_FILTER: FormlyFieldConfig = {
    key: 'crossFilter',
    wrappers: ['mat-expansion-panel'],
    templateOptions: {
      label: this._translate.instant('Cross filter'),
      description: this._translate.instant('Cross filter parameters'),
      attributes: {
        icon: null
      }
    },
    fieldGroup: [
      {
        key: 'enabled',
        type: 'boolean',
        templateOptions: {
          label: this._translate.instant('Turn on Cross filter'),
        }
      }
    ]
  };
  BACKGROUND_COLOR: FormlyFieldConfig = {
    key: 'background',
    wrappers: ['mat-expansion-panel'],
    templateOptions: {
      label: this._translate.instant('Background'),
      description: this._translate.instant('Background parameters'),
      attributes: {
        icon: null,
        faq: this._translate.instant('Background parameters'),
      }
    },
    fieldGroup: [
      {
        key: 'fill',
        type: 'color-picker',
        defaultValue: '#FFFFFF',
        templateOptions: {
          label: this._translate.instant('Color'),
          height: '165px'
        },
      }
    ]
  };
  PALITRA: FormlyFieldConfig = {
    key: 'columns',
    wrappers: ['mat-expansion-panel'],
    templateOptions: {
      label: this._translate.instant('Dynamic palette'),
      description: this._translate.instant('Dynamic palette'),
      attributes: {
        icon: null
      }
    },
    fieldGroup: [
      {
        key: 'template',
        fieldGroup: [
          {
            key: 'propertyFields',
            fieldGroup: [
              {
                key: 'fill',
                type: 'select',
                templateOptions: {
                  label: this._translate.instant('Динамическая палитра'),
                  description: this._translate.instant('Динамическая палитра description'),
                  options: [
                    {value: 'Нет', name: 'Нет'},
                    {value: 'color', name: 'Да'}
                  ],
                  valueProp: 'value',
                  labelProp: 'name'
                },
              }
            ]
          }
        ]
      }
    ]
  };
}
