import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {NewsSectionComponent} from '../news-section/news-section.component'
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-news',
  imports: [CommonModule,RouterModule,NewsSectionComponent,TranslateModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  news:any;

  constructor(private api:ApiService) {
    this.api.get('posts').subscribe(data => {
      this.news = data;
      console.log(this.news);
    });
  }

}
