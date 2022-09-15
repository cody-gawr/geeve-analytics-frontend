import { DatePipe, DecimalPipe } from "@angular/common";
import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router, NavigationEnd} from "@angular/router";
import { ChartService } from "../dashboards/chart.service";
import { ClinicianAnalysisService } from "../dashboards/cliniciananalysis/cliniciananalysis.service";
import { FrontDeskService } from "../dashboards/frontdesk/frontdesk.service";
import { Subscription } from 'rxjs/Subscription';
import { CookieService } from "ngx-cookie";
import { MarketingService } from "../dashboards/marketing/marketing.service";

@Component({
    selector: 'graphs',
    templateUrl : './graphs.component.html',
    styleUrls : ['./graphs.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class GraphsComponent{

    @Input() item;

    public gaugeGraphsTotal : number;
    public  gaugeType = "arch";
    public  gaugeValue = '';
    public  gaugeLabel = "";
    public  gaugeThick = "20";
    public foregroundColor = "#4ccfae";
    public backgroundColor = '#f4f0fa';
    public  cap= "round";
    public  size = "250"
    public gaugeAppendText ='%';
    public startDate;
    public endDate;
    public selectedValToggle ='off';
    public maxGaugeGraphGoal : number;
    public duration = "custom";
    public clinic_id;
    public gaugeGraphsGoal : number;
    public chart_heading;
    public hasGaugeChart : boolean;
    public hasBarChart : boolean;

    public user_type;
    public childid;
    constructor(private frontdeskService : FrontDeskService, private datepipe : DatePipe, private chartService: ChartService, private decimalPipe : DecimalPipe, private cliniciananalysisService : ClinicianAnalysisService,private _cookieService: CookieService, private marketingService : MarketingService){
        
    }

    ngAfterViewInit(){
        this.clinic_id = this.item.clinic_id;
        this.startDate = this.datepipe.transform(this.item.agenda_chart_start_date, 'yyyy-MM-dd');
        this.endDate = this.datepipe.transform(this.item.agenda_chart_end_date, 'yyyy-MM-dd');
        
        if(this.item.agenda_chart_id == 16){
            this.chart_heading = "Recall Rate";
            this.fdRecallPrebookRate();   
        }else if(this.item.agenda_chart_id == 17){
            this.chart_heading = "Reappointment Rate";
            this.fdtreatmentPrebookRate();
        }else if(this.item.agenda_chart_id == 1){
            // bar chart for production
        }else if(this.item.agenda_chart_id == 25){
            this.chart_heading = "Total Visits";
            this.fdvisitsRatio();
        }
    }

    private fdRecallPrebookRate() {
        this.frontdeskService.fdRecallPrebookRate(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
            if(data.status == 200){
                this.setDataForGaugeChart(data);
            }
       });
    }

    private fdtreatmentPrebookRate() {
        this.frontdeskService.fdReappointRate(this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
            if(data.status == 200){
                this.setDataForGaugeChart(data);
            }
       });
    }

    private fdvisitsRatio() {
          this.marketingService.fdvisitsRatio(this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
            if(data.status == 200){
                this.setDataForGaugeChart(data);
            }
        });
    }

    private setDataForGaugeChart(data){
        this.hasGaugeChart = true;
        this.gaugeGraphsGoal= data.goals;
        this.gaugeGraphsTotal = 0;
        this.gaugeGraphsTotal = Math.round(data.total);
        if(this.maxGaugeGraphGoal <= 0)
            this.maxGaugeGraphGoal = this.gaugeGraphsTotal;
    }
    
}