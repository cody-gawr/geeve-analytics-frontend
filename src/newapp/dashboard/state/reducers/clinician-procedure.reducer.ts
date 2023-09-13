import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import * as _ from "lodash";
import { JeeveError } from "@/newapp/models";
import {
  ClinicianProcedureApiActions,
  ClinicianProcedurePageActions,
} from "../actions";
import {
  CpPredictorAnalysisApiResponse,
  CpPredictorRatioApiResponse,
  CpPredictorSpecialistAnalysisApiResponse,
  CpReferralsApiResponse,
  CpRevPerProcedureApiResponse,
} from "@/newapp/models/dashboard/clinician-procedure";
import { selectCurrentClinics } from "@/newapp/clinic/state/reducers/clinic.reducer";
import { DoughnutChartColors1 } from "@/newapp/shared/constants";

type ClinicianProcedureEndpoints =
  | "cpPredictorAnalysis"
  | "cpPredictorSpecialistAnalysis"
  | "cpRevPerProcedure"
  | "cpPredictorRatio"
  | "cpReferrals";

export interface ClinicianProcedureState {
  isLoadingData: Array<ClinicianProcedureEndpoints>;
  errors: Array<JeeveError>;

  cpPredictorAnalysisData: CpPredictorAnalysisApiResponse;
  cpPredictorSpecialistAnalysisData: CpPredictorSpecialistAnalysisApiResponse;
  cpRevPerProcedureData: CpRevPerProcedureApiResponse;
  cpPredictorRatioData: CpPredictorRatioApiResponse;
  cpReferralsData: CpReferralsApiResponse;

  cpPredictorAnalysisVisibility: "general" | "specialist";
  cpPredictorRatioVisibility: number;
  cpReferralsVisibility: "internal" | "external" | "combined";
}

const initialState: ClinicianProcedureState = {
  isLoadingData: [],
  errors: [],
  cpPredictorAnalysisData: null,
  cpPredictorSpecialistAnalysisData: null,
  cpRevPerProcedureData: null,
  cpPredictorRatioData: null,
  cpReferralsData: null,

  cpPredictorAnalysisVisibility: "general",
  cpPredictorRatioVisibility: 1,
  cpReferralsVisibility: "combined",
};

export const clinicianProcedureFeature = createFeature({
  name: "clinician-procedure",
  reducer: createReducer(
    initialState,
    // cpPredictorAnalysis
    on(
      ClinicianProcedurePageActions.loadCpPredictorAnalysis,
      (state): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, (n) => n.api != "cpPredictorAnalysis"),
          cpPredictorAnalysisData: null,
          isLoadingData: _.union(isLoadingData, ["cpPredictorAnalysis"]),
        };
      }
    ),
    on(
      ClinicianProcedureApiActions.loadCpPredictorAnalysisSuccess,
      (state, { cpPredictorAnalysisData }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, (n) => n.api != "cpPredictorAnalysis"),
          cpPredictorAnalysisData,
          isLoadingData: _.filter(
            isLoadingData,
            (n) => n != "cpPredictorAnalysis"
          ),
        };
      }
    ),
    on(
      ClinicianProcedureApiActions.loadCpPredictorAnalysisFailure,
      (state, { error }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          cpPredictorAnalysisData: null,
          isLoadingData: _.filter(
            isLoadingData,
            (n) => n != "cpPredictorAnalysis"
          ),
          errors: [...errors, { ...error, api: "cpPredictorAnalysis" }],
        };
      }
    ),
    // cpPredictorSpecialistAnalysis
    on(
      ClinicianProcedurePageActions.loadCpPredictorSpecialistAnalysis,
      (state): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(
            errors,
            (n) => n.api != "cpPredictorSpecialistAnalysis"
          ),
          cpPredictorAnalysisData: null,
          isLoadingData: _.union(isLoadingData, [
            "cpPredictorSpecialistAnalysis",
          ]),
        };
      }
    ),
    on(
      ClinicianProcedureApiActions.loadCpPredictorSpecialistAnalysisSuccess,
      (
        state,
        { cpPredictorSpecialistAnalysisData }
      ): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(
            errors,
            (n) => n.api != "cpPredictorSpecialistAnalysis"
          ),
          cpPredictorSpecialistAnalysisData,
          isLoadingData: _.filter(
            isLoadingData,
            (n) => n != "cpPredictorSpecialistAnalysis"
          ),
        };
      }
    ),
    on(
      ClinicianProcedureApiActions.loadCpPredictorSpecialistAnalysisFailure,
      (state, { error }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          cpPredictorSpecialistAnalysisData: null,
          isLoadingData: _.filter(
            isLoadingData,
            (n) => n != "cpPredictorSpecialistAnalysis"
          ),
          errors: [
            ...errors,
            { ...error, api: "cpPredictorSpecialistAnalysis" },
          ],
        };
      }
    ),
    // cpRevPerProcedure
    on(
      ClinicianProcedurePageActions.loadCpRevPerProcedure,
      (state): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, (n) => n.api != "cpRevPerProcedure"),
          cpRevPerProcedureData: null,
          isLoadingData: _.union(isLoadingData, ["cpRevPerProcedure"]),
        };
      }
    ),
    on(
      ClinicianProcedureApiActions.loadCpRevPerProcedureSuccess,
      (state, { cpRevPerProcedureData }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, (n) => n.api != "cpRevPerProcedure"),
          cpRevPerProcedureData,
          isLoadingData: _.filter(
            isLoadingData,
            (n) => n != "cpRevPerProcedure"
          ),
        };
      }
    ),
    on(
      ClinicianProcedureApiActions.loadCpRevPerProcedureFailure,
      (state, { error }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          cpRevPerProcedureData: null,
          isLoadingData: _.filter(
            isLoadingData,
            (n) => n != "cpRevPerProcedure"
          ),
          errors: [...errors, { ...error, api: "cpRevPerProcedure" }],
        };
      }
    ),
    // cpPredictorRatio
    on(
      ClinicianProcedurePageActions.loadCpPredictorRatio,
      (state): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, (n) => n.api != "cpPredictorRatio"),
          cpPredictorRatioData: null,
          isLoadingData: _.union(isLoadingData, ["cpPredictorRatio"]),
        };
      }
    ),
    on(
      ClinicianProcedureApiActions.loadCpPredictorRatioSuccess,
      (state, { cpPredictorRatioData }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, (n) => n.api != "cpPredictorRatio"),
          cpPredictorRatioData,
          isLoadingData: _.filter(
            isLoadingData,
            (n) => n != "cpPredictorRatio"
          ),
        };
      }
    ),
    on(
      ClinicianProcedureApiActions.loadCpPredictorRatioFailure,
      (state, { error }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          cpPredictorRatioData: null,
          isLoadingData: _.filter(
            isLoadingData,
            (n) => n != "cpPredictorRatio"
          ),
          errors: [...errors, { ...error, api: "cpPredictorRatio" }],
        };
      }
    ),
    // cpReferrals
    on(
      ClinicianProcedurePageActions.loadCpReferrals,
      (state): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, (n) => n.api != "cpReferrals"),
          cpReferralsData: null,
          isLoadingData: _.union(isLoadingData, ["cpReferrals"]),
        };
      }
    ),
    on(
      ClinicianProcedureApiActions.loadCpReferralsSuccess,
      (state, { cpReferralsData }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          errors: _.filter(errors, (n) => n.api != "cpReferrals"),
          cpReferralsData,
          isLoadingData: _.filter(isLoadingData, (n) => n != "cpReferrals"),
        };
      }
    ),
    on(
      ClinicianProcedureApiActions.loadCpReferralsFailure,
      (state, { error }): ClinicianProcedureState => {
        const { isLoadingData, errors } = state;
        return {
          ...state,
          cpReferralsData: null,
          isLoadingData: _.filter(isLoadingData, (n) => n != "cpReferrals"),
          errors: [...errors, { ...error, api: "cpReferrals" }],
        };
      }
    ),
    // cpPredictorAnalysisVisibility
    on(
      ClinicianProcedurePageActions.setCpPredictorAnalysisVisibility,
      (state, { value }): ClinicianProcedureState => {
        return {
          ...state,
          cpPredictorAnalysisVisibility: value,
        };
      }
    ),
    // cpPredictorRatioVisibility
    on(
      ClinicianProcedurePageActions.setCpPredictorRatioVisibility,
      (state, { value }): ClinicianProcedureState => {
        return {
          ...state,
          cpPredictorRatioVisibility: value,
        };
      }
    ),
    // cpReferralsVisibility
    on(
      ClinicianProcedurePageActions.setCpReferralsVisibility,
      (state, { value }): ClinicianProcedureState => {
        return {
          ...state,
          cpReferralsVisibility: value,
        };
      }
    )
  ),
});

export const {
  selectErrors,
  selectIsLoadingData,
  selectCpPredictorAnalysisData,
  selectCpPredictorSpecialistAnalysisData,
  selectCpRevPerProcedureData,
  selectCpPredictorRatioData,
  selectCpReferralsData,
  selectCpPredictorAnalysisVisibility,
  selectCpPredictorRatioVisibility,
  selectCpReferralsVisibility,
} = clinicianProcedureFeature;

export const selectCpPredictorAnalysisError = createSelector(
  selectErrors,
  (errors): JeeveError | undefined =>
    _.find(errors, (e) => e.api == "cpPredictorAnalysis")
);

export const selectIsLoadingCpPredictorAnalysis = createSelector(
  selectIsLoadingData,
  (loadingData) =>
    _.findIndex(loadingData, (l) => l == "cpPredictorAnalysis") >= 0
);

export const selectIsLoadingCpPredictorSpecialistAnalysis = createSelector(
  selectIsLoadingData,
  (loadingData) =>
    _.findIndex(loadingData, (l) => l == "cpPredictorSpecialistAnalysis") >= 0
);

export const selectIsLoadingCpRevPerProcedure = createSelector(
  selectIsLoadingData,
  (loadingData) =>
    _.findIndex(loadingData, (l) => l == "cpRevPerProcedure") >= 0
);

export const selectIsLoadingCpPredictorRatio = createSelector(
  selectIsLoadingData,
  (loadingData) => _.findIndex(loadingData, (l) => l == "cpPredictorRatio") >= 0
);

export const selectIsLoadingCpReferrals = createSelector(
  selectIsLoadingData,
  (loadingData) => _.findIndex(loadingData, (l) => l == "cpReferrals") >= 0
);

export const selectCpPredictorAnalysisChartData = createSelector(
  selectCpPredictorAnalysisData,
  selectCurrentClinics,
  // selectRolesIndividual,
  (resData, clinics) => {
    if (!resData || !resData.data || resData.data.length == 0) {
      return {
        datasets: [],
        labels: [],
      };
    }

    let chartDatasets = [],
      chartLabels = [];

    if (clinics.length > 1) {
      const mapPropAnalysisType: Record<string, string> = {
        crowns: "Crowns & Onlays",
        splints: "Splints",
        rct: "Root Canals",
        perio: "Perio Charts",
        extract: "Surgical Extractions",
        ss_crowns: "Stainless Steel Crowns",
        comp_veneers: "Composite Veneers",
        imp_crowns: "Implant Crowns",
        whitening: "Whitening",
      };

      Object.keys(mapPropAnalysisType).forEach(() => {
        chartDatasets.push({
          data: [],
          label: "",
        });
      });

      _.chain(resData.data)
        .groupBy("clinicId")
        .map((items) => {
          return {
            ...items[0],
            whitening: _.sumBy(items, (item) =>
              parseInt(<string>item.whitening)
            ),
            imp_crowns: _.sumBy(items, (item) =>
              parseInt(<string>item.impCrowns)
            ),
            crowns: _.sumBy(items, (item) => parseInt(<string>item.crowns)),
            splints: _.sumBy(items, (item) => parseInt(<string>item.splints)),
            rct: _.sumBy(items, (item) => parseInt(<string>item.rct)),
            perio: _.sumBy(items, (item) => parseInt(<string>item.perio)),
            extract: _.sumBy(items, (item) => parseInt(<string>item.extract)),
            ss_crowns: _.sumBy(items, (item) =>
              parseInt(<string>item.ssCrowns)
            ),
            comp_veneers: _.sumBy(items, (item) =>
              parseInt(<string>item.compVeneers)
            ),
          };
        })
        .value()
        .forEach((item) => {
          chartLabels.push(item.clinicName);
          Object.keys(mapPropAnalysisType).forEach((key, index) => {
            chartDatasets[index]["data"].push(Math.trunc(item[key]));
            chartDatasets[index]["label"] = mapPropAnalysisType[key];
          });
        });
      return {
        datasets: chartDatasets,
        labels: chartLabels,
      };
    } else {
      chartDatasets = [
        { data: [], label: "Crowns & Onlays" },
        { data: [], label: "Splints" },
        { data: [], label: "Root Canals" },
        { data: [], label: "Perio Charts" },
        { data: [], label: "Surgical Extractions" },
        { data: [], label: "Stainless Steel Crowns" },
        { data: [], label: "Composite Veneers" },
        { data: [], label: "Implant Crowns" },
        { data: [], label: "Whitening" },
      ];
      const stackedChartData1 = [],
        stackedChartData2 = [],
        stackedChartData3 = [],
        stackedChartData4 = [],
        stackedChartData5 = [],
        stackedChartData6 = [],
        stackedChartData7 = [],
        stackedChartData8 = [],
        stackedChartData9 = [],
        paTableData = [];

      resData.data.forEach((item, index) => {
        let ipKey = null;
        if (item.providerName != null) {
          if (
            parseInt(<string>item.crowns) +
              parseInt(<string>item.splints) +
              parseInt(<string>item.rct) +
              parseInt(<string>item.perio) +
              parseInt(<string>item.extract) +
              parseInt(<string>item.ssCrowns) +
              parseInt(<string>item.compVeneers) +
              parseInt(<string>item.impCrowns) >
            0
          ) {
            stackedChartData1.push(item.crowns);
            stackedChartData2.push(item.splints);
            stackedChartData3.push(item.rct);
            stackedChartData4.push(item.perio);
            stackedChartData5.push(item.extract);
            stackedChartData6.push(item.ssCrowns);
            stackedChartData7.push(item.compVeneers);
            stackedChartData8.push(item.impCrowns);
            stackedChartData9.push(item.whitening);
            chartLabels.push(item.providerName);
            if (item.providerName != "Anonymous") {
              ipKey = index;
            }
          }
        }

        let temp = {
          name: item.providerName,
          Crowns_Onlays: parseInt(<string>item.crowns),
          Splints: parseInt(<string>item.splints),
          RCT: parseInt(<string>item.rct),
          Perio: parseInt(<string>item.perio),
          Surg_Ext: parseInt(<string>item.extract),
          Imp_Crowns: parseInt(<string>item.impCrowns),
          SS_Crowns: parseInt(<string>item.ssCrowns),
          Comp_Veneers: parseInt(<string>item.compVeneers),
          Whitening: parseInt(<string>item.whitening),
        };

        paTableData.push(temp);
      });

      chartDatasets[0]["data"] = stackedChartData1;
      chartDatasets[1]["data"] = stackedChartData2;
      chartDatasets[2]["data"] = stackedChartData3;
      chartDatasets[3]["data"] = stackedChartData4;
      chartDatasets[4]["data"] = stackedChartData5;
      chartDatasets[5]["data"] = stackedChartData6;
      chartDatasets[6]["data"] = stackedChartData7;
      chartDatasets[7]["data"] = stackedChartData8;
      chartDatasets[8]["data"] = stackedChartData9;

      const stackedChartDataMax =
        Math.max(...chartDatasets[0]["data"]) +
        Math.max(...chartDatasets[1]["data"]) +
        Math.max(...chartDatasets[2]["data"]) +
        Math.max(...chartDatasets[3]["data"]) +
        Math.max(...chartDatasets[4]["data"]) +
        Math.max(...chartDatasets[5]["data"]) +
        Math.max(...chartDatasets[6]["data"]) +
        Math.max(...chartDatasets[7]["data"]) +
        Math.max(...chartDatasets[8]["data"]);

      const bgColors = [
        { backgroundColor: "#6cd8ba" },
        { backgroundColor: "#b0fffa" },
        { backgroundColor: "#abb3ff" },
        { backgroundColor: "#feefb8" },
        { backgroundColor: "#ffb4b5" },
        { backgroundColor: "#fffcac" },
      ];

      return {
        datasets: chartDatasets,
        labels: chartLabels,
        bgColors,
        maxData: stackedChartDataMax,
        paTableData,
      };
    }
  }
);

export const selectCpPredictorSpecialistAnalysisChartData = createSelector(
  selectCpPredictorSpecialistAnalysisData,
  selectCurrentClinics,
  (resData, clinics) => {
    if (!resData || !resData.data || resData.data.length == 0) {
      return {
        datasets: [],
        labels: [],
      };
    }
    let chartDatasets = [],
      chartLabels = [];
    if (clinics.length > 1) {
      chartLabels = _.chain(resData.data)
        .uniqBy((item) => item.clinicId)
        .map((item) => item.clinicName)
        .value();
      const descriptionMap: Record<string, string> = {
        imp_surg: "Implant Surg",
        ortho_fix: "Braces",
        ortho_align: "Aligners",
        sleep: "MAS",
        perio_surg: "Perio Surg",
        endo_retreat: "Endo Re-treat",
        veneers_ind: "Veneers (indirect)",
      };
      Object.entries(descriptionMap).forEach(
        ([property, description], index) => {
          const data: number[] = _.chain(resData.data)
            .groupBy("clinicId")
            .map((items) => {
              return _.chain(items)
                .sumBy((item) => Number(item[property]) || 0)
                .value();
            })
            .value();
          chartDatasets.push({
            data,
            label: description,
            backgroundColor: DoughnutChartColors1[index],
            hoverBackgroundColor: DoughnutChartColors1[index],
          });
        }
      );

      return {
        datasets: chartDatasets,
        labels: chartLabels,
      };
    } else {
      chartDatasets = [
        { data: [], label: "Implant Surg" },
        { data: [], label: "Braces" },
        { data: [], label: "Aligners" },
        { data: [], label: "MAS" },
        { data: [], label: "Perio Surg" },
        { data: [], label: "Endo Re-treat" },
        { data: [], label: "Veneers (indirect)" },
      ];
      const stackedChartData1 = [],
        stackedChartData2 = [],
        stackedChartData3 = [],
        stackedChartData4 = [],
        stackedChartData5 = [],
        stackedChartData6 = [],
        stackedChartData7 = [],
        paSpecialTableData = [];

      resData.data.forEach((item, index) => {
        let ipKey = null;
        if (item.providerName != null) {
          if (
            parseInt(<string>item.impSurg) +
              parseInt(<string>item.orthoFix) +
              parseInt(<string>item.sleep) +
              parseInt(<string>item.orthoAlign) +
              parseInt(<string>item.perioSurg) +
              parseInt(<string>item.veneersInd) >
            0
          ) {
            stackedChartData1.push(item.impSurg);
            stackedChartData2.push(item.orthoFix);
            stackedChartData3.push(item.orthoAlign);
            stackedChartData4.push(item.sleep);
            stackedChartData5.push(item.perioSurg);
            stackedChartData6.push(item.endoRetreat);
            stackedChartData7.push(item.veneersInd);
            chartLabels.push(item.providerName);
            if (item.providerName != "Anonymous") {
              ipKey = index;
            }
          }
        }

        let temp = {
          name: item.providerName,
          Implant_Surg: parseInt(<string>item.impSurg),
          Braces: parseInt(<string>item.orthoFix),
          Aligners: parseFloat(<string>item.orthoAlign),
          MAS: parseInt(<string>item.sleep),
          Perio_Surg: parseInt(<string>item.perioSurg),
          Endo_Re_treat: parseInt(<string>item.endoRetreat),
          Veneers_ind: parseInt(<string>item.veneersInd),
        };

        paSpecialTableData.push(temp);
      });
      chartDatasets[0]["data"] = stackedChartData1;
      chartDatasets[1]["data"] = stackedChartData2;
      chartDatasets[2]["data"] = stackedChartData3;
      chartDatasets[3]["data"] = stackedChartData4;
      chartDatasets[4]["data"] = stackedChartData5;
      chartDatasets[5]["data"] = stackedChartData6;
      chartDatasets[6]["data"] = stackedChartData7;

      const stackedChartDataMax =
        Math.max(...chartDatasets[0]["data"]) +
        Math.max(...chartDatasets[1]["data"]) +
        Math.max(...chartDatasets[2]["data"]) +
        Math.max(...chartDatasets[3]["data"]) +
        Math.max(...chartDatasets[4]["data"]) +
        Math.max(...chartDatasets[5]["data"]) +
        Math.max(...chartDatasets[6]["data"]);

      const bgColors = [
        { backgroundColor: "#6cd8ba" },
        { backgroundColor: "#b0fffa" },
        { backgroundColor: "#abb3ff" },
        { backgroundColor: "#feefb8" },
        { backgroundColor: "#ffb4b5" },
        { backgroundColor: "#fffcac" },
        { backgroundColor: "#6cd8ba" },
        { backgroundColor: "#feefb8" },
      ];
      return {
        datasets: chartDatasets,
        labels: chartLabels,
        bgColors,
        maxData: stackedChartDataMax,
        paSpecialTableData: paSpecialTableData,
      };
    }
  }
);

export const selectCpRevPerProcedureChartData = createSelector(
  selectCpRevPerProcedureData,
  (resData) => {
    if (!resData) {
      return {
        datasets: [],
        labels: [],
      };
    }
    const chartData = [],
      chartLabels = [];
    resData.data.forEach((item) => {
      chartData.push(Math.round(<number>item.total));
      if (item.itemName != null) {
        chartLabels.push(item.itemName);
      } else {
        chartLabels.push(item.treatCode);
      }
    });
    const chartDatasets = [
      {
        data: [],
        label: "Total Revenue of Clinician Per Procedure",
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 5,
        shadowColor: "rgba(0, 0, 0, 0.5)",
        backgroundColor: [
          "#119682",
          "#eeeef8",
          "#119682",
          "#eeeef8",
          "#119682",
          "#eeeef8",
          "#119682",
          "#eeeef8",
          "#119682",
          "#eeeef8",
        ],
        pointBevelWidth: 2,
        pointBevelHighlightColor: "rgba(255, 255, 255, 0.75)",
        pointBevelShadowColor: "rgba(0, 0, 0, 0.5)",
        pointShadowOffsetX: 3,
        pointShadowOffsetY: 3,
        pointShadowBlur: 10,
        pointShadowColor: "rgba(0, 0, 0, 0.5)",
        backgroundOverlayMode: "multiply",
      },
    ];
    chartDatasets[0]["data"] = chartData;
    return {
      datasets: chartDatasets,
      labels: chartLabels,
    };
  }
);

export const selectCpPredictorRatioChartData = createSelector(
  selectCpPredictorRatioData,
  selectCurrentClinics,
  selectCpPredictorRatioVisibility,
  (resData, clinics, visibility) => {
    if (!resData) {
      return {
        datasets: [],
        labels: [],
      };
    }

    let chartDatasets1 = [],
      chartDatasets2 = [],
      chartDatasets3 = [],
      chartLabels1 = [],
      chartLabels2 = [],
      chartLabels3 = [];

    const cpPredictorRatioPrev1 =
      resData.data.find((item) => item.type == "crown-largefilling")?.totalTa ||
      "";

    const cpPredictorRatioPrev2 =
      resData.data.find((item) => item.type == "rct-extraction")?.totalTa || "";

    const cpPredictorRatioPrev3 =
      resData.data.find((item) => item.type == "rctstarted-rctcompleted")
        ?.totalTa || "";

    if (clinics.length > 1) {
      const types = [
        "crown-largefilling",
        "rct-extraction",
        "rctstarted-rctcompleted",
      ];
      chartDatasets1 = [
        { data: [], label: "" },
        { data: [], label: "" },
      ];
      chartDatasets2 = [
        { data: [], label: "" },
        { data: [], label: "" },
      ];
      chartDatasets3 = [
        { data: [], label: "" },
        { data: [], label: "" },
      ];
      let ratio1 = 0,
        ratio2 = 0,
        ratio3 = 0,
        ratio4 = 0,
        ratio5 = 0,
        ratio6 = 0,
        multifulratio1 = "",
        multifulratio2 = "",
        multifulratio3 = "";

      types.forEach((type) => {
        resData.data
          .filter((item) => item.type == type)
          .forEach((ele) => {
            switch (type) {
              case "crown-largefilling":
                chartDatasets1[0]["data"].push(ele.firstValue);
                chartDatasets1[1]["data"].push(ele.secondValue);
                chartDatasets1[0]["label"] = "Indirect Restorations";
                chartDatasets1[1]["label"] = "Large Direct Restorations";
                ratio1 += parseInt(<string>ele.firstValue) || 0;
                ratio2 += parseInt(<string>ele.secondValue) || 0;
                multifulratio1 = ratio1 + ":" + ratio2;
                chartLabels1.push(ele.clinicName);
                break;
              case "rct-extraction":
                chartDatasets2[0]["data"].push(ele.firstValue);
                chartDatasets2[1]["data"].push(ele.secondValue);
                chartDatasets2[0]["label"] = "RCT";
                chartDatasets2[1]["label"] = "Extractions";
                ratio3 += parseInt(<string>ele.firstValue) || 0;
                ratio4 += parseInt(<string>ele.secondValue) || 0;
                multifulratio2 = ratio3 + ":" + ratio4;
                chartLabels2.push(ele.clinicName);
                break;
              case "rctstarted-rctcompleted":
                chartDatasets3[0]["data"].push(ele.firstValue);
                chartDatasets3[1]["data"].push(ele.secondValue);
                chartDatasets3[0]["label"] = "RCT's Started";
                chartDatasets3[1]["label"] = "RCT's Completed";
                ratio5 += parseInt(<string>ele.firstValue) || 0;
                ratio6 += parseInt(<string>ele.secondValue) || 0;
                multifulratio3 = ratio5 + ":" + ratio6;
                chartLabels3.push(ele.clinicName);
                break;
              default:
                break;
            }
          });
      });
      if (visibility === 1) {
        return {
          datasets: chartDatasets1,
          labels: chartLabels1,
          cpPredictorRatioPrev: cpPredictorRatioPrev1,
          ratio1: ratio1,
          ratio2: ratio2,
          multifulRatio: multifulratio1,
        };
      } else if (visibility === 2) {
        return {
          datasets: chartDatasets2,
          labels: chartLabels2,
          cpPredictorRatioPrev: cpPredictorRatioPrev2,
          ratio1: ratio3,
          ratio2: ratio4,
          multifulRatio: multifulratio2,
        };
      } else {
        return {
          datasets: chartDatasets3,
          labels: chartLabels3,
          cpPredictorRatioPrev: cpPredictorRatioPrev3,
          ratio1: ratio5,
          ratio2: ratio6,
          multifulRatio: multifulratio3,
        };
      }
    } else {
      (chartDatasets1 = [
        { data: [], label: "Indirect Restorations" },
        { data: [], label: "Large Direct Restorations" },
      ]),
        (chartDatasets2 = [
          { data: [], label: "RCT" },
          { data: [], label: "Extractions" },
        ]),
        (chartDatasets3 = [
          { data: [], label: "RCT's Started" },
          { data: [], label: "RCT's Completed" },
        ]);
      let cpPredictorRatioAvr1 = 0,
        cpPredictorRatioAvr2 = 0,
        cpPredictorRatioAvr3 = 0;
      resData.data.forEach((item) => {
        let provider = item.providerName ?? "";
        switch (item.type) {
          case "crown-largefilling":
            chartDatasets1[0]["data"].push(parseInt(<string>item.firstValue));
            chartDatasets1[1]["data"].push(parseInt(<string>item.secondValue));
            cpPredictorRatioAvr1 = parseInt(<string>item.ratio);
            chartLabels1.push(provider);
            break;
          case "rct-extraction":
            chartDatasets2[0]["data"].push(parseInt(<string>item.firstValue));
            chartDatasets2[1]["data"].push(parseInt(<string>item.secondValue));
            cpPredictorRatioAvr2 = parseInt(<string>item.ratio);
            chartLabels2.push(provider);
            break;
          case "rctstarted-rctcompleted":
            chartDatasets3[0]["data"].push(parseInt(<string>item.firstValue));
            chartDatasets3[1]["data"].push(parseInt(<string>item.secondValue));
            cpPredictorRatioAvr3 = parseInt(<string>item.ratio);
            chartLabels3.push(provider);
            break;
          default:
            break;
        }
      });

      if (visibility === 1) {
        return {
          datasets: chartDatasets1,
          labels: chartLabels1,
          cpPredictorRatioPrev: cpPredictorRatioPrev1,
          cpPredictorRatioAvr: cpPredictorRatioAvr1,
        };
      } else if (visibility === 2) {
        return {
          datasets: chartDatasets2,
          labels: chartLabels2,
          cpPredictorRatioPrev: cpPredictorRatioPrev2,
          cpPredictorRatioAvr: cpPredictorRatioAvr2,
        };
      } else {
        return {
          datasets: chartDatasets3,
          labels: chartLabels3,
          cpPredictorRatioPrev: cpPredictorRatioPrev3,
          cpPredictorRatioAvr: cpPredictorRatioAvr3,
        };
      }
    }
    //changeDentistPredictorMain('1');
  }
);

export const selectCpReferralsChartData = createSelector(
  selectCpReferralsData,
  selectCpReferralsVisibility,
  (resData, visibility) => {
    if (!resData) {
      return {};
    }
    const chartData1 = [],
      chartLabels1 = [],
      chartData2 = [],
      chartLabels2 = [],
      chartData3 = [],
      chartLabels3 = [];

    let pieChartInternalTotal = 0,
      pieChartExternalTotal = 0,
      pieChartCombinedTotal = 0,
      pieChartInternalPrev = 0,
      pieChartExternalPrev = 0,
      pieChartCombinedPrev = 0;

    resData.data.forEach((item) => {
      if (parseFloat(<string>item.total) > 0) {
        if (parseFloat(<string>item.internal) > 0) {
          chartData1.push(item.internal);
          chartLabels1.push(item.treatItemName);
        }
        if (parseFloat(<string>item.external) > 0) {
          chartData2.push(item.external);
          chartLabels2.push(item.treatItemName);
        }

        chartData3.push(item.total);
        chartLabels3.push(item.treatItemName);

        pieChartInternalTotal =
          pieChartInternalTotal + parseInt(<string>item.internal);
        pieChartExternalTotal =
          pieChartExternalTotal + parseInt(<string>item.external);
        pieChartCombinedTotal =
          pieChartCombinedTotal + parseInt(<string>item.total);
      }
    });

    pieChartInternalPrev =
      pieChartInternalPrev + parseInt(<string>resData.totalTa.internal);
    pieChartExternalPrev =
      pieChartExternalPrev + parseInt(<string>resData.totalTa.external);
    pieChartCombinedPrev =
      pieChartCombinedPrev + parseInt(<string>resData.totalTa.total);

    if (visibility === "internal") {
      return {
        datasets: [{ data: chartData1 }],
        labels: chartLabels1,
        referralsVal: pieChartCombinedTotal,
        referralsPrev: pieChartCombinedPrev,
        referralsVal2: pieChartInternalTotal,
        referralsPrev2: pieChartInternalPrev,
        referralsVal3: pieChartExternalTotal,
        referralsPrev3: pieChartExternalPrev,
        maxVal: Math.max(...chartData1),
      };
    } else if (visibility === "external") {
      return {
        datasets: [{ data: chartData2 }],
        labels: chartLabels2,
        referralsVal2: pieChartInternalTotal,
        referralsPrev2: pieChartInternalPrev,
        referralsVal3: pieChartExternalTotal,
        referralsPrev3: pieChartExternalPrev,
        referralsVal: pieChartCombinedTotal,
        referralsPrev: pieChartCombinedPrev,
        maxVal: Math.max(...chartData2),
      };
    } else {
      return {
        datasets: [{ data: chartData3 }],
        labels: chartLabels3,
        referralsVal2: pieChartInternalTotal,
        referralsPrev2: pieChartInternalPrev,
        referralsVal3: pieChartExternalTotal,
        referralsPrev3: pieChartExternalPrev,
        referralsVal: pieChartCombinedTotal,
        referralsPrev: pieChartCombinedPrev,
        maxVal: Math.max(...chartData3),
      };
    }
  }
);
// export const selectCpPredictorRatioTrendChartData = createSelector(
//   selectCpReferralsTrendDat,
//   selectTrend,
//   (resData, trendMode) => {
//     if(!resData){
//       return {
//         datasets: [],
//         labels: []
//       }
//     }

//     const chartDatasets1 = [
//       { data: [], label: 'Indirect Restorations' },
//       { data: [], label: 'Large Direct Restorations' }
//     ];
//     const chartDatasets2 = [
//       { data: [], label: 'RCT' },
//       { data: [], label: 'Extractions' }
//     ];
//     const chartDatasets3 = [
//       { data: [], label: "RCT's Started" },
//       { data: [], label: "RCT's Completed" }
//     ];

//     let chartLabels1 = [],
//         chartLabels2 = [],
//         chartLabels3 = [];

//     resData.data.forEach(
//       item => {
//         if(typeof item.val != undefined){
//           chartDatasets1[0]['data'].push(item.val.crown[0]);
//           chartDatasets1[1]['data'].push(item.val.crown[1]);

//           chartDatasets2[0]['data'].push(item.val.extraction[0]);
//           chartDatasets2[1]['data'].push(item.val.extraction[1]);

//           chartDatasets3[0]['data'].push(item.val.completed[0]);
//           chartDatasets3[1]['data'].push(item.val.completed[1]);
//         }
//         chartLabels1.push(
//           trendMode === 'current'?moment(item.duration).format('MMM YYYY'):item.duration
//         );
//       }
//     )
//   }
// );
