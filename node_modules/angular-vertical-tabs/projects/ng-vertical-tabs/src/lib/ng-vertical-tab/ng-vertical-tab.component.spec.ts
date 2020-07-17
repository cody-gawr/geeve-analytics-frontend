import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgVerticalTabComponent } from './ng-vertical-tab.component';

describe('NgVerticalTabComponent', () => {
  let component: NgVerticalTabComponent;
  let fixture: ComponentFixture<NgVerticalTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgVerticalTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgVerticalTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
