import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { debounceTime, startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

export interface OptionDataType {
  label?: string;
  value: any;
}

@Component({
  selector: 'search-multi-select',
  templateUrl: 'search-multi-select.component.html',
  styleUrls: ['search-multi-select.component.scss'],
})
export class SelectMultiSelectComponent implements OnInit, OnChanges {
  @Input() items: OptionDataType[] = [];
  @Input() label = '';
  @Input() controlData: FormControl;
  @Input() disabled: boolean = false;

  searchControl = new FormControl('');
  searchedItems: OptionDataType[] = [];

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        map(value => this.filterOptions(value || '')),
      )
      .subscribe(filtered => (this.searchedItems = filtered));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      // Re-apply the filter using the current search value
      const currentSearch = this.searchControl.value || '';
      this.searchedItems = this.filterOptions(currentSearch);
    }
  }

  private filterOptions(value: string): OptionDataType[] {
    const filterValue = value.toLowerCase();
    if (!filterValue) return this.items;
    return this.items.filter(option =>
      (option.label ?? option.value).toLowerCase().includes(filterValue),
    );
  }
}

