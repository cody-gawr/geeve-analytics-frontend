import { ICampaign } from '../../services/campaign.service';
import { createAction, props } from '@ngrx/store';

export const setCampaigns = createAction(
  '[Campaigns Page] Set Campaigns',
  props<{ campaigns: ICampaign[] }>(),
);
export const setCampaign = createAction(
  '[View Campaign Page] Set Campaign',
  props<{ campaign: ICampaign }>(),
);
