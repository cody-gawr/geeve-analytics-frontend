import { Clinic, IClinicDTO } from '../../../models/clinic';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ClinicApiActions, ClinicPageActions } from '../actions';
import _ from 'lodash';
import { ICampaign } from '@/newapp/models/clinic/campaign';

export interface ClinicState {
  isLoadingFlags: Array<'userClinics' | 'coreSync' | string>;
  errors: Array<JeeveError>;
  isLoadingData: Array<string>;
  success: boolean;
  userClinicsSuccess: boolean;
  isLoading: boolean;
  clinics: Clinic[]; // All clinics
  campaigns: ICampaign[];
  userClinics: IClinicDTO[]; // User clinics
  currentSingleClinicId: 'all' | number | null; // For signle selection
  currentMultiClinicIds: number[];
  error: string | null;
  hasPrimeClinics: 'yes' | 'no';
  isMultiSelection: boolean | null;

  connectedWith: CONNECT_WITH_PLATFORM;
  connectedClinicId: number;
}

const initialState: ClinicState = {
  isLoadingFlags: [],
  errors: [],
  isLoadingData: [],
  success: false,
  userClinicsSuccess: false,
  isLoading: false,
  currentSingleClinicId: null,
  currentMultiClinicIds: [],
  clinics: [],
  campaigns: [],
  userClinics: [],
  error: null,
  hasPrimeClinics: 'no',
  isMultiSelection: null,

  connectedWith: null,
  connectedClinicId: null,
};

export const clinicFeature = createFeature({
  name: 'clinic',
  reducer: createReducer(
    initialState,
    on(ClinicPageActions.setCurrentSingleClinicId, (state, { clinicId }): ClinicState => {
      if (clinicId === 'all') {
        return {
          ...state,
          currentSingleClinicId: clinicId,
          currentMultiClinicIds: state.clinics.slice().map(v => v.id),
        };
      } else {
        return {
          ...state,
          currentSingleClinicId: clinicId,
          currentMultiClinicIds: [clinicId],
        };
      }
    }),
    on(ClinicPageActions.setCurrentMultiClinicIDs, (state, { clinicIDs }): ClinicState => {
      if (clinicIDs.length === 1) {
        return {
          ...state,
          currentMultiClinicIds: clinicIDs,
          currentSingleClinicId: clinicIDs[0],
        };
      } else {
        return {
          ...state,
          currentMultiClinicIds: clinicIDs,
        };
      }
    }),
    on(ClinicPageActions.loadClinics, (state): ClinicState => {
      return {
        ...state,
        success: false,
        error: null,
        isLoading: true,
        clinics: [],
      };
    }),
    on(ClinicApiActions.loadClinicsSuccess, (state, { clinics, hasPrimeClinics }): ClinicState => {
      return {
        ...state,
        success: true,
        isLoading: false,
        clinics,
        hasPrimeClinics,
        ...(clinics.length > 0 && state.currentSingleClinicId == null
          ? { currentSingleClinicId: clinics[0].id }
          : {}),
        ...(clinics.length > 0 &&
        (state.currentMultiClinicIds == null || state.currentMultiClinicIds.length == 0)
          ? { currentMultiClinicIds: [clinics[0].id] }
          : {}),
      };
    }),
    on(ClinicApiActions.loadClinicsFailure, (state, { error }): ClinicState => {
      return {
        ...state,
        success: false,
        isLoading: false,
        error,
      };
    }),
    on(ClinicPageActions.setMultiClinicSelection, (state, { value }): ClinicState => {
      return {
        ...state,
        isMultiSelection: value,
      };
    }),
    on(ClinicPageActions.loadUserClinics, (state): ClinicState => {
      return {
        ...state,
        userClinicsSuccess: false,
        errors: _.filter(state.errors, n => n.api != 'userClinics'),
        isLoadingFlags: _.union(state.isLoadingFlags, ['userClinics']),
        userClinics: [],
      };
    }),
    on(ClinicApiActions.loadUserClinicsSuccess, (state, { clinics }): ClinicState => {
      return {
        ...state,
        userClinicsSuccess: true,
        errors: _.filter(state.errors, n => n.api != 'userClinics'),
        isLoadingFlags: _.filter(state.isLoadingFlags, n => n != 'userClinics'),
        userClinics: clinics,
      };
    }),
    on(ClinicApiActions.loadUserClinicsFailure, (state, { error }): ClinicState => {
      return {
        ...state,
        userClinicsSuccess: false,
        isLoadingFlags: _.filter(state.isLoadingFlags, n => n != 'userClinics'),
        errors: [...state.errors, { ...error, api: 'userClinics' }],
      };
    }),
    // Check the status of core sync
    on(ClinicPageActions.loadCoreSyncStatus, (state, { clinicId }): ClinicState => {
      return {
        ...state,
        errors: _.filter(state.errors, n => n.api != `coreSync${clinicId}`),
        isLoadingFlags: _.union(state.isLoadingFlags, [`coreSync${clinicId}`]),
      };
    }),
    on(
      ClinicApiActions.checkCoreSyncSuccess,
      (state, { clinicId, hasCoreSync, numberOfSuccess }): ClinicState => {
        const { userClinics } = state;
        // const clinic = userClinics.find(clinic => clinic.id === clinicId && clinic.pms.toLowerCase() === 'core');
        // if(clinic) {
        //   clinic.connected = hasCoreSync;
        //   clinic.numberOfSuccess = numberOfSuccess;
        // }
        const updatedUserClinics = userClinics.map(
          clinic =>
            clinic.id === clinicId && clinic.pms.toLowerCase() === 'core'
              ? { ...clinic, connected: hasCoreSync, numberOfSuccess } // Update the clinic
              : clinic, // Keep other clinics unchanged
        );
        return {
          ...state,
          userClinics: updatedUserClinics,
          errors: _.filter(state.errors, n => n.api != `coreSync${clinicId}`),
          isLoadingFlags: _.filter(state.isLoadingFlags, n => n != `coreSync${clinicId}`),
        };
      },
    ),
    on(ClinicApiActions.checkCoreSyncFailure, (state, { clinicId, error }): ClinicState => {
      const { userClinics } = state;
      // const clinic = userClinics.find(clinic => clinic.id === clinicId && clinic.pms.toLowerCase() === 'core');
      // if(clinic) {
      //   clinic.connected = false;
      // }
      // Create a new array with the updated clinic
      const updatedUserClinics = userClinics.map(
        clinic =>
          clinic.id === clinicId && clinic.pms.toLowerCase() === 'core'
            ? { ...clinic, connected: false } // Update the clinic
            : clinic, // Keep other clinics unchanged
      );
      return {
        ...state,
        userClinics: updatedUserClinics,
        errors: [...state.errors, { ...error, api: `coreSync${clinicId}` }],
        isLoadingFlags: _.filter(state.isLoadingFlags, n => n != `coreSync${clinicId}`),
      };
    }),
    //Dentally sync
    on(ClinicPageActions.loadDentallySyncStatus, (state, { clinicId }): ClinicState => {
      return {
        ...state,
        errors: _.filter(state.errors, n => n.api != `dentallySync${clinicId}`),
        isLoadingFlags: _.union(state.isLoadingFlags, [`dentallySync${clinicId}`]),
      };
    }),
    on(
      ClinicApiActions.checkDentallySyncSuccess,
      (state, { clinicId, hasDentallySync, numberOfSuccess }): ClinicState => {
        const { userClinics } = state;
        // const clinic = userClinics.find(clinic => clinic.id === clinicId && clinic.pms.toLowerCase() === 'dentally');
        // if(clinic) {
        //   clinic.connected = hasDentallySync;
        //   clinic.numberOfSuccess = numberOfSuccess;
        // }
        const updatedUserClinics = userClinics.map(
          clinic =>
            clinic.id === clinicId && clinic.pms.toLowerCase() === 'dentally'
              ? { ...clinic, connected: hasDentallySync, numberOfSuccess } // Update the clinic
              : clinic, // Keep other clinics unchanged
        );
        return {
          ...state,
          userClinics: updatedUserClinics,
          errors: _.filter(state.errors, n => n.api != `dentallySync${clinicId}`),
          isLoadingFlags: _.filter(state.isLoadingFlags, n => n != `dentallySync${clinicId}`),
        };
      },
    ),
    on(ClinicApiActions.checkDentallySyncFailure, (state, { clinicId, error }): ClinicState => {
      const { userClinics } = state;
      // const clinic = userClinics.find(clinic => clinic.id === clinicId && clinic.pms.toLowerCase() === 'dentally');
      // if(clinic) clinic.connected = false;
      const updatedUserClinics = userClinics.map(
        clinic =>
          clinic.id === clinicId && clinic.pms.toLowerCase() === 'dentally'
            ? { ...clinic, connected: false } // Update the clinic
            : clinic, // Keep other clinics unchanged
      );
      return {
        ...state,
        userClinics: updatedUserClinics,
        errors: [...state.errors, { ...error, api: `dentallySync${clinicId}` }],
        isLoadingFlags: _.filter(state.isLoadingFlags, n => n != `dentallySync${clinicId}`),
      };
    }),
    //Praktika sync
    on(ClinicPageActions.loadPraktikaSyncStatus, (state, { clinicId }): ClinicState => {
      return {
        ...state,
        errors: _.filter(state.errors, n => n.api != `praktikaSync${clinicId}`),
        isLoadingFlags: _.union(state.isLoadingFlags, [`praktikaSync${clinicId}`]),
      };
    }),
    on(
      ClinicApiActions.checkPraktikaSyncSuccess,
      (state, { clinicId, hasPraktikaSync, numberOfSuccess }): ClinicState => {
        const { userClinics } = state;
        // const clinic = userClinics.find(clinic => clinic.id === clinicId  && clinic.pms.toLowerCase() === 'praktika');
        // if(clinic) {
        //   clinic.connected = hasPraktikaSync;
        //   clinic.numberOfSuccess = numberOfSuccess;
        // }
        const updatedUserClinics = userClinics.map(
          clinic =>
            clinic.id === clinicId && clinic.pms.toLowerCase() === 'praktika'
              ? { ...clinic, connected: hasPraktikaSync, numberOfSuccess } // Update the clinic
              : clinic, // Keep other clinics unchanged
        );
        return {
          ...state,
          userClinics: updatedUserClinics,
          errors: _.filter(state.errors, n => n.api != `praktikaSync${clinicId}`),
          isLoadingFlags: _.filter(state.isLoadingFlags, n => n != `praktikaSync${clinicId}`),
        };
      },
    ),
    on(ClinicApiActions.checkPraktikaSyncFailure, (state, { clinicId, error }): ClinicState => {
      const { userClinics } = state;
      // const clinic = userClinics.find(clinic => clinic.id === clinicId  && clinic.pms.toLowerCase() === 'praktika');
      // if(clinic) clinic.connected = false;
      const updatedUserClinics = userClinics.map(
        clinic =>
          clinic.id === clinicId && clinic.pms.toLowerCase() === 'praktika'
            ? { ...clinic, connected: false } // Update the clinic
            : clinic, // Keep other clinics unchanged
      );
      return {
        ...state,
        userClinics: updatedUserClinics,
        errors: [...state.errors, { ...error, api: `praktikaSync${clinicId}` }],
        isLoadingFlags: _.filter(state.isLoadingFlags, n => n != `praktikaSync${clinicId}`),
      };
    }),
    on(ClinicPageActions.loadCampaigns, (state, { clinicId }): ClinicState => {
      return {
        ...state,
        errors: _.filter(state.errors, n => n.api != `campaign${clinicId}`),
        isLoadingFlags: _.union(state.isLoadingFlags, [`campaign${clinicId}`]),
      };
    }),
    on(ClinicApiActions.loadCampaignsSuccess, (state, { campaigns, clinicId }): ClinicState => {
      return {
        ...state,
        campaigns,
        errors: _.filter(state.errors, n => n.api != `campaign${clinicId}`),
        isLoadingFlags: _.filter(state.isLoadingFlags, n => n != `campaign${clinicId}`),
      };
    }),
    on(ClinicApiActions.loadCampaignsFailure, (state, { error, clinicId }): ClinicState => {
      return {
        ...state,
        errors: [...state.errors, { ...error, api: `campaign${clinicId}` }],
        isLoadingFlags: _.filter(state.isLoadingFlags, n => n != `campaign${clinicId}`),
      };
    }),
    on(ClinicPageActions.loadClinicAccountingPlatform, (state, {}): ClinicState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        errors: _.filter(errors, n => n.api != 'clinicGetAccountingPlatform'),
        connectedWith: null,
        isLoadingData: _.union(isLoadingData, ['clinicGetAccountingPlatform']),
      };
    }),
    on(
      ClinicApiActions.clinicAccountingPlatformSuccess,
      (state, { connectWith, clinicId }): ClinicState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, n => n.api != 'clinicGetAccountingPlatform'),
          connectedWith: connectWith,
          connectedClinicId: clinicId,
          isLoadingData: _.filter(isLoadingData, n => n != 'clinicGetAccountingPlatform'),
        };
      },
    ),
    on(ClinicApiActions.clinicAccountingPlatformFailure, (state, { error }): ClinicState => {
      const { isLoadingData, errors } = state;
      return {
        ...state,
        connectedWith: null,
        isLoadingData: _.filter(isLoadingData, n => n != 'clinicGetAccountingPlatform'),
        errors: [...errors, { ...error, api: 'clinicGetAccountingPlatform' }],
      };
    }),
    on(ClinicPageActions.setConnectedClinicId, (state, { clinicId }): ClinicState => {
      return {
        ...state,
        connectedClinicId: clinicId,
      };
    }),
  ),
});

export const {
  selectSuccess,
  selectUserClinicsSuccess,
  selectError,
  selectIsLoading,
  selectIsLoadingFlags,
  selectClinics,
  selectCampaigns,
  selectUserClinics,
  selectCurrentSingleClinicId,
  selectCurrentMultiClinicIds,
  selectHasPrimeClinics,
  selectIsMultiSelection,
  selectIsLoadingData,
  selectConnectedWith,
  selectConnectedClinicId,
} = clinicFeature;

export const selectIsLoadingClinicAccountingPlatform = createSelector(
  selectIsLoadingData,
  isLoadingData => _.findIndex(isLoadingData, l => l == 'clinicGetAccountingPlatform') >= 0,
);
export const selectIsConnectedWith = createSelector(selectConnectedWith, connectWith => {
  return connectWith && connectWith !== 'none';
});

export const selectIsLoadingSyncStatus = createSelector(selectIsLoadingFlags, flags =>
  flags.some(f => f.includes('Sync')),
);

export const selectCurrentClinics = createSelector(
  selectIsMultiSelection,
  selectCurrentSingleClinicId,
  selectCurrentMultiClinicIds,
  selectClinics,
  (isMulti, singleId, multiIds, clinics) => {
    if (isMulti == null) {
      return clinics?.length > 0 ? [clinics[0]] : [];
    } else if (isMulti) {
      return clinics.filter(c => multiIds && multiIds.includes(c.id));
    } else {
      return singleId === 'all' ? clinics : clinics.filter(c => c.id == <number>singleId);
    }
  },
);

export const selectIsMultiClinicsSelected = createSelector(
  selectCurrentClinics,
  clinics => clinics.length > 1,
);

export const selectCurrentClinicId = createSelector(selectCurrentClinics, clinics => {
  return clinics.length > 0
    ? clinics.length > 1
      ? clinics.map(c => c.id).join(',')
      : clinics[0].id
    : null;
});

export const selectIsEachClinicExact = createSelector(selectCurrentClinics, clinics => {
  return clinics.every(c => c.pms == 'exact');
});

export const selectIsEachClinicCore = createSelector(selectCurrentClinics, clinics => {
  return clinics.every(c => c.pms == 'core');
});

export const selectIsEachClinicD4w = createSelector(selectCurrentClinics, clinics => {
  return clinics.every(c => c.pms == 'd4w');
});

export const selectIsAnyClinicHasD4w = createSelector(selectCurrentClinics, clinics => {
  return clinics.some(c => c.pms == 'd4w');
});

export const selectIsEachClinicPraktika = createSelector(selectCurrentClinics, clinics => {
  return clinics.every(c => c.pms == 'praktika');
});
