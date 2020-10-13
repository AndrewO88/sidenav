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
    wrappers: ['test-mat-expansion-panel'],
    type: 'array',
    templateOptions: {
      label: this._translate.instant('Titles'),
      description: this._translate.instant('Top and bottom titles parameters'),
      attributes: {
        forTab: 'titles',
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
    // wrappers: ['mat-expansion-panel'],
    type: 'date-range',
    templateOptions: {
      label: this._translate.instant('Period'),
      description: this._translate.instant('Period parameters'),
      attributes: {
        icon: null,
        label: this._translate.instant('Enter a date range*'),
        invalidStart: this._translate.instant('Invalid start date'),
        invalidEnd: this._translate.instant('Invalid end date'),
        forTab: 'query',
      }
    }
  };
  DATA_SOURCE: FormlyFieldConfig = {
    key: 'dataSource',
    // wrappers: ['test-mat-expansion-panel', 'form-field'],
    type: 'select',
    wrappers: ['form-field'],
    templateOptions: {
      label: this._translate.instant('Data source'),
      description: this._translate.instant('Select data source'),
      attributes: {
        icon: null,
        forTab: 'query',
      },
      options: [],
      valueProp: 'value',
      labelProp: 'name',
      required: true,
    },
    hooks: {
      onInit: (field) => {
        field.templateOptions.options = of([]);
      }
    }
  };
  AGGREGATIONS: FormlyFieldConfig = {
    key: 'aggregation',
    // wrappers: ['test-mat-expansion-panel', 'form-field'],
    wrappers: ['form-field'],
    type: 'select',
    templateOptions: {
      label: this._translate.instant('Aggregation'),
      description: this._translate.instant('Select aggregation function'),
      attributes: {
        icon: null,
        forTab: 'query',
      },
      options: [],
      multiple: true,
      valueProp: 'value',
      labelProp: 'name',
      required: true,
    },
    hooks: {
      onInit: (field) => {
        field.templateOptions.options = of([]);
      }
    }
  };
  DIMENSIONS: FormlyFieldConfig = {
    key: 'dimensions',
    // wrappers: ['test-mat-expansion-panel', 'form-field'],
    wrappers: ['form-field'],
    type: 'select',
    templateOptions: {
      label: this._translate.instant('Dimension'),
      description: this._translate.instant('Select a dimension. Dimension selection is available after selecting Data source'),
      attributes: {
        icon: null,
        forTab: 'query',
      },
      multiple: true,
      options: [],
      valueProp: 'value',
      labelProp: 'name',
      hidden: true,
    },
    hooks: {
      onInit: (field) => {
        field.templateOptions.options = of([]);
      }
    }
  };
  METRICS: FormlyFieldConfig = {
    key: 'metrics',
    // wrappers: ['test-mat-expansion-panel', 'form-field'],
    wrappers: ['form-field'],
    type: 'select',
    templateOptions: {
      label: this._translate.instant('Metric'),
      description: this._translate.instant('Select a metric. Metric selection is available after selecting Data source'),
      attributes: {
        icon: null,
        forTab: 'query',
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
    // wrappers: ['test-mat-expansion-panel'],
    type: 'array',
    templateOptions: {
      label: this._translate.instant('Value axis'),
      description: this._translate.instant('Value axis parameters'),
      attributes: {
        icon: null,
        forTab: 'query',
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
    // wrappers: ['test-mat-expansion-panel'],
    templateOptions: {
      label: this._translate.instant('Labels'),
      description: this._translate.instant('Parameters of labels on series'),
      attributes: {
        icon: null,
        forTab: 'query',
      },
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
    // wrappers: ['test-mat-expansion-panel'],
    templateOptions: {
      label: this._translate.instant('Legend'),
      description: this._translate.instant('Legend parameters'),
      attributes: {
        icon: null,
        forTab: 'query',
      },
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
    templateOptions: {
      attributes: {
        icon: null,
        forTab: 'query',
      },
    },
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
    // wrappers: ['test-mat-expansion-panel'],
    templateOptions: {
      label: this._translate.instant('Filters'),
      description: this._translate.instant('Filters parameters'),
      attributes: {
        icon: null,
        forTab: 'query',
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
    // wrappers: ['test-mat-expansion-panel'],
    templateOptions: {
      label: this._translate.instant('Cross filter'),
      description: this._translate.instant('Cross filter parameters'),
      attributes: {
        icon: null,
        forTab: 'query'
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
  STACK = {
    key: 'stack',
    // wrappers: ['test-mat-expansion-panel'],
    templateOptions: {
      label: this._translate.instant('Data drilling'),
      description: this._translate.instant('Data drilling parameters'),
      attributes: {
        icon: null,
        forTab: 'query'
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
        fieldArray: this.STACK_FIELD_ARRAY
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
  MAX_COLS: FormlyFieldConfig  = {
    key: 'maxCols',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Max cols',
      description: 'Maximum amount of columns in the dashboard-grid',
      attributes: {
        icon: null,
        forTab: 'Grid sizes',
      },
      value: 12,
      default: 12,
      access: ['admin', 'user'],
      paramName: 'maxCols'
    }
  };
  MAX_ROWS: FormlyFieldConfig  = {
    key: 'maxRows',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Max rows',
      description: 'Maximum amount of rows in the dashboard-grid',
      attributes: {
        icon: null,
        forTab: 'Grid sizes',
      },
      value: 12,
      default: 12,
      access: ['admin', 'user'],
      paramName: 'maxRows'
    },
  };
  MIN_COLS: FormlyFieldConfig  = {
    key: 'minCols',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Min cols',
      description: 'Minimum amount of cols in the dashboard-grid',
      attributes: {
        icon: null,
        forTab: 'Grid sizes',
      },
      value: 12,
      default: 12,
      access: ['admin', 'user'],
      paramName: 'minCols'
    },
  };
  MIN_ROWS: FormlyFieldConfig  = {
    key: 'minRows',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Min rows',
      description: 'Minimum amount of rows in the dashboard-grid',
      attributes: {
        icon: null,
        forTab: 'Grid sizes',
      },
      value: 12,
      default: 12,
      access: ['admin', 'user'],
      paramName: 'minRows'
    },
  };
  MAX_ITEM_COLS: FormlyFieldConfig  = {
    key: 'maxItemCols',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Max item cols',
      description: 'maximum item number of cols',
      attributes: {
        icon: null,
        forTab: 'Grid sizes',
      },
      value: 12,
      default: 12,
      access: ['admin'],
      paramName: 'maxItemCols'
    }
  };
  MIN_ITEM_COLS: FormlyFieldConfig  = {
    key: 'minItemCols',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Min item cols',
      description: 'minimum item number of cols',
      attributes: {
        icon: null,
        forTab: 'Grid sizes',
      },
      value: 1,
      default: 1,
      access: ['admin'],
      paramName: 'minItemCols'
    }
  };
  MAX_ITEM_ROWS: FormlyFieldConfig  = {
    key: 'maxItemRows',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Max item rows',
      description: 'maximum item number of rows',
      attributes: {
        icon: null,
        forTab: 'Grid sizes',
      },
      value: 12,
      default: 12,
      access: ['admin'],
      paramName: 'maxItemRows'
    }
  };
  MIN_ITEM_ROWS: FormlyFieldConfig  = {
    key: 'minItemRows',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Min item rows',
      description: 'minimum item number of rows',
      attributes: {
        icon: null,
        forTab: 'Grid sizes',
      },
      value: 1,
      default: 1,
      access: ['admin'],
      paramName: 'minItemRows'
    }
  };
  MIN_ITEM_AREA: FormlyFieldConfig  = {
    key: 'minItemArea',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Min item area',
      description: 'minimum item area: cols * rows',
      attributes: {
        icon: null,
        forTab: 'Grid sizes',
      },
      value: 1,
      default: 1,
      access: ['admin'],
      paramName: 'minItemArea'
    }
  };
  MAX_ITEM_AREA: FormlyFieldConfig  = {
    key: 'maxItemArea',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Max item area',
      description: 'maximum item area: cols * rows',
      attributes: {
        icon: null,
        forTab: 'Grid sizes',
      },
      value: 144,
      default: 144,
      access: ['admin', 'user'],
      paramName: 'maxItemArea'
    }
  };
  DRAGGABLE_ENABLED = {
    key: 'draggable.enabled',
    type: 'checkbox',
    wrappers: ['form-field'],
    draggable: 'enabled',
    templateOptions: {
      label: 'Drag Items',
      description: 'enable/disable draggable items',
      attributes: {
        icon: null,
        forTab: 'Drag&Drop',
      },
      value: true,
      default: true,
      access: ['admin'],
      paramName: 'draggable.enabled'
    }
  };
  DRAGGABLE_IGNORE_CONTENT_CLASS = {
    key: 'draggable.ignoreContentClass',
    type: 'checkbox',
    wrappers: ['form-field'],
    draggable: 'ignoreContentClass',
    templateOptions: {
      label: 'Ignore Content Class',
      description: '',
      attributes: {
        icon: null,
        forTab: 'Drag&Drop',
      },
      value: 'no-drag',
      default: 'no-drag',
      access: ['admin'],
      paramName: 'draggable.ignoreContentClass'
    }
  };
  RESIZABLE_ENABLED = {
    key: 'resizable.enabled',
    type: 'checkbox',
    wrappers: ['form-field'],
    resizable: 'enabled',
    templateOptions: {
      label: 'Resizable items',
      description: 'enable/disable resizable items',
      attributes: {
        icon: null,
        forTab: 'Drag&Drop',
      },
      value: true,
      default: true,
      access: ['admin'],
      paramName: 'resizable.enabled'
    }
  };
  DRAGGABLE_DROP_OVER_ITEMS = {
    key: 'draggable.dropOverItems',
    type: 'checkbox',
    wrappers: ['form-field'],
    draggable: 'dropOverItems',
    templateOptions: {
      label: 'Drop over another',
      description: 'enable items drop over another, will work if swap and push is disabled',
      attributes: {
        icon: null,
        forTab: 'Drag&Drop',
      },
      value: true,
      default: true,
      access: ['admin'],
      paramName: 'draggable.dropOverItems'
    }
  };
  SWAP = {
    key: 'swap',
    type: 'checkbox',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Swap items',
      description: 'allow items to switch position if drop on top of another',
      attributes: {
        icon: null,
        forTab: 'Drag&Drop',
      },
      value: true,
      default: true,
      access: ['admin'],
      paramName: 'swap'
    }
  };
  PUSH_ITEMS = {
    key: 'pushItems',
    type: 'checkbox',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Push items',
      description:  'push items when resizing and dragging',
      attributes: {
        icon: null,
        forTab: 'Push',
      },
      value: true,
      default: true,
      access: ['admin'],
      paramName: 'pushItems'
    }
  };
  DISABLE_PUSH_ON_DRAG = {
    key: 'disablePushOnDrag',
    type: 'checkbox',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Disable Push On Drag',
      description:  'disable push on drag',
      attributes: {
        icon: null,
        forTab: 'Push',
      },
      value: false,
      default: false,
      access: ['admin'],
      paramName: 'disablePushOnDrag'
    }
  };
  DISABLE_PUSH_ON_RESIZE = {
    key: 'disablePushOnResize',
    type: 'checkbox',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Disable Push On Resize',
      description:  'disable push on resize',
      attributes: {
        icon: null,
        forTab: 'Push',
      },
      value: false,
      default: false,
      access: ['admin'],
      paramName: 'disablePushOnResize'
    }
  };
  PUSH_RESIZE_ITEMS = {
    key: 'pushResizeItems',
    type: 'checkbox',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Push Resize Items',
      description:  'on resize of item will shrink adjacent items',
      attributes: {
        icon: null,
        forTab: 'Push',
      },
      value: true,
      default: true,
      access: ['admin'],
      paramName: 'pushResizeItems'
    }
  };
  ENABLE_EMPTY_CELL_CLICK = {
    key: 'enableEmptyCellClick',
    type: 'checkbox',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Click to add',
      description:  'enable empty cell click events',
      attributes: {
        icon: null,
        forTab: 'Resize&Add',
      },
      value: false,
      default: false,
      access: ['admin'],
      paramName:  'enableEmptyCellClick'
    }
  };
  ENABLE_EMPTY_CELL_DRAG = {
    key: 'enableEmptyCellDrag',
    type: 'checkbox',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Drag to add',
      description:  'enable empty cell drag events',
      attributes: {
        icon: null,
        forTab: 'Resize&Add',
      },
      value: true,
      default: true,
      access: ['admin'],
      paramName:  'enableEmptyCellDrag'
    }
  };
  ENABLE_EMPTY_CELL_DROP = {
    key: 'enableEmptyCellDrop',
    type: 'checkbox',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Enable drop to add',
      description:  'Enable drop to add',
      attributes: {
        icon: null,
        forTab: 'Resize&Add',
      },
      value: false,
      default: false,
      access: ['admin'],
      paramName:  'enableEmptyCellDrop'
    }
  };
  ENABLE_OCCUPITED_CELL_DROP = {
    key: 'enableOccupiedCellDrop',
    type: 'checkbox',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Enable drop on occupied cell',
      description:  'enable occupied cell drop events',
      attributes: {
        icon: null,
        forTab: 'Resize&Add',
      },
      value: false,
      default: false,
      access: ['admin'],
      paramName:  'enableOccupiedCellDrop'
    }
  };
  ENABLE_EMPTY_CELL_CONTEXT_MENU = {
    key: 'enableEmptyCellContextMenu',
    type: 'checkbox',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Enable right click to add',
      description: 'enable empty cell context menu (right click) events',
      attributes: {
        icon: null,
        forTab: 'Resize&Add',
      },
      value: false,
      default: false,
      access: ['admin'],
      paramName:  'enableEmptyCellContextMenu'
    }
  };
  EMPTY_CELL_DRAG_MAX_COLS = {
    key: 'emptyCellDragMaxCols',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Drag max cols',
      description: 'limit empty cell drag max cols',
      attributes: {
        icon: null,
        forTab: 'Grid Types',
      },
      value: 50,
      default: 50,
      access: ['admin'],
      paramName:  'emptyCellDragMaxCols'
    }
  };
  EMPTY_CELL_DRAG_MAX_ROWS = {
    key: 'emptyCellDragMaxRows',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Drag max rows',
      description: 'limit empty cell drag max rows',
      attributes: {
        icon: null,
        forTab: 'Grid Types',
      },
      value: 50,
      default: 50,
      access: ['admin'],
      paramName:  'emptyCellDragMaxRows'
    }
  };
  GRID_TYPE = {
    key: 'gridType',
    type: 'select',
    wrappers: ['form-field'],
    templateOptions: {
      description: 'different types for layout for the dashboard-grid',
      attributes: {
        icon: null,
        forTab: 'Grid Types',
      },
      value: 'fit',
      default: 'fit',
      access: ['admin', 'user'],
      paramName:  'gridType',
      options: [
        {key: 'fit', value: 'fit'},
        {key: 'scrollVertical', value: 'scrollVertical'},
        {key: 'scrollHorizontal', value: 'scrollHorizontal'},
        {key: 'fixed', value: 'fixed'},
        {key: 'verticalFixed', value: 'verticalFixed'},
        {key: 'horizontalFixed', value: 'horizontalFixed'},
      ],
    }
  };
  FIXED_COL_WIDTH = {
    key: 'fixedColWidth',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Fixed col width(px)',
      description: 'fixed col width for gridType: fixed',
      attributes: {
        icon: null,
        forTab: 'Grid Types',
      },
      value: 200,
      default: 200,
      access: ['admin', 'user'],
      paramName:  'fixedColWidth',
    }
  };
  FIXED_ROW_HEIGHT = {
    key: 'fixedRowHeight',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Fixed row height(px)',
      description: 'fixed row height for gridType: fixed',
      attributes: {
        icon: null,
        forTab: 'Grid Types',
      },
      value: 100,
      default: 100,
      access: ['admin', 'user'],
      paramName:  'fixedRowHeight'
    }
  };
  KEEP_FIXED_WIDTH_IN_MOBILE = {
    key: 'keepFixedWidthInMobile',
    type: 'checkbox',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Keep fixed width in mobile',
      description: 'keep the width from fixed gridType in mobile layout',
      attributes: {
        icon: null,
        forTab: 'Grid Types',
      },
      value: false,
      default: false,
      access: ['admin'],
      paramName:  'keepFixedWidthInMobile'
    }
  };
  KEEP_FIXED_HEIGHT_IN_MOBILE = {
    key: 'keepFixedHeightInMobile',
    type: 'checkbox',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Keep fixed height in mobile',
      description: 'keep the height from fixed gridType in mobile layout',
      attributes: {
        icon: null,
        forTab: 'Grid Types',
      },
      value: false,
      default: false,
      access: ['admin'],
      paramName:  'keepFixedHeightInMobile'
    }
  };
  MOBILE_BREAK_POINT = {
    key: 'mobileBreakpoint',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Mobile breakpoint',
      description: 'if the screen is not wider that this, remove the grid layout and stack the items',
      attributes: {
        icon: null,
        forTab: 'Grid Types',
      },
      value: 640,
      default: 640,
      access: ['admin'],
      paramName:  'mobileBreakpoint'
    }
  };
  COMPACT_TYPE = {
    key: 'compactType',
    type: 'select',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Compact Type',
      description: 'dashboard-grid compact items',
      attributes: {
        icon: null,
        forTab: 'View',
      },
      value: 'none',
      default: 'none',
      access: ['admin', 'user'],
      paramName:  'compactType',
      options: [
        {key: 'none', value: 'none'},
        {key: 'compactLeft', value: 'compactLeft'},
        {key: 'compactRight', value: 'compactRight'},
        {key: 'compactUp', value: 'compactUp'},
        {key: 'compactLeft&Up', value: 'compactLeft&Up'},
        {key: 'compactRight&Up', value: 'compactRight&Up'},
        {key: 'compactUp&Left', value: 'compactUp&Left'},
        {key: 'compactUp&Right', value: 'compactUp&Right'}
      ],
    }
  };
  DISPLAY_GRID = {
    key: 'displayGrid',
    type: 'select',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Display dashboard-grid lines',
      description: 'display background dashboard-grid of rows and columns',
      attributes: {
        icon: null,
        forTab: 'View',
      },
      value:  'onDrag&Resize',
      default: 'onDrag&Resize',
      access: ['admin'],
      paramName:  'displayGrid',
      options: [
        {key: 'onDrag&Resize', value: 'onDrag&Resize'},
        {key: 'always', value: 'always'},
        {key: 'none', value: 'none'}
      ],
    }
  };
  MARGIN = {
    key: 'margin',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Margin',
      description: 'margin between grid items',
      attributes: {
        icon: null,
        forTab: 'Margins',
      },
      value: 10,
      default: 10,
      access: ['admin', 'user'],
      paramName:  'margin',
    }
  };
  OUTER_MARGIN = {
    key: 'outerMargin',
    type: 'checkbox',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Outer margin',
      description: 'if margins will apply to the sides of the container',
      attributes: {
        icon: null,
        forTab: 'Margins',
      },
      value: true,
      default: true,
      access: ['admin', 'user'],
      paramName:  'outerMargin'
    }
  };
  OUTER_MARGIN_TOP = {
    key: 'outerMarginTop',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label: 'Grid margin top',
      description: 'override top outer margin for grid',
      attributes: {
        icon: null,
        forTab: 'Margins',
      },
      value: null,
      default: null,
      access: ['admin'],
      paramName:  'outerMarginTop'
    }
  };
  OUTER_MARGIN_RIGHT = {
    key: 'outerMarginRight',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label:  'Grid margin right',
      description: 'override right outer margin for grid',
      attributes: {
        icon: null,
        forTab: 'Margins',
      },
      value: null,
      default: null,
      access: ['admin'],
      paramName:  'outerMarginRight'
    }
  };
  OUTER_MARGIN_BOTTOM = {
    key: 'outerMarginBottom',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label:  'Grid margin bottom',
      description: 'override bottom outer margin for grid',
      attributes: {
        icon: null,
        forTab: 'Margins',
      },
      value: null,
      default: null,
      access: ['admin'],
      paramName:  'outerMarginBottom'
    }
  };
  OUTER_MARGIN_LEFT = {
    key: 'outerMarginLeft',
    type: 'number',
    wrappers: ['form-field'],
    templateOptions: {
      label:  'Grid margin left',
      description: 'override left outer margin for grid',
      attributes: {
        icon: null,
        forTab: 'Margins',
      },
      value: null,
      default: null,
      access: ['admin'],
      paramName:  'outerMarginLeft'
    }
  };
  DISABLE_SCROLL_HORIZONTAL = {
    key: 'disableScrollHorizontal',
    type: 'checkbox',
    wrappers: ['form-field'],
    templateOptions: {
      label:  'Disable horizontal scroll',
      description:  'enable/disable auto horizontal scrolling when on edge of dashboard-grid',
      attributes: {
        icon: null,
        forTab: 'Scroll',
      },
      value: false,
      default: false,
      access: ['admin', 'user'],
      paramName:  'disableScrollHorizontal'
    }
  };
  DISABLE_SCROLL_VERTICAL = {
    key: 'disableScrollVertical',
    type: 'checkbox',
    wrappers: ['form-field'],
    templateOptions: {
      label:  'Disable vertical scroll',
      description:  'enable/disable auto vertical scrolling when on edge of dashboard-grid',
      attributes: {
        icon: null,
        forTab: 'Scroll',
      },
      value: false,
      default: false,
      access: ['admin', 'user'],
      paramName:  'disableScrollVertical'
    }
  };
}
