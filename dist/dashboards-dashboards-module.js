(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dashboards-dashboards-module"],{

/***/ "./node_modules/ngx-gauge/fesm5/ngx-gauge.js":
/*!***************************************************!*\
  !*** ./node_modules/ngx-gauge/fesm5/ngx-gauge.js ***!
  \***************************************************/
/*! exports provided: NgxGaugeModule, ɵa, ɵb, ɵe, ɵc, ɵd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxGaugeModule", function() { return NgxGaugeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return NgxGauge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return NgxGaugeAppend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵe", function() { return NgxGaugeLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return NgxGaugePrepend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵd", function() { return NgxGaugeValue; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @param {?} min
 * @param {?} max
 * @return {?}
 */
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
/**
 * @param {?} value
 * @return {?}
 */
function coerceBooleanProperty(value) {
    return value != null && "" + value !== 'false';
}
/**
 * @param {?} value
 * @param {?=} fallbackValue
 * @return {?}
 */
function coerceNumberProperty(value, fallbackValue) {
    if (fallbackValue === void 0) { fallbackValue = 0; }
    return isNaN(parseFloat(value)) || isNaN(Number(value)) ? fallbackValue : Number(value);
}
/**
 * @param {?} value
 * @return {?}
 */
function cssUnit(value) {
    return value + "px";
}
/**
 * @param {?} value
 * @return {?}
 */
function isNumber(value) {
    return value != undefined && !isNaN(parseFloat(value)) && !isNaN(Number(value));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxGaugeAppend = /** @class */ (function () {
    function NgxGaugeAppend() {
    }
    NgxGaugeAppend.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: "ngx-gauge-append",
                    exportAs: "ngxGaugeAppend"
                },] }
    ];
    return NgxGaugeAppend;
}());
var NgxGaugePrepend = /** @class */ (function () {
    function NgxGaugePrepend() {
    }
    NgxGaugePrepend.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: "ngx-gauge-prepend",
                    exportAs: "ngxGaugePrepend"
                },] }
    ];
    return NgxGaugePrepend;
}());
var NgxGaugeValue = /** @class */ (function () {
    function NgxGaugeValue() {
    }
    NgxGaugeValue.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: "ngx-gauge-value",
                    exportAs: "ngxGaugeValue"
                },] }
    ];
    return NgxGaugeValue;
}());
var NgxGaugeLabel = /** @class */ (function () {
    function NgxGaugeLabel() {
    }
    NgxGaugeLabel.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: "ngx-gauge-label",
                    exportAs: "ngxGaugeLabel"
                },] }
    ];
    return NgxGaugeLabel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DEFAULTS = {
    MIN: 0,
    MAX: 100,
    TYPE: 'arch',
    THICK: 4,
    FOREGROUND_COLOR: 'rgba(0, 150, 136, 1)',
    BACKGROUND_COLOR: 'rgba(0, 0, 0, 0.1)',
    CAP: 'butt',
    SIZE: 200
};
var NgxGauge = /** @class */ (function () {
    function NgxGauge(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._size = DEFAULTS.SIZE;
        this._min = DEFAULTS.MIN;
        this._max = DEFAULTS.MAX;
        this._animate = true;
        this._initialized = false;
        this._animationRequestID = 0;
        this.max = DEFAULTS.MAX;
        this.type = (/** @type {?} */ (DEFAULTS.TYPE));
        this.cap = (/** @type {?} */ (DEFAULTS.CAP));
        this.thick = DEFAULTS.THICK;
        this.foregroundColor = DEFAULTS.FOREGROUND_COLOR;
        this.backgroundColor = DEFAULTS.BACKGROUND_COLOR;
        this.thresholds = Object.create(null);
        this._value = 0;
        this.duration = 1200;
    }
    Object.defineProperty(NgxGauge.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () { return this._size; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._size = coerceNumberProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxGauge.prototype, "min", {
        get: /**
         * @return {?}
         */
        function () { return this._min; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._min = coerceNumberProperty(value, DEFAULTS.MIN);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxGauge.prototype, "animate", {
        get: /**
         * @return {?}
         */
        function () { return this._animate; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._animate = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxGauge.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () { return this._value; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._value = coerceNumberProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxGauge.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var isTextChanged = changes['label'] || changes['append'] || changes['prepend'];
        /** @type {?} */
        var isDataChanged = changes['value'] || changes['min'] || changes['max'];
        if (this._initialized) {
            if (isDataChanged) {
                /** @type {?} */
                var nv = void 0;
                /** @type {?} */
                var ov = void 0;
                if (changes['value']) {
                    nv = changes['value'].currentValue;
                    ov = changes['value'].previousValue;
                }
                this._update(nv, ov);
            }
            else if (!isTextChanged) {
                this._destroy();
                this._init();
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgxGauge.prototype._updateSize = /**
     * @private
     * @return {?}
     */
    function () {
        this._renderer.setElementStyle(this._elementRef.nativeElement, 'width', cssUnit(this._size));
        this._renderer.setElementStyle(this._elementRef.nativeElement, 'height', cssUnit(this._size));
    };
    /**
     * @return {?}
     */
    NgxGauge.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this._canvas) {
            this._init();
        }
    };
    /**
     * @return {?}
     */
    NgxGauge.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroy();
    };
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    NgxGauge.prototype._getBounds = /**
     * @private
     * @param {?} type
     * @return {?}
     */
    function (type) {
        /** @type {?} */
        var head;
        /** @type {?} */
        var tail;
        if (type == 'semi') {
            head = Math.PI;
            tail = 2 * Math.PI;
        }
        else if (type == 'full') {
            head = 1.5 * Math.PI;
            tail = 3.5 * Math.PI;
        }
        else if (type === 'arch') {
            head = 0.8 * Math.PI;
            tail = 2.2 * Math.PI;
        }
        return { head: head, tail: tail };
    };
    /**
     * @private
     * @param {?} start
     * @param {?} middle
     * @param {?} tail
     * @param {?} color
     * @return {?}
     */
    NgxGauge.prototype._drawShell = /**
     * @private
     * @param {?} start
     * @param {?} middle
     * @param {?} tail
     * @param {?} color
     * @return {?}
     */
    function (start, middle, tail, color) {
        /** @type {?} */
        var center = this._getCenter();
        /** @type {?} */
        var radius = this._getRadius();
        middle = Math.max(middle, start); // never below 0%
        middle = Math.min(middle, tail); // never exceed 100%
        this._clear();
        this._context.beginPath();
        this._context.strokeStyle = this.backgroundColor;
        this._context.arc(center.x, center.y, radius, middle, tail, false);
        this._context.stroke();
        this._context.beginPath();
        this._context.strokeStyle = color;
        this._context.arc(center.x, center.y, radius, start, middle, false);
        this._context.stroke();
    };
    /**
     * @private
     * @return {?}
     */
    NgxGauge.prototype._clear = /**
     * @private
     * @return {?}
     */
    function () {
        this._context.clearRect(0, 0, this._getWidth(), this._getHeight());
    };
    /**
     * @private
     * @return {?}
     */
    NgxGauge.prototype._getWidth = /**
     * @private
     * @return {?}
     */
    function () {
        return this.size;
    };
    /**
     * @private
     * @return {?}
     */
    NgxGauge.prototype._getHeight = /**
     * @private
     * @return {?}
     */
    function () {
        return this.size;
    };
    /**
     * @private
     * @return {?}
     */
    NgxGauge.prototype._getRadius = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var center = this._getCenter();
        return center.x - this.thick;
    };
    /**
     * @private
     * @return {?}
     */
    NgxGauge.prototype._getCenter = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var x = this._getWidth() / 2;
        /** @type {?} */
        var y = this._getHeight() / 2;
        return { x: x, y: y };
    };
    /**
     * @private
     * @return {?}
     */
    NgxGauge.prototype._init = /**
     * @private
     * @return {?}
     */
    function () {
        this._context = ((/** @type {?} */ (this._canvas.nativeElement))).getContext('2d');
        this._initialized = true;
        this._updateSize();
        this._setupStyles();
        this._create();
    };
    /**
     * @private
     * @return {?}
     */
    NgxGauge.prototype._destroy = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._animationRequestID) {
            window.cancelAnimationFrame(this._animationRequestID);
            this._animationRequestID = 0;
        }
        this._clear();
        this._context = null;
    };
    /**
     * @private
     * @return {?}
     */
    NgxGauge.prototype._setupStyles = /**
     * @private
     * @return {?}
     */
    function () {
        this._context.canvas.width = this.size;
        this._context.canvas.height = this.size;
        this._context.lineCap = this.cap;
        this._context.lineWidth = this.thick;
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    NgxGauge.prototype._getForegroundColorByRange = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var match = Object.keys(this.thresholds)
            .filter(function (item) { return isNumber(item) && Number(item) <= value; })
            .sort(function (a, b) { return Number(a) - Number(b); })
            .reverse()[0];
        return match !== undefined
            ? this.thresholds[match].color || this.foregroundColor
            : this.foregroundColor;
    };
    /**
     * @private
     * @param {?=} nv
     * @param {?=} ov
     * @return {?}
     */
    NgxGauge.prototype._create = /**
     * @private
     * @param {?=} nv
     * @param {?=} ov
     * @return {?}
     */
    function (nv, ov) {
        /** @type {?} */
        var self = this;
        /** @type {?} */
        var type = this.type;
        /** @type {?} */
        var bounds = this._getBounds(type);
        /** @type {?} */
        var duration = this.duration;
        /** @type {?} */
        var min = this.min;
        /** @type {?} */
        var max = this.max;
        /** @type {?} */
        var value = clamp(this.value, this.min, this.max);
        /** @type {?} */
        var start = bounds.head;
        /** @type {?} */
        var unit = (bounds.tail - bounds.head) / (max - min);
        /** @type {?} */
        var displacement = unit * (value - min);
        /** @type {?} */
        var tail = bounds.tail;
        /** @type {?} */
        var color = this._getForegroundColorByRange(value);
        /** @type {?} */
        var startTime;
        /**
         * @param {?} timestamp
         * @return {?}
         */
        function animate(timestamp) {
            timestamp = timestamp || new Date().getTime();
            /** @type {?} */
            var runtime = timestamp - startTime;
            /** @type {?} */
            var progress = Math.min(runtime / duration, 1);
            /** @type {?} */
            var previousProgress = ov ? ov * unit : 0;
            /** @type {?} */
            var middle = start + previousProgress + displacement * progress;
            self._drawShell(start, middle, tail, color);
            if (self._animationRequestID && (runtime < duration)) {
                self._animationRequestID = window.requestAnimationFrame(function (timestamp) { return animate(timestamp); });
            }
            else {
                window.cancelAnimationFrame(self._animationRequestID);
            }
        }
        if (this._animate) {
            if (nv != undefined && ov != undefined) {
                displacement = unit * nv - unit * ov;
            }
            self._animationRequestID = window.requestAnimationFrame(function (timestamp) {
                startTime = timestamp || new Date().getTime();
                animate(timestamp);
            });
        }
        else {
            self._drawShell(start, start + displacement, tail, color);
        }
    };
    /**
     * @private
     * @param {?} nv
     * @param {?} ov
     * @return {?}
     */
    NgxGauge.prototype._update = /**
     * @private
     * @param {?} nv
     * @param {?} ov
     * @return {?}
     */
    function (nv, ov) {
        this._clear();
        this._create(nv, ov);
    };
    NgxGauge.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'ngx-gauge',
                    template: "<div class=\"reading-block\" #reading [style.fontSize]=\"size * 0.22 + 'px'\" [style.lineHeight]=\"size + 'px'\">\r\n  <!-- This block can not be indented correctly, because line breaks cause layout spacing, related problem: https://pt.stackoverflow.com/q/276760/2998 -->\r\n  <u class=\"reading-affix\" [ngSwitch]=\"_prependChild != null\"><ng-content select=\"ngx-gauge-prepend\" *ngSwitchCase=\"true\"></ng-content><ng-container *ngSwitchCase=\"false\">{{prepend}}</ng-container></u><ng-container [ngSwitch]=\"_valueDisplayChild != null\"><ng-content *ngSwitchCase=\"true\" select=\"ngx-gauge-value\"></ng-content><ng-container *ngSwitchCase=\"false\">{{value | number}}</ng-container></ng-container><u class=\"reading-affix\" [ngSwitch]=\"_appendChild != null\"><ng-content select=\"ngx-gauge-append\" *ngSwitchCase=\"true\"></ng-content><ng-container *ngSwitchCase=\"false\">{{append}}</ng-container></u>\r\n</div>\r\n<div class=\"reading-label\" \r\n     [style.fontSize]=\"size / 13 + 'px'\" \r\n     [style.lineHeight]=\"(5 * size / 13) + size + 'px'\" \r\n     [ngSwitch]=\"_labelChild != null\">\r\n  <ng-content select=\"ngx-gauge-label\" *ngSwitchCase=\"true\"></ng-content>\r\n  <ng-container *ngSwitchCase=\"false\">{{label}}</ng-container>\r\n</div>\r\n<canvas #canvas [width]=\"size\" [height]=\"size\"></canvas>",
                    host: {
                        'role': 'meter',
                        '[class.ngx-gauge-meter]': 'true',
                        '[attr.aria-valuemin]': 'min',
                        '[attr.aria-valuemax]': 'max',
                        '[attr.aria-valuenow]': 'value'
                    },
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
                    styles: [".ngx-gauge-meter{display:inline-block;text-align:center;position:relative}.reading-block{position:absolute;width:100%;font-weight:400;white-space:nowrap;text-align:center;overflow:hidden;text-overflow:ellipsis}.reading-label{font-family:inherit;width:100%;display:inline-block;position:absolute;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:400}.reading-affix{text-decoration:none;font-size:.6em;opacity:.8;font-weight:200;padding:0 .18em}.reading-affix:first-child{padding-left:0}.reading-affix:last-child{padding-right:0}"]
                }] }
    ];
    /** @nocollapse */
    NgxGauge.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer"] }
    ]; };
    NgxGauge.propDecorators = {
        _canvas: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['canvas',] }],
        _labelChild: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChild"], args: [NgxGaugeLabel,] }],
        _prependChild: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChild"], args: [NgxGaugePrepend,] }],
        _appendChild: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChild"], args: [NgxGaugeAppend,] }],
        _valueDisplayChild: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChild"], args: [NgxGaugeValue,] }],
        size: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        min: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        animate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        max: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        type: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        cap: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        thick: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        label: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        append: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        prepend: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        foregroundColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        backgroundColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        thresholds: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        value: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        duration: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return NgxGauge;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxGaugeModule = /** @class */ (function () {
    function NgxGaugeModule() {
    }
    NgxGaugeModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]],
                    declarations: [NgxGauge, NgxGaugeAppend, NgxGaugePrepend, NgxGaugeValue, NgxGaugeLabel],
                    exports: [NgxGauge, NgxGaugeAppend, NgxGaugePrepend, NgxGaugeValue, NgxGaugeLabel]
                },] }
    ];
    return NgxGaugeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ngx-gauge.js.map

/***/ }),

/***/ "./src/app/dashboards/cliniciananalysis/cliniciananalysis.component.html":
/*!*******************************************************************************!*\
  !*** ./src/app/dashboards/cliniciananalysis/cliniciananalysis.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <!-- Column-->\n    <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n  <mat-card>\n  <mat-card-content>\n    <mat-card-title class=\"mb-3\">Select Dentist</mat-card-title>\n    <mat-form-field>\n      <mat-select placeholder=\"Select Dentist\"  [(ngModel)]=\"selectedDentist\" (ngModelChange)=\"loadDentist($event)\">\n        <mat-option value =\"all\">All Dentists</mat-option>\n        <mat-option *ngFor=\"let dentist of dentists\" [value]=\"dentist.providerId\">\n          {{dentist.name}}\n        </mat-option>\n      </mat-select>\n    </mat-form-field> \n\n  </mat-card-content>\n</mat-card>\n</div>\n  <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n    <mat-card  class=\"dentistProduction\">\n      <mat-card-content>\n        <mat-card-title>Dentist Production</mat-card-title>\n        <canvas baseChart [datasets]=\"barChartData\" [labels]=\"barChartLabels\"  [legend]=\"barChartLegend\"\n          [chartType]=\"barChartType\" (chartHover)=\"chartHovered($event)\" [colors]=\"barChartColors\" (chartClick)=\"chartClicked($event)\">\n        </canvas>\n          <div fxLayout=\"row wrap\" class=\"m-t-40\">\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">{{productionTotal | number : '1.2-2'}}</h3>\n                        <small>Total (Current)</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">{{productionTotalAverage | number : '1.2-2'}}</h3>\n                        <small>Average</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">---</h3>\n                        <small>Goals</small>\n                    </div>\n                </div>\n      </mat-card-content>\n    </mat-card>\n     <mat-card class=\"dentistProductionSingle\" [style.display]=\"'none'\" >\n      <mat-card-content>\n        <mat-card-title>Dentist Production</mat-card-title>\n         <ngx-gauge [type]=\"gaugeType\"\n           [value]=\"gaugeValue\" \n           [label]=\"gaugeLabel\"  \n           [thick]=\"gaugeThick\"  \n           [foregroundColor]=\"foregroundColor\"\n           [cap] =\"cap\"\n           [size] = \"size\">\n          </ngx-gauge>\n          <div fxLayout=\"row wrap\" class=\"m-t-40\">\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">{{productionTotal | number : '1.2-2'}}</h3>\n                        <small>Total (Current)</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">{{productionTotalAverage | number : '1.2-2'}}</h3>\n                        <small>Practice Average</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">---</h3>\n                        <small>Goals</small>\n                    </div>\n                </div>\n      </mat-card-content>\n    </mat-card>\n  </div>\n  <!-- Column-->\n  <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n    <mat-card  class=\"treatmentPlan\">\n      <mat-card-content>\n        <mat-card-title>Treatment Plan Average Cost</mat-card-title>\n        <canvas baseChart class=\"chart\"\n          [datasets]=\"planChartData\"\n          [labels]=\"planChartLabels\"\n          [legend]=\"barChartLegend\"\n          [chartType]=\"barChartType\"\n          (chartHover)=\"chartHovered($event)\"\n          (chartClick)=\"chartClicked($event)\"  [colors]=\"barChartColors\"></canvas>\n          <div fxLayout=\"row wrap\" class=\"m-t-40\">\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">{{planTotalAverage | number : '1.2-2'}}</h3>\n                        <small>Current Average</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">--</h3>\n                        <small>Previous Average</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">---</h3>\n                        <small>Goals</small>\n                    </div>\n                </div>          \n      </mat-card-content>\n    </mat-card>\n    <mat-card class=\"treatmentPlanSingle\" [style.display]=\"'none'\">\n      <mat-card-content>\n        <mat-card-title>Treatment Plan Average Cost</mat-card-title>\n        <ngx-gauge [type]=\"gaugeType\"\n           [value]=\"gaugeValueTreatment\" \n           [label]=\"gaugeLabelTreatment\"  \n           [thick]=\"gaugeThick\"  \n           [foregroundColor]=\"foregroundColor\"\n           [cap] =\"cap\"\n           [size] = \"size\">\n          </ngx-gauge>\n          <div fxLayout=\"row wrap\" class=\"m-t-40\">\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">{{planTotalAverage | number : '1.2-2'}}</h3>\n                        <small>Current Average</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">--</h3>\n                        <small>Previous Average</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">---</h3>\n                        <small>Goals</small>\n                    </div>\n                </div>          \n      </mat-card-content>\n    </mat-card>\n  </div>\n  <!-- Column-->\n  <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n    <mat-card  class=\"noPatients\">\n      <mat-card-content>\n        <mat-card-title>No. Patient Complaints</mat-card-title>\n        <div class=\"chart\" *ngIf=\"doughnutChartLabels.length > 0\">\n        <canvas baseChart class=\"chart\"\n          [data]=\"doughnutChartData\"\n          [labels]=\"doughnutChartLabels\"\n          [chartType]=\"doughnutChartType\"\n          (chartHover)=\"chartHovered($event)\"\n          (chartClick)=\"chartClicked($event)\" [colors]=\"[{backgroundColor: ['#1976d2', '#26dad2', '#dadada']}]\"></canvas>\n        </div>\n          <div fxLayout=\"row wrap\" class=\"m-t-40\">\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">{{doughnutTotal | number : '1.2-2'}}</h3>\n                        <small>Current Total</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">--</h3>\n                        <small>Previous Total</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">---</h3>\n                        <small>Goals</small>\n                    </div>\n                </div>        \n      </mat-card-content>\n    </mat-card>\n    <mat-card class=\"noPatientsSingle\" [style.display]=\"'none'\">\n      <mat-card-content>\n        <mat-card-title>No. Patient Complaints</mat-card-title>\n        <div class=\"chart\" *ngIf=\"doughnutChartLabels.length > 0\">\n         <ngx-gauge [type]=\"gaugeType\"\n           [value]=\"gaugeValuePatients\" \n           [label]=\"gaugeLabelPatients\"  \n           [thick]=\"gaugeThick\"  \n           [foregroundColor]=\"foregroundColor\"\n           [cap] =\"cap\"\n           [size] = \"size\">\n          </ngx-gauge>\n        </div>\n          <div fxLayout=\"row wrap\" class=\"m-t-40\">\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">{{doughnutTotal | number : '1.2-2'}}</h3>\n                        <small>Current Total</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">--</h3>\n                        <small>Previous Total</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">---</h3>\n                        <small>Goals</small>\n                    </div>\n                </div>        \n      </mat-card-content>\n    </mat-card>    \n  </div>\n\n</div>"

/***/ }),

/***/ "./src/app/dashboards/cliniciananalysis/cliniciananalysis.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/dashboards/cliniciananalysis/cliniciananalysis.component.ts ***!
  \*****************************************************************************/
/*! exports provided: ClinicianAnalysisComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClinicianAnalysisComponent", function() { return ClinicianAnalysisComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _cliniciananalysis_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cliniciananalysis.service */ "./src/app/dashboards/cliniciananalysis/cliniciananalysis.service.ts");
/* harmony import */ var _dentist_dentist_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dentist/dentist.service */ "./src/app/dentist/dentist.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ClinicianAnalysisComponent = /** @class */ (function () {
    function ClinicianAnalysisComponent(cliniciananalysisService, dentistService) {
        this.cliniciananalysisService = cliniciananalysisService;
        this.dentistService = dentistService;
        this.dentists = [
            { providerId: 'all', name: 'All Dentists' },
        ];
        this.barChartColors = [
            { backgroundColor: '#1976d2' },
            { backgroundColor: '#26dad2' }
        ];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        //labels
        this.barChartLabels = [];
        this.pieChartLabels = ['ddfs'];
        this.planChartLabels = [];
        this.recallChartLabels = [];
        this.treatmentChartLabels = [];
        this.barChartLabels1 = [];
        this.planChartLabels1 = [];
        this.recallChartLabels1 = [];
        this.treatmentChartLabels1 = [];
        this.doughnutChartLabels = [];
        this.doughnutChartLabels1 = [];
        this.doughnutChartType = 'doughnut';
        //data
        this.barChartData = [
            { data: [], label: 'Dentist Production' }
        ];
        this.pieChartData = [
            { data: [10], label: 'Dentist Production' }
        ];
        this.planChartData = [
            { data: [], label: 'Treatment Plan Average Cost- Proposed Fees' },
            { data: [], label: 'Treatment Plan Average Cost - Completed Fees', hidden: true }
        ];
        this.recallChartData = [
            { data: [50, 30, 20], label: 'Recall Rate' },
            { data: [50, 30, 20], label: 'Rebook Rate' }
        ];
        this.treatmentChartData = [
            { data: [50, 30, 20], label: 'Recall Rate' },
            { data: [50, 30, 20], label: 'Rebook Rate' }
        ];
        this.doughnutChartData = [350, 450, 100];
        this.barChartData1 = [];
        this.planChartData1 = [];
        this.planChartData2 = [];
        this.recallChartData1 = [];
        this.treatmentChartData1 = [];
        this.doughnutChartData1 = [];
        //Total  
        this.productionTotal = 0;
        this.productionTotalAverage = 0;
        this.planTotal = 0;
        this.planTotalAverage = 0;
        this.recallTotal = 0;
        this.recallTotalAverage = 0;
        this.treatmentTotal = 0;
        this.treatmentTotalAverage = 0;
        this.doughnutTotal = 0;
        this.doughnutTotalAverage = 0;
        this.gaugeType = "arch";
        this.gaugeValue = '';
        this.gaugeLabel = "";
        this.gaugeThick = "20";
        this.foregroundColor = "#1e88e5";
        this.cap = "round";
        this.size = "300";
        this.gaugeValueTreatment = 0;
        this.gaugeLabelTreatment = "";
        this.gaugeValuePatients = 0;
        this.gaugeLabelPatients = "";
    }
    ClinicianAnalysisComponent.prototype.ngAfterViewInit = function () {
        this.buildChartNopatients();
        this.buildChart();
        this.buildChartTreatment();
        this.getDentists();
        //this.recallChartTreatment();
    };
    // events
    ClinicianAnalysisComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    ClinicianAnalysisComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    ClinicianAnalysisComponent.prototype.loadDentist = function (newValue) {
        if (newValue == 'all') {
            this.buildChartNopatients();
            this.buildChart();
            this.buildChartTreatment();
            document.querySelector('.dentistProductionSingle').style.display = 'none';
            document.querySelector('.dentistProduction').style.display = 'block';
            document.querySelector('.treatmentPlanSingle').style.display = 'none';
            document.querySelector('.treatmentPlan').style.display = 'block';
            document.querySelector('.noPatientsSingle').style.display = 'none';
            document.querySelector('.noPatients').style.display = 'block';
        }
        else {
            this.selectedDentist = newValue;
            this.buildChartDentist();
            document.querySelector('.dentistProductionSingle').style.display = 'block';
            document.querySelector('.dentistProduction').style.display = 'none';
            this.buildChartTreatmentDentist();
            document.querySelector('.treatmentPlanSingle').style.display = 'block';
            document.querySelector('.treatmentPlan').style.display = 'none';
            this.buildChartNopatientsDentist();
            document.querySelector('.noPatientsSingle').style.display = 'block';
            document.querySelector('.noPatients').style.display = 'none';
        }
    };
    //Dentist Production Chart
    ClinicianAnalysisComponent.prototype.buildChart = function () {
        var _this = this;
        this.cliniciananalysisService.DentistProduction().subscribe(function (data) {
            if (data.message == 'success') {
                data.data.forEach(function (res) {
                    _this.barChartData1.push(res.total);
                    _this.barChartLabels1.push(res.name);
                    _this.productionTotal = _this.productionTotal + parseInt(res.total);
                });
                _this.barChartData[0]['data'] = _this.barChartData1;
                _this.barChartLabels = _this.barChartLabels1;
                _this.productionTotalAverage = _this.productionTotal / _this.barChartData1.length;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    //Individual Dentist Production Chart
    ClinicianAnalysisComponent.prototype.buildChartDentist = function () {
        var _this = this;
        this.cliniciananalysisService.DentistProductionSingle(this.selectedDentist).subscribe(function (data) {
            if (data.message == 'success') {
                _this.gaugeValue = data.data.total;
                _this.gaugeLabel = data.data.name;
                _this.productionTotal = data.data.total;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    //Treatment Plan Average Cost
    ClinicianAnalysisComponent.prototype.buildChartTreatment = function () {
        var _this = this;
        this.cliniciananalysisService.TreatmentPlan().subscribe(function (data) {
            if (data.message == 'success') {
                data.data.forEach(function (res) {
                    _this.planChartData1.push(res.total_all);
                    _this.planChartData2.push(res.total_completed);
                    _this.planChartLabels1.push(res.provider);
                    _this.planTotal = _this.planTotal + parseInt(res.total_completed);
                });
                _this.planChartData[0]['data'] = _this.planChartData1;
                _this.planChartData[1]['data'] = _this.planChartData2;
                _this.planChartLabels = _this.planChartLabels1;
                _this.planTotalAverage = _this.planTotal / _this.planChartData1.length;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    //Individual Treatment Plan Average Cost
    ClinicianAnalysisComponent.prototype.buildChartTreatmentDentist = function () {
        var _this = this;
        this.cliniciananalysisService.TreatmentPlanDentist(this.selectedDentist).subscribe(function (data) {
            if (data.message == 'success') {
                if (data.data != null) {
                    _this.gaugeValueTreatment = data.data.total_all;
                    _this.gaugeLabelTreatment = data.data.provider;
                    _this.planTotal = data.data.total_all;
                    _this.planTotalAverage = _this.planTotal;
                }
                else {
                    _this.gaugeValueTreatment = 0;
                    _this.gaugeLabelTreatment = "No Data for this Dentist";
                    _this.planTotal = 0;
                    _this.planTotalAverage = 0;
                }
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    //Recall Prebook Rate
    ClinicianAnalysisComponent.prototype.recallChartTreatment = function () {
        var _this = this;
        this.cliniciananalysisService.RecallPrebook().subscribe(function (data) {
            if (data.message == 'success') {
                data.data.forEach(function (res) {
                    _this.planChartData1.push(parseInt(res.average_cost));
                    _this.planChartLabels1.push(res.provider);
                    _this.planTotal = _this.planTotal + parseInt(res.average_cost);
                });
                _this.planChartData[0]['data'] = _this.planChartData1;
                _this.planChartLabels = _this.planChartLabels1;
                _this.planTotalAverage = _this.planTotal / _this.planChartData1.length;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    ClinicianAnalysisComponent.prototype.buildChartNopatients = function () {
        var _this = this;
        this.cliniciananalysisService.NoPatients().subscribe(function (data) {
            console.log(_this.doughnutChartLabels);
            if (data.message == 'success') {
                data.data.forEach(function (res) {
                    _this.doughnutChartData1.push(parseInt(res.treat_item));
                    _this.doughnutChartLabels1.push(res.provider);
                    _this.doughnutTotal = _this.doughnutTotal + parseInt(res.treat_item);
                });
                _this.doughnutChartData = _this.doughnutChartData1;
                _this.doughnutChartLabels = _this.doughnutChartLabels1;
                _this.doughnutTotalAverage = _this.doughnutTotal / _this.doughnutChartData1.length;
                console.log(_this.doughnutChartLabels1);
                console.log(_this.doughnutChartLabels);
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    ClinicianAnalysisComponent.prototype.buildChartNopatientsDentist = function () {
        var _this = this;
        this.cliniciananalysisService.NoPatientsDentist(this.selectedDentist).subscribe(function (data) {
            console.log(_this.doughnutChartLabels);
            if (data.message == 'success') {
                if (data.data != null) {
                    _this.gaugeValuePatients = data.data.treat_item;
                    _this.gaugeLabelPatients = data.data.provider;
                    _this.doughnutTotal = data.data.treat_item;
                    _this.doughnutTotalAverage = _this.doughnutTotal;
                }
                else {
                    _this.gaugeValuePatients = 0;
                    _this.gaugeLabelPatients = "No Data for this Dentist";
                    _this.doughnutTotal = 0;
                    _this.doughnutTotalAverage = 0;
                }
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    // Get Dentist
    ClinicianAnalysisComponent.prototype.getDentists = function () {
        var _this = this;
        this.dentistService.getDentists().subscribe(function (res) {
            if (res.message == 'success') {
                _this.dentists = res.data;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    ClinicianAnalysisComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./cliniciananalysis.component.html */ "./src/app/dashboards/cliniciananalysis/cliniciananalysis.component.html")
        }),
        __metadata("design:paramtypes", [_cliniciananalysis_service__WEBPACK_IMPORTED_MODULE_1__["ClinicianAnalysisService"], _dentist_dentist_service__WEBPACK_IMPORTED_MODULE_2__["DentistService"]])
    ], ClinicianAnalysisComponent);
    return ClinicianAnalysisComponent;
}());



/***/ }),

/***/ "./src/app/dashboards/cliniciananalysis/cliniciananalysis.service.ts":
/*!***************************************************************************!*\
  !*** ./src/app/dashboards/cliniciananalysis/cliniciananalysis.service.ts ***!
  \***************************************************************************/
/*! exports provided: ClinicianAnalysisService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClinicianAnalysisService", function() { return ClinicianAnalysisService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ClinicianAnalysisService = /** @class */ (function () {
    function ClinicianAnalysisService(http, _cookieService) {
        this.http = http;
        this._cookieService = _cookieService;
        //append headers
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
        this.headers.append("Token", this._cookieService.get("token"));
    }
    // Dentist Production Service
    ClinicianAnalysisService.prototype.DentistProduction = function (user_id, clinic_id, token) {
        if (user_id === void 0) { user_id = '23'; }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get("http://localhost/jeeveanalytics/server/AccountingInvoicesAndReceipts/caDentistProtection/23/1", { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Dentist Production Single Service
    ClinicianAnalysisService.prototype.DentistProductionSingle = function (dentist_id, user_id, clinic_id, token) {
        if (user_id === void 0) { user_id = '23'; }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get("http://localhost/jeeveanalytics/server/AccountingInvoicesAndReceipts/caDentistProtection/23/1/" + dentist_id, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    //Treatment Plan Average Cost service
    ClinicianAnalysisService.prototype.TreatmentPlan = function (user_id, clinic_id, token) {
        if (user_id === void 0) { user_id = '23'; }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get("http://localhost/jeeveanalytics/server/AccountingInvoicesAndReceipts/caTreatmentPlanAverageCost/23/1", { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    //Treatment Plan Average Cost Single service
    ClinicianAnalysisService.prototype.TreatmentPlanDentist = function (dentist_id, user_id, clinic_id, token) {
        if (user_id === void 0) { user_id = '23'; }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get("http://localhost/jeeveanalytics/server/AccountingInvoicesAndReceipts/caTreatmentPlanAverageCost/23/1/" + dentist_id, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    //Recall Prebook Rate service
    ClinicianAnalysisService.prototype.RecallPrebook = function (user_id, clinic_id, token) {
        if (user_id === void 0) { user_id = '23'; }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get("http://localhost/jeeveanalytics/server/AccountingInvoicesAndReceipts/caTreatmentPlanAverageCost/23/1", { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    //Hourly Rate service
    ClinicianAnalysisService.prototype.NoPatients = function (user_id, clinic_id, token) {
        if (user_id === void 0) { user_id = '23'; }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get("http://localhost/jeeveanalytics/server/AccountingInvoicesAndReceipts/caNumberPatientComplaints/23/1", { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    //Hourly Rate service
    ClinicianAnalysisService.prototype.NoPatientsDentist = function (dentist_id, user_id, clinic_id, token) {
        if (user_id === void 0) { user_id = '23'; }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get("http://localhost/jeeveanalytics/server/AccountingInvoicesAndReceipts/caNumberPatientComplaints/23/1/" + dentist_id, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    ClinicianAnalysisService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], ClinicianAnalysisService);
    return ClinicianAnalysisService;
}());



/***/ }),

/***/ "./src/app/dashboards/clinicianproceedures/clinicianproceedures.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/dashboards/clinicianproceedures/clinicianproceedures.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n      <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n  <mat-card>\n  <mat-card-content>\n    <mat-card-title class=\"mb-3\">Select Dentist</mat-card-title>\n    <mat-form-field>\n      <mat-select placeholder=\"Select Dentist\"  [(ngModel)]=\"selectedDentist\" (ngModelChange)=\"loadDentist($event)\">\n        <mat-option value =\"all\">All Dentists</mat-option>\n        <mat-option *ngFor=\"let dentist of dentists\" [value]=\"dentist.providerId\">\n          {{dentist.name}}\n        </mat-option>\n      </mat-select>\n    </mat-form-field> \n  </mat-card-content>\n      <div><span (click)=\"filterDate('w')\">This Week</span> | <span (click)=\"filterDate('m')\">This Month</span> | <span  (click)=\"filterDate('q')\">This Quarter</span> | <span (click)=\"filterDate('lq')\">Last Quarter</span> | <span (click)=\"filterDate('cytd')\">Current YTD</span> | <span (click)=\"filterDate('fytd')\">Financial YTD</span></div>\n</mat-card>\n</div>\n  <!-- Column-->\n  <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n    <mat-card class=\"itemsPredictor\">\n      <mat-card-content>\n        <mat-card-title>Items Predictor Analysis </mat-card-title>\n        <canvas baseChart [datasets]=\"stackedChartData\" [labels]=\"stackedChartLabels\" [options]=\"stackedChartOptions\" [legend]=\"stackedChartLegend\"\n          [chartType]=\"stackedChartType\" (chartHover)=\"chartHovered($event)\" [colors]=\"stackedChartColors\" (chartClick)=\"chartClicked($event)\">\n        </canvas>\n      </mat-card-content>\n    </mat-card>\n    <mat-card class=\"itemsPredictorSingle\" [style.display]=\"'none'\" >\n      <mat-card-content>\n        <mat-card-title>Items Predictor Analysis </mat-card-title>\n          <div class=\"chart\" *ngIf=\"itemPredictedChartLabels.length > 0\">\n        <canvas baseChart [datasets]=\"itemPredictedChartData\" [labels]=\"itemPredictedChartLabels\" [options]=\"stackedChartOptions\" [legend]=\"stackedChartLegend\"\n          [chartType]=\"stackedChartType\" (chartHover)=\"chartHovered($event)\" [colors]=\"stackedChartColors\" (chartClick)=\"chartClicked($event)\">\n        </canvas>\n      </div>\n      </mat-card-content>\n    </mat-card>\n  </div>\n  <!-- Column-->\n  <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n    <mat-card class=\"ratioPredictor\">\n      <mat-card-content>\n        <mat-card-title>Predictor Ratio</mat-card-title>\n        <canvas baseChart class=\"chart\"\n          [datasets]=\"predictedChartData\"\n          [labels]=\"predictedChartLabels\"\n          [options]=\"barChartOptions\"\n          [legend]=\"stackedChartLegend\"\n          [chartType]=\"stackedChartType\"\n            [colors]=\"[{backgroundColor: ['#1976d2', '#26dad2']}]\"></canvas>\n            <div fxLayout=\"row wrap\" class=\"m-t-40 predicted1\">\n                    <div fxFlex.gt-sm=\"50%\" fxFlex.gt-xs=\"50%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">{{predictedTotalAverage1 | number : '1.2-2'}}</h3>\n                        <small>Current Average</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"50%\" fxFlex.gt-xs=\"50%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">--</h3>\n                        <small>Previous Average</small>\n                    </div>\n                </div> \n            <div fxLayout=\"row wrap\" class=\"m-t-40 predicted2\" [style.display]=\"'none'\">\n                    <div fxFlex.gt-sm=\"50%\" fxFlex.gt-xs=\"50%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">{{predictedTotalAverage2 | number : '1.2-2'}}</h3>\n                        <small>Current Average</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"50%\" fxFlex.gt-xs=\"50%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">--</h3>\n                        <small>Previous Average</small>\n                    </div>\n                </div> \n            <div fxLayout=\"row wrap\" class=\"m-t-40 predicted3\" [style.display]=\"'none'\">\n                    <div fxFlex.gt-sm=\"50%\" fxFlex.gt-xs=\"50%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">{{predictedTotalAverage3 | number : '1.2-2'}}</h3>\n                        <small>Current Average</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"50%\" fxFlex.gt-xs=\"50%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">--</h3>\n                        <small>Previous Average</small>\n                    </div>\n                </div>             \n      </mat-card-content>\n    </mat-card>\n    <mat-card class=\"ratioPredictorSingle\" [style.display]=\"'none'\" >\n      <mat-card-content>\n        <mat-card-title>Predictor Ratio</mat-card-title>\n         <div fxLayout=\"row wrap\" class=\"m-t-40\">\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <small (click) = \"changeDentistPredictor('1')\">Crown to Large Filling</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <small (click) = \"changeDentistPredictor('2')\">Extraction to RCT</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <small (click) = \"changeDentistPredictor('3')\">RCT Conversion</small>\n                    </div>\n                </div>\n        <ngx-gauge [type]=\"gaugeType\"\n           [value]=\"gaugeValuePredicted\" \n           [label]=\"gaugeLabelPredicted\"  \n           [thick]=\"gaugeThick\"  \n           [foregroundColor]=\"foregroundColor\"\n           [cap] =\"cap\"\n           [size] = \"size\">\n          </ngx-gauge>\n            <div fxLayout=\"row wrap\" class=\"m-t-40 predicted1\">\n                    <div fxFlex.gt-sm=\"50%\" fxFlex.gt-xs=\"50%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">{{predictedDentistTotal | number : '1.2-2'}}</h3>\n                        <small>Current</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"50%\" fxFlex.gt-xs=\"50%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">--</h3>\n                        <small>Previous</small>\n                    </div>\n                </div>            \n      </mat-card-content>\n    </mat-card>\n  </div>\n  <!-- Column-->\n  <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n    <mat-card class=\"revenueProceedure\">\n      <mat-card-content>\n        <mat-card-title>Total Revenue of Clinician Per Procedure</mat-card-title>\n        <canvas baseChart class=\"chart\"\n          [datasets]=\"proceedureChartData\"\n          [labels]=\"proceedureChartLabels\"\n          [options]=\"barChartOptions\"\n          [legend]=\"stackedChartLegend\"\n          [chartType]=\"proceedureChartType\"\n          (chartHover)=\"chartHovered($event)\"\n          (chartClick)=\"chartClicked($event)\"  [colors]=\"stackedChartColors\"></canvas>\n        \n      </mat-card-content>\n    </mat-card>\n    <mat-card class=\"revenueProceedureSingle\" [style.display]=\"'none'\">\n      <mat-card-content>\n        <mat-card-title>Total Revenue of Clinician Per Procedure</mat-card-title>\n        <canvas baseChart class=\"chart\"\n          [datasets]=\"proceedureDentistChartData\"\n          [labels]=\"proceedureDentistChartLabels\"\n          [options]=\"barChartOptions\"\n          [legend]=\"stackedChartLegend\"\n          [chartType]=\"proceedureChartType\"\n          (chartHover)=\"chartHovered($event)\"\n          (chartClick)=\"chartClicked($event)\"  [colors]=\"stackedChartColors\"></canvas>\n        \n      </mat-card-content>\n    </mat-card>\n  </div>\n   <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Referral to Other Clinicians Internal / External</mat-card-title>\n         <div fxLayout=\"row wrap\" class=\"m-t-40\">\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <small (click) = \"changePieReferral('Internal')\">Internal</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <small (click) = \"changePieReferral('External')\">External</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <small (click) = \"changePieReferral('Combined')\">Combined</small>\n                    </div>\n                </div>\n          <div class=\"chart\" *ngIf=\"pieChartLabels.length > 0\">\n        <canvas *ngIf=\"showInternal == true\" baseChart height=\"150px\" [data]=\"pieChartData1\" [labels]=\"pieChartLabels\" [chartType]=\"pieChartType\" (chartHover)=\"chartHovered($event)\"\n          (chartClick)=\"chartClicked($event)\"  [options]=\"pieChartOptions\" [colors]=\"[{backgroundColor: ['#1976d2', '#26dad2', '#dadada','#1976d2', '#26dad2', '#dadada']}]\">\n        </canvas>\n         <canvas *ngIf=\"showExternal == true\" baseChart height=\"150px\" [data]=\"pieChartData2\" [labels]=\"pieChartLabels\" [chartType]=\"pieChartType\" (chartHover)=\"chartHovered($event)\"\n          (chartClick)=\"chartClicked($event)\" [options]=\"pieChartOptions\" [colors]=\"[{backgroundColor: ['#1976d2', '#26dad2', '#dadada','#1976d2', '#26dad2', '#dadada']}]\">\n        </canvas>\n         <canvas *ngIf=\"showCombined == true\" baseChart height=\"150px\" [data]=\"pieChartData3\" [labels]=\"pieChartLabels\" [chartType]=\"pieChartType\" (chartHover)=\"chartHovered($event)\"\n          (chartClick)=\"chartClicked($event)\" [options]=\"pieChartOptions\" [colors]=\"[{backgroundColor: ['#1976d2', '#26dad2', '#dadada','#1976d2', '#26dad2', '#dadada']}]\">\n        </canvas>\n      </div>\n          <div fxLayout=\"row wrap\" class=\"m-t-40\">\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">{{pieChartInternalTotal}}</h3>\n                        <small>Total Internal Ref</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">{{pieChartExternalTotal}}</h3>\n                        <small>Total External Ref</small>\n                    </div>\n                    <div fxFlex.gt-sm=\"33.33%\" fxFlex.gt-xs=\"33.33%\" fxFlex=\"100\">\n                        <h3 class=\"m-0 font-light\">{{pieChartCombinedTotal}}</h3>\n                        <small>Total Referrals</small>\n                    </div>\n                </div>       \n      </mat-card-content>\n    </mat-card>\n  </div>\n  \n</div>"

/***/ }),

/***/ "./src/app/dashboards/clinicianproceedures/clinicianproceedures.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/dashboards/clinicianproceedures/clinicianproceedures.component.ts ***!
  \***********************************************************************************/
/*! exports provided: ClinicianProceeduresComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClinicianProceeduresComponent", function() { return ClinicianProceeduresComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _clinicianproceedures_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinicianproceedures.service */ "./src/app/dashboards/clinicianproceedures/clinicianproceedures.service.ts");
/* harmony import */ var _dentist_dentist_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dentist/dentist.service */ "./src/app/dentist/dentist.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ClinicianProceeduresComponent = /** @class */ (function () {
    function ClinicianProceeduresComponent(clinicianproceeduresService, dentistService, datePipe) {
        this.clinicianproceeduresService = clinicianproceeduresService;
        this.dentistService = dentistService;
        this.datePipe = datePipe;
        this.dentists = [
            { providerId: 'all', name: 'All Dentists' },
        ];
        this.stackedChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true,
            barThickness: 10,
            scales: {
                xAxes: [{
                        stacked: true,
                        gridLines: { display: false },
                        ticks: {
                            autoSkip: false
                        }
                    }],
                yAxes: [{
                        stacked: true,
                        ticks: {
                        // callback: function(value) { return numberWithCommas(value); },
                        },
                    }],
            }
        };
        this.pieChartOptions = {
            legend: {
                display: false
            }
        };
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true,
            barThickness: 10,
            scales: {
                xAxes: [{
                        gridLines: { display: false },
                        ticks: {
                            autoSkip: false
                        }
                    }],
                yAxes: [{
                        ticks: {
                        // callback: function(value) { return numberWithCommas(value); },
                        },
                    }],
            },
            legend: {
                position: 'top',
                onClick: function (e, legendItem) {
                    var index = legendItem.datasetIndex;
                    var ci = this.chart;
                    if (index == 0) {
                        document.querySelector('.predicted1').style.display = 'flex';
                        document.querySelector('.predicted2').style.display = 'none';
                        document.querySelector('.predicted3').style.display = 'none';
                        ci.getDatasetMeta(1).hidden = true;
                        ci.getDatasetMeta(2).hidden = true;
                        ci.getDatasetMeta(index).hidden = false;
                    }
                    else if (index == 1) {
                        document.querySelector('.predicted1').style.display = 'none';
                        document.querySelector('.predicted2').style.display = 'flex';
                        document.querySelector('.predicted3').style.display = 'none';
                        ci.getDatasetMeta(0).hidden = true;
                        ci.getDatasetMeta(2).hidden = true;
                        ci.getDatasetMeta(index).hidden = false;
                    }
                    else if (index == 2) {
                        document.querySelector('.predicted1').style.display = 'none';
                        document.querySelector('.predicted2').style.display = 'none';
                        document.querySelector('.predicted3').style.display = 'flex';
                        ci.getDatasetMeta(0).hidden = true;
                        ci.getDatasetMeta(1).hidden = true;
                        ci.getDatasetMeta(index).hidden = false;
                    }
                    ci.update();
                },
            }
        };
        this.predicted1 = true;
        this.predicted2 = false;
        this.predicted3 = false;
        this.showInternal = true;
        this.showExternal = false;
        this.showCombined = false;
        this.stackedChartColors = [
            { backgroundColor: '#1976d2' },
            { backgroundColor: '#26dad2' },
            { backgroundColor: '#808080' },
            { backgroundColor: '#0040ff' },
            { backgroundColor: '#ffe6e6' },
        ];
        this.stackedChartType = 'bar';
        this.stackedChartLegend = true;
        //labels
        this.stackedChartLabels = [];
        this.stackedChartLabels1 = [];
        this.predictedChartLabels = [];
        this.predictedChartLabels1 = [];
        this.proceedureChartLabels = [];
        this.proceedureChartLabels1 = [];
        this.proceedureDentistChartLabels = [];
        //data
        this.stackedChartData = [
            { data: [], label: 'Crowns' },
            { data: [], label: 'Splints ' },
            { data: [], label: 'Root Canals' },
            { data: [], label: 'Perio Charts' },
            { data: [], label: 'Surgical Extractions' }
        ];
        this.stackedChartData1 = [];
        this.stackedChartData2 = [];
        this.stackedChartData3 = [];
        this.stackedChartData4 = [];
        this.stackedChartData5 = [];
        this.predictedChartData = [
            { data: [], label: 'Crown to Large Filling' },
            { data: [], label: 'Extraction to RCT', hidden: true },
            { data: [], label: 'RCT Conversion', hidden: true },
        ];
        this.predictedChartData1 = [];
        this.predictedChartData2 = [];
        this.predictedChartData3 = [];
        this.proceedureChartType = 'horizontalBar';
        this.proceedureChartData = [
            { data: [], label: 'Total Revenue of Clinician Per Procedure' }
        ];
        this.proceedureDentistChartData = [
            { data: [], label: 'Total Revenue of Clinician Per Procedure' }
        ];
        this.proceedureChartData1 = [];
        //Total  
        this.predictedTotal1 = 0;
        this.predictedTotal2 = 0;
        this.predictedTotal3 = 0;
        this.predictedTotalAverage1 = 0;
        this.predictedTotalAverage2 = 0;
        this.predictedTotalAverage3 = 0;
        this.pieChartInternalTotal = 0;
        this.pieChartExternalTotal = 0;
        this.pieChartCombinedTotal = 0;
        // Pie
        this.pieChartLabels = [];
        this.pieChartData1 = [];
        this.pieChartData2 = [];
        this.pieChartData3 = [];
        this.pieChartType = 'pie';
        this.pieChartDatares1 = [];
        this.pieChartDatares2 = [];
        this.pieChartDatares3 = [];
        this.pieChartLabelsres = [];
        this.itemPredictedChartData = [
            { data: [10, 1, 5], label: 'Items Predictor Analysis ' }
        ];
        this.itemPredictedChartData1 = [];
        this.itemPredictedChartLabels = [];
        this.gaugeType = "arch";
        this.gaugeValue = '';
        this.gaugeLabel = "";
        this.gaugeThick = "20";
        this.foregroundColor = "#1e88e5";
        this.cap = "round";
        this.size = "300";
        this.gaugeValuePredicted = 0;
        this.gaugeValuePredicted1 = 0;
        this.gaugeValuePredicted2 = 0;
        this.gaugeValuePredicted3 = 0;
        this.gaugeLabelPredicted = "";
        this.predictedDentistTotal = 0;
    }
    ClinicianProceeduresComponent.prototype.ngAfterViewInit = function () {
        this.buildChartPredictor();
        this.buildChart();
        this.buildChartProceedure();
        this.buildChartReferral();
        this.getDentists();
    };
    // events
    ClinicianProceeduresComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    ClinicianProceeduresComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    ClinicianProceeduresComponent.prototype.loadDentist = function (newValue) {
        if (newValue == 'all') {
            this.buildChartPredictor();
            this.buildChart();
            this.buildChartProceedure();
            this.buildChartReferral();
            document.querySelector('.itemsPredictorSingle').style.display = 'none';
            document.querySelector('.itemsPredictor').style.display = 'block';
            document.querySelector('.ratioPredictorSingle').style.display = 'none';
            document.querySelector('.ratioPredictor').style.display = 'block';
            document.querySelector('.revenueProceedureSingle').style.display = 'none';
            document.querySelector('.revenueProceedure').style.display = 'block';
            /*
                (<HTMLElement>document.querySelector('.treatmentPlanSingle')).style.display = 'none';
                (<HTMLElement>document.querySelector('.treatmentPlan')).style.display = 'block';
            
                (<HTMLElement>document.querySelector('.noPatientsSingle')).style.display = 'none';
                (<HTMLElement>document.querySelector('.noPatients')).style.display = 'block';*/
        }
        else {
            this.selectedDentist = newValue;
            this.buildChartDentist();
            document.querySelector('.itemsPredictorSingle').style.display = 'block';
            document.querySelector('.itemsPredictor').style.display = 'none';
            this.buildChartPredictorDentist();
            document.querySelector('.ratioPredictorSingle').style.display = 'block';
            document.querySelector('.ratioPredictor').style.display = 'none';
            this.buildChartProceedureDentist();
            document.querySelector('.revenueProceedureSingle').style.display = 'block';
            document.querySelector('.revenueProceedure').style.display = 'none';
            this.buildChartReferralDentist();
            /*    this.buildChartTreatmentDentist();
                (<HTMLElement>document.querySelector('.treatmentPlanSingle')).style.display = 'block';
                (<HTMLElement>document.querySelector('.treatmentPlan')).style.display = 'none';
            
                this.buildChartNopatientsDentist();
                (<HTMLElement>document.querySelector('.noPatientsSingle')).style.display = 'block';
                (<HTMLElement>document.querySelector('.noPatients')).style.display = 'none';*/
        }
    };
    //Items Predictor Analysis 
    ClinicianProceeduresComponent.prototype.buildChart = function (startDate, endDate) {
        var _this = this;
        if (startDate === void 0) { startDate = ''; }
        if (endDate === void 0) { endDate = ''; }
        var user_id;
        var clinic_id;
        this.clinicianproceeduresService.ItemsPredictorAnalysis(user_id = '23', clinic_id = '1', startDate, endDate).subscribe(function (data) {
            if (data.message == 'success') {
                if (data.data.length <= 0) {
                }
                else {
                    data.data.forEach(function (res) {
                        _this.stackedChartData1.push(res.crowns);
                        _this.stackedChartData2.push(res.splints);
                        _this.stackedChartData3.push(res.root_canals);
                        _this.stackedChartData4.push(res.perio);
                        _this.stackedChartData5.push(res.surgical_extractions);
                        _this.stackedChartLabels1.push(res.provider);
                        //    this.productionTotal = this.productionTotal + parseInt(res.total);
                    });
                    _this.stackedChartData[0]['data'] = _this.stackedChartData1;
                    _this.stackedChartData[1]['data'] = _this.stackedChartData2;
                    _this.stackedChartData[2]['data'] = _this.stackedChartData3;
                    _this.stackedChartData[3]['data'] = _this.stackedChartData4;
                    _this.stackedChartData[4]['data'] = _this.stackedChartData5;
                    _this.stackedChartLabels = _this.stackedChartLabels1;
                    //this.productionTotalAverage = this.productionTotal/this.barChartData1.length;
                }
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    //Items Predictor Analysis Single
    ClinicianProceeduresComponent.prototype.buildChartDentist = function (startDate, endDate) {
        var _this = this;
        if (startDate === void 0) { startDate = ''; }
        if (endDate === void 0) { endDate = ''; }
        var user_id;
        var clinic_id;
        this.clinicianproceeduresService.ItemsPredictorAnalysisDentist(this.selectedDentist, user_id = '23', clinic_id = '1', startDate, endDate).subscribe(function (data) {
            if (data.message == 'success') {
                _this.itemPredictedChartData1 = [];
                _this.itemPredictedChartData1.push(data.data[0].crowns);
                _this.itemPredictedChartData1.push(data.data[0].splints);
                _this.itemPredictedChartData1.push(data.data[0].root_canals);
                _this.itemPredictedChartData1.push(data.data[0].perio);
                _this.itemPredictedChartData1.push(data.data[0].surgical_extractions);
                _this.itemPredictedChartData[0]['data'] = _this.itemPredictedChartData1;
                _this.itemPredictedChartData[0]['label'] = data.data[0].provider;
                _this.itemPredictedChartLabels = ['Crowns', 'Splints', 'Root Canals', 'Perio', 'Surgical Extractions'];
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    //Predictor Ratio :
    ClinicianProceeduresComponent.prototype.buildChartPredictor = function (startDate, endDate) {
        var _this = this;
        if (startDate === void 0) { startDate = ''; }
        if (endDate === void 0) { endDate = ''; }
        var user_id;
        var clinic_id;
        this.clinicianproceeduresService.PredictorRatio(user_id = '23', clinic_id = '1', startDate, endDate).subscribe(function (data) {
            if (data.message == 'success') {
                data.data.forEach(function (res) {
                    _this.predictedChartData1.push(res.ratio1);
                    _this.predictedChartData2.push(res.ratio2);
                    _this.predictedChartData3.push(res.ratio3);
                    _this.predictedChartLabels1.push(res.provider);
                    _this.predictedTotal1 = _this.predictedTotal1 + parseInt(res.ratio1);
                    _this.predictedTotal2 = _this.predictedTotal2 + parseInt(res.ratio2);
                    _this.predictedTotal3 = _this.predictedTotal3 + parseInt(res.ratio3);
                });
                _this.predictedChartData[0]['data'] = _this.predictedChartData1;
                _this.predictedChartData[1]['data'] = _this.predictedChartData2;
                _this.predictedChartData[2]['data'] = _this.predictedChartData3;
                _this.predictedTotalAverage1 = _this.predictedTotal1 / _this.predictedChartData1.length;
                _this.predictedTotalAverage2 = _this.predictedTotal2 / _this.predictedChartData2.length;
                _this.predictedTotalAverage3 = _this.predictedTotal3 / _this.predictedChartData3.length;
                _this.predictedChartLabels = _this.predictedChartLabels1;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    //Predictor Ratio :
    ClinicianProceeduresComponent.prototype.buildChartPredictorDentist = function (startDate, endDate) {
        var _this = this;
        if (startDate === void 0) { startDate = ''; }
        if (endDate === void 0) { endDate = ''; }
        var user_id;
        var clinic_id;
        this.clinicianproceeduresService.PredictorRatioDentist(this.selectedDentist, user_id = '23', clinic_id = '1', startDate, endDate).subscribe(function (data) {
            if (data.message == 'success') {
                _this.gaugeValuePredicted1 = data.data[0].ratio1;
                _this.gaugeValuePredicted2 = data.data[0].ratio2;
                _this.gaugeValuePredicted3 = data.data[0].ratio3;
                _this.gaugeLabelPredicted = data.data[0].provider;
                _this.predictedDentistTotal = data.data[0].ratio1;
                _this.gaugeValuePredicted = _this.gaugeValuePredicted1 * 100;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    //Total Revenue of Clinician Per Procedure
    ClinicianProceeduresComponent.prototype.buildChartProceedure = function (startDate, endDate) {
        var _this = this;
        if (startDate === void 0) { startDate = ''; }
        if (endDate === void 0) { endDate = ''; }
        var user_id;
        var clinic_id;
        this.clinicianproceeduresService.ClinicianProceedure(user_id = '23', clinic_id = '1', startDate, endDate).subscribe(function (data) {
            if (data.message == 'success') {
                data.data.forEach(function (res) {
                    _this.proceedureChartData1.push(res.total);
                    +_this.proceedureChartLabels1.push(res.treat_item);
                    //    this.productionTotal = this.productionTotal + parseInt(res.total);
                });
                _this.proceedureChartData[0]['data'] = _this.proceedureChartData1;
                _this.proceedureChartLabels = _this.proceedureChartLabels1;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    //Total Revenue of Clinician Per Procedure
    ClinicianProceeduresComponent.prototype.buildChartProceedureDentist = function (startDate, endDate) {
        var _this = this;
        if (startDate === void 0) { startDate = ''; }
        if (endDate === void 0) { endDate = ''; }
        var user_id;
        var clinic_id;
        this.proceedureChartData1 = [];
        this.proceedureChartLabels1 = [];
        this.clinicianproceeduresService.ClinicianProceedureDentist(this.selectedDentist, user_id = '23', clinic_id = '1', startDate, endDate).subscribe(function (data) {
            if (data.message == 'success') {
                data.data.forEach(function (res) {
                    _this.proceedureChartData1.push(res.total);
                    _this.proceedureChartLabels1.push(res.treat_item);
                    //    this.productionTotal = this.productionTotal + parseInt(res.total);
                });
                _this.proceedureDentistChartData[0]['data'] = _this.proceedureChartData1;
                _this.proceedureDentistChartLabels = _this.proceedureChartLabels1;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    //Referral to Other Clinicians Internal / External
    ClinicianProceeduresComponent.prototype.buildChartReferral = function (startDate, endDate) {
        var _this = this;
        if (startDate === void 0) { startDate = ''; }
        if (endDate === void 0) { endDate = ''; }
        var user_id;
        var clinic_id;
        this.clinicianproceeduresService.ClinicianReferral(user_id = '23', clinic_id = '1', startDate, endDate).subscribe(function (data) {
            if (data.message == 'success') {
                _this.pieChartDatares1 = [];
                _this.pieChartDatares2 = [];
                _this.pieChartDatares3 = [];
                _this.pieChartLabelsres = [];
                data.data.forEach(function (res) {
                    _this.pieChartDatares1.push(res.i_count);
                    _this.pieChartDatares2.push(res.e_count);
                    _this.pieChartDatares3.push(res.total);
                    _this.pieChartLabelsres.push(res.label);
                    _this.pieChartInternalTotal = _this.pieChartInternalTotal + parseInt(res.i_count);
                    _this.pieChartExternalTotal = _this.pieChartExternalTotal + parseInt(res.e_count);
                    _this.pieChartCombinedTotal = _this.pieChartCombinedTotal + parseInt(res.total);
                });
                _this.pieChartData1 = _this.pieChartDatares1;
                _this.pieChartData2 = _this.pieChartDatares2;
                _this.pieChartData3 = _this.pieChartDatares3;
                _this.pieChartLabels = _this.pieChartLabelsres;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    //Referral to Other Clinicians Internal / External
    ClinicianProceeduresComponent.prototype.buildChartReferralDentist = function (startDate, endDate) {
        var _this = this;
        if (startDate === void 0) { startDate = ''; }
        if (endDate === void 0) { endDate = ''; }
        var user_id;
        var clinic_id;
        this.clinicianproceeduresService.ClinicianReferralDentist(this.selectedDentist, user_id = '23', clinic_id = '1', startDate, endDate).subscribe(function (data) {
            if (data.message == 'success') {
                _this.pieChartDatares1 = [];
                _this.pieChartDatares2 = [];
                _this.pieChartDatares3 = [];
                _this.pieChartLabelsres = [];
                data.data.forEach(function (res) {
                    _this.pieChartDatares1.push(res.i_count);
                    _this.pieChartDatares2.push(res.e_count);
                    _this.pieChartDatares3.push(res.total);
                    _this.pieChartLabelsres.push(res.label);
                    _this.pieChartInternalTotal = _this.pieChartInternalTotal + parseInt(res.i_count);
                    _this.pieChartExternalTotal = _this.pieChartExternalTotal + parseInt(res.e_count);
                    _this.pieChartCombinedTotal = _this.pieChartCombinedTotal + parseInt(res.total);
                });
                _this.pieChartData1 = _this.pieChartDatares1;
                _this.pieChartData2 = _this.pieChartDatares2;
                _this.pieChartData3 = _this.pieChartDatares3;
                _this.pieChartLabels = _this.pieChartLabelsres;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    ClinicianProceeduresComponent.prototype.changePieReferral = function (chart) {
        this.showInternal = false;
        this.showExternal = false;
        this.showCombined = false;
        if (chart == 'Internal')
            this.showInternal = true;
        else if (chart == 'External')
            this.showExternal = true;
        else if (chart == 'Combined')
            this.showCombined = true;
    };
    // Filter By Date
    ClinicianProceeduresComponent.prototype.filterDate = function (duration) {
        if (duration == 'w') {
            var now = new Date();
            var first = now.getDate() - now.getDay();
            var last = first + 6;
            var startDate = this.datePipe.transform(new Date(now.setDate(first)).toUTCString(), 'yyyy-MM-dd');
            var endDate = this.datePipe.transform(new Date(now.setDate(last)).toUTCString(), 'yyyy-MM-dd');
            var dates = startDate + "," + endDate;
        }
        else if (duration == 'm') {
            var date = new Date();
            var startDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'yyyy-MM-dd');
            var endDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() + 1, 0), 'yyyy-MM-dd');
        }
        console.log(startDate + ' ' + endDate);
        this.buildChart(startDate, endDate);
    };
    // Get Dentist
    ClinicianProceeduresComponent.prototype.getDentists = function () {
        var _this = this;
        this.dentistService.getDentists().subscribe(function (res) {
            if (res.message == 'success') {
                _this.dentists = res.data;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    ClinicianProceeduresComponent.prototype.changeDentistPredictor = function (val) {
        if (val == '1') {
            this.gaugeValuePredicted = this.gaugeValuePredicted1 * 100;
            this.predictedDentistTotal = this.gaugeValuePredicted1;
        }
        else if (val == '2') {
            this.gaugeValuePredicted = this.gaugeValuePredicted2 * 100;
            this.predictedDentistTotal = this.gaugeValuePredicted2;
        }
        else if (val == '3') {
            this.gaugeValuePredicted = this.gaugeValuePredicted3 * 100;
            this.predictedDentistTotal = this.gaugeValuePredicted3;
        }
    };
    ClinicianProceeduresComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./clinicianproceedures.component.html */ "./src/app/dashboards/clinicianproceedures/clinicianproceedures.component.html")
        }),
        __metadata("design:paramtypes", [_clinicianproceedures_service__WEBPACK_IMPORTED_MODULE_1__["ClinicianProceeduresService"], _dentist_dentist_service__WEBPACK_IMPORTED_MODULE_2__["DentistService"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"]])
    ], ClinicianProceeduresComponent);
    return ClinicianProceeduresComponent;
}());



/***/ }),

/***/ "./src/app/dashboards/clinicianproceedures/clinicianproceedures.service.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/dashboards/clinicianproceedures/clinicianproceedures.service.ts ***!
  \*********************************************************************************/
/*! exports provided: ClinicianProceeduresService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClinicianProceeduresService", function() { return ClinicianProceeduresService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ClinicianProceeduresService = /** @class */ (function () {
    function ClinicianProceeduresService(http, _cookieService) {
        this.http = http;
        this._cookieService = _cookieService;
        //append headers
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
    }
    // Items Predictor Analysis 
    ClinicianProceeduresService.prototype.ItemsPredictorAnalysis = function (user_id, clinic_id, startDate, endDate) {
        if (user_id === void 0) { user_id = '23'; }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (startDate === void 0) { startDate = ''; }
        if (endDate === void 0) { endDate = ''; }
        return this.http.get("http://localhost/jeeveanalytics/server/ClinicianProcedures/cpItemsPredictorAnalysis?user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token") + "&start_date=" + startDate + "&end_date=" + endDate, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Items Predictor Analysis 
    ClinicianProceeduresService.prototype.ItemsPredictorAnalysisDentist = function (dentist_id, user_id, clinic_id, startDate, endDate) {
        if (user_id === void 0) { user_id = '23'; }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (startDate === void 0) { startDate = ''; }
        if (endDate === void 0) { endDate = ''; }
        return this.http.get("http://localhost/jeeveanalytics/server/ClinicianProcedures/cpItemsPredictorAnalysis?user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token") + "&start_date=" + startDate + "&end_date=" + endDate + "&dentist_id=" + dentist_id, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    //Predictor Ratio 1:
    ClinicianProceeduresService.prototype.PredictorRatio = function (user_id, clinic_id, startDate, endDate) {
        if (user_id === void 0) { user_id = '23'; }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (startDate === void 0) { startDate = ''; }
        if (endDate === void 0) { endDate = ''; }
        return this.http.get("http://localhost/jeeveanalytics/server/ClinicianProcedures/cpPredictorRatio?user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token") + "&start_date=" + startDate + "&end_date=" + endDate, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    //Predictor Ratio 1:
    ClinicianProceeduresService.prototype.PredictorRatioDentist = function (dentist_id, user_id, clinic_id, startDate, endDate) {
        if (user_id === void 0) { user_id = '23'; }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (startDate === void 0) { startDate = ''; }
        if (endDate === void 0) { endDate = ''; }
        return this.http.get("http://localhost/jeeveanalytics/server/ClinicianProcedures/cpPredictorRatio?user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token") + "&start_date=" + startDate + "&end_date=" + endDate + "&dentist_id=" + dentist_id, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    //Total Revenue of Clinician Per Procedure
    ClinicianProceeduresService.prototype.ClinicianProceedure = function (user_id, clinic_id, startDate, endDate) {
        if (user_id === void 0) { user_id = '23'; }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (startDate === void 0) { startDate = ''; }
        if (endDate === void 0) { endDate = ''; }
        return this.http.get("http://localhost/jeeveanalytics/server/ClinicianProcedures/cpTotalRevenueOfClinicianPerProcedure?user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token") + "&start_date=" + startDate + "&end_date=" + endDate, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    //Total Revenue of Clinician Per Procedure
    ClinicianProceeduresService.prototype.ClinicianProceedureDentist = function (dentist_id, user_id, clinic_id, startDate, endDate) {
        if (user_id === void 0) { user_id = '23'; }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (startDate === void 0) { startDate = ''; }
        if (endDate === void 0) { endDate = ''; }
        return this.http.get("http://localhost/jeeveanalytics/server/ClinicianProcedures/cpTotalRevenueOfClinicianPerProcedure?user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token") + "&start_date=" + startDate + "&end_date=" + endDate + "&dentist_id=" + dentist_id, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    //Referral to Other Clinicians Internal / External
    ClinicianProceeduresService.prototype.ClinicianReferral = function (user_id, clinic_id, startDate, endDate) {
        if (user_id === void 0) { user_id = '23'; }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (startDate === void 0) { startDate = ''; }
        if (endDate === void 0) { endDate = ''; }
        return this.http.get("http://localhost/jeeveanalytics/server/ClinicianProcedures/cpReferralToOtherClinicians?user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token") + "&start_date=" + startDate + "&end_date=" + endDate, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    //Referral to Other Clinicians Internal / External
    ClinicianProceeduresService.prototype.ClinicianReferralDentist = function (dentist_id, user_id, clinic_id, startDate, endDate) {
        if (user_id === void 0) { user_id = '23'; }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (startDate === void 0) { startDate = ''; }
        if (endDate === void 0) { endDate = ''; }
        return this.http.get("http://localhost/jeeveanalytics/server/ClinicianProcedures/cpReferralToOtherClinicians?user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token") + "&start_date=" + startDate + "&end_date=" + endDate, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    ClinicianProceeduresService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], ClinicianProceeduresService);
    return ClinicianProceeduresService;
}());



/***/ }),

/***/ "./src/app/dashboards/dashboards.module.ts":
/*!*************************************************!*\
  !*** ./src/app/dashboards/dashboards.module.ts ***!
  \*************************************************/
/*! exports provided: DashboardsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardsModule", function() { return DashboardsModule; });
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/table */ "./node_modules/@angular/cdk/esm5/table.es5.js");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-charts */ "./node_modules/ng2-charts/index.js");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ng2_charts__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _dashboards_routing__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dashboards.routing */ "./src/app/dashboards/dashboards.routing.ts");
/* harmony import */ var ng_chartist__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ng-chartist */ "./node_modules/ng-chartist/dist/ng-chartist.js");
/* harmony import */ var ng_chartist__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(ng_chartist__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @swimlane/ngx-charts */ "./node_modules/@swimlane/ngx-charts/release/index.js");
/* harmony import */ var _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _cliniciananalysis_cliniciananalysis_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./cliniciananalysis/cliniciananalysis.service */ "./src/app/dashboards/cliniciananalysis/cliniciananalysis.service.ts");
/* harmony import */ var _cliniciananalysis_cliniciananalysis_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./cliniciananalysis/cliniciananalysis.component */ "./src/app/dashboards/cliniciananalysis/cliniciananalysis.component.ts");
/* harmony import */ var _clinicianproceedures_clinicianproceedures_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./clinicianproceedures/clinicianproceedures.service */ "./src/app/dashboards/clinicianproceedures/clinicianproceedures.service.ts");
/* harmony import */ var _clinicianproceedures_clinicianproceedures_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./clinicianproceedures/clinicianproceedures.component */ "./src/app/dashboards/clinicianproceedures/clinicianproceedures.component.ts");
/* harmony import */ var _dentist_dentist_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../dentist/dentist.service */ "./src/app/dentist/dentist.service.ts");
/* harmony import */ var ngx_gauge__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-gauge */ "./node_modules/ngx-gauge/fesm5/ngx-gauge.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var DashboardsModule = /** @class */ (function () {
    function DashboardsModule() {
    }
    DashboardsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_dashboards_routing__WEBPACK_IMPORTED_MODULE_10__["DashboardsRoutes"]),
                _demo_material_module__WEBPACK_IMPORTED_MODULE_5__["DemoMaterialModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_9__["FlexLayoutModule"],
                _angular_cdk_table__WEBPACK_IMPORTED_MODULE_6__["CdkTableModule"],
                ng_chartist__WEBPACK_IMPORTED_MODULE_11__["ChartistModule"],
                ng2_charts__WEBPACK_IMPORTED_MODULE_7__["ChartsModule"],
                _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_12__["NgxChartsModule"],
                ngx_gauge__WEBPACK_IMPORTED_MODULE_18__["NgxGaugeModule"]
            ],
            providers: [_cliniciananalysis_cliniciananalysis_service__WEBPACK_IMPORTED_MODULE_13__["ClinicianAnalysisService"], _clinicianproceedures_clinicianproceedures_service__WEBPACK_IMPORTED_MODULE_15__["ClinicianProceeduresService"], _dentist_dentist_service__WEBPACK_IMPORTED_MODULE_17__["DentistService"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["DatePipe"]],
            declarations: [_cliniciananalysis_cliniciananalysis_component__WEBPACK_IMPORTED_MODULE_14__["ClinicianAnalysisComponent"], _clinicianproceedures_clinicianproceedures_component__WEBPACK_IMPORTED_MODULE_16__["ClinicianProceeduresComponent"]]
        })
    ], DashboardsModule);
    return DashboardsModule;
}());



/***/ }),

/***/ "./src/app/dashboards/dashboards.routing.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboards/dashboards.routing.ts ***!
  \**************************************************/
/*! exports provided: DashboardsRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardsRoutes", function() { return DashboardsRoutes; });
/* harmony import */ var _cliniciananalysis_cliniciananalysis_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cliniciananalysis/cliniciananalysis.component */ "./src/app/dashboards/cliniciananalysis/cliniciananalysis.component.ts");
/* harmony import */ var _clinicianproceedures_clinicianproceedures_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clinicianproceedures/clinicianproceedures.component */ "./src/app/dashboards/clinicianproceedures/clinicianproceedures.component.ts");


var DashboardsRoutes = [
    {
        path: '',
        children: [
            {
                path: 'cliniciananalysis',
                component: _cliniciananalysis_cliniciananalysis_component__WEBPACK_IMPORTED_MODULE_0__["ClinicianAnalysisComponent"]
            },
            {
                path: 'clinicianproceedures',
                component: _clinicianproceedures_clinicianproceedures_component__WEBPACK_IMPORTED_MODULE_1__["ClinicianProceeduresComponent"]
            }
        ]
    }
];


/***/ })

}]);
//# sourceMappingURL=dashboards-dashboards-module.js.map