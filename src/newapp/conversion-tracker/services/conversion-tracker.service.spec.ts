/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConversionTrackerService } from './conversion-tracker.service';

describe('Service: ConversionTracker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConversionTrackerService]
    });
  });

  it('should ...', inject([ConversionTrackerService], (service: ConversionTrackerService) => {
    expect(service).toBeTruthy();
  }));
});
