import { Component, ViewChild, AfterViewInit, SecurityContext, ViewEncapsulation, OnInit  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ImportcsvService } from './importcsv.service';
import { environment } from "../../environments/environment";
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";

declare var require: any;

const data: any = [
    {
      id:'1',
      name: 'Accounting Invoices and Receipts',
      date: 'No Uploads Yet',
      sample: 'csv-sample/Accounting Invoices and Receipts.csv',      
      status : 'No File Uploaded'
    },
    {
      id:'2',
      name: 'Items Performed Over Period',
      date: 'No Uploads Yet',
      sample: 'csv-sample/Accounting Invoices and Receipts.csv',      
      status : 'No File Uploaded'
    },
    {
      id:'3',
      name: 'Treatment Plan Analysis',
      date: 'No Uploads Yet',
      sample: 'csv-sample/Accounting Invoices and Receipts.csv',      
      status : 'No File Uploaded'
    },
    {
      id:'4',
      name: 'Work Time Analysis',
      date: 'No Uploads Yet',
      sample: 'csv-sample/Accounting Invoices and Receipts.csv',      
      status : 'No File Uploaded'
    },
    {
      id:'5',
      name: 'Efficiency of Referral Sources New Patients',
      date: 'No Uploads Yet',
      sample: 'csv-sample/Accounting Invoices and Receipts.csv',     
      status : 'No File Uploaded' 
    },
    {
      id:'6',
      name: 'Status - Attended',
      date: 'No Uploads Yet',
      sample: 'csv-sample/Accounting Invoices and Receipts.csv',     
      status : 'No File Uploaded' 
    },
    {
      id:'7',
      name: 'Status - CDBS',
      date: 'No Uploads Yet',
      sample: 'csv-sample/Accounting Invoices and Receipts.csv',    
      status : 'No File Uploaded'  
    },
    {
      id:'8',
      name: 'Status - Confirmed',
      date: 'No Uploads Yet',
      sample: 'csv-sample/Accounting Invoices and Receipts.csv',     
      status : 'No File Uploaded' 
    },
    {
      id:'9',
      name: 'Status - FTA',
      date: 'No Uploads Yet',
      sample: 'csv-sample/Accounting Invoices and Receipts.csv',    
      status : 'No File Uploaded'  
    },
    {
      id:'10',
      name: 'Status - Lab Arrived',
      date: 'No Uploads Yet',
      status : 'No File Uploaded'
    },
    {
      id:'11',
      name: 'Status - Lab Work',
      date: 'No Uploads Yet',
      sample: 'csv-sample/Accounting Invoices and Receipts.csv', 
      status : 'No File Uploaded'
    },
    {
      id:'12',
      name: 'Status - Message Given',
      date: 'No Uploads Yet',
      sample: 'csv-sample/Accounting Invoices and Receipts.csv', 
      status : 'No File Uploaded'
    },
    {
      id:'13',
      name: 'Status - New Patient',
      date: 'No Uploads Yet',
      sample: 'csv-sample/Accounting Invoices and Receipts.csv', 
      status : 'No File Uploaded'
    },
    {
      id:'14',
      name: 'Status - No Status (Non Financial)',
      date: 'No Uploads Yet',
      sample: 'csv-sample/Accounting Invoices and Receipts.csv', 
      status : 'No File Uploaded'
    },
    {
      id:'15',
      name: 'Status - Phone Patient',
      date: 'No Uploads Yet',
      sample: 'csv-sample/Accounting Invoices and Receipts.csv', 
      status : 'No File Uploaded'
    },
    {
      id:'16',
      name: 'Status - Recall',
      date: 'No Uploads Yet',
      sample: 'csv-sample/Accounting Invoices and Receipts.csv', 
      status : 'No File Uploaded'
    },
    {
      id:'17',
      name: 'Status - SMS Sent',
      date: 'No Uploads Yet',
      sample: 'csv-sample/Accounting Invoices and Receipts.csv', 
      status : 'No File Uploaded'
    },
    {
      id:'17',
      name: 'Status - UTA',
      date: 'No Uploads Yet',
      sample: 'csv-sample/Accounting Invoices and Receipts.csv', 
      status : 'No File Uploaded'
    },
    {
      id:'18',
      name: 'All Patients',
      date: 'No Uploads Yet',
      sample: 'csv-sample/All Patients.csv', 
      status : 'No File Uploaded'
    }
  ];
@Component({
  templateUrl: 'importcsv.component.html'
})
export class ImportcsvComponent implements AfterViewInit {
   public clinic_id:any ={};

  ngAfterViewInit() {
     this.route.params.subscribe(params => {
    this.clinic_id = this.route.snapshot.paramMap.get("id");
        this.getLogs();
          $('#title').html('Data Upload');
       $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
     });
    
  }
    private apiUrl = environment.apiUrl;
    private homeUrl = environment.homeUrl;

  public show= false;
  selectedFile: FileSnippet;
    editing = {};
  rows = [];
  logData: any = [];
  arr1: any[] = [];
  temp = [...data];
  public label ='';
  loadingIndicator = true;
  reorderable = true;
currentDate: any = new Date();
  columns = [{ prop: 'name' }, { name: 'date' }];
  @ViewChild(ImportcsvComponent) table: ImportcsvComponent;
  constructor(private importcsvService: ImportcsvService, private datePipe: DatePipe, private route: ActivatedRoute,private _cookieService: CookieService, private router: Router){
  this.clinic_id = this.route.snapshot.paramMap.get("id");

        this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }
    private warningMessage: string;
  radioModel: string = 'Month';
   processFile(fileInput: any,rowIndex,cell) {
    (<HTMLElement>document.querySelector('.error')).style.display = 'none';
      (<HTMLElement>document.querySelector('.error')).innerHTML = '';

    const file: File = fileInput.files[0];
    const reader = new FileReader();
  //this.show = true;   
    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new FileSnippet(event.target.result, file);

      if(this.selectedFile.file.name == this.rows[rowIndex][cell] + '.csv') {
      this.importcsvService.uploadFile(this.selectedFile.file, this.clinic_id).subscribe(
        (data) => {
          if(data.message == 'success') {
          alert('File Uploaded Successfully-'+this.selectedFile.file.name+' . Please Process the files');
          this.getLogs();

          this.show = false; 
        }
        else {
          alert('Error Uploading File-'+this.selectedFile.file.name); 
        }
        })
    }
    else {
      alert('Incorrect File uploaded for '+this.rows[rowIndex][cell]);
      /*(<HTMLElement>document.querySelector('.error')).style.display = 'block';
      (<HTMLElement>document.querySelector('.error')).innerHTML += '<b style = "color:red">Incorrect File uploaded for '+this.rows[rowIndex][cell]+'</b>';*/
    }
    });

    reader.readAsDataURL(file);
}
 private getLogs() {
          this.rows = data;
            this.temp = [...data];
          this.table = data; 
          this.arr1 =[];
  this.importcsvService.getLogs(this.clinic_id).subscribe((res) => {
       if(res.message == 'success'){
         res.data.forEach((result,key) => {
            var temp = {};
            temp['id'] = key;
            temp['name'] = result.filename;
            temp['sample'] = 'csv-sample/'+result.filename;
            if(result.uploaded_csv_logs_unprocess) {
              temp['date'] = this.datePipe.transform(result.uploaded_csv_logs_unprocess[0].created, 'yyyy/MM/dd h:m:s');
              temp['status'] = 'Pending';
              this.label = 'danger'
            }
            else if(result.uploaded_csv_logs_inprocess) {
              temp['date'] = this.datePipe.transform(result.uploaded_csv_logs_inprocess[0].created, 'yyyy/MM/dd h:m:s');
              temp['status'] = 'In Progress';
              this.label = 'info'

            }
            else if(result.uploaded_csv_logs.length >0) {
              temp['date'] = this.datePipe.transform(result.uploaded_csv_logs[0].created, 'yyyy/MM/dd h:m:s');
              temp['status'] = 'Processed';
              this.label = 'red'
            }
            else {
              temp['date'] = 'No Uploads Yet';
              temp['status'] = 'No File Uploaded';
              this.label = 'light-success';
            }
            console.log(this.label);
              this.arr1.push(temp);
          //    this.productionTotal = this.productionTotal + parseInt(res.total);
        });
         this.rows = this.arr1;
            this.temp = [...this.arr1];
          this.table = data; 
       }
       else if(res.status == '401'){
              this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("token", '');
              this._cookieService.put("userid", '');
               this.router.navigateByUrl('/login');
           }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";

    }    
    );

  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }
  updateValue(event, cell, rowIndex) {  
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }
processAllFiles() {
    this.importcsvService.processAllFiles(this.clinic_id).subscribe((res) => {
       if(res.message == 'success'){
          alert('All Files Processed Successfully');
          this.getLogs();
          this.show = false; 
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";

    }    
    );
    alert('File Processing in Progress. You can check the status once files is processed.');
}

}
class FileSnippet {
  constructor(public src: string, public file: File) {}
}