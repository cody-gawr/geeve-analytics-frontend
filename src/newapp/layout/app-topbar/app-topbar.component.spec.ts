/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppTopbarComponent } from './app-topbar.component';

describe('AppTopbarComponent', () => {
  let component: AppTopbarComponent;
  let fixture: ComponentFixture<AppTopbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTopbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
