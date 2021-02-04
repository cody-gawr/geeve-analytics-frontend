import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistProductionChartComponent } from './dentist-production-chart.component';

describe('DentistProductionChartComponent', () => {
  let component: DentistProductionChartComponent;
  let fixture: ComponentFixture<DentistProductionChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DentistProductionChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DentistProductionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
