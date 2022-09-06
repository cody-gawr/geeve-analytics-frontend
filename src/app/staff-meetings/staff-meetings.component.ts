import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipList} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators'
import { TasksService } from "../tasks/tasks.service";

@Component({
    selector: 'staff-meetings',
    templateUrl : './staff-meetings.component.html',
    styleUrls : ['./staff-meetings.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class StaffMeetingsComponent implements OnInit{
    public showCreateMeetingTab : boolean;
    public showCompletedMeetingTab : boolean;
    public boardMeetingPage : boolean;
    public agenda : boolean = true;
    public create_meeting_form : FormGroup;
    public create_agenda_form : FormGroup;
    public invites_form : FormGroup;
    public agendaTab : boolean;
    public created_meeting = [
      {heading : "Jaave Wellness Program Policy 1", start_time:"10:10", end_time:"10:40", link: "example.com", invited:"all",description:"demo tes 1t", id:1},
      {heading : "Jaave Wellness Program Policy 2", start_time:"10:10", end_time:"10:40", link: "example.com", invited:"all",description:"demo test 2", id:2},
      {heading : "Jaave Wellness Program Policy 3", start_time:"10:10", end_time:"10:40", link: "example.com", invited:"all",description:"demo test 3", id:3},
      {heading : "Jaave Wellness Program Policy 4", start_time:"10:10", end_time:"10:40", link: "example.com", invited:"all",description:"demo test 4", id:4},
      {heading : "Jaave Wellness Program Policy 5", start_time:"10:10", end_time:"10:40", link: "example.com", invited:"all",description:"demo test 5", id:5}
    ];

    public invited_meeting = [
      {heading : "Jaave Wellness Program Policy (Invites) ", start_time:"10:10", end_time:"10:40", link: "example.com", id:1},
      {heading : "Jaave Wellness Program Policy (Invites) ", start_time:"10:10", end_time:"10:40", link: "example.com", id:2},
      {heading : "Jaave Wellness Program Policy (Invites) ", start_time:"10:10", end_time:"10:40", link: "example.com", id:3},
      {heading : "Jaave Wellness Program Policy (Invites) ", start_time:"10:10", end_time:"10:40", link: "example.com", id:4},
      {heading : "Jaave Wellness Program Policy (Invites) ", start_time:"10:10", end_time:"10:40", link: "example.com", id:5}
    ];

    public templates = [
      {name: "welcome", id:1},
      {name: "welcome 1", id:2},
      {name: "welcome 2", id:3}
    ]

    public agendaList = [
      {heading : "welcome", items :[
        {item:"Intoduce new board members"}
      ]},
      {heading : "Administration", items :[
        {item:"Intoduce new board members"},
        {item:"Intoduce new board members"},
        {item:"Intoduce new board members"}
      ]},
      {heading : "Front Desk", items :[
        {item:"Intoduce new board members"},
        {item:"Intoduce new board members"},
        {item:"Intoduce new board members"}
      ]},
    ];

    public card_data = {heading : "", start_time:"", end_time:"", link: "", invited:"",description:""};

    public time = [
      "01:00",
      "01:30",
      "02:00",
      "02:30",
      "03:00",
      "03:30",
      "04:00",
      "04:30",
      "05:00",
      "05:30",
      "06:00",
      "06:30",
      "07:00",
      "07:30",
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30"
    ];

    public hrs = [
      0,1,2,3,4,5,6,7,8,9,10,11,12
    ];

    public mins = [
      0,10,20,30,40,50,60
    ];


    constructor(private formBuilder : FormBuilder, private tasksService : TasksService) {
      this.getUsers();
      this.filteredHeadings = this.headingFormCtrl.valueChanges.pipe(
          map((heading: string | null) => heading ? this._filter(heading) : this.allheadings.slice()));
    }
    ngOnInit(): void {
      this.create_meeting_form = this.formBuilder.group({
        meeting_topic: [null, Validators.compose([Validators.required])],
        start_date: [null, Validators.compose([Validators.required])],
        start_time: [null, Validators.compose([Validators.required])],
        duration_mins: [null, Validators.compose([Validators.required])],
        duration_hr: [null, Validators.compose([Validators.required])],
        template: [null,]
      });

      this.create_agenda_form = this.formBuilder.group({
        heading: [null, Validators.compose([Validators.required])],
        item: [null, Validators.compose([Validators.required])],
        person: [null],
        duration: [null, Validators.compose([Validators.required])],
        description: [null, Validators.compose([Validators.required])]
      });

      this.invites_form = this.formBuilder.group({
        invites: [null, Validators.compose([Validators.required])]
      });

    }

    initiate_clinic() {
        $('#title').html('Staff Meetings');
        $('.dynamicDropdown2').addClass("flex_direct_mar");  
    }

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  headingFormCtrl = new FormControl();
  public invitesFormCtrl = new FormControl();
  filteredHeadings: Observable<string[]>;
  headings: string[] = [];
  allheadings: string[] = ['Welcome','Administrate', 'Font Desk'];

  public invited_users = [];
  public staff = [];
  

  @ViewChild('headingInput') headingInput: ElementRef<HTMLInputElement>;
  @ViewChild('invitesInput') invitesInput: ElementRef<HTMLInputElement>;
  // @ViewChild('card') card: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('drawer') drawer;
  @ViewChild('create_meeting') create_meeting;
  @ViewChild('agenda_drawer') agenda_drawer;
  // @ViewChild('chipList') chipList : MatChipList;
  

  

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

  // addInvites(event: MatChipInputEvent): void { 

  //   const input = event.input;
  //   const value = event.value;

  //   if ((value || '').trim()) {
  //     this.headings.push(value.trim());
  //   }

  //   if (input) {
  //     input.value = '';
  //   }

  //   this.headingFormCtrl.setValue(null);
  // }

  removeInvites(user_id): void {
    let removedUsers =  this.invited_users.filter(item=>{
      return item.id == user_id;
    });
    this.staff.push(removedUsers[0]);
    this.invited_users = this.invited_users.filter(item=>{
      return item.id != user_id;
    })
    if(this.invited_users.length == 0)
      this.invites_form.get('invites').setValue('');
  }

  selectedInvites(event: MatAutocompleteSelectedEvent): void {
    let data = {id : event.option.value, name : event.option.viewValue};
    this.invited_users.push(data);
    this.invitesInput.nativeElement.value = '';

    this.staff = this.staff.filter(item=>{
      return item.id != data.id;
    });
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

  drawerToggle(i, card : ElementRef<HTMLInputElement>){
    if(!this.drawer.opened){
      $(card).parent(".meeting_card").addClass("active");
      this.create_meeting.close();
    }else{
      $(".meeting_card").removeClass("active");
    }
    this.card_data = this.created_meeting[i-1];
    this.drawer.toggle();
    // this.drawer.disableClose(true);
    // console.log(this.drawer.opened);  
    // console.log(this.drawer);
    
  }
  createMeeting(){
    this.create_meeting.open();
  }

  close(card, form){
    $(".meeting_card").removeClass("active");
    card.close();
    form.reset();
  }

  save_meeting(formData){
    formData.id = this.created_meeting.length+1;
    this.created_meeting.unshift(formData);
    this.agendaTab = true
  }

  boardMeeting(){
    this.boardMeetingPage = true;

    if(this.boardMeetingPage)
      this.create_meeting.close();
  }

  save_agenda(formData){

  }

  getUsers() {
    this.tasksService.getUsers().subscribe(
      (res) => {
        if (res.message == "success") {
          res.data.forEach((user) => {
            if (user["displayName"]) {
              this.staff.push({
                id: user["id"],
                name: user["displayName"],
              });
            }
          });
        }
      },
      (error) => {}
    );
  }

  save_invites(){
    // console.log(this.invited_users);
  }
  
}