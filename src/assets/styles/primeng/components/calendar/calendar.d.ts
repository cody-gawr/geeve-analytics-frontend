import {
    ElementRef,
    OnDestroy,
    OnInit,
    EventEmitter,
    Renderer2,
    ChangeDetectorRef,
    TemplateRef,
    QueryList,
    NgZone,
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { ControlValueAccessor } from '@angular/forms';
export declare const CALENDAR_VALUE_ACCESSOR: any;
export interface LocaleSettings {
    firstDayOfWeek?: number;
    dayNames: string[];
    dayNamesShort: string[];
    dayNamesMin: string[];
    monthNames: string[];
    monthNamesShort: string[];
    today: string;
    clear: string;
    dateFormat?: string;
    weekHeader?: string;
}
export declare class Calendar implements OnInit, OnDestroy, ControlValueAccessor {
    el: ElementRef;
    renderer: Renderer2;
    cd: ChangeDetectorRef;
    private zone;
    defaultDate: Date;
    style: any;
    styleClass: string;
    inputStyle: any;
    inputId: string;
    name: string;
    inputStyleClass: string;
    placeholder: string;
    disabled: any;
    dateFormat: string;
    multipleSeparator: string;
    rangeSeparator: string;
    inline: boolean;
    showOtherMonths: boolean;
    selectOtherMonths: boolean;
    showIcon: boolean;
    icon: string;
    appendTo: any;
    readonlyInput: boolean;
    shortYearCutoff: any;
    monthNavigator: boolean;
    yearNavigator: boolean;
    hourFormat: string;
    timeOnly: boolean;
    stepHour: number;
    stepMinute: number;
    stepSecond: number;
    showSeconds: boolean;
    required: boolean;
    showOnFocus: boolean;
    showWeek: boolean;
    dataType: string;
    selectionMode: string;
    maxDateCount: number;
    showButtonBar: boolean;
    todayButtonStyleClass: string;
    clearButtonStyleClass: string;
    autoZIndex: boolean;
    baseZIndex: number;
    panelStyleClass: string;
    panelStyle: any;
    keepInvalid: boolean;
    hideOnDateTimeSelect: boolean;
    numberOfMonths: number;
    view: string;
    touchUI: boolean;
    timeSeparator: string;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    onClose: EventEmitter<any>;
    onSelect: EventEmitter<any>;
    onInput: EventEmitter<any>;
    onTodayClick: EventEmitter<any>;
    onClearClick: EventEmitter<any>;
    onMonthChange: EventEmitter<any>;
    onYearChange: EventEmitter<any>;
    templates: QueryList<any>;
    _locale: LocaleSettings;
    tabindex: number;
    inputfieldViewChild: ElementRef;
    private _utc;
    utc: boolean;
    value: any;
    dates: any[];
    months: any[];
    monthPickerValues: any[];
    weekDays: string[];
    currentMonth: number;
    currentYear: number;
    currentHour: number;
    currentMinute: number;
    currentSecond: number;
    pm: boolean;
    mask: HTMLDivElement;
    maskClickListener: Function;
    overlay: HTMLDivElement;
    overlayVisible: boolean;
    onModelChange: Function;
    onModelTouched: Function;
    calendarElement: any;
    timePickerTimer: any;
    documentClickListener: any;
    ticksTo1970: number;
    yearOptions: number[];
    focus: boolean;
    isKeydown: boolean;
    filled: boolean;
    inputFieldValue: string;
    _minDate: Date;
    _maxDate: Date;
    _showTime: boolean;
    _yearRange: string;
    preventDocumentListener: boolean;
    dateTemplate: TemplateRef<any>;
    _disabledDates: Array<Date>;
    _disabledDays: Array<number>;
    selectElement: any;
    todayElement: any;
    focusElement: any;
    documentResizeListener: any;
    minDate: Date;
    maxDate: Date;
    disabledDates: Date[];
    disabledDays: number[];
    yearRange: string;
    showTime: boolean;
    locale: LocaleSettings;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef, zone: NgZone);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    populateYearOptions(start: any, end: any): void;
    createWeekDays(): void;
    createMonthPickerValues(): void;
    createMonths(month: number, year: number): void;
    getWeekNumber(date: Date): number;
    createMonth(
        month: number,
        year: number,
    ): {
        month: number;
        year: number;
        dates: any[];
        weekNumbers: any[];
    };
    initTime(date: Date): void;
    navBackward(event: any): void;
    navForward(event: any): void;
    decrementYear(): void;
    incrementYear(): void;
    onDateSelect(event: any, dateMeta: any): void;
    shouldSelectDate(dateMeta: any): boolean;
    onMonthSelect(event: any, index: any): void;
    updateInputfield(): void;
    formatDateTime(date: any): any;
    selectDate(dateMeta: any): void;
    updateModel(value: any): void;
    getFirstDayOfMonthIndex(month: number, year: number): number;
    getDaysCountInMonth(month: number, year: number): number;
    getDaysCountInPrevMonth(month: number, year: number): number;
    getPreviousMonthAndYear(
        month: number,
        year: number,
    ): {
        month: any;
        year: any;
    };
    getNextMonthAndYear(
        month: number,
        year: number,
    ): {
        month: any;
        year: any;
    };
    getSundayIndex(): number;
    isSelected(dateMeta: any): boolean;
    isMonthSelected(month: number): boolean;
    isDateEquals(value: any, dateMeta: any): boolean;
    isDateBetween(start: any, end: any, dateMeta: any): boolean;
    isSingleSelection(): boolean;
    isRangeSelection(): boolean;
    isMultipleSelection(): boolean;
    isToday(today: any, day: any, month: any, year: any): boolean;
    isSelectable(day: any, month: any, year: any, otherMonth: any): boolean;
    isDateDisabled(day: number, month: number, year: number): boolean;
    isDayDisabled(day: number, month: number, year: number): boolean;
    onInputFocus(event: Event): void;
    onInputClick(event: Event): void;
    onInputBlur(event: Event): void;
    onButtonClick(event: any, inputfield: any): void;
    onInputKeydown(event: any): void;
    onMonthDropdownChange(m: string): void;
    onYearDropdownChange(y: string): void;
    incrementHour(event: any): void;
    onTimePickerElementMouseDown(event: Event, type: number, direction: number): void;
    onTimePickerElementMouseUp(event: Event): void;
    repeat(event: Event, interval: number, type: number, direction: number): void;
    clearTimePickerTimer(): void;
    decrementHour(event: any): void;
    validateHour(hour: any): boolean;
    incrementMinute(event: any): void;
    decrementMinute(event: any): void;
    validateMinute(minute: any): boolean;
    incrementSecond(event: any): void;
    decrementSecond(event: any): void;
    validateSecond(second: any): boolean;
    updateTime(): void;
    toggleAMPM(event: any): void;
    onUserInput(event: any): void;
    isValidSelection(value: any): boolean;
    parseValueFromString(text: string): Date | Date[];
    parseDateTime(text: any): Date;
    populateTime(value: any, timeString: any, ampm: any): void;
    updateUI(): void;
    showOverlay(): void;
    hideOverlay(): void;
    onOverlayAnimationStart(event: AnimationEvent): void;
    onOverlayAnimationDone(event: AnimationEvent): void;
    appendOverlay(): void;
    restoreOverlayAppend(): void;
    alignOverlay(): void;
    enableModality(element: any): void;
    disableModality(): void;
    unbindMaskClickListener(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    getDateFormat(): string;
    formatDate(date: any, format: any): string;
    formatTime(date: any): string;
    parseTime(value: any): {
        hour: number;
        minute: number;
        second: number;
    };
    parseDate(value: any, format: any): any;
    daylightSavingAdjust(date: any): any;
    updateFilledState(): void;
    onTodayButtonClick(event: any): void;
    onClearButtonClick(event: any): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    bindDocumentResizeListener(): void;
    unbindDocumentResizeListener(): void;
    isOutsideClicked(event: Event): boolean;
    isNavIconClicked(event: Event): boolean;
    onWindowResize(): void;
    onOverlayHide(): void;
    ngOnDestroy(): void;
}
export declare class CalendarModule {}
