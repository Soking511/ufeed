import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-clients',
  imports: [CommonModule],
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
    'public/clients/10.png'
  ];
  currentOffset = 0;
  visibleItems = 5; // Default visible items
  itemWidth = 100 / this.visibleItems;

  ngOnInit() {
    // Adjust visible items based on screen width
    this.adjustVisibleItems();

    // Auto slide every 3 seconds
    setInterval(() => this.slideRight(), 4000);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustVisibleItems();
  }

  adjustVisibleItems() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 576) {
      this.visibleItems = 1; // 1 item on small screens (mobile)
    } else if (screenWidth <= 768) {
      this.visibleItems = 2; // 2 items on medium screens (tablet)
    } else {
      this.visibleItems = 5; // 5 items on larger screens (desktop)
    }

    this.itemWidth = 100 / this.visibleItems; // Recalculate item width
  }

  slideLeft() {
    if (this.currentOffset < 0) {
      this.currentOffset += this.itemWidth;
    }
  }

  slideRight() {
    const maxOffset = -(this.images.length - this.visibleItems) * this.itemWidth;
    if (this.currentOffset > maxOffset) {
      this.currentOffset -= this.itemWidth;
    } else {
      this.currentOffset = 0; // Loop back to the beginning
    }
  }
}