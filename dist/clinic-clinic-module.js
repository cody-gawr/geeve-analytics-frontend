(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["clinic-clinic-module"],{

/***/ "./src/app/clinic/clinic.component.html":
/*!**********************************************!*\
  !*** ./src/app/clinic/clinic.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-content>\n      \n        <mat-card-title>Clinics  <button class=\"sa-pull-right mat-raised-button mat-gray\" mat-raised-button (click)=\"openDialog()\" disabled =\"false\"  *ngIf= \"clinicscount > createdClinicsCount\">Add Clinic</button></mat-card-title>\n\n        <button class=\"sa-pull-right mat-raised-button mat-gray mr-15\" mat-raised-button (click)=\"openLimitDialog()\" *ngIf= \"clinicscount <= createdClinicsCount\">Add Clinic</button>\n\n        <mat-form-field>\n            <input matInput type='text' class=\"form-control\" placeholder='Type to filter Clinic name...' (keyup)='updateFilter($event)'\n            />\n        </mat-form-field>\n        <ngx-datatable #table class='material responsive-datatable' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='rows'>\n      <ngx-datatable-column name=\"clinicName\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Clinic Name</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'clinicName')\" *ngIf=\"!editing[rowIndex + '-clinicName']\">\n            {{value}}\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'clinicName', rowIndex)\" *ngIf=\"editing[rowIndex+ '-clinicName']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n       <ngx-datatable-column name=\"Address\">\n       \n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'address')\" *ngIf=\"!editing[rowIndex + '-address']\">\n            {{value}}\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'address', rowIndex)\" *ngIf=\"editing[rowIndex+ '-address']\" type=\"text\" [value]=\"value\" />\n        </ng-template>\n      </ngx-datatable-column>\n       <ngx-datatable-column name=\"ContactName\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Contact Name</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'contactName')\" *ngIf=\"!editing[rowIndex + '-contactName']\">\n            {{value}}\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'contactName', rowIndex)\" *ngIf=\"editing[rowIndex+ '-contactName']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"Created\">\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span>\n            {{value| date}}\n          </span>\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"id\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Actions</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\" style=\"width:266px!important;\">\n          <a [routerLink]=\"['/importcsv']\" class=\"action_btn golden\" title= 'Import CSV'><i class=\"ti-upload  m-r-10\"></i></a>\n          <a [routerLink]=\"['/dentist']\" class=\"action_btn golden\" title= 'List Dentist'><i class=\"ti-view-list-alt  m-r-10\"></i></a>\n             <a [routerLink]=\"['/clinic-goals']\" class=\"action_btn golden\" title= 'Clinic Goals'><i class=\"fas fa-stethoscope  m-r-10\"></i></a>\n          <a [routerLink]=\"['/dentist-goals']\" class=\"action_btn golden\" title= 'Dentist Goals'><i class=\"fas fa-tooth m-r-10\"></i></a>\n          <a [routerLink]=\"['/clinic-settings',value]\" class=\"action_btn golden\" title= 'Clinic Settings'><i class=\"ti-settings  m-r-10\"></i></a>\n          <button class=\"action_btn danger\" mat-menu-item (click) = \"deleteClinic(rowIndex)\">\n         <i class=\"ti-trash text-danger m-r-10\"></i></button>\n        </ng-template>\n      </ngx-datatable-column>\n        </ngx-datatable>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/clinic/clinic.component.scss":
/*!**********************************************!*\
  !*** ./src/app/clinic/clinic.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".lds-roller div::after {\n  background: black; }\n\n.spinner {\n  position: relative;\n  background: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY2xpbmljL0M6XFx4YW1wcFxcaHRkb2NzXFxqZWV2ZWFuYWx5dGljc1xcY2xpZW50Mi9zcmNcXGFwcFxcY2xpbmljXFxjbGluaWMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBaUIsRUFDcEI7O0FBQ0Q7RUFDSSxtQkFBa0I7RUFDbEIsaUJBQWdCLEVBQ25CIiwiZmlsZSI6InNyYy9hcHAvY2xpbmljL2NsaW5pYy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sZHMtcm9sbGVyIGRpdjo6YWZ0ZXIge1xuICAgIGJhY2tncm91bmQ6IGJsYWNrO1xufVxuLnNwaW5uZXIge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/clinic/clinic.component.ts":
/*!********************************************!*\
  !*** ./src/app/clinic/clinic.component.ts ***!
  \********************************************/
/*! exports provided: DialogOverviewExampleDialogComponent, DialogOverviewExampleLimitDialogComponent, ClinicComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogOverviewExampleDialogComponent", function() { return DialogOverviewExampleDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogOverviewExampleLimitDialogComponent", function() { return DialogOverviewExampleLimitDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClinicComponent", function() { return ClinicComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _clinic_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinic.service */ "./src/app/clinic/clinic.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/fesm5/angular-notifier.js");
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








var DialogOverviewExampleDialogComponent = /** @class */ (function () {
    function DialogOverviewExampleDialogComponent(fb, dialogRef, data) {
        this.fb = fb;
        this.dialogRef = dialogRef;
        this.data = data;
        this.form = this.fb.group({
            name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required])],
            address: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required])],
            //   patient_dob: [null, Validators.compose([Validators.required])],
            contact_name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required])]
        });
    }
    DialogOverviewExampleDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialogComponent.prototype.save = function (data) {
        var patient_id;
        this.clinic_id = $('#currentClinicid').attr('cid');
        this.dialogRef.close(data);
        $('.form-control-dialog').each(function () {
            var likeElement = $(this).click();
        });
    };
    DialogOverviewExampleDialogComponent.prototype.onChange = function (event) {
        var eventObj = event;
        var target = eventObj.target;
        var files = target.files;
        this.file = files[0];
        //  this.filedata =this.file;
    };
    DialogOverviewExampleDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialog-overview-example-dialog',
            template: __webpack_require__(/*! ./dialog-overview-example.html */ "./src/app/clinic/dialog-overview-example.html"),
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], DialogOverviewExampleDialogComponent);
    return DialogOverviewExampleDialogComponent;
}());

var DialogOverviewExampleLimitDialogComponent = /** @class */ (function () {
    function DialogOverviewExampleLimitDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    DialogOverviewExampleLimitDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialog-overview-limit-example-dialog',
            template: __webpack_require__(/*! ./dialog-overview-limit-example.html */ "./src/app/clinic/dialog-overview-limit-example.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], DialogOverviewExampleLimitDialogComponent);
    return DialogOverviewExampleLimitDialogComponent;
}());

var data = __webpack_require__(/*! assets/company.json */ "./src/assets/company.json");
var ClinicComponent = /** @class */ (function () {
    function ClinicComponent(notifierService, clinicService, dialog, _cookieService, router) {
        var _this = this;
        this.clinicService = clinicService;
        this.dialog = dialog;
        this._cookieService = _cookieService;
        this.router = router;
        this.editing = {};
        this.rows = [];
        this.temp = data.slice();
        this.loadingIndicator = true;
        this.reorderable = true;
        this.columns = [{ prop: 'sr' }, { name: 'clinicName' }, { name: 'address' }, { name: 'contactName' }, { name: 'created' }];
        this.clinicscount = 0;
        this.createdClinicsCount = 0;
        this.notifier = notifierService;
        this.rows = data;
        this.temp = data.slice();
        setTimeout(function () {
            _this.loadingIndicator = false;
        }, 1500);
    }
    ClinicComponent_1 = ClinicComponent;
    ClinicComponent.prototype.ngAfterViewInit = function () {
        this.getUserDetails();
        this.getClinics();
        $('.header_filters').removeClass('hide_header');
        $('.header_filters').removeClass('flex_direct_mar');
        $('#title').html('Clinics');
        //$('.header_filters').hide();
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('hide_header');
    };
    ClinicComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
            width: '350px',
            data: { name: this.name, address: this.address, contact_name: this.contact_name }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.clinicService.addClinic(result.name, result.address, result.contact_name).subscribe(function (res) {
                if (res.message == 'success') {
                    _this.notifier.notify('success', 'Clinic Added!', 'vertical');
                    _this.getClinics();
                }
            }, function (error) {
                _this.warningMessage = "Please Provide Valid Inputs!";
            });
        });
    };
    ClinicComponent.prototype.openLimitDialog = function () {
        var dialogRef = this.dialog.open(DialogOverviewExampleLimitDialogComponent, {
            width: '250px',
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    ClinicComponent.prototype.getClinics = function () {
        var _this = this;
        this.clinicService.getClinics().subscribe(function (res) {
            if (res.message == 'success') {
                _this.rows = res.data;
                if (res.data.length > 0) {
                    _this.temp = res.data.slice();
                    _this.clinicscount = res.data[0]['Users'].clinics_count;
                    _this.createdClinicsCount = res.data.length;
                    _this.table = data;
                }
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
    ClinicComponent.prototype.getUserDetails = function () {
        var _this = this;
        this.rows = [];
        this.clinicService.getUserDetails().subscribe(function (res) {
            if (res.message == 'success') {
                if (res.data) {
                    _this.clinicscount = res.data.clinics_count;
                }
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
    ClinicComponent.prototype.deleteClinic = function (row) {
        var _this = this;
        sweetalert2__WEBPACK_IMPORTED_MODULE_6___default.a.fire({
            title: 'Are you sure?',
            text: 'You want to delete Clinic?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then(function (result) {
            if (result.value) {
                if (_this.rows[row]['id']) {
                    _this.clinicService.deleteClinic(_this.rows[row]['id']).subscribe(function (res) {
                        if (res.message == 'success') {
                            _this.notifier.notify('success', 'Clinic Removed!', 'vertical');
                            _this.getClinics();
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
                }
                else {
                    _this.rows.splice(row, 1);
                    _this.rows = _this.rows.slice();
                }
            }
        });
    };
    ClinicComponent.prototype.addDentist = function () {
        var temp = {};
        temp['providerId'] = 'Enter Provider Id';
        temp['name'] = 'Enter Name';
        var length = this.rows.length;
        this.editing[length + '-providerId'] = true;
        this.editing[length + '-name'] = true;
        this.rows.push(temp);
        this.table = data;
    };
    ClinicComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        // filter our data
        var temp = this.temp.filter(function (d) {
            return d.clinicName.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table = data;
    };
    ClinicComponent.prototype.updateValue = function (event, cell, rowIndex) {
        var _this = this;
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.clinicService.updateClinic(this.rows[rowIndex]['id'], this.rows[rowIndex][cell], cell).subscribe(function (res) {
            if (res.message == 'success') {
                _this.notifier.notify('success', 'Clinic Details Updated!', 'vertical');
                _this.getClinics();
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
        this.rows = this.rows.slice();
    };
    ClinicComponent.prototype.enableEditing = function (rowIndex, cell) {
        this.editing[rowIndex + '-' + cell] = true;
    };
    var ClinicComponent_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(ClinicComponent_1),
        __metadata("design:type", ClinicComponent)
    ], ClinicComponent.prototype, "table", void 0);
    ClinicComponent = ClinicComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-table-filter',
            template: __webpack_require__(/*! ./clinic.component.html */ "./src/app/clinic/clinic.component.html"),
            styles: [__webpack_require__(/*! ./clinic.component.scss */ "./src/app/clinic/clinic.component.scss")]
        }),
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_7__["NotifierService"], _clinic_service__WEBPACK_IMPORTED_MODULE_1__["ClinicService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], ClinicComponent);
    return ClinicComponent;
}());



/***/ }),

/***/ "./src/app/clinic/clinic.module.ts":
/*!*****************************************!*\
  !*** ./src/app/clinic/clinic.module.ts ***!
  \*****************************************/
/*! exports provided: ClinicModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClinicModule", function() { return ClinicModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _clinic_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./clinic.service */ "./src/app/clinic/clinic.service.ts");
/* harmony import */ var _clinic_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./clinic.component */ "./src/app/clinic/clinic.component.ts");
/* harmony import */ var _clinic_routing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./clinic.routing */ "./src/app/clinic/clinic.routing.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var ClinicModule = /** @class */ (function () {
    function ClinicModule() {
    }
    ClinicModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_clinic_routing__WEBPACK_IMPORTED_MODULE_8__["ClinicRoutes"]),
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["NgxDatatableModule"],
                _demo_material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"]
            ],
            providers: [
                _clinic_service__WEBPACK_IMPORTED_MODULE_6__["ClinicService"]
            ],
            entryComponents: [_clinic_component__WEBPACK_IMPORTED_MODULE_7__["DialogOverviewExampleDialogComponent"], _clinic_component__WEBPACK_IMPORTED_MODULE_7__["DialogOverviewExampleLimitDialogComponent"]],
            declarations: [_clinic_component__WEBPACK_IMPORTED_MODULE_7__["ClinicComponent"],
                _clinic_component__WEBPACK_IMPORTED_MODULE_7__["DialogOverviewExampleDialogComponent"], _clinic_component__WEBPACK_IMPORTED_MODULE_7__["DialogOverviewExampleLimitDialogComponent"]]
        })
    ], ClinicModule);
    return ClinicModule;
}());



/***/ }),

/***/ "./src/app/clinic/clinic.routing.ts":
/*!******************************************!*\
  !*** ./src/app/clinic/clinic.routing.ts ***!
  \******************************************/
/*! exports provided: ClinicRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClinicRoutes", function() { return ClinicRoutes; });
/* harmony import */ var _clinic_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clinic.component */ "./src/app/clinic/clinic.component.ts");

var ClinicRoutes = [
    {
        path: '',
        component: _clinic_component__WEBPACK_IMPORTED_MODULE_0__["ClinicComponent"],
        data: {
            title: 'Clinic'
        }
    }
];


/***/ }),

/***/ "./src/app/clinic/clinic.service.ts":
/*!******************************************!*\
  !*** ./src/app/clinic/clinic.service.ts ***!
  \******************************************/
/*! exports provided: ClinicService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClinicService", function() { return ClinicService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ClinicService = /** @class */ (function () {
    function ClinicService(http, _cookieService, router) {
        var _this = this;
        this.http = http;
        this._cookieService = _cookieService;
        this.router = router;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl;
        //append headers
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
        this.router.events.subscribe(function (event) {
            if (_this._cookieService.get("user_type") != '1' && _this._cookieService.get("user_type") != '2')
                _this.token_id = _this._cookieService.get("childid");
            else
                _this.token_id = _this._cookieService.get("userid");
        });
    }
    // Get Dentist
    ClinicService.prototype.getClinics = function (user_id, clinic_id, token) {
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Practices/getPractices?user_id=" + user_id + "&token=" + this._cookieService.get("token") + "&token_id=" + this.token_id, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Delete Clinic
    ClinicService.prototype.deleteClinic = function (clinic_id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('id', clinic_id);
        formData.append('token', token);
        formData.append('token_id', this.token_id);
        return this.http.post(this.apiUrl + "/Practices/delete", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Update Clinic
    ClinicService.prototype.updateClinic = function (clinic_id, value, column, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('id', clinic_id);
        formData.append(column, value);
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('clinic_id', '1');
        formData.append('token_id', this.token_id);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/Practices/update/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Update Clinic
    ClinicService.prototype.addClinic = function (name, address, contact_name, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('clinicName', name);
        formData.append('address', address);
        formData.append('contactName', contact_name);
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('token', token);
        formData.append('token_id', this.token_id);
        return this.http.post(this.apiUrl + "/Practices/add/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    ClinicService.prototype.getUserDetails = function (user_id, token) {
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/users/userInfo?id=" + this._cookieService.get("userid") + "&token=" + this._cookieService.get("token") + "&token_id=" + this.token_id, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    ClinicService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], ClinicService);
    return ClinicService;
}());



/***/ }),

/***/ "./src/app/clinic/dialog-overview-example.html":
/*!*****************************************************!*\
  !*** ./src/app/clinic/dialog-overview-example.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Add Clinic</h1>\n<div mat-dialog-content>\n \n  <mat-form-field>\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.name\" [formControl]=\"form.controls['name']\" class=\"form-control-dialog\" placeholder=\"Clinic Name\" required>\n    \n  </mat-form-field>\n<small *ngIf=\"form.controls['name'].hasError('required') && form.controls['name'].touched\" class=\"text-danger support-text\">Name is Required.</small>\n  \n  <mat-form-field>\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.address\" [formControl]=\"form.controls['address']\" class=\"form-control-dialog\" placeholder=\"Address\" required>\n\n  </mat-form-field>\n    <small *ngIf=\"form.controls['address'].hasError('required') && form.controls['address'].touched\" class=\"text-danger support-text\">Address is Required.</small>\n  \n  <mat-form-field>\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.contact_name\" [formControl]=\"form.controls['contact_name']\" class=\"form-control-dialog\"  placeholder=\"Contact Name\" required>\n\n  </mat-form-field>\n      <small *ngIf=\"form.controls['contact_name'].hasError('required') && form.controls['contact_name'].touched\" class=\"text-danger support-text\">Contact Name is Required.</small>\n  <!--  <input type=\"file\" (change)=\"onChange($event)\"> -->\n</div>\n<div mat-dialog-actions>\n   <button mat-button (click)=\"save(data)\" tabindex=\"2\" class=\"mat-raised-button mat-dc\"  [disabled]=\"!form.valid\">Ok</button>\n  <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\" class=\"mat-raised-button mat-gray\">No Thanks</button>\n</div>"

/***/ }),

/***/ "./src/app/clinic/dialog-overview-limit-example.html":
/*!***********************************************************!*\
  !*** ./src/app/clinic/dialog-overview-limit-example.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div mat-dialog-content class=\"sa_forms_design\"> \n Please contact jeeve solutions on support@jeeve.com.au to upgrade the clinics membership .\n</div>\n"

/***/ })

}]);
//# sourceMappingURL=clinic-clinic-module.js.map