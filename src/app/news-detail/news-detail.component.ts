import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss'
})
export class NewsDetailComponent implements OnInit {
  newsItem: NewsItem | null = null;
  isLoading = true;
  hasError = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchNewsDetail(id);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  fetchNewsDetail(id: string): void {
    this.isLoading = true;
    this.api.get(`blogs/${id}`).subscribe({
      next: (response: NewsItem) => {
        this.newsItem = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching news detail:', error);
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
