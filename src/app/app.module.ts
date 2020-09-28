import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormlyComponent } from './formly/formly.component';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {FormlyFieldTabsetComponent} from './types/tabset';
import {ArrayTypeComponent} from './types/array.type';
import {FiltersTypeComponent} from './types/filters.type';
import {DateRangeType} from './types/date-range.type';
import {MultipleAutocompleteTypeComponent} from './types/multiple-autocomplete.type';
import {ColorPickerTypeComponent} from './types/color-picker.type';
import {FormlyButtonTypeComponent} from './types/button.type';
import {PanelWrapperComponent} from './wrappers/panel-wrapper/panel-wrapper.component';
import {SuffixWrapperComponent} from './wrappers/addons-wrapper/suffix-wrapper.component';
import {FormlyWidgetFilterTypeComponent} from './types/formly-widget-filter-type/formly-widget-filter-type.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {FormlyMatDatepickerModule} from '@ngx-formly/material/datepicker';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {GroupTypeComponent} from './types/group.type';
import {ObjectTypeComponent} from './types/object.type';
import {VisiblePipe} from './types/visible.pipe';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SelectAutocompleteModule} from './mat-select-autocomplete/select-autocomplete-module.module';



@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    FormlyComponent,
    FormlyFieldTabsetComponent,
    ArrayTypeComponent,
    FiltersTypeComponent,
    DateRangeType,
    MultipleAutocompleteTypeComponent,
    ColorPickerTypeComponent,
    FormlyButtonTypeComponent,
    FormlyWidgetFilterTypeComponent,
    PanelWrapperComponent,
    SuffixWrapperComponent,
    GroupTypeComponent,
    ObjectTypeComponent,
    VisiblePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatExpansionModule,
    BrowserModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        {name: 'tabset', component: FormlyFieldTabsetComponent},
        {name: 'array', component: ArrayTypeComponent},
        {name: 'colors', component: FormlyWidgetFilterTypeComponent},
        {name: 'stack', component: FormlyWidgetFilterTypeComponent},
        {name: 'filters', component: FiltersTypeComponent},
        {name: 'date-range', component: DateRangeType},
        {name: 'multiple-autocomplete', component: MultipleAutocompleteTypeComponent},
        {name: 'color-picker', component: ColorPickerTypeComponent},
        {name: 'button', component: FormlyButtonTypeComponent},
        {name: 'filter-widget', component: FormlyWidgetFilterTypeComponent},
        {name: 'string', extends: 'input'},
        {name: 'boolean', extends: 'checkbox'},
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number'
            }
          }
        }
      ],
      wrappers: [
        {name: 'mat-expansion-panel', component: PanelWrapperComponent},
        {name: 'suffix', component: SuffixWrapperComponent}
      ]
    }),
    FormlyMaterialModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTabsModule,
    MatButtonModule,
    FormsModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatDatepickerModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    SelectAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


