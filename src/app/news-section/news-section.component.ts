import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-news-section',
  imports: [CommonModule,RouterModule,TranslateModule],
  templateUrl: './news-section.component.html',
  styleUrl: './news-section.component.scss'
})
export class NewsSectionComponent {

}
