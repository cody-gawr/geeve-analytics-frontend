import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-youtube-preview',
  templateUrl: './youtube-preview.component.html',
  styleUrls: ['./youtube-preview.component.scss'],
})
export class YoutubePreviewComponent implements OnInit {
  @Input() videoId!: string;

  public isHovered: boolean = false;

  public isPlaying: boolean = false;

  get thumbnailUrl(): string {
    return `https://img.youtube.com/vi/${this.videoId}/hqdefault.jpg`;
  }

  get videoUrl(): string {
    return `https://www.youtube.com/embed/${this.videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1`;
  }

  constructor() {}

  ngOnInit() {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
  }
}
