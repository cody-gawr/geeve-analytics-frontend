(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dentist-dentist-module"],{

/***/ "./src/app/dentist/dentist.component.html":
/*!************************************************!*\
  !*** ./src/app/dentist/dentist.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-content>\n        <mat-card-title>Dentist  <button class=\"sa-pull-right mat-raised-button mat-gray\" mat-raised-button (click)=\"openDialog()\">Add Dentist</button></mat-card-title>\n <input type=\"button\" id=\"clinic_initiate\" (click) = \"initiate_clinic()\"  [style.display]=\"'none'\">\n        <mat-form-field>\n            <input matInput type='text' class=\"form-control\" placeholder='Type to filter dentist name...' (keyup)='updateFilter($event)'\n            />\n        </mat-form-field>\n        <ngx-datatable #table class='material dentist-datatable' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='rows'>\n            <ngx-datatable-column name=\"Sr\">\n                <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Sr</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n          <span title=\"Double click to edit\" (dblclick)=\"editing[rowIndex + '-providerId'] = true\" *ngIf=\"!editing[rowIndex + '-providerId']\">\n            {{value}}\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'providerId', rowIndex)\" *ngIf=\"editing[rowIndex+ '-providerId']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"providerId\">\n                <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Provider Id</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n          <span title=\"Double click to edit\" (dblclick)=\"editing[rowIndex + '-providerId'] = true\" *ngIf=\"!editing[rowIndex + '-providerId']\">\n            {{value}}\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'providerId', rowIndex)\" *ngIf=\"editing[rowIndex+ '-providerId']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"Name\">\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'name')\" *ngIf=\"!editing[rowIndex + '-name']\">\n            {{value}}\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'name', rowIndex)\" *ngIf=\"editing[rowIndex+ '-name']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"Action\">\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n           <button class=\"action_btn danger\" mat-menu-item (click) = \"deleteDentists(rowIndex)\">\n         <i class=\"ti-trash text-danger m-r-10\"></i></button>\n        </ng-template>\n      </ngx-datatable-column>\n        </ngx-datatable>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/dentist/dentist.component.scss":
/*!************************************************!*\
  !*** ./src/app/dentist/dentist.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".lds-roller div::after {\n  background: black; }\n\n.spinner {\n  position: relative;\n  background: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGVudGlzdC9DOlxceGFtcHBcXGh0ZG9jc1xcamVldmVhbmFseXRpY3NcXGNsaWVudDIvc3JjXFxhcHBcXGRlbnRpc3RcXGRlbnRpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBaUIsRUFDcEI7O0FBQ0Q7RUFDSSxtQkFBa0I7RUFDbEIsaUJBQWdCLEVBQ25CIiwiZmlsZSI6InNyYy9hcHAvZGVudGlzdC9kZW50aXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxkcy1yb2xsZXIgZGl2OjphZnRlciB7XG4gICAgYmFja2dyb3VuZDogYmxhY2s7XG59XG4uc3Bpbm5lciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlOyBcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/dentist/dentist.component.ts":
/*!**********************************************!*\
  !*** ./src/app/dentist/dentist.component.ts ***!
  \**********************************************/
/*! exports provided: DialogOverviewExampleDialogComponent, DentistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogOverviewExampleDialogComponent", function() { return DialogOverviewExampleDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DentistComponent", function() { return DentistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dentist_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dentist.service */ "./src/app/dentist/dentist.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_4__);
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
    // public form: FormGroup;
    function DialogOverviewExampleDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.clinic_id = {};
    }
    // this.form = this.fb.group({
    //     provider_id: [null, Validators.compose([Validators.required])],
    //     dentist_name: [null, Validators.compose([Validators.required])]
    //   });
    DialogOverviewExampleDialogComponent.prototype.save = function (data) {
        $('.mat-form-control').click();
        if (data.provider_id != undefined && data.dentist_name != undefined) {
            this.dialogRef.close(data);
        }
    };
    DialogOverviewExampleDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialog-overview-example-dialog',
            template: __webpack_require__(/*! ./dialog-overview-example.html */ "./src/app/dentist/dialog-overview-example.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], DialogOverviewExampleDialogComponent);
    return DialogOverviewExampleDialogComponent;
}());

var data = [];
var DentistComponent = /** @class */ (function () {
    function DentistComponent(dentistService, dialog, route, _cookieService, router) {
        var _this = this;
        this.dentistService = dentistService;
        this.dialog = dialog;
        this.route = route;
        this._cookieService = _cookieService;
        this.router = router;
        this.clinic_id = {};
        this.editing = {};
        this.rows = [];
        this.temp = data.slice();
        this.loadingIndicator = true;
        this.reorderable = true;
        this.columns = [{ prop: 'sr' }, { prop: 'providerId' }, { name: 'name' }, { name: 'Action' }];
        this.clinic_id = this.route.snapshot.paramMap.get("id");
        this.rows = data;
        this.temp = data.slice();
        setTimeout(function () {
            _this.loadingIndicator = false;
        }, 1500);
    }
    DentistComponent_1 = DentistComponent;
    DentistComponent.prototype.initiate_clinic = function () {
        var val = $('#currentClinic').attr('cid');
        this.clinic_id = val;
        this.getDentists();
    };
    DentistComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        $('.header_filters').removeClass('hide_header');
        $('.header_filters').removeClass('flex_direct_mar');
        this.route.params.subscribe(function (params) {
            _this.clinic_id = _this.route.snapshot.paramMap.get("id");
            _this.initiate_clinic();
            $('.external_clinic').show();
            $('.dentist_dropdown').hide();
            $('.header_filters').addClass('flex_direct_mar');
            $('#title').html('Dentist');
        });
    };
    DentistComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
            width: '300px',
            height: '300px',
            data: { dentist_name: this.dentist_name, provider_id: this.provider_id }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.dentistService.addDentists(result.provider_id, result.dentist_name, _this.clinic_id).subscribe(function (res) {
                console.log(res);
                if (res.message == 'success') {
                    alert('Dentist Added');
                    _this.getDentists();
                    $('.external_clinic').show();
                    $('.dentist_dropdown').hide();
                    $('.header_filters').addClass('flex_direct_mar');
                }
            }, function (error) {
                _this.warningMessage = "Please Provide Valid Inputs!";
            });
        });
    };
    DentistComponent.prototype.getDentists = function () {
        var _this = this;
        this.dentistService.getDentists(this.clinic_id).subscribe(function (res) {
            if (res.message == 'success') {
                _this.rows = res.data;
                _this.temp = res.data.slice();
                _this.table = data;
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
    DentistComponent.prototype.deleteDentists = function (row) {
        var _this = this;
        if (confirm("Are you sure to delete Dentist?")) {
            if (this.rows[row]['providerId']) {
                this.dentistService.deleteDentists(this.rows[row]['providerId']).subscribe(function (res) {
                    if (res.message == 'success') {
                        alert('Dentist Removed');
                        _this.getDentists();
                    }
                }, function (error) {
                    _this.warningMessage = "Please Provide Valid Inputs!";
                });
            }
            else {
                this.rows.splice(row, 1);
                this.rows = this.rows.slice();
            }
        }
    };
    DentistComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        // filter our data
        var temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table = data;
    };
    DentistComponent.prototype.updateValue = function (event, cell, rowIndex) {
        var _this = this;
        if ((this.rows[rowIndex]['providerId'] == 'Enter Provider Id') || (this.rows[rowIndex]['name'] == 'Enter Name')) {
            this.editing[length + '-providerId'] = true;
            this.editing[length + '-name'] = true;
        }
        else {
            this.editing[rowIndex + '-' + cell] = false;
            this.rows[rowIndex][cell] = event.target.value;
            this.dentistService.updateDentists(this.rows[rowIndex]['providerId'], this.rows[rowIndex][cell], this.clinic_id).subscribe(function (res) {
                if (res.message == 'success') {
                    alert('Dentist Updated');
                    _this.getDentists();
                }
            }, function (error) {
                _this.warningMessage = "Please Provide Valid Inputs!";
            });
            this.rows = this.rows.slice();
            console.log('UPDATED!', this.rows[rowIndex][cell]);
        }
    };
    DentistComponent.prototype.enableEditing = function (rowIndex, cell) {
        this.editing[rowIndex + '-' + cell] = true;
    };
    var DentistComponent_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(DentistComponent_1),
        __metadata("design:type", DentistComponent)
    ], DentistComponent.prototype, "table", void 0);
    DentistComponent = DentistComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-table-filter',
            template: __webpack_require__(/*! ./dentist.component.html */ "./src/app/dentist/dentist.component.html"),
            styles: [__webpack_require__(/*! ./dentist.component.scss */ "./src/app/dentist/dentist.component.scss")]
        }),
        __metadata("design:paramtypes", [_dentist_service__WEBPACK_IMPORTED_MODULE_1__["DentistService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_4__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], DentistComponent);
    return DentistComponent;
}());



/***/ }),

/***/ "./src/app/dentist/dentist.module.ts":
/*!*******************************************!*\
  !*** ./src/app/dentist/dentist.module.ts ***!
  \*******************************************/
/*! exports provided: DentistModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DentistModule", function() { return DentistModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _dentist_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dentist.service */ "./src/app/dentist/dentist.service.ts");
/* harmony import */ var _dentist_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dentist.component */ "./src/app/dentist/dentist.component.ts");
/* harmony import */ var _dentist_routing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dentist.routing */ "./src/app/dentist/dentist.routing.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var DentistModule = /** @class */ (function () {
    function DentistModule() {
    }
    DentistModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_dentist_routing__WEBPACK_IMPORTED_MODULE_8__["DentistRoutes"]),
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["NgxDatatableModule"],
                _demo_material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
            ],
            providers: [
                _dentist_service__WEBPACK_IMPORTED_MODULE_6__["DentistService"]
            ],
            entryComponents: [_dentist_component__WEBPACK_IMPORTED_MODULE_7__["DialogOverviewExampleDialogComponent"]],
            declarations: [_dentist_component__WEBPACK_IMPORTED_MODULE_7__["DentistComponent"],
                _dentist_component__WEBPACK_IMPORTED_MODULE_7__["DialogOverviewExampleDialogComponent"]]
        })
    ], DentistModule);
    return DentistModule;
}());



/***/ }),

/***/ "./src/app/dentist/dentist.routing.ts":
/*!********************************************!*\
  !*** ./src/app/dentist/dentist.routing.ts ***!
  \********************************************/
/*! exports provided: DentistRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DentistRoutes", function() { return DentistRoutes; });
/* harmony import */ var _dentist_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dentist.component */ "./src/app/dentist/dentist.component.ts");

var DentistRoutes = [
    {
        path: '',
        component: _dentist_component__WEBPACK_IMPORTED_MODULE_0__["DentistComponent"],
        data: {
            title: 'Dentist'
        }
    }
];


/***/ }),

/***/ "./src/app/dentist/dialog-overview-example.html":
/*!******************************************************!*\
  !*** ./src/app/dentist/dialog-overview-example.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Add Dentist</h1>\n<div mat-dialog-content>\n\n  <mat-form-field>\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.provider_id\" class=\"mat-form-control\" required=\"true\" placeholder=\"Provider ID\" required>\n  </mat-form-field>\n\n  <mat-form-field>\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.dentist_name\" class=\"mat-form-control\" required=\"true\" placeholder=\"Dentist Name\" required>\n  </mat-form-field>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"save(data)\" tabindex=\"2\" class=\"mat-raised-button mat-dc\">Ok</button>\n  <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\" class=\"mat-raised-button mat-gray\">No Thanks</button>\n</div>"

/***/ })

}]);
//# sourceMappingURL=dentist-dentist-module.js.map