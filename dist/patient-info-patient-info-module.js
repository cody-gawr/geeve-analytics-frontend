(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["patient-info-patient-info-module"],{

/***/ "./src/app/patient-info/dialog-overview-example.html":
/*!***********************************************************!*\
  !*** ./src/app/patient-info/dialog-overview-example.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Add/Edit Benefits</h1>\n<div mat-dialog-content>\n\n  <mat-form-field>\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.treatmentName\" placeholder=\"Benefits\">\n  </mat-form-field>\n\n  <mat-form-field>\n    <input matInput tabindex=\"1\" type=\"number\" id=\"totalsittings\" min=\"0\" (change)=\"totalsittings(data.totalsitting)\" [(ngModel)]=\"data.totalsitting\" placeholder=\"No. of sittings\">\n  </mat-form-field>\n\n  <ngx-datatable #table class='material responsive-datatable' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\" [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='data.sittings'>\n   \n    <ngx-datatable-column prop=\"sr\" name=\"sr\">\n          <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Sittings</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n          <span>\n            Sittings {{rowIndex + 1}}\n          </span>\n        </ng-template>\n\n    </ngx-datatable-column>\n      <ngx-datatable-column prop=\"sitting_status\" name=\"sitting_status\">\n          <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Sitting status</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span >\n            <mat-checkbox checked=\"true\" *ngIf=\"value=='ACTIVE'\" (change)=\"statusupdate(rowIndex,$event)\">\n\n            </mat-checkbox>\n            <mat-checkbox  *ngIf=\"value=='INACTIVE'\" (change)=\"statusupdate(rowIndex,$event)\">\n     \n            </mat-checkbox>\n          </span>\n            </ng-template>\n      </ngx-datatable-column>\n    \n    <ngx-datatable-column prop=\"performed_date\" name=\"performed_date\">\n        <ng-template let-column=\"column\" ngx-datatable-header-template>\n      <span>Performed Date</span>\n    </ng-template>\n      <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\"   let-row=\"row\" let-value=\"value\">\n        <span *ngIf=\"value !=='NULL'\" >\n          {{value | date: 'dd-MM-yyyy'}}\n        </span>\n            </ng-template>\n    </ngx-datatable-column>\n    \n    <ngx-datatable-column prop=\"id\" name=\"id\">\n      <ng-template let-column=\"column\" ngx-datatable-header-template>\n    <span>Action</span>\n  </ng-template>\n    <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n      <span >\n        <button mat-button tabindex=\"-1\"  *ngIf=\"value==''\" (click)=\"deleterow(rowIndex)\"  class=\"mat-raised-button mat-gray\">Delete</button>\n      </span>\n          </ng-template>\n  </ngx-datatable-column>\n\n  </ngx-datatable>\n\n</div>\n<div mat-dialog-actions>\n  <button mat-button [mat-dialog-close]=\"data\" tabindex=\"2\" class=\"mat-raised-button mat-dc\">Ok</button>\n  <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\" class=\"mat-raised-button mat-gray\">No Thanks</button>\n</div>\n\n\n"

/***/ }),

/***/ "./src/app/patient-info/patient-info.component.html":
/*!**********************************************************!*\
  !*** ./src/app/patient-info/patient-info.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\r\n<!-- Card Grid-->\r\n<!-- ============================================================== -->\r\n<div fxLayout=\"row wrap\">\r\n    <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\r\n        <mat-card>\r\n            <mat-card-content>\r\n               \r\n                <mat-card-title> Patient Plan Details | {{mainpatientname | titlecase}}</mat-card-title>\r\n               <!-- ============================================================== -->\r\n                <!-- column -->\r\n                <!-- ============================================================== -->\r\n                <div fxLayout=\"row wrap\">\r\n                    <!-- Card column -->\r\n                    <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\" class=\"sa_mattabs_design sa_matforms_design\">\r\n\r\n                            <mat-tab-group dynamicHeight>\r\n                         \r\n                        <!-- Plan Details tab -->\r\n                              <mat-tab label=\"Plan Details\">\r\n                                <form>                                \r\n                                  <table>\r\n                                      <tr>\r\n                                          <th>Plan</th>\r\n                                          <td>&nbsp;&nbsp;</td>\r\n                                          <td>{{plan_name}}</td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <th>No. of Members</th>\r\n                                            <td>&nbsp;&nbsp;</td>\r\n                                            <td>{{total_subpatient}}</td>\r\n                                          </tr>\r\n                                    <tr>\r\n                                      <th>Payment Amount</th>\r\n                                      <td>&nbsp;&nbsp;</td>\r\n                                      <td>${{patient_amount}}</td>\r\n                                    </tr>\r\n                                  \r\n                                    <tr>\r\n                                      <th>&nbsp;</th>\r\n                                     </tr>\r\n                                   </table>\r\n                                </form>\r\n\r\n                                   \r\n                         <ngx-datatable #table class='material responsive-datatable' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\r\n                                  [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='rows'>\r\n                             <ngx-datatable-column prop=\"sr\" name=\"sr\">\r\n                               <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                              <span>Id</span>\r\n                            </ng-template>\r\n                              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\r\n                                <span>\r\n                                  {{rowIndex + 1}}\r\n                                </span>\r\n                              </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column prop=\"sub_patients_name\" name=\"sub_patients_name\">\r\n                               <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                              <span>Name</span>\r\n                            </ng-template>\r\n                              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                                <span >\r\n                                  {{value}}\r\n                                </span>\r\n                                    </ng-template>\r\n                            </ngx-datatable-column>\r\n                      \r\n                             <ngx-datatable-column prop=\"sub_patients_age\" name=\"sub_patients_age\">\r\n                               <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                              <span>Age</span>\r\n                            </ng-template>\r\n                              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                                <span >\r\n                                  {{value}}\r\n                                </span>\r\n                               \r\n                              </ng-template>\r\n                            </ngx-datatable-column>\r\n                      \r\n                            <ngx-datatable-column prop=\"sub_patients_gender\" name=\"sub_patients_gender\">\r\n                              <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                             <span>Gender</span>\r\n                           </ng-template>\r\n                             <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                               <span >\r\n                                 {{value}}\r\n                               </span>\r\n                              \r\n                             </ng-template>\r\n                           </ngx-datatable-column>\r\n                      \r\n                        \r\n                          </ngx-datatable>\r\n\r\n                            </mat-tab>\r\n\r\n                        <!-- Benefits Used tab -->\r\n                          <mat-tab label=\"Benefits Used\">\r\n\r\n                              <ngx-datatable #table class='material responsive-datatable' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\r\n                                      [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='benefit'>\r\n                                 <ngx-datatable-column prop=\"sr\" name=\"sr\">\r\n                                   <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                                  <span>Id</span>\r\n                                </ng-template>\r\n                                  <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\r\n                                    <span>\r\n                                      {{rowIndex + 1}}\r\n                                    </span>\r\n                                  </ng-template>\r\n                                </ngx-datatable-column>\r\n                                <ngx-datatable-column prop=\"treatmentName\" name=\"treatmentName\">\r\n                                   <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                                  <span>Treatment Name</span>\r\n                                </ng-template>\r\n                                  <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                                    <span >\r\n                                      {{value}}\r\n                                    </span>\r\n                                        </ng-template>\r\n                                </ngx-datatable-column>\r\n                          \r\n                                 <ngx-datatable-column prop=\"percentage\" name=\"percentage\">\r\n                                   <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                                  <span>Percentage</span>\r\n                                </ng-template>\r\n                                  <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                                    <span >\r\n                                      {{value}} %\r\n                                    </span>\r\n                                   \r\n                                    <mat-progress-bar mode=\"determinate\" value={{value}}></mat-progress-bar>\r\n                                  </ng-template>\r\n                                </ngx-datatable-column>\r\n                          \r\n                                <ngx-datatable-column prop=\"percentage\" name=\"percentage\">\r\n                                  <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                                 <span>Status</span>\r\n                               </ng-template>\r\n                                 <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                                   <span *ngIf=\"value=='100.00'\" >\r\n                                    Completed\r\n                                   </span>\r\n                                   <span *ngIf=\"value!=='100.00'\" >\r\n                                    In-Process\r\n                                   </span>\r\n                                  \r\n                                  \r\n                                 </ng-template>\r\n                               </ngx-datatable-column>\r\n                          \r\n                               <ngx-datatable-column prop=\"performed_date\" name=\"performed_date\">\r\n                                <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                               <span>Completion Date</span>\r\n                             </ng-template>\r\n                               <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                              \r\n                                <span>\r\n                                   {{value | date: 'dd-MM-yyyy'}}\r\n                                 </span>\r\n                                \r\n                               </ng-template>\r\n\r\n                             </ngx-datatable-column>\r\n                            \r\n                             <ngx-datatable-column name=\"id\">\r\n                              <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                             <span>Actions</span>\r\n                           </ng-template>\r\n                             <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\" style=\"width:266px!important;\">\r\n                               <a class=\"action_btn golden\" (click)=\"openDialog(rowIndex)\" title= 'Patients Details'><i class=\"ti-settings  m-r-10\"></i></a>\r\n                               <button class=\"action_btn danger\" mat-menu-item (click) = \"deleteBenefitsUsed(rowIndex)\">\r\n                              <i class=\"ti-trash text-danger m-r-10\"></i></button>\r\n                             </ng-template>\r\n                           </ngx-datatable-column>\r\n\r\n                              </ngx-datatable>\r\n    \r\n                                </mat-tab>\r\n\r\n                      <!-- Contract Upload tab -->\r\n                                <mat-tab label=\"Contract Upload\">\r\n                             \r\n                                  <form [formGroup]=\"form\" class=\"basic-form\" (ngSubmit)=\"onSubmit()\">\r\n                                    <div class=\"bd_UpoadImage\" fxFlex.gt-md=\"100\" fxFlex=\"100\">\r\n                                        <label>Upload Agreement</label><br>\r\n                                        <div class=\"upload-btn\">\r\n                                            <span>Choose file</span>\r\n                                            <input class=\"\" type=\"file\" placeholder=\"\" name= \"file\" id=\"file\" (change)=\"uploadImage($event.target.files)\">\r\n                                            <input type='hidden'  placeholder=\"\" id=\"imageURL\" >\r\n                                        </div>\r\n                                                          \r\n                                     </div>\r\n                               \r\n                                   <p>\r\n                                      <button mat-raised-button color=\"dc\">Save</button>\r\n                                   </p>\r\n                                   </form>\r\n                                  <p *ngIf=\"contract_url; else empty\">\r\n                                    Download Agreement\r\n                                    <a mat-raised-button class=\"contractupload\" color=\"accent\" target=\"_blank\" href=\"{{contract_url}}\">Download</a>\r\n                                </p>\r\n                                </mat-tab>\r\n\r\n                    <!-- Payment History tab -->\r\n\r\n                          <mat-tab label=\"Payment History\">\r\n                                 \r\n                           <ngx-datatable #table class='material responsive-datatable' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\r\n                                  [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='payment'>\r\n                             <ngx-datatable-column prop=\"sr\" name=\"sr\">\r\n                               <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                              <span>Id</span>\r\n                            </ng-template>\r\n                              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\r\n                                <span>\r\n                                  {{rowIndex + 1}}\r\n                                </span>\r\n                              </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column prop=\"customer_id\" name=\"customer_id\">\r\n                               <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                              <span>Customer ID</span>\r\n                            </ng-template>\r\n                              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                                <span >\r\n                                  {{value}}\r\n                                </span>\r\n                                    </ng-template>\r\n                            </ngx-datatable-column>\r\n\r\n                            <ngx-datatable-column prop=\"subscr_id\" name=\"subscr_id\">\r\n                              <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                             <span>Subscriber ID</span>\r\n                           </ng-template>\r\n                             <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                               <span >\r\n                                 {{value}}\r\n                               </span>\r\n                                   </ng-template>\r\n                           </ngx-datatable-column>\r\n\r\n                             <ngx-datatable-column prop=\"invoice_date\" name=\"invoice_date\">\r\n                               <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                              <span>Invoice Date</span>\r\n                            </ng-template>\r\n                              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                                <span >\r\n                                  {{value | date: 'dd-MM-yyyy'}}\r\n                                </span>\r\n                               \r\n                              </ng-template>\r\n                            </ngx-datatable-column>\r\n                      \r\n                            <ngx-datatable-column prop=\"payment_plan_name\" name=\"payment_plan_name\">\r\n                              <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                             <span>Plan </span>\r\n                           </ng-template>\r\n                             <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                               <span >\r\n                                 {{payment_plan_name}}\r\n                               </span>\r\n                              \r\n                             </ng-template>\r\n                           </ngx-datatable-column>\r\n\r\n\r\n                            <ngx-datatable-column prop=\"amount\" name=\"amount\">\r\n                              <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                             <span>Amount</span>\r\n                           </ng-template>\r\n                             <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                               <span >\r\n                                 {{value}}\r\n                               </span>\r\n                              \r\n                             </ng-template>\r\n                           </ngx-datatable-column>\r\n                      \r\n\r\n                            <ngx-datatable-column prop=\"payment_status\" name=\"payment_status\">\r\n                              <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                             <span>Payment Status</span>\r\n                           </ng-template>\r\n                             <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                               <span >\r\n                                 {{value}}\r\n                               </span>\r\n                              \r\n                             </ng-template>\r\n                           </ngx-datatable-column>\r\n                      \r\n                        \r\n                          </ngx-datatable>\r\n\r\n                                </mat-tab>\r\n\r\n                            </mat-tab-group>\r\n                       </div>\r\n                </div>\r\n\r\n            </mat-card-content>\r\n        </mat-card>\r\n    </div>\r\n</div>\r\n "

/***/ }),

/***/ "./src/app/patient-info/patient-info.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/patient-info/patient-info.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%; }\n\n.example-full-width {\n  width: 90%; }\n\n.sa_plan_show {\n  width: 100%;\n  text-align: left;\n  margin-bottom: 10px; }\n\n.sa_plan_show td {\n  padding: 4px 10px;\n  background: #f2f2f2;\n  border: 1px solid #ccc; }\n\n.sa_userstable {\n  width: 100%; }\n\n.sa_plan_show th {\n  padding: 4px 10px;\n  background: #f2f2f2;\n  border: 1px solid #ccc;\n  font-weight: 400;\n  width: 280px; }\n\n.sa_upload_sec {\n  text-align: center;\n  padding: 40px 20px 20px;\n  border: 2px dotted #ccc;\n  min-height: 220px; }\n\n.sa_download_sec {\n  text-align: center;\n  padding: 40px 20px 20px;\n  background: #f2f2f2;\n  min-height: 220px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9wYXRpZW50LWluZm8vcGF0aWVudC1pbmZvLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQWdCO0VBQ2hCLGlCQUFnQjtFQUNoQixZQUFXLEVBQ1o7O0FBRUQ7RUFDRSxXQUFVLEVBQ1g7O0FBRUQ7RUFBYyxZQUFVO0VBQUUsaUJBQWU7RUFBRSxvQkFBa0IsRUFBRzs7QUFDaEU7RUFBaUIsa0JBQWdCO0VBQUUsb0JBQWtCO0VBQUUsdUJBQXFCLEVBQUc7O0FBQy9FO0VBQWUsWUFBVSxFQUFHOztBQUM1QjtFQUFpQixrQkFBZ0I7RUFBRSxvQkFBa0I7RUFBRSx1QkFBcUI7RUFBRSxpQkFBZTtFQUFFLGFBQVcsRUFBRzs7QUFDN0c7RUFBZSxtQkFBa0I7RUFDL0Isd0JBQXVCO0VBQ3ZCLHdCQUF1QjtFQUN2QixrQkFBZ0IsRUFDakI7O0FBRUQ7RUFBaUIsbUJBQWtCO0VBQ2pDLHdCQUF1QjtFQUN4QixvQkFBa0I7RUFBRSxrQkFBZ0IsRUFBRSIsImZpbGUiOiJzcmMvYXBwL3BhdGllbnQtaW5mby9wYXRpZW50LWluZm8uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXhhbXBsZS1mb3JtIHtcclxuICBtaW4td2lkdGg6IDE1MHB4O1xyXG4gIG1heC13aWR0aDogNTAwcHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5leGFtcGxlLWZ1bGwtd2lkdGgge1xyXG4gIHdpZHRoOiA5MCU7XHJcbn1cclxuXHJcbi5zYV9wbGFuX3Nob3d7d2lkdGg6MTAwJTsgdGV4dC1hbGlnbjpsZWZ0OyBtYXJnaW4tYm90dG9tOjEwcHg7fVxyXG4uc2FfcGxhbl9zaG93IHRke3BhZGRpbmc6NHB4IDEwcHg7IGJhY2tncm91bmQ6I2YyZjJmMjsgYm9yZGVyOjFweCBzb2xpZCAjY2NjO31cclxuLnNhX3VzZXJzdGFibGV7d2lkdGg6MTAwJTt9XHJcbi5zYV9wbGFuX3Nob3cgdGh7cGFkZGluZzo0cHggMTBweDsgYmFja2dyb3VuZDojZjJmMmYyOyBib3JkZXI6MXB4IHNvbGlkICNjY2M7IGZvbnQtd2VpZ2h0OjQwMDsgd2lkdGg6MjgwcHg7fVxyXG4uc2FfdXBsb2FkX3NlY3t0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogNDBweCAyMHB4IDIwcHg7XHJcbiAgYm9yZGVyOiAycHggZG90dGVkICNjY2M7XHJcbiAgbWluLWhlaWdodDoyMjBweDtcclxufVxyXG5cclxuLnNhX2Rvd25sb2FkX3NlY3t0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogNDBweCAyMHB4IDIwcHg7XHJcbiBiYWNrZ3JvdW5kOiNmMmYyZjI7IG1pbi1oZWlnaHQ6MjIwcHg7fSJdfQ== */"

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
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
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
    function DialogOverviewExampleDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.sittingsUpdate = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.getSittings = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.deletesittingid = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    DialogOverviewExampleDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialogComponent.prototype.statusupdate = function (sittingIndex, event) {
        if (event.checked == true) {
            event.checked = 'ACTIVE';
        }
        else {
            event.checked == false;
            event.checked = 'INACTIVE';
        }
        var settingstatus = event.checked;
        // console.log(settingstatus);
        this.sittingsUpdate.emit({ settingstatus: settingstatus, sittingIndex: sittingIndex });
    };
    DialogOverviewExampleDialogComponent.prototype.totalsittings = function (gettotalsittings) {
        console.log(gettotalsittings);
        this.getSittings.emit(gettotalsittings);
    };
    DialogOverviewExampleDialogComponent.prototype.deleterow = function (deleteindex) {
        // console.log(deleteindex);
        this.deletesittingid.emit(deleteindex);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DialogOverviewExampleDialogComponent.prototype, "sittingsUpdate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DialogOverviewExampleDialogComponent.prototype, "getSittings", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DialogOverviewExampleDialogComponent.prototype, "deletesittingid", void 0);
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

var data = [];
var PatientInfoComponent = /** @class */ (function () {
    function PatientInfoComponent(notifierService, fb, dialog, patientInfoService, route, _cookieService, router, breakpointObserver) {
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
        this.treatmentName = {};
        this.totalsitting = {};
        this.sitting_id = {};
        this.sitting_status = {};
        this.performed_date = {};
        this.sittings = [];
        this.clinic_id = {};
        this.user_id = {};
        this.memberplanid = {};
        this.invoice_date = {};
        this.benefit_patient_id = {};
        this.benefit_planid = {};
        this.patientid = {};
        this.membertreatmentid = {};
        this.payment_plan_name = {};
        this.rows = [];
        this.benefit = [];
        this.payment = [];
        this.editing = {};
        this.notifier = notifierService;
    }
    PatientInfoComponent.prototype.openDialog = function (treatmentIndex) {
        var _this = this;
        this.getBenefitsUsed();
        this.treatmentName = this.benefit[treatmentIndex]['treatmentName'];
        this.totalsitting = this.benefit[treatmentIndex]['patients_sittings'];
        if (this.benefit[treatmentIndex]['sittinginfo'])
            this.sittings = this.benefit[treatmentIndex]['sittinginfo'];
        this.memberplanid = this.benefit[treatmentIndex]['member_plan_id'];
        this.patientid = this.benefit[treatmentIndex]['patient_id'];
        this.membertreatmentid = this.benefit[treatmentIndex]['member_treatment_id'];
        var dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
            width: '250px',
            data: { treatmentName: this.treatmentName, totalsitting: this.totalsitting, sitting_status: this.sitting_status, sitting_id: this.sitting_id, sittings: this.sittings, memberplanid: this.memberplanid }
        });
        var sub1 = dialogRef.componentInstance.getSittings.subscribe(function (gettotalsittings) {
            //  console.log(gettotalsittings)
            // console.log(this.sittings)
            // console.log(gettotalsittings);
            var sittingscount = _this.sittings.length;
            if (sittingscount == 0) {
                for (var index = 0; index < gettotalsittings; index++) {
                    _this.sittings[index] = { id: "", patient_id: _this.id, sitting_status: "" };
                }
            }
            else {
                for (var index = sittingscount; index < gettotalsittings; index++) {
                    _this.sittings[index] = { id: "", patient_id: _this.id, sitting_status: "" };
                }
            }
        });
        var sub2 = dialogRef.componentInstance.deletesittingid.subscribe(function (deleteindex) {
            // var ar = this.sittings;
            // delete ar[deleteindex];
            // this.sittings.shift(deleteindex);
            // console.log(ar);
            var my_array = _this.sittings;
            var start_index = deleteindex;
            var number_of_elements_to_remove = deleteindex;
            var removed_elements = my_array.splice(start_index, number_of_elements_to_remove);
            _this.totalsitting = _this.sittings.length;
            $("#totalsittings").val(_this.totalsitting);
            console.log(_this.totalsitting);
            console.log(removed_elements);
            console.log(my_array);
        });
        var sub = dialogRef.componentInstance.sittingsUpdate.subscribe(function (settingstatus, sittingsIndex) {
            _this.getBenefitsUsed();
            _this.benefit_patient_id = _this.benefit[treatmentIndex]['patient_id'];
            _this.benefit_planid = _this.benefit[treatmentIndex]['member_plan_id'];
            _this.sitting_id = _this.benefit[treatmentIndex]['sittinginfo'][settingstatus['sittingIndex']]['id'];
            _this.sitting_status = settingstatus['settingstatus'];
            _this.performed_date = Object(_angular_common__WEBPACK_IMPORTED_MODULE_7__["formatDate"])(new Date(), 'yyyy-MM-dd', 'en');
            //  console.log(this.sitting_id);
            // console.log( treatmentIndex);
            // console.log(this.sitting_status);
            // console.log(settingstatus['sittingIndex']);
            _this.patientInfoService.updateSittingStatus(_this.benefit_patient_id, _this.benefit_planid, _this.sitting_id, _this.sitting_status, _this.performed_date).subscribe(function (res) {
                if (res.message == 'success') {
                    _this.getBenefitsUsed();
                    _this.notifier.notify('success', 'Sittings Updated', 'vertical');
                }
            });
        });
        dialogRef.afterClosed().subscribe(function (result) {
            // var sitting =JSON.stringify(this.sittings);
            var sittingUpdated = {};
            for (var index = 0; index < _this.sittings.length; index++) {
                var element = _this.sittings[index];
                var temp = {};
                temp['sitting_id'] = element['id'];
                temp['patient_id'] = element['patient_id'];
                temp['sitting_status'] = element['sitting_status'];
                temp['performed_date'] = element['performed_date'];
                sittingUpdated[index] = temp;
            }
            var sittingUpdatedString = JSON.stringify(sittingUpdated);
            console.log(sittingUpdatedString);
            var totalsiting = _this.sittings.length;
            _this.getBenefitsUsed();
            _this.patientInfoService.addBenefits(_this.id, _this.memberplanid, _this.membertreatmentid, totalsiting, sittingUpdatedString).subscribe(function (res) {
                _this.getBenefitsUsed();
                if (res.message == 'success') {
                    console.log(res);
                    _this.notifier.notify('success', 'Sittings Updated', 'vertical');
                }
            }, function (error) {
                _this.warningMessage = "Please Provide Valid Inputs!";
            });
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
    PatientInfoComponent.prototype.getSubPatients = function () {
        var _this = this;
        this.patientInfoService.getSubPatients(this.id).subscribe(function (res) {
            if (res.message == 'success') {
                console.log(res.data);
                var patientArray = {};
                patientArray['sub_patients_name'] = res.data[0]['patient_name'];
                patientArray['sub_patients_age'] = res.data[0]['patient_age'];
                patientArray['sub_patients_gender'] = res.data[0]['patient_gender'];
                patientArray['sub_patients_amount'] = res.data[0]['member_plan']['totalAmount'];
                _this.rows = res.data[0]['sub_patients'];
                var sub_patient_length = _this.rows.length;
                _this.rows[sub_patient_length] = patientArray;
                _this.patient_amount = res.data[0]['total_amount'];
                _this.total_subpatient = res.data[0]['sub_patients'].length;
                _this.member_plan_id = res.data[0]['member_plan_id'];
                _this.plan_name = res.data[0]['member_plan']['planName'];
                _this.clinic_id = res.data[0]['clinic_id'];
                _this.user_id = res.data[0]['user_id'];
                _this.mainpatientname = res.data[0]['patient_name'];
                _this.getBenefitsUsed();
                _this.getPaymentHistory();
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
    PatientInfoComponent.prototype.getPaymentHistory = function () {
        var _this = this;
        this.patientInfoService.getPaymentHistory(this.id, this.member_plan_id, this.user_id, this.clinic_id).subscribe(function (res) {
            if (res.message == 'success') {
                _this.payment = res.data;
                _this.payment_plan_name = res.data[0]['member_plan']['planName'];
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
            $('.ajax-loader').show();
            this.patientInfoService.updatePatients(this.id, this.member_plan_id, this.imageURL).subscribe(function (res) {
                $('.ajax-loader').hide();
                // console.log(this.imageURL);
                if (res.message == 'success') {
                    _this.notifier.notify('success', 'Document Uploaded', 'vertical');
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
            $('.ajax-loader').show();
            var formData = new FormData();
            formData.append('file', this.fileToUpload, this.fileToUpload.name);
            this.patientInfoService.contractUpload(formData).subscribe(function (res) {
                $('.ajax-loader').hide();
                if (res.message == 'success') {
                    _this.imageURL = res.data;
                }
            });
        }
    };
    PatientInfoComponent.prototype.getBenefitsUsed = function () {
        var _this = this;
        this.patientInfoService.getBenefitsUsed(this.id, this.member_plan_id).subscribe(function (res) {
            if (res.message == 'success') {
                _this.benefit = res.data;
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
    PatientInfoComponent.prototype.deleteBenefitsUsed = function (row) {
        var _this = this;
        if (confirm("Are you sure to delete this plan?")) {
            if (this.benefit[row]['patients_benefits_id']) {
                this.patientInfoService.deleteBenefitsUsed(this.benefit[row]['patients_benefits_id']).subscribe(function (res) {
                    if (res.message == 'success') {
                        _this.notifier.notify('success', 'Plan Removed', 'vertical');
                        _this.getBenefitsUsed();
                    }
                }, function (error) {
                    _this.warningMessage = "Please Provide Valid Inputs!";
                });
            }
            else {
                this.getBenefitsUsed();
                this.rows.splice(row, 1);
                this.rows = this.rows.slice();
            }
        }
    };
    PatientInfoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-formlayout',
            template: __webpack_require__(/*! ./patient-info.component.html */ "./src/app/patient-info/patient-info.component.html"),
            styles: [__webpack_require__(/*! ./patient-info.component.scss */ "./src/app/patient-info/patient-info.component.scss")]
        }),
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_6__["NotifierService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"], _patient_info_service__WEBPACK_IMPORTED_MODULE_2__["PatientInfoService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_8__["BreakpointObserver"]])
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
                _patient_info_service__WEBPACK_IMPORTED_MODULE_16__["PatientInfoService"],
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"]
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
    PatientInfoService.prototype.updatePatients = function (patient_id, member_plan_id, contract_upload, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('patient_id', patient_id);
        formData.append('member_plan_id', member_plan_id);
        formData.append('contract_upload', contract_upload);
        // formData.append('status',patient_status);
        formData.append('token', token);
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
    PatientInfoService.prototype.getBenefitsUsed = function (patient_id, member_plan_id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "PatientsBenefits/getBenefitsUsed?patient_id=" + patient_id + "&member_plan_id=" + member_plan_id + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    PatientInfoService.prototype.addBenefits = function (patient_id, member_plan_id, member_treatment_id, patients_sittings, sitting, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('patients_id', patient_id);
        formData.append('member_plan_id', member_plan_id);
        formData.append('member_treatment_id', member_treatment_id);
        formData.append('patients_sittings', patients_sittings);
        formData.append('sitting', sitting);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/PatientsBenefits/addBenefits/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            //      console.log(response);
            return response;
        }));
    };
    PatientInfoService.prototype.updateSittingStatus = function (patient_id, member_plan_id, sitting_id, sitting_status, performed_date, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('patients_id', patient_id);
        formData.append('member_plan_id', member_plan_id);
        formData.append('sitting_id', sitting_id);
        formData.append('sitting_status', sitting_status);
        formData.append('performed_date', performed_date);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/PatientsBenefits/updateSittingStatus/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            //      console.log(response);
            return response;
        }));
    };
    PatientInfoService.prototype.getPaymentHistory = function (patient_id, member_plan_id, user_id, clinic_id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "PaymentHistory/getPaymentHistory?patient_id=" + patient_id + "&member_plan_id=" + member_plan_id + "&user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
            console.log(response);
        }));
    };
    PatientInfoService.prototype.deleteBenefitsUsed = function (patient_id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('patients_benefits_id', patient_id);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/PatientsBenefits/deleteBenefitsUsed/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            //      console.log(response);
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