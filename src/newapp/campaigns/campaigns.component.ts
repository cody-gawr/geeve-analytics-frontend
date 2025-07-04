import { AfterViewChecked, AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ClinicFacade } from '../clinic/facades/clinic.facade';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  startWith,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment, { Moment } from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatLegacyDialog } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { CampaignService, ICampaign } from './services/campaign.service';
import { MatSort } from '@angular/material/sort';
import { NotificationService } from '../shared/services/notification.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { CampaignFacade } from './facades/campaign.facade';
import { AuthFacade } from '../auth/facades/auth.facade';
import { validatePermission } from '../shared/helpers/validatePermission.helper';
import { CONSULTANT, USER_MASTER } from '../constants';
import { ExplainerVideoDialogComponent } from './explainer-video-dialog/explainer-video-dialog.component';
import { LayoutFacade } from '../layout/facades/layout.facade';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
})
export class CampaignsComponent implements OnDestroy, AfterViewInit, AfterViewChecked {
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
  dataSource = new MatTableDataSource<
    Pick<
      ICampaign,
      | 'id'
      | 'description'
      | 'created'
      | 'completedMessagesCount'
      | 'pendingCampaignsCount'
      | 'status'
      | 'failedMessagesCount'
      | 'failedCampaignsCount'
    > & {
      pendingSmsCount: number;
      totalSmsCount: number;
      statusColor: string;
      statusIcon: string;
      statusLabel: string;
    }
  >([]);
  private campaignsSubject = new BehaviorSubject<ICampaign[]>([]);
  public readonly campaigns$ = this.campaignsSubject.asObservable();

  // COMPONENT-TODO - Map campaigns into a table-friendly data structure.
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
      | 'failedCampaignsCount'
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
            failedCampaignsCount,
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
            failedMessagesCount: failedMessagesCount,
            failedCampaignsCount: failedCampaignsCount,
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

  private startDate: string | null;
  private endDate: string | null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly clinicFacade: ClinicFacade,
    private readonly campaignFacade: CampaignFacade,
    private readonly campaignService: CampaignService,
    public dialog: MatDialog,
    public legacyDialog: MatLegacyDialog,
    private route: Router,
    private readonly nofifyService: NotificationService,
    private authFacade: AuthFacade,
    private layoutFacade: LayoutFacade,
  ) {
    this.range = this.campaignService.range;
  }

  ngOnInit(): void {
    combineLatest([
      this.clinicFacade.currentSingleClinicId$.pipe(distinctUntilChanged()),
      this.layoutFacade.dateRange$.pipe(
        distinctUntilChanged((a, b) => a.start === b.start && a.end === b.end),
      ),
      this.hasPermission$.pipe(distinctUntilChanged()),
    ])
      .pipe(
        takeUntil(this.destroy$),
        // only proceed once we have a real clinicId and permission === true
        filter(([clinicId, _range]) => typeof clinicId === 'number'),
      )
      .subscribe(([clinicId, { start, end }, hasPermission]) => {
        this.layoutFacade.toggleDateRangePicker(hasPermission);
        this.layoutFacade.toggleClinicSelection(hasPermission);
        this.layoutFacade.toggleDentistSelection(hasPermission);

        if (hasPermission) {
          this.clinicId = <number>clinicId;
          this.startDate = moment(start).format('YYYY-MM-DD');
          this.endDate = moment(end).format('YYYY-MM-DD');
          this.loadCampaigns();
        }
      });

    // COMPONENT-TODO - Review properties of campaign
    this.transformedCampaigns$.pipe(takeUntil(this.destroy$)).subscribe(campaigns => {
      this.dataSource.data = campaigns;
    });
  }

  get hasPermission$(): Observable<boolean | null> {
    return this.authFacade.rolesIndividual$.pipe(
      filter(res => !!res),
      map(
        ({ data: permissions, type: userType }) =>
          validatePermission(permissions, 'campaigns') ||
          [USER_MASTER, CONSULTANT].indexOf(userType) >= 0,
      ),
      startWith<boolean | null>(null),
    );
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
        .getCampaigns(this.clinicId, this.startDate, this.endDate)
        .pipe(take(1))
        .subscribe(result => {
          this.campaignsSubject.next(result.data);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  ngAfterViewInit() {}

  ngAfterViewChecked() {
    if (this.paginator && this.dataSource.paginator !== this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  goViewPage(campaign: ICampaign) {
    this.campaignFacade.setCampaign(campaign);
    this.route.navigateByUrl('/newapp/crm/campaigns/view?campaign_id=' + campaign.id);
  }

  goEditPage(campaign: ICampaign) {
    this.campaignFacade.setCampaign(campaign);
    this.route.navigateByUrl('/newapp/crm/campaigns/create?campaign_id=' + campaign.id);
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
    this.route.navigate(['newapp/crm/campaigns/create']);
  }

  onOpenExplainerVideoDialog() {
    this.dialog.open(ExplainerVideoDialogComponent, {
      width: '1200px', // a bit wider than your 800px video
      // height: 'auto', // let the container grow with its content
      maxHeight: '90vh', // but never exceed 90% of the viewport height
      panelClass: 'explainer-video-dialog',
    });
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
