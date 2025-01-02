import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-jet',
  imports: [CommonModule],
  templateUrl: './jet.component.html',
  styleUrl: './jet.component.scss'
})
export class JetComponent {
  hoveredIndex: number | null = null;

  onMouseOver(index: number) {
    this.hoveredIndex = index; // Highlight the hovered row
  }

  onMouseOut() {
    this.hoveredIndex = null; // Reset the hover effect
  }
  
}
