import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorningHuddleComponent } from './morning-huddle.component';

describe('MorningHuddleComponent', () => {
  let component: MorningHuddleComponent;
  let fixture: ComponentFixture<MorningHuddleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MorningHuddleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorningHuddleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
