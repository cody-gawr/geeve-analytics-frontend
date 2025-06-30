import { ConversionTracker } from './conversion-tracker.model';

export interface ConversionTrackerRecord extends ConversionTracker {
  providerName?: string;
}
