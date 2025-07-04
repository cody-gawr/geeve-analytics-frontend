import {
    OnInit,
    OnDestroy,
    AfterViewInit,
    AfterViewChecked,
    AfterContentInit,
    EventEmitter,
    ElementRef,
    TemplateRef,
    QueryList,
    NgZone,
    ChangeDetectorRef,
} from '@angular/core';
import { Column, PrimeTemplate } from '../common/shared';
import { SortMeta } from '../common/sortmeta';
import { FilterMetadata } from '../common/filtermetadata';
import { BlockableUI } from '../common/blockableui';
import { Subscription } from 'rxjs';
export declare class TableService {
    private sortSource;
    private selectionSource;
    private contextMenuSource;
    private valueSource;
    private totalRecordsSource;
    private columnsSource;
    sortSource$: import('rxjs').Observable<SortMeta | SortMeta[]>;
    selectionSource$: import('rxjs').Observable<{}>;
    contextMenuSource$: import('rxjs').Observable<any>;
    valueSource$: import('rxjs').Observable<any>;
    totalRecordsSource$: import('rxjs').Observable<any>;
    columnsSource$: import('rxjs').Observable<{}>;
    onSort(sortMeta: SortMeta | SortMeta[]): void;
    onSelectionChange(): void;
    onContextMenu(data: any): void;
    onValueChange(value: any): void;
    onTotalRecordsChange(value: number): void;
    onColumnsChange(columns: any[]): void;
}
export declare class Table implements OnInit, AfterViewInit, AfterContentInit, BlockableUI {
    el: ElementRef;
    zone: NgZone;
    tableService: TableService;
    cd: ChangeDetectorRef;
    frozenColumns: any[];
    frozenValue: any[];
    style: any;
    styleClass: string;
    tableStyle: any;
    tableStyleClass: string;
    paginator: boolean;
    pageLinks: number;
    rowsPerPageOptions: any[];
    alwaysShowPaginator: boolean;
    paginatorPosition: string;
    paginatorDropdownAppendTo: any;
    paginatorDropdownScrollHeight: string;
    currentPageReportTemplate: string;
    showCurrentPageReport: boolean;
    defaultSortOrder: number;
    sortMode: string;
    resetPageOnSort: boolean;
    selectionMode: string;
    selectionChange: EventEmitter<any>;
    contextMenuSelection: any;
    contextMenuSelectionChange: EventEmitter<any>;
    contextMenuSelectionMode: string;
    dataKey: string;
    metaKeySelection: boolean;
    rowTrackBy: Function;
    lazy: boolean;
    lazyLoadOnInit: boolean;
    compareSelectionBy: string;
    csvSeparator: string;
    exportFilename: string;
    filters: {
        [s: string]: FilterMetadata;
    };
    globalFilterFields: string[];
    filterDelay: number;
    expandedRowKeys: {
        [s: string]: boolean;
    };
    editingRowKeys: {
        [s: string]: boolean;
    };
    rowExpandMode: string;
    scrollable: boolean;
    scrollHeight: string;
    virtualScroll: boolean;
    virtualScrollDelay: number;
    virtualRowHeight: number;
    frozenWidth: string;
    responsive: boolean;
    contextMenu: any;
    resizableColumns: boolean;
    columnResizeMode: string;
    reorderableColumns: boolean;
    loading: boolean;
    loadingIcon: string;
    showLoader: boolean;
    rowHover: boolean;
    customSort: boolean;
    autoLayout: boolean;
    exportFunction: any;
    stateKey: string;
    stateStorage: string;
    editMode: string;
    onRowSelect: EventEmitter<any>;
    onRowUnselect: EventEmitter<any>;
    onPage: EventEmitter<any>;
    onSort: EventEmitter<any>;
    onFilter: EventEmitter<any>;
    onLazyLoad: EventEmitter<any>;
    onRowExpand: EventEmitter<any>;
    onRowCollapse: EventEmitter<any>;
    onContextMenuSelect: EventEmitter<any>;
    onColResize: EventEmitter<any>;
    onColReorder: EventEmitter<any>;
    onRowReorder: EventEmitter<any>;
    onEditInit: EventEmitter<any>;
    onEditComplete: EventEmitter<any>;
    onEditCancel: EventEmitter<any>;
    onHeaderCheckboxToggle: EventEmitter<any>;
    sortFunction: EventEmitter<any>;
    firstChange: EventEmitter<number>;
    rowsChange: EventEmitter<number>;
    onStateSave: EventEmitter<any>;
    onStateRestore: EventEmitter<any>;
    containerViewChild: ElementRef;
    resizeHelperViewChild: ElementRef;
    reorderIndicatorUpViewChild: ElementRef;
    reorderIndicatorDownViewChild: ElementRef;
    tableViewChild: ElementRef;
    templates: QueryList<PrimeTemplate>;
    _value: any[];
    _columns: any[];
    _totalRecords: number;
    _first: number;
    _rows: number;
    filteredValue: any[];
    headerTemplate: TemplateRef<any>;
    bodyTemplate: TemplateRef<any>;
    loadingBodyTemplate: TemplateRef<any>;
    captionTemplate: TemplateRef<any>;
    frozenRowsTemplate: TemplateRef<any>;
    footerTemplate: TemplateRef<any>;
    summaryTemplate: TemplateRef<any>;
    colGroupTemplate: TemplateRef<any>;
    expandedRowTemplate: TemplateRef<any>;
    frozenHeaderTemplate: TemplateRef<any>;
    frozenBodyTemplate: TemplateRef<any>;
    frozenFooterTemplate: TemplateRef<any>;
    frozenColGroupTemplate: TemplateRef<any>;
    emptyMessageTemplate: TemplateRef<any>;
    paginatorLeftTemplate: TemplateRef<any>;
    paginatorRightTemplate: TemplateRef<any>;
    selectionKeys: any;
    lastResizerHelperX: number;
    reorderIconWidth: number;
    reorderIconHeight: number;
    draggedColumn: any;
    draggedRowIndex: number;
    droppedRowIndex: number;
    rowDragging: boolean;
    dropPosition: number;
    editingCell: Element;
    editingCellData: any;
    editingCellField: any;
    editingCellClick: boolean;
    documentEditListener: any;
    _multiSortMeta: SortMeta[];
    _sortField: string;
    _sortOrder: number;
    virtualScrollTimer: any;
    virtualScrollCallback: Function;
    preventSelectionSetterPropagation: boolean;
    _selection: any;
    anchorRowIndex: number;
    rangeRowIndex: number;
    filterTimeout: any;
    initialized: boolean;
    rowTouched: boolean;
    restoringSort: boolean;
    restoringFilter: boolean;
    stateRestored: boolean;
    columnOrderStateRestored: boolean;
    columnWidthsState: string;
    tableWidthState: string;
    constructor(el: ElementRef, zone: NgZone, tableService: TableService, cd: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    value: any[];
    columns: any[];
    first: number;
    rows: number;
    totalRecords: number;
    sortField: string;
    sortOrder: number;
    multiSortMeta: SortMeta[];
    selection: any;
    updateSelectionKeys(): void;
    onPageChange(event: any): void;
    sort(event: any): void;
    sortSingle(): void;
    sortMultiple(): void;
    multisortField(data1: any, data2: any, multiSortMeta: any, index: any): any;
    getSortMeta(field: string): SortMeta;
    isSorted(field: string): boolean;
    handleRowClick(event: any): void;
    handleRowTouchEnd(event: any): void;
    handleRowRightClick(event: any): void;
    selectRange(event: MouseEvent, rowIndex: number): void;
    clearSelectionRange(event: MouseEvent): void;
    isSelected(rowData: any): boolean;
    findIndexInSelection(rowData: any): number;
    toggleRowWithRadio(event: any, rowData: any): void;
    toggleRowWithCheckbox(event: any, rowData: any): void;
    toggleRowsWithCheckbox(event: Event, check: boolean): void;
    equals(data1: any, data2: any): boolean;
    filter(value: any, field: any, matchMode: any): void;
    filterGlobal(value: any, matchMode: any): void;
    isFilterBlank(filter: any): boolean;
    _filter(): void;
    hasFilter(): boolean;
    filterConstraints: {
        startsWith(value: any, filter: any): boolean;
        contains(value: any, filter: any): boolean;
        endsWith(value: any, filter: any): boolean;
        equals(value: any, filter: any): boolean;
        notEquals(value: any, filter: any): boolean;
        in(value: any, filter: any[]): boolean;
        lt(value: any, filter: any): boolean;
        lte(value: any, filter: any): boolean;
        gt(value: any, filter: any): boolean;
        gte(value: any, filter: any): boolean;
    };
    createLazyLoadMetadata(): any;
    reset(): void;
    exportCSV(options?: any): void;
    updateEditingCell(cell: any, data: any, field: any): void;
    isEditingCellValid(): boolean;
    bindDocumentEditListener(): void;
    unbindDocumentEditListener(): void;
    initRowEdit(rowData: any): void;
    saveRowEdit(rowData: any, rowElement: HTMLTableRowElement): void;
    cancelRowEdit(rowData: any): void;
    toggleRow(rowData: any, event?: Event): void;
    isRowExpanded(rowData: any): boolean;
    isRowEditing(rowData: any): boolean;
    isSingleSelectionMode(): boolean;
    isMultipleSelectionMode(): boolean;
    onColumnResizeBegin(event: any): void;
    onColumnResize(event: any): void;
    onColumnResizeEnd(event: any, column: any): void;
    setScrollableItemsWidthOnExpandResize(column: any, newColumnWidth: any, delta: any): void;
    findParentScrollableView(column: any): any;
    resizeColGroup(
        table: any,
        resizeColumnIndex: any,
        newColumnWidth: any,
        nextColumnWidth: any,
    ): void;
    onColumnDragStart(event: any, columnElement: any): void;
    onColumnDragEnter(event: any, dropHeader: any): void;
    onColumnDragLeave(event: any): void;
    onColumnDrop(event: any, dropColumn: any): void;
    onRowDragStart(event: any, index: any): void;
    onRowDragOver(event: any, index: any, rowElement: any): void;
    onRowDragLeave(event: any, rowElement: any): void;
    onRowDragEnd(event: any): void;
    onRowDrop(event: any, rowElement: any): void;
    handleVirtualScroll(event: any): void;
    isEmpty(): boolean;
    getBlockableElement(): HTMLElement;
    getStorage(): Storage;
    isStateful(): boolean;
    saveState(): void;
    clearState(): void;
    restoreState(): void;
    saveColumnWidths(state: any): void;
    restoreColumnWidths(): void;
    saveColumnOrder(state: any): void;
    restoreColumnOrder(): void;
    findColumnByKey(key: any): any;
    ngOnDestroy(): void;
}
export declare class TableBody {
    dt: Table;
    columns: Column[];
    template: TemplateRef<any>;
    frozen: boolean;
    constructor(dt: Table);
}
export declare class ScrollableView implements AfterViewInit, OnDestroy, AfterViewChecked {
    dt: Table;
    el: ElementRef;
    zone: NgZone;
    columns: Column[];
    frozen: boolean;
    scrollHeaderViewChild: ElementRef;
    scrollHeaderBoxViewChild: ElementRef;
    scrollBodyViewChild: ElementRef;
    scrollTableViewChild: ElementRef;
    scrollLoadingTableViewChild: ElementRef;
    scrollFooterViewChild: ElementRef;
    scrollFooterBoxViewChild: ElementRef;
    virtualScrollerViewChild: ElementRef;
    headerScrollListener: Function;
    bodyScrollListener: Function;
    footerScrollListener: Function;
    frozenSiblingBody: Element;
    scrollableSiblingBody: Element;
    _scrollHeight: string;
    subscription: Subscription;
    totalRecordsSubscription: Subscription;
    columnsSubscription: Subscription;
    initialized: boolean;
    preventBodyScrollPropagation: boolean;
    loadingArray: number[];
    constructor(dt: Table, el: ElementRef, zone: NgZone);
    scrollHeight: string;
    ngAfterViewChecked(): void;
    ngAfterViewInit(): void;
    bindEvents(): void;
    unbindEvents(): void;
    onHeaderScroll(event: any): void;
    onFooterScroll(event: any): void;
    onBodyScroll(event: any): void;
    setScrollHeight(): void;
    setVirtualScrollerHeight(): void;
    hasVerticalOverflow(): boolean;
    alignScrollBar(): void;
    ngOnDestroy(): void;
}
export declare class SortableColumn implements OnInit, OnDestroy {
    dt: Table;
    field: string;
    pSortableColumnDisabled: boolean;
    sorted: boolean;
    subscription: Subscription;
    constructor(dt: Table);
    ngOnInit(): void;
    updateSortState(): void;
    onClick(event: MouseEvent): void;
    onEnterKey(event: MouseEvent): void;
    isEnabled(): boolean;
    ngOnDestroy(): void;
}
export declare class SortIcon implements OnInit, OnDestroy {
    dt: Table;
    field: string;
    subscription: Subscription;
    sortOrder: number;
    constructor(dt: Table);
    ngOnInit(): void;
    onClick(event: any): void;
    updateSortState(): void;
    ngOnDestroy(): void;
}
export declare class SelectableRow implements OnInit, OnDestroy {
    dt: Table;
    tableService: TableService;
    data: any;
    index: number;
    pSelectableRowDisabled: boolean;
    selected: boolean;
    subscription: Subscription;
    constructor(dt: Table, tableService: TableService);
    ngOnInit(): void;
    onClick(event: Event): void;
    onTouchEnd(event: Event): void;
    onKeyDown(event: KeyboardEvent): void;
    findNextSelectableRow(row: HTMLTableRowElement): HTMLTableRowElement;
    findPrevSelectableRow(row: HTMLTableRowElement): HTMLTableRowElement;
    isEnabled(): boolean;
    ngOnDestroy(): void;
}
export declare class SelectableRowDblClick implements OnInit, OnDestroy {
    dt: Table;
    tableService: TableService;
    data: any;
    index: number;
    pSelectableRowDisabled: boolean;
    selected: boolean;
    subscription: Subscription;
    constructor(dt: Table, tableService: TableService);
    ngOnInit(): void;
    onClick(event: Event): void;
    isEnabled(): boolean;
    ngOnDestroy(): void;
}
export declare class ContextMenuRow {
    dt: Table;
    tableService: TableService;
    data: any;
    index: number;
    pContextMenuRowDisabled: boolean;
    selected: boolean;
    subscription: Subscription;
    constructor(dt: Table, tableService: TableService);
    onContextMenu(event: Event): void;
    isEnabled(): boolean;
    ngOnDestroy(): void;
}
export declare class RowToggler {
    dt: Table;
    data: any;
    pRowTogglerDisabled: boolean;
    constructor(dt: Table);
    onClick(event: Event): void;
    isEnabled(): boolean;
}
export declare class ResizableColumn implements AfterViewInit, OnDestroy {
    dt: Table;
    el: ElementRef;
    zone: NgZone;
    pResizableColumnDisabled: boolean;
    resizer: HTMLSpanElement;
    resizerMouseDownListener: any;
    documentMouseMoveListener: any;
    documentMouseUpListener: any;
    constructor(dt: Table, el: ElementRef, zone: NgZone);
    ngAfterViewInit(): void;
    bindDocumentEvents(): void;
    unbindDocumentEvents(): void;
    onMouseDown(event: Event): void;
    onDocumentMouseMove(event: Event): void;
    onDocumentMouseUp(event: Event): void;
    isEnabled(): boolean;
    ngOnDestroy(): void;
}
export declare class ReorderableColumn implements AfterViewInit, OnDestroy {
    dt: Table;
    el: ElementRef;
    zone: NgZone;
    pReorderableColumnDisabled: boolean;
    dragStartListener: any;
    dragOverListener: any;
    dragEnterListener: any;
    dragLeaveListener: any;
    mouseDownListener: any;
    constructor(dt: Table, el: ElementRef, zone: NgZone);
    ngAfterViewInit(): void;
    bindEvents(): void;
    unbindEvents(): void;
    onMouseDown(event: any): void;
    onDragStart(event: any): void;
    onDragOver(event: any): void;
    onDragEnter(event: any): void;
    onDragLeave(event: any): void;
    onDrop(event: any): void;
    isEnabled(): boolean;
    ngOnDestroy(): void;
}
export declare class EditableColumn implements AfterViewInit {
    dt: Table;
    el: ElementRef;
    zone: NgZone;
    data: any;
    field: any;
    pEditableColumnDisabled: boolean;
    pFocusCellSelector: string;
    constructor(dt: Table, el: ElementRef, zone: NgZone);
    ngAfterViewInit(): void;
    onClick(event: MouseEvent): void;
    openCell(): void;
    closeEditingCell(): void;
    onKeyDown(event: KeyboardEvent): void;
    findCell(element: any): any;
    moveToPreviousCell(event: KeyboardEvent): void;
    moveToNextCell(event: KeyboardEvent): void;
    findPreviousEditableColumn(cell: Element): any;
    findNextEditableColumn(cell: Element): any;
    isEnabled(): boolean;
}
export declare class EditableRow {
    el: ElementRef;
    data: any;
    pEditableRowDisabled: boolean;
    constructor(el: ElementRef);
    isEnabled(): boolean;
}
export declare class InitEditableRow {
    dt: Table;
    editableRow: EditableRow;
    constructor(dt: Table, editableRow: EditableRow);
    onClick(event: Event): void;
}
export declare class SaveEditableRow {
    dt: Table;
    editableRow: EditableRow;
    constructor(dt: Table, editableRow: EditableRow);
    onClick(event: Event): void;
}
export declare class CancelEditableRow {
    dt: Table;
    editableRow: EditableRow;
    constructor(dt: Table, editableRow: EditableRow);
    onClick(event: Event): void;
}
export declare class CellEditor implements AfterContentInit {
    dt: Table;
    editableColumn: EditableColumn;
    editableRow: EditableRow;
    templates: QueryList<PrimeTemplate>;
    inputTemplate: TemplateRef<any>;
    outputTemplate: TemplateRef<any>;
    constructor(dt: Table, editableColumn: EditableColumn, editableRow: EditableRow);
    ngAfterContentInit(): void;
    readonly editing: boolean;
}
export declare class TableRadioButton {
    dt: Table;
    tableService: TableService;
    disabled: boolean;
    value: any;
    index: number;
    boxViewChild: ElementRef;
    checked: boolean;
    subscription: Subscription;
    constructor(dt: Table, tableService: TableService);
    ngOnInit(): void;
    onClick(event: Event): void;
    onFocus(): void;
    onBlur(): void;
    ngOnDestroy(): void;
}
export declare class TableCheckbox {
    dt: Table;
    tableService: TableService;
    disabled: boolean;
    value: any;
    index: number;
    boxViewChild: ElementRef;
    checked: boolean;
    subscription: Subscription;
    constructor(dt: Table, tableService: TableService);
    ngOnInit(): void;
    onClick(event: Event): void;
    onFocus(): void;
    onBlur(): void;
    ngOnDestroy(): void;
}
export declare class TableHeaderCheckbox {
    dt: Table;
    tableService: TableService;
    boxViewChild: ElementRef;
    disabled: boolean;
    checked: boolean;
    selectionChangeSubscription: Subscription;
    valueChangeSubscription: Subscription;
    constructor(dt: Table, tableService: TableService);
    ngOnInit(): void;
    onClick(event: Event): void;
    onFocus(): void;
    onBlur(): void;
    isDisabled(): boolean;
    ngOnDestroy(): void;
    updateCheckedState(): boolean;
    isAllFilteredValuesChecked(): boolean;
}
export declare class ReorderableRowHandle implements AfterViewInit {
    el: ElementRef;
    index: number;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
}
export declare class ReorderableRow implements AfterViewInit {
    dt: Table;
    el: ElementRef;
    zone: NgZone;
    index: number;
    pReorderableRowDisabled: boolean;
    mouseDownListener: any;
    dragStartListener: any;
    dragEndListener: any;
    dragOverListener: any;
    dragLeaveListener: any;
    dropListener: any;
    constructor(dt: Table, el: ElementRef, zone: NgZone);
    ngAfterViewInit(): void;
    bindEvents(): void;
    unbindEvents(): void;
    onMouseDown(event: any): void;
    onDragStart(event: any): void;
    onDragEnd(event: any): void;
    onDragOver(event: any): void;
    onDragLeave(event: any): void;
    isEnabled(): boolean;
    onDrop(event: any): void;
}
export declare class TableModule {}
