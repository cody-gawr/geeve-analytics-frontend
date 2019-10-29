(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["defaulters-defaulters-module"],{

/***/ "./src/app/defaulters/defaulters.component.html":
/*!******************************************************!*\
  !*** ./src/app/defaulters/defaulters.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<input type=\"button\" id=\"clinic_initiate\" (click) = \"initiate_clinic()\"  [style.display]=\"'none'\">\n\n<mat-card>\n    <mat-card-content>\n        <mat-card-title>Defaulters</mat-card-title>\n\n        <mat-form-field>\n            <input matInput type='text' class=\"form-control\" placeholder='Type to filter Defaulters Name...' (keyup)='updateFilter($event)'\n            />\n        </mat-form-field>\n        <ngx-datatable #table class='material' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='rows'>\n       <ngx-datatable-column name=\"Id\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Id</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n          <span>\n            {{rowIndex+1}}\n          </span>\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column  prop=\"patient_name\" name=\"patient_name\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Patient Name</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n            {{value}}\n       </ng-template>\n        \n      </ngx-datatable-column>\n\n\n       <ngx-datatable-column prop=\"patient_email\" name=\"patient_email\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Patient Email</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n            {{value}}\n          </ng-template>\n      </ngx-datatable-column>\n\n\n       <ngx-datatable-column prop=\"patient_phone_no\" name=\"patient_phone_no\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Contact Number</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n             {{value}}\n       </ng-template>\n\n      </ngx-datatable-column>\n\n\n       <ngx-datatable-column prop=\"plan_name\" name=\"plan_name\">\n        <ng-template let-column=\"column\" ngx-datatable-header-template>\n       <span>Plan</span>\n     </ng-template>\n       <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n           {{value}} \n       </ng-template>\n     </ngx-datatable-column>\n\n\n     <ngx-datatable-column prop=\"amount_owing\" name=\"amount_owing\">\n      <ng-template let-column=\"column\" ngx-datatable-header-template>\n     <span>Owning Amount</span>\n   </ng-template>\n     <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n         {{value}}\n   \n     </ng-template>\n   </ngx-datatable-column>\n   \n      \n      <ngx-datatable-column  name=\"id\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Actions</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\" style=\"width:266px!important;\">\n          <a class=\"action_btn golden\" (click)=\"sendDefaultersemail(rowIndex)\" title= 'Update Patient'><i class=\"ti-email  m-r-10\"></i></a>\n        </ng-template>\n      </ngx-datatable-column>\n        </ngx-datatable>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/defaulters/defaulters.component.scss":
/*!******************************************************!*\
  !*** ./src/app/defaulters/defaulters.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".lds-roller div::after {\n  background: black; }\n\n.spinner {\n  position: relative;\n  background: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9kZWZhdWx0ZXJzL2RlZmF1bHRlcnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBaUIsRUFDcEI7O0FBQ0Q7RUFDSSxtQkFBa0I7RUFDbEIsaUJBQWdCLEVBQ25CIiwiZmlsZSI6InNyYy9hcHAvZGVmYXVsdGVycy9kZWZhdWx0ZXJzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxkcy1yb2xsZXIgZGl2OjphZnRlciB7XG4gICAgYmFja2dyb3VuZDogYmxhY2s7XG59XG4uc3Bpbm5lciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG59Il19 */"

/***/ }),

/***/ "./src/app/defaulters/defaulters.component.ts":
/*!****************************************************!*\
  !*** ./src/app/defaulters/defaulters.component.ts ***!
  \****************************************************/
/*! exports provided: DefaultersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultersComponent", function() { return DefaultersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _defaulters_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaulters.service */ "./src/app/defaulters/defaulters.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var data = [];
var DefaultersComponent = /** @class */ (function () {
    function DefaultersComponent(notifierService, defaultersService, dialog, _cookieService, router) {
        var _this = this;
        this.defaultersService = defaultersService;
        this.dialog = dialog;
        this._cookieService = _cookieService;
        this.router = router;
        this.treat = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]();
        this.editing = {};
        this.rows = [];
        this.temp = data.slice();
        this.loadingIndicator = true;
        this.reorderable = true;
        this.notifier = notifierService;
        this.rows = data;
        this.temp = data.slice();
        setTimeout(function () {
            _this.loadingIndicator = false;
        }, 1500);
    }
    DefaultersComponent.prototype.ngAfterViewInit = function () {
        this.initiate_clinic();
        $('#title').html('Defaulters');
        $('.header_filters').removeClass('hide_header');
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
    };
    DefaultersComponent.prototype.initiate_clinic = function () {
        this.clinic_id = $('#currentClinicid').attr('cid');
        if (this.clinic_id)
            this.getInofficeDefaultersMembers();
    };
    DefaultersComponent.prototype.getInofficeDefaultersMembers = function () {
        var _this = this;
        this.rows = [];
        this.defaultersService.getInofficeDefaultersMembers(this.clinic_id).subscribe(function (res) {
            if (res.message == 'success') {
                _this.rows = res.data;
                // console.log(this.rows);
                _this.temp = res.data.slice();
                _this.table = data;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    DefaultersComponent.prototype.sendDefaultersemail = function (rowIndex) {
        var _this = this;
        // console.log(rowIndex)
        var defaulter_name = this.rows[rowIndex]['patient_name'];
        var defaulter_email = this.rows[rowIndex]['patient_email'];
        this.defaultersService.sendDefaultersemail(defaulter_name, defaulter_email).subscribe(function (res) {
            if (res.message == 'success') {
                _this.notifier.notify('success', 'Payment Reminder Send', 'vertical');
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    DefaultersComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        console.log(event.target.value);
        // filter our data
        var temp = this.temp.filter(function (d) {
            return d.patient_name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table = data;
    };
    DefaultersComponent.prototype.enableEditing = function (rowIndex, cell) {
        this.editing[rowIndex + '-' + cell] = true;
        //console.log(this.editing);
    };
    DefaultersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-table-filter',
            template: __webpack_require__(/*! ./defaulters.component.html */ "./src/app/defaulters/defaulters.component.html"),
            styles: [__webpack_require__(/*! ./defaulters.component.scss */ "./src/app/defaulters/defaulters.component.scss")]
        }),
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_6__["NotifierService"], _defaulters_service__WEBPACK_IMPORTED_MODULE_1__["DefaultersService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], DefaultersComponent);
    return DefaultersComponent;
}());



/***/ }),

/***/ "./src/app/defaulters/defaulters.module.ts":
/*!*************************************************!*\
  !*** ./src/app/defaulters/defaulters.module.ts ***!
  \*************************************************/
/*! exports provided: DefaultersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultersModule", function() { return DefaultersModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _defaulters_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./defaulters.service */ "./src/app/defaulters/defaulters.service.ts");
/* harmony import */ var _defaulters_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./defaulters.component */ "./src/app/defaulters/defaulters.component.ts");
/* harmony import */ var _defaulters_routing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./defaulters.routing */ "./src/app/defaulters/defaulters.routing.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var DefaultersModule = /** @class */ (function () {
    function DefaultersModule() {
    }
    DefaultersModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_defaulters_routing__WEBPACK_IMPORTED_MODULE_8__["DefaultersRoutes"]),
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["NgxDatatableModule"],
                _demo_material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
            ],
            providers: [
                _defaulters_service__WEBPACK_IMPORTED_MODULE_6__["DefaultersService"]
            ],
            entryComponents: [],
            declarations: [_defaulters_component__WEBPACK_IMPORTED_MODULE_7__["DefaultersComponent"]]
        })
    ], DefaultersModule);
    return DefaultersModule;
}());



/***/ }),

/***/ "./src/app/defaulters/defaulters.routing.ts":
/*!**************************************************!*\
  !*** ./src/app/defaulters/defaulters.routing.ts ***!
  \**************************************************/
/*! exports provided: DefaultersRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultersRoutes", function() { return DefaultersRoutes; });
/* harmony import */ var _defaulters_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaulters.component */ "./src/app/defaulters/defaulters.component.ts");

var DefaultersRoutes = [
    {
        path: '',
        component: _defaulters_component__WEBPACK_IMPORTED_MODULE_0__["DefaultersComponent"],
        data: {
            title: 'Defaulters'
        }
    }
];


/***/ }),

/***/ "./src/app/defaulters/defaulters.service.ts":
/*!**************************************************!*\
  !*** ./src/app/defaulters/defaulters.service.ts ***!
  \**************************************************/
/*! exports provided: DefaultersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultersService", function() { return DefaultersService; });
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





var DefaultersService = /** @class */ (function () {
    function DefaultersService(http, _cookieService) {
        this.http = http;
        this._cookieService = _cookieService;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl;
        //append headers
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
    }
    // Get Dentist
    DefaultersService.prototype.getInofficeDefaultersMembers = function (clinic_id, user_id, token) {
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/InofficePayments/getInofficeDefaultersMembers?token=" + this._cookieService.get("token") + "&user_id=" + this._cookieService.get("userid") + "&clinic_id=" + clinic_id, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Update Clinic
    DefaultersService.prototype.sendDefaultersemail = function (defaulter_name, defaulter_email, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('defaulter_name', defaulter_name);
        formData.append('defaulter_email', defaulter_email);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/DefaultersEmail/sendDefaultersemail/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    DefaultersService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], DefaultersService);
    return DefaultersService;
}());



/***/ })

}]);
//# sourceMappingURL=defaulters-defaulters-module.js.map