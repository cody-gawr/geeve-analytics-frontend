(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["patient-info-patient-info-module"],{

/***/ "./src/app/patient-info/dialog-overview-example.html":
/*!***********************************************************!*\
  !*** ./src/app/patient-info/dialog-overview-example.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Add/Edit Benefits</h1>\n<div mat-dialog-content>\n\n  <mat-form-field>\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.name\" placeholder=\"Benefits\">\n  </mat-form-field>\n\n  <mat-form-field>\n    <input matInput tabindex=\"1\" type=\"number\" [(ngModel)]=\"data.age\" placeholder=\"No. of sittings\">\n  </mat-form-field>\n\n                     \n  <div class=\"responsive-table\">\n    <mat-table #table [dataSource]=\"dataSource\">\n \n      <ng-container matColumnDef=\"position\">\n        <mat-header-cell *matHeaderCellDef> S.No. </mat-header-cell>\n        <mat-cell *matCellDef=\"let element\"> {{data.position}} </mat-cell>\n      </ng-container>\n\n\n      <ng-container matColumnDef=\"name\">\n        <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>\n        <mat-cell *matCellDef=\"let element\"> {{data.name}} </mat-cell>\n      </ng-container>\n\n     \n      <ng-container matColumnDef=\"age\">\n        <mat-header-cell *matHeaderCellDef> Age </mat-header-cell>\n        <mat-cell *matCellDef=\"let element\"> {{data.age}} </mat-cell>\n        \n      </ng-container>\n\n     \n      <ng-container matColumnDef=\"gender\">\n        <mat-header-cell *matHeaderCellDef> Gender </mat-header-cell>\n        <mat-cell *matCellDef=\"let element\"> {{data.gender}} </mat-cell>\n      </ng-container>\n\n      <ng-container matColumnDef=\"action\">\n          <mat-header-cell *matHeaderCellDef>Action </mat-header-cell>\n          <mat-cell *matCellDef=\"let element\"> {{data.action}} </mat-cell>\n        </ng-container>\n\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n    </mat-table>\n  </div>\n\n  <!--  <input type=\"file\" (change)=\"onChange($event)\"> -->\n</div>\n<div mat-dialog-actions>\n  <button mat-button [mat-dialog-close]=\"data\" tabindex=\"2\" class=\"mat-raised-button mat-dc\">Ok</button>\n  <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\" class=\"mat-raised-button mat-gray\">No Thanks</button>\n</div>"

/***/ }),

/***/ "./src/app/patient-info/patient-info.component.html":
/*!**********************************************************!*\
  !*** ./src/app/patient-info/patient-info.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                Patient Plan Details\n               <!-- ============================================================== -->\n                <!-- column -->\n                <!-- ============================================================== -->\n                <div fxLayout=\"row wrap\">\n                    <!-- Card column -->\n                    <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\" class=\"sa_mattabs_design sa_matforms_design\">\n\n                            <mat-tab-group dynamicHeight>\n                         \n                        <!-- Plan Details tab -->\n                              <mat-tab label=\"Plan Details\">\n                                <form>                                \n                                  <table>\n                                    <tr>\n                                      <th>Payment Amount</th>\n                                      <td>&nbsp;&nbsp;</td>\n                                      <td>${{patient_amount}}</td>\n                                    </tr>\n                                    <tr>\n                                      <th>No. of Members</th>\n                                      <td>&nbsp;&nbsp;</td>\n                                      <td>{{total_subpatient}}</td>\n                                    </tr>\n                                    <tr>\n                                      <th>&nbsp;</th>\n                                     </tr>\n                                   </table>\n                                </form>\n\n                                   \n                                  <ngx-datatable #table class='material responsive-datatable' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\n                                  [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='rows'>\n                             <ngx-datatable-column prop=\"sr\" name=\"sr\">\n                               <ng-template let-column=\"column\" ngx-datatable-header-template>\n                              <span>Id</span>\n                            </ng-template>\n                              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n                                <span>\n                                  {{rowIndex + 1}}\n                                </span>\n                              </ng-template>\n                            </ngx-datatable-column>\n                            <ngx-datatable-column prop=\"sub_patients_name\" name=\"sub_patients_name\">\n                               <ng-template let-column=\"column\" ngx-datatable-header-template>\n                              <span>Name</span>\n                            </ng-template>\n                              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n                                <span >\n                                  {{value}}\n                                </span>\n                                    </ng-template>\n                            </ngx-datatable-column>\n                      \n                             <ngx-datatable-column prop=\"sub_patients_age\" name=\"sub_patients_age\">\n                               <ng-template let-column=\"column\" ngx-datatable-header-template>\n                              <span>Age</span>\n                            </ng-template>\n                              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n                                <span >\n                                  {{value}}\n                                </span>\n                               \n                              </ng-template>\n                            </ngx-datatable-column>\n                      \n                            <ngx-datatable-column prop=\"sub_patients_gender\" name=\"sub_patients_gender\">\n                              <ng-template let-column=\"column\" ngx-datatable-header-template>\n                             <span>Gender</span>\n                           </ng-template>\n                             <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n                               <span >\n                                 {{value}}\n                               </span>\n                              \n                             </ng-template>\n                           </ngx-datatable-column>\n                      \n                        \n                          </ngx-datatable>\n\n                            </mat-tab>\n\n                        <!-- Benefits Used tab -->\n                                <mat-tab label=\"Benefits Used\">\n  \n                                  <div class=\"responsive-table\">\n                                        <mat-table #table [dataSource]=\"dataSource\">\n\n                                          <ng-container matColumnDef=\"position\">\n                                            <mat-header-cell *matHeaderCellDef> S.No. </mat-header-cell>\n                                            <mat-cell *matCellDef=\"let element\"> {{element.position}} </mat-cell>\n                                          </ng-container>\n                              \n\n                                          <ng-container matColumnDef=\"name\">\n                                            <mat-header-cell *matHeaderCellDef> Benefits </mat-header-cell>\n                                            <mat-cell *matCellDef=\"let element\"> {{element.name}} </mat-cell>\n                                          </ng-container>\n                              \n                                          <ng-container matColumnDef=\"age\">\n                                            \n                                            <mat-header-cell *matHeaderCellDef> Progress %age </mat-header-cell>\n                                            <!-- <mat-cell *matCellDef=\"let element\"> {{element.age}} </mat-cell> -->\n                                            <mat-cell>\n                                                <mat-progress-bar style=\"width:20%\" *matCellDef=\"let element\" mode=\"determinate\" value=\"40\"></mat-progress-bar>\n                                              </mat-cell>\n                                           </ng-container>\n                              \n                                          <ng-container matColumnDef=\"gender\">\n                                            <mat-header-cell *matHeaderCellDef> Status </mat-header-cell>\n                                            <mat-cell *matCellDef=\"let element\"> {{element.gender}} </mat-cell>\n                                          </ng-container>\n                                \n                                          <ng-container matColumnDef=\"action\">\n                                              <mat-header-cell *matHeaderCellDef>Action </mat-header-cell>\n                                              <!-- <mat-cell *matCellDef=\"let element\"> {{element.action}} </mat-cell> -->\n                                              <a class=\"action_btn golden mat-raised-button\" mat-raised-button *matCellDef=\"let element\" title= 'action' (click)=\"openDialog()\"><i class=\"ti-settings  m-r-10\"></i></a>\n\n                                              <!-- <button class=\"mat-raised-button ti-settings  m-r-10\" *matCellDef=\"let element\" mat-raised-button ></button> -->\n                                            </ng-container>\n\n                                          <ng-container matColumnDef=\"completiondate\">\n                                              <mat-header-cell *matHeaderCellDef> Completion Date </mat-header-cell>\n                                              <mat-cell *matCellDef=\"let element\"> {{element.gender}} </mat-cell>\n                                            </ng-container>\n                                                          \n\n\n                                            <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n                                          <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n                                        </mat-table>\n                                      </div>\n                                </mat-tab>\n\n                      <!-- Contract Upload tab -->\n                                <mat-tab label=\"Contract Upload\">\n                             \n                                  <form [formGroup]=\"form\" class=\"basic-form\" (ngSubmit)=\"onSubmit()\">\n                                    <div class=\"bd_UpoadImage\" fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                        <label>Upload Agreement</label><br>\n                                        <div class=\"upload-btn\">\n                                            <span>Choose file</span>\n                                            <input class=\"\" type=\"file\" placeholder=\"\" name= \"file\" id=\"file\" (change)=\"uploadImage($event.target.files)\">\n                                            <input type='hidden'  placeholder=\"\" id=\"imageURL\" >\n                                        </div>\n                                                          \n                                     </div>\n                               \n                                   <p>\n                                      <button mat-raised-button color=\"dc\">Save</button>\n                                   </p>\n                                   </form>\n                                  <p *ngIf=\"contract_url; else empty\">\n                                    Download Agreement\n                                    <a mat-raised-button class=\"contractupload\" color=\"accent\" href=\"{{contract_url}}\">Download</a>\n                                </p>\n                                </mat-tab>\n\n                    <!-- Payment History tab -->\n\n                                <mat-tab label=\"Payment History\">\n                                 \n                                                        \n                                    <div class=\"responsive-table\">\n                                        <mat-table #table [dataSource]=\"dataSource\">\n                                     \n                                          <ng-container matColumnDef=\"position\">\n                                            <mat-header-cell *matHeaderCellDef> S.No. </mat-header-cell>\n                                            <mat-cell *matCellDef=\"let element\"> {{element.position}} </mat-cell>\n                                          </ng-container>\n                              \n                                       \n                                          <ng-container matColumnDef=\"name\">\n                                            <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>\n                                            <mat-cell *matCellDef=\"let element\"> {{element.name}} </mat-cell>\n                                          </ng-container>\n                              \n                                         \n                                          <ng-container matColumnDef=\"age\">\n                                            <mat-header-cell *matHeaderCellDef> Age </mat-header-cell>\n                                            <mat-cell *matCellDef=\"let element\"> {{element.age}} </mat-cell>\n                                            \n                                          </ng-container>\n\n                                        \n                                          <ng-container matColumnDef=\"gender\">\n                                            <mat-header-cell *matHeaderCellDef> Gender </mat-header-cell>\n                                            <mat-cell *matCellDef=\"let element\"> {{element.gender}} </mat-cell>\n                                          </ng-container>\n                              \n                                          <ng-container matColumnDef=\"action\">\n                                              <mat-header-cell *matHeaderCellDef>Action </mat-header-cell>\n                                              <mat-cell *matCellDef=\"let element\"> {{element.action}} </mat-cell>\n                                            </ng-container>\n                                            \n                                          <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n                                          <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n                                        </mat-table>\n                                      </div>\n\n                                </mat-tab>\n\n                            </mat-tab-group>\n                       </div>\n                </div>\n\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/patient-info/patient-info.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/patient-info/patient-info.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%; }\n\n.example-full-width {\n  width: 90%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9wYXRpZW50LWluZm8vcGF0aWVudC1pbmZvLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQWdCO0VBQ2hCLGlCQUFnQjtFQUNoQixZQUFXLEVBQ1o7O0FBRUQ7RUFDRSxXQUFVLEVBQ1giLCJmaWxlIjoic3JjL2FwcC9wYXRpZW50LWluZm8vcGF0aWVudC1pbmZvLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4YW1wbGUtZm9ybSB7XG4gIG1pbi13aWR0aDogMTUwcHg7XG4gIG1heC13aWR0aDogNTAwcHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uZXhhbXBsZS1mdWxsLXdpZHRoIHtcbiAgd2lkdGg6IDkwJTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/patient-info/patient-info.component.ts":
/*!********************************************************!*\
  !*** ./src/app/patient-info/patient-info.component.ts ***!
  \********************************************************/
/*! exports provided: DialogOverviewExampleDialogComponent, PatientInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogOverviewExampleDialogComponent", function() { return DialogOverviewExampleDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientInfoComponent", function() { return PatientInfoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _patient_info_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./patient-info.service */ "./src/app/patient-info/patient-info.service.ts");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var ELEMENT_DATA = [
    { position: 1, name: 'sam', age: 22, gender: 'MALE', action: '2' },
    { position: 2, name: 'ron', age: 23, gender: 'MALE', action: '3' },
    { position: 3, name: 'justin', age: 43, gender: 'MALE', action: '4' },
    { position: 4, name: 'thomas', age: 23, gender: 'MALE', action: '5' },
    { position: 5, name: 'timber', age: 10, gender: 'MALE', action: '5' },
    { position: 6, name: 'elesa', age: 12, gender: 'FEMALE', action: '5' },
];
var DialogOverviewExampleDialogComponent = /** @class */ (function () {
    function DialogOverviewExampleDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    DialogOverviewExampleDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialog-overview-example-dialog',
            template: __webpack_require__(/*! ./dialog-overview-example.html */ "./src/app/patient-info/dialog-overview-example.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_5__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogRef"], Object])
    ], DialogOverviewExampleDialogComponent);
    return DialogOverviewExampleDialogComponent;
}());

var PatientInfoComponent = /** @class */ (function () {
    function PatientInfoComponent(fb, dialog, patientInfoService, route, _cookieService, router, breakpointObserver) {
        var _this = this;
        this.fb = fb;
        this.dialog = dialog;
        this.patientInfoService = patientInfoService;
        this.route = route;
        this._cookieService = _cookieService;
        this.router = router;
        this.color = 'primary';
        this.mode = 'determinate';
        this.value = 50;
        this.bufferValue = 75;
        this.id = {};
        this.displayedColumns = ['position', 'name', 'age', 'gender', 'action'];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableDataSource"](ELEMENT_DATA);
        this.rows = [];
        //  this.clinic_id = this.route.snapshot.paramMap.get("id");
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(function (result) {
            _this.displayedColumns = result.matches ?
                ['position', 'name', 'age', 'gender', 'action'] :
                ['position', 'name', 'age', 'gender', 'action'];
        });
        this.options = fb.group({
            hideRequired: false,
            floatLabel: 'auto'
        });
    }
    PatientInfoComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    PatientInfoComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
            width: '250px',
            data: { position: this.position, name: this.name, age: this.age, gender: this.gender }
        });
    };
    PatientInfoComponent.prototype.ngOnInit = function () {
        this.id = this.route.snapshot.paramMap.get("id");
        this.getSubPatients();
        this.getPatientContract();
        $('.header_filters').removeClass('hide_header');
        $('nb.header_filters').removeClass('flex_direct_mar');
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
        this.route.params.subscribe(function (params) {
            // this.getClinicGoals();
            $('#title').html('Patient Plan Detail');
        });
        this.form = this.fb.group({});
    };
    // For form validator
    // email = new FormControl('', [Validators.required, Validators.email]);
    // // Sufix and prefix
    // hide = true;
    // getErrorMessage() {
    //   return this.email.hasError('required')
    //     ? 'You must enter a value'
    //     : this.email.hasError('email')
    //       ? 'Not a valid email'
    //       : '';
    // }
    PatientInfoComponent.prototype.getSubPatients = function () {
        var _this = this;
        this.patientInfoService.getSubPatients(this.id).subscribe(function (res) {
            if (res.message == 'success') {
                _this.rows = res.data[0]['sub_patients'];
                _this.patient_amount = res.data[0]['total_amount'];
                _this.total_subpatient = res.data[0]['sub_patients'].length;
            }
            else if (res.status == '401') {
                _this._cookieService.put("username", '');
                _this._cookieService.put("email", '');
                _this._cookieService.put("token", '');
                _this._cookieService.put("userid", '');
                _this.router.navigateByUrl('/login');
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    PatientInfoComponent.prototype.getPatientContract = function () {
        var _this = this;
        this.patientInfoService.getPatientContract(this.id).subscribe(function (res) {
            if (res.message == 'success') {
                _this.contract_url = res.data['contract_upload'];
            }
            else if (res.status == '401') {
                _this._cookieService.put("token", '');
                _this._cookieService.put("userid", '');
                _this.router.navigateByUrl('/login');
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    PatientInfoComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.imageURL == undefined) {
            alert("Please Upload file");
        }
        else {
            this.patientInfoService.updatePatients(this.id, this.imageURL).subscribe(function (res) {
                console.log(_this.imageURL);
                if (res.message == 'success') {
                    alert('Document Uploaded');
                    _this.getPatientContract();
                }
            }, function (error) {
                _this.warningMessage = "Please Provide Valid Inputs!";
            });
        }
    };
    PatientInfoComponent.prototype.uploadImage = function (files) {
        var _this = this;
        this.fileToUpload = files.item(0);
        var extension = this.fileToUpload.name.split('.')[1].toLowerCase();
        if (extension !== "pdf") {
            alert('Please Upload PDF file');
            return null;
        }
        else {
            var formData = new FormData();
            formData.append('file', this.fileToUpload, this.fileToUpload.name);
            this.patientInfoService.contractUpload(formData).subscribe(function (res) {
                if (res.message == 'success') {
                    _this.imageURL = res.data;
                }
            });
        }
    };
    PatientInfoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-formlayout',
            template: __webpack_require__(/*! ./patient-info.component.html */ "./src/app/patient-info/patient-info.component.html"),
            styles: [__webpack_require__(/*! ./patient-info.component.scss */ "./src/app/patient-info/patient-info.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"], _patient_info_service__WEBPACK_IMPORTED_MODULE_2__["PatientInfoService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_6__["BreakpointObserver"]])
    ], PatientInfoComponent);
    return PatientInfoComponent;
}());



/***/ }),

/***/ "./src/app/patient-info/patient-info.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/patient-info/patient-info.module.ts ***!
  \*****************************************************/
/*! exports provided: PatientInfoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientInfoModule", function() { return PatientInfoModule; });
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _patient_info_routing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./patient-info.routing */ "./src/app/patient-info/patient-info.routing.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/index.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng2-file-upload/ng2-file-upload */ "./node_modules/ng2-file-upload/ng2-file-upload.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/esm5/tree.es5.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ng-multiselect-dropdown */ "./node_modules/ng-multiselect-dropdown/fesm5/ng-multiselect-dropdown.js");
/* harmony import */ var _patient_info_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./patient-info.component */ "./src/app/patient-info/patient-info.component.ts");
/* harmony import */ var _patient_info_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./patient-info.service */ "./src/app/patient-info/patient-info.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var PatientInfoModule = /** @class */ (function () {
    function PatientInfoModule() {
    }
    PatientInfoModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_patient_info_routing__WEBPACK_IMPORTED_MODULE_7__["PatientInfoRoutes"]),
                _demo_material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__["FlexLayoutModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                ngx_quill__WEBPACK_IMPORTED_MODULE_9__["QuillModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatInputModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["NgxDatatableModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_10__["FileUploadModule"],
                _angular_material_tree__WEBPACK_IMPORTED_MODULE_11__["MatTreeModule"],
                _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_12__["MatDatepickerModule"],
                ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_14__["NgMultiSelectDropDownModule"].forRoot()
            ],
            providers: [
                _patient_info_service__WEBPACK_IMPORTED_MODULE_16__["PatientInfoService"]
            ],
            entryComponents: [_patient_info_component__WEBPACK_IMPORTED_MODULE_15__["DialogOverviewExampleDialogComponent"]],
            declarations: [
                _patient_info_component__WEBPACK_IMPORTED_MODULE_15__["PatientInfoComponent"], _patient_info_component__WEBPACK_IMPORTED_MODULE_15__["DialogOverviewExampleDialogComponent"]
            ]
        })
    ], PatientInfoModule);
    return PatientInfoModule;
}());



/***/ }),

/***/ "./src/app/patient-info/patient-info.routing.ts":
/*!******************************************************!*\
  !*** ./src/app/patient-info/patient-info.routing.ts ***!
  \******************************************************/
/*! exports provided: PatientInfoRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientInfoRoutes", function() { return PatientInfoRoutes; });
/* harmony import */ var _patient_info_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./patient-info.component */ "./src/app/patient-info/patient-info.component.ts");

var PatientInfoRoutes = [
    {
        path: '',
        component: _patient_info_component__WEBPACK_IMPORTED_MODULE_0__["PatientInfoComponent"],
        data: {
            title: 'Patient Detail'
        }
    }
];


/***/ }),

/***/ "./src/app/patient-info/patient-info.service.ts":
/*!******************************************************!*\
  !*** ./src/app/patient-info/patient-info.service.ts ***!
  \******************************************************/
/*! exports provided: PatientInfoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientInfoService", function() { return PatientInfoService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PatientInfoService = /** @class */ (function () {
    function PatientInfoService(http, _cookieService) {
        this.http = http;
        this._cookieService = _cookieService;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl;
        //append headers
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
    }
    PatientInfoService.prototype.getSubPatients = function (patient_id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Patients/getAllPatientByID?patient_id=" + patient_id + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    PatientInfoService.prototype.getPatientContract = function (patient_id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Patients/getPatientContract?patient_id=" + patient_id + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    PatientInfoService.prototype.updatePatients = function (patient_id, contract_upload) {
        var formData = new FormData();
        formData.append('patient_id', patient_id);
        // formData.append('member_plan_id',member_plan_id);
        // formData.append('status',patient_status);
        // formData.append('token', token);
        formData.append('contract_upload', contract_upload);
        return this.http.post(this.apiUrl + "/Patients/UploadContract/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            //      console.log(response);
            return response;
        }));
    };
    PatientInfoService.prototype.contractUpload = function (formData) {
        formData.append('id', this._cookieService.get("userid"));
        formData.append('token', this._cookieService.get("token"));
        return this.http.post(this.apiUrl + "/Patients/logoUpload/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            // console.log(response);
            return response;
        }));
    };
    PatientInfoService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], PatientInfoService);
    return PatientInfoService;
}());



/***/ })

}]);
//# sourceMappingURL=patient-info-patient-info-module.js.map