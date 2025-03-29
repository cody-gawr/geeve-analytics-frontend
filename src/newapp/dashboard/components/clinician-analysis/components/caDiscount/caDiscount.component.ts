import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Component({
    selector: 'ca-total-discount',
    template: `
        
    `
})
export class CaTotalDiscountComponent implements OnInit, OnDestroy {
    @Input() toolTip = '';

    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();    
    constructor() { }

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }
}