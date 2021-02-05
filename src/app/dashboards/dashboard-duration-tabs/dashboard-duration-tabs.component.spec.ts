import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDurationTabsComponent } from './dashboard-duration-tabs.component';

describe('DashboardDurationTabsComponent', () => {
  let component: DashboardDurationTabsComponent;
  let fixture: ComponentFixture<DashboardDurationTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDurationTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDurationTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
