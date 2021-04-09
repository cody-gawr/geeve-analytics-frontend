import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie";
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DentistService } from '../../dentist/dentist.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-dentist-settings',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.css']
})
export class DentistComponent extends BaseComponent implements AfterViewInit {
  clinic_id$ = new BehaviorSubject<any>(null);
  @Input() set clinicId(value: any) {
    this.clinic_id$.next(value);
  }
  dentistPageSize = 10;
  dentistTablePages: number[] = [];
  currentPage: number = 1;
  dentistList = new MatTableDataSource([]);
  dentistListLoading: boolean = false;
  displayedColumns: string[] = ['providerId', 'name'];
  editing = {};
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _cookieService: CookieService,
    private dentistService: DentistService,
    private router: Router,
    private toastr: ToastrService
  ) {
    super();
  }

  ngAfterViewInit() {
    this.dentistList.paginator = this.paginator;
    this.clinic_id$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(id => {
      if (id) {
        this.getDentists(id);
      }
    })
  }

  handleUnAuthorization() {
    this._cookieService.put("username", '');
    this._cookieService.put("email", '');
    this._cookieService.put("token", '');
    this._cookieService.put("userid", '');
    this.router.navigateByUrl('/login');
  }

  handlePageChange(goPage: number) {
    if (this.currentPage < goPage) this.paginator.nextPage();
    else this.paginator.previousPage();
    this.currentPage = goPage; //make the page active by class
  }

  setPaginationButtons(totalDentist) {
    this.dentistTablePages = [];
    const totalPages = Math.ceil(totalDentist / this.dentistPageSize);
    for (let i = 0; i < totalPages; i++) {
      this.dentistTablePages.push(i + 1);
    }
  }

  doFilter = (value: string) => {
    this.dentistList.filter = value.trim().toLocaleLowerCase();
  }

  getDentists(id) {
    this.dentistService.getDentists(id).subscribe((res) => {
      if (res.message == 'success') {
        this.dentistList.data = res.data;
        this.setPaginationButtons(this.dentistList.data.length);
      }
      else if (res.status == '401') {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error)
    });
  }

  enableEditing(index, column) {
    // this.dentistList.data[index].isEditable = true; 
    this.editing[index + '-' + column] = true;
    Object.keys(this.editing).map(key => {
      this.editing[key] = (key === `${index}-${column}`) ? true : false;
    });
  }

  updateValue(event, column, index) {
    let oldValue = this.dentistList.data[index][column];
    this.editing[index + '-' + column] = false;
    const providerId = this.dentistList.data[index].providerId;
    const updatedValue = event.target.value;
    this.dentistList.data[index][column] = updatedValue;
    if (oldValue !== updatedValue) {
      this.dentistService.updateDentists(providerId, updatedValue, this.clinic_id$.value).pipe(
        takeUntil(this.destroyed$)
      ).subscribe((res) => {
        if (res.message == 'success') {
          this.toastr.success('Dentist Updated');
          this.getDentists(this.clinic_id$.value);
        }
      }, (error) => {
        console.log('error', error);
        this.dentistList.data[index][column] = oldValue;
        this.toastr.success('Opps, Error occurs in updating dentist!');
      });  
    }    
  }

}
