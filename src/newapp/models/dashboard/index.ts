export type API_ENDPOINTS = 'ctGetPageTips';

export interface ChartTip {
  title: string;
  info: string;
}

export interface ChartTipsApiResponse {
  app: string;
  data: Array<ChartTip>;
}
