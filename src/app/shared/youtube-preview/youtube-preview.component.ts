import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-youtube-preview',
  templateUrl: './youtube-preview.component.html',
  styleUrls: ['./youtube-preview.component.scss'],
})
export class YoutubePreviewComponent implements OnInit {
  @Input() videoId!: string;

  get videoUrl(): string {
    return `https://www.youtube.com/embed/${this.videoId}?rel=0&modestbranding=1`;
  }

  constructor() {}

  ngOnInit() {}
}