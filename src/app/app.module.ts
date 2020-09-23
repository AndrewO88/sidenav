import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AbstractControl, ReactiveFormsModule} from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormlyComponent } from './formly/formly.component';
import {CommonModule} from '@angular/common';

export function minlengthValidationMessages(err, field): string {
  return `Should have atleast ${field.templateOptions.minLength} characters`;
}

export function fieldMatchValidator(control: AbstractControl): { fieldMatch: { message: 'Password Not Matching' } } {
  const { password, passwordConfirm } = control.value;
  if (!passwordConfirm || !password) {
    return null;
  }

  if (passwordConfirm === password) {
    return null;
  }

  return { fieldMatch: { message: 'Password Not Matching' } };
}
@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    FormlyComponent
  ],
    imports: [
        CommonModule,
        BrowserModule,
        ReactiveFormsModule,
      FormlyModule.forRoot({
        validators: [
          { name: 'fieldMatch', validation: fieldMatchValidator },
        ],
        validationMessages: [
          { name: 'required', message: 'This field is required' },
          { name: 'minlength', message: minlengthValidationMessages },
        ],
      }),
        FormlyMaterialModule,
        BrowserAnimationsModule,
        MatSidenavModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
