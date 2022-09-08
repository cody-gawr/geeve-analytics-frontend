import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipList} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators'
import { TasksService } from "../tasks/tasks.service";
import { StaffMeetingService } from "./staff-meetings.service";
import { DatePipe } from "@angular/common";
import { CookieService } from "ngx-cookie";

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
    public upcomingMeeting = [];
    public completedMeeting = [];
    public published_meeting = [];
    public complete_invited_meeting = [];
    public currentTab = 0;

    public created_meeting = [
      {heading : "Jaave Wellness Program Policy 1", start_time:"10:10", end_time:"10:40", link: "example.com", invited:"all",description:"demo tes 1t", id:1},
      {heading : "Jaave Wellness Program Policy 2", start_time:"10:10", end_time:"10:40", link: "example.com", invited:"all",description:"demo test 2", id:2},
      {heading : "Jaave Wellness Program Policy 3", start_time:"10:10", end_time:"10:40", link: "example.com", invited:"all",description:"demo test 3", id:3},
      {heading : "Jaave Wellness Program Policy 4", start_time:"10:10", end_time:"10:40", link: "example.com", invited:"all",description:"demo test 4", id:4},
      {heading : "Jaave Wellness Program Policy 5", start_time:"10:10", end_time:"10:40", link: "example.com", invited:"all",description:"demo test 5", id:5}
    ];

    public invited_meeting = [];

    public templates = [
      {template_name: "welcome", id:1},
      {template_name: "welcome 1", id:2},
      {template_name: "welcome 2", id:3}
    ];

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

    public meeting_detail = {id:"",meeting_topic : "", start_time:"", end_time:"", link: "",meeting_date:"",agenda_template_id:"", created_date:""};

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
      0,10,20,30,40,50
    ];

    public clinic_id;
    public user_id;
    public user_type;
    constructor(private formBuilder : FormBuilder, private tasksService : TasksService, private staffMeetingService : StaffMeetingService, private datepipe: DatePipe, private _cookieService: CookieService) {
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
        day_time: [null, Validators.compose([Validators.required])],
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
        var val = $('#currentClinic').attr('cid');

        if(val != undefined && val != 'all') {
          this.clinic_id = val;
        }

        this.user_type = this._cookieService.get("user_type");
        if(this.user_type == 2){
          this.user_id = this._cookieService.get("userid");
        }else{
          this.user_id = this._cookieService.get("childid");
        }

        this.refresh();
    }

    refresh(){
      this.getUpcomingMeetings();
      this.getCompletedMeetings();
      this.getInvitedMeetings();
      this.getPublishedMeeting();
      this.getAdengaTemplate();
      this.getCompeleteInvitedMeetings();
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

  drawerToggle(id, card : ElementRef<HTMLInputElement>){
    if(!this.drawer.opened){
      $(card).parent(".meeting_card").addClass("active");
      this.create_meeting.close();

      this.staffMeetingService.getMeeting(id,this.clinic_id).subscribe(res=>{
        if(res.status == 200){
          this.meeting_detail = res.data[0];
          // this.drawer.open();
        }else{
          this.drawer.close();
        }
      });
      // this.staffMeetingService.getInvitedUsers(id, this.clinic_id).subscribe(res=>{
      //   if(res.status == 200){
      //       this.invited_users = [...res.data];
      //   }
      // });
    }else{
      $(".meeting_card").removeClass("active");
    }
    // this.drawer.close();
    this.drawer.toggle();
    this.invites_form.reset();

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

    // let meeting_topic = formData.meeting_topic;
    let start_time = formData.start_time;
    let time = start_time.split(":");
    let hr = parseInt(time[0]) + formData.duration_hr;
    let min = parseInt(time[1]) + formData.duration_mins;

    if(min > 60){
      hr += Math.floor(min/60);
      min = min%60;
    }
    if(min == 60){
      hr ++;
      min = "00";
    }
    if(hr < 10){
      hr = "0"+hr;
    }

    let day_time = formData.day_time;

    if(time[0] != "12"){
      if(hr>12 && formData.day_time == "AM"){
        hr = "0"+(hr%12);
        day_time = "PM";
      }else if(hr>12 && formData.day_time == "PM"){
        hr = "0"+(hr%12);
        day_time = "AM";
      }
    }else{
      if(hr < 12){
        hr = "0"+(hr%12);
      }else{
        hr =(hr%12);
      }
      if(hr == "00"){
        hr = "0"+1;
      }
    }

    let end_time = hr+":"+min+" "+day_time;
    // let template = formData.template;
    let start_date = this.datepipe.transform(formData.start_date, 'yyyy-MM-dd');
    
    formData.end_time = end_time;
    formData.start_date = start_date;
    formData.start_time = formData.start_time+" "+formData.day_time;
    formData.duration = (formData.duration_hr * 60) + formData.duration_mins;
    formData.user_id = this.user_id;
    formData.clinic_id = this.clinic_id;
    formData.status = 0;
    if(formData.template == null){
      formData.template = "";
    }
    this.staffMeetingService.createMeeting(formData).subscribe(res=>{
      if(res.status == 200){
        this.getUpcomingMeetings();
        this.create_meeting.close();
        this.agendaTab = true;
      }
    });

    // formData.id = this.created_meeting.length+1;
    // this.created_meeting.unshift(formData);
    // this.agendaTab = true
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

  save_invites(meeting_id){
    let user_ids = [];
    this.invited_users.forEach(item=>{
      user_ids.push(item.id);
    });

    this.staffMeetingService.publishMeeting(user_ids, meeting_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.drawer.close();
        this.refresh();
      }
    });
  }

  getUpcomingMeetings(){
    this.staffMeetingService.getUpcomingMeetings(this.user_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.upcomingMeeting = [...res.data];
      }
    },
    error=>{});
  }
  
  getCompletedMeetings(){
    this.staffMeetingService.getCompletedMeetings(this.user_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.completedMeeting = [...res.data];
      }
    },
    error=>{});
  } 

  getInvitedMeetings(){
    this.staffMeetingService.getInvitedMeetings(this.user_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.invited_meeting = [...res.data];
      }
    },
    error=>{});
  } 

  getAdengaTemplate(){
    this.staffMeetingService.getAdengaTemplate().subscribe(res=>{
      if(res.status == 200){
        // console.log(res);
        // this.templates = [...res.data];
      }
    },
    error=>{});
  }

  getPublishedMeeting(){
    this.staffMeetingService.getPublishedMeeting(this.user_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.published_meeting = [...res.data];
      }
    })
  }

  markComplete(id){
    this.staffMeetingService.markMeetingComplete(id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.drawer.close();
        this.refresh();
      }
    });
  }

  getCompeleteInvitedMeetings(){
    this.staffMeetingService.getCompeleteInvitedMeetings(this.user_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.complete_invited_meeting = [...res.data];
      }
    })
  }

  changeTab(tabIndex){
    this.currentTab = tabIndex;
    this.drawer.close();
  }


  getMeetingAgenda(meeting_id){
    let category = new Set();
    let result = [new Array()];
    let agenda_items = [];
    this.staffMeetingService.getMeetingAgenda(meeting_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        res.data.forEach(item=>{
          category.add(item.category);
          if(category.has(item.category)){
            item.category = [];
            result.push(item.category.push(item.agenda_item));
          }
        });

        // console.log(result);
        
        
      }
    });
  }
  
}