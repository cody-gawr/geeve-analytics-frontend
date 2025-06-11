/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UpdateConversionCodeValuesDialogComponent } from './update-conversion-code-values-dialog.component';

describe('UpdateConversionCodeValuesDialogComponent', () => {
  let component: UpdateConversionCodeValuesDialogComponent;
  let fixture: ComponentFixture<UpdateConversionCodeValuesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateConversionCodeValuesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateConversionCodeValuesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
