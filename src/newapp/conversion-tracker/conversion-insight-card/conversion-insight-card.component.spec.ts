/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConversionInsightsCardComponent } from './conversion-insight-card.component';

describe('ConversionInsightCardComponent', () => {
  let component: ConversionInsightCardComponent;
  let fixture: ComponentFixture<ConversionInsightCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConversionInsightsCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversionInsightCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
