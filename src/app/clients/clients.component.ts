import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-clients',
  imports: [CommonModule,TranslateModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})

export class ClientsComponent implements OnInit {
  images = [
    'public/clients/1.png',
    'public/clients/2.png',
    'public/clients/3.png',
    'public/clients/4.png',
    'public/clients/5.png',
    'public/clients/6.png',
    'public/clients/7.png',
    'public/clients/8.png',
    'public/clients/9.png',
    'public/clients/10.png',
  ];
  currentOffset = 0;
  visibleItems = 5;
  itemWidth = 100 / this.visibleItems;
  autoSlideInterval: any;

  ngOnInit() {
    this.adjustVisibleItems();
    this.startAutoSlide();

    window.addEventListener('resize', () => this.adjustVisibleItems());
  }

  adjustVisibleItems() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 576) {
      this.visibleItems = 1;
    } else if (screenWidth <= 768) {
      this.visibleItems = 2;
    } else {
      this.visibleItems = 5;
    }

    this.itemWidth = 100 / this.visibleItems;
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => this.slideRight(), 4000);
  }

  resetAutoSlide() {
    clearInterval(this.autoSlideInterval);
    this.startAutoSlide();
  }

  slideLeft() {
    if (this.currentOffset < 0) {
      this.currentOffset += this.itemWidth;
    }
    this.resetAutoSlide();
  }

  slideRight() {
    const maxOffset =
      -(this.images.length - this.visibleItems) * this.itemWidth;
    if (this.currentOffset > maxOffset) {
      this.currentOffset -= this.itemWidth;
    } else {
      this.currentOffset = 0;
    }
    this.resetAutoSlide();
  }
}
