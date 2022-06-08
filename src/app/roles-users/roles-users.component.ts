import { Component, Inject , ViewChild, AfterViewInit, ViewEncapsulation,   ElementRef, OnDestroy } from '@angular/core';
import { RolesUsersService } from './roles-users.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from "@angular/router";
import { EventEmitter , Output} from '@angular/core';
import { DentistService } from '../dentist/dentist.service';
import { ClinicService } from '../clinic/clinic.service';
import { ToastrService } from 'ngx-toastr';
import {FormControl} from '@angular/forms';
import { CookieService } from "ngx-cookie";
import { ITooltipData } from '../shared/tooltip/tooltip.directive';
import { HeaderService } from '../layouts/full/header/header.service';
import Swal from 'sweetalert2';
import { environment } from "../../environments/environment";
@Component({
  selector: 'app-task-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
  styleUrls: ['./roles-users.component.scss'],
 
})

export class DialogOverviewExampleDialogComponent {
  public apiUrl = environment.apiUrl;
   public clinic_id:any ={};
show_dentist = false;
showtooltip:boolean= false;
  public rolesAll:any = { healthscreen: "Clinic Health", morninghuddle: "Morning Huddle", followups: "Follow-Ups", dashboard1: "Clinician Analysis",dashboard2: "Clinician Procedures & Referrals", dashboard3: "Front Desk", dashboard4: "Marketing", dashboard5: "Finances", lostopportunity: "Lost Opportunity", profilesettings: "Settings"};

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private clinicService: ClinicService,private _cookieService: CookieService, private router: Router
  ) {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

    @Output() public onDentist: EventEmitter<any> = new EventEmitter();
   public selected_dentist ={};
   public dentistList = {};
   public user_type;
   public dentist_id;
   public loginUserType = this._cookieService.get("user_type");
    loadDentist(val) {
      this.user_type= val;
      if(val == '4')
        this.show_dentist = true;
    }
  save(data) {
    $('.mat-form-control').click();
    if(data.display_name != undefined && data.email != undefined && data.user_type != '' &&  this.selectedClinics.value != ''){      
      data.selectedClinics= this.selectedClinics.value;
      data.selected_dentist = this.selected_dentist;
      if(this.show_dentist == true)
        this.dialogRef.close(data);
      else if(this.show_dentist == false)
         this.dialogRef.close(data);
    }
  }

  objectsize(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}
  public selectedClinics=new FormControl();
   clinicSelect(event) {
    if(event == false)
      this.unselectDentist();
    if(this.user_type == '4'){
       this.show_dentist = true;
       if(this.selectedClinics.value != null)
        this.getClinicProviders(); 
    } 
    else{
      this.selected_dentist=[];
    }
  }

unselectDentist() {
    var tempArray={};
    var clinicArray = this.selectedClinics.value.toString().split(',');
    clinicArray.forEach(res => {
     tempArray['clinic'+res] = this.selected_dentist['clinic'+res];
    });
    this.selected_dentist = tempArray;
}

selectedDentist(event,i,clinic_id) {
   if(event != 0){
      this.dentistList[clinic_id] = parseInt(event);
      this.selected_dentist['clinic'+clinic_id]= parseInt(event);    
    } else {
      delete this.selected_dentist['clinic'+clinic_id];    
      delete this.dentistList[clinic_id];
    }
}


public clinics=[];
public selectedClinicProviders=[];
  getClinicProviders() {
  this.clinicService.getClinicProviders(this.selectedClinics.value).subscribe((res) => {
      if(res.message == 'success'){
        this.selectedClinicProviders = res.data;
      } else if(res.status == '401'){       
      }
    }, error => {
    });
  }

  checkColumn(i){
    if( i > 50){
      $('.selectedClinicProviders').css({'width':'49%','float':'left','padding':'1%'});
    } else {
      $('.selectedClinicProviders').css({'width':'100%','float':'none','padding':'0px'});
    }
  }
}


@Component({
  selector: 'app-dialog-edit-dialog',
  templateUrl: './dialog-edit.html',
})

export class EditDialogComponent {
  public apiUrl = environment.apiUrl;
   public clinic_id:any ={};
show_dentist = false;

  constructor(
    public dialogEdit: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private clinicService: ClinicService,private _cookieService: CookieService, private router: Router,private rolesUsersService: RolesUsersService
  ) {
    this.loadUserData();

  }
  public selClinics=[];
  public userData:any=[];
  public selectedDentistList:any = []; 
  public loginUserType = this._cookieService.get("user_type");
  loadUserData(){
    this.rolesUsersService.getRoleUserDetails(this.data.id).subscribe((res) => {
      if(res.message == 'success'){
        this.userData = res.data;
        this.userData.users_clinics.forEach(res => {
         this.selClinics.push(res.clinic_id);
         this.selectedDentistList.push('clinic'+res.clinic_id+'-'+res.dentist_id);
         this.selected_dentist['clinic'+res.clinic_id]= res.dentist_id;
        });
        this.selectedClinics.setValue(this.selClinics);
        if(this.userData.user_type == '4')
        this.show_dentist = true;
         this.getClinicProviders(); 
      } else if(res.status == '401'){       
      }
    }, error => {
    });
  }

  onNoClick(): void {
    this.dialogEdit.close();
  }
    @Output() public onDentist: EventEmitter<any> = new EventEmitter();
   public selected_dentist ={};
   public user_type;
   public dentist_id;
    loadDentist(val) {
      this.userData.user_type= val;
      if(val == '4')
        this.show_dentist = true;
    }
    save(userData) {
    $('.mat-form-control').click();
    if(userData.display_name != undefined && userData.email != undefined && userData.user_type != '' &&  this.selectedClinics.value != ''){
      userData.selectedClinics= this.selectedClinics.value;
      userData.selected_dentist = this.selected_dentist;
      if(this.show_dentist == true)
        this.dialogEdit.close(userData);
      else if(this.show_dentist == false)
         this.dialogEdit.close(userData);
    }
  }
  public selectedClinics=new FormControl();
   clinicSelect(event) {
    if(event == false)
      this.unselectDentist();
    if(this.userData.user_type == '4'){
       this.show_dentist = true;
       if(this.selectedClinics.value != null)
        this.getClinicProviders(); 
    } 
    else{
      this.selected_dentist=[];
    }
  }
  unselectDentist() {
    var tempArray={};
    var clinicArray = this.selectedClinics.value.toString().split(',');
    clinicArray.forEach(res => {
     tempArray['clinic'+res] = this.selected_dentist['clinic'+res];
    });
    this.selected_dentist = tempArray;
  }
  selectedDentist(event,i,clinic_id) {
    if(event != 0){
      this.selected_dentist['clinic'+clinic_id]= parseInt(event);    
    } else {
      delete this.selected_dentist['clinic'+clinic_id];    
    }
  }

public clinics=[];
public selectedClinicProviders=[];
  getClinicProviders() {
  this.clinicService.getClinicProviders(this.selectedClinics.value).subscribe((res) => {
      if(res.message == 'success'){
        this.selectedClinicProviders = res.data;
      } else if(res.status == '401'){       
      }
    }, error => {
    });
  }
}

@Component({
  selector: 'app-roles-overview-example-dialog',
  templateUrl: './roles-overview-example.html',
})


export class RolesOverviewExampleDialogComponent {
  public apiUrl = environment.apiUrl;
   public clinic_id:any ={};
   public userPlan :any = 'lite';
  constructor(
    public rolesRef: MatDialogRef<RolesOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cookieService: CookieService
  ) {
    this.userPlan =  this._cookieService.get("user_plan"); 
  }
   public loginUserType = this._cookieService.get("user_type");
  onNoClick(): void {
    this.rolesRef.close();
  }
   @Output() public onAdd: EventEmitter<any> = new EventEmitter();
   public selected_id = '3';
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
  styleUrls: ['./roles-users.component.scss'], 
   encapsulation: ViewEncapsulation.None
})
export class RolesUsersComponent implements AfterViewInit {

  display_name: string;
  email: string;
  user_type ='3';
  fileInput: any ;
  public clinic_id;
  dentist_id = '';
  password:string;
  dentists:any=[];
  userPlan:any = 'lite';
public userTypeLogin:any = '';
public showRoleButton:boolean = false;
public taskVisible:boolean = false;
initiate_clinic() {
  this.taskVisible = false;
  if( window.location.href.includes('test-') || window.location.href.includes('localhost')){
      this.taskVisible = true;
  }
    var val = $('#currentClinic').attr('cid');
    this.clinic_id = val;
    this.getClinics();    
    this.getUsers();
    this.getRoles();    
    this.getDentists();
    this.userTypeLogin = this._cookieService.get("user_type");
    this.userPlan =  this._cookieService.get("user_plan"); 
  }
  ngAfterViewInit() {
    $('.header_filters').removeClass('hide_header'); 
    $('.header_filters').removeClass('flex_direct_mar'); 


   // this.initiate_clinic();

        $('#title').html('Users');
        $('.external_clinic').hide();
        //$('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
  }

  editing = {};
  rows = [];
  temp = [...data];

  loadingIndicator = true;
  reorderable = true;

  columns = [{ prop: 'sr' }, { name: 'displayName' }, { name: 'email' }, { name: 'usertype' }, { name: 'created' }];

  @ViewChild(RolesUsersComponent) table: RolesUsersComponent;
  constructor(private toastr: ToastrService,private rolesUsersService: RolesUsersService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router, private route: ActivatedRoute, private dentistService: DentistService,private clinicService: ClinicService, private headerService: HeaderService) {
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }
  private warningMessage: string;
  public loginUserType = this._cookieService.get("user_type");
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '400px',
      data: { display_name: this.display_name, email: this.email, user_type: this.user_type, password: this.password,dentists:this.dentists,clinics:this.clinics,dentist_id:this.dentist_id, permisions: this.allPermissonTip }
    });
    dialogRef.afterClosed().subscribe(result => {
       if(result != undefined) {
        /* Generate Default Password*/
        var password           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        var charactersLength = characters.length;
        for ( var i = 0; i < 15; i++ ) {
          password += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        /* Generate Default Password*/

        this.rolesUsersService.checkUserEmail(result.email,result.user_type).subscribe((res) => {
          if(res.message == 'success'){
           if(res.data <=0 && res.consultant == null)
           {
               this.add_user(result.display_name, result.email, result.user_type,result.selectedClinics, password,result.selected_dentist);
           }
           else if(res.data > 0 && res.consultant != null && res.consultant != 'another_role')
           {
            this.add_clinic_consultant(res.consultant,result.selectedClinics,result.display_name, result.email);
           }
           else if(res.data > 0  && res.consultant == 'another_role'){
             this.toastr.error("Cannot add consultant user with email address " +result.email+ " - please contact the Jeeve support team for further information");
           }else{
             this.toastr.error("Email Already Exists!");
           }           
          }
        }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });
   }
    });
    
  }
  openRoleDialog(): void {
    const rolesRef = this.dialog.open(RolesOverviewExampleDialogComponent, {
     width: '600px',
      data: { display_name: this.display_name, email: this.email, user_type: this.user_type, password: this.password, roles:this.roles, selectedRole:this.selectedRole, selected_id:this.selected_id,dentists:this.dentists,taskVisible:this.taskVisible,hasPrimeClinics:this.hasPrimeClinics}
    });
    const sub = rolesRef.componentInstance.onAdd.subscribe((val) => {
    this.selected_id = val;
    });
    rolesRef.afterClosed().subscribe(result => { 
       if(result != undefined) {
        this.roles.forEach(res1 => {
        var checkedRoles1='';
        var checkedRoles =[];
        if(result.selectedRole['dashboard1_'+res1.id])
          checkedRoles.push('dashboard1');
        if(result.selectedRole['dashboard2_'+res1.id])
          checkedRoles.push('dashboard2');
        if(result.selectedRole['dashboard3_'+res1.id])
          checkedRoles.push('dashboard3');
        if(result.selectedRole['dashboard4_'+res1.id])
          checkedRoles.push('dashboard4');
        if(result.selectedRole['dashboard5_'+res1.id])
          checkedRoles.push('dashboard5');
        if(result.selectedRole['dashboard6_'+res1.id])
          checkedRoles.push('dashboard6');
        if(result.selectedRole['healthscreen_'+res1.id])
          checkedRoles.push('healthscreen');
        if(result.selectedRole['morninghuddle_'+res1.id])
          checkedRoles.push('morninghuddle');
        if(result.selectedRole['followups_'+res1.id])
          checkedRoles.push('followups');
        if(result.selectedRole['lostopportunity_'+res1.id])
          checkedRoles.push('lostopportunity');
        if(result.selectedRole['tasks_'+res1.id])
          checkedRoles.push('tasks');
        if(result.selectedRole['clinics_'+res1.id])
          checkedRoles.push('clinics');
        if(result.selectedRole['users_'+res1.id])
          checkedRoles.push('users');
        if(result.selectedRole['profilesettings_'+res1.id])
          checkedRoles.push('profilesettings');
        if(result.selectedRole['managepermissions_'+res1.id])
          checkedRoles.push('managepermissions');
        if(result.selectedRole['kpireport_'+res1.id])
          checkedRoles.push('kpireport');  
        
        var checkedRoles1 = checkedRoles.join();
        this.rolesUsersService.saveRoles(res1.id, checkedRoles1).subscribe((res) => {
        if(res.message == 'success'){
          this.toastr.success('Permissions Saved!');
          this.getRoles();
        }
      }, error => {
       this.warningMessage = "Please Provide Valid Inputs!";
      });
      });
      }
    });
  }


  editDialog(row): void {
    const dialogEdit = this.dialog.open(EditDialogComponent, {
       width: '400px',
      data: { id: this.rows[row]['id'],clinics:this.clinics }
    });
    dialogEdit.afterClosed().subscribe(result => {
       if(result != undefined) {
           this.update_user(this.rows[row]['id'],result.display_name, result.email, result.user_type,result.selectedClinics,result.selected_dentist);
           }
    });
  }


  public clinics=[];
  public hasPrimeClinics = '';
//Get Clinics
  private getClinics() {
    this.clinicService.getClinics().subscribe((res) => {
      if(res.message == 'success'){
        this.clinics = res.data;
        this.hasPrimeClinics = res.hasPrimeClinics;
      } else if(res.status == '401'){
        this._cookieService.put("username",'');
        this._cookieService.put("email", '');
        this._cookieService.put("userid", '');
        this.router.navigateByUrl('/login');
      }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }
    );

  }

    // Get Dentist
    getDentists() {
      this.dentistService.getDentists(this.clinic_id).subscribe((res) => {
        this.dentists=[];
           if(res.message == 'success'){
            res.data.forEach(result => {
              var temp=[];
            temp['providerId'] = result.providerId;
            temp['name'] = result.name;
            this.dentists.push(temp);
            });
           }
        }, error => {

          this.warningMessage = "Please Provide Valid Inputs!";
        }    
        );
  }
  
  add_clinic_consultant(usrId,selectedClinics,display_name,email) {
    $('.ajax-loader').show();
    this.rolesUsersService.addUserClinicConsultantMap(usrId,selectedClinics,display_name,email).subscribe((res) => {
      $('.ajax-loader').hide();
         if(res.message == 'success'){
          this.toastr.success('User has been added successfully!');
          this.getUsers();
         } else if(res.message == 'error'){
            this.toastr.error(res.data.message);
         }
      }, error => {
        $('.ajax-loader').hide();
        this.toastr.error('Please Provide Valid Inputs!');
      });
    }

  add_user(display_name, email, user_type, selectedClinic, password,selected_dentist) {
  $('.ajax-loader').show();
  this.rolesUsersService.addRoleUser(display_name, email, user_type, selectedClinic, password,selected_dentist).subscribe((res) => {
    $('.ajax-loader').hide();
       if(res.message == 'success'){
        this.toastr.success('User has been added successfully!');
        this.getUsers();
       } else if(res.message == 'error'){
          this.toastr.error(res.data.message);
       }
    }, error => {
      $('.ajax-loader').hide();
      this.toastr.error('Please Provide Valid Inputs!');
    });
  }

  update_user(id,display_name, email, user_type, selectedClinic,selected_dentist) {
  $('.ajax-loader').show();
  this.rolesUsersService.updateRoleUser(id,display_name, email, user_type, selectedClinic,selected_dentist).subscribe((res) => {
    $('.ajax-loader').hide();
       if(res.message == 'success'){
        this.toastr.success('User has been updated successfully!');
        this.getUsers();
       } else if(res.message == 'error'){
          this.toastr.error(res.data.message);
       }
    }, error => {
      $('.ajax-loader').hide();
      this.toastr.error('Please Provide Valid Inputs!');
    });
  }

  private getUsers() {
    this.rolesUsersService.getUsers().subscribe((res) => {
      this.rows=[];
       if(res.message == 'success'){
        this.rows = res.data;
        this.temp = [...res.data];        
        this.table = data;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });
  }

  public roles =[];
  public abc=true;
  public selectedRole: any[] = [];
  public selected_id:any;
  public showRolesButton:boolean =  false;
  public allPermissonTip:any =  [];

  private getRoles() {      
    this.showRolesButton = false;
    this.rolesUsersService.getRoles().subscribe((res) => { 
       if(res.message == 'success'){ 
        this.roles=[];
        var title = "Roles permissions";
        var tipDiscription = [];
         res.data.forEach(result => {
          if(this.user_type == result.role_id ){
            if(result.permisions.indexOf('healthscreen') >= 0){
            }
          }

          var dashboards = result.permisions.split(',');
          var rr = {'role' : result.role,'permisions' : dashboards};
          tipDiscription.push(rr);

          this.selectedRole['dashboard1_'+result.role_id] = false;
          this.selectedRole['dashboard2_'+result.role_id] = false;
          this.selectedRole['dashboard3_'+result.role_id] = false;
          this.selectedRole['dashboard4_'+result.role_id] = false;
          this.selectedRole['dashboard5_'+result.role_id] = false;
          this.selectedRole['dashboard6_'+result.role_id] = false;
            var temp=[];
            temp['id'] = result.role_id;
            temp['role'] = result.role;
            temp['permisions'] = result.permisions;
            this.roles.push(temp);
            dashboards.forEach(results=>{
               this.selectedRole[results+'_'+result.role_id] = true;
            })
         });
         this.allPermissonTip = {'title' :title, 'info' :tipDiscription};
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });

  }

  private deleteUser(row) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to  delete user?',
      icon: 'warning',
      showCancelButton: true, 
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.value){
          $('.ajax-loader').show();
          if(this.rows[row]['id']) {
          this.rolesUsersService.deleteUser(this.rows[row]['id']).subscribe((res) => {
            $('.ajax-loader').hide();
               if(res.message == 'success'){
                this.toastr.success('User Removed');
                  this.getUsers();
               }
            }, error => {
              this.warningMessage = "Please Provide Valid Inputs!";
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

  enableEditing(rowIndex, cell) {
    this.editing[rowIndex + '-' + cell] = true;

  }

  onActivate(event) {
    if (event.type == 'click' && event.cellIndex != 5) {
      if (event.row) {
        this.editDialog(  event.row.sr - 1);
      }
    }
  }
}
