import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';

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
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss',
})
export class NewsDetailComponent implements OnInit {
  newsItem: NewsItem | null = null;
  isLoading = true;
  hasError = false;
  currentLang: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private translateService: TranslateService
  ) {
    this.currentLang = this.translateService.currentLang || 'en'; // default to 'en' if not defined
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.fetchNewsDetail(id);
      } else {
        this.router.navigate(['/news']);
      }
    });
  }

  fetchNewsDetail(id: string): void {
    this.isLoading = true;
    this.api.get(`posts/${id}`).subscribe({
      next: (response: NewsItem) => {
        this.newsItem = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching news detail:', error);
        this.isLoading = false;
        this.hasError = true;
      },
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  goBack(): void {
    this.router.navigate(['/news']);
  }
}
