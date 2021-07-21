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
        secure  : true
    };
    //Function to get current date time and add 14 hours to this
    public getDate(){
        var now = new Date();
        now.setTime(now.getTime() + (18*60*60*1000));
        return now;
    }
}