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
    'public/clients/11.png',
    'public/clients/12.png',
    'public/clients/13.png',
    'public/clients/14.png',
    'public/clients/15.png',
    'public/clients/16.png',
  ];
  clients = [
    { id: '1', link: 'https://www.egytrans.com/home', logo: 'public/clients/1.webp' },
    { id: '2', link: 'https://www.ykk.com/english/', logo: 'public/clients/2.webp' },
    { id: '3', link: 'https://www.lamaregypt.com/en', logo: 'public/clients/3.webp' },
    { id: '4', link: 'https://digital.gov.eg/', logo: 'public/clients/4.webp' },
    { id: '5', link: 'https://mediterraneo-egypt.com/', logo: 'public/clients/5.webp' },
    { id: '6', link: 'https://eventumsolutions.com/', logo: 'public/clients/6.webp' },
    { id: '7', link: 'https://www.heidelbergmaterials.com/en', logo: 'public/clients/7.webp' },
    { id: '8', link: 'https://alnafitha.com/ar/', logo: 'public/clients/8.webp' },
    { id: '9', link: 'https://sharkeyasugar.com/', logo: 'public/clients/9.webp' },
    { id: '10', link: 'https://www.epp-eg.com/', logo: 'public/clients/10.webp' },
    { id: '11', link: 'https://ngsportsclub.com/ ', logo: 'public/clients/11.webp' },
    { id: '12', link: 'https://misrins.com.eg/ar/', logo: 'public/clients/12.webp' },
    { id: '13', link: 'https://www.pyramidglassegypt.com/', logo: 'public/clients/13.webp' },
    { id: '14', link: 'https://edita.com.eg/', logo: 'public/clients/14.webp' },
    { id: '15', link: 'https://ehegypt.com/', logo: 'public/clients/15.webp' },
    { id: '16', link: 'https://www.bosta.co/ar-eg/home', logo: 'public/clients/16.webp' },
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
