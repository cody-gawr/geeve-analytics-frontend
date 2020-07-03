import { Component, Inject , ViewChild, AfterViewInit } from '@angular/core';
import { RolesUsersService } from './roles-users.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatInputModule } from '@angular/material';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventEmitter , Output, Input} from '@angular/core';
import { DentistService } from '../dentist/dentist.service';
import { NotifierService } from 'angular-notifier';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HeaderService } from '../layouts/full/header/header.service';
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
})


export class DialogOverviewExampleDialogComponent {
   public clinic_id:any ={};
   public form: FormGroup;

   show_dentist = false;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

     this.form = this.fb.group({
      display_name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      user_type: [null, Validators.compose([Validators.required])],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
    @Output() public onDentist: EventEmitter<any> = new EventEmitter();
   public selected_id;

    loadDentist(val) {
      if(val == '4')
        this.show_dentist = true;
    }

      omit_special_char(event)
      {   
         var k;  
         k = event.charCode;  //         k = event.keyCode;  (Both can be used)
         return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57) || k==45); 
      }

     save(data) {

       $('.form-control-dialog').each(function(){
          var likeElement = $(this).click();
       });
       var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(!data.email.match(mailformat) && data.email != '')
      {
      alert('Please enter a valid Email.');
       return false;
      }
      if(data.display_name != undefined && data.email != undefined  && data.user_type != undefined ){
          this.dialogRef.close(data);
      }else{
        return false;
       }
     }

}

@Component({
  selector: 'app-roles-overview-example-dialog',
  templateUrl: './roles-overview-example.html',
})


export class RolesOverviewExampleDialogComponent {
   public clinic_id:any ={};
  constructor(
    public rolesRef: MatDialogRef<RolesOverviewExampleDialogComponent>,private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      
  }
  omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57) || k==45); 
}
  onNoClick(): void {
    this.rolesRef.close();
  }
  //   loadPermisions(val) {
  //   data.selected_id = val;
  // }
   @Output() public onAdd: EventEmitter<any> = new EventEmitter();
   public selected_id;
    loadPermisions(val) {
      this.selected_id =val;
      this.onAdd.emit(val);
    }
}

declare var require: any;
const data: any = require('assets/company.json');
@Component({
  selector: 'app-table-filter',
  templateUrl: './roles-users.component.html',
  styleUrls: ['./roles-users.component.scss']
})
export class RolesUsersComponent implements AfterViewInit {
 display_name: string;
 email: string;
 notifier:any;
 user_type='';
 fileInput: any ;
 public clinic_id;
 dentist_id = '';
 password:string;
 dentists:any=[];
  private checkPermission(role) { 
  this.headerService.checkPermission(role).subscribe((res) => {
       if(res.message == 'success'){
       }
        else if(res.status == '401'){
              this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("token", '');
              this._cookieService.put("userid", '');
              this.router.navigateByUrl('/login');
           }
    }, error => {
        $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
    }    
    );

  }
  ngAfterViewInit() {
    this.checkPermission('roles');
    $('.header_filters').addClass('hide_header');
    
    this.getUsers();
    this.getRoles();
 //   this.getDentists();
    this.clinic_id = this.route.snapshot.paramMap.get("id");
        $('#title').html('Users');
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
        $('.sa_heading_bar').show();
        
  }
  editing = {};
  rows = [];
  temp = [...data];

  loadingIndicator = true;
  reorderable = true;

  columns = [{ prop: 'sr' }, { name: 'displayName' }, { name: 'email' }, { name: 'usertype' }, { name: 'created' }];

  @ViewChild(RolesUsersComponent) table: RolesUsersComponent;
  constructor(private toastr: ToastrService,notifierService: NotifierService,private rolesUsersService: RolesUsersService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router, private route: ActivatedRoute, private dentistService: DentistService,  private headerService: HeaderService) {
    this.notifier = notifierService;
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }
  private warningMessage: string;
  goBack() {
      window.history.back();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: { display_name: this.display_name, email: this.email, user_type: this.user_type, password: this.password,dentists:this.dentists,dentist_id:this.dentist_id }
    });
    dialogRef.afterClosed().subscribe(result => {
       if(result != undefined) {
     this.rolesUsersService.checkUserEmail(result.email).subscribe((res) => {
           if(res.message == 'success'){
           if(res.data <=0)
           this.add_user(result.display_name, result.email, result.user_type, 'jeeveanalytics',this.clinic_id,result.dentist_id);
            else
            this.notifier.notify( 'success', 'Email Already Exists!' ,'vertical');
           }
        }, error => {
         $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
    });
   }
    });
  }
  openRoleDialog(): void {
    const rolesRef = this.dialog.open(RolesOverviewExampleDialogComponent, {
      width: '250px',
      data: { display_name: this.display_name, email: this.email, user_type: this.user_type, password: this.password, roles:this.roles, selectedRole:this.selectedRole, selected_id:this.selected_id,dentists:this.dentists}
    });
    const sub = rolesRef.componentInstance.onAdd.subscribe((val) => {
    this.selected_id = val;
    });
    rolesRef.afterClosed().subscribe(result => {
     if(result != undefined) {
      this.roles.forEach(res1 => {
        console.log(res1.id);
          var checkedRoles1='';
          var checkedRoles =[];
          if(result.selectedRole['dashboards_'+res1.id])
            checkedRoles.push('dashboards');
           if(result.selectedRole['roles_'+res1.id])
            checkedRoles.push('roles');
           if(result.selectedRole['settings_'+res1.id])
            checkedRoles.push('settings');
           if(result.selectedRole['memberships_'+res1.id])
            checkedRoles.push('memberships');
          if(result.selectedRole['paymentplans_'+res1.id])
            checkedRoles.push('paymentplans');
           if(result.selectedRole['defaulters_'+res1.id])
            checkedRoles.push('defaulters');
            var checkedRoles1 = checkedRoles.join();
              this.rolesUsersService.saveRoles(res1.id, checkedRoles1).subscribe((res) => {
                 if(res.message == 'success'){
                  this.toastr.success('Permissions Saved .');
                  this.getRoles();
                 }
              }, error => {
                   $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
              });
         });
    }
    });
  }
    // Get Dentist
 getDentists() {
      this.dentistService.getDentists(this.clinic_id).subscribe((res) => {
           if(res.message == 'success'){
            res.data.forEach(result => {
              var temp=[];
            temp['providerId'] = result.providerId;
            temp['name'] = result.name;
            this.dentists.push(temp);
            });
           }
            else if(res.status == '401'){
            this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("token", '');
              this._cookieService.put("userid", '');
               this.router.navigateByUrl('/login');
           }
        }, error => {
             $('.ajax-loader').hide(); 
        }    
        );
  }

  add_user(display_name, email, user_type, password,clinic_id,dentist_id) {
  if(dentist_id =='' || dentist_id == undefined)
    dentist_id ='';
      $('.ajax-loader').show();      

  this.rolesUsersService.addRoleUser(display_name, email, user_type, password,clinic_id,dentist_id).subscribe((res) => {
      $('.ajax-loader').hide();      

       //if(res.message == 'success'){
        this.toastr.success('User Added Successfully .');
        this.getUsers();
     //  }
    }, error => {
         $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
    });
  }

  private getUsers() {
  this.rolesUsersService.getUsers().subscribe((res) => {
       if(res.message == 'success'){
        this.rows = res.data;
        this.temp = [...res.data];        
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
         $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
    });
  }

  public roles =[];
  public abc=true;
  public selectedRole: any[] = [];

  public selected_id:any;
  private getRoles() {      
  this.rolesUsersService.getRoles().subscribe((res) => {
       if(res.message == 'success'){ 
        this.roles=[];
         res.data.forEach(result => {
          this.selectedRole['dashboards_'+result.role_id] = false;
          this.selectedRole['memberships_'+result.role_id] = false;
          this.selectedRole['roles_'+result.role_id] = false;
          this.selectedRole['settings_'+result.role_id] = false;
          this.selectedRole['paymentplans_'+result.role_id] = false;
          this.selectedRole['defaulters_'+result.role_id] = false;
          
            var temp=[];
            temp['id'] = result.role_id;
            temp['role'] = result.role;
            temp['permisions'] = result.permisions;
            this.roles.push(temp);
            var dashboards = result.permisions.split(',');
            dashboards.forEach(results=>{
               this.selectedRole[results+'_'+result.role_id] = true;
            })
         });
         // When user will come for the first time
         if(this.roles.length==0){
            var temp=[];
            temp['id'] = "3";
            temp['role'] = "Receptionist";
            temp['permisions'] = "";
            this.roles.push(temp);

            temp=[];
            temp['id'] = "4";
            temp['role'] = "Manager";
            temp['permisions'] = "";
            this.roles.push(temp);

         }
         console.log(this.roles);
       }
        else if(res.status == '401'){
            this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("token", '');
              this._cookieService.put("userid", '');
               this.router.navigateByUrl('/login');
           }
    }, error => {
         $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
    });

  }

  private deleteUser(row) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete User?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.value){
    if(this.rows[row]['id']) {
  this.rolesUsersService.deleteUser(this.rows[row]['id']).subscribe((res) => {
       if(res.message == 'success'){
       // this.notifier.notify( 'success', 'User Removed' ,'vertical');
          this.toastr.success('User Removed.');
          this.getUsers();
       }
        else if(res.status == '401'){
            this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("token", '');
              this._cookieService.put("userid", '');
               this.router.navigateByUrl('/login');
           }
    }, error => {
         $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
    }    
    );
    }
    else {
      this.rows.splice(row, 1);
      this.rows = [...this.rows];
    }
 }
});
  }

  addDentist() {
    var temp ={};
    temp['providerId'] ='Enter Provider Id';
    temp['name'] ='Enter Name';
    var length = this.rows.length;
    this.editing[length + '-providerId'] = true;
    this.editing[length + '-name'] = true;
    this.rows.push(temp);
    this.table =data;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.displayName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }

 updateValue(event, cell, rowIndex) {
  if((this.rows[rowIndex]['providerId']  == 'Enter Provider Id') || (this.rows[rowIndex]['name']  == 'Enter Name')) {
    this.editing[length + '-providerId'] = true;
    this.editing[length + '-name'] = true;
  }
  else {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rolesUsersService.updateRoleUser(this.rows[rowIndex]['id'], this.rows[rowIndex][cell],cell).subscribe((res) => {
       if(res.message == 'success'){
         //this.notifier.notify( 'success', 'User Details Updated' ,'vertical');
         this.toastr.success('User Details Updated.');
         // this.getDentists();
       }
    }, error => {
         $('.ajax-loader').hide(); 
        this.toastr.error('Some Error Occured, Please try Again.');
    }    
    );  
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }
  }

  enableEditing(rowIndex, cell) {
    this.editing[rowIndex + '-' + cell] = true;

  }

}
