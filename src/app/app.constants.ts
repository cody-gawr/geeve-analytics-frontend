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
        info: ' '
      };    
  
    public tipHourlyRate: ITooltipData = {
        title: 'Hourly Rate', 
        info: ' '
    };
    
    public tipNumPatients: ITooltipData = {
        title: 'No. New Patients', 
        info: ' '
    };

    public tipTxPlanFeeProposed: ITooltipData = {
        title: 'Treatment Plan Avg Proposed Fees', 
        info: ' '
    };

    public tipPTxPlanFeeCompleted: ITooltipData = {
        title: 'Treatment Plan Avg Completed Fees', 
        info: ' '
    };

    public tipTxPlanFeeCompletion: ITooltipData = {
        title: 'Treatment Plan Completion Rate', 
        info: ' '
    }; 

    public tipRecallRate: ITooltipData = {
        title: 'Recall Prebook Rate', 
        info: ' '
    }; 

    public tipReappointRate: ITooltipData = {
        title: 'Reappointment Rate', 
        info: ' '
    }; 

    public tipNumComplaints: ITooltipData = {
        title: 'No. Patient Complaints', 
        info: ' '
    }; 

    // CLINICIAN PROCEDURES

    public tipProcAnalysisGen: ITooltipData = {
        title: 'Procedure Analysis - General', 
        info: ' '
      };    
  
    public tipProcAnalysisSpec: ITooltipData = {
        title: 'Procedure Analysis - Specialist', 
        info: ' '
    };
    
    public tipRevPerProc: ITooltipData = {
        title: 'Revenue Per Procedure', 
        info: ' '
    };

    public tipPredictorCrown: ITooltipData = {
        title: 'Conversion Predictor - Crown : Large Fill', 
        info: ' '
    };

    public tipPredictorExtract: ITooltipData = {
        title: 'Conversion Predictor - RCT : Extraction', 
        info: ' '
    };

    public tipPredictorRCT: ITooltipData = {
        title: 'Conversion Predictor - RCT Conversion', 
        info: ' '
    };

    public tipReferrals: ITooltipData = {
        title: 'Clinician Referrals', 
        info: ' '
    };

    // FRONT DESK

    public tipUtilRate: ITooltipData = {
        title: 'Utilisation Rate', 
        info: ' '
    };
    
    public tipFDRecallRate: ITooltipData = {
        title: 'Recall Prebook Rate', 
        info: ' '
    };

    public tipFDReappointRate: ITooltipData = {
        title: 'Reappointment Rate', 
        info: ' '
    };

    public tipNumTicks: ITooltipData = {
        title: 'Number of Ticks', 
        info: ' '
    };

    public tipFTARatio: ITooltipData = {
        title: 'FTA Ratio', 
        info: ' '
    };

    public tipUTARatio: ITooltipData = {
        title: 'UTA Ratio', 
        info: ' '
    };  
    
    // MARKETING

    public tipNewPatReferrals: ITooltipData = {
        title: 'New Patients by Referral', 
        info: ' '
    };
    
    public tipNewPatientRevenue: ITooltipData = {
        title: 'New Patient Revenue by Referral', 
        info: ' '
    };

    public tipNumNewPatients: ITooltipData = {
        title: 'No. New Patients', 
        info: ' '
    };

    public tipNewPatCost: ITooltipData = {
        title: 'New Patient Cost', 
        info: ' '
    };

    public tipTotalVisits: ITooltipData = {
        title: 'Total Visits', 
        info: ' '
    };

   // FINANCES

   public tipFinProduction: ITooltipData = {
    title: 'Production', 
    info: ' '
    };

    public tipNetProfit: ITooltipData = {
        title: 'Net Profit', 
        info: ' '
    };

    public tipNetProfitPercent: ITooltipData = {
        title: 'Net Profit %', 
        info: ' '
    };

    public tipExpenses: ITooltipData = {
        title: 'Expenses', 
        info: ' '
    };

    public tipProdPerVisit: ITooltipData = {
        title: 'Production Per Visit', 
        info: ' '
    };

    public tipDiscounts: ITooltipData = {
        title: 'Discounts', 
        info: ' '
    };

    public tipProdVsCollection: ITooltipData = {
        title: 'Production vs Collection', 
        info: ' '
    };

    public tipProdPercentPerClinician: ITooltipData = {
        title: 'Production % Per Clinician', 
        info: ' '
    };

    // LOST OPPORTUNITY

    public tipLODiscounts: ITooltipData = {
        title: 'Discounts', 
        info: ' '
    };

    public tipLOProdVsCollection: ITooltipData = {
        title: 'Production vs Collection', 
        info: ' '
    };

    public tipLOCaseAcceptance: ITooltipData = {
        title: 'Case Acceptance', 
        info: ' '
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
        info: ' '
    };

    public tipReferralLeaders: ITooltipData = {
        title: 'Referral Leaders', 
        info: ' '
    };

    public tipPrebookedVisits: ITooltipData = {
        title: 'Pre-booked Visits', 
        info: ' '
    };

    public tipChairUtilRate: ITooltipData = {
        title: 'Chair Utilisation Rate', 
        info: ' '
    };

    public tipUnschedProd: ITooltipData = {
        title: 'Unscheduled Production', 
        info: ' '
    };

}