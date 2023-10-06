import { Component, OnDestroy, OnInit, Input } from '@angular/core';

@Component({
  selector: 'spin-loader',
  templateUrl: './spin-loader.component.html',
  styleUrls: ['./spin-loader.component.scss'],
})
export class SpinLoaderComponent implements OnInit, OnDestroy {
  @Input() disableSpin = false;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
