(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["forms-forms-module"],{

/***/ "./src/app/forms/autocomplete/autocomplete.component.html":
/*!****************************************************************!*\
  !*** ./src/app/forms/autocomplete/autocomplete.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Autocomplete Example</mat-card-title>\n                <!-- ============================================================== -->\n                <!-- column -->\n                <!-- ============================================================== -->\n                <form class=\"example-form\">\n                    <mat-form-field class=\"example-full-width\">\n                        <input matInput placeholder=\"State\" aria-label=\"State\" [matAutocomplete]=\"auto\" [formControl]=\"stateCtrl\">\n                        <mat-autocomplete #auto=\"matAutocomplete\">\n                            <mat-option *ngFor=\"let state of filteredStates | async\" [value]=\"state.name\">\n                                <img class=\"example-option-img\" aria-hidden [src]=\"state.flag\" height=\"25\">\n                                <span>{{state.name}}</span> |\n                                <small>Population: {{state.population}}</small>\n                            </mat-option>\n                        </mat-autocomplete>\n                    </mat-form-field>\n\n                    <br>\n\n                    <mat-slide-toggle [checked]=\"stateCtrl.disabled\" (change)=\"stateCtrl.disabled ? stateCtrl.enable() : stateCtrl.disable()\">\n                        Disable Input?\n                    </mat-slide-toggle>\n                </form>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Simple autocomplete</mat-card-title>\n                <!-- ============================================================== -->\n                <!-- column -->\n                <!-- ============================================================== -->\n                <form class=\"example-form\">\n                    <mat-form-field class=\"example-full-width\">\n                        <input type=\"text\" placeholder=\"Pick one\" aria-label=\"Number\" matInput [formControl]=\"myControl\"\n                            [matAutocomplete]=\"autoTest\">\n                        <mat-autocomplete #autoTest=\"matAutocomplete\">\n                            <mat-option *ngFor=\"let option of options1\" [value]=\"option\">\n                                {{option}}\n                            </mat-option>\n                        </mat-autocomplete>\n                    </mat-form-field>\n                </form>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Option groups</mat-card-title>\n                <!-- ============================================================== -->\n                <!-- column -->\n                <!-- ============================================================== -->\n                <form [formGroup]=\"stateForm\">\n                    <mat-form-field>\n                        <input type=\"text\" matInput placeholder=\"States Group\" formControlName=\"stateGroup\" required\n                            [matAutocomplete]=\"autoGroup\">\n                        <mat-autocomplete #autoGroup=\"matAutocomplete\">\n                            <mat-optgroup *ngFor=\"let group of stateGroupOptions | async\" [label]=\"group.letter\">\n                                <mat-option *ngFor=\"let name of group.names\" [value]=\"name\">\n                                    {{name}}\n                                </mat-option>\n                            </mat-optgroup>\n                        </mat-autocomplete>\n                    </mat-form-field>\n                </form>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Display value autocomplete</mat-card-title>\n                <!-- ============================================================== -->\n                <!-- column -->\n                <!-- ============================================================== -->\n                <form>\n                    <mat-form-field>\n                        <input type=\"text\" placeholder=\"Assignee\" aria-label=\"Assignee\" matInput [formControl]=\"myControl\"\n                            [matAutocomplete]=\"autoready\">\n                        <mat-autocomplete #autoready=\"matAutocomplete\" [displayWith]=\"displayFn\">\n                            <mat-option *ngFor=\"let option of filteredOptions | async\" [value]=\"option\">\n                                {{option.name}}\n                            </mat-option>\n                        </mat-autocomplete>\n                    </mat-form-field>\n                </form>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n\n<!-- ============================================================== -->\n<!-- Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Filter autocomplete</mat-card-title>\n                <!-- ============================================================== -->\n                <!-- column -->\n                <!-- ============================================================== -->\n                <form>\n                    <mat-form-field>\n                        <input type=\"text\" placeholder=\"Pick one\" aria-label=\"Number\" matInput [formControl]=\"myControl\"\n                            [matAutocomplete]=\"autostart\">\n                        <mat-autocomplete #autostart=\"matAutocomplete\">\n                            <mat-option *ngFor=\"let option of filteredOptions1 | async\" [value]=\"option\">\n                                {{option}}\n                            </mat-option>\n                        </mat-autocomplete>\n                    </mat-form-field>\n                </form>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n\n\n<!-- ============================================================== -->\n<!-- Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Highlight the first autocomplete option</mat-card-title>\n                <!-- ============================================================== -->\n                <!-- column -->\n                <!-- ============================================================== -->\n                <form>\n                    <mat-form-field>\n                        <input type=\"text\" placeholder=\"Pick one\" aria-label=\"Number\" matInput [formControl]=\"myControl\"\n                            [matAutocomplete]=\"autopast\">\n                        <mat-autocomplete autoActiveFirstOption #autopast=\"matAutocomplete\">\n                            <mat-option *ngFor=\"let option of filteredOptions2 | async\" [value]=\"option\">\n                                {{option}}\n                            </mat-option>\n                        </mat-autocomplete>\n                    </mat-form-field>\n                </form>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/forms/autocomplete/autocomplete.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/forms/autocomplete/autocomplete.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/forms/autocomplete/autocomplete.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/forms/autocomplete/autocomplete.component.ts ***!
  \**************************************************************/
/*! exports provided: State, _filter, AutocompleteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "State", function() { return State; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_filter", function() { return _filter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutocompleteComponent", function() { return AutocompleteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var State = /** @class */ (function () {
    function State(name, population, flag) {
        this.name = name;
        this.population = population;
        this.flag = flag;
    }
    return State;
}());

var _filter = function (opt, value) {
    var filterValue = value.toLowerCase();
    return opt.filter(function (item) { return item.toLowerCase().indexOf(filterValue) === 0; });
};
var AutocompleteComponent = /** @class */ (function () {
    function AutocompleteComponent(fb) {
        var _this = this;
        this.fb = fb;
        // 2
        this.myControl1 = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.options = ['One', 'Two', 'Three'];
        // 3
        this.stateForm = this.fb.group({
            stateGroup: ''
        });
        this.stateGroups = [
            {
                letter: 'A',
                names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas']
            },
            {
                letter: 'C',
                names: ['California', 'Colorado', 'Connecticut']
            },
            {
                letter: 'D',
                names: ['Delaware']
            },
            {
                letter: 'F',
                names: ['Florida']
            },
            {
                letter: 'G',
                names: ['Georgia']
            },
            {
                letter: 'H',
                names: ['Hawaii']
            },
            {
                letter: 'I',
                names: ['Idaho', 'Illinois', 'Indiana', 'Iowa']
            },
            {
                letter: 'K',
                names: ['Kansas', 'Kentucky']
            },
            {
                letter: 'L',
                names: ['Louisiana']
            },
            {
                letter: 'M',
                names: [
                    'Maine',
                    'Maryland',
                    'Massachusetts',
                    'Michigan',
                    'Minnesota',
                    'Mississippi',
                    'Missouri',
                    'Montana'
                ]
            },
            {
                letter: 'N',
                names: [
                    'Nebraska',
                    'Nevada',
                    'New Hampshire',
                    'New Jersey',
                    'New Mexico',
                    'New York',
                    'North Carolina',
                    'North Dakota'
                ]
            },
            {
                letter: 'O',
                names: ['Ohio', 'Oklahoma', 'Oregon']
            },
            {
                letter: 'P',
                names: ['Pennsylvania']
            },
            {
                letter: 'R',
                names: ['Rhode Island']
            },
            {
                letter: 'S',
                names: ['South Carolina', 'South Dakota']
            },
            {
                letter: 'T',
                names: ['Tennessee', 'Texas']
            },
            {
                letter: 'U',
                names: ['Utah']
            },
            {
                letter: 'V',
                names: ['Vermont', 'Virginia']
            },
            {
                letter: 'W',
                names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
            }
        ];
        this.states = [
            {
                name: 'Arkansas',
                population: '2.978M',
                // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
                flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
            },
            {
                name: 'California',
                population: '39.14M',
                // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
                flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
            },
            {
                name: 'Florida',
                population: '20.27M',
                // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
                flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
            },
            {
                name: 'Texas',
                population: '27.47M',
                // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
                flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
            }
        ];
        // 4
        this.myControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.options1 = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];
        // 5
        this.myControl2 = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.options2 = ['One', 'Two', 'Three'];
        // 6
        this.highControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.options3 = ['One', 'Two', 'Three'];
        this.stateCtrl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.filteredStates = this.stateCtrl.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (state) { return (state ? _this.filterStates(state) : _this.states.slice()); }));
    }
    AutocompleteComponent.prototype.filterStates = function (name) {
        return this.states.filter(function (state) { return state.name.toLowerCase().indexOf(name.toLowerCase()) === 0; });
    };
    AutocompleteComponent.prototype.ngOnInit = function () {
        var _this = this;
        // tslint:disable-next-line:no-non-null-assertion
        this.stateGroupOptions = this.stateForm
            .get('stateGroup')
            .valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (value) { return _this._filterGroup(value); }));
        // 4
        this.filteredOptions = this.myControl.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (value) { return (typeof value === 'string' ? value : value.name); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (name) { return (name ? _this._filter(name) : _this.options1.slice()); }));
        // 5
        this.filteredOptions1 = this.myControl2.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (value) { return _this._filter1(value); }));
        // 6
        this.filteredOptions2 = this.myControl.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (value) { return _this._filter2(value); }));
    };
    // 4
    AutocompleteComponent.prototype.displayFn = function (user) {
        return user ? user.name : undefined;
    };
    AutocompleteComponent.prototype._filterGroup = function (value) {
        if (value) {
            return this.stateGroups
                .map(function (group) { return ({
                letter: group.letter,
                names: _filter(group.names, value)
            }); })
                .filter(function (group) { return group.names.length > 0; });
        }
        return this.stateGroups;
    };
    AutocompleteComponent.prototype._filter = function (name) {
        var filterValue = name.toLowerCase();
        return this.options1.filter(function (option) { return option.name.toLowerCase().indexOf(filterValue) === 0; });
    };
    // 5
    AutocompleteComponent.prototype._filter1 = function (value) {
        var filterValue1 = value.toLowerCase();
        return this.options2.filter(function (option1) {
            return option1.toLowerCase().includes(filterValue1);
        });
    };
    // 6
    AutocompleteComponent.prototype._filter2 = function (value) {
        var filterValue2 = value.toLowerCase();
        return this.options3.filter(function (option) { return option.toLowerCase().indexOf(filterValue2) === 0; });
    };
    AutocompleteComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-autocomplete',
            template: __webpack_require__(/*! ./autocomplete.component.html */ "./src/app/forms/autocomplete/autocomplete.component.html"),
            styles: [__webpack_require__(/*! ./autocomplete.component.scss */ "./src/app/forms/autocomplete/autocomplete.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], AutocompleteComponent);
    return AutocompleteComponent;
}());



/***/ }),

/***/ "./src/app/forms/checkbox/checkbox.component.html":
/*!********************************************************!*\
  !*** ./src/app/forms/checkbox/checkbox.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-content>\n    <h3 class=\"example-h2\">Checkbox configuration</h3>\n\n    <section class=\"example-section\">\n      <mat-checkbox class=\"example-margin\" [(ngModel)]=\"checked\">Checked</mat-checkbox>\n      <mat-checkbox class=\"example-margin\" [(ngModel)]=\"indeterminate\">Indeterminate</mat-checkbox>\n    </section>\n\n    <section class=\"example-section\">\n      <label class=\"example-margin\">Align:</label>\n      <mat-radio-group [(ngModel)]=\"labelPosition\">\n        <mat-radio-button class=\"example-margin\" value=\"after\">After</mat-radio-button>\n        <mat-radio-button class=\"example-margin\" value=\"before\">Before</mat-radio-button>\n      </mat-radio-group>\n    </section>\n\n    <section class=\"example-section\">\n      <mat-checkbox class=\"example-margin\" [(ngModel)]=\"disabled\">Disabled</mat-checkbox>\n    </section>\n  </mat-card-content>\n</mat-card>\n\n<mat-card class=\"result\">\n  <mat-card-content>\n    <h2 class=\"example-h2\">Result</h2>\n    <section class=\"example-section\">\n      <mat-checkbox class=\"example-margin\" [(ngModel)]=\"checked\" [(indeterminate)]=\"indeterminate\" [labelPosition]=\"labelPosition\"\n        [disabled]=\"disabled\">\n        I'm a checkbox\n      </mat-checkbox>\n    </section>\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/forms/checkbox/checkbox.component.scss":
/*!********************************************************!*\
  !*** ./src/app/forms/checkbox/checkbox.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-h2 {\n  margin: 10px; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.example-margin {\n  margin: 0 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVhbmFseXRpY3MvY2xpZW50Mi9zcmMvYXBwL2Zvcm1zL2NoZWNrYm94L2NoZWNrYm94LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBWSxFQUNiOztBQUVEO0VBQ0UsY0FBYTtFQUNiLHNCQUFxQjtFQUNyQixvQkFBbUI7RUFDbkIsYUFBWSxFQUNiOztBQUVEO0VBQ0UsZUFBYyxFQUNmIiwiZmlsZSI6InNyYy9hcHAvZm9ybXMvY2hlY2tib3gvY2hlY2tib3guY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXhhbXBsZS1oMiB7XG4gIG1hcmdpbjogMTBweDtcbn1cblxuLmV4YW1wbGUtc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgaGVpZ2h0OiA2MHB4O1xufVxuXG4uZXhhbXBsZS1tYXJnaW4ge1xuICBtYXJnaW46IDAgMTBweDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/forms/checkbox/checkbox.component.ts":
/*!******************************************************!*\
  !*** ./src/app/forms/checkbox/checkbox.component.ts ***!
  \******************************************************/
/*! exports provided: CheckboxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxComponent", function() { return CheckboxComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CheckboxComponent = /** @class */ (function () {
    function CheckboxComponent() {
        this.checked = false;
        this.indeterminate = false;
        this.align = 'start';
        this.disabled = false;
        this.labelPosition = false;
    }
    CheckboxComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-checkbox',
            template: __webpack_require__(/*! ./checkbox.component.html */ "./src/app/forms/checkbox/checkbox.component.html"),
            styles: [__webpack_require__(/*! ./checkbox.component.scss */ "./src/app/forms/checkbox/checkbox.component.scss")]
        })
    ], CheckboxComponent);
    return CheckboxComponent;
}());



/***/ }),

/***/ "./src/app/forms/datepicker/datepicker.component.html":
/*!************************************************************!*\
  !*** ./src/app/forms/datepicker/datepicker.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Fixed height Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Basic Datepicker</mat-card-title>\n                <mat-card-subtitle>A material 2 component for datepicker</mat-card-subtitle>\n                <mat-form-field>\n                    <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\">\n                    <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                    <mat-datepicker #picker></mat-datepicker>\n                </mat-form-field>\n\n            </mat-card-content>\n\n        </mat-card>\n    </div>\n</div>\n<div fxLayout=\"row wrap\">\n    <!-- Grid-->\n    <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Datepicker start date</mat-card-title>\n                <mat-card-subtitle>A material 2 component for datepicker</mat-card-subtitle>\n                <mat-form-field>\n                    <input matInput [matDatepicker]=\"picker2\" placeholder=\"Choose a date\">\n                    <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\n                    <mat-datepicker #picker2 startView=\"year\" [startAt]=\"startDate\"></mat-datepicker>\n                </mat-form-field>\n\n            </mat-card-content>\n\n        </mat-card>\n    </div>\n</div>\n<div fxLayout=\"row wrap\">\n    <!-- Grid-->\n    <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Datepicker selected value</mat-card-title>\n                <mat-card-subtitle>A material 2 component for datepicker</mat-card-subtitle>\n                <mat-form-field>\n                    <input matInput [matDatepicker]=\"picker3\" placeholder=\"Angular forms\" [formControl]=\"date\">\n                    <mat-datepicker-toggle matSuffix [for]=\"picker3\"></mat-datepicker-toggle>\n                    <mat-datepicker #picker3></mat-datepicker>\n                </mat-form-field>\n\n                <mat-form-field>\n                    <input matInput [matDatepicker]=\"picker4\" placeholder=\"Angular forms (w/ deserialization)\"\n                        [formControl]=\"serializedDate\">\n                    <mat-datepicker-toggle matSuffix [for]=\"picker4\"></mat-datepicker-toggle>\n                    <mat-datepicker #picker4></mat-datepicker>\n                </mat-form-field>\n\n                <mat-form-field>\n                    <input matInput [matDatepicker]=\"picker5\" placeholder=\"Value binding\" [value]=\"date.value\">\n                    <mat-datepicker-toggle matSuffix [for]=\"picker5\"></mat-datepicker-toggle>\n                    <mat-datepicker #picker5></mat-datepicker>\n                </mat-form-field>\n\n            </mat-card-content>\n\n        </mat-card>\n    </div>\n</div>\n<div fxLayout=\"row wrap\">\n    <!-- Grid-->\n    <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Datepicker input and change events</mat-card-title>\n                <mat-card-subtitle>A material 2 component for datepicker</mat-card-subtitle>\n                <mat-form-field>\n                    <input matInput [matDatepicker]=\"picker6\" placeholder=\"Input & change events\" (dateInput)=\"addEvent('input', $event)\"\n                        (dateChange)=\"addEvent('change', $event)\">\n                    <mat-datepicker-toggle matSuffix [for]=\"picker6\"></mat-datepicker-toggle>\n                    <mat-datepicker #picker6></mat-datepicker>\n                </mat-form-field>\n\n                <div class=\"b-all p-20\">\n                    <div *ngFor=\"let e of events\">{{e}}</div>\n                </div>\n\n            </mat-card-content>\n\n        </mat-card>\n    </div>\n</div>\n<div fxLayout=\"row wrap\">\n    <!-- Grid-->\n    <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Disabled datepicker</mat-card-title>\n                <mat-card-subtitle>A material 2 component for datepicker</mat-card-subtitle>\n                <p>\n                    <mat-form-field>\n                        <input matInput [matDatepicker]=\"dp1\" placeholder=\"Completely disabled\" disabled>\n                        <mat-datepicker-toggle matSuffix [for]=\"dp1\"></mat-datepicker-toggle>\n                        <mat-datepicker #dp1></mat-datepicker>\n                    </mat-form-field>\n                </p>\n\n                <p>\n                    <mat-form-field>\n                        <input matInput [matDatepicker]=\"dp2\" placeholder=\"Popup disabled\">\n                        <mat-datepicker-toggle matSuffix [for]=\"dp2\" disabled></mat-datepicker-toggle>\n                        <mat-datepicker #dp2></mat-datepicker>\n                    </mat-form-field>\n                </p>\n\n                <p>\n                    <mat-form-field>\n                        <input matInput [matDatepicker]=\"dp3\" placeholder=\"Input disabled\" disabled>\n                        <mat-datepicker-toggle matSuffix [for]=\"dp3\"></mat-datepicker-toggle>\n                        <mat-datepicker #dp3 disabled=\"false\"></mat-datepicker>\n                    </mat-form-field>\n                </p>\n\n            </mat-card-content>\n\n        </mat-card>\n    </div>\n</div>\n<div fxLayout=\"row wrap\">\n    <!-- Grid-->\n    <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Datepicker touch UI</mat-card-title>\n                <mat-card-subtitle>A material 2 component for datepicker</mat-card-subtitle>\n                <mat-form-field class=\"example-full-width\">\n                    <input matInput [matDatepicker]=\"picker7\" placeholder=\"Choose a date\">\n                    <mat-datepicker-toggle matSuffix [for]=\"picker7\"></mat-datepicker-toggle>\n                    <mat-datepicker touchUi=\"true\" #picker7></mat-datepicker>\n                </mat-form-field>\n\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n<div fxLayout=\"row wrap\">\n    <!-- Grid-->\n    <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Datepicker open method</mat-card-title>\n                <mat-card-subtitle>A material 2 component for datepicker</mat-card-subtitle>\n                <mat-form-field class=\"example-full-width\">\n                    <input matInput [matDatepicker]=\"picker8\" placeholder=\"Choose a date\">\n                    <mat-datepicker #picker8></mat-datepicker>\n                </mat-form-field>\n                <button mat-raised-button (click)=\"picker8.open()\">Open</button>\n            </mat-card-content>\n        </mat-card>\n    </div>\n    <!-- Grid-->\n</div>\n\n\n\n\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Changing the datepicker colors</mat-card-title>\n                <mat-form-field color=\"accent\">\n                    <mat-label>Inherited calendar color</mat-label>\n                    <input matInput [matDatepicker]=\"picker111\">\n                    <mat-datepicker-toggle matSuffix [for]=\"picker111\"></mat-datepicker-toggle>\n                    <mat-datepicker #picker111></mat-datepicker>\n                </mat-form-field>\n\n                <mat-form-field color=\"accent\">\n                    <mat-label>Custom calendar color</mat-label>\n                    <input matInput [matDatepicker]=\"picker222\">\n                    <mat-datepicker-toggle matSuffix [for]=\"picker222\"></mat-datepicker-toggle>\n                    <mat-datepicker #picker222 color=\"success\"></mat-datepicker>\n                </mat-form-field>\n\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Datepicker with min & max validation</mat-card-title>\n                <mat-form-field class=\"example-full-width\">\n                    <input matInput [min]=\"minDate\" [max]=\"maxDate\" [matDatepicker]=\"minpicker\" placeholder=\"Choose a date\">\n                    <mat-datepicker-toggle matSuffix [for]=\"minpicker\"></mat-datepicker-toggle>\n                    <mat-datepicker #minpicker></mat-datepicker>\n                </mat-form-field>\n\n\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Datepicker with filter validation</mat-card-title>\n                <mat-form-field class=\"example-full-width\">\n                    <input matInput [matDatepickerFilter]=\"myFilter\" [matDatepicker]=\"filterpicker\" placeholder=\"Choose a date\">\n                    <mat-datepicker-toggle matSuffix [for]=\"filterpicker\"></mat-datepicker-toggle>\n                    <mat-datepicker #filterpicker></mat-datepicker>\n                </mat-form-field>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Datepicker input and change events</mat-card-title>\n                <mat-form-field>\n                    <input matInput [matDatepicker]=\"pickerevent\" placeholder=\"Input & change events\" (dateInput)=\"addEvent('input', $event)\"\n                        (dateChange)=\"addEvent('change', $event)\">\n                    <mat-datepicker-toggle matSuffix [for]=\"pickerevent\"></mat-datepicker-toggle>\n                    <mat-datepicker #pickerevent></mat-datepicker>\n                </mat-form-field>\n\n                <div class=\"example-events\">\n                    <div *ngFor=\"let e of events\">{{e}}</div>\n                </div>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n\n<div fxLayout=\"row wrap\">\n    <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n        <mat-card>\n            <mat-card-content>\n                <mat-card-title>Setting the locale code</mat-card-title>\n                <mat-form-field>\n                    <input matInput [matDatepicker]=\"dp\" placeholder=\"Different locale\">\n                    <mat-datepicker-toggle matSuffix [for]=\"dp\"></mat-datepicker-toggle>\n                    <mat-datepicker #dp></mat-datepicker>\n                </mat-form-field>\n\n                <button mat-button (click)=\"french()\">Dynamically switch to French</button>\n\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/forms/datepicker/datepicker.component.scss":
/*!************************************************************!*\
  !*** ./src/app/forms/datepicker/datepicker.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "md-calendar {\n  width: 300px; }\n\n.example-events {\n  width: 400px;\n  height: 200px;\n  border: 1px solid #555;\n  overflow: auto; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVhbmFseXRpY3MvY2xpZW50Mi9zcmMvYXBwL2Zvcm1zL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQVksRUFDYjs7QUFHRDtFQUNFLGFBQVk7RUFDWixjQUFhO0VBQ2IsdUJBQXNCO0VBQ3RCLGVBQWMsRUFDZiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm1kLWNhbGVuZGFyIHtcbiAgd2lkdGg6IDMwMHB4O1xufVxuXG5cbi5leGFtcGxlLWV2ZW50cyB7XG4gIHdpZHRoOiA0MDBweDtcbiAgaGVpZ2h0OiAyMDBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgIzU1NTtcbiAgb3ZlcmZsb3c6IGF1dG87XG59Il19 */"

/***/ }),

/***/ "./src/app/forms/datepicker/datepicker.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/forms/datepicker/datepicker.component.ts ***!
  \**********************************************************/
/*! exports provided: DatepickerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatepickerComponent", function() { return DatepickerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DatepickerComponent = /** @class */ (function () {
    function DatepickerComponent(adapter) {
        this.adapter = adapter;
        // this is for the start date
        this.startDate = new Date(1990, 0, 1);
        this.minDate = new Date(2000, 0, 1);
        this.maxDate = new Date(2020, 0, 1);
        // Datepicker selected value
        this.date = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](new Date());
        this.serializedDate = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](new Date().toISOString());
        // Datepicker input and change event
        this.events = [];
        this.myFilter = function (d) {
            var day = d.getDay();
            // Prevent Saturday and Sunday from being selected.
            return day !== 0 && day !== 6;
            // tslint:disable-next-line:semicolon
        };
    }
    DatepickerComponent.prototype.addEvent = function (type, event) {
        this.events.push(type + ": " + event.value);
    };
    DatepickerComponent.prototype.french = function () {
        this.adapter.setLocale('fr');
    };
    DatepickerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-datepicker',
            template: __webpack_require__(/*! ./datepicker.component.html */ "./src/app/forms/datepicker/datepicker.component.html"),
            styles: [__webpack_require__(/*! ./datepicker.component.scss */ "./src/app/forms/datepicker/datepicker.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["DateAdapter"]])
    ], DatepickerComponent);
    return DatepickerComponent;
}());



/***/ }),

/***/ "./src/app/forms/editor/editor.component.html":
/*!****************************************************!*\
  !*** ./src/app/forms/editor/editor.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-content>\n        <mat-card-title>Default Editor</mat-card-title>\n        <mat-card-subtitle>quill editor with angular and TypeScript. ngx-quill is the new angular 2 and beyond implementation of ngQuill.\n            <a\n                href=\"https://github.com/KillerCodeMonkey/ngx-quill\" target=\"_blank\">Official website</a>\n        </mat-card-subtitle>\n        <quill-editor [style]=\"{height: '200px'}\"></quill-editor>\n    </mat-card-content>\n</mat-card>\n<mat-card>\n    <mat-card-content>\n        <mat-card-title>Bubble Editor</mat-card-title>\n        <quill-editor theme=\"bubble\" placeholder=\"Bubble editor\" bounds=\".mat-drawer-content\" [style]=\"{border: '1px solid #dadada'}\"></quill-editor>\n    </mat-card-content>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/forms/editor/editor.component.scss":
/*!****************************************************!*\
  !*** ./src/app/forms/editor/editor.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL2VkaXRvci9lZGl0b3IuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/forms/editor/editor.component.ts":
/*!**************************************************!*\
  !*** ./src/app/forms/editor/editor.component.ts ***!
  \**************************************************/
/*! exports provided: EditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorComponent", function() { return EditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EditorComponent = /** @class */ (function () {
    function EditorComponent() {
        this.subtitle = 'This is some text within a card block.';
    }
    EditorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-editor',
            template: __webpack_require__(/*! ./editor.component.html */ "./src/app/forms/editor/editor.component.html"),
            styles: [__webpack_require__(/*! ./editor.component.scss */ "./src/app/forms/editor/editor.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], EditorComponent);
    return EditorComponent;
}());



/***/ }),

/***/ "./src/app/forms/file-upload/upload.component.html":
/*!*********************************************************!*\
  !*** ./src/app/forms/file-upload/upload.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-content>\n        <mat-card-title>Angular2 File Upload</mat-card-title>\n        <section id=\"file-upload\">\n\n            <div fxLayout=\"row wrap\">\n                <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\" class=\"p-10\">\n                    <div ng2FileDrop [ngClass]=\"{'nv-file-over': hasBaseDropZoneOver}\" (fileOver)=\"fileOverBase($event)\" [uploader]=\"uploader\" class=\"py-5 mb-3 text-center font-medium-5 text-uppercase grey my-drop-zone\">\n                        Base dropzone\n                    </div>\n                </div>\n                <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\" class=\"p-10\">\n                    <div ng2FileDrop [ngClass]=\"{'another-file-over-class': hasAnotherDropZoneOver}\" (fileOver)=\"fileOverAnother($event)\" [uploader]=\"uploader\"\n                        class=\"py-5 mb-3 text-center font-medium-5 text-uppercase grey my-drop-zone\">\n                        Another dropzone\n                    </div>\n                </div>\n            </div>\n            <div fxLayout=\"row wrap\">\n                <div fxFlex.gt-sm=\"25\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                    <h4>Select files</h4>\n                    <div>Multiple</div>\n                    <label class=\"custom-file\">\n                        <input type=\"file\" ng2FileSelect [uploader]=\"uploader\" multiple class=\"custom-file-input\">\n                        <span class=\"custom-file-control\"></span>\n                    </label>\n\n                    <div class=\"m-t-30\">Single</div>\n                    <label class=\"custom-file\">\n                        <input type=\"file\" ng2FileSelect [uploader]=\"uploader\" class=\"custom-file-input\">\n                        <span class=\"custom-file-control\"></span>\n                    </label>\n                </div>\n\n                <div fxFlex.gt-sm=\"75\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n                    <h4>Upload queue</h4>\n                    <p>Queue length: {{ uploader?.queue?.length }}</p>\n\n                    <table class=\"table\">\n                        <thead>\n                            <tr>\n                                <th width=\"50%\">Name</th>\n                                <th>Size</th>\n                                <th>Progress</th>\n                                <th>Status</th>\n                                <th>Actions</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let item of uploader.queue\">\n                                <td>\n                                    <strong>{{ item?.file?.name }}</strong>\n                                </td>\n                                <td *ngIf=\"uploader.isHTML5\" nowrap>{{ item?.file?.size/1024/1024 | number:'.2' }} MB</td>\n                                <td *ngIf=\"uploader.isHTML5\">\n                                    <div class=\"progress\" style=\"margin-bottom: 0;\">\n                                        <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': item.progress + '%' }\"></div>\n                                    </div>\n                                </td>\n                                <td class=\"text-center\">\n                                    <span *ngIf=\"item.isSuccess\">\n                                        <i class=\"fa fa-ok\"></i>\n                                    </span>\n                                    <span *ngIf=\"item.isCancel\">\n                                        <i class=\"fa fa-ban\"></i>\n                                    </span>\n                                    <span *ngIf=\"item.isError\">\n                                        <i class=\"fa fa-remove\"></i>\n                                    </span>\n                                </td>\n                                <td nowrap>\n                                    <button type=\"button\" mat-raised-button color=\"primary\" (click)=\"item.upload()\" [disabled]=\"item.isReady || item.isUploading || item.isSuccess\">\n                                        <span class=\"fa fa-upload\"></span> Upload\n                                    </button>\n                                    <button type=\"button\" mat-raised-button color=\"accent\" (click)=\"item.cancel()\" [disabled]=\"!item.isUploading\">\n                                        <span class=\"fa fa-ban\"></span> Cancel\n                                    </button>\n                                    <button type=\"button\" mat-raised-button color=\"warn\" (click)=\"item.remove()\">\n                                        <span class=\"fa fa-trash\"></span> Remove\n                                    </button>\n                                </td>\n                            </tr>\n                        </tbody>\n                    </table>\n\n                    <div>\n                        <p>Queue progress:\n                            <mat-progress-bar mode=\"determinate\" [value]=\"uploader.progress\" class=\"m-t-10\"></mat-progress-bar>\n                        </p>\n                        <button type=\"button\" mat-raised-button color=\"primary\" (click)=\"uploader.uploadAll()\" [disabled]=\"!uploader.getNotUploadedItems().length\">\n                            <span class=\"fa fa-upload\"></span> Upload all\n                        </button>\n                        <button type=\"button\" mat-raised-button color=\"accent\" (click)=\"uploader.cancelAll()\" [disabled]=\"!uploader.isUploading\">\n                            <span class=\"fa fa-ban\"></span> Cancel all\n                        </button>\n                        <button type=\"button\" mat-raised-button color=\"warn\" (click)=\"uploader.clearQueue()\" [disabled]=\"!uploader.queue.length\">\n                            <span class=\"fa fa-trash\"></span> Remove all\n                        </button>\n                    </div>\n                </div>\n            </div>\n\n        </section>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/forms/file-upload/upload.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/forms/file-upload/upload.component.ts ***!
  \*******************************************************/
/*! exports provided: UploadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadComponent", function() { return UploadComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng2-file-upload/ng2-file-upload */ "./node_modules/ng2-file-upload/ng2-file-upload.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
var UploadComponent = /** @class */ (function () {
    function UploadComponent() {
        this.uploader = new ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__["FileUploader"]({
            url: URL,
            isHTML5: true
        });
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
    }
    // Angular2 File Upload
    UploadComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    UploadComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    UploadComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./upload.component.html */ "./src/app/forms/file-upload/upload.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./upload.scss */ "./src/app/forms/file-upload/upload.scss")]
        })
    ], UploadComponent);
    return UploadComponent;
}());



/***/ }),

/***/ "./src/app/forms/file-upload/upload.scss":
/*!***********************************************!*\
  !*** ./src/app/forms/file-upload/upload.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".my-drop-zone {\n  border: dotted 2px #dadada;\n  background-color: #fff !important;\n  min-height: 80px;\n  line-height: 80px; }\n\n.nv-file-over {\n  border: dotted 2px red; }\n\n/* Default class applied to drop zones on over */\n\n.another-file-over-class {\n  border: dotted 2px green; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVhbmFseXRpY3MvY2xpZW50Mi9zcmMvYXBwL2Zvcm1zL2ZpbGUtdXBsb2FkL3VwbG9hZC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsMkJBQTBCO0VBQzFCLGtDQUFpQztFQUNqQyxpQkFBZ0I7RUFDaEIsa0JBQWlCLEVBQ2xCOztBQUNEO0VBQ0UsdUJBQXNCLEVBQ3ZCOztBQUFDLGlEQUFpRDs7QUFDbkQ7RUFDRSx5QkFBd0IsRUFDekIiLCJmaWxlIjoic3JjL2FwcC9mb3Jtcy9maWxlLXVwbG9hZC91cGxvYWQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5teS1kcm9wLXpvbmUge1xuICBib3JkZXI6IGRvdHRlZCAycHggI2RhZGFkYTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xuICBtaW4taGVpZ2h0OiA4MHB4O1xuICBsaW5lLWhlaWdodDogODBweDtcbn1cbi5udi1maWxlLW92ZXIge1xuICBib3JkZXI6IGRvdHRlZCAycHggcmVkO1xufSAvKiBEZWZhdWx0IGNsYXNzIGFwcGxpZWQgdG8gZHJvcCB6b25lcyBvbiBvdmVyICovXG4uYW5vdGhlci1maWxlLW92ZXItY2xhc3Mge1xuICBib3JkZXI6IGRvdHRlZCAycHggZ3JlZW47XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/forms/form-layouts/form-layout.component.html":
/*!***************************************************************!*\
  !*** ./src/app/forms/form-layouts/form-layout.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Form Basic Layouts</mat-card-title>\n        <!-- ============================================================== -->\n        <!-- column -->\n        <!-- ============================================================== -->\n        <form class=\"basic-form\">\n          <div fxLayout=\"row wrap\">\n            <!-- column -->\n            <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n              <mat-form-field>\n                <input matInput placeholder=\"Some text value\">\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n              <mat-form-field>\n                <input matInput placeholder=\"EmailId\" type=\"email\">\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n              <mat-form-field>\n                <input matInput placeholder=\"Password\" type=\"password\">\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n              <mat-form-field [floatLabel]=\"options.value.floatLabel\">\n                <mat-label>Both a label and a placeholder</mat-label>\n                <input matInput placeholder=\"Simple placeholder\">\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n              <mat-form-field hintLabel=\"Max 10 characters\">\n                <input matInput #input maxlength=\"10\" placeholder=\"Enter some input\">\n                <mat-hint align=\"end\">{{input.value?.length || 0}}/10</mat-hint>\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n              <mat-form-field>\n                <mat-select placeholder=\"Select\">\n                  <mat-option value=\"option\">Option</mat-option>\n                  <mat-option value=\"option\">Option2</mat-option>\n                  <mat-option value=\"option\">Option3</mat-option>\n                </mat-select>\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"100\" fxFlex=\"100\" class=\"m-b-20\">\n              <input class=\"form-control b-b\" placeholder=\"file\" type=\"file\">\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n              <mat-form-field [hideRequiredMarker]=\"options.value.hideRequired\" [floatLabel]=\"options.value.floatLabel\">\n                <mat-select required>\n                  <mat-option>-- None --</mat-option>\n                  <mat-option value=\"option\">Option</mat-option>\n                </mat-select>\n                <mat-placeholder>\n                  <mat-icon>favorite</mat-icon>\n                  <b> Fancy</b>\n                  <i> placeholder</i>\n                </mat-placeholder>\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"100\" fxFlex=\"100\" class=\"m-t-10 m-b-10\">\n              <mat-checkbox color=\"primary\" class=\"m-r-10\">Checkbox</mat-checkbox>\n              <mat-checkbox color=\"warn\" class=\"m-r-10\">Checkbox</mat-checkbox>\n              <mat-checkbox color=\"accent\">Checkbox</mat-checkbox>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"100\" fxFlex=\"100\" class=\"m-t-20 m-b-20\">\n              <mat-radio-group>\n                <mat-radio-button color=\"primary\" value=\"auto\" class=\"m-r-10\">Auto</mat-radio-button>\n                <mat-radio-button color=\"warn\" value=\"always\" class=\"m-r-10\">Always</mat-radio-button>\n                <mat-radio-button color=\"accent\" value=\"never\">Never</mat-radio-button>\n              </mat-radio-group>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n              <mat-form-field>\n                <textarea matInput placeholder=\"Textarea\"></textarea>\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n              <button mat-raised-button color=\"primary\">Submit</button>\n            </div>\n          </div>\n        </form>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Form field with error messages</mat-card-title>\n        <mat-form-field>\n          <input matInput placeholder=\"Enter your email\" [formControl]=\"email\" required>\n          <mat-error *ngIf=\"email.invalid\">{{getErrorMessage()}}</mat-error>\n        </mat-form-field>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Form field with prefix &amp; suffix</mat-card-title>\n        <mat-form-field>\n          <input matInput placeholder=\"Enter your password\" [type]=\"hide ? 'password' : 'text'\">\n          <mat-icon matSuffix (click)=\"hide = !hide\">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>\n        </mat-form-field>\n\n        <mat-form-field>\n          <input matInput placeholder=\"Amount\" type=\"number\" class=\"example-right-align\">\n          <span matPrefix>$&nbsp;</span>\n          <span matSuffix>.00</span>\n        </mat-form-field>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n<!-- ============================================================== -->\n<!-- Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Form with grid</mat-card-title>\n        <mat-card-subtitle>use this class\n          <code>.row</code> to the fxLayout=\"row\" and\n          <code>p-10</code> to the fxFlex div</mat-card-subtitle>\n        <!-- ============================================================== -->\n        <!-- column -->\n        <!-- ============================================================== -->\n        <form class=\"basic-form\">\n          <div fxLayout=\"row wrap\" fxFlexAlign=\"center\" class=\"row\">\n            <!-- column -->\n            <div fxFlex.gt-sm=\"25\" fxFlex=\"100\" class=\"p-10\">\n              <mat-form-field>\n                <input matInput placeholder=\"grid 25\">\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"25\" fxFlex=\"100\" class=\"p-10\">\n              <mat-form-field>\n                <input matInput placeholder=\"grid 25\">\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"25\" fxFlex=\"100\" class=\"p-10\">\n              <mat-form-field>\n                <input matInput placeholder=\"grid 25\">\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"25\" fxFlex=\"100\" class=\"p-10\">\n              <mat-form-field>\n                <input matInput placeholder=\"grid 25\">\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"33.33\" fxFlex=\"100\" class=\"p-10\">\n              <mat-form-field>\n                <input matInput placeholder=\"grid 33.33\">\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"33.33\" fxFlex=\"100\" class=\"p-10\">\n              <mat-form-field>\n                <input matInput placeholder=\"grid 33.33\">\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"33.33\" fxFlex=\"100\" class=\"p-10\">\n              <mat-form-field>\n                <input matInput placeholder=\"grid 33.33\">\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"50\" fxFlex=\"100\" class=\"p-10\">\n              <mat-form-field>\n                <input matInput placeholder=\"grid 50\">\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"50\" fxFlex=\"100\" class=\"p-10\">\n              <mat-form-field>\n                <input matInput placeholder=\"grid 50\">\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"100\" fxFlex=\"100\" class=\"p-10\">\n              <mat-form-field>\n                <input matInput placeholder=\"grid 100\">\n              </mat-form-field>\n            </div>\n          </div>\n        </form>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/forms/form-layouts/form-layout.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/forms/form-layouts/form-layout.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%; }\n\n.example-full-width {\n  width: 90%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVhbmFseXRpY3MvY2xpZW50Mi9zcmMvYXBwL2Zvcm1zL2Zvcm0tbGF5b3V0cy9mb3JtLWxheW91dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFnQjtFQUNoQixpQkFBZ0I7RUFDaEIsWUFBVyxFQUNaOztBQUVEO0VBQ0UsV0FBVSxFQUNYIiwiZmlsZSI6InNyYy9hcHAvZm9ybXMvZm9ybS1sYXlvdXRzL2Zvcm0tbGF5b3V0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4YW1wbGUtZm9ybSB7XG4gIG1pbi13aWR0aDogMTUwcHg7XG4gIG1heC13aWR0aDogNTAwcHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uZXhhbXBsZS1mdWxsLXdpZHRoIHtcbiAgd2lkdGg6IDkwJTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/forms/form-layouts/form-layout.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/forms/form-layouts/form-layout.component.ts ***!
  \*************************************************************/
/*! exports provided: FormLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormLayoutComponent", function() { return FormLayoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FormLayoutComponent = /** @class */ (function () {
    function FormLayoutComponent(fb) {
        // For form validator
        this.email = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]);
        // Sufix and prefix
        this.hide = true;
        this.options = fb.group({
            hideRequired: false,
            floatLabel: 'auto'
        });
    }
    FormLayoutComponent.prototype.getErrorMessage = function () {
        return this.email.hasError('required')
            ? 'You must enter a value'
            : this.email.hasError('email')
                ? 'Not a valid email'
                : '';
    };
    FormLayoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-formlayout',
            template: __webpack_require__(/*! ./form-layout.component.html */ "./src/app/forms/form-layouts/form-layout.component.html"),
            styles: [__webpack_require__(/*! ./form-layout.component.scss */ "./src/app/forms/form-layouts/form-layout.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], FormLayoutComponent);
    return FormLayoutComponent;
}());



/***/ }),

/***/ "./src/app/forms/form-validation/form-validation.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/forms/form-validation/form-validation.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-content>\n    <mat-card-title>Form validation</mat-card-title>\n    <mat-card-subtitle>Angular2 custom validation here is the\n      <a href=\"https://github.com/yuyang041060120/ng2-validation\" target=\"_blank\">official site</a>\n    </mat-card-subtitle>\n    <form [formGroup]=\"form\">\n\n      <div fxLayout=\"row wrap\">\n        <div class=\"p-10\" fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"50\" fxFlex=\"100\">\n          <mat-form-field>\n            <input matInput placeholder=\"First name\" [formControl]=\"form.controls['fname']\">\n          </mat-form-field>\n          <mat-hint *ngIf=\"form.controls['fname'].hasError('required') && form.controls['fname'].touched\" class=\"text-danger font-14\">You must include a first name.</mat-hint>\n          <mat-hint *ngIf=\"form.controls['fname'].hasError('minlength') && form.controls['fname'].touched\" class=\"text-danger font-14\">Your first name must be at least 5 characters long.</mat-hint>\n          <mat-hint *ngIf=\"form.controls['fname'].hasError('maxlength') && form.controls['fname'].touched\" class=\"text-danger font-14\">Your first name cannot exceed 10 characters.</mat-hint>\n        </div>\n\n\n        <div class=\"p-10\" fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"50\" fxFlex=\"100\">\n          <mat-form-field>\n            <input matInput placeholder=\"Email Id\" [formControl]=\"form.controls['email']\" type=\"email\">\n          </mat-form-field>\n          <small *ngIf=\"form.controls['email'].hasError('required') && form.controls['email'].touched\" class=\"text-danger font-14\">You must include an email address.</small>\n          <small *ngIf=\"form.controls['email'].errors?.email && form.controls['email'].touched\" class=\"text-danger font-14\">You must include a valid email address.</small>\n        </div>\n\n        <div class=\"p-10\" fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"50\" fxFlex=\"100\">\n          <mat-form-field>\n            <input matInput placeholder=\"Website\" [formControl]=\"form.controls['url']\" type=\"url\">\n          </mat-form-field>\n          <small *ngIf=\"form.controls['url'].hasError('required') && form.controls['url'].touched\" class=\"text-danger font-14\">You must include a web address.</small>\n          <small *ngIf=\"form.controls['url'].errors?.url && form.controls['url'].touched\" class=\"text-danger font-14\">You must include a valid web address.</small>\n        </div>\n\n        <div class=\"p-10\" fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"50\" fxFlex=\"100\">\n          <mat-form-field>\n            <input matInput [matDatepicker]=\"picker\" [formControl]=\"form.controls['date']\" placeholder=\"Choose a date\">\n            <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n            <mat-datepicker #picker></mat-datepicker>\n          </mat-form-field>\n          <mat-hint *ngIf=\"form.controls['date'].hasError('required') && form.controls['date'].touched\" class=\"text-danger font-14\">You must include a date.</mat-hint>\n          <mat-hint *ngIf=\"form.controls['date'].errors?.date && form.controls['date'].touched\" class=\"text-danger font-14\">You must include a valid date.</mat-hint>\n        </div>\n\n        <div class=\"p-10\" fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"50\" fxFlex=\"100\">\n          <mat-form-field>\n            <input matInput placeholder=\"Number range (between 5 and 9)\" [formControl]=\"form.controls['range']\">\n          </mat-form-field>\n          <small *ngIf=\"form.controls['range'].hasError('required') && form.controls['range'].touched\" class=\"text-danger font-14\">You must enter a number.</small>\n          <small *ngIf=\"form.controls['range'].errors?.range && form.controls['range'].touched\" class=\"text-danger font-14\">Number should be between 5 and 9.</small>\n        </div>\n        <div class=\"p-10\" fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"50\" fxFlex=\"100\">\n          <mat-form-field>\n            <input matInput placeholder=\"Phone number\" [formControl]=\"form.controls['phone']\" type=\"text\">\n          </mat-form-field>\n          <small *ngIf=\"form.controls['phone'].hasError('required') && form.controls['phone'].touched\" class=\"text-danger font-14\">You must include phone number.</small>\n          <small *ngIf=\"form.controls['phone'].errors?.phone && form.controls['phone'].touched\" class=\"text-danger font-14\">You must include a valid phone number.</small>\n        </div>\n\n        <div class=\"p-10\" fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"50\" fxFlex=\"100\">\n          <mat-form-field>\n            <input matInput placeholder=\"Password\" [formControl]=\"form.controls['password']\" type=\"password\">\n          </mat-form-field>\n          <small *ngIf=\"form.controls['password'].hasError('required') && form.controls['password'].touched\" class=\"text-danger font-14\">You must include password.</small>\n        </div>\n\n        <div class=\"p-10\" fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"50\" fxFlex=\"100\">\n          <mat-form-field>\n            <input matInput placeholder=\"Confirm Password\" [formControl]=\"form.controls['confirmPassword']\" type=\"password\">\n          </mat-form-field>\n          <small *ngIf=\"form.controls['confirmPassword'].hasError('required') && form.controls['confirmPassword'].touched\" class=\"text-danger font-14\">You must include confirm password.</small>\n          <small *ngIf=\"form.controls['confirmPassword'].errors?.equalTo\" class=\"text-danger font-14\">Passwords do not math.</small>\n        </div>\n\n        <div class=\"p-10\" fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"50\" fxFlex=\"100\">\n          <label class=\"m-r-20\">Gender :</label>\n          <mat-radio-group [formControl]=\"form.controls['gender']\">\n            <mat-radio-button value=\"male\" class=\"m-r-10\">Male</mat-radio-button>\n            <mat-radio-button value=\"female\">Female</mat-radio-button>\n          </mat-radio-group>\n          <small *ngIf=\"!form.controls['gender'].valid && form.controls['gender'].touched\" class=\"mat-text-warn\">You must select a gender.</small>\n        </div>\n      </div>\n\n      <mat-card-actions>\n        <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"!form.valid\">Submit</button>\n      </mat-card-actions>\n    </form>\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/forms/form-validation/form-validation.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/forms/form-validation/form-validation.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL2Zvcm0tdmFsaWRhdGlvbi9mb3JtLXZhbGlkYXRpb24uY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/forms/form-validation/form-validation.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/forms/form-validation/form-validation.component.ts ***!
  \********************************************************************/
/*! exports provided: FormValidationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormValidationComponent", function() { return FormValidationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng2-validation */ "./node_modules/ng2-validation/dist/index.js");
/* harmony import */ var ng2_validation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ng2_validation__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var password = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
var confirmPassword = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', ng2_validation__WEBPACK_IMPORTED_MODULE_2__["CustomValidators"].equalTo(password));
var FormValidationComponent = /** @class */ (function () {
    function FormValidationComponent(fb) {
        this.fb = fb;
    }
    FormValidationComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            fname: [
                null,
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(5),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(10)
                ])
            ],
            email: [
                null,
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, ng2_validation__WEBPACK_IMPORTED_MODULE_2__["CustomValidators"].email])
            ],
            range: [
                null,
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                    ng2_validation__WEBPACK_IMPORTED_MODULE_2__["CustomValidators"].range([5, 9])
                ])
            ],
            url: [
                null,
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, ng2_validation__WEBPACK_IMPORTED_MODULE_2__["CustomValidators"].url])
            ],
            date: [
                null,
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, ng2_validation__WEBPACK_IMPORTED_MODULE_2__["CustomValidators"].date])
            ],
            phone: [
                null,
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, ng2_validation__WEBPACK_IMPORTED_MODULE_2__["CustomValidators"].phone('IN')])
            ],
            gender: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            password: password,
            confirmPassword: confirmPassword
        });
    };
    FormValidationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-form-validation',
            template: __webpack_require__(/*! ./form-validation.component.html */ "./src/app/forms/form-validation/form-validation.component.html"),
            styles: [__webpack_require__(/*! ./form-validation.component.scss */ "./src/app/forms/form-validation/form-validation.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], FormValidationComponent);
    return FormValidationComponent;
}());



/***/ }),

/***/ "./src/app/forms/formfield/formfield.component.html":
/*!**********************************************************!*\
  !*** ./src/app/forms/formfield/formfield.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title>Simple form field</mat-card-title>\n\n\t\t<div>\n\t\t\t<mat-form-field>\n\t\t\t\t<input matInput placeholder=\"Input\">\n\t\t\t</mat-form-field>\n\n\t\t\t<mat-form-field>\n\t\t\t\t<textarea matInput placeholder=\"Textarea\"></textarea>\n\t\t\t</mat-form-field>\n\n\t\t\t<mat-form-field>\n\t\t\t\t<mat-select placeholder=\"Select\">\n\t\t\t\t\t<mat-option value=\"option\">Option</mat-option>\n\t\t\t\t</mat-select>\n\t\t\t</mat-form-field>\n\t\t</div>\n\t</mat-card-content>\n</mat-card>\n\n\n<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title>Form field with label</mat-card-title>\n\n\t\t<div class=\"m-t-20\">\n\t\t\t<form [formGroup]=\"options\">\n\t\t\t\t<mat-checkbox formControlName=\"hideRequired\">Hide required marker</mat-checkbox>\n\t\t\t\t<div class=\"m-t-20 m-b-30\">\n\t\t\t\t\t<label>Float label: </label>\n\t\t\t\t\t<mat-radio-group formControlName=\"floatLabel\">\n\t\t\t\t\t\t<mat-radio-button value=\"auto\">Auto</mat-radio-button>\n\t\t\t\t\t\t<mat-radio-button value=\"always\">Always</mat-radio-button>\n\t\t\t\t\t\t<mat-radio-button value=\"never\">Never</mat-radio-button>\n\t\t\t\t\t</mat-radio-group>\n\t\t\t\t</div>\n\t\t\t</form>\n\n\t\t\t<mat-form-field [hideRequiredMarker]=\"options.value.hideRequired\" [floatLabel]=\"options.value.floatLabel\">\n\t\t\t\t<input matInput placeholder=\"Simple placeholder\" required>\n\t\t\t</mat-form-field>\n\n\t\t\t<mat-form-field [floatLabel]=\"options.value.floatLabel\">\n\t\t\t\t<mat-label>Both a label and a placeholder</mat-label>\n\t\t\t\t<input matInput placeholder=\"Simple placeholder\">\n\t\t\t</mat-form-field>\n\n\t\t\t<mat-form-field [hideRequiredMarker]=\"options.value.hideRequired\" [floatLabel]=\"options.value.floatLabel\">\n\t\t\t\t<mat-select required>\n\t\t\t\t\t<mat-option>-- None --</mat-option>\n\t\t\t\t\t<mat-option value=\"option\">Option</mat-option>\n\t\t\t\t</mat-select>\n\t\t\t\t<mat-label>\n\t\t\t\t\t<mat-icon>favorite</mat-icon> <b> Fancy</b> <i> label</i>\n\t\t\t\t</mat-label>\n\t\t\t</mat-form-field>\n\t\t</div>\n\n\n\n\t</mat-card-content>\n</mat-card>\n\n\n<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title>Form field with hints</mat-card-title>\n\n\t\t<div>\n\t\t\t<mat-form-field hintLabel=\"Max 10 characters\">\n\t\t\t\t<input matInput #input maxlength=\"10\" placeholder=\"Enter some input\">\n\t\t\t\t<mat-hint align=\"end\">{{input.value?.length || 0}}/10</mat-hint>\n\t\t\t</mat-form-field>\n\n\t\t\t<mat-form-field>\n\t\t\t\t<mat-select placeholder=\"Select me\">\n\t\t\t\t\t<mat-option value=\"option\">Option</mat-option>\n\t\t\t\t</mat-select>\n\t\t\t\t<mat-hint align=\"end\">Here's the dropdown arrow ^</mat-hint>\n\t\t\t</mat-form-field>\n\t\t</div>\n\n\t</mat-card-content>\n</mat-card>\n\n\n<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title>Form field with error messages</mat-card-title>\n\n\t\t<div>\n\t\t\t<mat-form-field>\n\t\t\t\t<input matInput placeholder=\"Enter your email\" [formControl]=\"email\" required>\n\t\t\t\t<mat-error *ngIf=\"email.invalid\">{{getErrorMessage()}}</mat-error>\n\t\t\t</mat-form-field>\n\t\t</div>\n\t</mat-card-content>\n</mat-card>\n\n\n<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title>Form field with prefix & suffix</mat-card-title>\n\n\t\t<div>\n\t\t\t<mat-form-field>\n\t\t\t\t<input matInput placeholder=\"Enter your password\" [type]=\"hide ? 'password' : 'text'\">\n\t\t\t\t<mat-icon matSuffix (click)=\"hide = !hide\">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>\n\t\t\t</mat-form-field>\n\n\t\t\t<mat-form-field>\n\t\t\t\t<input matInput placeholder=\"Amount\" type=\"number\" class=\"example-right-align\">\n\t\t\t\t<span matPrefix>$&nbsp;</span>\n\t\t\t\t<span matSuffix>.00</span>\n\t\t\t</mat-form-field>\n\t\t</div>\n\n\t</mat-card-content>\n</mat-card>\n\n\n<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title>Form field theming</mat-card-title>\n\n\t\t<form class=\"m-t-20\" [formGroup]=\"options\" [style.fontSize.px]=\"getFontSize()\">\n\t\t\t<mat-form-field [color]=\"options.value.color\">\n\t\t\t\t<mat-select placeholder=\"Color\" formControlName=\"color\">\n\t\t\t\t\t<mat-option value=\"primary\">Primary</mat-option>\n\t\t\t\t\t<mat-option value=\"accent\">Accent</mat-option>\n\t\t\t\t\t<mat-option value=\"warn\">Warn</mat-option>\n\t\t\t\t</mat-select>\n\t\t\t</mat-form-field>\n\n\t\t\t<mat-form-field [color]=\"options.value.color\">\n\t\t\t\t<input matInput type=\"number\" placeholder=\"Font size (px)\" formControlName=\"fontSize\" min=\"10\">\n\t\t\t\t<mat-error *ngIf=\"options.get('fontSize')?.invalid\">Min size: 10px</mat-error>\n\t\t\t</mat-form-field>\n\t\t</form>\n\t</mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/forms/formfield/formfield.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/forms/formfield/formfield.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-right-align {\n  text-align: right; }\n\ninput.example-right-align::-webkit-outer-spin-button,\ninput.example-right-align::-webkit-inner-spin-button {\n  display: none; }\n\ninput.example-right-align {\n  -moz-appearance: textfield; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVhbmFseXRpY3MvY2xpZW50Mi9zcmMvYXBwL2Zvcm1zL2Zvcm1maWVsZC9mb3JtZmllbGQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBaUIsRUFDbEI7O0FBRUQ7O0VBRUUsY0FBYSxFQUNkOztBQUVEO0VBQ0UsMkJBQTBCLEVBQzNCIiwiZmlsZSI6InNyYy9hcHAvZm9ybXMvZm9ybWZpZWxkL2Zvcm1maWVsZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5leGFtcGxlLXJpZ2h0LWFsaWduIHtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG5cbmlucHV0LmV4YW1wbGUtcmlnaHQtYWxpZ246Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24sXG5pbnB1dC5leGFtcGxlLXJpZ2h0LWFsaWduOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuaW5wdXQuZXhhbXBsZS1yaWdodC1hbGlnbiB7XG4gIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/forms/formfield/formfield.component.ts":
/*!********************************************************!*\
  !*** ./src/app/forms/formfield/formfield.component.ts ***!
  \********************************************************/
/*! exports provided: FormfieldComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormfieldComponent", function() { return FormfieldComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FormfieldComponent = /** @class */ (function () {
    function FormfieldComponent(fb) {
        this.hide = true;
        this.email = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]);
        this.options = fb.group({
            hideRequired: false,
            floatLabel: 'auto',
            color: 'primary',
            fontSize: [16, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(10)]
        });
    }
    FormfieldComponent.prototype.getErrorMessage = function () {
        return this.email.hasError('required')
            ? 'You must enter a value'
            : this.email.hasError('email')
                ? 'Not a valid email'
                : '';
    };
    FormfieldComponent.prototype.getFontSize = function () {
        return Math.max(10, this.options.value.fontSize);
    };
    FormfieldComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-formfield',
            template: __webpack_require__(/*! ./formfield.component.html */ "./src/app/forms/formfield/formfield.component.html"),
            styles: [__webpack_require__(/*! ./formfield.component.scss */ "./src/app/forms/formfield/formfield.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], FormfieldComponent);
    return FormfieldComponent;
}());



/***/ }),

/***/ "./src/app/forms/forms.module.ts":
/*!***************************************!*\
  !*** ./src/app/forms/forms.module.ts ***!
  \***************************************/
/*! exports provided: FormModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormModule", function() { return FormModule; });
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _forms_routing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./forms.routing */ "./src/app/forms/forms.routing.ts");
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/index.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng2-file-upload/ng2-file-upload */ "./node_modules/ng2-file-upload/ng2-file-upload.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/esm5/tree.es5.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng-multiselect-dropdown */ "./node_modules/ng-multiselect-dropdown/fesm5/ng-multiselect-dropdown.js");
/* harmony import */ var _autocomplete_autocomplete_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./autocomplete/autocomplete.component */ "./src/app/forms/autocomplete/autocomplete.component.ts");
/* harmony import */ var _checkbox_checkbox_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./checkbox/checkbox.component */ "./src/app/forms/checkbox/checkbox.component.ts");
/* harmony import */ var _radiobutton_radiobutton_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./radiobutton/radiobutton.component */ "./src/app/forms/radiobutton/radiobutton.component.ts");
/* harmony import */ var _formfield_formfield_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./formfield/formfield.component */ "./src/app/forms/formfield/formfield.component.ts");
/* harmony import */ var _input_input_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./input/input.component */ "./src/app/forms/input/input.component.ts");
/* harmony import */ var _datepicker_datepicker_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./datepicker/datepicker.component */ "./src/app/forms/datepicker/datepicker.component.ts");
/* harmony import */ var _form_layouts_form_layout_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./form-layouts/form-layout.component */ "./src/app/forms/form-layouts/form-layout.component.ts");
/* harmony import */ var _paginator_paginator_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./paginator/paginator.component */ "./src/app/forms/paginator/paginator.component.ts");
/* harmony import */ var _sortheader_sortheader_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./sortheader/sortheader.component */ "./src/app/forms/sortheader/sortheader.component.ts");
/* harmony import */ var _select_select_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./select/select.component */ "./src/app/forms/select/select.component.ts");
/* harmony import */ var _tree_tree_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./tree/tree.component */ "./src/app/forms/tree/tree.component.ts");
/* harmony import */ var _editor_editor_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./editor/editor.component */ "./src/app/forms/editor/editor.component.ts");
/* harmony import */ var _form_validation_form_validation_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./form-validation/form-validation.component */ "./src/app/forms/form-validation/form-validation.component.ts");
/* harmony import */ var _file_upload_upload_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./file-upload/upload.component */ "./src/app/forms/file-upload/upload.component.ts");
/* harmony import */ var _wizard_wizard_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./wizard/wizard.component */ "./src/app/forms/wizard/wizard.component.ts");
/* harmony import */ var _multiselect_multiselect_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./multiselect/multiselect.component */ "./src/app/forms/multiselect/multiselect.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var FormModule = /** @class */ (function () {
    function FormModule() {
    }
    FormModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_forms_routing__WEBPACK_IMPORTED_MODULE_7__["FormRoutes"]),
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
            declarations: [
                _autocomplete_autocomplete_component__WEBPACK_IMPORTED_MODULE_13__["AutocompleteComponent"],
                _checkbox_checkbox_component__WEBPACK_IMPORTED_MODULE_14__["CheckboxComponent"],
                _radiobutton_radiobutton_component__WEBPACK_IMPORTED_MODULE_15__["RadiobuttonComponent"],
                _formfield_formfield_component__WEBPACK_IMPORTED_MODULE_16__["FormfieldComponent"],
                _datepicker_datepicker_component__WEBPACK_IMPORTED_MODULE_18__["DatepickerComponent"],
                _form_layouts_form_layout_component__WEBPACK_IMPORTED_MODULE_19__["FormLayoutComponent"],
                _input_input_component__WEBPACK_IMPORTED_MODULE_17__["InputfieldComponent"],
                _sortheader_sortheader_component__WEBPACK_IMPORTED_MODULE_21__["SortheaderComponent"],
                _select_select_component__WEBPACK_IMPORTED_MODULE_22__["SelectfieldComponent"],
                _tree_tree_component__WEBPACK_IMPORTED_MODULE_23__["TreeComponent"],
                _editor_editor_component__WEBPACK_IMPORTED_MODULE_24__["EditorComponent"],
                _paginator_paginator_component__WEBPACK_IMPORTED_MODULE_20__["PaginatiorComponent"],
                _form_validation_form_validation_component__WEBPACK_IMPORTED_MODULE_25__["FormValidationComponent"],
                _file_upload_upload_component__WEBPACK_IMPORTED_MODULE_26__["UploadComponent"],
                _wizard_wizard_component__WEBPACK_IMPORTED_MODULE_27__["WizardComponent"],
                _multiselect_multiselect_component__WEBPACK_IMPORTED_MODULE_28__["MultiselectComponent"]
            ]
        })
    ], FormModule);
    return FormModule;
}());



/***/ }),

/***/ "./src/app/forms/forms.routing.ts":
/*!****************************************!*\
  !*** ./src/app/forms/forms.routing.ts ***!
  \****************************************/
/*! exports provided: FormRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormRoutes", function() { return FormRoutes; });
/* harmony import */ var _autocomplete_autocomplete_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./autocomplete/autocomplete.component */ "./src/app/forms/autocomplete/autocomplete.component.ts");
/* harmony import */ var _checkbox_checkbox_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkbox/checkbox.component */ "./src/app/forms/checkbox/checkbox.component.ts");
/* harmony import */ var _radiobutton_radiobutton_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./radiobutton/radiobutton.component */ "./src/app/forms/radiobutton/radiobutton.component.ts");
/* harmony import */ var _formfield_formfield_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formfield/formfield.component */ "./src/app/forms/formfield/formfield.component.ts");
/* harmony import */ var _datepicker_datepicker_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./datepicker/datepicker.component */ "./src/app/forms/datepicker/datepicker.component.ts");
/* harmony import */ var _form_layouts_form_layout_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./form-layouts/form-layout.component */ "./src/app/forms/form-layouts/form-layout.component.ts");
/* harmony import */ var _paginator_paginator_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./paginator/paginator.component */ "./src/app/forms/paginator/paginator.component.ts");
/* harmony import */ var _sortheader_sortheader_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sortheader/sortheader.component */ "./src/app/forms/sortheader/sortheader.component.ts");
/* harmony import */ var _select_select_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./select/select.component */ "./src/app/forms/select/select.component.ts");
/* harmony import */ var _input_input_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./input/input.component */ "./src/app/forms/input/input.component.ts");
/* harmony import */ var _tree_tree_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./tree/tree.component */ "./src/app/forms/tree/tree.component.ts");
/* harmony import */ var _editor_editor_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./editor/editor.component */ "./src/app/forms/editor/editor.component.ts");
/* harmony import */ var _form_validation_form_validation_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./form-validation/form-validation.component */ "./src/app/forms/form-validation/form-validation.component.ts");
/* harmony import */ var _file_upload_upload_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./file-upload/upload.component */ "./src/app/forms/file-upload/upload.component.ts");
/* harmony import */ var _wizard_wizard_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./wizard/wizard.component */ "./src/app/forms/wizard/wizard.component.ts");
/* harmony import */ var _multiselect_multiselect_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./multiselect/multiselect.component */ "./src/app/forms/multiselect/multiselect.component.ts");
















var FormRoutes = [
    {
        path: '',
        children: [
            {
                path: 'autocomplete',
                component: _autocomplete_autocomplete_component__WEBPACK_IMPORTED_MODULE_0__["AutocompleteComponent"]
            },
            {
                path: 'checkbox',
                component: _checkbox_checkbox_component__WEBPACK_IMPORTED_MODULE_1__["CheckboxComponent"]
            },
            {
                path: 'radiobutton',
                component: _radiobutton_radiobutton_component__WEBPACK_IMPORTED_MODULE_2__["RadiobuttonComponent"]
            },
            {
                path: 'datepicker',
                component: _datepicker_datepicker_component__WEBPACK_IMPORTED_MODULE_4__["DatepickerComponent"]
            },
            {
                path: 'formfield',
                component: _formfield_formfield_component__WEBPACK_IMPORTED_MODULE_3__["FormfieldComponent"]
            },
            {
                path: 'input',
                component: _input_input_component__WEBPACK_IMPORTED_MODULE_9__["InputfieldComponent"]
            },
            {
                path: 'select',
                component: _select_select_component__WEBPACK_IMPORTED_MODULE_8__["SelectfieldComponent"]
            },
            {
                path: 'tree',
                component: _tree_tree_component__WEBPACK_IMPORTED_MODULE_10__["TreeComponent"]
            },
            {
                path: 'paginator',
                component: _paginator_paginator_component__WEBPACK_IMPORTED_MODULE_6__["PaginatiorComponent"]
            },
            {
                path: 'form-layout',
                component: _form_layouts_form_layout_component__WEBPACK_IMPORTED_MODULE_5__["FormLayoutComponent"]
            },
            {
                path: 'editor',
                component: _editor_editor_component__WEBPACK_IMPORTED_MODULE_11__["EditorComponent"]
            },
            {
                path: 'form-validation',
                component: _form_validation_form_validation_component__WEBPACK_IMPORTED_MODULE_12__["FormValidationComponent"]
            },
            {
                path: 'file-upload',
                component: _file_upload_upload_component__WEBPACK_IMPORTED_MODULE_13__["UploadComponent"]
            },
            {
                path: 'sortheader',
                component: _sortheader_sortheader_component__WEBPACK_IMPORTED_MODULE_7__["SortheaderComponent"]
            },
            {
                path: 'wizard',
                component: _wizard_wizard_component__WEBPACK_IMPORTED_MODULE_14__["WizardComponent"]
            },
            {
                path: 'multiselect',
                component: _multiselect_multiselect_component__WEBPACK_IMPORTED_MODULE_15__["MultiselectComponent"]
            }
        ]
    }
];


/***/ }),

/***/ "./src/app/forms/input/input.component.html":
/*!**************************************************!*\
  !*** ./src/app/forms/input/input.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-content>\n    <mat-card-title>Basic Inputs</mat-card-title>\n\n    <form class=\"m-t-20\">\n\t  <mat-form-field class=\"example-full-width\">\n\t    <input matInput placeholder=\"Favorite food\" value=\"Sushi\">\n\t  </mat-form-field>\n\n\t  <mat-form-field class=\"example-full-width\">\n\t    <textarea matInput placeholder=\"Leave a comment\"></textarea>\n\t  </mat-form-field>\n\t</form>\n  </mat-card-content>\n</mat-card>\n\n\n<mat-card>\n  <mat-card-content>\n    <mat-card-title>Input with a custom ErrorStateMatcher</mat-card-title>\n\n    <form>\n\t  <mat-form-field class=\"example-full-width\">\n\t    <input matInput placeholder=\"Email\" [formControl]=\"emailFormControl\"\n\t           [errorStateMatcher]=\"matcher\">\n\t    <mat-hint>Errors appear instantly!</mat-hint>\n\t    <mat-error *ngIf=\"emailFormControl.hasError('email') && !emailFormControl.hasError('required')\">\n\t      Please enter a valid email address\n\t    </mat-error>\n\t    <mat-error *ngIf=\"emailFormControl.hasError('required')\">\n\t      Email is <strong>required</strong>\n\t    </mat-error>\n\t  </mat-form-field>\n\t</form>\n\n  </mat-card-content>\n</mat-card>\n\n\n<mat-card>\n  <mat-card-content>\n    <mat-card-title>Auto-resizing textarea</mat-card-title>\n\n    <mat-form-field class=\"m-t-20\">\n\t  <mat-label>Font size</mat-label>\n\t  <mat-select #fontSize value=\"16px\" (selectionChange)=\"triggerResize()\">\n\t    <mat-option value=\"10px\">10px</mat-option>\n\t    <mat-option value=\"12px\">12px</mat-option>\n\t    <mat-option value=\"14px\">14px</mat-option>\n\t    <mat-option value=\"16px\">16px</mat-option>\n\t    <mat-option value=\"18px\">18px</mat-option>\n\t    <mat-option value=\"20px\">20px</mat-option>\n\t  </mat-select>\n\t</mat-form-field>\n\n\t<mat-form-field [style.fontSize]=\"fontSize.value\">\n\t  <mat-label>Autosize textarea</mat-label>\n\t  <textarea matInput\n\t            cdkTextareaAutosize\n\t            #autosize=\"cdkTextareaAutosize\"\n\t            cdkAutosizeMinRows=\"2\"\n\t            cdkAutosizeMaxRows=\"5\"></textarea>\n\t</mat-form-field>\n\n\n  </mat-card-content>\n</mat-card>\n\n\n<mat-card>\n  <mat-card-content>\n    <mat-card-title>Input with a clear button</mat-card-title>\n\n    <mat-form-field class=\"example-form-field m-t-20\">\n\t  <input matInput type=\"text\" placeholder=\"Clearable input\" [(ngModel)]=\"value\">\n\t  <button mat-button *ngIf=\"value\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"value=''\">\n\t    <mat-icon>close</mat-icon>\n\t  </button>\n\t</mat-form-field>\n\n\n  </mat-card-content>\n</mat-card>\n\n\n<mat-card>\n  <mat-card-content>\n    <mat-card-title>Input with error messages</mat-card-title>\n\n    <form>\n\t  <mat-form-field class=\"example-full-width\">\n\t    <input matInput placeholder=\"Email\" [formControl]=\"emailFormControl\">\n\t    <mat-error *ngIf=\"emailFormControl.hasError('email') && !emailFormControl.hasError('required')\">\n\t      Please enter a valid email address\n\t    </mat-error>\n\t    <mat-error *ngIf=\"emailFormControl.hasError('required')\">\n\t      Email is <strong>required</strong>\n\t    </mat-error>\n\t  </mat-form-field>\n\t</form>\n  </mat-card-content>\n</mat-card>\n\n\n<mat-card>\n  <mat-card-content>\n    <mat-card-title>Inputs in a form</mat-card-title>\n\n   \t<form class=\"m-t-20\">\n\t  <mat-form-field class=\"example-full-width\">\n\t    <input matInput placeholder=\"Company (disabled)\" disabled value=\"Google\">\n\t  </mat-form-field>\n\n\t  <table class=\"example-full-width\" cellspacing=\"0\"><tr>\n\t    <td><mat-form-field class=\"example-full-width\">\n\t      <input matInput placeholder=\"First name\">\n\t    </mat-form-field></td>\n\t    <td><mat-form-field class=\"example-full-width\">\n\t      <input matInput placeholder=\"Long Last Name That Will Be Truncated\">\n\t    </mat-form-field></td>\n\t  </tr></table>\n\n\t  <p>\n\t    <mat-form-field class=\"example-full-width\">\n\t      <textarea matInput placeholder=\"Address\">1600 Amphitheatre Pkwy</textarea>\n\t    </mat-form-field>\n\t    <mat-form-field class=\"example-full-width\">\n\t      <textarea matInput placeholder=\"Address 2\"></textarea>\n\t    </mat-form-field>\n\t  </p>\n\n\t  <mat-form-field class=\"\">\n\t      <input matInput placeholder=\"City\">\n\t    </mat-form-field><mat-form-field class=\"\">\n\t      <input matInput placeholder=\"State\">\n\t    </mat-form-field><mat-form-field class=\"\">\n\t      <input matInput #postalCode maxlength=\"5\" placeholder=\"Postal Code\" value=\"94043\">\n\t      <mat-hint align=\"end\">{{postalCode.value.length}} / 5</mat-hint>\n\t    </mat-form-field>\n\t  \n\t</form>\n\n  </mat-card-content>\n</mat-card>\n\n\n<mat-card>\n  <mat-card-content>\n    <mat-card-title>Input with hints</mat-card-title>\n\n    <form>\n\n\t  <mat-form-field class=\"example-full-width\">\n\t    <input matInput #message maxlength=\"256\" placeholder=\"Message\">\n\t    <mat-hint align=\"start\"><strong>Don't disclose personal info</strong> </mat-hint>\n\t    <mat-hint align=\"end\">{{message.value.length}} / 256</mat-hint>\n\t  </mat-form-field>\n\t  \n\t</form>\n\n  </mat-card-content>\n</mat-card>\n\n\n<mat-card>\n  <mat-card-content>\n    <mat-card-title>Inputs with prefixes and suffixes</mat-card-title>\n\n    <form>\n\n\t  <mat-form-field class=\"example-full-width\">\n\t    <span matPrefix>+1 &nbsp;</span>\n\t    <input type=\"tel\" matInput placeholder=\"Telephone\">\n\t    <mat-icon matSuffix>mode_edit</mat-icon>\n\t  </mat-form-field>\n\t  \n\t</form>\n\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/forms/input/input.component.scss":
/*!**************************************************!*\
  !*** ./src/app/forms/input/input.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVhbmFseXRpY3MvY2xpZW50Mi9zcmMvYXBwL2Zvcm1zL2lucHV0L2lucHV0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQWdCO0VBQ2hCLGlCQUFnQjtFQUNoQixZQUFXLEVBQ1oiLCJmaWxlIjoic3JjL2FwcC9mb3Jtcy9pbnB1dC9pbnB1dC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5leGFtcGxlLWZvcm0ge1xuICBtaW4td2lkdGg6IDE1MHB4O1xuICBtYXgtd2lkdGg6IDUwMHB4O1xuICB3aWR0aDogMTAwJTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/forms/input/input.component.ts":
/*!************************************************!*\
  !*** ./src/app/forms/input/input.component.ts ***!
  \************************************************/
/*! exports provided: MyErrorStateMatcher, InputfieldComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyErrorStateMatcher", function() { return MyErrorStateMatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputfieldComponent", function() { return InputfieldComponent; });
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/text-field */ "./node_modules/@angular/cdk/esm5/text-field.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/** Error when invalid control is dirty, touched, or submitted. */
var MyErrorStateMatcher = /** @class */ (function () {
    function MyErrorStateMatcher() {
    }
    MyErrorStateMatcher.prototype.isErrorState = function (control, form) {
        var isSubmitted = form && form.submitted;
        return !!(control &&
            control.invalid &&
            (control.dirty || control.touched || isSubmitted));
    };
    return MyErrorStateMatcher;
}());

var InputfieldComponent = /** @class */ (function () {
    function InputfieldComponent(ngZone) {
        this.ngZone = ngZone;
        this.value = 'Clear me';
        this.emailFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email
        ]);
        this.matcher = new MyErrorStateMatcher();
    }
    InputfieldComponent.prototype.triggerResize = function () {
        var _this = this;
        // Wait for changes to be applied, then trigger textarea resize.
        this.ngZone.onStable
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1))
            .subscribe(function () { return _this.autosize.resizeToFitContent(true); });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('autosize'),
        __metadata("design:type", _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_0__["CdkTextareaAutosize"])
    ], InputfieldComponent.prototype, "autosize", void 0);
    InputfieldComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-input',
            template: __webpack_require__(/*! ./input.component.html */ "./src/app/forms/input/input.component.html"),
            styles: [__webpack_require__(/*! ./input.component.scss */ "./src/app/forms/input/input.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], InputfieldComponent);
    return InputfieldComponent;
}());



/***/ }),

/***/ "./src/app/forms/multiselect/multiselect.component.css":
/*!*************************************************************!*\
  !*** ./src/app/forms/multiselect/multiselect.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL211bHRpc2VsZWN0L211bHRpc2VsZWN0LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/forms/multiselect/multiselect.component.html":
/*!**************************************************************!*\
  !*** ./src/app/forms/multiselect/multiselect.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-content>\n    <mat-card-title>Multiple Select</mat-card-title>\n    <ng-multiselect-dropdown\n      [placeholder]=\"'custom placeholder'\"\n      [data]=\"dropdownList\"\n      [(ngModel)]=\"selectedItems\"\n      [settings]=\"dropdownSettings\"\n      (onSelect)=\"onItemSelect($event)\"\n      (onSelectAll)=\"onSelectAll($event)\"\n    >\n    </ng-multiselect-dropdown>\n    <div class=\"m-t-40\">\n      <mat-card-title>Single Select</mat-card-title>\n      <ng-multiselect-dropdown\n         name=\"city\"\n         [data]=\"cities\"\n         [(ngModel)]=\"singleselectedItems\"\n         [settings]=\"singledropdownSettings\"\n         (onSelect)=\"onItemSelect($event)\">\n      </ng-multiselect-dropdown>\n    </div>\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/forms/multiselect/multiselect.component.ts":
/*!************************************************************!*\
  !*** ./src/app/forms/multiselect/multiselect.component.ts ***!
  \************************************************************/
/*! exports provided: MultiselectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiselectComponent", function() { return MultiselectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MultiselectComponent = /** @class */ (function () {
    function MultiselectComponent() {
        this.dropdownList = [];
        this.cities = [];
        this.selectedItems = [];
        this.singleselectedItems = [];
        this.dropdownSettings = {};
        this.singledropdownSettings = {};
        this.closeDropdownSelection = false;
    }
    MultiselectComponent.prototype.ngOnInit = function () {
        this.dropdownList = [
            { item_id: 1, item_text: 'Mumbai' },
            { item_id: 2, item_text: 'Bangaluru' },
            { item_id: 3, item_text: 'Pune' },
            { item_id: 4, item_text: 'Navsari' },
            { item_id: 5, item_text: 'New Delhi' }
        ];
        this.cities = ['Mumbai', 'New Delhi', 'Bangaluru', 'Pune', 'Navsari'];
        this.selectedItems = [
            { item_id: 3, item_text: 'Pune' },
            { item_id: 4, item_text: 'Navsari' }
        ];
        this.singleselectedItems = ['Pune'];
        this.singledropdownSettings = {
            singleSelection: true,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            allowSearchFilter: true,
            closeDropDownOnSelection: this.closeDropdownSelection
        };
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true
        };
    };
    MultiselectComponent.prototype.onItemSelect = function (item) {
        console.log(item);
    };
    MultiselectComponent.prototype.onSelectAll = function (items) {
        console.log(items);
    };
    MultiselectComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-multiselect',
            template: __webpack_require__(/*! ./multiselect.component.html */ "./src/app/forms/multiselect/multiselect.component.html"),
            styles: [__webpack_require__(/*! ./multiselect.component.css */ "./src/app/forms/multiselect/multiselect.component.css")]
        })
    ], MultiselectComponent);
    return MultiselectComponent;
}());



/***/ }),

/***/ "./src/app/forms/paginator/paginator.component.html":
/*!**********************************************************!*\
  !*** ./src/app/forms/paginator/paginator.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-content>\n    <mat-card-title>Paginator</mat-card-title>\n\n    <mat-paginator [length]=\"100\"\n\t              [pageSize]=\"10\"\n\t              [pageSizeOptions]=\"[5, 10, 25, 100]\">\n\t</mat-paginator>\n\n\n  </mat-card-content>\n</mat-card>\n\n\n<mat-card>\n  <mat-card-content>\n    <mat-card-title>Paginator</mat-card-title>\n\n    <mat-form-field>\n\t  List length:\n\t  <input matInput [(ngModel)]=\"length\">\n\t</mat-form-field>\n\n\t<mat-form-field>\n\t  Page size:\n\t  <input matInput [(ngModel)]=\"pageSize\">\n\t</mat-form-field>\n\t<mat-form-field>\n\t  Page size options:\n\t  <input matInput\n\t         [ngModel]=\"pageSizeOptions\"\n\t         (ngModelChange)=\"setPageSizeOptions($event)\">\n\t</mat-form-field>\n\n\t<mat-paginator [length]=\"length\"\n\t              [pageSize]=\"pageSize\"\n\t              [pageSizeOptions]=\"pageSizeOptions\"\n\t              (page)=\"pageEvent = $event\">\n\t</mat-paginator>\n\n\t<div *ngIf=\"pageEvent\">\n\t  <h5>Page Change Event Properties</h5>\n\t  <div>List length: {{pageEvent.length}}</div>\n\t  <div>Page size: {{pageEvent.pageSize}}</div>\n\t  <div>Page index: {{pageEvent.pageIndex}}</div>\n\t</div>\n\n\n\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/forms/paginator/paginator.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/forms/paginator/paginator.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-radio-group {\n  display: inline-flex;\n  flex-direction: column; }\n\n.example-radio-button {\n  margin: 5px; }\n\n.example-selected-value {\n  margin: 15px 0; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVhbmFseXRpY3MvY2xpZW50Mi9zcmMvYXBwL2Zvcm1zL3BhZ2luYXRvci9wYWdpbmF0b3IuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxxQkFBb0I7RUFDcEIsdUJBQXNCLEVBQ3ZCOztBQUVEO0VBQ0UsWUFBVyxFQUNaOztBQUVEO0VBQ0UsZUFBYyxFQUNmIiwiZmlsZSI6InNyYy9hcHAvZm9ybXMvcGFnaW5hdG9yL3BhZ2luYXRvci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5leGFtcGxlLXJhZGlvLWdyb3VwIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5leGFtcGxlLXJhZGlvLWJ1dHRvbiB7XG4gIG1hcmdpbjogNXB4O1xufVxuXG4uZXhhbXBsZS1zZWxlY3RlZC12YWx1ZSB7XG4gIG1hcmdpbjogMTVweCAwO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/forms/paginator/paginator.component.ts":
/*!********************************************************!*\
  !*** ./src/app/forms/paginator/paginator.component.ts ***!
  \********************************************************/
/*! exports provided: PaginatiorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginatiorComponent", function() { return PaginatiorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PaginatiorComponent = /** @class */ (function () {
    function PaginatiorComponent() {
        // MatPaginator Inputs
        this.length = 100;
        this.pageSize = 10;
        this.pageSizeOptions = [5, 10, 25, 100];
    }
    PaginatiorComponent.prototype.setPageSizeOptions = function (setPageSizeOptionsInput) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(function (str) { return +str; });
    };
    PaginatiorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-paginator',
            template: __webpack_require__(/*! ./paginator.component.html */ "./src/app/forms/paginator/paginator.component.html"),
            styles: [__webpack_require__(/*! ./paginator.component.scss */ "./src/app/forms/paginator/paginator.component.scss")]
        })
    ], PaginatiorComponent);
    return PaginatiorComponent;
}());



/***/ }),

/***/ "./src/app/forms/radiobutton/radiobutton.component.html":
/*!**************************************************************!*\
  !*** ./src/app/forms/radiobutton/radiobutton.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-content>\n    <h3 class=\"example-h2\">Radio Button configuration</h3>\n\n    <mat-radio-group class=\"example-radio-group\" [(ngModel)]=\"favoriteSeason\">\n      <mat-radio-button class=\"example-radio-button\" *ngFor=\"let season of seasons\" [value]=\"season\">\n        {{season}}\n      </mat-radio-button>\n    </mat-radio-group>\n    <div class=\"example-selected-value\">Your favorite season is: {{favoriteSeason}}</div>\n\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/forms/radiobutton/radiobutton.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/forms/radiobutton/radiobutton.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-radio-group {\n  display: inline-flex;\n  flex-direction: column; }\n\n.example-radio-button {\n  margin: 5px; }\n\n.example-selected-value {\n  margin: 15px 0; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVhbmFseXRpY3MvY2xpZW50Mi9zcmMvYXBwL2Zvcm1zL3JhZGlvYnV0dG9uL3JhZGlvYnV0dG9uLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UscUJBQW9CO0VBQ3BCLHVCQUFzQixFQUN2Qjs7QUFFRDtFQUNFLFlBQVcsRUFDWjs7QUFFRDtFQUNFLGVBQWMsRUFDZiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL3JhZGlvYnV0dG9uL3JhZGlvYnV0dG9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4YW1wbGUtcmFkaW8tZ3JvdXAge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmV4YW1wbGUtcmFkaW8tYnV0dG9uIHtcbiAgbWFyZ2luOiA1cHg7XG59XG5cbi5leGFtcGxlLXNlbGVjdGVkLXZhbHVlIHtcbiAgbWFyZ2luOiAxNXB4IDA7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/forms/radiobutton/radiobutton.component.ts":
/*!************************************************************!*\
  !*** ./src/app/forms/radiobutton/radiobutton.component.ts ***!
  \************************************************************/
/*! exports provided: RadiobuttonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RadiobuttonComponent", function() { return RadiobuttonComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var RadiobuttonComponent = /** @class */ (function () {
    function RadiobuttonComponent() {
        this.seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
    }
    RadiobuttonComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-radiobutton',
            template: __webpack_require__(/*! ./radiobutton.component.html */ "./src/app/forms/radiobutton/radiobutton.component.html"),
            styles: [__webpack_require__(/*! ./radiobutton.component.scss */ "./src/app/forms/radiobutton/radiobutton.component.scss")]
        })
    ], RadiobuttonComponent);
    return RadiobuttonComponent;
}());



/***/ }),

/***/ "./src/app/forms/select/select.component.html":
/*!****************************************************!*\
  !*** ./src/app/forms/select/select.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title class=\"mb-3\">Basic Material select</mat-card-title>\n\t\t<mat-form-field>\n\t\t\t<mat-select placeholder=\"Favorite food\">\n\t\t\t\t<mat-option *ngFor=\"let food of foods\" [value]=\"food.value\">\n\t\t\t\t\t{{food.viewValue}}\n\t\t\t\t</mat-option>\n\t\t\t</mat-select>\n\t\t</mat-form-field>\n\t</mat-card-content>\n</mat-card>\n<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title class=\"mb-3\">Basic Native select</mat-card-title>\n\t\t<mat-form-field>\n\t\t\t<select matNativeControl required>\n\t\t\t\t<option value=\"volvo\">Volvo</option>\n\t\t\t\t<option value=\"saab\">Saab</option>\n\t\t\t\t<option value=\"mercedes\">Mercedes</option>\n\t\t\t\t<option value=\"audi\">Audi</option>\n\t\t\t</select>\n\t\t</mat-form-field>\n\t</mat-card-content>\n</mat-card>\n\n<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title class=\"mb-3\">Select with 2-way value binding</mat-card-title>\n\t\t<mat-form-field>\n\t\t\t<mat-select [(value)]=\"selected1\">\n\t\t\t\t<mat-option>None</mat-option>\n\t\t\t\t<mat-option value=\"option1\">Option 1</mat-option>\n\t\t\t\t<mat-option value=\"option2\">Option 2</mat-option>\n\t\t\t\t<mat-option value=\"option3\">Option 3</mat-option>\n\t\t\t</mat-select>\n\t\t</mat-form-field>\n\n\t\t<p>You selected: {{selected1}}</p>\n\t</mat-card-content>\n</mat-card>\n\n<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title>Select in a Form </mat-card-title>\n\t\t<form>\n\t\t\t<h5 class=\"m-b-10\">Material Select</h5>\n\t\t\t<mat-form-field>\n\t\t\t\t<mat-select placeholder=\"Favorite food\" [(ngModel)]=\"selectedValue\" name=\"food\">\n\t\t\t\t\t<mat-option *ngFor=\"let food of foods1\" [value]=\"food.value\">\n\t\t\t\t\t\t{{food.viewValue}}\n\t\t\t\t\t</mat-option>\n\t\t\t\t</mat-select>\n\t\t\t</mat-form-field>\n\t\t\t<p> Selected food: {{selectedValue}} </p>\n\n\t\t\t<h5 class=\"m-b-10\">Native html Select</h5>\n\t\t\t<mat-form-field>\n\t\t\t\t<select matNativeControl placeholder=\"Favorite car\" [(ngModel)]=\"selectedCar\" name=\"car\">\n\t\t\t\t\t<option value=\"\" disabled selected></option>\n\t\t\t\t\t<option *ngFor=\"let car of cars\" [value]=\"car.value\">\n\t\t\t\t\t\t{{car.viewValue}}\n\t\t\t\t\t</option>\n\t\t\t\t</select>\n\t\t\t</mat-form-field>\n\t\t\t<p> Selected car: {{selectedCar}} </p>\n\t\t</form>\n\t</mat-card-content>\n</mat-card>\n\n<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title>Select with form field features</mat-card-title>\n\t\t<form>\n\t\t\t<h5 class=\"m-b-10\">Material Select</h5>\n\t\t\t<mat-form-field class=\"m-b-20\">\n\t\t\t\t<mat-select placeholder=\"Favorite animal\" [formControl]=\"animalControl\" required>\n\t\t\t\t\t<mat-option>--</mat-option>\n\t\t\t\t\t<mat-option *ngFor=\"let animal of animals\" [value]=\"animal\">\n\t\t\t\t\t\t{{animal.name}}\n\t\t\t\t\t</mat-option>\n\t\t\t\t</mat-select>\n\t\t\t\t<mat-error *ngIf=\"animalControl.hasError('required')\">Please choose an animal</mat-error>\n\t\t\t\t<mat-hint>{{animalControl.value?.sound}}</mat-hint>\n\t\t\t</mat-form-field>\n\n\t\t\t<h5 class=\"m-b-10\">Native html Select</h5>\n\t\t\t<mat-form-field class=\"m-t-15\">\n\t\t\t\t<mat-label>Select your car (required)</mat-label>\n\t\t\t\t<select matNativeControl required [formControl]=\"selectFormControl1\">\n\t\t\t\t\t<option label=\"--select something --\"></option>\n\t\t\t\t\t<option value=\"saab\">Saab</option>\n\t\t\t\t\t<option value=\"mercedes\">Mercedes</option>\n\t\t\t\t\t<option value=\"audi\">Audi</option>\n\t\t\t\t</select>\n\t\t\t\t<mat-error *ngIf=\"selectFormControl1.hasError('required')\">\n\t\t\t\t\tThis field is required\n\t\t\t\t</mat-error>\n\t\t\t\t<mat-hint>You can pick up your favorite car here</mat-hint>\n\t\t\t</mat-form-field>\n\t\t</form>\n\t</mat-card-content>\n</mat-card>\n\n<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title>Disabled select</mat-card-title>\n\t\t<p>\n\t\t\t<mat-checkbox [formControl]=\"disableSelect\">Disable select</mat-checkbox>\n\t\t</p>\n\t\t<h5 class=\"m-b-10\">Material Select</h5>\n\t\t<mat-form-field>\n\t\t\t<mat-select placeholder=\"Choose an option\" [disabled]=\"disableSelect.value\">\n\t\t\t\t<mat-option value=\"option1\">Option 1</mat-option>\n\t\t\t\t<mat-option value=\"option2\" disabled>Option 2 (disabled)</mat-option>\n\t\t\t\t<mat-option value=\"option3\">Option 3</mat-option>\n\t\t\t</mat-select>\n\t\t</mat-form-field>\n\t\t<h5 class=\"m-b-10\">Native html select</h5>\n\t\t<mat-form-field>\n\t\t\t<select matNativeControl placeholder=\"Choose an option\" [disabled]=\"disableSelect.value\">\n\t\t\t\t<option value=\"\" disabled selected></option>\n\t\t\t\t<option value=\"volvo\">Volvo</option>\n\t\t\t\t<option value=\"saab\" disabled>Saab</option>\n\t\t\t\t<option value=\"mercedes\">Mercedes</option>\n\t\t\t\t<option value=\"audi\">Audi</option>\n\t\t\t</select>\n\t\t</mat-form-field>\n\n\t</mat-card-content>\n</mat-card>\n\n<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title>Select with reset option</mat-card-title>\n\t\t<h5 class=\"m-b-10\">Material Select</h5>\n\t\t<mat-form-field>\n\t\t\t<mat-select placeholder=\"State\">\n\t\t\t\t<mat-option>None</mat-option>\n\t\t\t\t<mat-option *ngFor=\"let state of states\" [value]=\"state\">{{state}}</mat-option>\n\t\t\t</mat-select>\n\t\t</mat-form-field>\n\t\t<h5 class=\"m-b-10\">Native html select</h5>\n\t\t<mat-form-field>\n\t\t\t<mat-label>Select your car</mat-label>\n\t\t\t<select matNativeControl id=\"mySelectId\">\n\t\t\t\t<option value=\"\" disabled selected></option>\n\t\t\t\t<option value=\"volvo\">Volvo</option>\n\t\t\t\t<option value=\"saab\">Saab</option>\n\t\t\t\t<option value=\"mercedes\">Mercedes</option>\n\t\t\t\t<option value=\"audi\">Audi</option>\n\t\t\t</select>\n\t\t</mat-form-field>\n\n\t</mat-card-content>\n</mat-card>\n\n<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title>Select with option groups </mat-card-title>\n\t\t<h5 class=\"m-b-10\">Material Select</h5>\n\t\t<mat-form-field>\n\t\t\t<mat-select placeholder=\"Pokemon\" [formControl]=\"pokemonControl\">\n\t\t\t\t<mat-option>-- None --</mat-option>\n\t\t\t\t<mat-optgroup *ngFor=\"let group of pokemonGroups\" [label]=\"group.name\" [disabled]=\"group.disabled\">\n\t\t\t\t\t<mat-option *ngFor=\"let pokemon of group.pokemon\" [value]=\"pokemon.value\">\n\t\t\t\t\t\t{{pokemon.viewValue}}\n\t\t\t\t\t</mat-option>\n\t\t\t\t</mat-optgroup>\n\t\t\t</mat-select>\n\t\t</mat-form-field>\n\t\t<h5 class=\"m-b-10\">Native html select</h5>\n\t\t<mat-form-field>\n\t\t\t<select matNativeControl>\n\t\t\t\t<optgroup label=\"Swedish Cars\">\n\t\t\t\t\t<option value=\"volvo\">volvo</option>\n\t\t\t\t\t<option value=\"saab\">Saab</option>\n\t\t\t\t</optgroup>\n\t\t\t\t<optgroup label=\"German Cars\">\n\t\t\t\t\t<option value=\"mercedes\">Mercedes</option>\n\t\t\t\t\t<option value=\"audi\">Audi</option>\n\t\t\t\t</optgroup>\n\t\t\t</select>\n\t\t</mat-form-field>\n\n\t</mat-card-content>\n</mat-card>\n\n<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title>Select with multiple selection</mat-card-title>\n\t\t<mat-form-field>\n\t\t\t<mat-select placeholder=\"Toppings\" [formControl]=\"toppings\" multiple>\n\t\t\t\t<mat-option *ngFor=\"let topping of toppingList\" [value]=\"topping\">{{topping}}</mat-option>\n\t\t\t</mat-select>\n\t\t</mat-form-field>\n\t</mat-card-content>\n</mat-card>\n\n<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title>Select with custom trigger text</mat-card-title>\n\t\t<mat-form-field>\n\t\t\t<mat-select placeholder=\"Toppings\" [formControl]=\"toppings\" multiple>\n\t\t\t\t<mat-select-trigger>\n\t\t\t\t\t{{toppings.value ? toppings.value[0] : ''}}\n\t\t\t\t\t<span *ngIf=\"toppings.value?.length > 1\" class=\"example-additional-selection\">\n\t\t\t\t\t\t(+{{toppings.value.length - 1}} {{toppings.value?.length === 2 ? 'other' : 'others'}})\n\t\t\t\t\t</span>\n\t\t\t\t</mat-select-trigger>\n\t\t\t\t<mat-option *ngFor=\"let topping of toppingList\" [value]=\"topping\">{{topping}}</mat-option>\n\t\t\t</mat-select>\n\t\t</mat-form-field>\n\t</mat-card-content>\n</mat-card>\n\n<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title>Select with no option ripple</mat-card-title>\n\t\t<mat-form-field>\n\t\t\t<mat-select placeholder=\"Select an option\" disableRipple>\n\t\t\t\t<mat-option value=\"1\">Option 1</mat-option>\n\t\t\t\t<mat-option value=\"2\">Option 2</mat-option>\n\t\t\t\t<mat-option value=\"3\">Option 3</mat-option>\n\t\t\t</mat-select>\n\t\t</mat-form-field>\n\t</mat-card-content>\n</mat-card>\n\n<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title>Select with custom panel styling</mat-card-title>\n\t\t<mat-form-field>\n\t\t\t<mat-select placeholder=\"Panel color\" [formControl]=\"panelColor\" panelClass=\"example-panel-{{panelColor.value}}\">\n\t\t\t\t<mat-option value=\"red\">Red</mat-option>\n\t\t\t\t<mat-option value=\"green\">Green</mat-option>\n\t\t\t\t<mat-option value=\"blue\">Blue</mat-option>\n\t\t\t</mat-select>\n\t\t</mat-form-field>\n\t</mat-card-content>\n</mat-card>\n\n<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title>Select with a custom ErrorStateMatcher </mat-card-title>\n\t\t<h5 class=\"m-b-10\">Material Select</h5>\n\t\t<mat-form-field>\n\t\t\t<mat-select placeholder=\"Choose one\" [formControl]=\"selected\" [errorStateMatcher]=\"matcher\">\n\t\t\t\t<mat-option>Clear</mat-option>\n\t\t\t\t<mat-option value=\"valid\">Valid option</mat-option>\n\t\t\t\t<mat-option value=\"invalid\">Invalid option</mat-option>\n\t\t\t</mat-select>\n\t\t\t<mat-hint>Errors appear instantly!</mat-hint>\n\t\t\t<mat-error *ngIf=\"selected.hasError('required')\">You must make a selection</mat-error>\n\t\t\t<mat-error *ngIf=\"selected.hasError('pattern') && !selected.hasError('required')\">\n\t\t\t\tYour selection is invalid\n\t\t\t</mat-error>\n\t\t</mat-form-field>\n\t\t<h5 class=\"m-b-10\">Native html select</h5>\n\t\t<mat-form-field>\n\t\t\t<select matNativeControl placeholder=\"Choose one\" [formControl]=\"nativeSelectFormControl\" [errorStateMatcher]=\"matcher\">\n\t\t\t\t<option value=\"\"></option>\n\t\t\t\t<option value=\"valid\" selected>Valid option</option>\n\t\t\t\t<option value=\"invalid\">Invalid option</option>\n\t\t\t</select>\n\t\t\t<mat-error *ngIf=\"nativeSelectFormControl.hasError('required')\">You must make a selection</mat-error>\n\t\t\t<mat-error *ngIf=\"nativeSelectFormControl.hasError('pattern') && !nativeSelectFormControl.hasError('required')\">\n\t\t\t\tYour selection is invalid\n\t\t\t</mat-error>\n\t\t</mat-form-field>\n\n\t</mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/forms/select/select.component.scss":
/*!****************************************************!*\
  !*** ./src/app/forms/select/select.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%; }\n\n.example-full-width {\n  width: 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVhbmFseXRpY3MvY2xpZW50Mi9zcmMvYXBwL2Zvcm1zL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBZ0I7RUFDaEIsaUJBQWdCO0VBQ2hCLFlBQVcsRUFDWjs7QUFFRDtFQUNFLFlBQVcsRUFDWiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXhhbXBsZS1mb3JtIHtcbiAgbWluLXdpZHRoOiAxNTBweDtcbiAgbWF4LXdpZHRoOiA1MDBweDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5leGFtcGxlLWZ1bGwtd2lkdGgge1xuICB3aWR0aDogMTAwJTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/forms/select/select.component.ts":
/*!**************************************************!*\
  !*** ./src/app/forms/select/select.component.ts ***!
  \**************************************************/
/*! exports provided: MyErrorStateMatcher, SelectfieldComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyErrorStateMatcher", function() { return MyErrorStateMatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectfieldComponent", function() { return SelectfieldComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/** Error when invalid control is dirty, touched, or submitted. */
var MyErrorStateMatcher = /** @class */ (function () {
    function MyErrorStateMatcher() {
    }
    MyErrorStateMatcher.prototype.isErrorState = function (control, form) {
        var isSubmitted = form && form.submitted;
        return !!(control &&
            control.invalid &&
            (control.dirty || control.touched || isSubmitted));
    };
    return MyErrorStateMatcher;
}());

var SelectfieldComponent = /** @class */ (function () {
    function SelectfieldComponent() {
        // 1 && 2
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos' }
        ];
        // 3
        this.selected1 = 'option2';
        this.foods1 = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos' }
        ];
        this.cars = [
            { value: 'volvo', viewValue: 'Volvo' },
            { value: 'saab', viewValue: 'Saab' },
            { value: 'mercedes', viewValue: 'Mercedes' }
        ];
        // 5
        this.animalControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
        this.selectFormControl1 = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
        this.animals = [
            { name: 'Dog', sound: 'Woof!' },
            { name: 'Cat', sound: 'Meow!' },
            { name: 'Cow', sound: 'Moo!' },
            { name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' }
        ];
        // 6
        this.disableSelect = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](false);
        // 7
        this.states = [
            'Alabama',
            'Alaska',
            'Arizona',
            'Arkansas',
            'California',
            'Colorado',
            'Connecticut',
            'Delaware',
            'Florida',
            'Georgia',
            'Hawaii',
            'Idaho',
            'Illinois',
            'Indiana',
            'Iowa',
            'Kansas',
            'Kentucky',
            'Louisiana',
            'Maine',
            'Maryland',
            'Massachusetts',
            'Michigan',
            'Minnesota',
            'Mississippi',
            'Missouri',
            'Montana',
            'Nebraska',
            'Nevada',
            'New Hampshire',
            'New Jersey',
            'New Mexico',
            'New York',
            'North Carolina',
            'North Dakota',
            'Ohio',
            'Oklahoma',
            'Oregon',
            'Pennsylvania',
            'Rhode Island',
            'South Carolina',
            'South Dakota',
            'Tennessee',
            'Texas',
            'Utah',
            'Vermont',
            'Virginia',
            'Washington',
            'West Virginia',
            'Wisconsin',
            'Wyoming'
        ];
        // 8
        this.pokemonControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.pokemonGroups = [
            {
                name: 'Grass',
                pokemon: [
                    { value: 'bulbasaur-0', viewValue: 'Bulbasaur' },
                    { value: 'oddish-1', viewValue: 'Oddish' },
                    { value: 'bellsprout-2', viewValue: 'Bellsprout' }
                ]
            },
            {
                name: 'Water',
                pokemon: [
                    { value: 'squirtle-3', viewValue: 'Squirtle' },
                    { value: 'psyduck-4', viewValue: 'Psyduck' },
                    { value: 'horsea-5', viewValue: 'Horsea' }
                ]
            },
            {
                name: 'Fire',
                disabled: true,
                pokemon: [
                    { value: 'charmander-6', viewValue: 'Charmander' },
                    { value: 'vulpix-7', viewValue: 'Vulpix' },
                    { value: 'flareon-8', viewValue: 'Flareon' }
                ]
            },
            {
                name: 'Psychic',
                pokemon: [
                    { value: 'mew-9', viewValue: 'Mew' },
                    { value: 'mewtwo-10', viewValue: 'Mewtwo' }
                ]
            }
        ];
        // 9
        this.toppings = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.toppingList = [
            'Extra cheese',
            'Mushroom',
            'Onion',
            'Pepperoni',
            'Sausage',
            'Tomato'
        ];
        // 10
        this.panelColor = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('red');
        // 11
        this.selected = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('valid', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern('valid')
        ]);
        this.selectFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('valid', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern('valid')
        ]);
        this.nativeSelectFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('valid', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern('valid')
        ]);
        this.matcher = new MyErrorStateMatcher();
    }
    SelectfieldComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-select',
            template: __webpack_require__(/*! ./select.component.html */ "./src/app/forms/select/select.component.html"),
            styles: [__webpack_require__(/*! ./select.component.scss */ "./src/app/forms/select/select.component.scss")],
            // Encapsulation has to be disabled in order for the
            // component style to apply to the select panel.
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        })
    ], SelectfieldComponent);
    return SelectfieldComponent;
}());



/***/ }),

/***/ "./src/app/forms/sortheader/sortheader.component.html":
/*!************************************************************!*\
  !*** ./src/app/forms/sortheader/sortheader.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-content>\n    <mat-card-title>Sorting overview</mat-card-title>\n    \n    \t\n    <table class=\"m-t-20\" matSort (matSortChange)=\"sortData($event)\" width=\"100%\">\n\t  <tr>\n\t    <th mat-sort-header=\"name\">Dessert (100g)</th>\n\t    <th mat-sort-header=\"calories\">Calories</th>\n\t    <th mat-sort-header=\"fat\">Fat (g)</th>\n\t    <th mat-sort-header=\"carbs\">Carbs (g)</th>\n\t    <th mat-sort-header=\"protein\">Protein (g)</th>\n\t  </tr>\n\n\t  <tr *ngFor=\"let dessert of sortedData\">\n\t    <td>{{dessert.name}}</td>\n\t    <td>{{dessert.calories}}</td>\n\t    <td>{{dessert.fat}}</td>\n\t    <td>{{dessert.carbs}}</td>\n\t    <td>{{dessert.protein}}</td>\n\t  </tr>\n\t</table>\n\n    \n\n  </mat-card-content>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/forms/sortheader/sortheader.component.scss":
/*!************************************************************!*\
  !*** ./src/app/forms/sortheader/sortheader.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL3NvcnRoZWFkZXIvc29ydGhlYWRlci5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/forms/sortheader/sortheader.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/forms/sortheader/sortheader.component.ts ***!
  \**********************************************************/
/*! exports provided: SortheaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortheaderComponent", function() { return SortheaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SortheaderComponent = /** @class */ (function () {
    function SortheaderComponent() {
        this.desserts = [
            { name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4 },
            {
                name: 'Ice cream sandwich',
                calories: 237,
                fat: 9,
                carbs: 37,
                protein: 4
            },
            { name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6 },
            { name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4 },
            { name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4 }
        ];
        this.sortedData = this.desserts.slice();
    }
    SortheaderComponent.prototype.sortData = function (sort) {
        var data = this.desserts.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedData = data;
            return;
        }
        this.sortedData = data.sort(function (a, b) {
            var isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'name':
                    return compare(a.name, b.name, isAsc);
                case 'calories':
                    return compare(a.calories, b.calories, isAsc);
                case 'fat':
                    return compare(a.fat, b.fat, isAsc);
                case 'carbs':
                    return compare(a.carbs, b.carbs, isAsc);
                case 'protein':
                    return compare(a.protein, b.protein, isAsc);
                default:
                    return 0;
            }
        });
    };
    SortheaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sortheader',
            template: __webpack_require__(/*! ./sortheader.component.html */ "./src/app/forms/sortheader/sortheader.component.html"),
            styles: [__webpack_require__(/*! ./sortheader.component.scss */ "./src/app/forms/sortheader/sortheader.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], SortheaderComponent);
    return SortheaderComponent;
}());

function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


/***/ }),

/***/ "./src/app/forms/tree/tree.component.html":
/*!************************************************!*\
  !*** ./src/app/forms/tree/tree.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n\t<mat-card-content>\n\t\t<mat-card-title>Tree with flat nodes</mat-card-title>\n\n\t\t<mat-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\n\t\t\t<mat-tree-node *matTreeNodeDef=\"let node\" matTreeNodeToggle matTreeNodePadding>\n\t\t\t\t<button mat-icon-button disabled></button>\n\t\t\t\t{{node.filename}} : {{node.type}}\n\t\t\t</mat-tree-node>\n\n\t\t\t<mat-tree-node *matTreeNodeDef=\"let node;when: hasChild\" matTreeNodePadding>\n\t\t\t\t<button mat-icon-button matTreeNodeToggle [attr.aria-label]=\"'toggle ' + node.filename\">\n\t\t\t\t\t<mat-icon class=\"mat-icon-rtl-mirror\">\n\t\t\t\t\t\t{{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}\n\t\t\t\t\t</mat-icon>\n\t\t\t\t</button>\n\t\t\t\t{{node.filename}} : {{node.type}}\n\t\t\t</mat-tree-node>\n\t\t</mat-tree>\n\t</mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/forms/tree/tree.component.scss":
/*!************************************************!*\
  !*** ./src/app/forms/tree/tree.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-tree-progress-bar {\n  margin-left: 30px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVhbmFseXRpY3MvY2xpZW50Mi9zcmMvYXBwL2Zvcm1zL3RyZWUvdHJlZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFpQixFQUNsQiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL3RyZWUvdHJlZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5leGFtcGxlLXRyZWUtcHJvZ3Jlc3MtYmFyIHtcbiAgbWFyZ2luLWxlZnQ6IDMwcHg7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/forms/tree/tree.component.ts":
/*!**********************************************!*\
  !*** ./src/app/forms/tree/tree.component.ts ***!
  \**********************************************/
/*! exports provided: FileNode, FileFlatNode, FileDatabase, TreeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileNode", function() { return FileNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileFlatNode", function() { return FileFlatNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileDatabase", function() { return FileDatabase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeComponent", function() { return TreeComponent; });
/* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/tree */ "./node_modules/@angular/cdk/esm5/tree.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/esm5/tree.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * File node data with nested structure.
 * Each node has a filename, and a type or a list of children.
 */
var FileNode = /** @class */ (function () {
    function FileNode() {
    }
    return FileNode;
}());

/** Flat node with expandable and level information */
var FileFlatNode = /** @class */ (function () {
    function FileFlatNode(expandable, filename, level, type) {
        this.expandable = expandable;
        this.filename = filename;
        this.level = level;
        this.type = type;
    }
    return FileFlatNode;
}());

/**
 * The file structure tree data in string. The data could be parsed into a Json object
 */
var TREE_DATA = JSON.stringify({
    Applications: {
        Calendar: 'app',
        Chrome: 'app',
        Webstorm: 'app'
    },
    Documents: {
        angular: {
            src: {
                compiler: 'ts',
                core: 'ts'
            }
        },
        material2: {
            src: {
                button: 'ts',
                checkbox: 'ts',
                input: 'ts'
            }
        }
    },
    Downloads: {
        October: 'pdf',
        November: 'pdf',
        Tutorial: 'html'
    },
    Pictures: {
        'Photo Booth Library': {
            Contents: 'dir',
            Pictures: 'dir'
        },
        Sun: 'png',
        Woods: 'jpg'
    }
});
/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
var FileDatabase = /** @class */ (function () {
    function FileDatabase() {
        this.dataChange = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]([]);
        this.initialize();
    }
    Object.defineProperty(FileDatabase.prototype, "data", {
        get: function () {
            return this.dataChange.value;
        },
        enumerable: true,
        configurable: true
    });
    FileDatabase.prototype.initialize = function () {
        // Parse the string to json object.
        var dataObject = JSON.parse(TREE_DATA);
        // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
        //     file node as children.
        var data = this.buildFileTree(dataObject, 0);
        // Notify the change.
        this.dataChange.next(data);
    };
    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `FileNode`.
     */
    FileDatabase.prototype.buildFileTree = function (obj, level) {
        var _this = this;
        return Object.keys(obj).reduce(function (accumulator, key) {
            var value = obj[key];
            var node = new FileNode();
            node.filename = key;
            if (value != null) {
                if (typeof value === 'object') {
                    node.children = _this.buildFileTree(value, level + 1);
                }
                else {
                    node.type = value;
                }
            }
            return accumulator.concat(node);
        }, []);
    };
    FileDatabase = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], FileDatabase);
    return FileDatabase;
}());

/**
 * @title Tree with flat nodes
 */
var TreeComponent = /** @class */ (function () {
    function TreeComponent(database) {
        var _this = this;
        this.transformer = function (node, level) {
            return new FileFlatNode(!!node.children, node.filename, level, node.type);
            // tslint:disable-next-line:semicolon
        };
        this._getLevel = function (node) { return node.level; };
        this._isExpandable = function (node) { return node.expandable; };
        this._getChildren = function (node) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(node.children);
        };
        this.hasChild = function (_, _nodeData) { return _nodeData.expandable; };
        this.treeFlattener = new _angular_material_tree__WEBPACK_IMPORTED_MODULE_2__["MatTreeFlattener"](this.transformer, this._getLevel, this._isExpandable, this._getChildren);
        this.treeControl = new _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_0__["FlatTreeControl"](this._getLevel, this._isExpandable);
        this.dataSource = new _angular_material_tree__WEBPACK_IMPORTED_MODULE_2__["MatTreeFlatDataSource"](this.treeControl, this.treeFlattener);
        database.dataChange.subscribe(function (data) { return (_this.dataSource.data = data); });
    }
    TreeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-tree',
            template: __webpack_require__(/*! ./tree.component.html */ "./src/app/forms/tree/tree.component.html"),
            styles: [__webpack_require__(/*! ./tree.component.scss */ "./src/app/forms/tree/tree.component.scss")],
            providers: [FileDatabase]
        }),
        __metadata("design:paramtypes", [FileDatabase])
    ], TreeComponent);
    return TreeComponent;
}());



/***/ }),

/***/ "./src/app/forms/wizard/wizard.component.html":
/*!****************************************************!*\
  !*** ./src/app/forms/wizard/wizard.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- row -->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <!-- Card column -->\n  <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Horizontal wizard</mat-card-title>\n        <button mat-raised-button (click)=\"isLinear = true\" id=\"toggle-linear\">Enable linear mode</button>\n        <mat-horizontal-stepper [linear]=\"isLinear\">\n          <mat-step [stepControl]=\"firstFormGroup\">\n            <form [formGroup]=\"firstFormGroup\">\n              <ng-template matStepLabel>Fill out your name</ng-template>\n              <mat-form-field>\n                <input matInput placeholder=\"Last name, First name\" formControlName=\"firstCtrl\" required>\n              </mat-form-field>\n              <div>\n                <button mat-raised-button color=\"warn\" matStepperNext>Next</button>\n              </div>\n            </form>\n          </mat-step>\n          <mat-step [stepControl]=\"secondFormGroup\">\n            <form [formGroup]=\"secondFormGroup\">\n              <ng-template matStepLabel>Fill out your address</ng-template>\n              <mat-form-field>\n                <input matInput placeholder=\"Address\" formControlName=\"secondCtrl\" required>\n              </mat-form-field>\n              <div>\n                <button mat-raised-button color=\"accent\" matStepperPrevious>Back</button>\n                <button mat-raised-button color=\"warn\" matStepperNext>Next</button>\n              </div>\n            </form>\n          </mat-step>\n          <mat-step>\n            <ng-template matStepLabel>Done</ng-template>\n            You are now done.\n            <div>\n              <button mat-raised-button color=\"accent\" matStepperPrevious>Back</button>\n            </div>\n          </mat-step>\n        </mat-horizontal-stepper>\n\n      </mat-card-content>\n\n    </mat-card>\n  </div>\n</div>\n<div fxLayout=\"row wrap\">\n  <!-- Card column -->\n  <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Vertical wizard</mat-card-title>\n        <button mat-raised-button (click)=\"isLinear = true\" id=\"toggle-linear\">Enable linear mode</button>\n        <mat-vertical-stepper [linear]=\"isLinear\">\n          <mat-step [stepControl]=\"firstFormGroup\">\n            <form [formGroup]=\"firstFormGroup\">\n              <ng-template matStepLabel>Fill out your name</ng-template>\n              <mat-form-field>\n                <input matInput placeholder=\"Last name, First name\" formControlName=\"firstCtrl\" required>\n              </mat-form-field>\n              <div>\n                <button mat-raised-button color=\"warn\" matStepperNext>Next</button>\n              </div>\n            </form>\n          </mat-step>\n          <mat-step [stepControl]=\"secondFormGroup\">\n            <form [formGroup]=\"secondFormGroup\">\n              <ng-template matStepLabel>Fill out your address</ng-template>\n              <mat-form-field>\n                <input matInput placeholder=\"Address\" formControlName=\"secondCtrl\" required>\n              </mat-form-field>\n              <div>\n                <button mat-raised-button color=\"accent\" matStepperPrevious>Back</button>\n                <button mat-raised-button color=\"warn\" matStepperNext>Next</button>\n              </div>\n            </form>\n          </mat-step>\n          <mat-step>\n            <ng-template matStepLabel>Done</ng-template>\n            You are now done.\n            <div>\n              <button mat-raised-button color=\"accent\" matStepperPrevious>Back</button>\n            </div>\n          </mat-step>\n        </mat-vertical-stepper>\n\n      </mat-card-content>\n\n    </mat-card>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/forms/wizard/wizard.component.scss":
/*!****************************************************!*\
  !*** ./src/app/forms/wizard/wizard.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL3dpemFyZC93aXphcmQuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/forms/wizard/wizard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/forms/wizard/wizard.component.ts ***!
  \**************************************************/
/*! exports provided: WizardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizardComponent", function() { return WizardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WizardComponent = /** @class */ (function () {
    function WizardComponent(_formBuilder) {
        this._formBuilder = _formBuilder;
        this.isLinear = false;
    }
    WizardComponent.prototype.ngOnInit = function () {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    };
    WizardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-wizard',
            template: __webpack_require__(/*! ./wizard.component.html */ "./src/app/forms/wizard/wizard.component.html"),
            styles: [__webpack_require__(/*! ./wizard.component.scss */ "./src/app/forms/wizard/wizard.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], WizardComponent);
    return WizardComponent;
}());



/***/ })

}]);
//# sourceMappingURL=forms-forms-module.js.map