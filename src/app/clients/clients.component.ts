import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-clients',
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {
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
  visibleItems = 5;
  itemWidth = 100 / this.visibleItems; // 100% divided by number of visible items (5)

  ngOnInit() {
    // Auto slide every 3 seconds
    setInterval(() => this.slideRight(), 4000);
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
