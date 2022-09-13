import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { TasksService } from "../tasks/tasks.service";
import { StaffMeetingService } from "./staff-meetings.service";
import { DatePipe } from "@angular/common";
import { CookieService } from "ngx-cookie";
import { ToastrService } from 'ngx-toastr';
import { RolesUsersService } from "../roles-users/roles-users.service";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
    selector: 'staff-meetings',
    templateUrl : './staff-meetings.component.html',
    styleUrls : ['./staff-meetings.component.css'],
    providers: [
      { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
    ],
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
    public view_agenda = [];
    public currentTab = 0;
    public view_agenda_tab : boolean;
    public agenda_heading : string;
    public meeting_details = [];
    public agenda_tab_has_data : boolean;
    public notAttended :boolean;
    public meeting_id;
    public agenda_item = "";
    public agenda_staff_member = "";
    public agenda_duration : number = null;
    public agenda_description = "";
    public agenda_category = "";
    public agenda_order : number = null;
    public agenda_flag = "";
    public hasPermission :boolean;
    public hasDisable : boolean;
    public minDate : Date;
    public isMeetingCreator : boolean;
    public showAttendees : boolean;

    public created_meeting = [
      {heading : "Jaave Wellness Program Policy 1", start_time:"10:10", end_time:"10:40", link: "example.com", invited:"all",description:"demo tes 1t", id:1},
      {heading : "Jaave Wellness Program Policy 2", start_time:"10:10", end_time:"10:40", link: "example.com", invited:"all",description:"demo test 2", id:2},
      {heading : "Jaave Wellness Program Policy 3", start_time:"10:10", end_time:"10:40", link: "example.com", invited:"all",description:"demo test 3", id:3},
      {heading : "Jaave Wellness Program Policy 4", start_time:"10:10", end_time:"10:40", link: "example.com", invited:"all",description:"demo test 4", id:4},
      {heading : "Jaave Wellness Program Policy 5", start_time:"10:10", end_time:"10:40", link: "example.com", invited:"all",description:"demo test 5", id:5}
    ];

    public meeting_attendees = [];

    public invited_meeting = [];

    public templates = [];

    public agendaList = [];

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
      0,15,30,45
    ];

    public clinic_id;
    public user_id;
    public user_type;
    
    @ViewChild('headingInput') headingInput: ElementRef<HTMLInputElement>;
    @ViewChild('invitesInput') invitesInput: ElementRef<HTMLInputElement>;
    // @ViewChild('card') card: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    @ViewChild('drawer') drawer;
    @ViewChild('create_meeting') create_meeting;
    @ViewChild('agenda_drawer') agenda_drawer;
    @ViewChild(MatSort) sort: MatSort;
    // @ViewChild('chipList') chipList : MatChipList;

    constructor(private formBuilder : FormBuilder, private tasksService : TasksService, private staffMeetingService : StaffMeetingService, private datepipe: DatePipe, private _cookieService: CookieService, private toastr: ToastrService, private rolesUsersService : RolesUsersService, private dateAdapter: DateAdapter<Date>) {
      this.getUsers();
      this.minDate = new Date();
      this.dateAdapter.setLocale('en-GB');
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
        category: [null, Validators.compose([Validators.required])],
        item: [null, Validators.compose([Validators.required])],
        person: [null, null],
        duration: [null, null],
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
        this.getRolesIndividual();
        this.refresh();
    }

    refresh(){
      this.getUpcomingMeetings();
      this.getCompletedMeetings();
      this.getInvitedMeetings();
      this.getPublishedMeeting();
      this.getAdengaTemplate();
      this.getCompeleteInvitedMeetings();
      // if(this.drawer.opened){
      //   this.drawer.close();
      // }
      if(this.create_meeting.opened){
        this.create_meeting.close();
      }
    }


    getRolesIndividual() {
      this.hasPermission = false;
      if (this._cookieService.get("user_type") == '2') {
        this.hasPermission = true;
      } else {
        this.rolesUsersService.getRolesIndividual().subscribe((res) => {
          if (res.message == 'success') {
            if (res.data.indexOf('createmeeting') >= 0) {
              this.hasPermission = true;
            }
          }
        });
      }
  
    }

  public invited_users = [];
  public staff = [];
  

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

  drawerToggle(id, card : ElementRef<HTMLInputElement>){
    if(!this.drawer.opened){
      $(card).parent(".meeting_card").addClass("active");
      this.create_meeting.close();

      this.staffMeetingService.getMeeting(id,this.clinic_id).subscribe(res=>{
        if(res.status == 200){
          res.data.forEach(item=>{
            item.meeting_date = this.datepipe.transform(item.meeting_date, 'dd-MM-yyyy');
          });
          this.meeting_detail = res.data[0];
          this.agenda_heading = res.data[0].meeting_topic; 
          this.agenda_tab_has_data = res.data[0].agenda_template_id != null;
        }else{
          this.drawer.close();
        }
      });
    }else{
      $(".meeting_card").removeClass("active");
    }
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
    if(min == 0){
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
    let start_date = this.datepipe.transform(formData.start_date, 'yyyy-MM-dd');
    
    formData.end_time = end_time;
    formData.start_date = start_date;
    formData.start_time = formData.start_time+" "+formData.day_time;
    formData.duration = (formData.duration_hr * 60) + formData.duration_mins;
    formData.user_id = this.user_id;
    formData.clinic_id = this.clinic_id;
    formData.status = 0;
    if(formData.template == 0){
      formData.template = "";
      this.agenda_tab_has_data = false;
    }else{
      this.agenda_tab_has_data = true;
    }
    this.staffMeetingService.createMeeting(formData).subscribe(res=>{
      if(res.status == 200){
        if(this.agenda_tab_has_data){
          this.getMeetingAgenda(res.meetingId);
        }else{

          if(this.drawer.opened)
            this.drawer.close();

          this.view_agenda_tab = false;
          this.agendaTab = true;
          this.agenda_heading = formData.meeting_topic;
          this.agendaList = [];
          this.meeting_id = res.meetingId;
        }

        if(this.create_meeting.opened)
          this.create_meeting.close();
      }
    });

  }

  boardMeeting(meeting_id){
    this.meeting_id = meeting_id;
    this.staffMeetingService.getMeetingDetails(meeting_id, this.clinic_id, this.user_id).subscribe(res=>{
      if(res.status == 200){
        this.isMeetingCreator = res.meetingCreator == 1;
        this.boardMeetingPage = true;
        this.meeting_details = [...res.data];
        this.notAttended = res.attended_status.attended == 0;
        this.agenda_heading = res.meetingTopic;
      }
    });
    
    if(this.create_meeting.opened)
      this.create_meeting.close();
  }

  getUsers() {
    this.tasksService.getUsers().subscribe((res) => {
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
        res.data.forEach(item=>{
          item.meeting_date = this.datepipe.transform(item.meeting_date, 'dd-MM-yyyy');
        });
        this.upcomingMeeting = [...res.data];
        
      }
    },
    error=>{});
  }
  
  getCompletedMeetings(){
    this.staffMeetingService.getCompletedMeetings(this.user_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        res.data.forEach(item=>{
          item.meeting_date = this.datepipe.transform(item.meeting_date, 'dd-MM-yyyy');
        });
        this.completedMeeting = [...res.data];
      }
    },
    error=>{});
  } 

  getInvitedMeetings(){
    this.staffMeetingService.getInvitedMeetings(this.user_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        res.data.forEach(item=>{
          item.meeting_date = this.datepipe.transform(item.meeting_date, 'dd-MM-yyyy');
        });
        this.invited_meeting = [...res.data];
      }
    },
    error=>{});
  } 

  getAdengaTemplate(){
    this.staffMeetingService.getAdengaTemplate().subscribe(res=>{
      if(res.status == 200){
        this.templates = [...res.data];
        let none = {id:0, template_name:"None"};
        this.templates.unshift(none);
      }
    },
    error=>{});
  }

  getPublishedMeeting(){
    this.staffMeetingService.getPublishedMeeting(this.user_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        res.data.forEach(item=>{
          item.meeting_date = this.datepipe.transform(item.meeting_date, 'dd-MM-yyyy');
        });
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
        res.data.forEach(item=>{
          item.meeting_date = this.datepipe.transform(item.meeting_date, 'dd-MM-yyyy');
        });
        this.complete_invited_meeting = [...res.data];
      }
    })
  }

  changeTab(tabIndex){
    this.currentTab = tabIndex;
    this.drawer.close();
    this.invited_users = [];
    $(".meeting_card").removeClass("active");
  }


  getMeetingAgenda(meeting_id){
    this.meeting_id = meeting_id;
    this.staffMeetingService.getMeetingAgenda(meeting_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.staffMeetingService.getMeeting(meeting_id,this.clinic_id).subscribe(res=>{
          if(res.status == 200){
            this.agenda_heading = res.data[0].meeting_topic;
          }
        });
        this.agendaList = [...res.data];
        this.drawer.close();
        this.view_agenda_tab = false;
        this.agendaTab = true;
      }
    });
  }

  viewMeetingAgenda(meeting_id){
    this.staffMeetingService.getMeetingAgenda(meeting_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.view_agenda = [...res.data];
        this.view_agenda_tab = true;
        this.agendaTab = true;
        this.drawer.close();
      }
    });
    this.staffMeetingService.getMeeting(meeting_id,this.clinic_id).subscribe(result=>{
      if(result.status == 200){
        this.agenda_heading = result.data[0].meeting_topic;
      }
    });
  }

  back_page(tab : string){
    if(tab == "board_meeting"){
      this.boardMeetingPage = false;
    }else if(tab == "agenda_view"){
      this.agendaTab = false;
      this.view_agenda_tab = false;
    }else if(tab == "agenda_add"){
      this.agendaTab = false;
    }
    // this.currentTab = 0;
    this.refresh();
  }

  openAgenda(meeting_id){
    this.meeting_id = meeting_id;
    this.staffMeetingService.getMeetingAgenda(meeting_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.agendaList = [...res.data];
        this.drawer.close();
        this.view_agenda_tab = false;
        this.agendaTab = true;
      }
    });
      
  }

  confirmMeetingAttend(){
    this.staffMeetingService.saveMeetingAttended(this.meeting_id, this.user_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.toastr.success('Thanks for attending the meeting. once the creator of the meeting mark the meeting completed it will be visible in you completed tab. Thankyou !! ');
        this.boardMeeting(this.meeting_id);
      }
    });
  }


  public meeting_agenda_id = null;
  openAgendaDrawer(agenda_drawer, item, action){
    agenda_drawer.toggle()
    if(action == "add"){
      this.meeting_agenda_id = null;
      let order = item.agenda_item.length;
      this.agenda_order = ++order;
      this.agenda_category = item.category
      this.agenda_flag = "new";
      this.hasDisable = true;
    }else if(action == "edit"){
      this.meeting_agenda_id = item.id;
      this.agenda_item = item.agenda_item;
      this.agenda_staff_member = (item.staff_member == "null") ? "" : item.staff_member;
      this.agenda_category = item.category
      this.agenda_duration = item.duration
      this.agenda_description = item.description
      this.agenda_order = item.agenda_order;
      this.hasDisable = true;
      this.agenda_flag = "update";
    }
  }

  addAgendaHeading(agenda_drawer){
    this.agenda_flag = "new";
    this.agenda_order = 1;
    this.hasDisable = false;
    agenda_drawer.open();
  }

  save_agenda(formData){
    formData.meeting_id = this.meeting_id;
    formData.clinic_id = this.clinic_id;
    formData.flag = this.agenda_flag;
    formData.agenda_order = this.agenda_order;
    if(this.agenda_flag == "update")
      formData.meeting_agenda_id = this.meeting_agenda_id;
    
    this.staffMeetingService.saveMeetingAgenda(formData).subscribe(res=>{
      if(res.status == 200){
        this.agenda_drawer.close();
        this.create_agenda_form.reset();
        this.openAgenda(this.meeting_id);
      }
    });
  }

  markCompleteMeeting(){
    this.staffMeetingService.markMeetingComplete(this.meeting_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.toastr.success('Thankyou for marking the meeting complete.');
        // this.drawer.close();
        this.refresh();
      }
    });
  }


  viewMeetingAttendees(meeting_id){
    this.staffMeetingService.getMeetingDetails(meeting_id, this.clinic_id, this.user_id).subscribe(res=>{
      if(res.status == 200){
        this.showAttendees = res.meetingCreator == 1;
        this.boardMeetingPage = true;
        this.meeting_details = [...res.data];
        this.agenda_heading = res.meetingTopic;
      }
    });

    this.staffMeetingService.getMeetingAttendees(meeting_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        res.data.forEach(item=>{
          this.staff.forEach(ele=>{
            if(item.invited_user == ele.id){
              item.user_name = ele.name;
            }
          });
        })
        this.meeting_attendees = [...res.data];
      }
    });
    
    if(this.create_meeting.opened)
      this.create_meeting.close();
  }
}