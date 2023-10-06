import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateMenuBarComponent } from './date-menu-bar.component';

describe('DateMenuBarComponent', () => {
  let component: DateMenuBarComponent;
  let fixture: ComponentFixture<DateMenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateMenuBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
