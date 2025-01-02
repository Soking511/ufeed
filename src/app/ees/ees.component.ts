import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ees',
  imports: [CommonModule],
  templateUrl: './ees.component.html',
  styleUrl: './ees.component.scss'
})
export class EesComponent {
  hoveredIndex: number | null = null;

  onMouseOver(index: number) {
    this.hoveredIndex = index; // Highlight the hovered row
  }

  onMouseOut() {
    this.hoveredIndex = null; // Reset the hover effect
  }
}
