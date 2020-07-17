import { TestBed } from '@angular/core/testing';

import { NgVerticalTabsService } from './ng-vertical-tabs.service';

describe('NgVerticalTabsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgVerticalTabsService = TestBed.get(NgVerticalTabsService);
    expect(service).toBeTruthy();
  });
});
