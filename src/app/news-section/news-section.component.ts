import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';
import { PaginationComponent, PaginationInfo } from '../shared/pagination/pagination.component';

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

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.fetchNews(this.currentPage);
  }  fetchNews(page: number = 1): void {
    this.isLoading = true;
    this.api.get('posts', page).subscribe({
      next: (response) => {
        // Check if the response matches the DRF pagination format
        if (response && 'count' in response && 'results' in response) {
          // Handle the DRF pagination response
          this.paginationInfo = {
            count: response.count,
            next: response.next,
            previous: response.previous,
            results: response.results
          };
          this.newsItems = response.results;
          
          // If there's no next page and we're on page 1, hide pagination
          if (response.next === null && response.previous === null) {
            // We only have one page, so pagination isn't needed
            console.log('Only one page of results is available');
          }
        } else {
          // If the response is not paginated, use it directly
          this.newsItems = response;
          this.paginationInfo = {
            count: response.length,
            next: null,
            previous: null,
            results: response
          };
        }
        this.currentPage = page;
        this.isLoading = false;
      },
      error: (error) => { 
        console.error('Error fetching news:', error);
        this.isLoading = false;
        this.hasError = true;
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
