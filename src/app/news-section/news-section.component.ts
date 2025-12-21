import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';
import { PaginationComponent, PaginationInfo } from '../shared/pagination/pagination.component';

interface NewsItem {
  id: string;
  name: string;
  arName: string;
  description: string;
  arDescription: string;
  sub_description: string;
  arSub_description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-news-section',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, PaginationComponent],
  templateUrl: './news-section.component.html',
  styleUrl: './news-section.component.scss',
})
export class NewsSectionComponent implements OnInit {
  newsItems: NewsItem[] = [];
  isLoading = true;
  hasError = false;
  paginationInfo: PaginationInfo | null = null;
  currentPage = 1;

  lang: string; // default

  constructor(private api: ApiService, private translateService: TranslateService) {
    // Load language from localStorage first
    this.lang = this.translateService.currentLang || 'en'; // default to 'en' if not defined
  }

  ngOnInit(): void {
  // Then fetch news using the correct language
  this.fetchNews(this.currentPage);
}

  fetchNews(page: number = 1): void {
    this.isLoading = true;
    this.hasError = false; // Reset error state on new fetch
    
    this.api.get('posts', page).subscribe({
      next: (response) => {
        if (response && 'count' in response && 'results' in response) {
          this.paginationInfo = {
            count: response.count,
            next: response.next,
            previous: response.previous,
            results: response.results
          };
          this.newsItems = response.results;
          this.currentPage = page;
        } else {
          // Handle non-paginated response (fallback)
          this.newsItems = response;
          this.paginationInfo = {
            count: response.length,
            next: null,
            previous: null,
            results: response
          };
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching news:', error);
        this.isLoading = false;
        this.hasError = true;
        this.newsItems = [];
        this.paginationInfo = null;
      },
    });
  }

  onPageChange(page: number): void {
    this.fetchNews(page);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
