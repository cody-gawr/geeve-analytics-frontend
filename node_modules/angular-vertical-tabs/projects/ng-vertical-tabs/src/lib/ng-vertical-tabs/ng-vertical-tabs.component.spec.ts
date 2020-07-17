import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgVerticalTabsComponent } from './ng-vertical-tabs.component';

describe('NgVerticalTabsComponent', () => {
  let component: NgVerticalTabsComponent;
  let fixture: ComponentFixture<NgVerticalTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgVerticalTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgVerticalTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
