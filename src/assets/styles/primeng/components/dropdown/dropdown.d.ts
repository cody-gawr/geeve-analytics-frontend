import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
    ElementRef,
    OnInit,
    AfterViewInit,
    AfterContentInit,
    AfterViewChecked,
    OnDestroy,
    Renderer2,
    EventEmitter,
    QueryList,
    TemplateRef,
    ChangeDetectorRef,
    NgZone,
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { SelectItem } from '../common/selectitem';
import { ControlValueAccessor } from '@angular/forms';
export declare const DROPDOWN_VALUE_ACCESSOR: any;
export declare class DropdownItem {
    option: SelectItem;
    selected: boolean;
    disabled: boolean;
    visible: boolean;
    itemSize: number;
    template: TemplateRef<any>;
    onClick: EventEmitter<any>;
    onOptionClick(event: Event): void;
}
export declare class Dropdown
    implements
        OnInit,
        AfterViewInit,
        AfterContentInit,
        AfterViewChecked,
        OnDestroy,
        ControlValueAccessor
{
    el: ElementRef;
    renderer: Renderer2;
    private cd;
    zone: NgZone;
    scrollHeight: string;
    filter: boolean;
    name: string;
    style: any;
    panelStyle: any;
    styleClass: string;
    panelStyleClass: string;
    readonly: boolean;
    required: boolean;
    editable: boolean;
    appendTo: any;
    tabindex: number;
    placeholder: string;
    filterPlaceholder: string;
    inputId: string;
    selectId: string;
    dataKey: string;
    filterBy: string;
    autofocus: boolean;
    resetFilterOnHide: boolean;
    dropdownIcon: string;
    optionLabel: string;
    autoDisplayFirst: boolean;
    group: boolean;
    showClear: boolean;
    emptyFilterMessage: string;
    virtualScroll: boolean;
    itemSize: number;
    autoZIndex: boolean;
    baseZIndex: number;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    ariaFilterLabel: string;
    onChange: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    onClick: EventEmitter<any>;
    onShow: EventEmitter<any>;
    onHide: EventEmitter<any>;
    containerViewChild: ElementRef;
    filterViewChild: ElementRef;
    focusViewChild: ElementRef;
    viewPort: CdkVirtualScrollViewport;
    editableInputViewChild: ElementRef;
    templates: QueryList<any>;
    private _autoWidth;
    private virtualAutoScrolled;
    private virtualScrollSelectedIndex;
    autoWidth: boolean;
    private _disabled;
    disabled: boolean;
    overlay: HTMLDivElement;
    itemsWrapper: HTMLDivElement;
    itemTemplate: TemplateRef<any>;
    groupTemplate: TemplateRef<any>;
    selectedItemTemplate: TemplateRef<any>;
    selectedOption: any;
    _options: any[];
    value: any;
    onModelChange: Function;
    onModelTouched: Function;
    optionsToDisplay: any[];
    hover: boolean;
    focused: boolean;
    filled: boolean;
    overlayVisible: boolean;
    documentClickListener: any;
    optionsChanged: boolean;
    panel: HTMLDivElement;
    dimensionsUpdated: boolean;
    selfClick: boolean;
    itemClick: boolean;
    clearClick: boolean;
    hoveredItem: any;
    selectedOptionUpdated: boolean;
    filterValue: string;
    searchValue: string;
    searchIndex: number;
    searchTimeout: any;
    previousSearchChar: string;
    currentSearchChar: string;
    documentResizeListener: any;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef, zone: NgZone);
    ngAfterContentInit(): void;
    ngOnInit(): void;
    options: any[];
    ngAfterViewInit(): void;
    readonly label: string;
    updateEditableLabel(): void;
    onItemClick(event: any, index: any): void;
    selectItem(event: any, option: any): void;
    ngAfterViewChecked(): void;
    writeValue(value: any): void;
    resetFilter(): void;
    updateSelectedOption(val: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    onMouseclick(event: any): void;
    onEditableInputClick(event: any): void;
    onEditableInputFocus(event: any): void;
    onEditableInputChange(event: any): void;
    show(): void;
    onOverlayAnimationStart(event: AnimationEvent): void;
    scrollToSelectedVirtualScrollElement(event: any): void;
    appendOverlay(): void;
    restoreOverlayAppend(): void;
    hide(): void;
    alignOverlay(): void;
    onInputFocus(event: any): void;
    onInputBlur(event: any): void;
    findPrevEnabledOption(index: any): any;
    findNextEnabledOption(index: any): any;
    onKeydown(event: KeyboardEvent, search: boolean): void;
    search(event: any): void;
    searchOption(index: any): any;
    searchOptionInRange(start: any, end: any): any;
    searchOptionWithinGroup(index: any): any;
    findOptionIndex(val: any, opts: any[]): number;
    findOptionGroupIndex(val: any, opts: any[]): any;
    findOption(val: any, opts: any[], inGroup?: boolean): SelectItem;
    onFilter(event: any): void;
    activateFilter(): void;
    applyFocus(): void;
    focus(): void;
    bindDocumentClickListener(): void;
    clearClickState(): void;
    unbindDocumentClickListener(): void;
    bindDocumentResizeListener(): void;
    unbindDocumentResizeListener(): void;
    onWindowResize(): void;
    updateFilledState(): void;
    clear(event: Event): void;
    onOverlayHide(): void;
    ngOnDestroy(): void;
}
export declare class DropdownModule {}
