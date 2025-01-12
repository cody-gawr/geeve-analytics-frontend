import { Component, Input } from "@angular/core";
import { debounceTime, startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

export interface OptionDataType {label?: string, value: any};

@Component({
    selector: 'search-multi-select',
    templateUrl: 'search-multi-select.component.html',
    styleUrls: ['search-multi-select.component.scss']
})
export class SelectMultiSelectComponent {
    @Input() items: OptionDataType[]
    @Input() label = '';
    @Input() controlData = '';
    searchControl = new FormControl('');

    ngOnInit(): void {
        this.searchControl.valueChanges
          .pipe(
            startWith(''),
            debounceTime(300), // Avoid rapid filtering
            map((value) => this.filterOptions(value || ''))
          )
          .subscribe((filtered) => (this.items = filtered));
    }


    private filterOptions(value: string): OptionDataType[] {
        const filterValue = value.toLowerCase();
        return this.items.filter((option) =>
          (option.label ?? option.value).toLowerCase().includes(filterValue)
        );
    }
}