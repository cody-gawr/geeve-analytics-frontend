import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ClinicFacade } from '../clinic/facades/clinic.facade';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment, { Moment } from 'moment';
import { ClinicService } from '../clinic/services/clinic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CampaignService, ICampaign } from './services/campaign.service';
import { MatSort } from '@angular/material/sort';
import { NotificationService } from '../shared/services/notification.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { CampaignFacade } from './facades/campaign.facade';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
})
export class CampaignsComponent implements OnDestroy, AfterViewInit {
  private destroy = new Subject<void>();
  private readonly destroy$ = this.destroy.asObservable();
  displayedColumns: string[] = [
    'description',
    'created',
    'totalPatientsCount',
    'completedMessagesCount',
    'pendingCampaignsCount',
    'failedMessagesCount',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<ICampaign>([]);
  private campaignsSubject = new BehaviorSubject<ICampaign[]>([]);
  public readonly campaigns$ = this.campaignsSubject.asObservable();

  // COMPONENT-TODO : Map campaigns into a table-friendly data structure.
  public get transformedCampaigns$(): Observable<
    (Pick<
      ICampaign,
      | 'id'
      | 'description'
      | 'created'
      | 'completedMessagesCount'
      | 'pendingCampaignsCount'
      | 'status'
      | 'failedMessagesCount'
    > & {
      pendingSmsCount: number;
      totalSmsCount: number;
      statusColor: string;
      statusIcon: string;
      statusLabel: string;
    })[]
  > {
    return this.campaigns$.pipe(
      map(campaigns =>
        campaigns.map(campaign => {
          const {
            id,
            description,
            created,
            completedMessagesCount,
            pendingCampaignsCount,
            failedMessagesCount,
            status,
            pendingMessagesCount,
            totalMessagesCount,
          } = campaign;

          const statusColor = this.getStatusColor(status, <number>pendingMessagesCount);
          const statusIcon = this.getStatusIcon(status, <number>pendingMessagesCount);
          const statusLabel = this.getStatusLabel(status, <number>pendingMessagesCount);
          const pendingSmsCount = pendingCampaignsCount + <number>pendingMessagesCount;
          const totalSmsCount = totalMessagesCount + pendingCampaignsCount;
          return {
            id,
            description,
            created,
            completedMessagesCount,
            pendingCampaignsCount,
            pendingSmsCount,
            totalSmsCount,
            failedMessagesCount: <number>failedMessagesCount,
            status,
            statusColor,
            statusIcon,
            statusLabel,
          };
        }),
      ),
    );
  }

  private clinicId: number = 0;

  range = new FormGroup({
    start: new FormControl<Moment | null>(moment().startOf('month')),
    end: new FormControl<Moment | null>(moment()),
  });

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private readonly clinicFacade: ClinicFacade,
    private readonly clinicService: ClinicService,
    private readonly campaignFacade: CampaignFacade,
    private readonly campaignService: CampaignService,
    public dialog: MatDialog,
    private route: Router,
    private readonly nofifyService: NotificationService,
  ) {
    this.range = this.campaignService.range;
  }

  ngOnInit(): void {
    this.clinicFacade.currentSingleClinicId$
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe(clinicId => {
        if (typeof clinicId === 'number') {
          this.clinicId = clinicId;
          this.loadCampaigns();
        }
      });

    this.range.valueChanges.pipe(takeUntil(this.destroy$), distinctUntilChanged()).subscribe(_ => {
      this.loadCampaigns();
    });
    // COMPONENT-TODO : Review properties of campaign
    this.campaigns$.pipe(takeUntil(this.destroy$)).subscribe(campaigns => {
      console.log({ campaigns });
      this.dataSource.data = campaigns;
    });
    this.transformedCampaigns$
      .pipe(map(campaigns => campaigns.filter(campaign => campaign.id === 89)[0]))
      .subscribe(campaign => console.log({ campaign }));
  }

  getStatusColor(status: string, inProgressMsgCount: number) {
    if (status === 'draft') return 'black';
    if (inProgressMsgCount === 0) return 'green';
    else return 'black';
  }

  private getStatusIcon(status: string, inProgressMsgCount: number) {
    if (status === 'draft') return 'edit_note';
    if (inProgressMsgCount === 0) return 'check_circle';
    else return 'hourglass_top';
  }

  private getStatusLabel(status: string, inProgressMsgCount: number) {
    if (status === 'draft') return 'Draft';
    if (inProgressMsgCount === 0) return 'Complete';
    else return 'In Progress';
  }

  loadCampaigns() {
    if (this.clinicId) {
      this.campaignService
        .getCampaigns(
          this.clinicId,
          this.range.controls.start.value?.format('YYYY-MM-DD'),
          this.range.controls.end.value?.format('YYYY-MM-DD'),
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this.campaignsSubject.next(result.data);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  goViewPage(campaign: ICampaign) {
    this.campaignFacade.setCampaign(campaign);
    this.route.navigateByUrl('/newapp/campaigns/view?campaign_id=' + campaign.id);
  }

  goEditPage(campaign: ICampaign) {
    this.campaignFacade.setCampaign(campaign);
    this.route.navigateByUrl('/newapp/campaigns/create?campaign_id=' + campaign.id);
  }

  Campaigns: any[] = [];

  onDateRangeChange(target: 'start' | 'end', event: MatDatepickerInputEvent<Moment>) {
    if (target === 'end' && !!event.value) {
      this.campaignService.range.controls['end'].setValue(event.value);
    } else if (target === 'start' && !!event.value) {
      this.campaignService.range.controls['start'].setValue(event.value);
    }
  }

  onDelete(row: ICampaign) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Delete a campaign',
        message: `Are you sure you want to delete ${row.description} campaign?`,
        buttonColor: 'warn',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(result => {
        if (result) {
          this.campaignService
            .deleteCampaign(this.clinicId, row.id)
            .pipe(take(1))
            .subscribe(res => {
              this.loadCampaigns();
            });
        }
      });
  }

  openCreateCampaignDialog() {
    this.route.navigate(['newapp/campaigns/create']);
  }

  getPendingSmsCount(element: ICampaign) {
    return (
      parseInt(<any>element.pendingCampaignsCount) + parseInt(<any>element.pendingMessagesCount)
    );
  }

  getTotalSmsCount(element: ICampaign) {
    return parseInt(<any>element.totalMessagesCount) + parseInt(<any>element.pendingCampaignsCount);
  }
}
