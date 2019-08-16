(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["plans-plans-module"],{

/***/ "./src/app/plans/plans.component.html":
/*!********************************************!*\
  !*** ./src/app/plans/plans.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-content>\n        <mat-card-title>Plans  <button class=\"sa-pull-right mat-raised-button mat-gray\" mat-raised-button (click)=\"openDialog()\"disabled =\"true \">Add Plan</button></mat-card-title>\n\n        <mat-form-field>\n            <input matInput type='text' class=\"form-control\" placeholder='Type to filter Plan name...' (keyup)='updateFilter($event)'\n            />\n        </mat-form-field>\n        <ngx-datatable #table class='material' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='rows'>\n       <ngx-datatable-column name=\"Id\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Id</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n          <span>\n            {{value}}\n          </span>\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"plan\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Plan</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'plan')\" *ngIf=\"!editing[rowIndex + '-plan'] && value != ''\">\n            {{value}}\n          </span>\n           <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'plan')\" *ngIf=\"!editing[rowIndex + '-plan'] && value == ''\">\n            Enter plan\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'plan', rowIndex)\" *ngIf=\"editing[rowIndex+ '-plan']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n       <ngx-datatable-column name=\"allowedClinics\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Allowed Clinics</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'allowedClinics')\" *ngIf=\"!editing[rowIndex + '-allowedClinics'] && value != ''\">\n            {{value}}\n          </span>\n           <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'allowedClinics')\" *ngIf=\"!editing[rowIndex + '-allowedClinics'] && value == ''\">\n            Enter plan\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'allowedClinics', rowIndex)\" *ngIf=\"editing[rowIndex+ '-allowedClinics']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n       <ngx-datatable-column name=\"description\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Description</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'description')\" *ngIf=\"!editing[rowIndex + '-description'] && value != ''\">\n            {{value}}\n          </span>\n           <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'description')\" *ngIf=\"!editing[rowIndex + '-description'] && value == ''\">\n            Enter Description\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'description', rowIndex)\" *ngIf=\"editing[rowIndex+ '-description']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"amount\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Amount</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'amount')\" *ngIf=\"!editing[rowIndex + '-amount']\">\n         {{value}}  \n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'amount', rowIndex)\" *ngIf=\"editing[rowIndex+ '-amount']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"discount\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Discount</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'discount')\" *ngIf=\"!editing[rowIndex + '-discount']\">\n          {{value}}  \n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'discount', rowIndex)\" *ngIf=\"editing[rowIndex+ '-discount']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"id\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Actions</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\" style=\"width:266px!important;\">\n       \n          <button class=\"action_btn danger\" mat-menu-item (click) = \"deletePlan(rowIndex)\">\n         <i class=\"ti-trash text-danger m-r-10\"></i></button>\n        </ng-template>\n      </ngx-datatable-column>\n        </ngx-datatable>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/plans/plans.component.scss":
/*!********************************************!*\
  !*** ./src/app/plans/plans.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".lds-roller div::after {\n  background: black; }\n\n.spinner {\n  position: relative;\n  background: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVhbmFseXRpY3MvY2xpZW50Mi9zcmMvYXBwL3BsYW5zL3BsYW5zLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQWlCLEVBQ3BCOztBQUNEO0VBQ0ksbUJBQWtCO0VBQ2xCLGlCQUFnQixFQUNuQiIsImZpbGUiOiJzcmMvYXBwL3BsYW5zL3BsYW5zLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxkcy1yb2xsZXIgZGl2OjphZnRlciB7XG4gICAgYmFja2dyb3VuZDogYmxhY2s7XG59XG4uc3Bpbm5lciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG59Il19 */"

/***/ }),

/***/ "./src/app/plans/plans.component.ts":
/*!******************************************!*\
  !*** ./src/app/plans/plans.component.ts ***!
  \******************************************/
/*! exports provided: PlansComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlansComponent", function() { return PlansComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _plans_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plans.service */ "./src/app/plans/plans.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var data = __webpack_require__(/*! assets/company.json */ "./src/assets/company.json");
var PlansComponent = /** @class */ (function () {
    function PlansComponent(plansService, dialog, _cookieService, router) {
        var _this = this;
        this.plansService = plansService;
        this.dialog = dialog;
        this._cookieService = _cookieService;
        this.router = router;
        this.data = [
            {
                "dentist": "Ethel Price",
                "provider": "female",
                "company": "Johnson",
                "age": 22
            }
        ];
        this.editing = {};
        this.rows = [];
        this.temp = data.slice();
        this.loadingIndicator = true;
        this.reorderable = true;
        this.columns = [{ prop: 'id' }, { name: 'plan' }, { name: 'allowedClinics' }, { name: 'description' }, { name: 'amount' }, { name: 'discount' }];
        this.rows = data;
        this.temp = data.slice();
        setTimeout(function () {
            _this.loadingIndicator = false;
        }, 1500);
    }
    PlansComponent.prototype.ngAfterViewInit = function () {
        this.getPlans();
        $('#title').html('Users');
        $('.header_filters').hide();
    };
    PlansComponent.prototype.getPlans = function () {
        var _this = this;
        this.plansService.getPlans().subscribe(function (res) {
            if (res.message == 'success') {
                _this.rows = res.data;
                _this.temp = res.data.slice();
                _this.table = data;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    PlansComponent.prototype.deletePlan = function (row) {
        var _this = this;
        if (confirm("Are you sure to delete this plan?")) {
            if (this.rows[row]['id']) {
                this.plansService.deletePlan(this.rows[row]['id']).subscribe(function (res) {
                    if (res.message == 'success') {
                        alert('Plan Removed');
                        _this.getPlans();
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
    PlansComponent.prototype.addDentist = function () {
        var temp = {};
        temp['providerId'] = 'Enter Provider Id';
        temp['name'] = 'Enter Name';
        var length = this.rows.length;
        this.editing[length + '-providerId'] = true;
        this.editing[length + '-name'] = true;
        this.rows.push(temp);
        this.table = data;
    };
    PlansComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        // filter our data
        var temp = this.temp.filter(function (d) {
            return d.plan.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table = data;
    };
    PlansComponent.prototype.updateValue = function (event, cell, rowIndex) {
        var _this = this;
        this.editing[rowIndex + '-' + cell] = false;
        if (event.target.value == '')
            alert('Value cannot be empty!');
        else {
            this.rows[rowIndex][cell] = event.target.value;
            this.plansService.updateUser(this.rows[rowIndex]['id'], this.rows[rowIndex][cell], cell).subscribe(function (res) {
                if (res.message == 'success') {
                    alert('Plan Updated');
                    _this.getPlans();
                }
            }, function (error) {
                _this.warningMessage = "Please Provide Valid Inputs!";
            });
            this.rows = this.rows.slice();
        }
    };
    PlansComponent.prototype.enableEditing = function (rowIndex, cell) {
        this.editing[rowIndex + '-' + cell] = true;
    };
    PlansComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-table-filter',
            template: __webpack_require__(/*! ./plans.component.html */ "./src/app/plans/plans.component.html"),
            styles: [__webpack_require__(/*! ./plans.component.scss */ "./src/app/plans/plans.component.scss")]
        }),
        __metadata("design:paramtypes", [_plans_service__WEBPACK_IMPORTED_MODULE_1__["PlansService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], PlansComponent);
    return PlansComponent;
}());



/***/ }),

/***/ "./src/app/plans/plans.module.ts":
/*!***************************************!*\
  !*** ./src/app/plans/plans.module.ts ***!
  \***************************************/
/*! exports provided: PlansModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlansModule", function() { return PlansModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _plans_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plans.service */ "./src/app/plans/plans.service.ts");
/* harmony import */ var _plans_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plans.component */ "./src/app/plans/plans.component.ts");
/* harmony import */ var _plans_routing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./plans.routing */ "./src/app/plans/plans.routing.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var PlansModule = /** @class */ (function () {
    function PlansModule() {
    }
    PlansModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_plans_routing__WEBPACK_IMPORTED_MODULE_8__["PlansRoutes"]),
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["NgxDatatableModule"],
                _demo_material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"]
            ],
            providers: [
                _plans_service__WEBPACK_IMPORTED_MODULE_6__["PlansService"]
            ],
            declarations: [_plans_component__WEBPACK_IMPORTED_MODULE_7__["PlansComponent"]]
        })
    ], PlansModule);
    return PlansModule;
}());



/***/ }),

/***/ "./src/app/plans/plans.routing.ts":
/*!****************************************!*\
  !*** ./src/app/plans/plans.routing.ts ***!
  \****************************************/
/*! exports provided: PlansRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlansRoutes", function() { return PlansRoutes; });
/* harmony import */ var _plans_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plans.component */ "./src/app/plans/plans.component.ts");

var PlansRoutes = [
    {
        path: '',
        component: _plans_component__WEBPACK_IMPORTED_MODULE_0__["PlansComponent"],
        data: {
            title: 'Plans'
        }
    }
];


/***/ }),

/***/ "./src/app/plans/plans.service.ts":
/*!****************************************!*\
  !*** ./src/app/plans/plans.service.ts ***!
  \****************************************/
/*! exports provided: PlansService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlansService", function() { return PlansService; });
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





var PlansService = /** @class */ (function () {
    function PlansService(http, _cookieService) {
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
    PlansService.prototype.getPlans = function (user_id, clinic_id, token) {
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Plans/getPlans?token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Delete Clinic
    PlansService.prototype.deletePlan = function (user_id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('id', user_id);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/Plans/delete", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Update Clinic
    PlansService.prototype.updateUser = function (user_id, value, column, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('id', user_id);
        formData.append(column, value);
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('clinic_id', '1');
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/Plans/update/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Update Clinic
    PlansService.prototype.addClinic = function (name, address, contact_name, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('clinicName', name);
        formData.append('address', address);
        formData.append('contactName', contact_name);
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/Plans/add/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    PlansService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], PlansService);
    return PlansService;
}());



/***/ })

}]);
//# sourceMappingURL=plans-plans-module.js.map