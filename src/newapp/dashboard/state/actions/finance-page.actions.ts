import { createAction, props } from '@ngrx/store';

export const loadFnTotalProduction = createAction(
  '[Fanance Page] Load fnTotalProduction',
  props<{ 
    clinicId: number | string,
    startDate: string,
    endDate: string,
    duration: string ,
    queryWhEnabled: number
   }>()
);
export const loadFnTotalCollection = createAction(
    '[Fanance Page] Load fnTotalCollection',
    props<{ 
      clinicId: number | string,
      startDate: string,
      endDate: string,
      duration: string ,
      queryWhEnabled: number
     }>()
  );

export const loadFnNetProfit = createAction(
    '[Fanance Page] load fnNetProfit',
    props<{ 
        clinicId: number | string,
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
        clinicId: number | string,
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
        clinicId: number | string,
        startDate: string,
        endDate: string,
        duration: string ,
        queryWhEnabled: number,
        connectedWith?: string
    }>()
);


export const loadFnProductionByClinician = createAction(
    '[Fanance Page] load fnProductionByClinician',
    props<{ 
        clinicId: number | string,
        startDate: string,
        endDate: string,
        duration: string ,
        queryWhEnabled: number
    }>()
);

export const loadFnProductionPerVisit = createAction(
    '[Fanance Page] load fnProductionPerVisit',
    props<{ 
        clinicId: number | string,
        startDate: string,
        endDate: string,
        duration: string ,
        queryWhEnabled: number
    }>()
);

export const loadFnTotalDiscounts = createAction(
    '[Fanance Page] load fnTotalDiscounts',
    props<{ 
        clinicId: number | string,
        startDate: string,
        endDate: string,
        duration: string ,
        queryWhEnabled: number
    }>()
);


