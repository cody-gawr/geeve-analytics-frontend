import { createAction, props } from '@ngrx/store';

export const loadFnTotalProduction = createAction(
  '[Fanance Page] Load fnTotalProduction',
  props<{ 
    clinicId: number,
    startDate: string,
    endDate: string,
    duration: string ,
    queryWhEnabled: number
   }>()
);

export const loadFnNetProfit = createAction(
    '[Fanance Page] load fnNetProfit',
    props<{ 
        clinicId: number,
        startDate: string,
        endDate: string,
        duration: string ,
        queryWhEnabled: number,
        connectedWith?: string
    }>()
);

export const loadFnNetProfitPercentage = createAction(
    '[Fanance Page] load fnNetProfitPercentage',
    props<{ 
        clinicId: number,
        startDate: string,
        endDate: string,
        duration: string ,
        queryWhEnabled: number,
        connectedWith?: string
    }>()
);

export const loadFnExpenses = createAction(
    '[Fanance Page] load fnExpenses',
    props<{ 
        clinicId: number,
        startDate: string,
        endDate: string,
        duration: string ,
        queryWhEnabled: number,
        connectedWith?: string
    }>()
);
