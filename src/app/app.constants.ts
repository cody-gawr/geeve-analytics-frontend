import { Injectable } from '@angular/core';
import { ITooltipData } from './shared/tooltip/tooltip.directive';

@Injectable({
    providedIn: 'root'
})

export class AppConstants {

    // ********
    // TOOLTIPS
    // ********

    // CLINICIAN ANALYSIS
    public tipProduction: ITooltipData = {
        title: 'Dentist Production',
        info: 'Total amount invoiced by clinician'
    };

    public tipCollection: ITooltipData = {
        title: 'Dentist Collection',
        info: 'Total amount collected by clinician'
    };

    public tipHourlyRate: ITooltipData = {
        title: 'Hourly Rate',
        info: 'Hourly rate of clinician (excluding ftas)'
    };

    public tipNumPatients: ITooltipData = {
        title: 'No. New Patients',
        info: 'Total number of new patients seen'
    };

    public tipTxPlanFeeProposed: ITooltipData = {
        title: 'Treatment Plan Avg Proposed Fees',
        info: 'Average total value of Treatment Plans created in the date range- designated by who created the treatment plan'
    };

    public tipPTxPlanFeeCompleted: ITooltipData = {
        title: 'Treatment Plan Avg Completed Fees',
        info: 'Average Completed Fees for Treatment Plan related items - Designated by who performed the treatment'
    };

    public tipTxPlanFeeCompletion: ITooltipData = {
        title: 'Treatment Plan Completion Rate',
        info: ' Average Treatment Plan Completion of each plan created in the date range'
    };

    public tipRecallRate: ITooltipData = {
        title: 'Recall Prebook Rate',
        info: 'Percentage of patients who have had an exam/recall appointment who prebook a 6 monthly recall appointment'
    };

    public tipReappointRate: ITooltipData = {
        title: 'Reappointment Rate',
        info: 'Percentage of patients who have had treatment that reappointed for treatment of any type'
    };

    public tipNumComplaints: ITooltipData = {
        title: 'No. Patient Complaints',
        info: 'Number of patient complaints (recorded by complaint code "COMP")'
    };

    // CLINICIAN PROCEDURES

    public tipProcAnalysisGen: ITooltipData = {
        title: 'Procedure Analysis - General',
        info: 'This highlights certain procedures that our algorithm predicts are performed by high grossing and proactive dentists'
    };

    public tipProcAnalysisSpec: ITooltipData = {
        title: 'Procedure Analysis - Specialist',
        info: 'This highlights procedures performed by super gps and specialists'
    };

    public tipRevPerProc: ITooltipData = {
        title: 'Revenue Per Procedure',
        info: 'Breakdown of the top 10 revenue generating procedures'
    };

    public tipPredictorCrown: ITooltipData = {
        title: 'Conversion Predictor - Indirect Restorations : Large Direct Restorations',
        info: 'Ratio of how many indirect restorations were performed compared to large direct restorations'
    };

    public tipPredictorExtract: ITooltipData = {
        title: 'Conversion Predictor - RCT : Extraction',
        info: 'Ratio of how may root canals were completed vs extractions (not including decidious or wisdom teeth)'
    };

    public tipPredictorRCT: ITooltipData = {
        title: 'Conversion Predictor - RCT Conversion',
        info: 'Ratio of how many extipations were performed compared to completed obturations'
    };

    public tipReferrals: ITooltipData = {
        title: 'Clinician Referrals',
        info: 'Breakdown of where referrals are going, both internally and externally (requires manual referral code input)'
    };

    // FRONT DESK

    public tipUtilRate: ITooltipData = {
        title: 'Utilisation Rate',
        info: 'Percentage of available hours that have been used (excluding breaks and holidays)'
    };

    public tipFDRecallRate: ITooltipData = {
        title: 'Recall Prebook Rate',
        info: 'Percentage of patients who have had an exam/recall appointment who prebook a 6 monthly recall appointment'
    };

    public tipFDReappointRate: ITooltipData = {
        title: 'Reappointment Rate',
        info: 'Percentage of patients who have had treatment that reappointed for treatment of any type'
    };

    public tipNumTicks: ITooltipData = {
        title: 'Number of Ticks',
        info: 'Number of followup calls scheduled (designated by code TICK)'
    };

    public tipFTARatio: ITooltipData = {
        title: 'FTA Ratio',
        info: 'Number of FTAS (failure to attends) vs total number of appointments'
    };

    public tipUTARatio: ITooltipData = {
        title: 'UTA Ratio',
        info: 'Number of UTAS (unable to attend) vs total number of appointments'
    };

    // MARKETING

    public tipNewPatReferrals: ITooltipData = {
        title: 'New Patients by Referral',
        info: 'Breakdown of new patients per referral source'
    };

    public tipNewPatientRevenue: ITooltipData = {
        title: 'New Patient Revenue by Referral',
        info: 'Breakdown of new patient revenue by referral source'
    };

    public tipNumNewPatients: ITooltipData = {
        title: 'No. New Patients',
        info: 'Number of new patients who attended for their first appointment'
    };

    public tipNewPatCost: ITooltipData = {
        title: 'New Patient Cost',
        info: 'Cost of new patient based on accounting expenditure and total new patients recorded'
    };

    public tipTotalVisits: ITooltipData = {
        title: 'Total Visits',
        info: 'Total appointments in date range'
    };

    // FINANCES

    public tipFinProduction: ITooltipData = {
        title: 'Production',
        info: 'Total invoiced production for date range'
    };

    public tipNetProfit: ITooltipData = {
        title: 'Net Profit',
        info: 'Net profit (from Accounting Software)'
    };

    public tipNetProfitPercent: ITooltipData = {
        title: 'Net Profit %',
        info: 'Net profit percentage calculated with Collections from PMS and Profit from accounting software'
    };

    public tipExpenses: ITooltipData = {
        title: 'Expenses',
        info: 'Breakdown and benchmarked expenses (from Accounting Software). Shown as a percentage of Production from PMS'
    };

    public tipExpensesTrend: ITooltipData = {
        title: 'Expenses',
        info: 'Breakdown of expenses (from Accounting Software)'
    };

    public tipProdPerVisit: ITooltipData = {
        title: 'Production Per Visit',
        info: 'Average production per visit'
    };

    public tipDiscounts: ITooltipData = {
        title: 'Discounts',
        info: 'Total discounts provided during date range'
    };

    public tipProdVsCollection: ITooltipData = {
        title: 'Production vs Collection',
        info: 'Total amount invoiced (production) vs received (collections)'
    };

    public tipProdPercentPerClinician: ITooltipData = {
        title: 'Production % Per Clinician',
        info: 'Breakdown of production by clinician'
    };

    // LOST OPPORTUNITY

    public tipLODiscounts: ITooltipData = {
        title: 'Discounts',
        info: 'Total discounts provided in the last 365 days'
    };

    public tipLOProdVsCollection: ITooltipData = {
        title: 'Collection vs Production',
        info: 'The amount of production in the last 365 days that has not been collected'
    };

    public tipLOCaseAcceptance: ITooltipData = {
        title: 'Case Acceptance',
        info: 'The total outstanding value of items on treatment plans created in the last 365 days'
    };

    // MORNING HUDDLE

    public tipMHPostOpTable: ITooltipData = {
        title: 'Post Op Calls',
        info: 'Post Op Calls are populated based on the number of "days before" you configure in the Settings menu. We also show any calls not completed in the two days prior to this.',
        direction: 'right'
    };

    public tipMHRecallTable: ITooltipData = {
        title: 'Overdue Recalls',
        info: 'Overdue recalls are populated based on the number of "weeks before" you configure in the Settings menu. This allows you to follow up on patients who have not attended a followup recall appointment 6-7 months later.',
        direction: 'right'
    };

    public tipMHTickTable: ITooltipData = {
        title: 'Tick Followups',
        info: 'Tick followups are populated based on the number of "days before" you configure in the Settings menu. Any patient who had a treatment recorded with the "TICK" code on this day will be shown here.',
        direction: 'right'
    };

    // CLINIC HEALTH

    public tipHourlyLeaders: ITooltipData = {
        title: 'Hourly Rate Leaders',
        info: 'Top hourly rate performers this month (minimum 5 hours of appointments)'
    };

    public tipReferralLeaders: ITooltipData = {
        title: 'Referral Leaders',
        info: 'Top Referral sources for this month'
    };

    public tipPrebookedVisits: ITooltipData = {
        title: 'Pre-booked Visits',
        info: 'Number of pre-booked appointments in the next 7 days (excludes today)'
    };

    public tipChairUtilRate: ITooltipData = {
        title: 'Chair Utilisation Rate',
        info: 'Percentage of available hours in the next 7 days that have been used (excluding breaks and holidays)'
    };

    public tipUnschedProd: ITooltipData = {
        title: 'Unscheduled Production',
        info: 'The total outstanding value of items on treatment plans for patients attending in the next 7 days (excludes today)'
    };
    //Set default cookie options
    public cookieOpt: any = {
        expires: this.getDate(),
        secure: true,
        sameSite: "Strict"
    };
    //Function to get current date time and add 14 hours to this
    public getDate() {
        var now = new Date();
        now.setTime(now.getTime() + (12 * 60 * 60 * 1000));
        return now;
    }

    // Settings -> follow ups
    public tipPostOPCallsFollowUps: ITooltipData = {
        title: 'Post Op Calls',
        info: 'Post Op Calls should be entered as comma separated item codes (eg. 311,314). By default this followup list will be populated 2 days later - this can be adjusted below.',
        direction: 'right'
    };
    public tipTickFollowUps: ITooltipData = {
        title: 'Tick Followups',
        info: 'Tick Followups are triggered by entering the code TICK in your PMS software. By default the followup list will be populated 7 days later - this can be adjusted below.',
        direction: 'right'
    };
    public tipRecallFollowUps: ITooltipData = {
        title: 'Recall Followups',
        info: 'Recall Followups are triggered automatically by detecting patients who are overdue for their 6 monthly check-up. By default the followup list will be populated with patients who had their last check-up and clean 30 weeks ago (approx 7 months.) - this can be adjusted below.',
        direction: 'right'
    };

    public tipFtaFollowUps: ITooltipData = {
        title: 'FTA Followups',
         info: 'FTA Followups are triggered automatically based on detection of an FTA in your PMS. By default the followup list will be populated the same day as the FTA is recorded, for patients who do not have another appointment booked within the next 28 days - this can be adjusted below.',
        direction: 'right'

    };

    public tipUtaFollowUps: ITooltipData = {
        title: 'UTA Followups',
        info: 'UTA Followups are triggered automatically based on detection of an UTA in your PMS. By default the followup list will be populated the same day as the UTA is recorded, for patients who do not have another appointment booked within the next 28 days - this can be adjusted below.',
        direction: 'right'
    };
    public tipInternalReferralFollowups: ITooltipData = {
        title: 'Internal Referral Followups',
        info: 'Description here',
        direction: 'right'
    };


    // Settings -> Customisations
    public tipXrayOverdue: ITooltipData = {
        title: 'Xray Overdue',
        info: 'If a patient has not had an Xray in the number of months defined, an Xray Overdue notification will be shown in the morning huddle for this patient',
        direction: 'right'
    };
    public tipOPGOverdue: ITooltipData = {
        title: 'OPG Overdue',
        info: 'If a patient has not had an OPG in the number of months defined, an OPG Overdue notification will be shown in the morning huddle for this patient',
        direction: 'right'
    };
    public tipRecallCode: ITooltipData = {
        title: 'Recall Code',
        info: 'To ensure no overdue recall alerts are shown in the morning huddle for patients attending for a recall appointment, ensure your recall codes are set correctly (as per the appointment status code you use for recalls in your PMS). You can define up to 3 codes.',
        direction: 'right'
    };
    public labCode: ITooltipData = {
        title: 'Overdue Labs',
        info: 'Populate these fields with any Status Codes you use to detect that Lab work is required. If any of these codes are detected on an appointment, a "Lab Needed" alert will be displayed in your Morning Huddle.',
        direction: 'right'
    };
    public statusCode: ITooltipData = {
        title: 'Status Codes',
        info: ' Enabling this toggle will show the Status Codes associated with each appointment in your Morning Huddle',
        direction: 'right'
    };
    public statusColours: ITooltipData = {
        title: 'Set Status Colours',
        info: 'Set Status Colours',
         direction: 'right'
    };
    public tipdateRange: ITooltipData = {
        title: 'Date Range',
        info: 'By default, your Health Screen will show data for "Month To Date". If you would prefer to see the Last 30 Days worth of data, change this setting accordingly.',
        direction: 'right'
    };
    public tipNewPatients: ITooltipData = {
        title: 'New Patients',
        info: 'By default, new patients are associated with the provider listed as the main provider of that patient. This setting allows you to calculate new patients based on the provider who performs the first treatment.',
        direction: 'right'
    };
    public tipMaxChartBar: ITooltipData = {
        title: 'Max Chart Bar',
        info: 'This setting controls the maximum number of bars shown on bar charts for certain multi clinic selections.',
        direction: 'right'
    };
    public tipCustomisationsRecallRate: ITooltipData = {
        title: 'Recall Rate',
        info: 'By default, recall prebooking rate is calculated without the need for recall codes being assigned to the future appointment. By changing this to status code, we will count any follow-up appointment that has a recall status code as a valid recall.',
        direction: 'right'
    };

    public tipCustomisationsHourlyRate: ITooltipData = {
        title: 'Hourly Rate',
        info: 'By Default, the Hourly Rate chart on your Clinician Analysis dashboard is calculated by the number of Appointment Hours booked. This can be changed to calculate hourly rate based on the Available Hours in each appointment book. Note: To ensure accuracy, please ensure you have mapped your providers to their appointment book under the Settings -> Clinics -> Dentists section in Jeeve (choose Advanced Options)',
        direction: 'top'
    };

    // Settings -> Charts
    public tipChartsDashboard1Configure: ITooltipData = {
        title: 'Title',
        info: 'Discription comes here',
        direction: 'left'
    };
    public tipChartsDashboard2Configure: ITooltipData = {
        title: 'Title',
        info: 'Discription comes here',
        direction: 'left'
    };

    // Settings -> Dentists
    public tipDentistsPosition: ITooltipData = {
        title: 'Position',
        info: 'Configure whether each provider is a Dentist or OHT',
        direction: 'left'
    };
    public tipDentistsDropdown: ITooltipData = {
        title: 'Show in Dropdown',
        info: 'This setting controls whether the provider is displayed in the dropdown menu on the Clinician dashboards',
        direction: 'left'
    };

    // kpi report ------------------------------------------------------

    public tipProductionKpi : ITooltipData = {
        title: 'Production',
        info: 'Total invoiced amount in the date range',
        direction: 'right'
    }

    public tipCollectionKpi : ITooltipData = {
        title: 'Collection',
        info: 'Total received amount in the date range',
        direction: 'right'
    }

    public tipDentistDaysKpi : ITooltipData = {
        title: 'Dentist Days',
        info: 'Number of days worked. Up to 5 hours is counted as half a day. Anything over 5 hours is a full day',
        direction: 'right'
    }

    public tipDentistProductionPerDayKpi : ITooltipData = {
        title: 'Dentist Production Per Day',
        info: 'Total invoiced amount divided by number of dentist days',
        direction: 'right'
    }

    public tipHoursAvailableKpi : ITooltipData = {
        title: 'Hours Available',
        info: 'Total worktime hours available for scheduling in the appointment book (excludes any non-worktime such as breaks)',
        direction: 'right'
    }

    public tipHoursWorkedKpi : ITooltipData = {
        title: 'Hours Worked',
        info: 'Total worktime hours that have been filled by appointments',
        direction: 'right'
    }

    public tipDentistProductionPerHrKpi : ITooltipData = {
        title: 'Dentist Production Per Hr',
        info: 'Total invoiced amount divided by number of available hours',
        direction: 'right'
    }

    public tipProductionUnitsKpi : ITooltipData = {
        title: 'Production Units',
        info: 'Number of specific production unit items performed, based on specific Prime treatment codes: 415, 416, 417, 418, 555, 556, 613, 615, 643, 661, 671, 672, 684, 688, 691, 825, 831',
        direction: 'right'
    }

    public tipNewPatientsKpi : ITooltipData = {
        title: 'New Patients',
        info: 'A patient is counted successfully as a new patient if they have a valid treatment performed on their first visit (Tx Codes 011 to 987 and 88011 to 88943). New patients are allocated to the provider performing the treatment',
        direction: 'top-right'
    }

    public tipDiscountsKpi : ITooltipData = {
        title: 'Discounts',
        info: 'Total discounts given in the date range',
        direction: 'top-right-discount'
    }
}
