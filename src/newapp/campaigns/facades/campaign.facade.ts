import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CampaignState, selectCampaign } from '../state/reducers/campaign.reducer';
import { ICampaign } from '../services/campaign.service';
import { campaignsPageActions } from '../state/actions';

@Injectable()
export class CampaignFacade {
  constructor(private store: Store<CampaignState>) {}

  public readonly campaign$: Observable<ICampaign> = this.store.pipe(select(selectCampaign));
  public setCampaign(campaign: ICampaign) {
    this.store.dispatch(campaignsPageActions.setCampaign({ campaign }));
  }
}
