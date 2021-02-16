import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie';
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
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _cookieService: CookieService,
    private dentistService: DentistService,
    private router: Router
  ) {
    super();
   }

  ngAfterViewInit() {
    this.dentistList.paginator = this.paginator;
    this.clinic_id$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(id => {
      if (id) {
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
    if(this.currentPage<goPage) this.paginator.nextPage();
    else this.paginator.previousPage();
    this.currentPage = goPage; //make the page active by class
  }

  setPaginationButtons(totalDentist) {
    const totalPages = Math.ceil(totalDentist/this.dentistPageSize);
    for (let i=0; i<totalPages; i++) {
        this.dentistTablePages.push(i+1);
    }
  }

  doFilter = (value: string) => {
    this.dentistList.filter = value.trim().toLocaleLowerCase();
  }

}
