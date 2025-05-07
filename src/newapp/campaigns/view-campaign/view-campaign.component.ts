import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  CampaignService,
  DefaultFilterElements,
  ICampaignMessage,
  IGetPatientsFilterJson,
} from '../services/campaign.service';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { combineLatest, distinctUntilChanged, filter, map, Subject, take, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@/newapp/shared/services/notification.service';
import { StartCampaignDialog } from '../start-campaign-dialog/start-campaign-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { composeCampaignFilterDescription } from '@/newapp/shared/utils';
import { isEqual } from 'lodash';

@Component({
  selector: 'view-campaign',
  templateUrl: 'view-campaign.component.html',
  styleUrls: ['view-campaign.component.scss'],
})
export class ViewCampaignComponent {
  private destroy = new Subject<void>();
  public destroy$ = this.destroy.asObservable();
  public dataSource = new MatTableDataSource<ICampaignMessage>([]);
  public displayedColumns = [
    'created',
    'patient_name',
    'phone_number',
    'sms_text',
    'status',
    'actions',
  ];
  public clinicId: number = 0;
  public clinicName: string = '';
  public campaignId: number = 0;
  public campaignName: string = '';
  public isResending = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private campaignService: CampaignService,
    private clinicFacade: ClinicFacade,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private nofifyService: NotificationService,
  ) {}

  ngOnInit() {
    combineLatest([
      this.route.queryParams.pipe(distinctUntilChanged()),
      this.clinicFacade.currentClinics$.pipe(
        distinctUntilChanged((prev, curr) => isEqual(prev, curr)),
      ),
    ])
      .pipe(
        takeUntil(this.destroy$),
        map(([params, clinics]) => ({
          campaignId: parseInt(params['campaign_id'], 10) || 0,
          clinic: clinics[0],
        })),
        filter(({ campaignId, clinic }) => !!campaignId && !!clinic), // filter out invalid state
        distinctUntilChanged(
          (prev, curr) =>
            prev.campaignId === curr.campaignId && prev.clinic?.id === curr.clinic?.id,
        ),
      )
      .subscribe(({ campaignId, clinic }) => {
        this.campaignId = campaignId;
        this.clinicId = clinic.id;
        this.clinicName = clinic.clinicName;
        this.loadCampaignMessages();
      });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private loadCampaignMessages() {
    this.campaignService
      .getCampaignSmsMessages(this.clinicId, this.campaignId)
      .pipe(take(1))
      .subscribe(msg => {
        this.dataSource.data = msg.data.messages;
        this.loadFilterSettings(msg.data.filters);
      });
  }

  public resendMessage(element: ICampaignMessage) {
    const _sendMsgs = _msg => {
      this.isResending = true;
      this.campaignService
        .resendCampaignMessages(this.clinicId, this.campaignId, _msg)
        .pipe(take(1))
        .subscribe({
          next: result => {
            if (result.data[0] == result.data[1]) {
              this.nofifyService.showSuccess(`Sent successfully to ${result.data[0]} patients.`);
            } else {
              this.nofifyService.showError(
                `Failed ${result.data[1] - result.data[0]} patients, Succeed to ${result.data[0]} patients`,
              );
            }
            this.loadCampaignMessages();
            this.isResending = false;
          },
          error: err => {
            this.isResending = false;
          },
        });
    };

    const dialogRef = this.dialog.open(StartCampaignDialog, {
      data: {
        sms_text: element.sms_text,
        patients: [
          {
            patient_name: element.patient_name,
            mobile: element.phone_number,
          },
        ],
        clinicId: this.clinicId,
        clinicName: this.clinicName,
        campaignId: this.campaignId,
        resend: true,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(result => {
        if (result.status) {
          _sendMsgs([
            {
              id: element.id,
              status: element.status,
              sms_text: result.sms_text,
              sid: element.sid,
              phone_number: result.phone_number,
            },
          ]);
        }
      });
  }

  done = [];
  loadFilterSettings(settings: IGetPatientsFilterJson[]) {
    this.done = [];
    for (const filter of DefaultFilterElements) {
      const setting = settings.find(s => s.filter === filter.filterName);
      if (setting) {
        this.done.push({ ...filter, settings: setting.filter_settings });
      }
    }
  }

  getDesc(filterName: string, settings: string[]) {
    return composeCampaignFilterDescription(filterName, settings);
  }
}
