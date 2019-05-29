(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dentist-dentist-module"],{

/***/ "./src/app/dentist/dentist.component.html":
/*!************************************************!*\
  !*** ./src/app/dentist/dentist.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-content>\n        <mat-card-title>Dentist</mat-card-title>\n        <input type='button' value='Add Dentist' (click)=\"addDentist()\">\n        <mat-form-field>\n            <input matInput type='text' class=\"form-control\" placeholder='Type to filter dentist name...' (keyup)='updateFilter($event)'\n            />\n        </mat-form-field>\n        <ngx-datatable #table class='material' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='rows'>\n            <ngx-datatable-column name=\"ProviderId\">\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n          <span title=\"Double click to edit\" (dblclick)=\"editing[rowIndex + '-providerId'] = true\" *ngIf=\"!editing[rowIndex + '-providerId']\">\n            {{value}}\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'providerId', rowIndex)\" *ngIf=\"editing[rowIndex+ '-providerId']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"Name\">\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'name')\" *ngIf=\"!editing[rowIndex + '-name']\">\n            {{value}}\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'name', rowIndex)\" *ngIf=\"editing[rowIndex+ '-name']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"Action\">\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n           <button mat-menu-item (click) = \"deleteDentists(rowIndex)\">\n         <i class=\"ti-trash text-danger m-r-10\"></i></button>\n        </ng-template>\n      </ngx-datatable-column>\n        </ngx-datatable>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/dentist/dentist.component.scss":
/*!************************************************!*\
  !*** ./src/app/dentist/dentist.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".lds-roller div::after {\n  background: black; }\n\n.spinner {\n  position: relative;\n  background: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVhbmFseXRpY3MvY2xpZW50Mi9zcmMvYXBwL2RlbnRpc3QvZGVudGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFpQixFQUNwQjs7QUFDRDtFQUNJLG1CQUFrQjtFQUNsQixpQkFBZ0IsRUFDbkIiLCJmaWxlIjoic3JjL2FwcC9kZW50aXN0L2RlbnRpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubGRzLXJvbGxlciBkaXY6OmFmdGVyIHtcbiAgICBiYWNrZ3JvdW5kOiBibGFjaztcbn1cbi5zcGlubmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7IFxuICAgIGJhY2tncm91bmQ6IG5vbmU7XG59Il19 */"

/***/ }),

/***/ "./src/app/dentist/dentist.component.ts":
/*!**********************************************!*\
  !*** ./src/app/dentist/dentist.component.ts ***!
  \**********************************************/
/*! exports provided: DentistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DentistComponent", function() { return DentistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dentist_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dentist.service */ "./src/app/dentist/dentist.service.ts");
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
var DentistComponent = /** @class */ (function () {
    function DentistComponent(dentistService) {
        var _this = this;
        this.dentistService = dentistService;
        this.editing = {};
        this.rows = [];
        this.temp = data.slice();
        this.loadingIndicator = true;
        this.reorderable = true;
        this.columns = [{ prop: 'providerId' }, { name: 'name' }, { name: 'Action' }];
        this.rows = data;
        this.temp = data.slice();
        setTimeout(function () {
            _this.loadingIndicator = false;
        }, 1500);
    }
    DentistComponent_1 = DentistComponent;
    DentistComponent.prototype.ngAfterViewInit = function () {
        this.getDentists();
    };
    DentistComponent.prototype.getDentists = function () {
        var _this = this;
        console.log(this.rows);
        this.dentistService.getDentists().subscribe(function (res) {
            if (res.message == 'success') {
                _this.rows = res.data;
                _this.temp = res.data.slice();
                _this.table = data;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    DentistComponent.prototype.deleteDentists = function (row) {
        var _this = this;
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
    };
    DentistComponent.prototype.addDentist = function () {
        console.log(this.rows);
        var temp = {};
        temp['providerId'] = 'Enter Provider Id';
        temp['name'] = 'Enter Name';
        var length = this.rows.length;
        this.editing[length + '-providerId'] = true;
        this.editing[length + '-name'] = true;
        this.rows.push(temp);
        this.table = data;
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
            this.dentistService.updateDentists(this.rows[rowIndex]['providerId'], this.rows[rowIndex][cell]).subscribe(function (res) {
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
        __metadata("design:paramtypes", [_dentist_service__WEBPACK_IMPORTED_MODULE_1__["DentistService"]])
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
                _demo_material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"]
            ],
            providers: [
                _dentist_service__WEBPACK_IMPORTED_MODULE_6__["DentistService"]
            ],
            declarations: [_dentist_component__WEBPACK_IMPORTED_MODULE_7__["DentistComponent"]]
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


/***/ })

}]);
//# sourceMappingURL=dentist-dentist-module.js.map