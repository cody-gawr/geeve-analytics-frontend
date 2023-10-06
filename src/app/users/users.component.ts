import { Component, AfterViewInit } from '@angular/core';
import { UsersService } from './users.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

declare var require: any;
const data: any = require('@/assets/company.json');
@Component({
  selector: 'app-table-filter',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit {
  name: string;
  address: string;
  contact_name: string;
  fileInput: any;

  ngAfterViewInit() {
    this.getUsers();
    $('#title').html('Registered Clinic Owners');
    $('.header_filters').addClass('hide_header');
  }

  data = [
    {
      dentist: 'Ethel Price',
      provider: 'female',
      company: 'Johnson',
      age: 22,
    },
  ];
  editing = {};
  rows = [];
  temp = [...data];
  table;
  loadingIndicator = true;
  reorderable = true;

  columns = [
    { prop: 'sr' },
    { name: 'username' },
    { name: 'email' },
    { name: 'plan' },
    { name: 'user_type' },
    { name: 'created' },
  ];

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    private _cookieService: CookieService,
    private router: Router
  ) {
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }
  private warningMessage: string;

  private getUsers() {
    this.usersService.getUsers().subscribe(
      res => {
        if (res.status == 200) {
          this.rows = res.body.data;
          this.temp = [...res.body.data];
          this.table = data;
        }
      },
      error => {
        this.warningMessage = 'Please Provide Valid Inputs!';
      }
    );
  }
  private deleteUsers(row) {
    if (confirm('Are you sure to delete this user?')) {
      if (this.rows[row]['id']) {
        this.usersService.deleteUser(this.rows[row]['id']).subscribe(
          res => {
            if (res.status == 200) {
              alert('User Removed');
              this.getUsers();
            }
          },
          error => {
            this.warningMessage = 'Please Provide Valid Inputs!';
          }
        );
      } else {
        this.rows.splice(row, 1);
        this.rows = [...this.rows];
      }
    }
  }
  addDentist() {
    var temp = {};
    temp['providerId'] = 'Enter Provider Id';
    temp['name'] = 'Enter Name';
    var length = this.rows.length;
    this.editing[length + '-providerId'] = true;
    this.editing[length + '-name'] = true;

    this.rows.push(temp);
    this.table = data;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.username.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }
  updateValue(event, cell, rowIndex) {
    /*    this.editing[rowIndex + '-' + cell] = false;
    if(event.target.value == '')
      alert('Value cannot be empty!');
    else {
    this.rows[rowIndex][cell] = event.target.value;
    this.usersService.updateUser(this.rows[rowIndex]['id'], this.rows[rowIndex][cell],cell).subscribe((res) => {
       if(res.status == 200){
        alert('User Updated');
          this.getUsers();
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );  
    this.rows = [...this.rows];
  }*/
  }

  enableEditing(rowIndex, cell) {
    //this.editing[rowIndex + '-' + cell] = true;
  }
}
