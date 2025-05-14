import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PaginationInfo {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
}

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges {
  @Input() paginationInfo!: PaginationInfo | null;
  @Input() currentPage = 0;
  @Output() pageChange = new EventEmitter<number>();

  totalPages = 0;
  pages: number[] = [];
  readonly itemsPerPage = 2; // Fixed page size

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paginationInfo'] && this.paginationInfo) {
      this.calculatePagination();
    }
  }

  calculatePagination(): void {
    if (!this.paginationInfo) return;

    const totalItems = this.paginationInfo.count;
    this.totalPages = Math.ceil(totalItems / this.itemsPerPage);

    // Simply show current page and next page if available
    const pages: number[] = [this.currentPage];
    if (this.currentPage < this.totalPages) {
      pages.push(this.currentPage + 1);
    }

    this.pages = pages;
  }

  goToPage(page: number): void {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }
}
