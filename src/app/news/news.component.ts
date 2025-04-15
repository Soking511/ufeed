import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsSectionComponent } from '../news-section/news-section.component';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-news',
  imports: [CommonModule, RouterModule, NewsSectionComponent, TranslateModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  // No need to fetch news data here as it's now handled by the NewsSectionComponent
  constructor() {}
}
