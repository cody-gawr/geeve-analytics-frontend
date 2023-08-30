import { createAction, props } from "@ngrx/store";

export const loadClinics = createAction("[Clinic Page] Load Clinics");
export const setCurrentSingleClinicId = createAction(
  "[Clinic Page] Set Current Clinic Id",
  props<{ clinicId: "all" | number | null }>()
);

export const setCurrentMultiClinicIDs = createAction(
  "[Clinic Page] Set Current Clinics",
  props<{ clinicIDs: Array<number> }>()
);

export const setMultiClinicSelection = createAction(
  "[Clinic Page] Set Multi Clinic Selection",
  props<{ value: boolean }>()
);
