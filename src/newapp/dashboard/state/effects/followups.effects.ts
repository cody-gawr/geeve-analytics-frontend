import { FollowupsService } from '@/app/followups/followups.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class FollowupsEffects {
  constructor(
    private actions$: Actions,
    private fuService: FollowupsService
  ) {}
}
