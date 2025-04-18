// call-status.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

export type CallStatus = 'queued' | 'ringing' | 'in-progress' | 'completed' | 'failed' | 'busy' | 'no-answer' | 'canceled';

export interface SSEMessage {
  connected?: boolean;
  status?: CallStatus;
}

export interface BulkSSEMessage {
  connected?: boolean;
  status?: 'pending' | 'in-progress' | 'completed' | 'schedule_complete' | 'schedule_failed';
  callSid: string;
  recordId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CallStatusService {
  private eventSource: EventSource | null = null;
  private statusSubject = new Subject<CallStatus>();
  private connectionStatusSubject = new BehaviorSubject<boolean>(false);

  private bulkEventSource: EventSource | null = null;
  private bulkStatusSubject = new Subject<BulkSSEMessage>();
  private bulkConnectionStatusSubject = new BehaviorSubject<boolean>(false);

  private currentScheduleId: string | null = null;

  // Observable streams
  public status$ = this.statusSubject.asObservable();
  public isConnected$ = this.connectionStatusSubject.asObservable();

  public bulkStatus$ = this.bulkStatusSubject.asObservable();
  public isBulkConnected$ = this.bulkConnectionStatusSubject.asObservable();

  constructor(private http: HttpClient) { }

  connect(callSid: string): void {
    // Close any existing connection
    this.disconnect();

    // Create new EventSource connection
    this.eventSource = new EventSource(
      `${environment.baseApiUrl}/v1/voice/streaming/${callSid}`
    );

    // Handle incoming messages
    this.eventSource.onmessage = (event) => {
      try {
        const data: SSEMessage = JSON.parse(event.data);

        if (data.connected) {
          this.connectionStatusSubject.next(true);
        } else if (data.status) {
          this.statusSubject.next(data.status);

          // Automatically disconnect if call is finished
          if (['completed', 'failed', 'canceled'].includes(data.status)) {
            this.disconnect();
          }
        }
      } catch (error) {
        console.error('Error parsing SSE message:', error);
      }
    };

    // Handle errors
    this.eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      this.connectionStatusSubject.next(false);
      this.disconnect();
    };
  }

  connectBulk(scheduleId: string): void {
    this.currentScheduleId = scheduleId;
    this.disconnectBulk();
    this.bulkEventSource = new EventSource(
      `${environment.baseApiUrl}/v1/voice/schedules/${scheduleId}/stream`
    );

    this.bulkEventSource.onmessage = (event) => {
      const data: BulkSSEMessage = JSON.parse(event.data);

      console.log('Received bulk SSE message:', data);

      if (data.connected) {
        this.bulkConnectionStatusSubject.next(true);
      } else if (data.status) {
        this.bulkStatusSubject.next({ callSid: data.callSid, status: data.status, recordId: data.recordId });
      }
    };
  }

  disconnectBulk(): void {
    if (this.bulkEventSource) {
      this.bulkEventSource.close();
      this.bulkEventSource = null;
    }
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.connectionStatusSubject.next(false);
    }
  }

  cancelBulkSchedule(clinicId: number) {
    if (this.currentScheduleId) {
      // Call the API to cancel the schedule
      return this.http.patch(`${environment.baseApiUrl}/v1/voice/schedules/${this.currentScheduleId}`, {
        clinicId: clinicId,
        status: 'cancelled'
      });
    }
    return null;
  }
}