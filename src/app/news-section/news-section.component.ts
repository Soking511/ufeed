import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';

interface NewsItem {
  id: string;
  name: string;
  description: string;
  sub_description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-news-section',
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './news-section.component.html',
  styleUrl: './news-section.component.scss'
})
export class NewsSectionComponent implements OnInit {
  newsItems: NewsItem[] = [];
  isLoading = true;
  hasError = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews(): void {
    this.isLoading = true;
    this.api.get('posts').subscribe({
      next: (response: NewsItem[]) => {
        this.newsItems = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching news:', error);
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
