import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor() {}

  logError(message: any, stack: string) {
    // Send errors to server here
    console.error('LoggingService: ', message);
  }
}
