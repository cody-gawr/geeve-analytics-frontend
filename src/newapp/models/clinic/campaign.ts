export interface ICampaign {
    id: number;
    clinic_id: number;
    description: string;
    initial_code: string;
    followup_code: string;
    is_default: number;
    enabled: boolean;
}

export interface CampaignData {
    initial_tx_date: string;
    initial_tx_id: string;
    mobile: string;
    patient_id: number;
    patient_name: string;
    position?: number;
  }