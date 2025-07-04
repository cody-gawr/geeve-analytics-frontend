import {
    AfterContentInit,
    OnInit,
    OnDestroy,
    EventEmitter,
    TemplateRef,
    QueryList,
    ElementRef,
    NgZone,
    AfterViewInit,
    AfterViewChecked,
} from '@angular/core';
import { TreeNode } from '../common/treenode';
import { Subscription } from 'rxjs';
import { PrimeTemplate } from '../common/shared';
import { SortMeta } from '../common/sortmeta';
import { BlockableUI } from '../common/blockableui';
import { FilterMetadata } from '../common/filtermetadata';
export declare class TreeTableService {
    private sortSource;
    private selectionSource;
    private contextMenuSource;
    private uiUpdateSource;
    private totalRecordsSource;
    sortSource$: import('rxjs').Observable<SortMeta | SortMeta[]>;
    selectionSource$: import('rxjs').Observable<{}>;
    contextMenuSource$: import('rxjs').Observable<any>;
    uiUpdateSource$: import('rxjs').Observable<any>;
    totalRecordsSource$: import('rxjs').Observable<any>;
    onSort(sortMeta: SortMeta | SortMeta[]): void;
    onSelectionChange(): void;
    onContextMenu(node: any): void;
    onUIUpdate(value: any): void;
    onTotalRecordsChange(value: number): void;
}
export declare class TreeTable implements AfterContentInit, OnInit, OnDestroy, BlockableUI {
    el: ElementRef;
    zone: NgZone;
    tableService: TreeTableService;
    columns: any[];
    style: any;
    styleClass: string;
    autoLayout: boolean;
    lazy: boolean;
    paginator: boolean;
    rows: number;
    first: number;
    pageLinks: number;
    rowsPerPageOptions: any[];
    alwaysShowPaginator: boolean;
    paginatorPosition: string;
    paginatorDropdownAppendTo: any;
    defaultSortOrder: number;
    sortMode: string;
    resetPageOnSort: boolean;
    customSort: boolean;
    selectionMode: string;
    selectionChange: EventEmitter<any>;
    contextMenuSelection: any;
    contextMenuSelectionChange: EventEmitter<any>;
    contextMenuSelectionMode: string;
    dataKey: string;
    metaKeySelection: boolean;
    compareSelectionBy: string;
    rowHover: boolean;
    loading: boolean;
    loadingIcon: string;
    showLoader: boolean;
    scrollable: boolean;
    scrollHeight: string;
    virtualScroll: boolean;
    virtualScrollDelay: number;
    virtualRowHeight: number;
    frozenWidth: string;
    frozenColumns: any[];
    resizableColumns: boolean;
    columnResizeMode: string;
    reorderableColumns: boolean;
    contextMenu: any;
    rowTrackBy: Function;
    filters: {
        [s: string]: FilterMetadata;
    };
    globalFilterFields: string[];
    filterDelay: number;
    filterMode: string;
    onFilter: EventEmitter<any>;
    onNodeExpand: EventEmitter<any>;
    onNodeCollapse: EventEmitter<any>;
    onPage: EventEmitter<any>;
    onSort: EventEmitter<any>;
    onLazyLoad: EventEmitter<any>;
    sortFunction: EventEmitter<any>;
    onColResize: EventEmitter<any>;
    onColReorder: EventEmitter<any>;
    onNodeSelect: EventEmitter<any>;
    onNodeUnselect: EventEmitter<any>;
    onContextMenuSelect: EventEmitter<any>;
    onHeaderCheckboxToggle: EventEmitter<any>;
    onEditInit: EventEmitter<any>;
    onEditComplete: EventEmitter<any>;
    onEditCancel: EventEmitter<any>;
    containerViewChild: ElementRef;
    resizeHelperViewChild: ElementRef;
    reorderIndicatorUpViewChild: ElementRef;
    reorderIndicatorDownViewChild: ElementRef;
    tableViewChild: ElementRef;
    templates: QueryList<PrimeTemplate>;
    _value: TreeNode[];
    serializedValue: any[];
    _totalRecords: number;
    _multiSortMeta: SortMeta[];
    _sortField: string;
    _sortOrder: number;
    virtualScrollTimer: any;
    virtualScrollCallback: Function;
    filteredNodes: any[];
    filterTimeout: any;
    colGroupTemplate: TemplateRef<any>;
    captionTemplate: TemplateRef<any>;
    headerTemplate: TemplateRef<any>;
    bodyTemplate: TemplateRef<any>;
    loadingBodyTemplate: TemplateRef<any>;
    footerTemplate: TemplateRef<any>;
    summaryTemplate: TemplateRef<any>;
    emptyMessageTemplate: TemplateRef<any>;
    paginatorLeftTemplate: TemplateRef<any>;
    paginatorRightTemplate: TemplateRef<any>;
    frozenHeaderTemplate: TemplateRef<any>;
    frozenBodyTemplate: TemplateRef<any>;
    frozenFooterTemplate: TemplateRef<any>;
    frozenColGroupTemplate: TemplateRef<any>;
    lastResizerHelperX: number;
    reorderIconWidth: number;
    reorderIconHeight: number;
    draggedColumn: any;
    dropPosition: number;
    preventSelectionSetterPropagation: boolean;
    _selection: any;
    selectionKeys: any;
    rowTouched: boolean;
    editingCell: Element;
    editingCellClick: boolean;
    documentEditListener: any;
    initialized: boolean;
    toggleRowIndex: number;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    constructor(el: ElementRef, zone: NgZone, tableService: TreeTableService);
    value: any[];
    updateSerializedValue(): void;
    serializeNodes(parent: any, nodes: any, level: any, visible: any): void;
    serializePageNodes(): void;
    totalRecords: number;
    sortField: string;
    sortOrder: number;
    multiSortMeta: SortMeta[];
    selection: any;
    updateSelectionKeys(): void;
    onPageChange(event: any): void;
    sort(event: any): void;
    sortSingle(): void;
    sortNodes(nodes: any): void;
    sortMultiple(): void;
    sortMultipleNodes(nodes: any): void;
    multisortField(node1: any, node2: any, multiSortMeta: any, index: any): any;
    getSortMeta(field: string): SortMeta;
    isSorted(field: string): boolean;
    createLazyLoadMetadata(): any;
    handleVirtualScroll(event: any): void;
    isEmpty(): boolean;
    getBlockableElement(): HTMLElement;
    onColumnResizeBegin(event: any): void;
    onColumnResize(event: any): void;
    onColumnResizeEnd(event: any, column: any): void;
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
    handleRowClick(event: any): void;
    handleRowTouchEnd(event: any): void;
    handleRowRightClick(event: any): void;
    toggleNodeWithCheckbox(event: any): void;
    toggleNodesWithCheckbox(event: Event, check: boolean): void;
    propagateSelectionUp(node: TreeNode, select: boolean): void;
    propagateSelectionDown(node: TreeNode, select: boolean): void;
    isSelected(node: any): boolean;
    findIndexInSelection(node: any): number;
    isSingleSelectionMode(): boolean;
    isMultipleSelectionMode(): boolean;
    equals(node1: any, node2: any): boolean;
    filter(value: any, field: any, matchMode: any): void;
    filterGlobal(value: any, matchMode: any): void;
    isFilterBlank(filter: any): boolean;
    _filter(): void;
    findFilteredNodes(node: any, paramsWithoutNode: any): boolean;
    isFilterMatched(
        node: any,
        {
            filterField,
            filterValue,
            filterConstraint,
            isStrictMode,
        }: {
            filterField: any;
            filterValue: any;
            filterConstraint: any;
            isStrictMode: any;
        },
    ): boolean;
    isNodeLeaf(node: any): boolean;
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
    reset(): void;
    updateEditingCell(cell: any): void;
    isEditingCellValid(): boolean;
    bindDocumentEditListener(): void;
    unbindDocumentEditListener(): void;
    ngOnDestroy(): void;
}
export declare class TTBody {
    tt: TreeTable;
    columns: any[];
    template: TemplateRef<any>;
    constructor(tt: TreeTable);
}
export declare class TTScrollableView implements AfterViewInit, OnDestroy, AfterViewChecked {
    tt: TreeTable;
    el: ElementRef;
    zone: NgZone;
    columns: any[];
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
    _scrollHeight: string;
    subscription: Subscription;
    totalRecordsSubscription: Subscription;
    initialized: boolean;
    loadingArray: number[];
    constructor(tt: TreeTable, el: ElementRef, zone: NgZone);
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
export declare class TTSortableColumn implements OnInit, OnDestroy {
    tt: TreeTable;
    field: string;
    ttSortableColumnDisabled: boolean;
    sorted: boolean;
    subscription: Subscription;
    constructor(tt: TreeTable);
    ngOnInit(): void;
    updateSortState(): void;
    onClick(event: MouseEvent): void;
    onEnterKey(event: MouseEvent): void;
    isEnabled(): boolean;
    ngOnDestroy(): void;
}
export declare class TTSortIcon implements OnInit, OnDestroy {
    tt: TreeTable;
    field: string;
    ariaLabelDesc: string;
    ariaLabelAsc: string;
    subscription: Subscription;
    sortOrder: number;
    constructor(tt: TreeTable);
    ngOnInit(): void;
    onClick(event: any): void;
    updateSortState(): void;
    ngOnDestroy(): void;
}
export declare class TTResizableColumn implements AfterViewInit, OnDestroy {
    tt: TreeTable;
    el: ElementRef;
    zone: NgZone;
    ttResizableColumnDisabled: boolean;
    resizer: HTMLSpanElement;
    resizerMouseDownListener: any;
    documentMouseMoveListener: any;
    documentMouseUpListener: any;
    constructor(tt: TreeTable, el: ElementRef, zone: NgZone);
    ngAfterViewInit(): void;
    bindDocumentEvents(): void;
    unbindDocumentEvents(): void;
    onMouseDown(event: Event): void;
    onDocumentMouseMove(event: Event): void;
    onDocumentMouseUp(event: Event): void;
    isEnabled(): boolean;
    ngOnDestroy(): void;
}
export declare class TTReorderableColumn implements AfterViewInit, OnDestroy {
    tt: TreeTable;
    el: ElementRef;
    zone: NgZone;
    ttReorderableColumnDisabled: boolean;
    dragStartListener: any;
    dragOverListener: any;
    dragEnterListener: any;
    dragLeaveListener: any;
    mouseDownListener: any;
    constructor(tt: TreeTable, el: ElementRef, zone: NgZone);
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
export declare class TTSelectableRow implements OnInit, OnDestroy {
    tt: TreeTable;
    tableService: TreeTableService;
    rowNode: any;
    ttSelectableRowDisabled: boolean;
    selected: boolean;
    subscription: Subscription;
    constructor(tt: TreeTable, tableService: TreeTableService);
    ngOnInit(): void;
    onClick(event: Event): void;
    onEnterKey(event: Event): void;
    onTouchEnd(event: Event): void;
    isEnabled(): boolean;
    ngOnDestroy(): void;
}
export declare class TTSelectableRowDblClick implements OnInit, OnDestroy {
    tt: TreeTable;
    tableService: TreeTableService;
    rowNode: any;
    ttSelectableRowDisabled: boolean;
    selected: boolean;
    subscription: Subscription;
    constructor(tt: TreeTable, tableService: TreeTableService);
    ngOnInit(): void;
    onClick(event: Event): void;
    isEnabled(): boolean;
    ngOnDestroy(): void;
}
export declare class TTContextMenuRow {
    tt: TreeTable;
    tableService: TreeTableService;
    rowNode: any;
    ttContextMenuRowDisabled: boolean;
    selected: boolean;
    subscription: Subscription;
    constructor(tt: TreeTable, tableService: TreeTableService);
    onContextMenu(event: Event): void;
    isEnabled(): boolean;
    ngOnDestroy(): void;
}
export declare class TTCheckbox {
    tt: TreeTable;
    tableService: TreeTableService;
    disabled: boolean;
    rowNode: any;
    boxViewChild: ElementRef;
    checked: boolean;
    subscription: Subscription;
    constructor(tt: TreeTable, tableService: TreeTableService);
    ngOnInit(): void;
    onClick(event: Event): void;
    onFocus(): void;
    onBlur(): void;
    ngOnDestroy(): void;
}
export declare class TTHeaderCheckbox {
    tt: TreeTable;
    tableService: TreeTableService;
    boxViewChild: ElementRef;
    checked: boolean;
    disabled: boolean;
    selectionChangeSubscription: Subscription;
    valueChangeSubscription: Subscription;
    constructor(tt: TreeTable, tableService: TreeTableService);
    ngOnInit(): void;
    onClick(event: Event, checked: any): void;
    onFocus(): void;
    onBlur(): void;
    ngOnDestroy(): void;
    updateCheckedState(): boolean;
}
export declare class TTEditableColumn implements AfterViewInit {
    tt: TreeTable;
    el: ElementRef;
    zone: NgZone;
    data: any;
    field: any;
    ttEditableColumnDisabled: boolean;
    constructor(tt: TreeTable, el: ElementRef, zone: NgZone);
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
export declare class TreeTableCellEditor implements AfterContentInit {
    tt: TreeTable;
    editableColumn: TTEditableColumn;
    templates: QueryList<PrimeTemplate>;
    inputTemplate: TemplateRef<any>;
    outputTemplate: TemplateRef<any>;
    constructor(tt: TreeTable, editableColumn: TTEditableColumn);
    ngAfterContentInit(): void;
}
export declare class TTRow {
    tt: TreeTable;
    el: ElementRef;
    zone: NgZone;
    rowNode: any;
    constructor(tt: TreeTable, el: ElementRef, zone: NgZone);
    onKeyDown(event: KeyboardEvent): void;
    restoreFocus(): void;
}
export declare class TreeTableToggler {
    tt: TreeTable;
    rowNode: any;
    constructor(tt: TreeTable);
    onClick(event: Event): void;
}
export declare class TreeTableModule {}
