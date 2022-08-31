import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators'

@Component({
    selector: 'staff-meetings',
    templateUrl : './staff-meetings.component.html',
    styleUrls : ['./staff-meetings.component.css'],
})
export class StaffMeetingsComponent implements OnInit{
    public showCreateMeetingTab : boolean;
    public showCompletedMeetingTab : boolean;
    public page3 : boolean = true;

    public arr = [
        {name : "Jaave Wellness Program Policy"},
        {name : "Jaave Wellness Program Policy 1"},
        {name : "Jaave Wellness Program Policy 2"},
        {name : "Jaave Wellness Program Policy 3"},
        {name : "Jaave Wellness Program Policy 4"},
        {name : "Jaave Wellness Program Policy 5"}
    ];

    ngOnInit(): void {

    }

    initiate_clinic() {
        $('#title').html('Staff Meetings');
        $('.dynamicDropdown2').addClass("flex_direct_mar");  
    }

    createMeeting(){
        this.showCreateMeetingTab = true;
    }

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  headingFormCtrl = new FormControl();
  filteredHeadings: Observable<string[]>;
  headings: string[] = ['Welcome'];
  allheadings: string[] = ['Administrate', 'Font Desk'];

  @ViewChild('headingInput') headingInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredHeadings = this.headingFormCtrl.valueChanges.pipe(
        startWith(null),
        map((heading: string | null) => heading ? this._filter(heading) : this.allheadings.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our heading
    if ((value || '').trim()) {
      this.headings.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.headingFormCtrl.setValue(null);
  }

  remove(heading: string): void {
    const index = this.headings.indexOf(heading);

    if (index >= 0) {
      this.headings.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.headings.push(event.option.viewValue);
    this.headingInput.nativeElement.value = '';
    this.headingFormCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allheadings.filter(heading => heading.toLowerCase().indexOf(filterValue) === 0);
  }
}