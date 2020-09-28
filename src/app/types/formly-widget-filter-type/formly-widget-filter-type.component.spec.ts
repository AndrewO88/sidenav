import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyWidgetFilterTypeComponent } from './formly-widget-filter-type.component';

describe('FormlyWidgetFilterTypeComponent', () => {
  let component: FormlyWidgetFilterTypeComponent;
  let fixture: ComponentFixture<FormlyWidgetFilterTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyWidgetFilterTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyWidgetFilterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
