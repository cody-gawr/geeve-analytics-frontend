export interface MenuChangeEvent {
  key: string;
  routeEvent?: boolean;
}

export type DATE_RANGE_DURATION = 'w' | 'm' | 'lm' | 'q' | 'lq' | 'cytd' | 'lcytd' | 'fytd' | 'lfytd' | 'custom';
export type TREND_MODE = 'off' | 'current' | 'historic';