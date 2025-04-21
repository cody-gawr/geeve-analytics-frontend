import { createFeature, createReducer, on } from '@ngrx/store';
import { campaignsPageActions } from '../actions';
import { ICampaign } from '../../services/campaign.service';

export interface CampaignState {
  campaigns: ICampaign[];
  campaign: ICampaign | null;
}

const initialState: CampaignState = {
  campaigns: [],
  campaign: null,
};

export const campaignFeature = createFeature({
  name: 'campaign',
  reducer: createReducer(
    initialState,
    on(campaignsPageActions.setCampaign, (state, { campaign }): CampaignState => {
      return {
        ...state,
        campaign,
      };
    }),
    on(campaignsPageActions.setCampaigns, (state, { campaigns }): CampaignState => {
      return {
        ...state,
        campaigns,
      };
    }),
  ),
});

export const { selectCampaign } = campaignFeature;
