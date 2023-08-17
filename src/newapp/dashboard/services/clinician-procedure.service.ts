import { environment } from "@/environments/environment";
import { CpPredictorAnalysisApiResponse, CpPredictorRatioApiResponse, CpPredictorSpecialistAnalysisDataItem, CpReferralsApiResponse, CpRevPerProcedureApiResponse } from "@/newapp/models/dashboard/clinician-procedure";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import camelcaseKeys from 'camelcase-keys';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClinicianProcedureService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}
    cpPredictorAnalysis({
        clinicId,
        startDate,
        endDate,
        queryWhEnabled,
        dentistId = undefined
    }) {
        return this.http
        .get(
            `${this.apiUrl}/ClinicianProcedures/cpPredictorAnalysis`,
            {
                params: {
                    clinic_id: clinicId,
                    start_date: startDate,
                    end_date: endDate,
                    wh: queryWhEnabled,
                    provider_id: dentistId
                },
                withCredentials: true
            }
        )
        .pipe(
            map(
                (resBody) => <CpPredictorAnalysisApiResponse> camelcaseKeys(resBody, {deep: true})
            )
        );
    }

    cpPredictorAnalysisTrend(
        clinicId: number | string,
        mode: string,
        queryWhEnabled: number,
        dentistId = undefined,
    ) {
        return this.http
        .get(
            `${this.apiUrl}/ClinicianProcedures/cpPredictorAnalysisTrend`,
            {
                params: {
                    clinic_id: clinicId,
                    mode,
                    wh: queryWhEnabled,
                    provider_id: dentistId
                },
                withCredentials: true
            }
        )
        .pipe(
            map(
                (resBody) => <CpPredictorAnalysisApiResponse> camelcaseKeys(resBody, {deep: true})
            )
        );
    }

    cpPredictorSpecialistAnalysis({
        clinicId,
        startDate,
        endDate,
        queryWhEnabled,
        dentistId = undefined
    }) {
        return this.http
        .get(
            `${this.apiUrl}/ClinicianProcedures/cpPredictorSpecialistAnalysis`,
            {
                params: {
                    clinic_id: clinicId,
                    start_date: startDate,
                    end_date: endDate,
                    wh: queryWhEnabled,
                    provider_id: dentistId
                },
                withCredentials: true
            }
        )
        .pipe(
            map(
                (resBody) => <CpPredictorSpecialistAnalysisDataItem> camelcaseKeys(resBody, {deep: true})
            )
        );
    }

    cpPredictorSpecialistAnalysisTrend({
        clinicId,
        startDate,
        endDate,
        queryWhEnabled,
        dentistId = undefined
    }) {
        return this.http
        .get(
            `${this.apiUrl}/ClinicianProcedures/cpPredictorSpecialistAnalysisTrend`,
            {
                params: {
                    clinic_id: clinicId,
                    start_date: startDate,
                    end_date: endDate,
                    wh: queryWhEnabled,
                    provider_id: dentistId
                },
                withCredentials: true
            }
        )
        .pipe(
            map(
                (resBody) => <CpPredictorSpecialistAnalysisDataItem> camelcaseKeys(resBody, {deep: true})
            )
        );
    }

    cpRevPerProcedure({
        clinicId,
        startDate,
        endDate,
        queryWhEnabled,
        dentistId = undefined
    }) {
        return this.http
        .get(
            `${this.apiUrl}/ClinicianProcedures/cpRevPerProcedure`,
            {
                params: {
                    clinic_id: clinicId,
                    start_date: startDate,
                    end_date: endDate,
                    wh: queryWhEnabled,
                    provider_id: dentistId
                },
                withCredentials: true
            }
        )
        .pipe(
            map(
                (resBody) => <CpRevPerProcedureApiResponse> camelcaseKeys(resBody, {deep: true})
            )
        );
    }

    cpPredictorRatio({
        clinicId,
        startDate,
        endDate,
        queryWhEnabled,
        dentistId = undefined
    }) {
        return this.http
        .get(
            `${this.apiUrl}/ClinicianProcedures/cpPredictorRatio`,
            {
                params: {
                    clinic_id: clinicId,
                    start_date: startDate,
                    end_date: endDate,
                    wh: queryWhEnabled,
                    provider_id: dentistId
                },
                withCredentials: true
            }
        )
        .pipe(
            map(
                (resBody) => <CpPredictorRatioApiResponse> camelcaseKeys(resBody, {deep: true})
            )
        );
    }

    cpPredictorRatioTrend(
        clinicId: number | string,
        mode: string,
        queryWhEnabled: number,
        dentistId = undefined,
    ) {
        return this.http
        .get(
            `${this.apiUrl}/ClinicianProcedures/cpPredictorRatioTrend`,
            {
                params: {
                    clinic_id: clinicId,
                    mode,
                    wh: queryWhEnabled,
                    provider_id: dentistId
                },
                withCredentials: true
            }
        )
        .pipe(
            map(
                (resBody) => <CpPredictorAnalysisApiResponse> camelcaseKeys(resBody, {deep: true})
            )
        );
    }

    cpReferrals({
        clinicId,
        startDate,
        endDate,
        queryWhEnabled,
        dentistId = undefined
    }) {
        return this.http
        .get(
            `${this.apiUrl}/ClinicianProcedures/cpReferrals`,
            {
                params: {
                    clinic_id: clinicId,
                    start_date: startDate,
                    end_date: endDate,
                    wh: queryWhEnabled,
                    provider_id: dentistId
                },
                withCredentials: true
            }
        )
        .pipe(
            map(
                (resBody) => <CpReferralsApiResponse> camelcaseKeys(resBody, {deep: true})
            )
        );
    }

    cpReferralsTrend(
        clinicId: number | string,
        mode: string,
        queryWhEnabled: number,
        dentistId = undefined,
    ) {
        return this.http
        .get(
            `${this.apiUrl}/ClinicianProcedures/cpReferralsTrend`,
            {
                params: {
                    clinic_id: clinicId,
                    mode,
                    wh: queryWhEnabled,
                    provider_id: dentistId
                },
                withCredentials: true
            }
        )
        .pipe(
            map(
                (resBody) => <CpReferralsApiResponse> camelcaseKeys(resBody, {deep: true})
            )
        );
    }
}