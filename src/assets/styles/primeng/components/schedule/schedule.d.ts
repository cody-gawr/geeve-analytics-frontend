import {
    ElementRef,
    OnDestroy,
    DoCheck,
    OnChanges,
    EventEmitter,
    IterableDiffers,
    OnInit,
    AfterViewChecked,
    SimpleChanges,
} from '@angular/core';
export declare class Schedule implements DoCheck, OnDestroy, OnInit, OnChanges, AfterViewChecked {
    el: ElementRef;
    events: any[];
    header: any;
    style: any;
    styleClass: string;
    rtl: boolean;
    weekends: boolean;
    hiddenDays: number[];
    fixedWeekCount: boolean;
    weekNumbers: boolean;
    businessHours: any;
    height: any;
    contentHeight: any;
    aspectRatio: number;
    eventLimit: any;
    defaultDate: any;
    editable: boolean;
    droppable: boolean;
    eventStartEditable: boolean;
    eventDurationEditable: boolean;
    defaultView: string;
    allDaySlot: boolean;
    allDayText: string;
    slotDuration: any;
    slotLabelInterval: any;
    snapDuration: any;
    scrollTime: any;
    minTime: any;
    maxTime: any;
    slotEventOverlap: boolean;
    nowIndicator: boolean;
    dragRevertDuration: number;
    dragOpacity: number;
    dragScroll: boolean;
    eventOverlap: any;
    eventConstraint: any;
    locale: string;
    timezone: boolean | string;
    timeFormat: string | null;
    eventRender: Function;
    dayRender: Function;
    navLinks: boolean;
    onDayClick: EventEmitter<any>;
    onDrop: EventEmitter<any>;
    onEventClick: EventEmitter<any>;
    onEventMouseover: EventEmitter<any>;
    onEventMouseout: EventEmitter<any>;
    onEventDragStart: EventEmitter<any>;
    onEventDragStop: EventEmitter<any>;
    onEventDrop: EventEmitter<any>;
    onEventResizeStart: EventEmitter<any>;
    onEventResizeStop: EventEmitter<any>;
    onEventResize: EventEmitter<any>;
    onViewRender: EventEmitter<any>;
    onViewDestroy: EventEmitter<any>;
    onNavLinkDayClick: EventEmitter<any>;
    onNavLinkWeekClick: EventEmitter<any>;
    initialized: boolean;
    stopNgOnChangesPropagation: boolean;
    differ: any;
    calendar: any;
    config: any;
    _options: any;
    constructor(el: ElementRef, differs: IterableDiffers);
    ngOnInit(): void;
    ngAfterViewChecked(): void;
    ngOnChanges(changes: SimpleChanges): void;
    options: any;
    initialize(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    gotoDate(date: any): void;
    prev(): void;
    next(): void;
    prevYear(): void;
    nextYear(): void;
    today(): void;
    incrementDate(duration: any): void;
    changeView(viewName: string, dateOrRange: any): void;
    getDate(): any;
    updateEvent(event: any): void;
    _findEvent(id: string): any;
    _updateEvent(event: any): void;
}
export declare class ScheduleModule {}
