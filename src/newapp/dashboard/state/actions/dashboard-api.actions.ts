import { JeeveError } from "@/newapp/models";
import { ChartTip } from "../../../models/dashboard";
import { createAction, props } from "@ngrx/store";

export const loadChartTipsSuccess = createAction(
  "[Dashboard API] Load Chart Tips",
  props<{ chartData: { [key: number]: ChartTip } }>()
);

export const loadChartTipsFailure = createAction(
  "[Dashboard API] Load Chart Tips Failure",
  props<{
    error: JeeveError;
  }>()
);

export const clinicAccountingPlatformSuccess = createAction(
  "[Dashboard API] Load Clinic Accounting Platform Success",
  props<{ connectWith: CONNECT_WITH_PLATFORM; clinicId: number }>()
);

export const clinicAccountingPlatformFailure = createAction(
  "[Dashboard API] Load Clinic Accounting Platform Failure",
  props<{
    error: JeeveError;
  }>()
);
