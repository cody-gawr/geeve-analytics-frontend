import {
    ElementRef,
    OnDestroy,
    EventEmitter,
    Renderer2,
    NgZone,
    ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const SLIDER_VALUE_ACCESSOR: any;
export declare class Slider implements OnDestroy, ControlValueAccessor {
    el: ElementRef;
    renderer: Renderer2;
    private ngZone;
    cd: ChangeDetectorRef;
    animate: boolean;
    disabled: boolean;
    min: number;
    max: number;
    orientation: string;
    step: number;
    range: boolean;
    style: any;
    styleClass: string;
    onChange: EventEmitter<any>;
    onSlideEnd: EventEmitter<any>;
    value: number;
    values: number[];
    handleValue: number;
    handleValues: number[];
    onModelChange: Function;
    onModelTouched: Function;
    dragging: boolean;
    dragListener: any;
    mouseupListener: any;
    initX: number;
    initY: number;
    barWidth: number;
    barHeight: number;
    sliderHandleClick: boolean;
    handleIndex: number;
    startHandleValue: any;
    startx: number;
    starty: number;
    constructor(el: ElementRef, renderer: Renderer2, ngZone: NgZone, cd: ChangeDetectorRef);
    onMouseDown(event: Event, index?: number): void;
    onTouchStart(event: any, index?: number): void;
    onTouchMove(event: any, index?: number): void;
    onTouchEnd(event: any, index?: number): void;
    onBarClick(event: any): void;
    handleChange(event: Event): void;
    bindDragListeners(): void;
    unbindDragListeners(): void;
    setValueFromHandle(event: Event, handleValue: any): void;
    handleStepChange(newValue: number, oldValue: number): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    readonly rangeStartLeft: string;
    readonly rangeStartBottom: string;
    readonly rangeEndLeft: string;
    readonly rangeEndBottom: string;
    isVertical(): boolean;
    updateDomData(): void;
    calculateHandleValue(event: any): number;
    updateHandleValue(): void;
    updateValue(val: number, event?: Event): void;
    getValueFromHandle(handleValue: number): number;
    getDecimalsCount(value: number): number;
    getNormalizedValue(val: number): number;
    ngOnDestroy(): void;
}
export declare class SliderModule {}
