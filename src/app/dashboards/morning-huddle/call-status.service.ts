// call-status.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

export type CallStatus = 'queued' | 'ringing' | 'in-progress' | 'completed' | 'failed' | 'busy' | 'no-answer' | 'canceled';

export interface SSEMessage {
  connected?: boolean;
  status?: CallStatus;
}

@Injectable({
  providedIn: 'root'
})
export class CallStatusService {
  private eventSource: EventSource | null = null;
  private statusSubject = new Subject<CallStatus>();
  private connectionStatusSubject = new BehaviorSubject<boolean>(false);

  // Observable streams
  public status$ = this.statusSubject.asObservable();
  public isConnected$ = this.connectionStatusSubject.asObservable();

  constructor() {}

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

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.connectionStatusSubject.next(false);
    }
  }
}