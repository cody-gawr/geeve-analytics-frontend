import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostOpportunityComponent } from './lost-opportunity.component';

describe('LostOpportunityComponent', () => {
  let component: LostOpportunityComponent;
  let fixture: ComponentFixture<LostOpportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LostOpportunityComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
