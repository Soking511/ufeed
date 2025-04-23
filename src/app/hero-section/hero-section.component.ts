import { Component,ElementRef,Renderer2, ViewChild } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-hero-section',
  imports: [RouterLink,RouterModule,TranslateModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  @ViewChild('bgVideo') videoElement!: ElementRef<HTMLVideoElement>;
constructor(private renderer: Renderer2,private translationService: TranslationService){}
ngAfterViewInit() {
  // Make sure video plays after the view is initialized
  setTimeout(() => {
    if (this.videoElement && this.videoElement.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.muted = true; // Muted videos are more likely to autoplay
      video.play()
        .catch(error => {
          console.log('Auto-play was prevented by the browser:', error);
        });
    }
  }, 100);
}

}
