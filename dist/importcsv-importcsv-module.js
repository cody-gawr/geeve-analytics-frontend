(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["importcsv-importcsv-module"],{

/***/ "./src/app/importcsv/importcsv.component.html":
/*!****************************************************!*\
  !*** ./src/app/importcsv/importcsv.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = " <input type=\"button\" id=\"clinic_initiate\" (click) = \"initiate_clinic()\"  [style.display]=\"'none'\">\n\n<mat-card>\n    <mat-card-content>\n        <mat-card-title class=\"ImportCSV-outer\"><div class=\"ImportCSV\">Import CSV<img alt=\"homepage\" src=\"assets/images/loading-gif-transparent-4.gif\" height=\"20px\" width=\"20px\" class=\"ng-hide\" id=\"processLoader\"> &nbsp;&nbsp;&nbsp;  <i class=\"fas fa-info-circle text-inspinia m-r-10\" matTooltip=\"File to be uploaded should have the same defined name.\"></i></div> <input type='button'  class=\"sa-pull-right mat-raised-button mat-gray\" value=\"Process Files\" (click) = \"processAllFiles()\"></mat-card-title>\n        <span class=\"error\" [style.display]=\"'none'\"></span>\n        <mat-form-field>\n            <input matInput type='text' class=\"form-control\" placeholder='Type to filter file name...' (keyup)='updateFilter($event)'\n            />\n        </mat-form-field>\n        <ngx-datatable #table class='material responsive-datatable' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='rows'>\n            <ngx-datatable-column name=\"Name\">\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n          {{value}}\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"Date\">\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" >\n            {{value}}\n          </span>\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"Sample\">\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n         <a class=\"mat-raised-button sa_smtable_btn\" href='{{homeUrl}}../src/assets/{{value}}.csv'>Sample CSV</a>\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"Status\">\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n        <span class=\"label label-red\"  *ngIf=\"value == 'Processed'\">{{value}}</span>\n        <span class=\"label label-danger\"  *ngIf=\"value == 'Pending'\">{{value}}</span>\n        <span class=\"label label-info\"  *ngIf=\"value == 'In Progress'\">{{value}}</span>\n        <span class=\"label label-light-success\"  *ngIf=\"value == 'No File Uploaded  '\">{{value}}</span>\n\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"id\">\n        <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Actions</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n           <input id=\"file-upload{{value}}\" class=\"ng-hide\" #fileInput\n                         type=\"file\"\n                         accept=\"csv/*\"\n                         (change)=\"processFile(fileInput,[rowIndex],'name')\" >\n                        <span *ngIf=\"show\">Uploading File...</span>\n            <label for=\"file-upload{{value}}\" class=\"mat-raised-button sa_smtable_btn mat-dc\">Choose Files</label>\n\n        </ng-template>\n      </ngx-datatable-column>\n        </ngx-datatable>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/importcsv/importcsv.component.ts":
/*!**************************************************!*\
  !*** ./src/app/importcsv/importcsv.component.ts ***!
  \**************************************************/
/*! exports provided: ImportcsvComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportcsvComponent", function() { return ImportcsvComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _importcsv_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./importcsv.service */ "./src/app/importcsv/importcsv.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_4__);
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






var data = [
    {
        id: '1',
        name: 'Accounting Invoices and Receipts',
        date: 'No Uploads Yet',
        sample: 'csv-sample/Accounting Invoices and Receipts.csv',
        status: 'No File Uploaded'
    },
    {
        id: '2',
        name: 'Items Performed Over Period',
        date: 'No Uploads Yet',
        sample: 'csv-sample/Accounting Invoices and Receipts.csv',
        status: 'No File Uploaded'
    },
    {
        id: '3',
        name: 'Treatment Plan Analysis',
        date: 'No Uploads Yet',
        sample: 'csv-sample/Accounting Invoices and Receipts.csv',
        status: 'No File Uploaded'
    },
    {
        id: '4',
        name: 'Work Time Analysis',
        date: 'No Uploads Yet',
        sample: 'csv-sample/Accounting Invoices and Receipts.csv',
        status: 'No File Uploaded'
    },
    {
        id: '5',
        name: 'Efficiency of Referral Sources New Patients',
        date: 'No Uploads Yet',
        sample: 'csv-sample/Accounting Invoices and Receipts.csv',
        status: 'No File Uploaded'
    },
    {
        id: '6',
        name: 'Status - Attended',
        date: 'No Uploads Yet',
        sample: 'csv-sample/Accounting Invoices and Receipts.csv',
        status: 'No File Uploaded'
    },
    {
        id: '7',
        name: 'Status - CDBS',
        date: 'No Uploads Yet',
        sample: 'csv-sample/Accounting Invoices and Receipts.csv',
        status: 'No File Uploaded'
    },
    {
        id: '8',
        name: 'Status - Confirmed',
        date: 'No Uploads Yet',
        sample: 'csv-sample/Accounting Invoices and Receipts.csv',
        status: 'No File Uploaded'
    },
    {
        id: '9',
        name: 'Status - FTA',
        date: 'No Uploads Yet',
        sample: 'csv-sample/Accounting Invoices and Receipts.csv',
        status: 'No File Uploaded'
    },
    {
        id: '10',
        name: 'Status - Lab Arrived',
        date: 'No Uploads Yet',
        status: 'No File Uploaded'
    },
    {
        id: '11',
        name: 'Status - Lab Work',
        date: 'No Uploads Yet',
        sample: 'csv-sample/Accounting Invoices and Receipts.csv',
        status: 'No File Uploaded'
    },
    {
        id: '12',
        name: 'Status - Message Given',
        date: 'No Uploads Yet',
        sample: 'csv-sample/Accounting Invoices and Receipts.csv',
        status: 'No File Uploaded'
    },
    {
        id: '13',
        name: 'Status - New Patient',
        date: 'No Uploads Yet',
        sample: 'csv-sample/Accounting Invoices and Receipts.csv',
        status: 'No File Uploaded'
    },
    {
        id: '14',
        name: 'Status - No Status (Non Financial)',
        date: 'No Uploads Yet',
        sample: 'csv-sample/Accounting Invoices and Receipts.csv',
        status: 'No File Uploaded'
    },
    {
        id: '15',
        name: 'Status - Phone Patient',
        date: 'No Uploads Yet',
        sample: 'csv-sample/Accounting Invoices and Receipts.csv',
        status: 'No File Uploaded'
    },
    {
        id: '16',
        name: 'Status - Recall',
        date: 'No Uploads Yet',
        sample: 'csv-sample/Accounting Invoices and Receipts.csv',
        status: 'No File Uploaded'
    },
    {
        id: '17',
        name: 'Status - SMS Sent',
        date: 'No Uploads Yet',
        sample: 'csv-sample/Accounting Invoices and Receipts.csv',
        status: 'No File Uploaded'
    },
    {
        id: '17',
        name: 'Status - UTA',
        date: 'No Uploads Yet',
        sample: 'csv-sample/Accounting Invoices and Receipts.csv',
        status: 'No File Uploaded'
    },
    {
        id: '18',
        name: 'All Patients',
        date: 'No Uploads Yet',
        sample: 'csv-sample/All Patients.csv',
        status: 'No File Uploaded'
    }
];
var ImportcsvComponent = /** @class */ (function () {
    function ImportcsvComponent(importcsvService, datePipe, route, _cookieService, router) {
        var _this = this;
        this.importcsvService = importcsvService;
        this.datePipe = datePipe;
        this.route = route;
        this._cookieService = _cookieService;
        this.router = router;
        this.clinic_id = {};
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl;
        this.homeUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].homeUrl;
        this.show = false;
        this.editing = {};
        this.rows = [];
        this.logData = [];
        this.arr1 = [];
        this.temp = data.slice();
        this.label = '';
        this.loadingIndicator = true;
        this.reorderable = true;
        this.currentDate = new Date();
        this.columns = [{ prop: 'name' }, { name: 'date' }];
        this.radioModel = 'Month';
        this.clinic_id = this.route.snapshot.paramMap.get("id");
        this.rows = data;
        this.temp = data.slice();
        setTimeout(function () {
            _this.loadingIndicator = false;
        }, 1500);
    }
    ImportcsvComponent_1 = ImportcsvComponent;
    ImportcsvComponent.prototype.initiate_clinic = function () {
        var val = $('#currentClinic').attr('cid');
        this.clinic_id = val;
        this.getLogs();
    };
    ImportcsvComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        $('.header_filters').removeClass('hide_header');
        $('.header_filters').removeClass('flex_direct_mar');
        this.initiate_clinic();
        this.route.params.subscribe(function (params) {
            _this.clinic_id = _this.route.snapshot.paramMap.get("id");
            $('#title').html('Data Upload');
            $('.external_clinic').show();
            $('.dentist_dropdown').hide();
            $('.header_filters').addClass('flex_direct_mar');
        });
    };
    ImportcsvComponent.prototype.processFile = function (fileInput, rowIndex, cell) {
        var _this = this;
        document.querySelector('.error').style.display = 'none';
        document.querySelector('.error').innerHTML = '';
        var file = fileInput.files[0];
        var reader = new FileReader();
        //this.show = true;   
        reader.addEventListener('load', function (event) {
            _this.selectedFile = new FileSnippet(event.target.result, file);
            if (_this.selectedFile.file.name == _this.rows[rowIndex][cell] + '.csv') {
                _this.importcsvService.uploadFile(_this.selectedFile.file, _this.clinic_id).subscribe(function (data) {
                    if (data.message == 'success') {
                        alert('File Uploaded Successfully-' + _this.selectedFile.file.name + ' . Please Process the files');
                        _this.getLogs();
                        _this.show = false;
                    }
                    else {
                        alert('Error Uploading File-' + _this.selectedFile.file.name);
                    }
                });
            }
            else {
                alert('Incorrect File uploaded for ' + _this.rows[rowIndex][cell]);
                /*(<HTMLElement>document.querySelector('.error')).style.display = 'block';
                (<HTMLElement>document.querySelector('.error')).innerHTML += '<b style = "color:red">Incorrect File uploaded for '+this.rows[rowIndex][cell]+'</b>';*/
            }
        });
        reader.readAsDataURL(file);
    };
    ImportcsvComponent.prototype.getLogs = function () {
        var _this = this;
        this.rows = data;
        this.temp = data.slice();
        this.table = data;
        this.arr1 = [];
        this.importcsvService.getLogs(this.clinic_id).subscribe(function (res) {
            if (res.message == 'success') {
                res.data.forEach(function (result, key) {
                    var temp = {};
                    temp['id'] = key;
                    temp['name'] = result.filename;
                    temp['sample'] = 'csv-sample/' + result.filename;
                    if (result.uploaded_csv_logs_unprocess) {
                        temp['date'] = _this.datePipe.transform(result.uploaded_csv_logs_unprocess[0].created, 'yyyy/MM/dd h:m:s');
                        temp['status'] = 'Pending';
                        _this.label = 'danger';
                    }
                    else if (result.uploaded_csv_logs_inprocess) {
                        temp['date'] = _this.datePipe.transform(result.uploaded_csv_logs_inprocess[0].created, 'yyyy/MM/dd h:m:s');
                        temp['status'] = 'In Progress';
                        _this.label = 'info';
                    }
                    else if (result.uploaded_csv_logs.length > 0) {
                        temp['date'] = _this.datePipe.transform(result.uploaded_csv_logs[0].created, 'yyyy/MM/dd h:m:s');
                        temp['status'] = 'Processed';
                        _this.label = 'red';
                    }
                    else {
                        temp['date'] = 'No Uploads Yet';
                        temp['status'] = 'No File Uploaded';
                        _this.label = 'light-success';
                    }
                    console.log(_this.label);
                    _this.arr1.push(temp);
                    //    this.productionTotal = this.productionTotal + parseInt(res.total);
                });
                _this.rows = _this.arr1;
                _this.temp = _this.arr1.slice();
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
    ImportcsvComponent.prototype.updateFilter = function (event) {
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
    ImportcsvComponent.prototype.updateValue = function (event, cell, rowIndex) {
        console.log('inline editing rowIndex', rowIndex);
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.rows = this.rows.slice();
        console.log('UPDATED!', this.rows[rowIndex][cell]);
    };
    ImportcsvComponent.prototype.processAllFiles = function () {
        var _this = this;
        this.importcsvService.processAllFiles(this.clinic_id).subscribe(function (res) {
            if (res.message == 'success') {
                alert('All Files Processed Successfully');
                _this.getLogs();
                _this.show = false;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
        alert('File Processing in Progress. You can check the status once files is processed.');
    };
    var ImportcsvComponent_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(ImportcsvComponent_1),
        __metadata("design:type", ImportcsvComponent)
    ], ImportcsvComponent.prototype, "table", void 0);
    ImportcsvComponent = ImportcsvComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./importcsv.component.html */ "./src/app/importcsv/importcsv.component.html")
        }),
        __metadata("design:paramtypes", [_importcsv_service__WEBPACK_IMPORTED_MODULE_2__["ImportcsvService"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["DatePipe"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_4__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], ImportcsvComponent);
    return ImportcsvComponent;
}());

var FileSnippet = /** @class */ (function () {
    function FileSnippet(src, file) {
        this.src = src;
        this.file = file;
    }
    return FileSnippet;
}());


/***/ }),

/***/ "./src/app/importcsv/importcsv.module.ts":
/*!***********************************************!*\
  !*** ./src/app/importcsv/importcsv.module.ts ***!
  \***********************************************/
/*! exports provided: ImportcsvModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportcsvModule", function() { return ImportcsvModule; });
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/table */ "./node_modules/@angular/cdk/esm5/table.es5.js");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-charts */ "./node_modules/ng2-charts/fesm5/ng2-charts.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _importcsv_routing__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./importcsv.routing */ "./src/app/importcsv/importcsv.routing.ts");
/* harmony import */ var ng_chartist__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ng-chartist */ "./node_modules/ng-chartist/dist/ng-chartist.js");
/* harmony import */ var ng_chartist__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(ng_chartist__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @swimlane/ngx-charts */ "./node_modules/@swimlane/ngx-charts/release/esm.js");
/* harmony import */ var _importcsv_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./importcsv.service */ "./src/app/importcsv/importcsv.service.ts");
/* harmony import */ var _importcsv_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./importcsv.component */ "./src/app/importcsv/importcsv.component.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_15__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var ImportcsvModule = /** @class */ (function () {
    function ImportcsvModule() {
    }
    ImportcsvModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_importcsv_routing__WEBPACK_IMPORTED_MODULE_10__["ImportcsvRoutes"]),
                _demo_material_module__WEBPACK_IMPORTED_MODULE_5__["DemoMaterialModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_9__["FlexLayoutModule"],
                _angular_cdk_table__WEBPACK_IMPORTED_MODULE_6__["CdkTableModule"],
                ng_chartist__WEBPACK_IMPORTED_MODULE_11__["ChartistModule"],
                ng2_charts__WEBPACK_IMPORTED_MODULE_7__["ChartsModule"],
                _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_12__["NgxChartsModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_15__["NgxDatatableModule"],
            ],
            providers: [
                _importcsv_service__WEBPACK_IMPORTED_MODULE_13__["ImportcsvService"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["DatePipe"]
            ],
            declarations: [_importcsv_component__WEBPACK_IMPORTED_MODULE_14__["ImportcsvComponent"]]
        })
    ], ImportcsvModule);
    return ImportcsvModule;
}());



/***/ }),

/***/ "./src/app/importcsv/importcsv.routing.ts":
/*!************************************************!*\
  !*** ./src/app/importcsv/importcsv.routing.ts ***!
  \************************************************/
/*! exports provided: ImportcsvRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportcsvRoutes", function() { return ImportcsvRoutes; });
/* harmony import */ var _importcsv_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./importcsv.component */ "./src/app/importcsv/importcsv.component.ts");

var ImportcsvRoutes = [
    {
        path: '',
        component: _importcsv_component__WEBPACK_IMPORTED_MODULE_0__["ImportcsvComponent"],
        data: {
            title: 'Importcsv'
        }
    }
];


/***/ }),

/***/ "./src/app/importcsv/importcsv.service.ts":
/*!************************************************!*\
  !*** ./src/app/importcsv/importcsv.service.ts ***!
  \************************************************/
/*! exports provided: ImportcsvService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportcsvService", function() { return ImportcsvService; });
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






var ImportcsvService = /** @class */ (function () {
    function ImportcsvService(http, _cookieService, router) {
        var _this = this;
        this.http = http;
        this._cookieService = _cookieService;
        this.router = router;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl;
        this.router.events.subscribe(function (event) {
            if (_this._cookieService.get("user_type") != '1' && _this._cookieService.get("user_type") != '2')
                _this.token_id = _this._cookieService.get("childid");
            else
                _this.token_id = _this._cookieService.get("userid");
        });
    }
    ImportcsvService.prototype.uploadFile = function (file, clinic_id) {
        var formData = new FormData();
        formData.append('file', file);
        formData.append('clinic_id', clinic_id);
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('target', 'webroot/uploads/');
        formData.append('file_input', 'file');
        formData.append('token', this._cookieService.get("token"));
        formData.append('token_id', this.token_id);
        // console.log(formData);
        return this.http.post(this.apiUrl + "/AccountingInvoicesAndReceipts/uploadFile", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Get Logs
    ImportcsvService.prototype.getLogs = function (clinic_id, user_id, token) {
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/logs/getUploadedCsvLogs?user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token") + "&token_id=" + this.token_id, {})
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Process All Files
    ImportcsvService.prototype.processAllFiles = function (clinic_id, user_id, token) {
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/AccountingInvoicesAndReceipts/processAllCsv?user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token") + "&token_id=" + this.token_id, {})
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    ImportcsvService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], ImportcsvService);
    return ImportcsvService;
}());



/***/ })

}]);
//# sourceMappingURL=importcsv-importcsv-module.js.map