import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  ViewEncapsulation,
  Inject,
} from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { DentistService } from '../../dentist/dentist.service';
import { BaseComponent } from '../base/base.component';
import { MatSort } from '@angular/material/sort';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
  MatLegacyDialog as MatDialog,
} from '@angular/material/legacy-dialog';
import { environment } from '../../../environments/environment';
import { AppConstants } from '../../app.constants';
import { LocalStorageService } from '../../shared/local-storage.service';

const START_JEEVE_ID = 10000;
/************* Add Jeeve Names ***********/

@Component({
  selector: 'add-jeeve-name',
  templateUrl: './add-jeeve-name.html',
  encapsulation: ViewEncapsulation.None,
})
export class AddJeeveNameComponent {
  public jeeveId: any = 1;
  public jeeveName: any = '';
  public update: any = false;
  public startid = START_JEEVE_ID;

  constructor(
    public dialogRef: MatDialogRef<AddJeeveNameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cookieService: CookieService,
    private router: Router,
    private dentistService: DentistService,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  updatevalue(event, index) {
    this.data.jeeveNames[START_JEEVE_ID + index] = $.trim(event.target.value);
  }

  save(data) {
    var name = JSON.stringify(data.jeeveNames);
    this.dentistService.updateJeeveName(data.clinic_id, name).subscribe(
      res => {
        if (res.status == 200) {
          this.dialogRef.close();
        }
      },
      error => {
        console.log('error', error);
      },
    );
  }
}

/************* Add Jeeve Names ***********/

@Component({
  selector: 'app-dentist-settings',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.css'],
})
export class DentistComponent extends BaseComponent implements AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  //clinic_id$ = new BehaviorSubject<any>(null);
  clinic_id$: string;
  @Input() set clinicId(value: any) {
    //this.clinic_id$.next(value);
    this.clinic_id$ = value;
  }
  public apiUrl = environment.apiUrl;

  public advanceOption: boolean = false;
  dentistPageSize = 10;
  dentistTablePages: number[] = [];
  currentPage: number = 1;
  dentistList = new MatTableDataSource([]);
  dentistListLoading: boolean = false;
  //displayedColumns: string[] = ['providerId', 'name','position', 'appbook','jeeve_id','is_active'];
  get displayedColumns() {
    return this.isD4w
      ? ['providerId', 'name', 'position', 'appbook', 'jeeve_id', 'is_active']
      : ['providerId', 'name', 'position', 'jeeve_id', 'is_active'];
  }
  jeeveProviderIds: any = [];
  appBooks: any = [];
  editing = {};
  public isShowInactive: boolean;

  public userPlan: any = 'lite';
  public activeDentist: any = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public get isExact() {
    return this.localStorageService.isClinicPmsType(this.clinic_id$, 'exact');
    // return this.clinic_id$.pipe(
    //   takeUntil(this.destroyed$),
    //   map(v => this.localStorageService.isClinicPmsType(v, 'exact'))
    // )
    //return this.localStorageService.isEachClinicExact(this.clinic_id$);
  }

  public get isD4w() {
    return this.localStorageService.isClinicPmsType(this.clinic_id$, 'd4w');
    // return this.clinic_id$.pipe(
    //   takeUntil(this.destroyed$),
    //   map(v => this.localStorageService.isClinicPmsType(v, 'd4w'))
    // )
    //return this.localStorageService.isEachClinicPmsD4w(this.clinic_id$);
  }

  constructor(
    private _cookieService: CookieService,
    private dentistService: DentistService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public constants: AppConstants,
    private localStorageService: LocalStorageService,
  ) {
    super();
  }

  ngAfterViewInit() {
    this.userPlan = this._cookieService.get('user_plan');
    this.dentistList.paginator = this.paginator;
    this.dentistList.sort = this.sort;
    this.getDentists(this.clinic_id$);
    this.getJeeveNames(this.clinic_id$);
    // this.clinic_id$.pipe(
    //   takeUntil(this.destroyed$)
    // ).subscribe(id => {
    //   if (id) {

    //   }
    // })
  }
  advanceToggle(event) {
    this.advanceOption = event.checked;
  }
  handleUnAuthorization() {
    this._cookieService.put('username', '');
    this._cookieService.put('email', '');
    this._cookieService.put('userid', '');
    this.router.navigateByUrl('/login');
  }

  handlePageChange(goPage: number) {
    if (this.currentPage < goPage) {
      for (let i = this.currentPage; i < goPage; i++) {
        this.paginator.nextPage();
      }
    } else {
      for (let i = goPage; i < this.currentPage; i++) {
        this.paginator.previousPage();
      }
    }
    this.currentPage = goPage; //make the page active by class
  }

  setPaginationButtons(totalDentist) {
    this.dentistTablePages = [];
    const totalPages = Math.ceil(totalDentist / this.dentistPageSize);
    // after search when user clear search set page to 1
    this.currentPage = this.currentPage > totalPages ? 1 : this.currentPage;
    for (let i = 0; i < totalPages; i++) {
      this.dentistTablePages.push(i + 1);
    }
  }

  doFilter = (value: string) => {
    this.dentistList.filter = value.trim().toLocaleLowerCase();
    let pageNum = this.dentistList.filteredData.length;
    this.setPaginationButtons(pageNum);
  };

  getAppBook(id, dentData) {
    this.dentistService.getAppbook(id).subscribe(
      res => {
        var temp = {};
        var dData = [];
        if (res.status == 200) {
          dentData.forEach(element => {
            if (element.app_book_id != '' && element.app_book_id != null) {
              temp = {
                app_book_id: element.app_book_id,
                disabled: true,
              };
              dData.push(temp);
            } else {
              temp = {
                app_book_id: element.app_book_id,
                disabled: false,
              };
              dData.push(temp);
            }
          });

          var result = res.body.data.map(ele => {
            let disableFlag = dData.find(
              appBookid => appBookid['app_book_id'] === ele['app_book_id'],
            );
            return { ...ele, ...disableFlag };
          });
          this.appBooks = result;
        } else if (res.status == 401) {
          this.handleUnAuthorization();
        }
      },
      error => {
        console.log('error', error);
      },
    );
  }

  getDentists(id) {
    this.dentistListLoading = true;
    this.dentistService.getDentists(id, 1).subscribe(
      res => {
        if (res.status == 200) {
          this.dentistListLoading = false;
          if (this.isD4w) {
            this.getAppBook(id, res.body.data);
          }
          this.jeeveProviderIds = [];
          for (let i = 1; i <= 9; i++) {
            this.jeeveProviderIds.push({ id: START_JEEVE_ID + i, name: 'Jeeve Provider ' + i });
          }
          let activeData = [];
          let inactiveData = [];

          // isShowInactive
          res.body.data.filter(r => {
            r.is_active == 1 ? activeData.push(r) : inactiveData.push(r);
          });
          this.dentistList.data = this.isShowInactive ? inactiveData : activeData;
          this.setPaginationButtons(this.dentistList.data.length);
          let activeDnt: any = res.body.data.filter(p => p.is_active == 1);
          this.activeDentist = activeDnt.length;
        } else if (res.status == 401) {
          this.handleUnAuthorization();
        }
      },
      error => {
        console.log('error', error);
      },
    );
  }
  public jeeveNames: any = {};
  getJeeveNames(id) {
    this.dentistService.getJeeveNames(id).subscribe(
      res => {
        if (res.status == 200) {
          for (var i = START_JEEVE_ID + 1; i <= START_JEEVE_ID + 9; i++) {
            if (typeof res.body.data[i] != 'undefined') {
              this.jeeveNames[i] = res.body.data[i];
            } else {
              this.jeeveNames[i] = 'undefined';
            }
          }
        } else if (res.status == 401) {
          this.handleUnAuthorization();
        }
      },
      error => {},
    );
  }

  enableEditing(index, column) {
    // this.dentistList.data[index].isEditable = true;
    this.editing[index + '-' + column] = true;
    Object.keys(this.editing).map(key => {
      this.editing[key] = key === `${index}-${column}` ? true : false;
    });
  }

  updateValue(event, column, index, providerId, updatedValue) {
    if (event.type == 'keyup' && event.keyCode != 13 && column == 'name') {
      return false;
    }
    let updatedColumn = '';
    if (column == 'position') {
      updatedColumn = 'position';
      updatedValue = event.target.value;
    }

    if (column == 'name') {
      updatedColumn = 'name';
      updatedValue = event.target.value;
    }
    var jeeveId = '';
    if (column == 'jeeve_id') {
      jeeveId = event.target.value;
    }
    var appBookId = '';
    if (column == 'appBookId') {
      appBookId = event.target.value;
    }
    var isActive = null;
    if (column == 'is_active') {
      if (this.userPlan == 'lite') {
        if (this.activeDentist >= 2 || !event.target.checked) {
          this.toastr.error(
            'Please contact the Jeeve support team to change your dentist selections',
          );
          $(event.target).prop('checked', !event.target.checked);
          return false;
        }
      }
      isActive = 0;
      if (event.target.checked) {
        isActive = 1;
      }
    }
    this.dentistService
      .updateDentists(
        providerId,
        updatedValue,
        this.clinic_id$,
        isActive,
        jeeveId,
        updatedColumn,
        appBookId,
        this.jeeveNames[jeeveId],
      )
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        res => {
          this.editing[index + '-' + column] = false;
          if (res.status == 200) {
            this.toastr.success('Dentist Updated');
            this.getDentists(this.clinic_id$);
          }
        },
        error => {
          this.toastr.error('Opps, Error occurs in updating dentist!');
        },
      );
    return true;
  }

  openSetJeeveName() {
    const dialogRef = this.dialog.open(AddJeeveNameComponent, {
      width: '650px',
      data: { clinic_id: this.clinic_id$, jeeveNames: this.jeeveNames },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDentists(this.clinic_id$);
    });
  }

  showActiveToggle(e) {
    this.isShowInactive = e.checked;
    this.getDentists(this.clinic_id$);
  }
}
