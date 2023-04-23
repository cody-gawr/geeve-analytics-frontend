import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { TasksService } from "../tasks/tasks.service";
import { StaffMeetingService } from "./staff-meetings.service";
import { DatePipe } from "@angular/common";
import { CookieService } from "ngx-cookie";
import { ToastrService } from 'ngx-toastr';
import { RolesUsersService } from "../roles-users/roles-users.service";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatSort } from "@angular/material/sort";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { HeaderService } from "../layouts/full/header/header.service";
import Swal from 'sweetalert2';


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

export const notZeroValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const duration_mins = control.get('duration_mins');
  const duration_hr = control.get('duration_hr');

  return  duration_mins.value == 0 && duration_hr.value == 0 ? { notZero: true } : null;
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
    public hasPermission :boolean = false;
    public hasDisable : boolean;
    public minDate : Date;
    public isMeetingCreator : boolean;
    public showAttendees : boolean;
    public chart_id: number = 0;
    public chart_start_date = "";
    public chart_end_date = "";
    public show_date_picker: boolean;
    public allSelected : boolean;
    public hasDraftData : boolean;
    public meeting_attendees = [];
    public templates = [];
    public agendaList = [];
    public pages = [];
    public timezones = [];
    public clinics = [];
    public chart_clinic_id;

    public currentPage: number = 1;
    public itemsPerPage = 10;

    public meeting_detail = {id:"",meeting_topic : "", start_time:"", end_time:"", link: "",meeting_date:"",agenda_template_id:"", created_date:"", showAlert : true, isCreator: false};


    
    public tipPendingCompleteMarkStaffMeeting = {
      title: 'Alert',
      info: 'This meeting is pending to mark complete.',
      direction: 'left'
    }

    public tipPendingReviewStaffMeeting = {
        title: 'Alert',
        info: 'This meeting is pending to mark complete review.',
        direction: 'left'
    }

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

    public charts = [
      {id: 0, chart_name : "None"},
      {id: 1, chart_name : "Production"},
      {id: 7, chart_name : "Hourly Rate"},
      // {id: 16, chart_name : "Recall  Rate"},
      // {id: 17, chart_name : "Reappointment Rate"},
      {id: 25, chart_name : "Total Visits"},
      {id: 4, chart_name : "Recall Prebook Rate"},
      {id: 5, chart_name : "Reappointment Rate"},
      {id: 15, chart_name : "Utilisation Rate"},
      {id: 55, chart_name : "Followups Per User"}
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
    @ViewChild('draftDrawer') drawer;
    @ViewChild('scheduleDrawer') scheduleDrawer;
    @ViewChild('create_meeting') create_meeting;
    @ViewChild('agenda_drawer') agenda_drawer;
    @ViewChild('picker_range') picker_range;
    @ViewChild('agenda_form') agenda_form: HTMLFormElement;
    @ViewChild('invite') invite_form: HTMLFormElement;
    @ViewChild('meeting_form') meeting_form: HTMLFormElement;
    @ViewChild(MatSort) sort: MatSort;
    // @ViewChild('chipList') chipList : MatChipList;

    constructor(private formBuilder : FormBuilder, private tasksService : TasksService, private staffMeetingService : StaffMeetingService, private datepipe: DatePipe, private _cookieService: CookieService, private toastr: ToastrService, private rolesUsersService : RolesUsersService, private dateAdapter: DateAdapter<Date>, private headerService : HeaderService) {
      this.minDate = new Date();
      this.dateAdapter.setLocale('en-GB');
      this.getClinic();
    }
    ngOnInit(): void {
       // creating the meeting form and set up validators
      this.create_meeting_form = this.formBuilder.group({
        meeting_topic: [null, Validators.compose([Validators.required])],
        start_date: [null, Validators.compose([Validators.required])],
        start_time: [null, Validators.compose([Validators.required])],
        duration_mins: [null, Validators.compose([Validators.required])],
        duration_hr: [null, Validators.compose([Validators.required])],
        day_time: [null, Validators.compose([Validators.required])],
        timezone: [null, Validators.compose([Validators.required])],
        template: [null,]
      },
      {
        validator: notZeroValidator
      });

      // creating the agenda form and set up validators
      this.create_agenda_form = this.formBuilder.group({
        category: [null, Validators.compose([Validators.required])],
        item: [null, Validators.compose([Validators.required])],
        person: [null, null],
        duration: [null, null],
        description: [null, Validators.compose([Validators.required])],
        chart :[null, null],
        start_date :[null, ''],
        end_date: [null, ''],
        clinic: [null, '']
      });

      this.invites_form = this.formBuilder.group({
        invites: [null, Validators.compose([Validators.required])]
      });

    }

    // initiate the clinic the stored the required information
    initiate_clinic() {
        $('#title').html('Staff Meetings');
        $('.dynamicDropdown2').addClass("flex_direct_mar");  
        var val = $('#currentClinic').attr('cid');

        if(val != undefined && val != 'all'){
          this.clinic_id = val;
          this.chart_clinic_id = +val;
        }

        this.user_type = this._cookieService.get("user_type");
        if(this.user_type == 2){
          this.user_id = this._cookieService.get("userid");
        }else{
          this.user_id = this._cookieService.get("childid");
        }

        this.boardMeetingPage = false;
        this.agendaTab = false;
        this.meetingCards = [];
        this.getRolesIndividual();
        this.getAdengaTemplate();
        this.getUsers();
        this.getTimezone();
        // this.getScheduledMeeting();

        this.currentTab = 1;
        
    }


    // use to refresh the listing based on the current tab
    refresh(){
      if(this.currentTab == 0){
        this.getDraftMeetings();
      }else if(this.currentTab == 1){
        this.getScheduledMeeting();
      }
      else if(this.currentTab == 2){
        this.getCompletedMeetings();
      }
    }

  // ---- not in use ----
  // changing list based on tags completed or upcoming
  // changeCompleteTab(type){
  //   if(type == 'Upcoming'){
  //     this.currentTab = 0;
  //     this.showCompletedMeetingTab = false;
  //   }else if(type == 'Completed'){
  //     this.showCompletedMeetingTab = true
  //     this.currentTab = 1;
  //   }

  //   this.refresh();
  // }

  // use to check the permission of the logged user
  getRolesIndividual() {
    this.hasPermission = false;
    if (this._cookieService.get("user_type") == '2') {
      this.hasPermission = true;
    } else {
      this.rolesUsersService.getRolesIndividual().subscribe((res) => {

          if (res.data.indexOf('createmeeting') >= 0) {
            this.hasPermission = true;
          }
        
      });
    }
  }

  public invited_users = [];
  public staff = [];
  

// removing the users form the selected chips 
  removeInvites(user_id): void {

    if(user_id == -1)
      this.allSelected = false;

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

  // chips of the selected uses.
  selectedInvites(event: MatAutocompleteSelectedEvent): void {
    let data = {id : event.option.value, name : event.option.viewValue};

    if(data.id == -1){
      this.allSelected = true;
      this.invited_users = [data];
    }else{
      this.invited_users.push(data);
      this.invitesInput.nativeElement.value = '';
  
      this.staff = this.staff.filter(item=>{
        return item.id != data.id;
      });
    }
    
  }

  // logic for the drawer toggle
  draftDrawerToggle(card : ElementRef<HTMLInputElement>, meeting){
    if(!this.drawer.opened){
      $(card).parent(".meeting_card").addClass("active");
      this.create_meeting.close();
      this.agenda_heading = meeting.meeting_topic;
      this.meeting_detail = meeting;
    }else{
      $(".meeting_card").removeClass("active");
    }
    this.drawer.toggle();
    this.allSelected = false;
    this.invited_users = [];
    if(this.currentTab == 0)
      this.invite_form.nativeElement.reset();

  }

  // logic for the drawer toggle
  scheduleDrawerToggle(card : ElementRef<HTMLInputElement>, meeting){
    if(!this.scheduleDrawer.opened){
      $(card).parent(".meeting_card").addClass("active");
      this.create_meeting.close();
      this.agenda_heading = meeting.meeting_topic;
      this.meeting_detail = meeting;
      if(meeting.created_by == this.user_id){
        this.meeting_detail.isCreator = true;
      }else{
        this.meeting_detail.isCreator = false;
      }
      
    }else{
      $(".meeting_card").removeClass("active");
    }
    this.scheduleDrawer.toggle();
    this.allSelected = false;
    this.invited_users = [];
    if(this.currentTab == 0)
      this.invite_form.nativeElement.reset();

  }

// use to open the create meeting drawer
  createMeeting(){
    this.create_meeting.open();
  }

// use to close the drawer
  close(card, form){
    $(".meeting_card").removeClass("active");
    card.close();
    form.reset();
    this.create_meeting_form.get('day_time').setValue('AM');
    this.create_meeting_form.get('start_time').setValue('09:00');
    this.create_meeting_form.get('duration_mins').setValue(0);
    this.create_meeting_form.get('template').setValue(0);
  }

  // use to create meetings
  save_meeting(form){

    if(form.invalid)
      return;

    let formData = form.value;
    let start_time = formData.start_time;
    let time = start_time.split(":");
    let hr = parseInt(time[0]) + formData.duration_hr;
    let min = parseInt(time[1]) + formData.duration_mins;

    // logic for the hr and min calculation.
    if(min >= 60){
      hr += Math.floor(min/60);
      min = min%60;
    }

    let day_time = formData.day_time;
// locgic for the time calculation : calculating the end time
    if(hr>12){
      if(hr == 24){
        hr = 12;
      }else{
        hr = hr%12;
      }
      if(time[0] != 12){
        day_time = day_time == "AM" ? "PM" : "AM";
      }
    }else if(hr == 12){
      if(time[0] != 12){
        day_time = day_time == "AM" ? "PM" : "AM";
      }
    }
    // if(time[0] != "12"){
    //   if(hr>12){
    //     if(hr == 24){
    //       hr = 12;
    //     }else{
    //       hr = hr%12;
    //     }
    //     day_time = day_time == "AM" ? "PM" : "AM";
    //   }else if(hr == 12){
    //     day_time = day_time == "AM" ? "PM" : "AM";
    //   }
    // }else{
    //   console.log("-->",hr);
      
    //   if(hr > 12 ){
    //     if(hr == 24){
    //       hr = 12;
    //     }else{
    //       hr = (hr%12);
    //     }
    //   }
    //   console.log("--->",hr);
    // }

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

        // after save data reseting the inputs field to its default
        this.meeting_form.nativeElement.reset();
        this.create_meeting_form.get('day_time').setValue('AM');
        this.create_meeting_form.get('start_time').setValue('09:00');
        this.create_meeting_form.get('duration_mins').setValue(0);
        this.create_meeting_form.get('template').setValue(0);
      }
    });

  }

  // use to show the review meeting page.
  boardMeeting(meeting_id){
    this.meeting_attendees = [];
    this.meeting_id = meeting_id;
    this.staffMeetingService.getMeetingDetails(meeting_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.isMeetingCreator = res.meetingCreator == 1 && res.meetingStatus == 1;
        if(res.meetingCreator == 1){
          this.viewMeetingAttendees(meeting_id);
        }
        if(this.scheduleDrawer.opened)
          this.scheduleDrawer.close();
        this.boardMeetingPage = true;
        this.meeting_details = [...res.body.data];
        if(res.attended_status != null){
          this.notAttended = res.attended_status.attended == 0;
        }
        this.agenda_heading = res.meetingTopic;
      }
    });
    
    if(this.create_meeting.opened)
      this.create_meeting.close();
  }
  public staffTemp;
  // get the list of user 
  getUsers() {
    this.tasksService.getUsers().subscribe((res) => {
      this.staff = [];
        if (res.status == 200) {
          res.body.data.forEach((user) => {
            if (user["displayName"] && user['id'] != this.user_id) {
              this.staff.push({
                id: user["id"],
                name: user["displayName"],
              });
            }
          });
          let all = {id: -1, name : "All"};
          this.staff.unshift(all);
          this.staffTemp = [...this.staff];
        }
      },
      (error) => {}
    );
  }

  public loader : boolean;
  
  // use to send invitation to the selected use.
  save_invites(meeting_id, invitesForm){

    if(invitesForm.invalid)
      return;
    
    let user_ids = [];
    this.loader = true;

    // collect the id's of the invited user 
    if(this.invited_users[0].id == -1){
      this.staffTemp.forEach(item=>{
        if(item.id != -1){
          user_ids.push(item.id);
        }
      })
    }else{
      this.invited_users.forEach(item=>{
        user_ids.push(item.id);
      });
    }

    this.staffMeetingService.publishMeeting(user_ids, meeting_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.loader = false;
        this.drawer.close();
        this.allSelected = false;
        this.invited_users = [];
        this.invite_form.nativeElement.reset()
        this.refresh();
      }else{
        this.loader = false;
      }
    },error=>{
      this.loader = false;
    });
  }

  // get the listing of Draft meetings
  getDraftMeetings(){
    this.staffMeetingService.getDraftMeetings(this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        res.body.data.forEach(item=>{
          item.meeting_date = this.datepipe.transform(item.meeting_date, 'dd-MM-yyyy');
        });
        if(res.body.data.length > 0)
          this.hasDraftData = true;
        // add paginator and displaying data
        this.setPagesForpaginator(res.body.data);
      }
    },
    error=>{});
  }
  
// get the listing of completed meetings
  getCompletedMeetings(){
    this.staffMeetingService.getCompletedMeetings(this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        res.body.data.forEach(item=>{
          item.meeting_date = this.datepipe.transform(item.meeting_date, 'dd-MM-yyyy');
        });
        // add paginator and displaying data
        this.setPagesForpaginator(res.body.data);
      }
    },
    error=>{});
  } 

  //  get the listing of the agenda template.
  getAdengaTemplate(){
    this.staffMeetingService.getAdengaTemplate().subscribe(res=>{
      if(res.status == 200){
        this.templates = [...res.body.data];
        let none = {id:0, template_name:"None"};
        this.templates.unshift(none);
      }
    },
    error=>{});
  }

  // get the listing of published invited meetings
  getScheduledMeeting(){
    this.staffMeetingService.getScheduledMeeting(this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        let now = new Date();

        res.body.data.forEach(item=>{
          let meeting_date = new Date(item.meeting_date);
          if(now.getTime() > meeting_date.getTime()){
            item.showAlert = true;
          }else{
            item.showAlert = false;
          }
          item.meeting_date = this.datepipe.transform(item.meeting_date, 'dd-MM-yyyy');
        });
        
        // add paginator and displaying data
        this.setPagesForpaginator(res.body.data);
      }
    })
  }

  // call when we change the tab
  changeTab(tabIndex){
    this.meetingCards = [];
    this.currentTab = tabIndex;
    this.drawer.close();

    if(this.create_meeting.opened)
      this.create_meeting.close();

    this.invited_users = [];
    $(".meeting_card").removeClass("active");
    
    this.refresh();

  }

// use to get the meeting agenda's
  getMeetingAgenda(meeting_id){
    this.meeting_id = meeting_id;
    this.staffMeetingService.getMeetingAgenda(meeting_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.staffMeetingService.getMeeting(meeting_id,this.clinic_id).subscribe(res=>{
          if(res.status == 200){
            this.agenda_heading = res.body.data[0].meeting_topic;
          }
        });
        this.agendaList = [...res.body.data];
        this.drawer.close();
        this.view_agenda_tab = false;
        this.agendaTab = true;
      }
    });
  }

  // use to viwe the agenda tab
  viewMeetingAgenda(meeting_id){
    this.staffMeetingService.getMeetingAgenda(meeting_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.view_agenda = [...res.body.data];
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

  // back button
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

  // open view agenda tab
  openAgenda(meeting_id){
    this.meeting_id = meeting_id;
    this.staffMeetingService.getMeetingAgenda(meeting_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        if(this.scheduleDrawer.opened)
          this.scheduleDrawer.close();
        this.agendaList = [...res.body.data];
        this.view_agenda_tab = false;
        this.agendaTab = true;
      }
    });
  }

  // mark the meeting attended.
  confirmMeetingAttend(){
    this.staffMeetingService.saveMeetingAttended(this.meeting_id, this.user_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.toastr.success('Thanks for attending the meeting. once the creator of the meeting mark the meeting completed it will be visible in you completed tab. Thankyou !! ');
        this.notAttended = false;
        // this.boardMeeting(this.meeting_id);
      }
    });
  }


  public meeting_agenda_id = null;
  // open the agenda drawer based in the action
  // edit = use to edit the agenda
  // new use to add new agenda
  openAgendaDrawer(agenda_drawer, item, action){
    agenda_drawer.toggle();
    if(action == "add"){
      this.meeting_agenda_id = null;
      let order = item.agenda_item.length;
      this.agenda_order = ++order;
      this.agenda_category = item.category
      this.agenda_flag = "new";
      this.hasDisable = true;
      this.agenda_description = "";
      this.chart_clinic_id = +this.clinic_id;
      // this.agenda_duration = 0;
      this.create_agenda_form.get('duration').setValue('');
      this.agenda_staff_member = "";
      this.agenda_item = "";
      this.chart_id = 0;
      this.chart_start_date = "";
      this.chart_end_date = "";
      this.create_agenda_form.get('clinic').clearValidators();
      this.create_agenda_form.get('clinic').updateValueAndValidity();
      this.create_agenda_form.get('start_date').clearValidators();
      this.create_agenda_form.get('start_date').updateValueAndValidity();
      this.create_agenda_form.get('end_date').clearValidators();
      this.create_agenda_form.get('end_date').updateValueAndValidity();

    }else if(action == "edit"){
      this.meeting_agenda_id = item.id;
      this.agenda_item = item.agenda_item;
      this.chart_clinic_id = item.chart_clinic_id;
      this.agenda_staff_member = (item.staff_member == "null") ? "" : item.staff_member;
      this.agenda_category = item.category;
      this.agenda_duration = item.duration > 0 ? item.duration : "";
      this.agenda_description = item.description;
      this.agenda_order = item.agenda_order;
      this.hasDisable = true;
      this.agenda_flag = "update";
      this.chart_id = (item.agenda_chart_id == null) ? 0 : item.agenda_chart_id;
      this.chart_start_date = item.agenda_chart_start_date;
      this.chart_end_date = item.agenda_chart_end_date;

      if(item.agenda_chart_id == null)
        this.show_date_picker = false;

      }

      if(!agenda_drawer.opened){
        this.agenda_form.nativeElement.reset();
      }
  }

  // add a heagin in the agenda view
  addAgendaHeading(agenda_drawer){
    // below reset the required fields.
    this.agenda_flag = "new";
    this.agenda_order = 1;
    this.hasDisable = false;
    this.show_date_picker = false;
    this.create_agenda_form.reset();
    this.create_agenda_form.get('chart').setValue(0);
    this.create_agenda_form.get('clinic').clearValidators();
    this.create_agenda_form.get('clinic').updateValueAndValidity();
    this.create_agenda_form.get('start_date').clearValidators();
    this.create_agenda_form.get('start_date').updateValueAndValidity();
    this.create_agenda_form.get('end_date').clearValidators();
    this.create_agenda_form.get('end_date').updateValueAndValidity();
    agenda_drawer.open();
  }

  //  save agenda
  save_agenda(form){

    if(form.invalid)
      return;

    let formData = form.value;

    this.loader = true;
    formData.start_date = this.datepipe.transform(formData.start_date, 'yyyy-MM-dd');
    formData.end_date = this.datepipe.transform(formData.end_date, 'yyyy-MM-dd');
    if(formData.chart == 0)
      formData.chart = "";
    formData.meeting_id = this.meeting_id;
    formData.clinic_id = this.clinic_id;
    formData.flag = this.agenda_flag;
    formData.agenda_order = this.agenda_order;
    if(this.agenda_flag == "update")
      formData.meeting_agenda_id = this.meeting_agenda_id;
    
    this.staffMeetingService.saveMeetingAgenda(formData).subscribe(res=>{
      if(res.status == 200){
        this.agenda_drawer.close();
        this.agenda_form.nativeElement.reset();
        this.openAgenda(this.meeting_id);
      }
      this.loader = false;
    },error=>{
      this.loader = false;
    });
  }

  // create mark the meeting complete
  markCompleteMeeting(){
    this.staffMeetingService.markMeetingComplete(this.meeting_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.isMeetingCreator = false;
      }
    });
  }


  //  use to get the meeting attendees list
  viewMeetingAttendees(meeting_id){
    this.meeting_attendees = [];
    this.showAttendees = false;
    this.staffMeetingService.getMeetingAttendees(meeting_id, this.clinic_id).subscribe(res=>{
      if(res.status == 200){
        this.meeting_attendees = [...res.body.data];
        this.showAttendees = true;
      }
    });
  }

  // drag and drop in the agenda page
  moveAgendaItems(event, item) {
    // move agenda items in the array
    moveItemInArray(item.agenda_item, event.previousIndex, event.currentIndex);

    //  change and reset the order of the agenda item
    item.agenda_item.filter((item, index)=>{
      item.agenda_order = ++index;
    });

    this.staffMeetingService.changeAgendaItemOrder(JSON.stringify(item.agenda_item)).subscribe(res=>{
      
    })
  }

  openDateRangePicker(){
    if(this.chart_id == 0){
      // not show date picker if chart is not selected
      this.show_date_picker = false;

      // reset the date value and its validations
      this.create_agenda_form.get('clinic').setValue(+this.clinic_id);
      this.create_agenda_form.get('start_date').setValue('');
      this.create_agenda_form.get('end_date').setValue('');
      this.create_agenda_form.get('clinic').clearValidators();
      this.create_agenda_form.get('clinic').updateValueAndValidity();
      this.create_agenda_form.get('start_date').clearValidators();
      this.create_agenda_form.get('start_date').updateValueAndValidity();
      this.create_agenda_form.get('end_date').clearValidators();
      this.create_agenda_form.get('end_date').updateValueAndValidity();
      this.create_agenda_form.get('clinic').markAsUntouched();
      this.create_agenda_form.get('start_date').markAsUntouched();
      this.create_agenda_form.get('end_date').markAsUntouched();
    }else{

      // show date picker and update the validation for date
      this.show_date_picker = true;
      this.create_agenda_form.get('clinic').setValidators([Validators.required]);
      this.create_agenda_form.get('start_date').setValidators([Validators.required]);
      this.create_agenda_form.get('end_date').setValidators([Validators.required]);
    }
  }

  public meetingCards = [];
  public data = [];
  private setPagesForpaginator(dataArray){
    this.pages = [];
    this.meetingCards = [];

    // store all data from api
    this.data = [...dataArray];

    // set the cards initial data to it's perpage limit
    this.meetingCards = [...dataArray.slice(0, this.itemsPerPage)];

    // calculating pages
    for(let i = 1; i<= dataArray.length; i+=this.itemsPerPage){
      this.pages.push(Math.ceil(i/this.itemsPerPage));
    }

    // set the page number to 1
    this.currentPage = 1;
  }

  // change page according to the pageNumber
  pagination(pageNumber){
    this.meetingCards = [];
    this.currentPage = pageNumber;
    this.meetingCards = [...this.data.slice((this.currentPage - 1) * this.itemsPerPage,this.currentPage * this.itemsPerPage)];
  }

  // send email reminder to the invited user
  sendMeetingReminder(meeting_id){
    this.loader = true;
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to send a reminder email to all meeting attendees?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.staffMeetingService.sendMeetingReminder(meeting_id, this.clinic_id).subscribe(res=>{
          if(res.status == 200){
            this.loader = false;
            this.scheduleDrawer.close();
            $(".meeting_card").removeClass("active");
            Swal.fire(
              'Sent!',
              'Reminder email has been sent.',
              'success'
            );
          }else{
            this.loader = false;
          }
        },error=>{
          this.loader = false;
        });
      }else if(result.isDismissed){
        this.loader = false;
      }
    });
  }

  getTimezone(){
    this.staffMeetingService.getTimezone().subscribe(res=>{
      if(res.status == 200){
        this.timezones = [...res.body.data];
      }
    })
  }

  deleteAgenda({agenda_item},i){
    const ids = agenda_item.map(item=>item.id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete agenda?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.isConfirmed){
        this.staffMeetingService.deleteAgedna(ids).subscribe(res=>{
          if(res.status == 200){
            this.toastr.success('Agenda deleted!');
            this.agendaList = this.agendaList.filter((agenda, index) => index != i);
          }
        });
      }
    })
  }

  deleteAgendaItem({id}){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete agenda item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.isConfirmed){
        this.staffMeetingService.deleteAgednaItem(id).subscribe(res=>{
          if(res.status == 200){
            this.toastr.success('Agenda item deleted!');
            this.agendaList.filter(agenda=>{
              return agenda.agenda_item = agenda.agenda_item.filter(item=> item.id != id);
            });
            this.agendaList = this.agendaList.filter(agenda=> agenda.agenda_item.length > 0);
          }
        });
      }
    })
  }

  getClinic(){
    this.headerService.getClinic.subscribe(res=>{
      this.clinics = [...res.body.data];
    });
    // this.headerService.getClinics().subscribe(res=>{
    //   this.clinics = [...res.body.data];
    // });
  }

  // apply dynamic filter on the staff users
  findStaff(event){
    if (event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode >= 65 && event.keyCode <= 90) {
      var value = this.invites_form.get('invites').value;
      this.staffTemp = this.staff.filter(item=>{
          if(item.name.toLowerCase().includes(value.toLowerCase())){
            return item;
          }
      });
    }
    else{
      this.staffTemp = [...this.staff];
    }
  }
}