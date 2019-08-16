(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dentist-goals-dentist-goals-module"],{

/***/ "./src/app/dentist-goals/dentist-goals.component.html":
/*!************************************************************!*\
  !*** ./src/app/dentist-goals/dentist-goals.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n         <mat-form-field *ngIf=\"user_id != '1'\">\n      <mat-select placeholder=\"All Dentist( {{dentistCount}} )\"  [(ngModel)]=\"selectedDentist\" (ngModelChange)=\"loadDentist($event)\">\n        <mat-option value =\"\">All Dentists</mat-option>\n        <mat-option *ngFor=\"let dentist of dentists\" [value]=\"dentist.providerId\">\n          {{dentist.name}}\n        </mat-option>\n      </mat-select>\n    </mat-form-field> \n        <mat-card>\n            <mat-card-content>\n                Dentist Goals\n                <!-- ============================================================== -->\n                <!-- column -->\n                <!-- ============================================================== -->\n                <div fxLayout=\"row wrap\">\n                    <!-- Card column -->\n                    <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\" class=\"sa_mattabs_design sa_matforms_design\">\n\n                        <form [formGroup]=\"form\" class=\"basic-form\" (ngSubmit)=\"onSubmit()\">\n\n                            <mat-tab-group dynamicHeight>\n                                <mat-tab label=\"Clinician Analysis\">\n                                    <div class=\"example-small-box mat-elevation-z4\">\n                                        <div fxLayout=\"row wrap\">\n                                            <!-- column -->\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n                                                    <input matInput placeholder=\"Dentist Production value\" [formControl]=\"form.controls['dentistprod']\" [(ngModel)]= \"dentistprod\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n                                                    <input matInput placeholder=\"Treatment Plan Completion Rate (%) value\" [formControl]=\"form.controls['treatmentplan']\" [(ngModel)]=\"treatmentplan\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Treatment Plan Average Cost value\" [formControl]=\"form.controls['planaverage']\" [(ngModel)]=\"planaverage\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Recall Prebook Rate value\" [formControl]=\"form.controls['recallrate']\" [(ngModel)]=\"recallrate\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Treatment Prebook Rate value\" [formControl]=\"form.controls['rebookrate']\" [(ngModel)]=\"rebookrate\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"No. Patient Complaints value\" [formControl]=\"form.controls['patientcomplaints']\" [(ngModel)]=\"patientcomplaints\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Hourly Rate value\" [formControl]=\"form.controls['hourlyrate']\" [(ngModel)]=\"hourlyrate\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"No. New Patients  value\" [formControl]=\"form.controls['newpatients']\" [(ngModel)]=\"newpatients\">\n                                                </mat-form-field>\n                                            </div>\n                                        </div>\n                                        <mat-card-actions>\n                                            <button mat-raised-button color=\"dc\" type=\"submit\">Submit</button>\n                                        </mat-card-actions>\n                                        <!-- column -->\n                                    </div>\n                                </mat-tab>\n\n\n                                <mat-tab label=\"Clinician Procedures & Referrals\">\n                                    <div class=\"example-small-box mat-elevation-z4\">\n                                        <div fxLayout=\"row wrap\">\n                                            <!-- column -->\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Items Predictor Analysis  value\" [formControl]=\"form.controls['itempredictor']\" [(ngModel)]= \"itempredictor\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Predictor Ratio 1: (Crown to Large Filling Ratio) value\" [formControl]=\"form.controls['ratio1']\" [(ngModel)]=\"ratio1\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Predictor Ratio 2: (Extraction to RCT Ratio) value\" [formControl]=\"form.controls['ratio2']\" [(ngModel)]=\"ratio2\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Predictor Ratio 3: (RCT Conversion Ratio) value\" [formControl]=\"form.controls['ratio3']\" [(ngModel)]=\"ratio3\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Total Revenue of Clinician Per Procedure value\" [formControl]=\"form.controls['totalrevenue']\" [(ngModel)]=\"totalrevenue\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Referral to Other Clinicians Internal / External value\" [formControl]=\"form.controls['referralclinician']\" [(ngModel)]=\"referralclinician\">\n                                                </mat-form-field>\n                                            </div>\n                                        </div>\n                                        <mat-card-actions>\n                                            <button mat-raised-button color=\"dc\" type=\"submit\">Submit</button>\n                                        </mat-card-actions>\n                                        <!-- column -->\n                                    </div>\n                                </mat-tab>\n                                <mat-tab label=\"Front Desk\">\n                                    <div class=\"example-small-box mat-elevation-z4\">\n                                        <div fxLayout=\"row wrap\">\n                                            <!-- column -->\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Items Predictor Analysis  value\" [formControl]=\"form.controls['utilisationrate']\" [(ngModel)]= \"utilisationrate\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Recall prebook rate (%) value\" [formControl]=\"form.controls['recallprebook']\" [(ngModel)]=\"recallprebook\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Treatment prebook rate (%) value\" [formControl]=\"form.controls['treatmentprebook']\" [(ngModel)]=\"treatmentprebook\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"FTA ratio (%) value\" [formControl]=\"form.controls['fta']\" [(ngModel)]=\"fta\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"UTA ratio (%) value\" [formControl]=\"form.controls['uta']\" [(ngModel)]=\"uta\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Number of Ticks value\" [formControl]=\"form.controls['noticks']\" [(ngModel)]=\"noticks\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Recall Attendance Rate value\" [formControl]=\"form.controls['attendancerate']\" [(ngModel)]=\"attendancerate\">\n                                                </mat-form-field>\n                                            </div>\n                                        </div>\n                                        <mat-card-actions>\n                                            <button mat-raised-button color=\"dc\" type=\"submit\">Submit</button>\n                                        </mat-card-actions>\n                                        <!-- column -->\n                                    </div>\n                                </mat-tab>\n\n                                <mat-tab label=\"Marketing\">\n                                    <div class=\"example-small-box mat-elevation-z4\">\n                                        <div fxLayout=\"row wrap\">\n                                            <!-- column -->\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"No. New Patients By Referral  value\" [formControl]=\"form.controls['referralpatient']\" [(ngModel)]= \"referralpatient\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Revenue by Referral value\" [formControl]=\"form.controls['revenuereferral']\" [(ngModel)]=\"revenuereferral\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Total Visits value\" [formControl]=\"form.controls['visits']\" [(ngModel)]=\"visits\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"No. New Patients value\" [formControl]=\"form.controls['newpatients2']\" [(ngModel)]=\"newpatients2\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Cost of New Patient Acquisition value\" [formControl]=\"form.controls['patientcost']\" [(ngModel)]=\"patientcost\">\n                                                </mat-form-field>\n                                            </div>\n                                        </div>\n                                        <mat-card-actions>\n                                            <button mat-raised-button color=\"dc\" type=\"submit\">Submit</button>\n                                        </mat-card-actions>\n                                        <!-- column -->\n                                    </div>\n                                </mat-tab>\n\n                                <mat-tab label=\"Finances\">\n                                    <div class=\"example-small-box mat-elevation-z4\">\n                                        <div fxLayout=\"row wrap\">\n                                            <!-- column -->\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Net Profit value\" [formControl]=\"form.controls['netprofit']\" [(ngModel)]= \"netprofit\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Net Profit % (Xero) value\" [formControl]=\"form.controls['netprofitxero']\" [(ngModel)]=\"netprofitxero\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Net Profit % (PMS) value\" [formControl]=\"form.controls['netprofitpms']\" [(ngModel)]=\"netprofitpms\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Expenses value\" [formControl]=\"form.controls['expenses']\" [(ngModel)]=\"expenses\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"% of Production By Clinician value\" [formControl]=\"form.controls['productionclinician']\" [(ngModel)]=\"productionclinician\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Total Production value\" [formControl]=\"form.controls['totalproduction']\" [(ngModel)]=\"totalproduction\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Collection value\" [formControl]=\"form.controls['collection']\" [(ngModel)]=\"collection\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Production Per Visit value\" [formControl]=\"form.controls['visitproduction']\" [(ngModel)]=\"visitproduction\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Total Discounts value\" [formControl]=\"form.controls['discount']\" [(ngModel)]=\"discount\">\n                                                </mat-form-field>\n                                            </div>\n                                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                                                <mat-form-field>\n\n                                                    <input matInput placeholder=\"Overdue Accounts value\" [formControl]=\"form.controls['overdueaccount']\" [(ngModel)]=\"overdueaccount\">\n                                                </mat-form-field>\n                                            </div>\n                                        </div>\n                                        <mat-card-actions>\n                                            <button mat-raised-button color=\"dc\" type=\"submit\">Submit</button>\n                                        </mat-card-actions>\n                                        <!-- column -->\n                                    </div>\n                                </mat-tab>\n                            </mat-tab-group>\n                        </form>\n\n\n                    </div>\n                </div>\n\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/dentist-goals/dentist-goals.component.scss":
/*!************************************************************!*\
  !*** ./src/app/dentist-goals/dentist-goals.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%; }\n\n.example-full-width {\n  width: 90%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVhbmFseXRpY3MvY2xpZW50Mi9zcmMvYXBwL2RlbnRpc3QtZ29hbHMvZGVudGlzdC1nb2Fscy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFnQjtFQUNoQixpQkFBZ0I7RUFDaEIsWUFBVyxFQUNaOztBQUVEO0VBQ0UsV0FBVSxFQUNYIiwiZmlsZSI6InNyYy9hcHAvZGVudGlzdC1nb2Fscy9kZW50aXN0LWdvYWxzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4YW1wbGUtZm9ybSB7XG4gIG1pbi13aWR0aDogMTUwcHg7XG4gIG1heC13aWR0aDogNTAwcHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uZXhhbXBsZS1mdWxsLXdpZHRoIHtcbiAgd2lkdGg6IDkwJTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/dentist-goals/dentist-goals.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/dentist-goals/dentist-goals.component.ts ***!
  \**********************************************************/
/*! exports provided: DentistGoalsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DentistGoalsComponent", function() { return DentistGoalsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _dentist_goals_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dentist-goals.service */ "./src/app/dentist-goals/dentist-goals.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _dentist_dentist_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dentist/dentist.service */ "./src/app/dentist/dentist.service.ts");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_5__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DentistGoalsComponent = /** @class */ (function () {
    function DentistGoalsComponent(fb, dentistGoalsService, route, dentistService, _cookieService, router) {
        this.fb = fb;
        this.dentistGoalsService = dentistGoalsService;
        this.route = route;
        this.dentistService = dentistService;
        this._cookieService = _cookieService;
        this.router = router;
        this.clinic_id = {};
        this.dentistCount = {};
        this.dentists = [
            { providerId: 'all', name: 'All Dentists' },
        ];
        this.errorLogin = false;
        this.dentistprod = 0;
        this.treatmentplan = 0;
        this.planaverage = 0;
        this.recallrate = 0;
        this.rebookrate = 0;
        this.patientcomplaints = 0;
        this.hourlyrate = 0;
        this.newpatients = 0;
        this.itempredictor = 0;
        this.ratio1 = 0;
        this.ratio2 = 0;
        this.ratio3 = 0;
        this.totalrevenue = 0;
        this.referralclinician = 0;
        this.utilisationrate = 0;
        this.recallprebook = 0;
        this.treatmentprebook = 0;
        this.fta = 0;
        this.uta = 0;
        this.noticks = 0;
        this.attendancerate = 0;
        this.referralpatient = 0;
        this.revenuereferral = 0;
        this.visits = 0;
        this.newpatients2 = 0;
        this.patientcost = 0;
        this.netprofit = 0;
        this.netprofitxero = 0;
        this.netprofitpms = 0;
        this.expenses = 0;
        this.productionclinician = 0;
        this.totalproduction = 0;
        this.visitproduction = 0;
        this.collection = 0;
        this.discount = 0;
        this.overdueaccount = 0;
        this.dentist_id = '';
        // public chartData: any[] = [];
        this.chartData = {};
        // For form validator
        this.email = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]);
        // Sufix and prefix
        this.hide = true;
        this.clinic_id = this.route.snapshot.paramMap.get("id");
        this.options = fb.group({
            hideRequired: false,
            floatLabel: 'auto'
        });
    }
    DentistGoalsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user_id = this._cookieService.get("userid");
        this.route.params.subscribe(function (params) {
            if (_this._cookieService.get("userid") != '1') {
                _this.clinic_id = _this.route.snapshot.paramMap.get("id");
            }
            else {
                _this.clinic_id = '';
            }
            _this.getDentistGoals();
            _this.getDentists();
            $('#title').html('Dentist Goals');
            $('.external_clinic').show();
            $('.external_dentist').hide();
        });
        this.form = this.fb.group({
            dentistprod: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            treatmentplan: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            planaverage: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            recallrate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            rebookrate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            patientcomplaints: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            newpatients: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            hourlyrate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            itempredictor: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            ratio1: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            ratio2: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            ratio3: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            totalrevenue: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            referralclinician: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            utilisationrate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            recallprebook: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            treatmentprebook: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            fta: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            uta: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            noticks: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            attendancerate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            referralpatient: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            revenuereferral: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            visits: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            newpatients2: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            patientcost: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            netprofit: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            netprofitxero: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            netprofitpms: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            expenses: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            productionclinician: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            totalproduction: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            collection: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            visitproduction: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            discount: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            overdueaccount: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
        });
    };
    DentistGoalsComponent.prototype.getErrorMessage = function () {
        return this.email.hasError('required')
            ? 'You must enter a value'
            : this.email.hasError('email')
                ? 'Not a valid email'
                : '';
    };
    DentistGoalsComponent.prototype.getDentistGoals = function (dentist_id) {
        var _this = this;
        if (dentist_id === void 0) { dentist_id = ''; }
        this.dentistGoalsService.getDentistGoals(this.clinic_id, dentist_id).subscribe(function (res) {
            if (res.message == 'success') {
                _this.dentistprod = res.data[1].value;
                _this.treatmentplan = res.data[2].value;
                _this.planaverage = res.data[3].value;
                _this.recallrate = res.data[4].value;
                _this.rebookrate = res.data[5].value;
                _this.patientcomplaints = res.data[6].value;
                _this.hourlyrate = res.data[7].value;
                _this.newpatients = res.data[8].value;
                _this.itempredictor = res.data[9].value;
                _this.ratio1 = res.data[10].value;
                _this.ratio2 = res.data[11].value;
                _this.ratio3 = res.data[12].value;
                _this.totalrevenue = res.data[13].value;
                _this.referralclinician = res.data[14].value;
                _this.utilisationrate = res.data[15].value;
                _this.recallprebook = res.data[16].value;
                _this.treatmentprebook = res.data[17].value;
                _this.fta = res.data[18].value;
                _this.uta = res.data[19].value;
                _this.noticks = res.data[20].value;
                _this.attendancerate = res.data[21].value;
                _this.referralpatient = res.data[22].value;
                _this.revenuereferral = res.data[23].value;
                _this.visits = res.data[24].value;
                _this.newpatients2 = res.data[25].value;
                _this.patientcost = res.data[26].value;
                _this.netprofit = res.data[27].value;
                _this.netprofitxero = res.data[28].value;
                _this.netprofitpms = res.data[29].value;
                _this.expenses = res.data[30].value;
                _this.productionclinician = res.data[31].value;
                _this.totalproduction = res.data[32].value;
                _this.collection = res.data[33].value;
                _this.visitproduction = res.data[34].value;
                _this.discount = res.data[35].value;
                _this.overdueaccount = res.data[36].value;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    DentistGoalsComponent.prototype.onSubmit = function () {
        var _this = this;
        this.chartData[1] = this.form.value.dentistprod;
        this.chartData[2] = this.form.value.treatmentplan;
        this.chartData[3] = this.form.value.planaverage;
        this.chartData[4] = this.form.value.recallrate;
        this.chartData[5] = this.form.value.rebookrate;
        this.chartData[6] = this.form.value.patientcomplaints;
        this.chartData[7] = this.form.value.hourlyrate;
        this.chartData[8] = this.form.value.newpatients;
        this.chartData[9] = this.form.value.itempredictor;
        this.chartData[10] = this.form.value.ratio1;
        this.chartData[11] = this.form.value.ratio2;
        this.chartData[12] = this.form.value.ratio3;
        this.chartData[13] = this.form.value.totalrevenue;
        this.chartData[14] = this.form.value.referralclinician;
        this.chartData[15] = this.form.value.utilisationrate;
        this.chartData[16] = this.form.value.recallprebook;
        this.chartData[17] = this.form.value.treatmentprebook;
        this.chartData[18] = this.form.value.fta;
        this.chartData[19] = this.form.value.uta;
        this.chartData[20] = this.form.value.noticks;
        this.chartData[21] = this.form.value.attendancerate;
        this.chartData[22] = this.form.value.referralpatient;
        this.chartData[23] = this.form.value.revenuereferral;
        this.chartData[24] = this.form.value.visits;
        this.chartData[25] = this.form.value.newpatients2;
        this.chartData[26] = this.form.value.patientcost;
        this.chartData[27] = this.form.value.netprofit;
        this.chartData[28] = this.form.value.netprofitxero;
        this.chartData[29] = this.form.value.netprofitpms;
        this.chartData[30] = this.form.value.expenses;
        this.chartData[31] = this.form.value.productionclinician;
        this.chartData[32] = this.form.value.totalproduction;
        this.chartData[33] = this.form.value.collection;
        this.chartData[34] = this.form.value.visitproduction;
        this.chartData[35] = this.form.value.discount;
        this.chartData[36] = this.form.value.overdueaccount;
        var myJsonString = JSON.stringify(this.chartData);
        console.log(myJsonString);
        this.dentistGoalsService.updateDentistGoals(myJsonString, this.clinic_id, this.dentist_id).subscribe(function (res) {
            if (res.message == 'success') {
                alert('Dentist Goals Updated');
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    // Get Dentist
    DentistGoalsComponent.prototype.getDentists = function () {
        var _this = this;
        this.dentistService.getDentists(this.clinic_id).subscribe(function (res) {
            if (res.message == 'success') {
                _this.dentists = res.data;
                _this.dentistCount = res.data.length;
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
    DentistGoalsComponent.prototype.loadDentist = function (newValue) {
        this.dentist_id = newValue;
        this.getDentistGoals(newValue);
    };
    DentistGoalsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-formlayout',
            template: __webpack_require__(/*! ./dentist-goals.component.html */ "./src/app/dentist-goals/dentist-goals.component.html"),
            styles: [__webpack_require__(/*! ./dentist-goals.component.scss */ "./src/app/dentist-goals/dentist-goals.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _dentist_goals_service__WEBPACK_IMPORTED_MODULE_2__["DentistGoalsService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _dentist_dentist_service__WEBPACK_IMPORTED_MODULE_4__["DentistService"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_5__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], DentistGoalsComponent);
    return DentistGoalsComponent;
}());



/***/ }),

/***/ "./src/app/dentist-goals/dentist-goals.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/dentist-goals/dentist-goals.module.ts ***!
  \*******************************************************/
/*! exports provided: DentistGoalsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DentistGoalsModule", function() { return DentistGoalsModule; });
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _dentist_goals_routing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dentist-goals.routing */ "./src/app/dentist-goals/dentist-goals.routing.ts");
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/index.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng2-file-upload/ng2-file-upload */ "./node_modules/ng2-file-upload/ng2-file-upload.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/esm5/tree.es5.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng-multiselect-dropdown */ "./node_modules/ng-multiselect-dropdown/fesm5/ng-multiselect-dropdown.js");
/* harmony import */ var _dentist_goals_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./dentist-goals.component */ "./src/app/dentist-goals/dentist-goals.component.ts");
/* harmony import */ var _dentist_goals_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./dentist-goals.service */ "./src/app/dentist-goals/dentist-goals.service.ts");
/* harmony import */ var _dentist_dentist_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../dentist/dentist.service */ "./src/app/dentist/dentist.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var DentistGoalsModule = /** @class */ (function () {
    function DentistGoalsModule() {
    }
    DentistGoalsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_dentist_goals_routing__WEBPACK_IMPORTED_MODULE_7__["DentistGoalsRoutes"]),
                _demo_material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__["FlexLayoutModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                ngx_quill__WEBPACK_IMPORTED_MODULE_8__["QuillModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_9__["FileUploadModule"],
                _angular_material_tree__WEBPACK_IMPORTED_MODULE_10__["MatTreeModule"],
                _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_11__["MatDatepickerModule"],
                ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_12__["NgMultiSelectDropDownModule"].forRoot()
            ],
            providers: [
                _dentist_goals_service__WEBPACK_IMPORTED_MODULE_14__["DentistGoalsService"], _dentist_dentist_service__WEBPACK_IMPORTED_MODULE_15__["DentistService"]
            ],
            declarations: [
                _dentist_goals_component__WEBPACK_IMPORTED_MODULE_13__["DentistGoalsComponent"]
            ]
        })
    ], DentistGoalsModule);
    return DentistGoalsModule;
}());



/***/ }),

/***/ "./src/app/dentist-goals/dentist-goals.routing.ts":
/*!********************************************************!*\
  !*** ./src/app/dentist-goals/dentist-goals.routing.ts ***!
  \********************************************************/
/*! exports provided: DentistGoalsRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DentistGoalsRoutes", function() { return DentistGoalsRoutes; });
/* harmony import */ var _dentist_goals_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dentist-goals.component */ "./src/app/dentist-goals/dentist-goals.component.ts");

var DentistGoalsRoutes = [
    {
        path: '',
        component: _dentist_goals_component__WEBPACK_IMPORTED_MODULE_0__["DentistGoalsComponent"],
        data: {
            title: 'Dentist Goals'
        }
    }
];


/***/ }),

/***/ "./src/app/dentist-goals/dentist-goals.service.ts":
/*!********************************************************!*\
  !*** ./src/app/dentist-goals/dentist-goals.service.ts ***!
  \********************************************************/
/*! exports provided: DentistGoalsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DentistGoalsService", function() { return DentistGoalsService; });
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





var DentistGoalsService = /** @class */ (function () {
    function DentistGoalsService(http, _cookieService) {
        this.http = http;
        this._cookieService = _cookieService;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl;
        //append headers
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
    }
    // Get ClinicGoals
    DentistGoalsService.prototype.getDentistGoals = function (clinic_id, dentist_id, user_id, token) {
        if (clinic_id === void 0) { clinic_id = ''; }
        if (dentist_id === void 0) { dentist_id = ''; }
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Goals/getDentistGoals?user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token") + "&dentist_id=" + dentist_id, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Get ClinicGoals
    DentistGoalsService.prototype.updateDentistGoals = function (clinicData, clinic_id, dentist_id, user_id, token) {
        if (clinic_id === void 0) { clinic_id = ''; }
        if (dentist_id === void 0) { dentist_id = ''; }
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('goals', clinicData);
        formData.append('user_id', user_id);
        formData.append('clinic_id', clinic_id);
        formData.append('dentist_id', dentist_id);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/Goals/addDentistGoal/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    DentistGoalsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], DentistGoalsService);
    return DentistGoalsService;
}());



/***/ })

}]);
//# sourceMappingURL=dentist-goals-dentist-goals-module.js.map