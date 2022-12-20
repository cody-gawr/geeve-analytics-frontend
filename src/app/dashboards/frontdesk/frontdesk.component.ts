import * as $ from 'jquery';
import { Component, AfterViewInit, ViewEncapsulation , ViewChild,ElementRef } from '@angular/core';
import { FrontDeskService } from './frontdesk.service';
import { DentistService } from '../../dentist/dentist.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { HeaderService } from '../../layouts/full/header/header.service';
import { CookieService } from "ngx-cookie";
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'chart.js';
import { ChartService } from '../chart.service';
import { ITooltipData } from '../../shared/tooltip/tooltip.directive';
import { AppConstants } from '../../app.constants';
import { environment } from "../../../environments/environment";
import { ChartstipsService } from '../../shared/chartstips.service';
export interface Dentist {
  providerId: string;
  name: string;
}

@Component({
  templateUrl: './frontdesk.component.html',
  styleUrls: ['./frontdesk.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class FrontDeskComponent implements AfterViewInit {
    @ViewChild("myCanvas") canvas: ElementRef;

  lineChartColors;
  doughnutChartColors;
  predictedChartColors;
  preoceedureChartColors;
  subtitle: string;
  public clinic_id:any ={};
  public dentistCount:any ={};
  public clinicsData:any[] = [];
  public trendText;
  public charTips:any = [];
  public showTopVlaues: boolean = false;
  public showUtiTable: boolean = false;
  public utilShow: any = 1;
  public  apiUrl = environment.apiUrl;
  public showGoals: boolean = false;
  public numberOfRecords:number = 50;
  public maxLegendLabelLimit = 10;
  public legendBackgroundColor = [
    '#6edbbb',
    '#b0fffa', 
    '#abb3ff', 
    '#ffb4b5', 
    '#fffcac', 
    '#FFE4E4', 
    '#FFD578', 
    '#54D2FF', 
    '#E58DD7', 
    '#A9AABC', 
    '#F2ECFF', 
    '#5689C9', 
    '#F9F871'
  ];
  public isAllClinic: boolean;

  chartData1 = [{ data: [330, 600, 260, 700], label: 'Account A' }];
  chartLabels1 = ['January', 'February', 'Mars', 'April'];
  constructor(
    private toastr: ToastrService,
    private frontdeskService: FrontDeskService, 
    private dentistService: DentistService, 
    private datePipe: DatePipe, 
    private route: ActivatedRoute,  
    private headerService: HeaderService,
    private _cookieService: CookieService, 
    private router: Router, 
    private chartService: ChartService,
    public constants: AppConstants,
    public chartstipsService: ChartstipsService
    ){
     this.getChartsTips();
     this.getAllClinics();
  }
  private warningMessage: string; 
 private myTemplate: any = "";
 public Apirequest =0;


    initiate_clinic() {
    var val = $('#currentClinic').attr('cid');
      if(val != undefined) {
        if(val == 'all'){
          this.clinic_id = this.clinics;
        }else{
          this.clinic_id = val;
        }

        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          this.isAllClinic = true;
          this.filterDate("m");
        }else{
          this.isAllClinic = false;
          this.filterDate(this.chartService.duration$.value);
        }
        // this.getDentists();
      }
    }

  public clinics = [];
  getAllClinics(){
    this.headerService.getClinic.subscribe(res=>{
      if(res.status == '200'){
        let temp = [];
        res.data.forEach(item=>{
          temp.push(item.id);
        });
        this.clinics = [...temp];
      }
    });
  }

  formatDate(date) {
    if(date) {
      var dateArray = date.split("-");
      const d = new Date();
      d.setFullYear(+dateArray[2], (+dateArray[1]-1), +dateArray[0]);
      const formattedDate = this.datePipe.transform(d, 'dd MMM yyyy');
      return formattedDate;
    } else return date;
  }

  ngAfterViewInit() {
      $('#currentDentist').attr('did','all');
 this.route.params.subscribe(params => {
    this.clinic_id = this.route.snapshot.paramMap.get("id");
     //    this.filterDate('cytd');
        this.getClinics();
     // this.initiate_clinic();
        
      $('#title').html('<span>Front Desk</span>'); 
          $('#sa_datepicker').val(this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate) );

        
        $('.external_clinic').show();
        //$('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
        $('.header_filters').removeClass('hide_header');
        $('#title').html('<span>Front Desk</span> <span class="page-title-date">'+ this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate) +'</span>'); 
        $('.external_clinic').show();
        //$('.external_dentist').show();
        $(document).on('click', function(e) {
        if ($(document.activeElement).attr('id') == 'sa_datepicker') {
           $('.customRange').show();
        }
        else if ($(document.activeElement).attr('id') == 'customRange') {
           $('.customRange').show();
        } 
        else {
            $('.customRange').hide();
        }
        })
     });

 let predictedGradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 400);
predictedGradient.addColorStop(0, 'rgba(12, 209,169,0.8)');
predictedGradient.addColorStop(1, 'rgba(22, 82, 141, 0.9)');
let predictedGradient1 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
predictedGradient1.addColorStop(1, 'rgba(12, 209,169,0.9)');
predictedGradient1.addColorStop(0,  'rgba(22, 82, 141, 0.6)');
let predictedGradient2 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
predictedGradient2.addColorStop(1, 'rgba(59, 227,193,4)');
predictedGradient2.addColorStop(0,  'rgba(22, 82, 141, 9)');
let predictedGradient3 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
predictedGradient3.addColorStop(1, 'rgba(94, 232,205,0.7)');
predictedGradient3.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
let predictedGradient4 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
predictedGradient4.addColorStop(1, 'rgba(148, 240,221,0.8)');
predictedGradient4.addColorStop(0,  'rgba(22, 82, 141, 0.8)');
let predictedGradient5 = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 100);
predictedGradient5.addColorStop(1, 'rgba(201, 247,238,0.8)');
predictedGradient5.addColorStop(0,  'rgba(22, 82, 141, 0.9)');
this.doughnutChartColors = ['#6cd8ba', '#b0fffa', '#abb3ff', '#feefb8', '#91ADEA', '#ffb4b5', '#F2C6C6', '#FDC6C0', '#FEEEE1', '#FFDD99', '#A8DDDD', '#F4F4A0', '#C3DDFF', '#9FDBDB', '#CCFDCC', '#B1F2EC', '#BBEBFA', '#BBEBFA', '#D7ECF3', '#BBE7FF', '#C8CDF0', '#F7C4F5', '#6cd8ba', '#feefb8'];
this.predictedChartColors = [
  {
    backgroundColor: predictedGradient,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F',
    borderColor: 'rgba(25,179,148,0.7)'
  },
   {
    backgroundColor: predictedGradient1,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F',
    borderColor: 'rgba(25,179,148,0.7)'

  },
  {
    backgroundColor: predictedGradient2,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F',
    borderColor: 'rgba(25,179,148,0.7)'

  },
   {
    backgroundColor: predictedGradient3,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F',
    borderColor: 'rgba(25,179,148,0.7)'

  },
  {
    backgroundColor: predictedGradient4,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F',
    borderColor: 'rgba(25,179,148,0.7)'

  },
   {
    backgroundColor: predictedGradient5,
    hoverBorderWidth: 2,
    hoverBorderColor: '#1CA49F'
  }
];

    this.filterDate(this.chartService.duration$.value);
  }

  public legendGenerator = {
    display: true,
      position: "bottom",
      labels: {
        boxWidth : 8,
        usePointStyle: true,
        generateLabels : (chart)=>{
          let bgColor = {};
          let labels = chart.data.labels.map((value,i)=>{
            bgColor[value.split("--")[3]] = chart.data.datasets[0].backgroundColor[i];
            return value.split("--")[3];
          });
          labels = [...new Set(labels)];
          labels = labels.splice(0,this.maxLegendLabelLimit);
          return labels.map((label,index)=>({
            text: label,
            strokeStyle : bgColor[label],
            fillStyle : bgColor[label],
          }));
          
        }
      },
      onClick : (event, legendItem, legend)=>{
        return;
      },
      // align : 'start',
  }

  public barBackgroundColor(data) {
    let dynamicColors = [];
      data.data.forEach(res => {
        if(Array.isArray(this.clinic_id)){
          this.clinic_id.forEach((item,index)=>{
            if(res.clinic_id == item){
              dynamicColors.push(this.legendBackgroundColor[index]);
            }
          })
        }else{
          this.clinic_id.split(",").forEach((item,index)=>{
            if(res.clinic_id == item){
              dynamicColors.push(this.legendBackgroundColor[index]);
            }
          });
        }
      });
    return dynamicColors;
  }
  public date =new Date();
    public stackedChartOptions: any = {
    //   elements: {
    //   point: {
    //     radius: 5,
    //     hoverRadius: 7,
    //     pointStyle:'rectRounded',
    //     hoverBorderWidth:7
    //   },
    // },
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
      animation: {
        duration: 500,
        easing: 'easeOutSine'
      },
      fill:false,
    scales: {
          xAxes: [{ 
            stacked:true,
            ticks: {
                autoSkip: false
            }
            }],
          yAxes: [{ 
            // stacked:true,
            ticks: {
              min:0,
              max:100,
              userCallback: function(label, index, labels) {
                     // when the floored value is the same as the value we have a whole number
                     if (Math.floor(label) === label) {
                         return label+"%";
                     }
                 },
            },
            }],
        },
                tooltips: {
                  mode: 'x-axis',
                        custom: function(tooltip) {
        if (!tooltip) return;
        // disable displaying the color box;
        tooltip.displayColors = false;
      },
  callbacks: {
     label: function(tooltipItems, data) { 
      let total = tooltipItems.yLabel > 100 ? 100 : tooltipItems.yLabel;
      var Targetlable = '';   
      const v = data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
      let Tlable = data.datasets[tooltipItems.datasetIndex].label;
      if(Tlable !=''){
        Tlable = Tlable + ": "
        Targetlable = Tlable
      }
     let ylable =  Array.isArray(v) ? +(v[1] + v[0]) / 2 : v;
     var tlab = 0; 
         if(typeof data.datasets[1] === 'undefined') {
          }
          else {
            const tval  = data.datasets[1].data[tooltipItems.index];
            if(Array.isArray(tval)){
              tlab =  Array.isArray(tval) ? +(tval[1] + tval[0]) / 2 : tval;
              if(tlab == 0){
                Tlable = '';
              }
             }
          } 
     if(tlab == 0 && Targetlable =='Target: '){
      }else{
        return Tlable + tooltipItems.xLabel+": "+ ylable + "%";
      }
        
     },
     title: function() {
       return "";
     }
     
  }
},
  legend: {
            display: true
         }
  };
//   public stackedChartOptionsTC: any = {
//     //   elements: {
//     //   point: {
//     //     radius: 5,
//     //     hoverRadius: 7,
//     //     pointStyle:'rectRounded',
//     //     hoverBorderWidth:7
//     //   },
//     // },
//     scaleShowVerticalLines: false,
//     responsive: true,
//     maintainAspectRatio: false,
//     // barThickness: 10,
//       animation: {
//         duration: 500,
//         easing: 'easeOutSine'
//       },
//       fill:false,
//     scales: {
//           xAxes: [{ 
//             stacked:true,
//             ticks: {
//                 autoSkip: false
//             }
//             }],
//           yAxes: [{ 
//             // stacked:true,
//             ticks: {
//               min:0,
//               max:100,
//               userCallback: function(label, index, labels) {
//                      // when the floored value is the same as the value we have a whole number
//                      if (Math.floor(label) === label) {
//                          return label+"%";
//                      }
//                  },
//             },
//             }],
//         },
//     tooltips: {
//       mode: 'x-axis',
//             custom: function(tooltip) {
//       if (!tooltip) return;
//       // disable displaying the color box;
//       tooltip.displayColors = false;
//     },
//     callbacks: {
//       label: function (tooltipItems, data) {
//         return data.datasets[tooltipItems.datasetIndex].label + ": " + Math.round(tooltipItems.yLabel) + "%";
//       },

//     }
// },
//   legend: {
//             display: true
//          }
//   };

public stackLegendGenerator = {
  display: true,
  position: "bottom",
  labels: {
    boxWidth : 8,
    usePointStyle: true,
    generateLabels : (chart)=>{
      let labels = [];
      let bg_color = {};
      chart.data.datasets.forEach((item)=>{
        item.data.forEach(val=>{
          if(val > 0){
            labels.push(item.label);
            bg_color[item.label] = item.backgroundColor;
          }
        })
      })
      labels = [...new Set(labels)]; 
      labels = labels.splice(0,this.maxLegendLabelLimit);
      return labels.map((item)=>({
        text: item,
        strokeStyle : bg_color[item],
        fillStyle : bg_color[item],
      }));
    }
  },
  onClick : (event, legendItem, legend)=>{
    return;
  }
}

public stackedChartOptionsTC: any = {
  elements: {
    point: {
      radius: 5,
      hoverRadius: 7,
      pointStyle: 'rectRounded',
      hoverBorderWidth: 7
    },
  },
  scaleShowVerticalLines: false,
  responsive: true,
  maintainAspectRatio: false,
  barThickness: 10,
  animation: {
    duration: 500,
    easing: 'easeOutSine'
  },
  scales: {
    xAxes: [{
      stacked: true,
      ticks: {
        autoSkip: false
      }
    }],
    yAxes: [{
      stacked: true,
      ticks: {
        min:0,
        max:100,
        userCallback: function (label, index, labels) {
          // when the floored value is the same as the value we have a whole number
          if (Math.floor(label) === label) {
            let currency = label < 0 ? label.toString().split('-').join('') : label.toString();
            currency = currency.split(/(?=(?:...)*$)/).join(',');
            return label +"%";// `${label < 0 ? '- $' : '$'}${currency}`;
          }
        },
      },
    }],
  }, 
  legend: this.stackLegendGenerator,
  tooltips: {
    mode: 'x-axis',
    enabled: false,
    custom: function (tooltip) {
      if (!tooltip) return;
      var tooltipEl = document.getElementById('chartjs-tooltip');
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.style.backgroundColor = "#FFFFFF";
        tooltipEl.style.borderColor = "#B2BABB";
        tooltipEl.style.borderWidth = "thin";
        tooltipEl.style.borderStyle = "solid";
        tooltipEl.style.zIndex = "999999";
        tooltipEl.style.backgroundColor = "#000000";
        tooltipEl.style.color = "#FFFFFF";
        document.body.appendChild(tooltipEl);
      }
      if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = "0";
        return;
      } else {
        tooltipEl.style.opacity = "0.8";
      }

      tooltipEl.classList.remove('above', 'below', 'no-transform');
      if (tooltip.yAlign) {
        tooltipEl.classList.add(tooltip.yAlign);
      } else {
        tooltipEl.classList.add('no-transform');
      }

      // function getBody(bodyItem) {
      //   return bodyItem.lines;
      // }
      function getBody(bodyItem) {
        let result = [];
        bodyItem.forEach(items=>{
          items.lines.forEach(item=>{
            if(item.split(":")[1].trim() != "$NaN"){
              result.push(items.lines);
            }
          });
        })
        return result;
        // return bodyItem.lines;
      }
      if (tooltip.body) {
        var titleLines = tooltip.title || [];
        // var bodyLines = tooltip.body.map(getBody);
        var bodyLines = getBody(tooltip.body);
        var labelColorscustom = tooltip.labelColors;
        var innerHtml = '<table><thead>';
        innerHtml += '</thead><tbody>';

        let total: any = 0;
        let count:any = 0;
        bodyLines.forEach(function (body, i) {
          // if (!body[0].includes("$0")) {
            var singleval = body[0].split(':');
            if (singleval[1].includes("-")) {
              var temp = singleval[1].split('$');
              var amount = temp[1].replace(/,/g, '');
              total -= parseFloat(amount);
            } else {
              var temp = singleval[1].split('$');
              var amount = temp[1].replace(/,/g, '');
              total += parseFloat(amount);
            }

          // }
          count ++;
        })
        // total = Math.round(total);
        // if (total != 0) {
        //   var num_parts = total.toString().split(".");
        //   num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //   total = num_parts.join(".");
        //   total = total / count;
        //   total = Math.round(total);
        // }
        total = Math.round(((total) + Number.EPSILON) * 100) / 100;
        titleLines.forEach(function (title) {
          innerHtml += '<tr><th colspan="2" style="text-align: left;">' + title + ': ' + total + '% </th></tr>';

        });
        innerHtml += '</tbody></table>';
        tooltipEl.innerHTML = innerHtml;
        //tableRoot.innerHTML = innerHtml;
      }
      // disable displaying the color box;
      var position = this._chart.canvas.getBoundingClientRect();
      // Display, position, and set styles for font
      tooltipEl.style.position = 'fixed';
      tooltipEl.style.left = ((position.left + window.pageXOffset + tooltip.caretX) - 20) + 'px';
      tooltipEl.style.top = ((position.top + window.pageYOffset + tooltip.caretY) - 70) + 'px';
      tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
      tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
      tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
      tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
      tooltipEl.style.pointerEvents = 'none';
      tooltip.displayColors = false;
    },
    callbacks: {
      label: function (tooltipItems, data) {
        let currency = tooltipItems.yLabel.toString();
        currency = currency.split(".");
        currency[0] = currency[0].split('-').join('').split(/(?=(?:...)*$)/).join(',');
        currency = currency.join(".");
        return data.datasets[tooltipItems.datasetIndex].label + `: ${tooltipItems.yLabel < 0 ? '- $' : '$'}${currency}`;;
      },

    }
  }
};
public stackedChartOptionsTic: any = {
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle: 'rectRounded',
        hoverBorderWidth: 7
      },
    },
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    barThickness: 10,
    animation: {
      duration: 500,
      easing: 'easeOutSine'
    },
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          autoSkip: false
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          userCallback: function (label, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              let currency = label < 0 ? label.toString().split('-').join('') : label.toString();
              currency = currency.split(/(?=(?:...)*$)/).join(',');
              return label;// `${label < 0 ? '- $' : '$'}${currency}`;
            }
          },
        },
      }],
    }, 
    legend: this.stackLegendGenerator,
    tooltips: {
      mode: 'x-axis',
      enabled: false,
      custom: function (tooltip) {
        if (!tooltip) return;
        var tooltipEl = document.getElementById('chartjs-tooltip');
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.style.backgroundColor = "#FFFFFF";
          tooltipEl.style.borderColor = "#B2BABB";
          tooltipEl.style.borderWidth = "thin";
          tooltipEl.style.borderStyle = "solid";
          tooltipEl.style.zIndex = "999999";
          tooltipEl.style.backgroundColor = "#000000";
          tooltipEl.style.color = "#FFFFFF";
          document.body.appendChild(tooltipEl);
        }
        if (tooltip.opacity === 0) {
          tooltipEl.style.opacity = "0";
          return;
        } else {
          tooltipEl.style.opacity = "0.8";
        }

        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltip.yAlign) {
          tooltipEl.classList.add(tooltip.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
          let result = [];
          bodyItem.forEach(items=>{
            items.lines.forEach(item=>{
              if(item.split(":")[1].trim() != "$NaN"){
                result.push(items.lines);
              }
            });
          })
          return result;
          // return bodyItem.lines;
        }
        if (tooltip.body) {
          var titleLines = tooltip.title || [];
          var bodyLines = getBody(tooltip.body);
          // var bodyLines = tooltip.body.map(getBody);
          var labelColorscustom = tooltip.labelColors;
          var innerHtml = '<table><thead>';
          innerHtml += '</thead><tbody>';

          let total: any = 0;
          bodyLines.forEach(function (body, i) {
            if (!body[0].includes("$0")) {
              var singleval = body[0].split(':');
              if (singleval[1].includes("-")) {
                var temp = singleval[1].split('$');
                var amount = temp[1].replace(/,/g, '');
                total -= parseFloat(amount);
              } else {
                var temp = singleval[1].split('$');
                var amount = temp[1].replace(/,/g, '');
                total += parseFloat(amount);
              }

            }
          });
          total = Math.round(total);
          if (total != 0) {
            var num_parts = total.toString().split(".");
            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            total = num_parts.join(".");
          }
          titleLines.forEach(function (title) {
            innerHtml += '<tr><th colspan="2" style="text-align: left;">' + title + ': ' + total + '</th></tr>';

          });
          bodyLines.forEach(function (body, i) {
            if (!body[0].includes("$0")) {
              var body_custom = body[0];
              body_custom = body_custom.split(":");
              if (body_custom[1].includes("-")) {
                var temp_ = body_custom[1].split('$');
                temp_[1] = Math.round(temp_[1].replace(/,/g, ''));
                temp_[1] = temp_[1].toString();
                temp_[1] = temp_[1].split(/(?=(?:...)*$)/).join(',');
                body_custom[1] = temp_.join("");
              } else {
                var temp_ = body_custom[1].split('$');
                temp_[1] = Math.round(temp_[1].replace(/,/g, ''));
                temp_[1] = temp_[1].toString();
                temp_[1] = temp_[1].split(/(?=(?:...)*$)/).join(',');
                body_custom[1] = temp_.join("");
              }

              body[0] = body_custom.join(":");
              innerHtml += '<tr><td class="td-custom-tooltip-color"><span class="custom-tooltip-color" style="background:' + labelColorscustom[i].backgroundColor + '"></span></td><td style="padding: 0px">' + body[0] + '</td></tr>';
            }
          });
          innerHtml += '</tbody></table>';
          tooltipEl.innerHTML = innerHtml;
          //tableRoot.innerHTML = innerHtml;
        }
        // disable displaying the color box;
        var position = this._chart.canvas.getBoundingClientRect();
        // Display, position, and set styles for font
        tooltipEl.style.position = 'fixed';
        tooltipEl.style.left = ((position.left + window.pageXOffset + tooltip.caretX) - 20) + 'px';
        tooltipEl.style.top = ((position.top + window.pageYOffset + tooltip.caretY) - 70) + 'px';
        tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
        tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
        tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
        tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
        tooltipEl.style.pointerEvents = 'none';
        tooltip.displayColors = false;
      },
      callbacks: {
        label: function (tooltipItems, data) {
          let currency = tooltipItems.yLabel.toString();
          currency = currency.split(".");
          currency[0] = currency[0].split('-').join('').split(/(?=(?:...)*$)/).join(',');
          currency = currency.join(".");
          return data.datasets[tooltipItems.datasetIndex].label + `: ${tooltipItems.yLabel < 0 ? '- $' : '$'}${currency}`;;
        },

      }
    }
  };

  public stackedChartOptionsT: any = {

    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
      animation: {
        duration: 1,
        easing: 'linear'
      },
      fill:false,
    scales: {
      xAxes: [{ 
        ticks: {
          autoSkip: false,
          callback: function (value, index, values) {
            if(value.indexOf('--') >= 0){
              let lbl = value.split('--');
              value = lbl[0];
            }
            return value;
          }
        },
        stacked:true,
      }],
          yAxes: [{ 
            // stacked:true,
            ticks: {
              min:0,
             // max:100,
              userCallback: function(label, index, labels) {
                     // when the floored value is the same as the value we have a whole number
                     if (Math.floor(label) === label) {
                         return label;
                     }
                 },
            },
            }],
        },
        tooltips: {
          mode: 'x-axis',
          custom: function(tooltip) {
            if (!tooltip) return;
              tooltip.displayColors = false;
            },
            callbacks: {
              label: function(tooltipItems, data) { 
                let total = tooltipItems.yLabel > 100 ? 100 : tooltipItems.yLabel;    
                if(tooltipItems.xLabel.indexOf('--') >= 0){
                  let lbl = tooltipItems.xLabel.split('--');
                  if(typeof lbl[3] === 'undefined'){
                    tooltipItems.xLabel = lbl[0];                    
                  }else{
                    tooltipItems.xLabel = lbl[0]+' - '+lbl[3];
                  }                  
                } 
                var Targetlable = '';   
                const v = data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
                  let Tlable = data.datasets[tooltipItems.datasetIndex].label;
                  if(Tlable !=''){
                    Tlable = Tlable + ": "
                    Targetlable = Tlable
                  }
                let ylable =  Array.isArray(v) ? +(v[1] + v[0]) / 2 : v;  
                var tlab = 0; 
                if(typeof data.datasets[1] === 'undefined') {
                  }
                  else {
                    const tval  = data.datasets[1].data[tooltipItems.index];
                    if(Array.isArray(tval)){
                      tlab =  Array.isArray(tval) ? +(tval[1] + tval[0]) / 2 : tval;
                      if(tlab == 0){
                        Tlable = '';
                      }
                    }
                  } 
                if(tlab == 0 && Targetlable =='Target: '){
               }else{
                return Tlable + tooltipItems.xLabel+": "+ ylable;
               }   
                
              },
              afterLabel: function(tooltipItems, data) {
                let hour = 0;
                let phour = 0;
                if(tooltipItems.label.indexOf('--') >= 0 && tooltipItems.datasetIndex == 0){
                  let lbl = tooltipItems.label.split('--');                
                  hour = lbl[1];
                  phour = lbl[2];
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
      };
  public stackedChartOptionsUti: any = {
    hover: { mode: null },
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
      animation: {
        duration: 1,
        easing: 'linear'
      },
      fill:false,
    scales: {
      xAxes: [{ 
        ticks: {
          autoSkip: false,
          callback: function (value, index, values) {
            if(value.indexOf('--') >= 0){
              let lbl = value.split('--');
              value = lbl[0];
            }
            return value;
          }
        },
        stacked:true,
      }],
          yAxes: [{ 
            // stacked:true,
            ticks: {
              min:0,
              max:100,
              userCallback: function(label, index, labels) {
                     // when the floored value is the same as the value we have a whole number
                     if (Math.floor(label) === label) {
                         return label+"%";
                     }
                 },
            },
            }],
        },
        tooltips: {
          mode: 'x-axis',
          custom: function(tooltip) {
            if (!tooltip) return;
              tooltip.displayColors = false;
            },
            callbacks: {
              label: function(tooltipItems, data) { 
                let total = tooltipItems.yLabel > 100 ? 100 : tooltipItems.yLabel;    
                if(tooltipItems.xLabel.indexOf('--') >= 0){
                  let lbl = tooltipItems.xLabel.split('--');
                  if(typeof lbl[3] === 'undefined'){
                    tooltipItems.xLabel = lbl[0];                    
                  }else{
                    tooltipItems.xLabel = lbl[0]+' - '+lbl[3];
                  }                  
                }  
                var Targetlable = '';  
                const v = data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
                  let Tlable = data.datasets[tooltipItems.datasetIndex].label;
                  if(Tlable !=''){
                    Tlable = Tlable + ": "
                    Targetlable = Tlable
                  }
                let ylable =  Array.isArray(v) ? +(v[1] + v[0]) / 2 : v; 
                var tlab = 0; 
                if(typeof data.datasets[1] === 'undefined') {
                  }
                  else {
                    const tval  = data.datasets[1].data[tooltipItems.index];
                    if(Array.isArray(tval)){
                      tlab =  Array.isArray(tval) ? +(tval[1] + tval[0]) / 2 : tval;
                      if(tlab == 0){
                        Tlable = '';
                      }
                    }
                  }  
                if(tlab == 0 && Targetlable =='Target: '){
               }else{
                return Tlable + tooltipItems.xLabel+": "+ ylable + '%';
               }   
                
              },
              afterLabel: function(tooltipItems, data) {
                let hour = 0;
                let phour = 0;
                if(tooltipItems.label.indexOf('--') >= 0 && tooltipItems.datasetIndex == 0){
                  let lbl = tooltipItems.label.split('--');                
                  hour = lbl[1];
                  phour = lbl[2];
                  return ['',"Available Hours: "+Math.round(phour * 100)/100,"Used Hours: "+Math.round(hour * 100)/100];
                } 
                return;
              },
              title: function() {
                return "";
            }
          }
        },
        legend: this.legendGenerator
      };
public stackedChartOptionsUti1: any = {
    hover: {mode:null},
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // barThickness: 10,
      animation: {
       duration: 1,
      easing: 'linear',
      onComplete: function () 
      {
        var chartInstance = this.chart,
        ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.textBaseline = 'bottom';
        // Loop through each data in the datasets
        this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
              // var data = "$"+dataset.data[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              let num = dataset.data[index];
              // let dataK = Math.abs(num) > 999 ? Math.sign(num)*(Math.round(Math.abs(num)/100)/10) + 'k' : Math.sign(num)*Math.abs(num);
              let dataK = shortenLargeNumber(num, 1);
              let dataDisplay = `${dataK}%`;
              ctx.font = Chart.helpers.fontString(11, 'normal','Gilroy-Bold');
              ctx.fillText(dataDisplay, bar._model.x, bar._model.y + 2);

              function shortenLargeNumber(num, digits) {
                var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
                    decimal;
            
                for(var i=units.length-1; i>=0; i--) {
                    decimal = Math.pow(1000, i+1);
            
                    if(num <= -decimal || num >= decimal) {
                        return +(num / decimal).toFixed(digits) + units[i];
                    }
                }
            
                return num;
            }
          });
        });
      }
      },
      fill:false,
    scales: {
      xAxes: [{ 
        ticks: {
          autoSkip: false,
          callback: function (value, index, values) {
            if(value.indexOf('--') >= 0){
              let lbl = value.split('--');
              value = lbl[0];
            }
            return value;
          }
        }
      }],
          yAxes: [{ 
            // stacked:true,
            ticks: {
              min:0,
              max:100,
              userCallback: function(label, index, labels) {
                     // when the floored value is the same as the value we have a whole number
                     if (Math.floor(label) === label) {
                         return label+"%";
                     }
                 },
            },
            }],
        },
        tooltips: {
          enabled : false
        },
        legend: this.legendGenerator
      };

public stackedChartOptionsUtiDP = this.stackedChartOptionsUti;
public stackedChartOptionsticks: any = {
      elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        pointStyle:'rectRounded',
        hoverBorderWidth:7
      },
    },
    scaleShowVerticalLines: false,
           responsive: true,
    maintainAspectRatio: false,
    barThickness: 10,
      animation: {
        duration: 500,
        easing: 'easeOutSine'
      },
      fill:false,
    scales: {
          xAxes: [{ 
            stacked:true,
            ticks: {
                autoSkip: false
            }
            }],
          yAxes: [{ 
            stacked:true,
            ticks: {
              userCallback: function(label, index, labels) {
                     // when the floored value is the same as the value we have a whole number
                     if (Math.floor(label) === label) {
                         return label;
                     }
                 },
            },
            }],
        },
                tooltips: {
                      custom: function(tooltip) {
        if (!tooltip) return;
        // disable displaying the color box;
        tooltip.displayColors = false;
      },
  callbacks: {
    label: function(tooltipItems, data) { 
      return tooltipItems.xLabel+": "+tooltipItems.yLabel+ "%";
   },
   title: function() {
     return "";
   }
     
  }
},
  legend: {
            display: true
         }
};

public numOfTicksChartOptionsticks: any = {
  elements: {
  point: {
    radius: 5,
    hoverRadius: 7,
    pointStyle:'rectRounded',
    hoverBorderWidth:7
  },
},
scaleShowVerticalLines: false,
       responsive: true,
maintainAspectRatio: false,
barThickness: 10,
  animation: {
    duration: 500,
    easing: 'easeOutSine'
  },
  fill:false,
scales: {
      xAxes: [{ 
        stacked:true,
        ticks: {
            autoSkip: false
        }
        }],
      yAxes: [{ 
        stacked:true,
        ticks: {
          userCallback: function(label, index, labels) {
                 // when the floored value is the same as the value we have a whole number
                 if (Math.floor(label) === label) {
                     return label;
                 }
             },
        },
        }],
    },
            tooltips: {
                  custom: function(tooltip) {
    if (!tooltip) return;
    // disable displaying the color box;
    tooltip.displayColors = false;
  },
callbacks: {
label: function(tooltipItems, data) { 
  return tooltipItems.xLabel+": "+ tooltipItems.yLabel;
},
title: function() {
 return "";
}
 
}
},
legend: {
        display: true
     }
};

  public stackedChartColors: Array<any> = [
    { backgroundColor: '#76F2E5' },
    { backgroundColor: '#6BE6EF' },
    { backgroundColor: '#68D8D6' },
    { backgroundColor: '#3DCCC7' },
    { backgroundColor: '#68FFF9' },
    { backgroundColor: '#07BEB8' }
  ];
  public stackedChartType = 'bar';
  public lineChartType = 'line';

  public stackedChartLegend = true;

  //labels
  public stackedChartLabels: string[] = [];  
  public stackedChartLabels1: string[] = [];

  //data
  public stackedChartData: any[] = [
    {data: [], label: 'Crowns'},
    {data: [], label: 'Splints ' },
    {data: [], label: 'Root Canals' },
    {data: [], label: 'Perio Charts' },
    {data: [], label: 'Surgical Extractions' }  ];

  public stackedChartData1: any[] = [];
  public stackedChartData2: any[] = [];
  public stackedChartData3: any[] = [];
  public stackedChartData4: any[] = [];
  public stackedChartData5: any[] = [];
public selectedDentist;
public dentists;
public duration='';
public utilityratemessage: boolean = false;
  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
   // console.log(e);
  }
  public  gaugeType = "arch";
  public  gaugeValue = '';
  public  gaugeLabel = "";
  public  gaugeThick = "20";
  public foregroundColor = "#4ccfae";
  public backgroundColor = '#f4f0fa';
  public  cap= "round";
  public  size = "250"
  public gaugeAppendText ='%';
  public startDate ='';
  public endDate = '';
  public DateDiffernce = '';
  public selectedValToggle ='off';
    myDateParser(dateStr : string) : string {
    // 2018-01-01T12:12:12.123456; - converting valid date format like this

    let date = dateStr.substring(0, 10);
    let time = dateStr.substring(11, 19);
    let millisecond = dateStr.substring(20)

    let validDate = date;
    return validDate
  }
 loadDentist(newValue) {
   $('#title').html('<span>Front Desk</span>'); 
       $('#sa_datepicker').val(this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate) );
    if(newValue == 'all' && this.clinic_id ) {
      if(this.utilShow == 1){
        this.fdWorkTimeAnalysis();
      }else if(this.utilShow == 2){
        this.fdWorkTimeByDay(); 
      }  
      this.fdRecallPrebookRate();
      this.fdtreatmentPrebookRate();
      this.fdNumberOfTicks();
      this.fdFtaRatio();
      this.fdUtaRatio();
    }
  }

  public workTimeData = [
    {
      data: [], 
      label: '',
      backgroundColor: [
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
      ],
      hoverBackgroundColor: [
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
      ]
    }
  ];
  public workTimeLabels = [];
  
  public workTimeLabels1 = [];
  public workTimeData1 = [];
  public workTimeTotal;
  public prevWorkTimeTotal;
  public workTimeGoal;
  public prevWorkTimeTooltip ='down';
  public goalchecked='off';
    public stackedChartOptionssWT:any =this.stackedChartOptions;
public fdWorkTimeAnalysisLoader:boolean;
public showMultiClinicUR:boolean = false;
public fdUtiData:any = [];

  //Items Predictor Analysis 
  private fdWorkTimeAnalysis() {
    var user_id;
    var clinic_id;
    this.fdWorkTimeAnalysisLoader = true;
    this.workTimeLabels= [];
    this.showMultiClinicUR = false;
    if(this.DateDiffernce > '365'){
      this.utilityratemessage = true;
      this.fdWorkTimeAnalysisLoader = false;
    }else{
      this.utilityratemessage = false;
  this.clinic_id && this.frontdeskService.fdWorkTimeAnalysis(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
      this.fdUtiData = [];
    if(data.message == 'success'){
      this.fdWorkTimeAnalysisLoader = false;
      this.workTimeData1 =[];
      this.workTimeLabels1 =[];
      this.prevWorkTimeTooltip = 'down';
     if(data.data.length >0) {
      data.data.forEach(res => {
        var temp =  {
          'name':  res.app_book_name, 
          'scheduled_hours':  Math.round(res.planned_hour * 100)/100, 
          'clinican_hours':  Math.round(res.worked_hour * 100)/100, 
          'util_rate':  Math.round(res.util_rate * 100), 
          };
          this.fdUtiData.push(temp);
       });
       if (data.data.length > this.numberOfRecords) data.data = data.data.slice(0, this.numberOfRecords);
        data.data.forEach(res => {            
            this.workTimeData1.push(Math.round(res.util_rate * 100));
            if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
              this.isAllClinic = true;
              this.showMultiClinicUR = true;
            }else{
              this.isAllClinic = false;
            }
            this.workTimeLabels1.push(res.app_book_name+'--'+res.worked_hour+'--'+res.planned_hour +'--'+res.clinic_name); 
          
        });
     }
        this.workTimeData[0]['data'] = this.workTimeData1;
        if(this.isAllClinic)
          this.workTimeData[0].backgroundColor = this.barBackgroundColor(data);
         this.workTimeLabels= this.workTimeLabels1;
         this.workTimeTotal = Math.round(data.total);
         this.prevWorkTimeTotal =  Math.round(data.total_ta);
         this.workTimeGoal = data.goals;
         if(this.workTimeTotal>=this.prevWorkTimeTotal)
            this.prevWorkTimeTooltip = 'up';
      this.stackedChartOptionssWT.annotation =[];
          if(this.goalchecked == 'average') {
           this.stackedChartOptionssWT.annotation = {annotations: [{
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.workTimeTotal,
              borderColor: '#0e3459',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
          },
         ]
        }
       }
       else if(this.goalchecked == 'goal') {
           this.stackedChartOptionssWT.annotation = {annotations: [{
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.workTimeGoal,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
          },
         ]
        }
       }

          
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    }
    );
  }
  }



  public byDayData: any =  [
    {
      data: [], 
      label: '',
      backgroundColor: [
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
      ],
      hoverBackgroundColor: [
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
      ]
    }
  ];


  public byDayDataTemp: any =  [];
  public byDayLabels: any =  [];
  public byDayLabelsTemp: any =  [];
  public byDayDataTable: any =  [];
  public byDayLoader: boolean;
  public byTotal: any=  0;
  public prevByDayTotal: any=  0;
  // Function for utilisation by day
  public  fdWorkTimeByDay() {
    this.byDayLoader = true;   
    this.frontdeskService.fdWorkTimeAnalysisByDay(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
        this.byDayLoader = false;
        this.byDayDataTemp = [];
        this.byDayLabelsTemp = [];
        this.byDayDataTable = [];
        this.byTotal=  0;
          this.prevByDayTotal=  0;
        if(data.message == 'success'){
          if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
            this.isAllClinic = true;
            data.data.forEach(res => { 
              res.val.forEach((reslt, key) => { 
                var temp =  {
                  'day':  res.duration, 
                  'scheduled_hours':  reslt.planned_hour, 
                  'clinican_hours':  reslt.worked_hour, 
                  'util_rate':  Math.round(reslt.util_rate * 100 / data.cCount), 
                  };
                  this.byDayDataTable.push(temp);
                  this.byDayDataTemp.push(Math.round(reslt.util_rate * 100 / data.cCount ));
                  this.byDayLabelsTemp.push(res.duration+'--'+reslt.worked_hour+'--'+reslt.planned_hour);
              });
            });
            this.byDayData[0]['data'] = this.byDayDataTemp;
            this.byDayLabels = this.byDayLabelsTemp;
          }else{
            data.data.forEach(res => {
              this.isAllClinic = false;
              // if(res.worked_hour > 0) {
                var temp =  {
                'day':  res.day, 
                'scheduled_hours':  res.planned_hour, 
                'clinican_hours':  res.worked_hour, 
                'util_rate':  Math.round(res.util_rate * 100), 
                };
                this.byDayDataTable.push(temp);
                this.byDayDataTemp.push(Math.round(res.util_rate * 100));
                this.byDayLabelsTemp.push(res.day+'--'+res.worked_hour+'--'+res.planned_hour); 
              // }
            });
            this.byDayData[0]['data'] = this.byDayDataTemp;
            this.byDayLabels = this.byDayLabelsTemp;
          } 
          this.byTotal=  Math.round(data.total);
          this.prevByDayTotal=  Math.round(data.total_ta);                
        }
      }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }

  public showmulticlinicFta:boolean = false;
  public ftaLabels:any=[];
  public ftaLabels1:any=[];				  
  public ftaMulti: any[] = [
    { data: [], 
      label: '',
      backgroundColor: [
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
      ],
      hoverBackgroundColor: [
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
      ]
    }
  ];				    
public ftaTotal;
public ftaPrevTotal;
public ftaTooltip='up';
public ftaGoal;
public maxftaGoal:any=0;

public fdFtaRatioLoader:boolean;

//Predictor Ratio :
  private fdFtaRatio() {
     if(this.duration){
      this.fdFtaRatioLoader = true;
    this.ftaTotal = 0;

       var user_id;
       var clinic_id;
  this.showmulticlinicFta = false;
  this.clinic_id && this.frontdeskService.fdFtaRatio(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
    this.ftaTotal = 0;
          this.ftaPrevTotal = 0;
       if(data.message == 'success'){
        this.fdFtaRatioLoader = false;
        this.ftaMulti[0]['data'] = [];        
        this.ftaLabels=[];
        this.ftaLabels1=[];	
        if (data.total > 0) {
          data.data.forEach(res => { 
            this.ftaLabels1.push(Math.round(res.fta_ratio));
            this.ftaLabels.push(res.clinic_name);
          });
        }
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          this.showmulticlinicFta = true;
        }
        this.ftaMulti[0]['data'] = this.ftaLabels1;

          if(data.total>100)
            data.total =100;
          if(data.total_ta>100)
            data.total_ta =100;
          this.ftaTotal = Math.round(data.total * 10) / 10;
          this.ftaPrevTotal = Math.round(data.total_ta * 10) / 10;
          this.ftaGoal = data.goals;
          if(this.ftaTotal> this.ftaGoal)
            this.maxftaGoal = this.ftaTotal;
          else
            this.maxftaGoal = this.ftaGoal;
          if(this.maxftaGoal ==0)
            this.maxftaGoal ='';
          if(this.ftaTotal>=this.ftaPrevTotal)
            this.ftaTooltip = 'down';
        }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    }
  }

  public showmulticlinicUta:boolean = false;
  public utaLabels:any=[];
  public utaLabels1:any=[];				  
  public utaMulti: any[] = [
    { data: [], 
      label: '',
      backgroundColor: [
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
      ],
      hoverBackgroundColor: [
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
      ]
    }
  ];
public utaTotal;
public utaPrevTotal;
public utaTooltip='up';
public utaGoal;
public fdUtaRatioLoader:boolean;
public maxutaGoal:any=0;
//Predictor Ratio :
  private fdUtaRatio() {
     if(this.duration){
      this.fdUtaRatioLoader = true;
     this.utaTotal = 0;

       var user_id;
       var clinic_id;
       this.showmulticlinicUta = false;
  this.clinic_id && this.frontdeskService.fdUtaRatio(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
     this.utaTotal = 0;
          this.utaPrevTotal = 0;
       if(data.message == 'success'){
        this.fdUtaRatioLoader = false;
        this.utaMulti[0]['data'] = [];        
        this.utaLabels=[];
        this.utaLabels1=[];	
        if (data.total > 0) {
          data.data.forEach(res => { 
            this.utaLabels1.push(Math.round(res.uta_ratio));
            this.utaLabels.push(res.clinic_name);
          });
        }
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          this.showmulticlinicUta = true;
        }
        this.utaMulti[0]['data'] = this.utaLabels1;

          if(data.total>100)
            data.total =100;
          if(data.total_ta>100)
            data.data_ta =100;
          this.utaTotal = Math.round(data.total * 10) / 10;
          this.utaPrevTotal = Math.round(data.total_ta * 10) / 10;
          this.utaGoal = data.goals;
 if(this.utaTotal> this.utaGoal)
            this.maxutaGoal = this.utaTotal;
          else
            this.maxutaGoal = this.utaGoal;
          if(this.maxutaGoal ==0)
            this.maxutaGoal ='';
          if(this.utaTotal>=this.utaPrevTotal)
            this.utaTooltip = 'down';
        }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    }
  }

  public ticksMulti: any[] = [
    { data: [], 
      label: '',
      backgroundColor: [
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
      ],
      hoverBackgroundColor: [
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
        '#119582',
        '#ffb4b5',
      ]
    }
  ];
  public showmulticlinicticks:boolean = false;
  public ticksLabels:any=[];
  public ticksLabels1:any=[];		
public ticksTotal;
public ticksPrevTotal;
public ticksTooltip='down';
public fdNumberOfTicksLoader:boolean;

//Predictor Ratio :
  private fdNumberOfTicks() {
     if(this.duration){
      this.fdNumberOfTicksLoader = true;
          this.ticksPrevTotal = 0;
          this.showmulticlinicticks = false;	
       var user_id;
       var clinic_id;
    this.clinic_id &&  this.frontdeskService.fdNumberOfTicks(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
      this.ticksMulti[0]['data'] = [];        
      this.ticksLabels = [];
      this.ticksLabels1 = [];  
      if(data.message == 'success'){
        this.fdNumberOfTicksLoader = false;
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          this.showmulticlinicticks = true;          
        if (data.total > 0 && data.data) {
          data.data.forEach(res => {
            if(res.clinic_id){
              this.ticksLabels1.push(Math.round(res.num_ticks));
              this.ticksLabels.push(res.clinic_name);
            } 
          });
        }       
        this.ticksMulti[0]['data'] = this.ticksLabels1;
        }
        this.ticksPrevTotal = 0;
        this.ticksTotal = 0;
        if(data.data.length > 0)
          this.ticksTotal = Math.round(data.total);
          this.ticksPrevTotal = Math.round(data.total_ta);
          if(this.ticksTotal >= this.ticksPrevTotal)
            this.ticksTooltip = 'up';
        }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    }
  }

public recallPrebookTotal;
public recallPrebookGoal=0;
public recallPrebookPrevTotal;
public recallPrebookTooltip='down';
public fdRecallPrebookRateLoader:boolean;
public maxrecallPrebookGoal:any=0;
public fdPrebookRateMulti: any[] = [
  { data: [], 
    label: '',
    backgroundColor: [
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
    ],
    hoverBackgroundColor: [
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
    ]
  }
];
public showmulticlinicPrebook:boolean = false;
public fdPrebookRateLabels:any=[];
public fdPrebookRateTrnd:any=[];
//Predictor Ratio :
  private fdRecallPrebookRate() {
     if(this.duration){
      this.fdRecallPrebookRateLoader = true;
      this.recallPrebookTotal =0;
       var user_id;
       var clinic_id;
       this.showmulticlinicPrebook = false;
     this.clinic_id && this.frontdeskService.fdRecallPrebookRate(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.fdPrebookRateMulti[0]['data'] = [];        
        this.fdPrebookRateLabels = [];
        this.fdPrebookRateTrnd = [];
        this.fdRecallPrebookRateLoader = false;
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          this.showmulticlinicPrebook = true;          
        if (data.total > 0 && data.data) {
          data.data.forEach(res => {
            if(res.clinic_id){
              this.fdPrebookRateTrnd.push(Math.round(res.recall_patient/res.total_patient * 100));
              this.fdPrebookRateLabels.push(res.clinic_name);
            } 
          });
        }       
        this.fdPrebookRateMulti[0]['data'] = this.fdPrebookRateTrnd;
        }
          this.recallPrebookPrevTotal = 0;
          this.recallPrebookGoal= data.goals;
          this.recallPrebookTotal = 0;
          this.recallPrebookTotal = Math.round(data.total);
          this.recallPrebookPrevTotal = Math.round(data.total_ta);
          if(this.recallPrebookTotal>=this.recallPrebookPrevTotal)
            this.recallPrebookTooltip = 'up';
          this.maxrecallPrebookGoal = this.recallPrebookGoal;          
          if(this.maxrecallPrebookGoal <= 0)
            this.maxrecallPrebookGoal = this.recallPrebookTotal;
        }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    }
  }

public treatmentPrebookTotal;
public treatmentPrebookGoal=0;

public treatmentPrebookPrevTotal;
public treatmentPrebookTooltip='down';
public fdtreatmentPrebookRateLoader: boolean;
public maxtreatmentPrebookGoal:any=0;
public fdReappointRateMulti: any[] = [
  { data: [], 
    label: '',
    backgroundColor: [
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
    ],
    hoverBackgroundColor: [
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
      '#119582',
      '#ffb4b5',
    ]
  }
];
public showmulticlinicReappointRate:boolean = false;
public fdReappointRateLabels:any=[];
public fdReappointRateTrnd:any=[];
//Predictor Ratio :
  private fdtreatmentPrebookRate() {
     if(this.duration){
      this.fdtreatmentPrebookRateLoader = true;
        this.treatmentPrebookTotal = 0;
        this.showmulticlinicReappointRate = false;
       var user_id;
       var clinic_id;
    
     this.clinic_id && this.frontdeskService.fdReappointRate(this.clinic_id,this.startDate,this.endDate,this.duration).subscribe((data) => {
       if(data.message == 'success'){
        this.fdtreatmentPrebookRateLoader = false;
        this.fdReappointRateMulti[0]['data'] = [];        
        this.fdReappointRateLabels = [];
        this.fdReappointRateTrnd = [];
        if (data.total > 0) {
          data.data.forEach(res => { 
            this.fdReappointRateTrnd.push(Math.round(res.reappoint_rate));
            this.fdReappointRateLabels.push(res.clinic_name);
          });
        }
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          this.showmulticlinicReappointRate = true;
        }
        this.fdReappointRateMulti[0]['data'] = this.fdReappointRateTrnd;


        this.treatmentPrebookPrevTotal = 0;
        this.treatmentPrebookTotal = 0;
        this.treatmentPrebookGoal= data.goals;
          this.treatmentPrebookTotal = Math.round(data.total);
          this.treatmentPrebookPrevTotal = Math.round(data.total_ta);
          if(this.treatmentPrebookTotal>=this.treatmentPrebookPrevTotal)
            this.treatmentPrebookTooltip = 'up';
          if(this.treatmentPrebookTotal > this.treatmentPrebookGoal)
            this.maxtreatmentPrebookGoal = this.treatmentPrebookTotal;
          else
            this.maxtreatmentPrebookGoal = this.treatmentPrebookGoal;
          if(this.maxtreatmentPrebookGoal ==0)
            this.maxtreatmentPrebookGoal ='';
        }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );
    }
  }

public currentText;

  // Filter By Date
  filterDate(duration) {
    this.isDisabled = true;
     $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_off').addClass('mat-button-toggle-checked');
    this.showTrend= false;
     $('.customRange').css('display','none');
    if(duration == 'w') {
      this.showGoals = false;
       this.trendText= 'Last Week';
      this.currentText= 'This Week';
      const now = new Date();
       if(now.getDay()==0)
          var day = 7;
        else
          var day = now.getDay();

       var first = now.getDate() - day +1;
       var last = first + 6; 
       this.startDate = this.datePipe.transform(new Date(now.setDate(first)).toUTCString(), 'dd-MM-yyyy');
       var end = new Date();
        end.setFullYear(now.getFullYear());
        end.setMonth(now.getMonth()+1);
        end.setDate(last);
       this.endDate =this.datePipe.transform(new Date(end).toUTCString(), 'dd-MM-yyyy');
       this.duration='w';
       this.DateDiffernce='';
        this.loadDentist('all');
    }
    else if (duration == 'm') {
      this.showGoals = true;
      this.trendText= 'Last Month';
      this.currentText= 'This Month';

      var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
        this.duration='m';
        this.DateDiffernce='';
            this.loadDentist('all');
    }
    else if (duration == 'lm') {
      this.showGoals = true;
      this.duration = 'lm';
      this.trendText = 'Previous Month';
      this.currentText = 'Last Month';

      const date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() - 1, 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 0), 'dd-MM-yyyy');
      this.DateDiffernce='';
      this.loadDentist('all');
    }
    else if (duration == 'q') {
      this.showGoals = false;
      this.trendText= 'Last Quarter';
      this.currentText= 'This Quarter';

      const now = new Date();
      var cmonth = now.getMonth()+1;
      var cyear = now.getFullYear();
      if(cmonth >=1 && cmonth <=3) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 0, 1), 'dd-MM-yyyy');
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 0), 'dd-MM-yyyy')
        ;
      }
      else if(cmonth >=4 && cmonth <=6) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 1), 'dd-MM-yyyy');
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 0), 'dd-MM-yyyy'); 
      }
      else if(cmonth >=7 && cmonth <=9) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 1), 'dd-MM-yyyy');
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 0), 'dd-MM-yyyy'); 
      }
      else if(cmonth >=10 && cmonth <=12) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 1), 'dd-MM-yyyy');
        // this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 12, 0), 'dd-MM-yyyy');  
      }
      this.duration='q';
      this.DateDiffernce='';
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.loadDentist('all');
    }
    else if (duration == 'lq') {
      this.showGoals = false;
      this.trendText= 'Previous Quarter';
      this.currentText= 'Last Quarter';

      const now = new Date();
      var cmonth = now.getMonth()+1;
      var cyear = now.getFullYear();
     
      if(cmonth >=1 && cmonth <=3) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear() -1, 9, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear()-1, 12, 0), 'dd-MM-yyyy');
      }
      else if(cmonth >=4 && cmonth <=6) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 0, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 0), 'dd-MM-yyyy'); }
      else if(cmonth >=7 && cmonth <=9) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 3, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 0), 'dd-MM-yyyy'); }
      else if(cmonth >=10 && cmonth <=12) {
        this.startDate = this.datePipe.transform(new Date(now.getFullYear(), 6, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(now.getFullYear(), 9, 0), 'dd-MM-yyyy');  }
        this.duration='lq';
        this.DateDiffernce='';
            this.loadDentist('all');
   
    }
    else if (duration == 'cytd') {
      this.showGoals = false;
      this.trendText = 'Last Year';
      this.currentText = 'This Year';
      this.duration = 'cytd';
      var date = new Date();
      this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 0, 1), 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.DateDiffernce='';
      this.loadDentist('all');
    }
    else if (duration == 'lcytd') {
      this.showGoals = false;
        this.trendText = 'Previous Year';
        this.currentText = 'Last Year';
        this.duration = 'lcytd';
        var date = new Date();
         this.startDate = this.datePipe.transform(new Date(date.getFullYear() -1, 0, 1), 'dd-MM-yyyy');       
        this.endDate = this.datePipe.transform(new Date(date.getFullYear() -1, 11, 31), 'dd-MM-yyyy');
        this.DateDiffernce='';
        this.loadDentist('all');
      }
    else if (duration == 'fytd') {
      this.showGoals = false;
      this.duration = 'fytd';
      this.trendText = 'Last Financial Year';
      this.currentText = 'This Financial Year';

      var date = new Date();
      if ((date.getMonth() + 1) <= 6) {
        this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 6, 1), 'dd-MM-yyyy');
      } else {
        this.startDate = this.datePipe.transform(new Date(date.getFullYear(), 6, 1), 'dd-MM-yyyy');
      }
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.DateDiffernce='';
      this.loadDentist('all');
    }
     else if (duration == 'lfytd') {
      this.showGoals = false;
        this.trendText = 'Previous Financial Year';
        this.currentText = 'Last Financial Year';
        this.duration = 'lfytd'
        var date = new Date();
         if ((date.getMonth() + 1) <= 6) {
          this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 2, 6, 1), 'dd-MM-yyyy');
        } else {
          this.startDate = this.datePipe.transform(new Date(date.getFullYear() -1, 6, 1), 'dd-MM-yyyy');
        }
        if ((date.getMonth() + 1) <= 6) {          
         this.endDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 5, 30), 'dd-MM-yyyy');
        } else {
          this.endDate = this.datePipe.transform(new Date(date.getFullYear(), 5, 30), 'dd-MM-yyyy');
        }
 /*       this.startDate = this.datePipe.transform(new Date(date.getFullYear() - 2, 6, 1), 'dd-MM-yyyy');
        this.endDate = this.datePipe.transform(new Date(date.getFullYear() - 1, 5, 30), 'dd-MM-yyyy');       */
        this.DateDiffernce='';
        this.loadDentist('all');
      }
     else if (duration == 'custom') {
      this.trendText= '';
      this.currentText= '';
        this.duration='custom';
    //  $('.customRange').css('display','block');
     let selectedDate = this.chartService.customSelectedDate$.value;
     this.startDate = this.datePipe.transform(selectedDate.startDate, 'dd-MM-yyyy');
     this.endDate = this.datePipe.transform(selectedDate.endDate, 'dd-MM-yyyy');
     var selectedMonth = this.datePipe.transform(selectedDate.startDate, 'M');
      var selectedYear = this.datePipe.transform(selectedDate.startDate, 'yyyy');
      var selectedStartDate = this.datePipe.transform(selectedDate.startDate, 'd');
      var selectedEndDate = this.datePipe.transform(selectedDate.endDate, 'd');
      var LastDay = new Date(parseInt(selectedYear), parseInt(selectedMonth) , 0).getDate();
      if(parseInt(selectedStartDate) == 1 && parseInt(selectedEndDate) == LastDay){
        this.showGoals = true;
      }else{
        this.showGoals = false;
      }

     var date1:any= new Date(selectedDate.startDate);
     var date2:any= new Date(selectedDate.endDate);
     var diffTime:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
     if(diffTime > 365){
      this.DateDiffernce = diffTime;
     }else{
      this.DateDiffernce = '';
     }

     this.loadDentist("all");
    }
    $('.filter').removeClass('active');
    $('.filter_'+duration).addClass("active");
      // $('.filter_custom').val(this.startDate+ " - "+this.endDate);
      

  }

choosedDate(val) {
    val = (val.chosenLabel);
    var val= val.toString().split(' - ');
    // calculating date differnce
     var date2:any= new Date(val[1]);
     var date1:any= new Date(val[0]);
     var diffTime:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
     if(diffTime > 365){
      this.DateDiffernce = diffTime;
     }else{
      this.DateDiffernce = '';
     }
      this.startDate = this.datePipe.transform(val[0], 'dd-MM-yyyy');
      this.endDate = this.datePipe.transform(val[1], 'dd-MM-yyyy');
      this.duration = 'custom';
      this.loadDentist('all');
      
      // $('.filter_custom').val(this.startDate+ " - "+this.endDate);
     $('.customRange').css('display','none');
}
toggleFilter(val) {
    $('.target_filter').removeClass('mat-button-toggle-checked');
    $('.target_'+val).addClass('mat-button-toggle-checked');
    $('.filter').removeClass('active');
    this.Apirequest = 0;
    if(val == 'current') {
      this.toggleChecked = true;
      this.trendValue = 'c';
      this.stackedChartOptionssWT.annotation =[];
      this.toggleChangeProcess();
    }
    else if(val == 'historic') {
       this.toggleChecked = true;
       this.trendValue = 'h';
       this.stackedChartOptionssWT.annotation =[];
       this.toggleChangeProcess();
    }
    else if(val == 'off') {
      if(this.goalchecked=='average') {
          this.stackedChartOptionssWT.annotation = {
            annotations: [{
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: this.workTimeTotal,
                borderColor: 'red',
                borderWidth: 2,
                borderDash: [2, 2],
                borderDashOffset: 0,
            }]
          }
        }
        else if(this.goalchecked=='goal')  {
          this.stackedChartOptionssWT.annotation = {
            annotations: [{
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.workTimeGoal,
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [2, 2],
              borderDashOffset: 0,
            }]
          }
        }
      this.filterDate("m");
      this.showTrend = false;
    }
}
 private getClinics() { 
  this.headerService.getClinic.subscribe((res) => {
       if(res.message == 'success'){
        this.clinicsData = res.data;
       }
    }, error => {
     // this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );

  }
  initiate_dentist() {
    var val = $('.internal_dentist').val();
    if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
      //this.loadDentist(val);
    }else{
      this.loadDentist(val);
    }
  }
  toggleChecked = false;
  trendValue ='';
  isDisabled =true;
  isChecked =true;
  mode='Internal';
  showTrend: boolean = false;
toggleChangeProcess(){
  this.Apirequest = 6;
      this.showTrend = true;
      this.fdwtaRatioTrend();
      this.fdRecallPrebookRateTrend();
      this.fdTreatmentPrebookRateTrend();
      this.fdNumberOfTicksTrend();
      this.fdFtaRatioTrend();
      this.fdUtaRatioTrend();
}

 public ftaChartTrend: any[]  = [
    {data: [], label: '',  shadowOffsetX: 3,
            shadowOffsetY: 2,
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            pointBevelWidth: 2,
            pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
            pointBevelShadowColor: 'rgba(0, 0, 0, 0.3)',
            pointShadowOffsetX: 3,
            pointShadowOffsetY: 3,
            pointShadowBlur: 10,
            pointShadowColor: 'rgba(0, 0, 0, 0.3)',
            backgroundOverlayMode: 'multiply'}];
    public ftaChartTrend1=[];
  public ftaChartTrendLabels =[];
  public ftaChartTrendLabels1 =[];
  public fdFtaRatioTrendLoader:boolean;
  public ftaChartTrendMulti: any[] = [
    { data: [], label: '' }];
public ftaTrendMultiLabels = [];
  public ftaChartTrendMultiLabels1 = [];  
  public showByclinicfta : boolean =false;
  private fdFtaRatioTrend() {
    this.fdFtaRatioTrendLoader =true;
  this.ftaChartTrendLabels=[];
  
  this.ftaChartTrendLabels1=[];
  this.ftaChartTrend1=[];
    var user_id;
    var clinic_id;
    this.showByclinicfta = false;
  this.ftaChartTrendMulti =[];
  this.ftaTrendMultiLabels =[];
  this.ftaChartTrendMultiLabels1 =[];  
   this.clinic_id && this.frontdeskService.fdFtaRatioTrend(this.clinic_id,this.trendValue).subscribe((data) => {
     this.fdFtaRatioTrendLoader =false;
      this.ftaChartTrendLabels1=[];
  this.ftaChartTrend1=[];
  this.Apirequest = this.Apirequest -1;
       if(data.message == 'success'){
        this.ftaChartTrendMulti[0] = { data: [], label: '' };
        data.data.sort((a, b)=> a.duration === b.duration ? 0 : a.duration > b.duration || -1);
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          this.showByclinicfta = true;
          data.data.forEach(res => { 
            let ftaSum = 0;
            res.val.forEach((reslt, key) => {
              ftaSum += Math.round(reslt.fta_ratio);
              // if (typeof (this.ftaChartTrendMulti[key]) == 'undefined') {
              //   this.ftaChartTrendMulti[key] = { data: [], label: '' };
              // }
              // if (typeof (this.ftaChartTrendMulti[key]['data']) == 'undefined') {
              //   this.ftaChartTrendMulti[key]['data'] = [];
              // }
              
              //   this.ftaChartTrendMulti[key]['data'].push(Math.round(reslt.fta_ratio));
              //   this.ftaChartTrendMulti[key]['label'] = reslt.clinic_name;
              //   this.ftaChartTrendMulti[key]['backgroundColor'] = this.doughnutChartColors[key];
              //   this.ftaChartTrendMulti[key]['hoverBackgroundColor'] = this.doughnutChartColors[key];
             }); 
              // this.ftaChartTrendMulti[0]['data'].push(Math.round(((ftaSum / res.val.length) + Number.EPSILON) * 100) / 100);
              this.ftaChartTrendMulti[0]['data'].push((ftaSum / res.val.length));
              this.ftaChartTrendMulti[0]['backgroundColor'] = this.doughnutChartColors[0];
             if (this.trendValue == 'c')
              this.ftaChartTrendMultiLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
            else
              this.ftaChartTrendMultiLabels1.push(res.duration);
          });
          this.ftaTrendMultiLabels = this.ftaChartTrendMultiLabels1;
        }else{
          data.data.forEach(res => {  
            if(res.val>100)
              res.val =100;
               this.ftaChartTrend1.push(Math.round(res.fta_ratio * 10) /10);
             if(this.trendValue == 'c')
             this.ftaChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
              else
             this.ftaChartTrendLabels1.push(res.year);
            
           });
           this.ftaChartTrend[0]['data'] = this.ftaChartTrend1;
           this.ftaChartTrendLabels =this.ftaChartTrendLabels1; 
        }
                
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }

  public wtaChartTrend: any[]  = [
    {data: [], label: '',  order: 2, 
    backgroundColor: [
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even
  ], 
  shadowOffsetX: 3,
            shadowOffsetY: 2,
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            pointBevelWidth: 2,
            pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
            pointBevelShadowColor: 'rgba(0, 0, 0, 0.3)',
            pointShadowOffsetX: 3,
            pointShadowOffsetY: 3,
            pointShadowBlur: 10,
            pointShadowColor: 'rgba(0, 0, 0, 0.3)',
            backgroundOverlayMode: 'multiply'
  },
  { 
    data: [], label: '',
    shadowOffsetX: 3,
    backgroundColor: 'rgba(255, 0, 128, 1)',
    order: 1,
  }
];
  public wtaChartTrend1=[];
  public wtaChartTrendLabels =[];
  public wtaChartTrendLabels1 =[];
  public fdwtaRatioTrendLoader:boolean;
  public targetData = [];
  public uRChartTrendMulti: any[] = [
    { data: [], label: '' }];
  public uRChartTrendMultiLabels = [];
  public uRChartTrendMultiLabels1 = [];  
  public showByclinicUR : boolean =false;

  private fdwtaRatioTrend() {
    this.fdwtaRatioTrendLoader =true;
  this.wtaChartTrendLabels=[];
 
  this.wtaChartTrendLabels1=[];
  this.wtaChartTrend1=[];
  this.targetData=[];
    var user_id;
    var clinic_id;
    this.showByclinicUR = false;
    this.uRChartTrendMulti =[];
    this.uRChartTrendMultiLabels =[];
    this.uRChartTrendMultiLabels1 =[];
    if(this.trendValue == 'h' ){ // utilisation rate showing messageif more than 12 months
      this.utilityratemessage = true;
      this.Apirequest = this.Apirequest -1;
      this.fdwtaRatioTrendLoader =false;
    }else{
      this.utilityratemessage = false;
    this.clinic_id && this.frontdeskService.fdWorkTimeAnalysisTrend(this.clinic_id,this.trendValue).subscribe((data) => {
       this.wtaChartTrendLabels1=[];
    this.wtaChartTrend1=[];
    this.Apirequest = this.Apirequest -1;
       if(data.message == 'success'){
        this.uRChartTrendMulti[0] = { data: [], label: '' };
        data.data.sort((a, b)=> a.duration === b.duration ? 0 : a.duration > b.duration || -1);
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          this.showByclinicUR = true;
        }
        this.fdwtaRatioTrendLoader =false;
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          data.data.forEach(res => { 
            let utiSum = 0;
            res.val.forEach((reslt, key) => {
              utiSum += Math.round(reslt.util_rate * 100);
              // if (typeof (this.uRChartTrendMulti[key]) == 'undefined') {
              //   this.uRChartTrendMulti[key] = { data: [], label: '' };
              // }
              // if (typeof (this.uRChartTrendMulti[key]['data']) == 'undefined') {
              //   this.uRChartTrendMulti[key]['data'] = [];
              // }
              // this.uRChartTrendMulti[key]['data'].push(Math.round(reslt.util_rate * 100));
              // this.uRChartTrendMulti[key]['label'] = reslt.clinic_name;
              // this.uRChartTrendMulti[key]['backgroundColor'] = this.doughnutChartColors[key];
              // this.uRChartTrendMulti[key]['hoverBackgroundColor'] = this.doughnutChartColors[key];
             });
              // this.uRChartTrendMulti[0]['data'].push(Math.round(((utiSum / res.val.length) + Number.EPSILON) * 100) / 100);
              this.uRChartTrendMulti[0]['data'].push(utiSum / res.val.length);
              this.uRChartTrendMulti[0]['backgroundColor'] = this.doughnutChartColors[0];
             if (this.trendValue == 'c')
              this.uRChartTrendMultiLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
            else
              this.uRChartTrendMultiLabels1.push(res.duration);
          });
          this.uRChartTrendMultiLabels = this.uRChartTrendMultiLabels1;
        }else{
              data.data.forEach(res => {  
                this.wtaChartTrend1.push(Math.round(res.util_rate * 100));
                if(res.goals == -1 || res.goals == null || res.goals == ''){
                this.targetData.push(null);
              }else{
                this.targetData.push(res.goals);    
              }   
              if(this.trendValue == 'c')
              this.wtaChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y')+'--'+res.worked_hour+'--'+res.planned_hour);
              else
              this.wtaChartTrendLabels1.push(res.year+'--'+res.worked_hour+'--'+res.planned_hour);
            
            });
            

            var mappedtargetData = [];
            this.targetData.map(function (v){
              if(v == null ){
                mappedtargetData.push([v - 0, v + 0]);
              }else{
                mappedtargetData.push([v - 0.5, v + 0.5]);
              }
            });
            if(this.trendValue == 'c'){
              this.wtaChartTrend[0]['label'] = 'Actual';
              this.wtaChartTrend[1]['label'] = 'Target';
            this.wtaChartTrend[1]['data'] =  mappedtargetData;
            }else{
              this.wtaChartTrend[0]['label'] = '';
              this.wtaChartTrend[1]['label'] = '';
              this.wtaChartTrend[1]['data'] =  [];
            }	
            this.wtaChartTrend[0]['data'] = this.wtaChartTrend1;

            this.wtaChartTrendLabels =this.wtaChartTrendLabels1; 
          }
                
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }
  }


  public utaChartTrend: any[]  = [
    {data: [], label: '',  shadowOffsetX: 3,
            shadowOffsetY: 2,
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            pointBevelWidth: 2,
            pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
            pointBevelShadowColor: 'rgba(0, 0, 0, 0.3)',
            pointShadowOffsetX: 3,
            pointShadowOffsetY: 3,
            pointShadowBlur: 10,
            pointShadowColor: 'rgba(0, 0, 0, 0.3)',
            backgroundOverlayMode: 'multiply'}];
    public utaChartTrend1=[];
  public utaChartTrendLabels =[];
  public utaChartTrendLabels1 =[];
  public fdUtaRatioTrendLoader:boolean;
  public utaChartTrendMulti: any[] = [
    { data: [], label: '' }];
public utaTrendMultiLabels = [];
  public utaChartTrendMultiLabels1 = [];  
  public showByclinicUta : boolean =false;
  private fdUtaRatioTrend() {
    this.fdUtaRatioTrendLoader = true;
  this.utaChartTrendLabels1=[];
  this.utaChartTrendLabels=[];

  this.utaChartTrend1=[];
    var user_id;
    var clinic_id;
    this.showByclinicUta = false;
  this.utaChartTrendMulti =[];
  this.utaTrendMultiLabels =[];
  this.utaChartTrendMultiLabels1 =[]; 
   this.clinic_id && this.frontdeskService.fdUtaRatioTrend(this.clinic_id,this.trendValue).subscribe((data) => {
      this.utaChartTrendLabels1=[];
  this.utaChartTrend1=[];
  this.Apirequest = this.Apirequest -1;
       if(data.message == 'success'){
        this.utaChartTrendMulti[0] = { data: [], label: '' };
        data.data.sort((a, b)=> a.duration === b.duration ? 0 : a.duration > b.duration || -1);
        this.fdUtaRatioTrendLoader = false;
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          this.showByclinicUta = true;
          data.data.forEach(res => { 
            let utaSum = 0;
            res.val.forEach((reslt, key) => {
              utaSum += Math.round(reslt.uta_ratio);
              // if (typeof (this.utaChartTrendMulti[key]) == 'undefined') {
              //   this.utaChartTrendMulti[key] = { data: [], label: '' };
              // }
              // if (typeof (this.utaChartTrendMulti[key]['data']) == 'undefined') {
              //   this.utaChartTrendMulti[key]['data'] = [];
              // }
              
              //   this.utaChartTrendMulti[key]['data'].push(Math.round(reslt.uta_ratio));
              //   this.utaChartTrendMulti[key]['label'] = reslt.clinic_name;
              //   this.utaChartTrendMulti[key]['backgroundColor'] = this.doughnutChartColors[key];
              //   this.utaChartTrendMulti[key]['hoverBackgroundColor'] = this.doughnutChartColors[key];
             }); 
              // this.utaChartTrendMulti[0]['data'].push(Math.round(((utaSum / res.val.length) + Number.EPSILON) * 100) / 100);
              this.utaChartTrendMulti[0]['data'].push(utaSum / res.val.length);
              this.utaChartTrendMulti[0]['backgroundColor'] = this.doughnutChartColors[0];
             if (this.trendValue == 'c')
              this.utaChartTrendMultiLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
            else
              this.utaChartTrendMultiLabels1.push(res.duration);
          });
          this.utaTrendMultiLabels = this.utaChartTrendMultiLabels1;
        }else{
          data.data.forEach(res => {  
            if(res.val>100)
              res.val =100;
               this.utaChartTrend1.push(Math.round(res.uta_ratio * 10) /10 );
             if(this.trendValue == 'c')
             this.utaChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
              else
             this.utaChartTrendLabels1.push(res.year);
            
           });
           this.utaChartTrend[0]['data'] = this.utaChartTrend1;

           this.utaChartTrendLabels =this.utaChartTrendLabels1;
        }
                 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }

    public tickChartTrend: any[]  = [
    {data: [], label: '',  shadowOffsetX: 3,
    backgroundColor: [
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
  ], 
            shadowOffsetY: 2,
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            pointBevelWidth: 2,
            pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
            pointBevelShadowColor: 'rgba(0, 0, 0, 0.3)',
            pointShadowOffsetX: 3,
            pointShadowOffsetY: 3,
            pointShadowBlur: 10,
            pointShadowColor: 'rgba(0, 0, 0, 0.3)',
            backgroundOverlayMode: 'multiply'}];
    public tickChartTrend1=[];
  public tickChartTrendLabels =[];
  public tickChartTrendLabels1 =[];
  public fdNumberOfTicksTrendLoader:boolean;
  public ticChartTrendMulti: any[] = [
    { data: [], label: '' }];
public ticChartTrendMultiLabels = [];
  public ticPChartTrendMultiLabels1 = [];  
  public showByclinictic : boolean =false;
  private fdNumberOfTicksTrend() {
    this.fdNumberOfTicksTrendLoader = true;
  this.tickChartTrendLabels=[];
  this.tickChartTrendLabels1=[];
  this.tickChartTrend1=[];
    var user_id;
    var clinic_id;
    this.showByclinictic = false;
  this.ticChartTrendMulti =[];
  this.ticChartTrendMultiLabels =[];
  this.ticPChartTrendMultiLabels1 =[];
   this.clinic_id && this.frontdeskService.fdNumberOfTicksTrend(this.clinic_id,this.trendValue).subscribe((data) => {
      this.tickChartTrendLabels1=[];
  this.tickChartTrend1=[];
  this.Apirequest = this.Apirequest -1;
       if(data.message == 'success'){
        data.data.sort((a, b)=> a.duration === b.duration ? 0 : a.duration > b.duration || -1);
        this.fdNumberOfTicksTrendLoader = false;
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          this.showByclinictic = true;
          data.data.forEach(res => { 
            res.val.forEach((reslt, key) => {
              if (typeof (this.ticChartTrendMulti[key]) == 'undefined') {
                this.ticChartTrendMulti[key] = { data: [], label: '' };
              }
              if (typeof (this.ticChartTrendMulti[key]['data']) == 'undefined') {
                this.ticChartTrendMulti[key]['data'] = [];
              }
              
                this.ticChartTrendMulti[key]['data'].push(Math.round(reslt.num_ticks));
                this.ticChartTrendMulti[key]['label'] = reslt.clinic_name;
                this.ticChartTrendMulti[key]['backgroundColor'] = this.doughnutChartColors[key];
                this.ticChartTrendMulti[key]['hoverBackgroundColor'] = this.doughnutChartColors[key];
             }); 
             if (this.trendValue == 'c')
              this.ticPChartTrendMultiLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
            else
              this.ticPChartTrendMultiLabels1.push(res.duration);
          });
          this.ticChartTrendMultiLabels = this.ticPChartTrendMultiLabels1;
        }else{
          data.data.forEach(res => {  
            this.tickChartTrend1.push(res.num_ticks);
          if(this.trendValue == 'c')
          this.tickChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
           else
          this.tickChartTrendLabels1.push(res.year);
         
          });
          this.tickChartTrend[0]['data'] = this.tickChartTrend1;

          this.tickChartTrendLabels =this.tickChartTrendLabels1; 
        }
                
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }


 public recallPrebookChartTrend: any[]  = [
    {data: [], label: '',  shadowOffsetX: 3,order: 2,
    backgroundColor: [
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
  ],
    shadowOffsetY: 2,
    shadowBlur: 3,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    pointBevelWidth: 2,
    pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
    pointBevelShadowColor: 'rgba(0, 0, 0, 0.3)',
    pointShadowOffsetX: 3,
    pointShadowOffsetY: 3,
    pointShadowBlur: 10,
    pointShadowColor: 'rgba(0, 0, 0, 0.3)',
    backgroundOverlayMode: 'multiply'
  },{ 
      data: [], label: '',
      shadowOffsetX: 3,
      backgroundColor: 'rgba(255, 0, 128, 1)',
      order: 1,
    }
  ];
    public recallPrebookChartTrend1=[];
  public recallPrebookChartTrendLabels =[];
  public recallPrebookChartTrendLabels1 =[];
  public fdRecallPrebookRateTrendLoader:boolean;
  public fdRecallPrebookRatetargetData = [];

  public rPChartTrendMulti: any[] = [
    { data: [], label: '' }];
  public rPChartTrendMultiLabels = [];
  public rPChartTrendMultiLabels1 = [];  
  public showByclinicRP : boolean =false;

  private fdRecallPrebookRateTrend() {
    this.fdRecallPrebookRateTrendLoader = true;
  this.recallPrebookChartTrendLabels=[];

  this.recallPrebookChartTrendLabels1=[];
  this.recallPrebookChartTrend1=[];
  this.fdRecallPrebookRatetargetData =[];
    var user_id;
    var clinic_id;
    this.showByclinicRP = false;
    this.rPChartTrendMulti =[];
    this.rPChartTrendMultiLabels =[];
    this.rPChartTrendMultiLabels1 =[];
   this.clinic_id && this.frontdeskService.frontdeskdRecallPrebookRateTrend(this.clinic_id,this.trendValue).subscribe((data) => {
    this.Apirequest = this.Apirequest -1;  
    if(data.message == 'success'){
      this.rPChartTrendMulti[0] = { data: [], label: '' };
      data.data.sort((a, b)=> a.duration === b.duration ? 0 : a.duration > b.duration || -1);
      if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
        this.showByclinicRP = true;
      }
          this.fdRecallPrebookRateTrendLoader = false;
          if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
            data.data.forEach(res => { 
              let recallSum = 0;
              res.val.forEach((reslt, key) => {
                recallSum += Math.round(reslt.recall_percent);
                // if (typeof (this.rPChartTrendMulti[key]) == 'undefined') {
                //   this.rPChartTrendMulti[key] = { data: [], label: '' };
                // }
                // if (typeof (this.rPChartTrendMulti[key]['data']) == 'undefined') {
                //   this.rPChartTrendMulti[key]['data'] = [];
                // }
                
                //   this.rPChartTrendMulti[key]['data'].push(Math.round(reslt.recall_percent));
                //   this.rPChartTrendMulti[key]['label'] = reslt.clinic_name;
                //   this.rPChartTrendMulti[key]['backgroundColor'] = this.doughnutChartColors[key];
                //   this.rPChartTrendMulti[key]['hoverBackgroundColor'] = this.doughnutChartColors[key];
               }); 
                // this.rPChartTrendMulti[0]['data'].push(Math.round(((recallSum / res.val.length) + Number.EPSILON) * 100) / 100);
                this.rPChartTrendMulti[0]['data'].push(recallSum / res.val.length);
                this.rPChartTrendMulti[0]['backgroundColor'] = this.doughnutChartColors[0];
               if (this.trendValue == 'c')
                this.rPChartTrendMultiLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
              else
                this.rPChartTrendMultiLabels1.push(res.duration);
            });
            this.rPChartTrendMultiLabels = this.rPChartTrendMultiLabels1;
          }else{
            this.recallPrebookChartTrendLabels1=[];
            this.recallPrebookChartTrend1=[];
            data.data.forEach(res => {  
              this.recallPrebookChartTrend1.push(Math.round(res.recall_percent));
              if(res.goals == -1 || res.goals == null || res.goals == ''){
                this.fdRecallPrebookRatetargetData.push(null);
              }else{
                this.fdRecallPrebookRatetargetData.push(res.goals);    
              }      
              if(this.trendValue == 'c')
                      this.recallPrebookChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
                      else
                    this.recallPrebookChartTrendLabels1.push(res.year);
                    
                  });

                  var mappedfdRecallPrebookRatetargetData = [];
                    this.fdRecallPrebookRatetargetData.map(function (v){
                      if(v == null ){
                        mappedfdRecallPrebookRatetargetData.push([v - 0, v + 0]);
                      }else{
                        mappedfdRecallPrebookRatetargetData.push([v - 0.5, v + 0.5]);
                      }
                    });
                    if(this.trendValue == 'c'){
                      this.recallPrebookChartTrend[0]['label'] = 'Actual';
                      this.recallPrebookChartTrend[1]['label'] = 'Target';
                    this.recallPrebookChartTrend[1]['data'] =  mappedfdRecallPrebookRatetargetData;
                    }else{
                      this.recallPrebookChartTrend[0]['label'] = '';
                      this.recallPrebookChartTrend[1]['label'] = '';
                      this.recallPrebookChartTrend[1]['data'] =  [];
                    }	
                  this.recallPrebookChartTrend[0]['data'] = this.recallPrebookChartTrend1;

                  this.recallPrebookChartTrendLabels =this.recallPrebookChartTrendLabels1;
            }
           
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }


 public treatmentPrebookChartTrend: any[]  = [
    {data: [], label: '',  shadowOffsetX: 3, order: 2,
    backgroundColor: [
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
      this.chartService.colors.even,
      this.chartService.colors.odd,
  ],
            shadowOffsetY: 2,
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            pointBevelWidth: 2,
            pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
            pointBevelShadowColor: 'rgba(0, 0, 0, 0.3)',
            pointShadowOffsetX: 3,
            pointShadowOffsetY: 3,
            pointShadowBlur: 10,
            pointShadowColor: 'rgba(0, 0, 0, 0.3)',
            backgroundOverlayMode: 'multiply'},
            { 
              data: [], label: '',
              shadowOffsetX: 3,
              backgroundColor: 'rgba(255, 0, 128, 1)',
              order: 1,
            }
          ];
    public treatmentPrebookChartTrend1=[];
  public treatmentPrebookChartTrendLabels =[];
  public treatmentPrebookChartTrendLabels1 =[];
  public fdTreatmentPrebookRateTrendLoader:boolean = false;
  public fdTreatmentPrebookRatetargetData = [];
  public tPChartTrendMulti: any[] = [
    { data: [], label: '' }];
  public tPChartTrendMultiLabels = [];
  public tPChartTrendMultiLabels1 = [];  
  public showByclinic : boolean =false;
  private fdTreatmentPrebookRateTrend() {
    this.fdTreatmentPrebookRateTrendLoader = true;
  this.treatmentPrebookChartTrendLabels1=[];
  this.treatmentPrebookChartTrendLabels=[];

  this.treatmentPrebookChartTrend1=[];
  this.fdTreatmentPrebookRatetargetData=[];
    var user_id;
    var clinic_id;
  this.showByclinic = false;
  this.tPChartTrendMulti =[];
  this.tPChartTrendMultiLabels =[];
  this.tPChartTrendMultiLabels1 =[];
   this.clinic_id && this.frontdeskService.fdReappointRateTrend(this.clinic_id,this.trendValue).subscribe((data) => {
    this.Apirequest = this.Apirequest -1;   
    if(data.message == 'success'){
      this.tPChartTrendMulti[0] = { data: [], label: '' };
      data.data.sort((a, b)=> a.duration === b.duration ? 0 : a.duration > b.duration || -1);
        this.fdTreatmentPrebookRateTrendLoader = false;
        if(this.clinic_id.indexOf(',') >= 0 || Array.isArray(this.clinic_id)){
          this.showByclinic = true;
          data.data.forEach(res => { 
            let reappointSum = 0;
            res.val.forEach((reslt, key) => {
              reappointSum += Math.round(reslt.reappoint_rate);
              // if (typeof (this.tPChartTrendMulti[key]) == 'undefined') {
              //   this.tPChartTrendMulti[key] = { data: [], label: '' };
              // }
              // if (typeof (this.tPChartTrendMulti[key]['data']) == 'undefined') {
              //   this.tPChartTrendMulti[key]['data'] = [];
              // }
              
              //   this.tPChartTrendMulti[key]['data'].push(Math.round(reslt.reappoint_rate));
              //   this.tPChartTrendMulti[key]['label'] = reslt.clinic_name;
              //   this.tPChartTrendMulti[key]['backgroundColor'] = this.doughnutChartColors[key];
              //   this.tPChartTrendMulti[key]['hoverBackgroundColor'] = this.doughnutChartColors[key];
             }); 
              // this.tPChartTrendMulti[0]['data'].push(Math.round(((reappointSum / res.val.length) + Number.EPSILON) * 100) / 100);
              this.tPChartTrendMulti[0]['data'].push(reappointSum / res.val.length);
              this.tPChartTrendMulti[0]['backgroundColor'] = this.doughnutChartColors[0];
             if (this.trendValue == 'c')
              this.tPChartTrendMultiLabels1.push(this.datePipe.transform(res.duration, 'MMM y'));
            else
              this.tPChartTrendMultiLabels1.push(res.duration);
          });
          this.tPChartTrendMultiLabels = this.tPChartTrendMultiLabels1;
        }else{
          this.treatmentPrebookChartTrendLabels1=[];
          this.treatmentPrebookChartTrend1=[];
          data.data.forEach(res => {  
                this.treatmentPrebookChartTrend1.push(Math.round(res.reappoint_rate));
                if(res.goals == -1 || res.goals == null || res.goals == ''){
                this.fdTreatmentPrebookRatetargetData.push(null);
              }else{
                this.fdTreatmentPrebookRatetargetData.push(res.goals);    
              } 
              if(this.trendValue == 'c')
              this.treatmentPrebookChartTrendLabels1.push(this.datePipe.transform(res.year_month, 'MMM y'));
              else
              this.treatmentPrebookChartTrendLabels1.push(res.year);
            
            });
            var mappedtargetDataPrebookRatetargetData = [];
            this.fdTreatmentPrebookRatetargetData.map(function (v){
              if(v == null ){
                mappedtargetDataPrebookRatetargetData.push([v - 0, v + 0]);
              }else{
                mappedtargetDataPrebookRatetargetData.push([v - 0.5, v + 0.5]);
              }
            });
            if(this.trendValue == 'c'){
              this.treatmentPrebookChartTrend[0]['label'] = 'Actual';
              this.treatmentPrebookChartTrend[1]['label'] = 'Target';
            this.treatmentPrebookChartTrend[1]['data'] =  mappedtargetDataPrebookRatetargetData;
            }else{
              this.treatmentPrebookChartTrend[0]['label'] = '';
              this.treatmentPrebookChartTrend[1]['label'] = '';
              this.treatmentPrebookChartTrend[1]['data'] =  [];
            }	
            this.treatmentPrebookChartTrend[0]['data'] = this.treatmentPrebookChartTrend1;

            this.treatmentPrebookChartTrendLabels =this.treatmentPrebookChartTrendLabels1; 
        }
          
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
 
    });
  }
  goalToggle(val) {
    this.goalchecked = val;
    this.fdWorkTimeAnalysis();  
  }

    getChartsTips() {
      this.chartstipsService.getCharts(3).subscribe((data) => {
        if(data.message == 'success')
        {         
          this.charTips = data.data;
        }
      }, error => {});
    }

    setTopValues(){
      if(this.showTopVlaues == false){
        this.showTopVlaues = true;
        this.stackedChartOptionsUtiDP = this.stackedChartOptionsUti1;
      } else {
        this.showTopVlaues = false;
        this.stackedChartOptionsUtiDP = this.stackedChartOptionsUti;
      }
    }
    showTable(val){
      this.showUtiTable = val;
    }

    changeUtil(val){
      if(parseInt(val) == 1){
        this.fdWorkTimeAnalysis();
      }else if(parseInt(val) == 2){
        this.fdWorkTimeByDay();
      }
      this.utilShow = val;
    }
  }
