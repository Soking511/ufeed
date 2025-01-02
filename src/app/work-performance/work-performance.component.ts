import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work-performance',
  imports: [CommonModule],
  templateUrl: './work-performance.component.html',
  styleUrl: './work-performance.component.scss'
})


export class WorkPerformanceComponent {
  hoveredIndex: number | null = null;

  onMouseOver(index: number) {
    this.hoveredIndex = index; // Highlight the hovered row
  }

  onMouseOut() {
    this.hoveredIndex = null; // Reset the hover effect
  }

}
