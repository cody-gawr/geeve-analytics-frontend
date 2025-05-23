import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss'],
})
export class ClinicComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {}

  ngOnDestroy(): void {
    // Cleanup logic if needed
  }
}
