import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribedPageComponent } from './unsubscribed-page.component';

describe('UnauthorizedPageComponent', () => {
  let component: UnsubscribedPageComponent;
  let fixture: ComponentFixture<UnsubscribedPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnsubscribedPageComponent],
    });
    fixture = TestBed.createComponent(UnsubscribedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
