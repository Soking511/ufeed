import { Component,Renderer2 } from '@angular/core';
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
constructor(private renderer: Renderer2,private translationService: TranslationService){}
}
