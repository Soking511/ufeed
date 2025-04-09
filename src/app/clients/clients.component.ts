import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-clients',
  imports: [CommonModule, TranslateModule],
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
  clients = [
    { id: '1', link: 'https://www.egytrans.com/home', logo: 'public/clients/1.png' },
    { id: '2', link: 'https://www.ykk.com/english/', logo: 'public/clients/2.png' },
    { id: '3', link: 'https://www.lamaregypt.com/en', logo: 'public/clients/3.png' },
    { id: '4', link: 'https://digital.gov.eg/', logo: 'public/clients/4.png' },
    { id: '5', link: 'https://mediterraneo-egypt.com/', logo: 'public/clients/5.png' },
    { id: '6', link: 'https://eventumsolutions.com/', logo: 'public/clients/6.png' },
    { id: '7', link: 'https://www.heidelbergmaterials.com/en', logo: 'public/clients/7.png' },
    { id: '8', link: 'https://alnafitha.com/ar/', logo: 'public/clients/8.png' },
    { id: '9', link: 'https://sharkeyasugar.com/', logo: 'public/clients/9.png' },
    { id: '10', link: 'https://www.epp-eg.com/', logo: 'public/clients/10.png' },
  ]
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
