import { DatePipe, DecimalPipe } from "@angular/common";
import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router, NavigationEnd} from "@angular/router";
import { ChartService } from "../dashboards/chart.service";
import { ClinicianAnalysisService } from "../dashboards/cliniciananalysis/cliniciananalysis.service";
import { FrontDeskService } from "../dashboards/frontdesk/frontdesk.service";
import { Subscription } from 'rxjs/Subscription';
import { CookieService } from "ngx-cookie";
import { MarketingService } from "../dashboards/marketing/marketing.service";
import { Chart } from 'chart.js';

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
    public noDataText;
    public showStartDate;
    public showEndDate;

    public user_type;
    public childid;
    public hasPercentBarChart: boolean;

    constructor(private frontdeskService : FrontDeskService, private datepipe : DatePipe, private chartService: ChartService, private decimalPipe : DecimalPipe, private cliniciananalysisService : ClinicianAnalysisService,private _cookieService: CookieService, private marketingService : MarketingService, private router : Router){
        
    }

    ngAfterViewInit(){
        this.clinic_id = this.item.clinic_id;
        this.startDate = this.datepipe.transform(this.item.agenda_chart_start_date, 'yyyy-MM-dd');
        this.endDate = this.datepipe.transform(this.item.agenda_chart_end_date, 'yyyy-MM-dd');
        
        this.showStartDate = this.datepipe.transform(this.item.agenda_chart_start_date, 'dd MMM yyyy');
        this.showEndDate = this.datepipe.transform(this.item.agenda_chart_end_date, 'dd MMM yyyy');

        // Recall Rate chart
        if(this.item.agenda_chart_id == 16){
            this.chart_heading = "Recall Rate";
            this.fdRecallPrebookRate();   
            this.noDataText = "You have no recall prebookings in the selected period";
        }
        //Reappointment Rate chart
        else if(this.item.agenda_chart_id == 17){
            this.chart_heading = "Reappointment Rate";
            this.fdtreatmentPrebookRate();
            this.noDataText = "You have no reappointments in the selected period";
        }
        // Total Visits chart
        else if(this.item.agenda_chart_id == 25){
            this.chart_heading = "Total Visits";
            this.fdvisitsRatio();
            this.noDataText = "You have no visits in the selected period";
        }
        // Production chart
        else if(this.item.agenda_chart_id == 1){
            this.chart_heading = "Production";
            this.dentistProduction();
            this.noDataText = "You have no production in the selected period";
        }
        // Hourly Rate chart
        else if(this.item.agenda_chart_id == 7){
            this.chart_heading = "Hourly Rate";
            this.hourlyRateChart();
            this.noDataText = "You have no hourly rates for the selected period";
        }
        // Recall Prebook Rate
        else if(this.item.agenda_chart_id == 4){
          this.hasPercentBarChart = true;
          this.chart_heading = "Recall Prebook Rate";
          this.recallPrebook();
          this.noDataText = "You have no recall prebookings in the selected period";
        }
        // Reappointment Rate
        else if(this.item.agenda_chart_id == 5){
          this.hasPercentBarChart = true;
          this.chart_heading = "Reappointment Rate";
          this.reappointRate();
          this.noDataText = "You have no reappointments in the selected period";
        }
    }

    // -------------- gauge charts -------------------------

    // gauge chart for Recall Rate
    private fdRecallPrebookRate() {
        this.frontdeskService.fdRecallPrebookRate(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
            if(data.status == 200){
                this.calculateDataForGaugeChart(data);
            }
       });
    }

    // gauge chart for Reappointment Rate
    private fdtreatmentPrebookRate() {
        this.frontdeskService.fdReappointRate(this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
            if(data.status == 200){
                this.calculateDataForGaugeChart(data);
            }
       });
    }

    // gauge chart for total visits
    private fdvisitsRatio() {
          this.marketingService.fdvisitsRatio(this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((data) => {
            if(data.status == 200){
                this.calculateDataForGaugeChart(data);
            }
        });
    }

    // calculating data and set the value for gauge chart
    private calculateDataForGaugeChart(data){
        this.hasGaugeChart = true;
        this.gaugeGraphsGoal= data.goals;
        this.gaugeGraphsTotal = 0;
        this.gaugeGraphsTotal = Math.round(data.total);
        if(this.maxGaugeGraphGoal <= 0)
            this.maxGaugeGraphGoal = this.gaugeGraphsTotal;
    }


    // -------------- bar charts -------------------------

    splitName(name: string) {
        const regex = /\w+\s\w+(?=\s)|\w+/g;
        return name.toString().trim().match(regex);
    }

    public barChartOptionsPercent: any = {
      scaleShowVerticalLines: false,
      cornerRadius: 60,
      hover: { mode: null },
      curvature: 1,
      animation: {
        duration: 1500,
        easing: 'easeOutSine'
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          gridLines: { display: true },
          ticks: {
            autoSkip: false,
            userCallback: (label: any) => {
              if(label != '' && label != undefined){
                const names = this.splitName(label);
                 if (names.length == 3) {
                    return `${names[0]}`
                  } else if (names.length == 2){
                    return `${names[0][0]} ${names[1]}`
                  } else {
                    return `${names[0]}`;
                  } 
              }
            }
          }
        }],
        yAxes: [{
          suggestedMin: 0,
          // suggestedMax:100,
          ticks: {
            beginAtZero: true,
            max: 100,
            userCallback: function (label, index, labels) {
              // when the floored value is the same as the value we have a whole number
              if (Math.floor(label) === label) {
                return label + ' %';
              }
  
            },
          },
        }],
      },
      elements: {
        line: {
          fill: false
        }
      },
      tooltips: {
        mode: 'x-axis',
        custom: function (tooltip) {
          if (!tooltip) return;
        },
        callbacks: {
          // use label callback to return the desired label
          label: function (tooltipItem, data) {
            return tooltipItem.xLabel + ": " + tooltipItem.yLabel + "%";
          },
          // remove title
          title: function (tooltipItem, data) {
            return;
          }
        }
      },
      legend: {
        position: 'top',
        onClick: function (e, legendItem) {
          var index = legendItem.datasetIndex;
          var ci = this.chart;
          if (index == 0) {
            ci.getDatasetMeta(1).hidden = true;
            ci.getDatasetMeta(index).hidden = false;
          }
          else if (index == 1) {
            ci.getDatasetMeta(0).hidden = true;
            ci.getDatasetMeta(index).hidden = false;
          }
          ci.update();
        },
      },
    };

    public barChartOptions: any = {
        borderRadius: 50,
        hover: { mode: null },
        scaleShowVerticalLines: false,
        cornerRadius: 60,
        curvature: 1,
        animation: {
          duration: 1500,
          easing: 'easeOutSine'
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            gridLines: {
              display: true
            },
            ticks: {
              autoSkip: false,
              userCallback: (label: string) => {
                if(label != ''){
                  const names = this.splitName(label);
                  if (names.length == 3) {
                    return `${names[0]}`
                  } else if (names.length == 2){
                    return `${names[0][0]} ${names[1]}`
                  } else {
                    return `${names[0]}`;
                  }
                }            
              }
            },
          }],
          yAxes: [{
            ticks: {
              suggestedMin: 0,
              userCallback: (label, index, labels) => {
                // when the floored value is the same as the value we have a whole number
                if (Math.floor(label) === label) {
                  return '$' + this.decimalPipe.transform(label);
                }
    
              },
            },
            gridLines: {
              // color: '#fbfbfc'
            }
          }],
        },
        tooltips: {
          mode: 'x-axis',
          bodyFontFamily: 'Gilroy-Regular',
          cornerRadius: 0,
          callbacks: {
            label: (tooltipItem) => {
              if(tooltipItem.xLabel != ''){
                return tooltipItem.xLabel + ": $" + this.decimalPipe.transform(tooltipItem.yLabel);
              }
            },
            // remove title
            title: function () {
              return;
            }
          }
        },
    };

    public barChartData: any[] = [
        {
            ...this.chartService.baseChartData,
            data: [],
        }
    ];
    
    public barChartData1: any[] = [];
    public barChartLabels1: string[] = [];
    public productionTotal = 0;
    public barChartLabels: string[] = [];
    public barChartLegend = false;   

    private dentistProduction() {
        this.cliniciananalysisService.DentistProduction(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
            this.calculateDataForBarCharts(data);
        });
    }

    private hourlyRateChart() {
        this.cliniciananalysisService.hourlyRateChart(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
            this.calculateDataForBarCharts(data);
        });
    }

    private recallPrebook(){
      this.cliniciananalysisService.RecallPrebook(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
        this.calculateDataForBarCharts(data);
      });
    }

    private reappointRate(){
      this.cliniciananalysisService.caReappointRate(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
        this.calculateDataForBarCharts(data);
      });
    }


    // calculating data and set the value for bar chart
    private calculateDataForBarCharts(data){
        this.barChartData1 = [];
        this.barChartLabels1 = [];
        this.barChartLabels = [];
        this.productionTotal = 0;

        if (data.status == 200) {
          
            this.hasBarChart = true;
            this.barChartData[0]['data'] =[];
    
            if(this.item.agenda_chart_id == 7){
              data.data.sort((a,b) => b.hourly_rate - a.hourly_rate); 
              data.data.forEach(res => {
                this.barChartData1.push(Math.round(res.hourly_rate));
                this.barChartLabels1.push(res.provider_name);
              });
            }else if(this.item.agenda_chart_id == 1){
              data.data.sort((a,b) => b.production - a.production); 
              data.data.forEach(res => {
                this.barChartData1.push(Math.round(res.production));
                this.barChartLabels1.push(res.provider_name);
              });
            }else if(this.item.agenda_chart_id == 4){
              data.data.sort((a,b) => b.recall_percent - a.recall_percent); 
              data.data.forEach(res => {
                this.barChartData1.push(Math.round(res.recall_percent));
                this.barChartLabels1.push(res.provider_name);
              });
            }else if(this.item.agenda_chart_id == 5){
              data.data.sort((a,b) => b.reappoint_rate - a.reappoint_rate); 
              data.data.forEach(res => {
                this.barChartData1.push(Math.round(res.reappoint_rate));
                this.barChartLabels1.push(res.provider_name);
              });
            }
           
            
            this.barChartData[0]['data'] = this.barChartData1;
    
            let dynamicColors = [];
            this.barChartLabels1.forEach((label, labelIndex) => {
                dynamicColors.push(labelIndex % 2 === 0 ? this.chartService.colors.odd : this.chartService.colors.even);
            });

            this.barChartData[0].backgroundColor = dynamicColors;
            this.barChartLabels = this.barChartLabels1;
            this.productionTotal = Math.round(data.total);
        }
        else if (data.status == '401') {
            this._cookieService.put("username", '');
            this._cookieService.put("email", '');
            this._cookieService.put("userid", '');
            this.router.navigateByUrl('/login');
        }
    }
    
}