import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work-performance',
  imports: [CommonModule],
  templateUrl: './work-performance.component.html',
  styleUrl: './work-performance.component.scss'
})

export class WorkPerformanceComponent {
  hoveredIndex: number | null = null; // Track the hovered row index

  onMouseOver(index: number) {
    this.hoveredIndex = index; // Set the hovered index
  }

  onMouseOut() {
    this.hoveredIndex = null; // Reset the hover index
  }

  // Helper method to check if a row is not hovered
  isNotHovered(index: number): boolean {
    return this.hoveredIndex !== null && this.hoveredIndex !== index;
  }
}
