import { Component, Inject , ViewChild, AfterViewInit } from '@angular/core';
import { RolesUsersService } from './roles-users.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatInputModule } from '@angular/material';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventEmitter , Output, Input} from '@angular/core';
import { DentistService } from '../dentist/dentist.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html',
})


export class DialogOverviewExampleDialogComponent {
   public clinic_id:any ={};
show_dentist = false;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
    @Output() public onDentist: EventEmitter<any> = new EventEmitter();
   public selected_id;

    loadDentist(val) {
      if(val == '4')
        this.show_dentist = true;
    }
    save(data) {
    $('.mat-form-control').click();
    if(data.display_name != undefined && data.email != undefined && data.user_type != ''  ){
        this.dialogRef.close(data);
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
    public rolesRef: MatDialogRef<RolesOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

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
  user_type='';
  fileInput: any ;
  public clinic_id;
  dentist_id = '';
password:string;
dentists:any=[];
initiate_clinic() {
    var val = $('#currentClinic').attr('cid');
    this.clinic_id = val;
     this.getUsers();
    this.getRoles();
    this.getDentists();
  }
  ngAfterViewInit() {
    $('.header_filters').removeClass('hide_header'); 
    $('.header_filters').removeClass('flex_direct_mar'); 
    this.initiate_clinic();

    this.clinic_id = this.route.snapshot.paramMap.get("id");
        $('#title').html('Users');
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
  }
  editing = {};
  rows = [];
  temp = [...data];

  loadingIndicator = true;
  reorderable = true;

  columns = [{ prop: 'sr' }, { name: 'displayName' }, { name: 'email' }, { name: 'usertype' }, { name: 'created' }];

  @ViewChild(RolesUsersComponent) table: RolesUsersComponent;
  constructor(private toastr: ToastrService,private rolesUsersService: RolesUsersService, public dialog: MatDialog,private _cookieService: CookieService, private router: Router, private route: ActivatedRoute, private dentistService: DentistService) {
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }
  private warningMessage: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
       width: '400px',
      data: { display_name: this.display_name, email: this.email, user_type: this.user_type, password: this.password,dentists:this.dentists,dentist_id:this.dentist_id }
    });
    dialogRef.afterClosed().subscribe(result => {
       if(result != undefined) {
     this.rolesUsersService.checkUserEmail(result.email).subscribe((res) => {
           if(res.message == 'success'){
           if(res.data <=0)
           this.add_user(result.display_name, result.email, result.user_type, 'jeeveanalytics',this.clinic_id,result.dentist_id);
            else
           this.toastr.error("Email Already Exists!");
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
      data: { display_name: this.display_name, email: this.email, user_type: this.user_type, password: this.password, roles:this.roles, selectedRole:this.selectedRole, selected_id:this.selected_id,dentists:this.dentists}
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
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }    
        );
  }

  add_user(display_name, email, user_type, password,clinic_id,dentist_id) {
  if(dentist_id =='' || dentist_id == undefined)
    dentist_id ='';
  this.rolesUsersService.addRoleUser(display_name, email, user_type, password,clinic_id,dentist_id).subscribe((res) => {
       if(res.message == 'success'){
        this.toastr.success('User has been added successfully!');
        this.getUsers();
       }
    }, error => {
      this.toastr.error('Please Provide Valid Inputs!');
    });
  }

  private getUsers() {
    this.rolesUsersService.getUsers(this.clinic_id).subscribe((res) => {
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
  private getRoles() {      
  this.rolesUsersService.getRoles().subscribe((res) => {
       if(res.message == 'success'){ 
        this.roles=[];
         res.data.forEach(result => {
          if(result.id != '1' && result.id != '2') {
          this.selectedRole['dashboard1_'+result.role_id] = false;
          this.selectedRole['dashboard2_'+result.role_id] = false;
          this.selectedRole['dashboard3_'+result.role_id] = false;
          this.selectedRole['dashboard4_'+result.role_id] = false;
          this.selectedRole['dashboard5_'+result.role_id] = false;

            var temp=[];
            temp['id'] = result.role_id;
            temp['role'] = result.role;
            temp['permisions'] = result.permisions;
            this.roles.push(temp);
            var dashboards = result.permisions.split(',');
            dashboards.forEach(results=>{
               this.selectedRole[results+'_'+result.role_id] = true;
            })
          }
         });
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    });

  }

  private deleteUser(row) {
           if(confirm("Are you sure to delete User?")) {
    if(this.rows[row]['id']) {
  this.rolesUsersService.deleteUser(this.rows[row]['id']).subscribe((res) => {
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
  }

  addDentist() {
    console.log(this.rows);
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
        this.toastr.success('User Details Updated');
         // this.getDentists();
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
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
