import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-youtube-preview',
  templateUrl: './youtube-preview.component.html',
  styleUrls: ['./youtube-preview.component.scss'],
})
export class YoutubePreviewComponent implements OnInit {
  @Input() videoId!: string;
  @Input() width: string = '100%';
  @Input() height: string = 'auto';
  @Input() thumbnail?: string;

  public isPlaying: boolean = false;

  get thumbnailUrl(): string {
    return this.thumbnail || `https://img.youtube.com/vi/${this.videoId}/hqdefault.jpg`;
  }

  get videoUrl(): string {
    return `https://www.youtube.com/embed/${this.videoId}?rel=0&modestbranding=1`;
  }

  get embedUrl(): string {
    return `https://www.youtube.com/embed/${this.videoId}?autoplay=1&mute=1&modestbranding=1&rel=0&iv_load_policy=3`;
  }

  constructor() {}

  ngOnInit() {}

  public playVideo(): void {
    this.isPlaying = true;
  }
}
