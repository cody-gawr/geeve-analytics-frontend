  import { DatePipe, DecimalPipe } from "@angular/common";
import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router, NavigationEnd} from "@angular/router";
import { ChartService } from "../dashboards/chart.service";
import { CookieService } from "ngx-cookie";
import { GraphsService } from './graphs.service';
import { ChartOptions } from "chart.js";
import { formatXLabel } from "../util";

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
    public barChartColors;
    public user_type;
    public childid;
    public hasPercentBarChart: boolean;
    public barOptions;
    public hasStackChart : boolean;
    public showPercentage : boolean;
    public showDoller : boolean;
    public showNormal : boolean;
    public hasError :boolean;
    public errorText = "";
    public clinicName = "";

    constructor( private datepipe : DatePipe, private chartService: ChartService, private decimalPipe : DecimalPipe,private _cookieService: CookieService, private router : Router,private graphsService : GraphsService){
        
    }

    ngAfterViewInit(){
        this.clinic_id = this.item.chart_clinic_id;
        this.startDate = this.datepipe.transform(this.item.agenda_chart_start_date, 'yyyy-MM-dd');
        this.endDate = this.datepipe.transform(this.item.agenda_chart_end_date, 'yyyy-MM-dd');
        
        this.showStartDate = this.datepipe.transform(this.item.agenda_chart_start_date, 'dd MMM yyyy');
        this.showEndDate = this.datepipe.transform(this.item.agenda_chart_end_date, 'dd MMM yyyy');
        this.clinicName = this.item.chart_clinic_name;
        switch(this.item.agenda_chart_id){
          case 16:{
            // Recall Rate chart gauge
            this.chart_heading = "Recall Rate";
            this.fdRecallPrebookRate();   
            this.noDataText = "You have no recall prebookings in the selected period";
            break;
          }
          case 17:{
            //Reappointment Rate chart gauge
            this.chart_heading = "Reappointment Rate";
            this.fdtreatmentPrebookRate();
            this.noDataText = "You have no reappointments in the selected period";
            break;
          }
          case 25:{
            // Total Visits chart gauge
            this.showNormal = true;
            this.chart_heading = "Total Visits";
            this.fdvisitsRatio();
            this.noDataText = "You have no visits in the selected period";
            break;
          }
          case 1:{
            // Production chart
            this.chart_heading = "Production";
            this.barOptions = this.barChartOptions;
            this.dentistProduction();
            this.noDataText = "You have no production in the selected period";
            break;
          }
          case 7:{
            // Hourly Rate chart
            this.chart_heading = "Hourly Rate";
            this.barOptions = this.barChartOptions;
            this.hourlyRateChart();
            this.noDataText = "You have no hourly rates for the selected period";
            break;
          }
          case 4:{
            // Recall Prebook Rate
            this.hasPercentBarChart = true;
            this.chart_heading = "Recall Prebook Rate";
            this.barOptions = this.barChartOptionsPercent;
            this.recallPrebook();
            this.noDataText = "You have no recall prebookings in the selected period";
            break;
          }
          case 5:{
            // Reappointment Rate
            this.hasPercentBarChart = true;
            this.chart_heading = "Reappointment Rate";
            this.barOptions = this.barChartOptionsPercent;
            this.reappointRate();
            this.noDataText = "You have no reappointments in the selected period";
            break;
          }
          case 15:{
            // Utilisation Rate
            this.hasPercentBarChart = true;
            this.chart_heading = "Utilisation Rate";
            this.barOptions = this.stackedChartOptionsUti;
            this.fdWorkTimeAnalysis();
            this.noDataText = "You have no appointments in the selected period";
            break;
          }
          case 55:{
            // Followups Per User
            this.hasStackChart = true;
            this.showNormal = true;
            this.chart_heading = "Followups Per User";
            this.getFollowupsPerUser();
            this.noDataText = "No followups were completed in this period";
            break;
          }
        };
    }

    // -------------- gauge charts -------------------------

    // gauge chart for Recall Rate
    private fdRecallPrebookRate() {
        this.graphsService.fdRecallPrebookRate(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((res) => {
            if(res.status == 200){
                this.calculateDataForGaugeChart(res.body.data);
            }
        },error => {
          this.handleUnAuthorization(error);
        });
    }

    // gauge chart for Reappointment Rate
    private fdtreatmentPrebookRate() {
        this.graphsService.fdReappointRate(this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((res) => {
            if(res.status == 200){
                this.calculateDataForGaugeChart(res.body.data);
            }
       }, error=>{
        this.handleUnAuthorization(error);
       });
    }

    // gauge chart for total visits
    private fdvisitsRatio() {
          this.graphsService.fdvisitsRatio(this.clinic_id, this.startDate, this.endDate, this.duration).subscribe((res) => {
            if(res.status == 200){
                this.calculateDataForGaugeChart(res.body.data);
            }
        }, error=>{
          this.handleUnAuthorization(error);
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

    public barChartOptionsPercent: ChartOptions = {
      // scaleShowVerticalLines: false,
      // cornerRadius: 60,
      hover: { mode: null },
      // curvature: 1,
      animation: {
        duration: 1500,
        easing: 'easeOutSine'
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: true },
          ticks: {
            autoSkip: false,
            callback: function (tickValue: string | number, index, ticks) {
              return formatXLabel(this.getLabelForValue(index));
            }
          }
        },
        y: {
          suggestedMin: 0,
          beginAtZero: true,
          max: 100,
          // suggestedMax:100,
          ticks: {
            
            callback: function (label: number, index, labels) {
              // when the floored value is the same as the value we have a whole number
              if (Math.floor(label) === label) {
                return label + ' %';
              }
  
            },
          },
        },
      },
      elements: {
        line: {
          fill: false
        }
      },
      plugins: {
        tooltip: {
          mode: 'x',
          callbacks: {
            // use label callback to return the desired label
            label: function (tooltipItem,) {
              return tooltipItem.label + ": " + tooltipItem.formattedValue + "%";
            },
            // remove title
            title: function (tooltipItem) {
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
      },

    };

    public barChartOptions: ChartOptions = {
        // borderRadius: 50,
        hover: { mode: null },
        // scaleShowVerticalLines: false,
        // cornerRadius: 60,
        // curvature: 1,
        animation: {
          duration: 1500,
          easing: 'easeOutSine'
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: true
            },
            ticks: {
              autoSkip: false,
              callback: function (tickValue: string | number, index, ticks) {
                return formatXLabel(this.getLabelForValue(index));
              }
            },
          },
          y: {
            suggestedMin: 0,
            ticks: {
              callback: (label: number, index, labels) => {
                // when the floored value is the same as the value we have a whole number
                if (Math.floor(label) === label) {
                  return '$' + this.decimalPipe.transform(label);
                }
              },
            },
          },
        },
        plugins: {
          tooltip: {
            mode: 'x',
            bodyFont: {
              family: 'Gilroy-Regular'
            },
            cornerRadius: 0,
            callbacks: {
              label: (tooltipItem) => {
                if(tooltipItem.label != ''){
                  return tooltipItem.label + ": $" + this.decimalPipe.transform(tooltipItem.formattedValue);
                }
              },
              // remove title
              title: function () {
                return '';
              }
            }
          },
        },

    };

    public stackedChartOptionsUti: ChartOptions = {
      // scaleShowVerticalLines: false,
      responsive: true,
      maintainAspectRatio: false,
      // barThickness: 10,
      animation: {
        duration: 1,
        easing: 'linear'
      },
      // fill:false,
      scales: {
        x: { 
          ticks: {
            autoSkip: false,
            callback: function (tickValue:string, index) {
              let value = this.getLabelForValue(index);
              if(value.indexOf('--') >= 0){
                let lbl = value.split('--');
                value = lbl[0];
              }
              
              return value;
            }
          },
          stacked:true,
        },
        y: { 
          // stacked:true,
          min:0,
          max:100,
          ticks: {
            callback: function(label: number, index, labels) {
                // when the floored value is the same as the value we have a whole number
                if (Math.floor(label) === label) {
                    return label+"%";
                }
            },
          },
          },
        },
        plugins: {
          tooltip: {
            mode: 'x',
            displayColors(ctx, options) {
              return !ctx.tooltip;
            },
              callbacks: {
                label: function(tooltipItems) { 
                  let total = parseInt(tooltipItems.label) > 100 ? 100 : tooltipItems.formattedValue;    
                  if(tooltipItems.label.indexOf('--') >= 0){
                    let lbl = tooltipItems.label.split('--');
                    if(typeof lbl[3] === 'undefined'){
                      tooltipItems.label = lbl[0];                    
                    }else{
                      tooltipItems.label = lbl[0]+' - '+lbl[3];
                    }                  
                  }  
                  var Targetlable = '';  
                  const v = tooltipItems.dataset.data[tooltipItems.dataIndex];
                    let Tlable = tooltipItems.dataset.label;
                    if(Tlable !='' && Tlable != undefined){
                      Tlable = Tlable + ": "
                      Targetlable = Tlable
                    }else{
                      Tlable = '';
                    }
                    
                  let ylable =  Array.isArray(v) ? +(v[1] + v[0]) / 2 : v; 
                  var tlab = 0; 
                  if(typeof tooltipItems.chart.data.datasets[1] === 'undefined') {
                    }
                    else {
                      const tval  = tooltipItems.chart.data.datasets[1].data[tooltipItems.dataIndex];
                      if(Array.isArray(tval)){
                        tlab =  Array.isArray(tval) ? +(tval[1] + tval[0]) / 2 : tval;
                        if(tlab == 0){
                          Tlable = '';
                        }
                      }
                    }  
                  if(tlab == 0 && Targetlable =='Target: '){
                  }else{
                  return Tlable + tooltipItems.label+": "+ ylable + '%';
                  }   
                  
                },
                afterLabel: function(tooltipItems) {
                  let hour = 0;
                  let phour = 0;
                  if(tooltipItems.label.indexOf('--') >= 0 && tooltipItems.datasetIndex == 0){
                    let lbl = tooltipItems.label.split('--');                
                    hour = parseInt(lbl[1]);
                    phour = parseInt(lbl[2]);
                    return ['',"Available Hours: "+phour,"Used Hours: "+hour];
                  } 
                  return;
                },
                title: function() {
                  return "";
              }
            }
          },
          legend: {
            display: true
          }
        }
    };  
    public IPcolors = [
      { backgroundColor: '#6cd8ba' },
      { backgroundColor: '#b0fffa' },
      { backgroundColor: '#abb3ff' },
      { backgroundColor: '#feefb8' },
      { backgroundColor: '#ffb4b5' },
      { backgroundColor: '#fffcac' }
    ];

    private legendLabelOptions = {
      labels: {
        usePointStyle: true,
        padding: 20
      },
      onClick: function (e) {
        e.stopPropagation();
      }
    };
    public stackedChartOptions: ChartOptions = {
      hover: { 
        mode: null
      },
      elements: {
        point: {
          radius: 5,
          hoverRadius: 7,
          pointStyle:'rectRounded',
          hoverBorderWidth:7
        },
      },
      // curvature: 1,
      // scaleShowVerticalLines: false,
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 500,
        easing: 'easeOutSine'
      },
      scales: {
        x: { 
            stacked:true,
            ticks: {
                autoSkip: false
            }
        },
        y: { 
          stacked:true, 
            ticks: {
              // callback: function(label: number, index, labels) {
              //     // when the floored value is the same as the value we have a whole number
              //     if (Math.floor(label) === label) {
              //         return label;
              //     }
              // },
            }, 
          },
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          ...this.legendLabelOptions,
        },
        tooltip: {
            mode: 'x',
            displayColors(ctx, options) {
              return !!ctx.tooltip;
            },
            callbacks: {
              label: function(tooltipItems) { 
                if(parseInt(tooltipItems.formattedValue) > 0 && tooltipItems.dataset.label != ''){
                  if(tooltipItems.dataset.label.indexOf('DentistMode-') >= 0){
                    return tooltipItems.label+": "+tooltipItems.formattedValue;
                  } else {
                    return tooltipItems.dataset.label+": "+tooltipItems.formattedValue;          
                  } 
                }
              },
              title : function(tooltip){
                let total = 0;
                tooltip.forEach( (val) => {
                  total = total + parseInt(val.formattedValue);
                });
                if( tooltip[0].dataset.label.indexOf('DentistMode-') >= 0){
                    var dentist = tooltip[0].dataset.label.split('Mode-');
                    return dentist[1]+':'+total;
                } else {
                  return tooltip[0].label+': '+total;
                }
              }
            }
        },
        
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
        this.graphsService.DentistProduction(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
            this.calculateDataForBarCharts(data);
        }, error => {
          this.handleUnAuthorization(error);
      });
    }

    private hourlyRateChart() {
        this.graphsService.hourlyRateChart(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
            this.calculateDataForBarCharts(data);
        }, error => {
          this.handleUnAuthorization(error);
      });
    }

    private recallPrebook(){
      this.graphsService.RecallPrebook(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
        this.calculateDataForBarCharts(data);
      }, error => {
          this.handleUnAuthorization(error)
      });
    }

    private reappointRate(){
      this.graphsService.caReappointRate(this.clinic_id, this.startDate, this.endDate, this.duration, this.user_type, this.childid).subscribe((data: any) => {
        this.calculateDataForBarCharts(data);
      }, error => {
          this.handleUnAuthorization(error);
      });
    }

    private fdWorkTimeAnalysis(){
      this.graphsService.fdWorkTimeAnalysis(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((res) => {
        this.calculateDataForBarCharts(res.body.data);
      }, error => {
        this.handleUnAuthorization(error);
    });
    }

    public perUserData: any[] = [
      {data: [], label: 'Ticks'},
      {data: [], label: 'Post Op' },
      {data: [], label: 'Recall' },
      {data: [], label: 'Ftas' },
      {data: [], label: 'Utas' }
    ];
    public perUserData1 = [];
    public perUserData2 = [];
    public perUserData3 = [];
    public perUserData4 = [];
    public perUserData5 = [];
    public perUserLabels = [];
    private getFollowupsPerUser(){
      this.graphsService.getFollowupsPerUser(this.clinic_id, this.startDate, this.endDate,this.duration).subscribe((res) => {
        
        this.perUserData = [
          {data: [], label: 'Ticks'},
          {data: [], label: 'Post Op' },
          {data: [], label: 'Recall' },
          {data: [], label: 'Ftas' },
          {data: [], label: 'Utas' }
        ];
        
        // let perUserTotal = 0;
        this.productionTotal = 0;
        if(res.status == 200){  
          res.body.data.forEach((response) => {
             this.perUserData1.push(response.num_ticks);
             this.perUserData2.push(response.num_postop);
             this.perUserData3.push(response.num_recall);
             this.perUserData4.push(response.num_ftas);
             this.perUserData5.push(response.num_utas);
             this.perUserLabels.push(response.completed_by);
          });
          this.perUserData[0]['data'] = this.perUserData1;
          this.perUserData[1]['data'] = this.perUserData2;
          this.perUserData[2]['data'] = this.perUserData3;
          this.perUserData[3]['data'] = this.perUserData4;
          this.perUserData[4]['data'] = this.perUserData5;

          this.productionTotal = res.body.total;
          
        }
      }, error => {
          this.handleUnAuthorization(error);
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
              data.body.data.sort((a,b) => b.hourly_rate - a.hourly_rate); 
              data.body.data.forEach(res => {
                this.barChartData1.push(Math.round(res.hourly_rate));
                this.barChartLabels1.push(res.provider_name);
              });
            }else if(this.item.agenda_chart_id == 1){
              data.body.data.sort((a,b) => b.production - a.production); 
              data.body.data.forEach(res => {
                this.barChartData1.push(Math.round(res.production));
                this.barChartLabels1.push(res.provider_name);
              });
            }else if(this.item.agenda_chart_id == 4){
              data.body.data.sort((a,b) => b.recall_percent - a.recall_percent); 
              data.body.data.forEach(res => {
                this.barChartData1.push(Math.round(res.recall_percent));
                this.barChartLabels1.push(res.provider_name);
              });
            }else if(this.item.agenda_chart_id == 5){
              data.body.data.sort((a,b) => b.reappoint_rate - a.reappoint_rate); 
              data.body.data.forEach(res => {
                this.barChartData1.push(Math.round(res.reappoint_rate));
                this.barChartLabels1.push(res.provider_name);
              });
            }
            else if(this.item.agenda_chart_id == 15){
              data.body.data.sort((a,b) => b.util_rate - a.util_rate); 
              data.body.data.forEach(res => {
                this.barChartData1.push(Math.round(res.util_rate * 100));
                this.barChartLabels1.push(res.app_book_name+'--'+res.worked_hour+'--'+res.planned_hour +'--'+res.clinic_name); 
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
    }

    handleUnAuthorization(error) {
      this.hasError = true;
      if(error.status == 401){
        this.errorText = "You do not have permission to clinic "+this.clinicName;
      }else{
        this.errorText = "Something went wrong";
      }
    }
    
}